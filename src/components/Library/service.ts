import { ComponentsInfo, ComponentsType } from "@/typings/Component";

const TextData = {
  name: "文本",
  type: ComponentsType.TEXT,
  w: 30,
  h: 50,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {},
  position: {},
};

const ImageData = {
  name: "图片",
  type: ComponentsType.TEXT,
  w: 30,
  h: 50,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {},
  position: {},
};

const InputData = {
  name: "输入框",
  type: ComponentsType.INPUT,
  w: 200,
  h: 32,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    value: "",
  },
  position: {},
  column: [
    {
      key: "value",
      label: "文本",
      type: ComponentsType.INPUT,
    },
  ],
};

const TabsData = {
  name: "标签页",
  type: ComponentsType.TABS,
  w: 30,
  h: 50,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    value: "",
  },
  position: {},
};

const SelectData = {
  name: "下拉框",
  type: ComponentsType.SELECT,
  w: 200,
  h: 32,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    value: "1",
  },
  position: {},
  column: [
    {
      key: "value",
      label: "选项",
      type: ComponentsType.SELECT,
      options: [
        {
          label: "选项1",
          value: "1",
        },
        {
          label: "选项2",
          value: "2",
        },
      ],
    },
  ],
};

const FormData = {
  name: "表单容器",
  type: ComponentsType.FROM,
  w: 1200,
  h: 200,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    url: "",
    method: "GET",
  },
  position: {},
  children: [],
  column: [
    {
      key: "url",
      type: ComponentsType.INPUT,
      label: "请求url",
    },
    {
      key: "method",
      type: ComponentsType.SELECT,
      label: "请求方法",
      options: [
        {
          label: "GET",
          value: "GET",
        },
        {
          label: "POST",
          value: "POST",
        },
      ],
    },
  ],
};

export const componentsList: ComponentsInfo[] = [
  TextData,
  ImageData,
  InputData,
  TabsData,
  SelectData,
  FormData,
];
