export enum ComponentsType {
  TEXT = "text",
  IMAGE = "image",
  INPUT = "input",
  TABS = "tabs",
  SELECT = "select",
  FROM = "from",
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
};
