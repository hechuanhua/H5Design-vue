export enum ComponentsType {
  TEXT = "text",
  IMAGE = "image",
  INPUT = "input",
}

export type ComponentsInfo = {
  name: string;
  type: ComponentsType;
  icon: string;
};
