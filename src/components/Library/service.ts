import { ComponentsInfo, ComponentsType } from "@/typings/Component";

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
    text: "",
  },
  column: [
    {
      key: "text",
      label: "文本",
      type: ComponentsType.TEXT,
    },
  ],
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
    key: "",
    value: "",
  },
  position: {},
  column: [
    {
      key: "key",
      type: ComponentsType.INPUT,
      label: "组件key",
    },
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
    key: "",
    value: "1",
    options: [
      {
        label: "选项1",
        value: "1",
      },
    ],
    transformCode: `function transformData(data) {
      // data 表示接口返回的数据源2222
      const newData = []
      console.log(data);
  
      return newData  // 返回自定义数据结构
  }`,
  },
  position: {},
  column: [
    {
      key: "key",
      type: ComponentsType.INPUT,
      label: "组件key",
    },
    {
      key: "value",
      label: "选项",
      type: ComponentsType.SELECT_EDIT,
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
    formKey: "",
    url: "",
    method: "GET",
  },
  position: {},
  children: [],
  column: [
    {
      key: "formKey",
      type: ComponentsType.INPUT,
      label: "表单key",
    },
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

const LineBarData = {
  name: "echart",
  type: ComponentsType.LINEBAR,
  w: 600,
  h: 350,
  x: 0,
  y: 0,
  i: "",
  icon: "",
  config: {
    echartData: {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    },
    link: "",
    transformCode: `function transformData(data) {
      // data 表示接口返回的数据源3333
      const newData = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      }
      console.log(data);
  
      return newData  // 返回自定义数据结构
  }`,
  },
  position: {},
  column: [
    {
      key: "link",
      type: ComponentsType.INPUT,
      label: "关联表单key",
    },
    {
      key: "transformCode",
      type: ComponentsType.CODE,
      label: "自定义转换函数",
      options: [],
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
  LineBarData,
];
