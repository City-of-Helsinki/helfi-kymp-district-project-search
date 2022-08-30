export interface Result {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _language: string;
  entity_type?: Array<number>;
  url: Array<string>;
  nid: Array<string>;
  field_project_district_name?: Array<string>;
  field_project_execution_schedule?: Array<string>;
  field_project_image_url?: Array<string>;
  field_project_phase_name?: Array<string>;
  field_project_plan_schedule?: Array<string>;
  field_project_search_metatags?: Array<string>;
  field_project_theme_name?: Array<string>;
  field_project_type_name?: Array<string>;
  title: Array<string>;
  field_district_image_url: Array<string>;
  field_district_search_metatags: Array<string>;
  field_district_sub_districts_name: Array<string>;
}

export default Result;
