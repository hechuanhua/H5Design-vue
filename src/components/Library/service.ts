import { ComponentsInfo, ComponentsType } from "@/typings/Component";

export const initData = () => {};

export const componentsList: ComponentsInfo[] = [
  {
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
  },
  {
    name: "图片",
    type: ComponentsType.IMAGE,
    w: 30,
    h: 50,
    x: 0,
    y: 0,
    i: "",
    icon: "",
    config: {},
    position: {},
  },
  {
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
  },
  {
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
  },
  {
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
    position: {},
  },
  {
    name: "表单容器",
    type: ComponentsType.FROM,
    w: 1200,
    h: 200,
    x: 0,
    y: 0,
    i: "",
    icon: "",
    config: {
      value: "1",
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
    position: {},
    children: [],
  },
];
