<template>
  <div :class="`${propsData.type}-setting`" style="height: 100%">
    <div v-if="propsData.type === ComponentsType.TEXT">
      {{ propsData.config.text }}
    </div>
    <Input
      v-if="propsData.type === ComponentsType.INPUT"
      v-model:value="propsData.config.value"
      @pressEnter="onInputPressEnter(propsData.config.value)"
    ></Input>
    <Select
      v-if="propsData.type === ComponentsType.SELECT"
      v-model="propsData.config.value"
      :options="propsData.config.options"
      :style="{ width: '100%' }"
      placeholder="请选择"
      @change="
        (value, option) => {
          onSelectChange(value, option);
        }
      "
    >
    </Select>
    <Select
      v-if="propsData.type === ComponentsType.LINK"
      v-model="propsData.config.link"
      :options="propsData.config.options"
      :style="{ width: '100%' }"
      placeholder="请选择"
      @change="
        (value, option) => {
          onSelectChange(value, option);
        }
      "
    >
    </Select>
    <div
      ref="echartsRef"
      v-if="propsData.type === ComponentsType.LINEBAR"
      class="echart"
    ></div>
    <GridLayout
      v-if="propsData.type === ComponentsType.FROM"
      v-model:layoutData="propsData.children"
      :style="{ width: `100%`, height: '100%', background: '#ccc' }"
      :isChildren="true"
      :dragData="dragData"
      :type="type"
    ></GridLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, nextTick } from "vue";
import { Tabs, Input, Select } from "ant-design-vue";
import * as echarts from "echarts";
import {
  ComponentsInfo,
  ComponentsType,
  LayoutDataItem,
  LayoutType,
} from "@/typings/Component";
import GridLayout from "./index.vue";

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
  responseData: {
    type: Object as PropType<any>,
    default: () => {},
  },
});

const emit = defineEmits(["update:responseData"]);
const echartsRef = ref();
const propsData = ref(props.layoutItem);
// const responseData = ref<any>();
console.log(777);
const getParams = () => {
  const params: any = {};
  props.layoutData.forEach((item: any) => {
    if (item.config.key) {
      params[item.config.key] = item.config.value;
    }
  });
  console.log(params, "params");
  return params;
};

const onSelectChange = (value: any, option: any) => {
  console.log(
    "onSelectChange",
    value,
    option,
    props.layoutItem,
    props.layoutData
  );
  if (props.type === LayoutType.EDIT) return;
  props.layoutItem.config.value = value;
  const formConfig = props.layoutItem.formConfig;
  if (formConfig) {
    const params = getParams();
    fetch(formConfig.url + "?" + new URLSearchParams(params))
      .then((res) => res.json())
      .then((res: any) => {
        // responseData.value = res.data;
        emit("update:responseData", res.data);
        console.log(res, 666);
        // props.data.config.transformCode
        // const fn = new Function(`return ${code}`);
        // fn()({ a: 1 });
      });
  }
};

const onInputPressEnter = (value: string) => {
  if (props.type === LayoutType.EDIT) return;
  props.layoutItem.config.value = value;
  const formConfig = props.layoutItem.formConfig;
  if (formConfig) {
    const params = getParams();
    fetch(formConfig.url + "?" + new URLSearchParams(params)).then((res) => {
      console.log(res, 666);
    });
  }
};

watch(
  () => props.layoutItem,
  () => {
    console.log(222);
    propsData.value = props.layoutItem;
  }
);

onMounted(() => {
  console.log("nextTick => echart", props.dragData);
  if (props.type === LayoutType.EDIT) {
    if (props.dragData.type === ComponentsType.LINEBAR) {
      nextTick(() => {
        const echart = echarts.init(echartsRef.value);
        echart.setOption(props.dragData.config.echartData);
      });
    }
  } else {
    if (propsData.value.type === ComponentsType.LINEBAR) {
      const echart = echarts.init(echartsRef.value);
      setTimeout(() => {
        echart.setOption(propsData.value.config.echartData);
        echart.resize();
      }, 100);
    }
  }
});
</script>
<style lang="less" scoped>
.echart {
  height: 100%;
  width: 100%;
}
</style>
