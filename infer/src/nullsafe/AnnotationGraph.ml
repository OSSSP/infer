(*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *)
open! IStd

type point_info =
  { id: string
  ; annotation: ProvisionalAnnotation.t
  ; mutable num_violations: int
  ; mutable dependent_points: ProvisionalAnnotation.t list }

module AnnotationMap = Caml.Map.Make (struct
  type t = ProvisionalAnnotation.t [@@deriving compare]
end)

let get_provisional_annotation = function
  | AnnotatedNullability.ProvisionallyNullable provisional_annotation ->
      Some provisional_annotation
  | _ ->
      None


(* Corresponding provisional annotations for the return value and params, if any *)
let annotations_of_signature AnnotatedSignature.{ret; params} =
  let annotated_nullability =
    ret.ret_annotated_type.nullability
    :: List.map params ~f:(fun AnnotatedSignature.{param_annotated_type= {nullability}} ->
           nullability )
  in
  List.filter_map annotated_nullability ~f:get_provisional_annotation


(* Given a list of provisional annotations, construct corresponding nodes for the graph *)
let graph_nodes_of_provisional_annotations annotations =
  let get_id index annotation =
    (* Symbolic prefix corresponding to annotation point type for convenience*)
    let prefix =
      match annotation with
      | ProvisionalAnnotation.Field _ ->
          "f"
      | ProvisionalAnnotation.Method _ ->
          "m"
      | ProvisionalAnnotation.Param _ ->
          "p"
    in
    Format.sprintf "%s%d" prefix index
  in
  let annotation_points =
    List.mapi annotations ~f:(fun index annotation ->
        ( annotation
        , {id= get_id index annotation; annotation; num_violations= 0; dependent_points= []} ) )
  in
  AnnotationMap.of_seq (Stdlib.List.to_seq annotation_points)


let build_graph_nodes tenv class_struct class_name =
  let class_typ = Typ.mk_struct class_name in
  let field_annotations =
    class_struct.Struct.fields
    |> List.filter_map ~f:(fun (field_name, _, _) ->
           let AnnotatedField.{annotated_type= {nullability}} =
             Option.value_exn
               (AnnotatedField.get tenv field_name ~class_typ ~class_under_analysis:class_name)
           in
           get_provisional_annotation nullability )
  in
  let method_signatures =
    class_struct.Struct.methods
    |> List.map ~f:(fun proc_name ->
           let proc_attributes = Option.value_exn (PatternMatch.lookup_attributes tenv proc_name) in
           AnnotatedSignature.get_for_class_under_analysis tenv proc_attributes )
  in
  let method_and_param_annotations =
    List.map method_signatures ~f:annotations_of_signature |> List.concat
  in
  graph_nodes_of_provisional_annotations (field_annotations @ method_and_param_annotations)


let get_offending_annotations = function
  | ProvisionalViolation.Assignment violation ->
      AssignmentRule.ProvisionalViolation.offending_annotations violation
  | ProvisionalViolation.Dereference violation ->
      DereferenceRule.ProvisionalViolation.offending_annotations violation


let get_fix_annotation = function
  | ProvisionalViolation.Assignment violation ->
      AssignmentRule.ProvisionalViolation.fix_annotation violation
  | ProvisionalViolation.Dereference _ ->
      None


let update_by_violation nodes provisional_violation =
  let fix_annotation = get_fix_annotation provisional_violation in
  Option.iter fix_annotation ~f:(fun annotation ->
      if not (AnnotationMap.mem annotation nodes) then
        Logging.die InternalError "Did not find a node for %a in the graph" ProvisionalAnnotation.pp
          annotation ) ;
  let offending_annotations = get_offending_annotations provisional_violation in
  List.iter offending_annotations ~f:(fun annotation ->
      match AnnotationMap.find_opt annotation nodes with
      | Some annotation_point -> (
        match fix_annotation with
        | Some fix_annotation ->
            (* If that provisional annotation becomes real [@Nullable], that would raise an issue fixable by the other annotation.
               Add the new edge in the graph.
            *)
            annotation_point.dependent_points <-
              List.dedup_and_sort
                (fix_annotation :: annotation_point.dependent_points)
                ~compare:ProvisionalAnnotation.compare
        | None ->
            (* If that provisional annotation becomes real [@Nullable], that would lead to a violation
             * (not related to other provisional annotations).
             *)
            annotation_point.num_violations <- annotation_point.num_violations + 1 )
      | None ->
          Logging.die InternalError "Did not find a node for %a in the graph"
            ProvisionalAnnotation.pp annotation )


(* Given a list of provisional violations, connect corresponding nodes in the annotation graph *)
let update_nodes_and_set_edges nodes provisional_violations =
  List.iter provisional_violations ~f:(update_by_violation nodes)


let get_kind_json = function
  | ProvisionalAnnotation.Field _ ->
      `Field
  | ProvisionalAnnotation.Method _ ->
      `Method
  | ProvisionalAnnotation.Param _ ->
      `Param


let get_field_name_json = function
  | ProvisionalAnnotation.Field {field_name} ->
      Some (Fieldname.get_field_name field_name)
  | ProvisionalAnnotation.Method _ | ProvisionalAnnotation.Param _ ->
      None


let get_param_num_json = function
  | ProvisionalAnnotation.Param {num} ->
      Some num
  | ProvisionalAnnotation.Method _ | ProvisionalAnnotation.Field _ ->
      None


let java_type_to_string java_type = Pp.string_of_pp (Typ.pp_java ~verbose:true) java_type

let get_access_level tenv proc_name =
  let proc_attributes = PatternMatch.lookup_attributes_exn tenv (Procname.Java proc_name) in
  match ProcAttributes.get_access proc_attributes with
  | Default ->
      `Default
  | Public ->
      `Public
  | Private ->
      `Private
  | Protected ->
      `Protected


let get_method_info_json tenv annotation =
  let open IOption.Let_syntax in
  let+ proc_name =
    match annotation with
    | ProvisionalAnnotation.Param {method_info} ->
        Some method_info
    | ProvisionalAnnotation.Method proc_name ->
        Some proc_name
    | ProvisionalAnnotation.Field _ ->
        None
  in
  let method_name = Procname.Java.get_method proc_name in
  let params = Procname.Java.get_parameters proc_name |> List.map ~f:java_type_to_string in
  let access_level = get_access_level tenv proc_name in
  Jsonbug_t.{method_name; params; access_level}


let to_json_annotation_point tenv graph {id; annotation; num_violations; dependent_points} :
    Jsonbug_t.annotation_point =
  { id
  ; kind= get_kind_json annotation
  ; method_info= get_method_info_json tenv annotation
  ; field_name= get_field_name_json annotation
  ; param_num= get_param_num_json annotation
  ; num_violations
  ; dependent_point_ids=
      List.map dependent_points ~f:(fun dependent_point ->
          let node = AnnotationMap.find dependent_point graph in
          node.id ) }


(* Convert the graph to the JSON representation *)
let to_json tenv graph =
  AnnotationMap.bindings graph |> List.map ~f:snd
  (* Sort by ids to get any stable order *)
  |> List.sort ~compare:(fun {id= id1} {id= id2} -> String.compare id1 id2)
  |> List.map ~f:(to_json_annotation_point tenv graph)


let build_graph tenv class_struct class_name provisional_violations =
  let graph = build_graph_nodes tenv class_struct class_name in
  update_nodes_and_set_edges graph provisional_violations ;
  to_json tenv graph
