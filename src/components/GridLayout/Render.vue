<template>
  <div :class="`components-${propsLayoutItem.type} h100`">
    <div
      v-if="propsLayoutItem.type === ComponentsType.TEXT"
      :style="{
        fontSize: propsLayoutItem.config.size + 'px',
        color: propsLayoutItem.config.color,
        lineHeight: propsLayoutItem.h + 'px',
        whiteSpace: 'pre',
      }"
      v-html="propsLayoutItem.config.value"
    ></div>

    <Input
      v-if="propsLayoutItem.type === ComponentsType.INPUT"
      v-model:value="propsLayoutItem.config.value"
      :placeholder="propsLayoutItem.config.placeholder"
      @pressEnter="onChange(propsLayoutItem.config.value)"
    ></Input>

    <Select
      v-if="propsLayoutItem.type === ComponentsType.SELECT"
      v-model:value="propsLayoutItem.config.value"
      :options="propsLayoutItem.config.options"
      :style="{ width: '100%' }"
      :placeholder="propsLayoutItem.config.placeholder"
      :mode="propsLayoutItem.config.multiple ? 'multiple' : undefined"
      @change="
        (value) => {
          onChange(value);
        }
      "
    ></Select>

    <div v-if="propsLayoutItem.type === ComponentsType.ECHARTS" class="h100">
      <div
        ref="echartsRef"
        v-if="echartData"
        class="echart"
        :style="{
          width: propsLayoutItem.w + 'px',
          height: propsLayoutItem.h + 'px',
        }"
      ></div>
      <Empty :image="simpleImage" v-else></Empty>
    </div>

    <RangePicker
      v-if="propsLayoutItem.type === ComponentsType.DATEPICKER"
      @change="onRangePickerChange"
    >
    </RangePicker>

    <Table
      v-if="propsLayoutItem.type === ComponentsType.TABLE"
      :columns="tableColumn"
      :data-source="tableSource"
      :scroll="{
        x: 1200,
        y: propsLayoutItem.y,
      }"
    >
    </Table>

    <Button
      v-if="propsLayoutItem.type === ComponentsType.BUTTON"
      :type="'primary'"
    >
      {{ propsLayoutItem.config.text }}
    </Button>

    <RadioGroup
      v-if="propsLayoutItem.type === ComponentsType.RADIOGROUP"
      :options="propsLayoutItem.config.options"
      :optionType="propsLayoutItem.config.type ? 'default' : 'button'"
      v-model:value="propsLayoutItem.config.value"
      @change="onChange(propsLayoutItem.config.value)"
    >
    </RadioGroup>

    <Tabs
      v-if="propsLayoutItem.type === ComponentsType.TABS"
      @change="onChange"
      :type="'card'"
    >
      <TabPane
        v-for="v in propsLayoutItem.config.options"
        :key="v.value"
        :tab="v.label"
        style="height: 300px"
        :forceRender="true"
      >
        <GridLayout
          v-model:layoutData="v.children"
          :style="{ width: `100%`, height: '100%' }"
          :isChildren="true"
          :dragData="dragData"
          :type="type"
        ></GridLayout>
      </TabPane>
    </Tabs>

    <GridLayout
      v-if="propsLayoutItem.type === ComponentsType.COMMONCONTAINER"
      v-model:layoutData="propsLayoutItem.children"
      :style="{ width: `100%`, height: '100%' }"
      :isChildren="true"
      :dragData="dragData"
      :type="type"
    ></GridLayout>

    <GridLayout
      v-if="propsLayoutItem.type === ComponentsType.CONTAINER"
      v-model:layoutData="propsLayoutItem.children"
      :style="{ width: `100%`, height: '100%' }"
      :isChildren="true"
      :dragData="dragData"
      :type="type"
    ></GridLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType } from "vue";
import {
  Input,
  Select,
  RangePicker,
  Table,
  Button,
  Empty,
  Tabs,
  Radio,
} from "ant-design-vue";
import * as echarts from "echarts";
import { ComponentsInfo, ComponentsType, LayoutType } from "@/typings/Common";
import GridLayout from "./index.vue";
import { usePageDataStore } from "@/stores/pageData";
import request from "@/utils/request";
import { useEchartsData, useTableData } from "./useData";

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const props = defineProps({
  layoutData: {
    type: Array as PropType<ComponentsInfo[]>,
    default: () => [],
  },
  layoutItem: {
    type: Object as PropType<ComponentsInfo>,
    default: () => {},
  },
  dragData: {
    type: Object as PropType<ComponentsInfo>,
    default: () => {},
  },
  isChildren: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<LayoutType>,
    default: LayoutType.EDIT,
  },
});

const pageStore = usePageDataStore();
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const tableColumn = ref([]);
const tableSource = ref<any>();
const echartsRef = ref();
const echartData = ref<any>();
const propsLayoutItem = ref(props.layoutItem);
let echart = null as any;

const getCommonParams = () => {
  const params: any = {};
  // console.log(props.layoutData, 333, props.layoutItem, pageStore.layoutData);
  pageStore.layoutData.forEach((item: any) => {
    if (item.type === ComponentsType.COMMONCONTAINER && item.children.length) {
      item.children.forEach((v: any) => {
        if (v.config.key) {
          params[v.config.key] = v.config.value;
        }
      });
    }
  });
  console.log(params, "getCommonParams");
  return params;
};

const getCurrentContainerParams = () => {
  const params: any = {};
  props.layoutData.forEach((item) => {
    if (item.config.key) {
      params[item.config.key] = item.config.value;
    }
  });
  console.log(params, "getCurrentContainerParams");
  return params;
};

const onChange = (value: any) => {
  console.log(value, propsLayoutItem.value, 888);
  if (props.type === LayoutType.EDIT) return;
  propsLayoutItem.value.config.value = value;
  const parentId = propsLayoutItem.value.parentId;
  if (parentId) {
    pageStore.params[parentId] = getCurrentContainerParams();
  }
};

const onRangePickerChange = (val: any) => {
  console.log(val, 333);
};

const getFormDataParams = () => {
  if (!propsLayoutItem.value.config.params) return pageStore.params;
  const init_params = JSON.parse(propsLayoutItem.value.config.params);
  const parentId = propsLayoutItem.value.parentId;
  let currentContainerParams = {};
  if (parentId) {
    currentContainerParams = pageStore.params[parentId];
  }
  // 合并参数
  const mergeParams = JSON.parse(
    JSON.stringify(
      Object.assign({}, pageStore.params["common"], currentContainerParams)
    )
  );

  // 转化参数
  const extra_filters: any[] = [];
  Object.keys(mergeParams).forEach((item: any) => {
    extra_filters.push({
      col: item,
      op: item === "__time_range" ? "==" : "in",
      val: mergeParams[item],
    });
  });
  init_params.extra_filters = extra_filters;

  const formData = new FormData();
  formData.append("form_data", JSON.stringify(init_params));
  console.log(
    mergeParams,
    pageStore.params,
    currentContainerParams,
    extra_filters,
    "合并参数"
  );
  return formData;
};

const fetchPageData = () => {
  if (propsLayoutItem.value.type === ComponentsType.COMMONCONTAINER) return;
  if (
    !propsLayoutItem.value.config.api ||
    !propsLayoutItem.value.config.api.url
  )
    return;
  request({
    url: `/api${propsLayoutItem.value.config.api.url}`,
    data: getFormDataParams(),
    method: propsLayoutItem.value.config.api.method,
  }).then((res: any) => {
    const type = propsLayoutItem.value.type;
    if (type === ComponentsType.ECHARTS) {
      if (!res.data || (res.data && !res.data.length)) {
        return (echartData.value = null);
      }
      const options = useEchartsData(
        res,
        propsLayoutItem.value.config.echartsType
      );
      console.log(options, "options");
      initEcharts(options);
    } else if (type === ComponentsType.TABLE) {
      tableColumn.value = useTableData(res);
      tableSource.value = res.data.records;
    }
  });
};

watch(
  () => props.layoutItem,
  () => {
    propsLayoutItem.value = props.layoutItem;
  }
);

if (propsLayoutItem.value.config.api?.url) {
  const parentId = propsLayoutItem.value.parentId;
  console.log(propsLayoutItem.value.parentId, "api.url", pageStore.params);
  if (parentId) {
    watch(
      () => pageStore.params[parentId],
      (newVal, oldVal) => {
        console.log(
          "pageStore.params.parentId=>watch",
          pageStore.params.parentId
        );
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
        fetchPageData();
      },
      {
        immediate: true,
      }
    );
  }
  watch(
    () => pageStore.params["common"],
    (newVal, oldVal) => {
      console.log("pageStore.params.common=>watch", pageStore.params.common);
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
      fetchPageData();
    },
    {
      immediate: true,
    }
  );
}

// }

const initEcharts = (data: any) => {
  if (propsLayoutItem.value.type === ComponentsType.ECHARTS) {
    if (!data) return;
    echartData.value = data;
    setTimeout(() => {
      echart = echarts.init(echartsRef.value);
      echart.setOption(data);
      echart.resize();
    }, 100);
  }
};

onMounted(() => {
  if (props.type === LayoutType.PREVIEW) return;
  initEcharts(propsLayoutItem.value.config.echartData);
});
</script>
<style lang="less" scoped>
.echart {
  height: 100%;
  width: 100%;
}
</style>
