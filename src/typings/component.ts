export enum ComponentsType {
  TEXT = "text",
  IMAGE = "image",
  INPUT = "input",
  TABS = "tabs",
  SELECT = "select",
  SELECT_EDIT = "select_edit",
  FROM = "from",
  LINEBAR = "linebar",
  CODE = "code",
  LINK = "link",
}

export type LayoutDataItem = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
};

export type ComponentsInfo = {
  name: string;
  type: ComponentsType;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  config?: any;
  position: Partial<LayoutDataItem>;
  children?: ComponentsInfo[];
  formConfig?: any;
};

export enum LayoutType {
  EDIT = "edit",
  PREVIEW = "preview",
}
// 'edit'|'preview'
// export interface LayoutType {
//   EDIT: "EDIT";
//   PREVIEW: "PREVIEW";
// }
