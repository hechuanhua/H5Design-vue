import { ComponentsInfo, ComponentsType, ColumnType } from "@/typings/Common";
import { echartOptions } from "./exampleData";

export const gridLayoutConfig = {
  width: 1600,
  colNum: 1600,
  rowHeight: 1,
};

const TextData = {
  name: "文本",
  type: ComponentsType.TEXT,
  w: 200,
  h: 32,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    value: "我是默认文字",
    size: 14,
    color: "#333333",
    lineheight: 32,
  },
  column: [
    {
      key: "value",
      label: "文字",
      type: ColumnType.INPUT,
    },
    {
      key: "size",
      label: "字体大小",
      type: ColumnType.NUMBER,
    },
    {
      key: "color",
      label: "文字颜色",
      type: ColumnType.COLOR,
    },
  ],
};

const ButtonData = {
  name: "按钮",
  type: ComponentsType.BUTTON,
  w: 64,
  h: 32,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    text: "按钮",
  },
  column: [
    {
      key: "text",
      label: "文字",
      type: ColumnType.INPUT,
    },
  ],
};

const ImageData = {
  name: "图片",
  type: ComponentsType.TEXT,
  w: 300,
  h: 50,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {},
  column: [],
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
    key: "",
    value: "",
    placeholder: "请输入",
  },

  column: [
    {
      key: "key",
      type: ColumnType.INPUT,
      label: "组件key",
    },
    {
      key: "placeholder",
      type: ColumnType.INPUT,
      label: "提示文案",
    },
    // {
    //   key: "value",
    //   label: "文本",
    //   type: ColumnType.INPUT,
    // },
  ],
};

const TabsData = {
  name: "Tabs",
  type: ComponentsType.TABS,
  w: gridLayoutConfig.width,
  h: 500,
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
        children: [],
      },
    ],
  },
  column: [
    {
      key: "value",
      label: "选项",
      type: ColumnType.SELECT_EDIT,
    },
  ],
};

const RadioRroupData = {
  name: "RadioRroup",
  type: ComponentsType.RADIOGROUP,
  w: 300,
  h: 32,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    value: "1",
    key: "",
    options: [
      {
        label: "选项1",
        value: "1",
      },
    ],
    type: false,
    api: {
      url: "",
      method: "post",
    },
    params: "",
  },
  column: [
    {
      key: "key",
      type: ColumnType.INPUT,
      label: "组件key",
    },
    {
      key: "value",
      label: "选项",
      type: ColumnType.SELECT_EDIT,
    },
    {
      key: "type",
      label: "切换类型",
      type: ColumnType.SWITCH,
    },
    {
      key: "api",
      type: ColumnType.API,
      label: "API地址",
      options: [
        {
          label: "get",
          value: "get",
        },
        {
          label: "post",
          value: "post",
        },
      ],
    },
    {
      key: "params",
      type: ColumnType.TEXTAREA,
      label: "初始参数",
    },
  ],
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
    key: "",
    value: "1",
    options: [
      {
        label: "选项1",
        value: "1",
      },
    ],
    multiple: false,
    placeholder: "请选择",
  },
  column: [
    {
      key: "key",
      type: ColumnType.INPUT,
      label: "组件key",
    },
    {
      key: "value",
      label: "选项",
      type: ColumnType.SELECT_EDIT,
    },
    {
      key: "multiple",
      label: "是否多选",
      type: ColumnType.SWITCH,
    },
    {
      key: "placeholder",
      type: ColumnType.INPUT,
      label: "提示文案",
    },
  ],
};

const FormData = {
  name: "全局查询容器",
  type: ComponentsType.COMMONCONTAINER,
  w: gridLayoutConfig.width,
  h: 200,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    formKey: "",
    url: "",
    method: "GET",
  },
  children: [],
  column: [
    {
      key: "formKey",
      type: ColumnType.INPUT,
      label: "表单key",
    },
  ],
};

const ContainerData = {
  name: "容器",
  type: ComponentsType.CONTAINER,
  w: gridLayoutConfig.width,
  h: 400,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    formKey: "",
  },
  children: [],
  column: [
    {
      key: "formKey",
      type: ColumnType.INPUT,
      label: "表单key",
    },
  ],
};

const EchartsData = {
  name: "echarts",
  type: ComponentsType.ECHARTS,
  w: gridLayoutConfig.width,
  h: 350,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    echartData: echartOptions,
    link: "",
    api: {
      url: "",
      method: "post",
    },
    params: "",
    echartsType: "bar",
  },
  column: [
    // {
    //   key: "link",
    //   type: ColumnType.INPUT,
    //   label: "关联表单key",
    // },
    {
      key: "api",
      type: ColumnType.API,
      label: "API地址",
      options: [
        {
          label: "get",
          value: "get",
        },
        {
          label: "post",
          value: "post",
        },
      ],
    },
    {
      key: "params",
      type: ColumnType.TEXTAREA,
      label: "初始参数",
    },
    {
      key: "echartsType",
      type: ColumnType.RADIO,
      label: "图表类型",
      options: [
        {
          label: "柱状图",
          value: "bar",
        },
        {
          label: "折线图",
          value: "line",
        },
        {
          label: "饼图",
          value: "pie",
        },
      ],
    },
  ],
};

const DatePickerData = {
  name: "日期选择器",
  type: ComponentsType.DATEPICKER,
  w: 265,
  h: 32,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    value: [],
    key: "",
  },
  column: [
    {
      key: "key",
      type: ColumnType.INPUT,
      label: "组件key",
    },
  ],
};

const TableData = {
  name: "表格",
  type: ComponentsType.TABLE,
  w: gridLayoutConfig.width,
  h: 222,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    link: "",
    api: {
      url: "",
      method: "post",
    },
    params: "",
  },
  column: [
    {
      key: "link",
      type: ColumnType.INPUT,
      label: "关联表单key",
    },
    {
      key: "api",
      type: ColumnType.API,
      label: "API地址",
      options: [
        {
          label: "get",
          value: "get",
        },
        {
          label: "post",
          value: "post",
        },
      ],
    },
    {
      key: "params",
      type: ColumnType.TEXTAREA,
      label: "初始参数",
    },
  ],
};

export const componentsList: ComponentsInfo[] = [
  TextData,
  ButtonData,
  // ImageData,
  InputData,
  TabsData,
  SelectData,
  FormData,
  EchartsData,
  DatePickerData,
  TableData,
  RadioRroupData,
  ContainerData,
];
