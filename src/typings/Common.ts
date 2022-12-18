export enum ComponentsType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  INPUT = "INPUT",
  TABS = "TABS",
  SELECT = "SELECT",
  COMMONCONTAINER = "COMMONCONTAINER",
  ECHARTS = "ECHARTS",
  DATEPICKER = "DATEPICKER",
  TABLE = "TABLE",
  BUTTON = "BUTTON",
  RADIOGROUP = "RADIOGROUP",
  CONTAINER = "CONTAINER",
}

export enum ColumnType {
  INPUT = "input",
  SELECT = "select",
  SELECT_EDIT = "select_edit",
  CODE = "code",
  LINK = "link",
  API = "api",
  TEXTAREA = "textarea",
  NUMBER = "number",
  COLOR = "color",
  RADIO = "radio",
  SWITCH = "switch",
}

export type ComponentsInfo = {
  name: string;
  type: ComponentsType;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  parentId?: string;
  column: any[];
  config: {
    [key: string]: any;
  };
  children?: ComponentsInfo[];
  formConfig?: {
    [key: string]: any;
  };
};

export type LayoutDataItem = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
};

export enum LayoutType {
  EDIT = "edit",
  PREVIEW = "preview",
}
