<template>
  <grid-layout
    v-model:layout="layoutData"
    :style="{ width: `${layoutConfig.width}px`, minHeight: '200px' }"
    :col-num="layoutConfig.colNum"
    :row-height="layoutConfig.rowHeight"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :responsive="false"
    :auto-size="true"
    :containerPadding="[0, 0]"
    :margin="[0, 0]"
    :use-css-transforms="true"
    @layout-updated="layoutChange"
    @drop.native="drop"
    @dragend.prevent
    @dragover.prevent
    ref="gridLayoutRef"
  >
    <grid-item
      ref="gridItemRef"
      class="grid-item"
      v-for="item in layoutData"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      @resize="resizedEvent"
      @move="moveEvent"
      @resized="resizedEventEnd"
      @container-resized="containerResizedEvent"
      @moved="moveEventEnd"
    >
      <Input v-if="item.type === ComponentsType.INPUT"></Input>
      <Select
        v-if="item.type === ComponentsType.SELECT"
        v-model="item.config.value"
        :options="item.config.options"
        :style="{ width: '100%' }"
        placeholder="请选择"
        @change="
          (value, option) => {
            selectChange(value, option, item);
          }
        "
      >
      </Select>
      <GrldLayputClone
        v-if="item.type === ComponentsType.FROM"
        v-model:layoutData="item.children"
      ></GrldLayputClone>
    </grid-item>
  </grid-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { Tabs, Input, Select } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { useLayoutDataStore } from "@/stores/layoutData";
import GrldLayputClone from "./GridLayoutClone.vue";
import { ComponentsInfo, ComponentsType } from "@/typings/Component";

const TabPane = Tabs.TabPane;
const SelectOption = Select.Option;
const store = useLayoutDataStore();
// const { layoutData } = storeToRefs(store) as any;
const layoutData = ref<any>([]);
const layoutConfig = {
  width: 1200,
  colNum: 1200,
  rowHeight: 1,
};

const tabVal = ref("1");
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);

// store.$subscribe((mutation, state): any => {
//   console.log("subscribe");
//   localStorage.setItem("layoutData", JSON.stringify(state.layoutData));
// });
watch(
  () => layoutData.value,
  () => {
    console.log(JSON.parse(JSON.stringify(layoutData.value)), "qqqqqqq");
    localStorage.setItem("layoutData", JSON.stringify(layoutData.value));
  },
  { deep: true }
);

const drop = (event: DragEvent) => {
  event.preventDefault();
  if (
    (event as any).path.some((item: any) => {
      return item.className && item.className.includes("children-grid-layout");
    })
  ) {
    console.log("return啦");
    return;
  }
  const tempData = event.dataTransfer?.getData("dragData");
  if (tempData) {
    const dragData: ComponentsInfo = JSON.parse(tempData);

    const ret = gridLayoutRef.value.$el.getBoundingClientRect();
    const position = {
      x: Math.round(
        (event.pageX - ret.left) / (layoutConfig.width / layoutConfig.colNum)
      ),
      y: Math.round((event.pageY - ret.top) / layoutConfig.rowHeight),
      w: dragData.w,
      h: dragData.h,
      i: Math.random().toFixed(4),
    };
    layoutData.value.push({ ...dragData, ...position, position });
    console.log(
      "drop",
      layoutData.value,
      event.dataTransfer?.getData("dragData")
    );
  }
};

const resizedEvent = (
  i: any,
  newH: any,
  newW: any,
  newHPx: any,
  newWPx: any
) => {
  console.log("resizedEvent", i, newH, newW, newHPx, newWPx);
};
const moveEvent = (i: any, newX: any, newY: any) => {
  console.log("moveEvent", i, newX, newY);
};
const resizedEventEnd = (
  i: any,
  newH: any,
  newW: any,
  newHPx: any,
  newWPx: any
) => {
  console.log("resizedEventEnd", i, newH, newW, newHPx, newWPx);
};
const containerResizedEvent = (
  i: any,
  newH: any,
  newW: any,
  newHPx: any,
  newWPx: any
) => {
  console.log("containerResizedEvent", i, newH, newW, newHPx, newWPx);
};
const moveEventEnd = (i: any, newX: any, newY: any) => {
  console.log("moveEvent", i, newX, newY);
};

const layoutChange = () => {
  console.log("layoutChange", layoutData.value);
};

const selectChange = (value: any, option: any, data: any) => {
  console.log("selectChange", value, option, data);
  data.config.value = value;
};
</script>
<style lang="less" scoped></style>
