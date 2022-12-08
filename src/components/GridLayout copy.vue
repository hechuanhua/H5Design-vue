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
      :x="item.position.x"
      :y="item.position.y"
      :w="item.position.w"
      :h="item.position.h"
      :i="item.position.i"
      :key="item.position.i"
      @resize="resizedEvent"
      @move="moveEvent"
      @resized="resizedEventEnd"
      @container-resized="containerResizedEvent"
      @moved="movedEvent"
    >
      > >
      <Input v-if="item.type === ComponentsType.INPUT"></Input>
      <Select v-if="item.type === ComponentsType.SELECT">
        <SelectOptions>111</SelectOptions>
        <SelectOptions>222</SelectOptions>
      </Select>
    </grid-item>
  </grid-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Tabs, Input, Select } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { useLayoutDataStore } from "@/stores/layoutData";
import GrldLayputClone from "./GridLayoutClone.vue";
import { ComponentsInfo, ComponentsType } from "@/typings/Component";

const TabPane = Tabs.TabPane;
const SelectOptions = Select.Option;
const store = useLayoutDataStore();
const { layoutData } = storeToRefs(store);

const layoutConfig = {
  width: 1200,
  colNum: 600,
  rowHeight: 1,
};

const tabVal = ref("1");
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);

store.$subscribe((mutation, state): any => {
  console.log("subscribe");
  localStorage.setItem("layoutData", JSON.stringify(state.layoutData));
});

const drop = (event: DragEvent) => {
  event.preventDefault();
  const tempData = event.dataTransfer?.getData("dragData");
  if (tempData) {
    const dragData: any = JSON.parse(tempData);

    const ret = gridLayoutRef.value.$el.getBoundingClientRect();
    const position = {
      x: Math.round(
        (event.pageX - ret.left) / (layoutConfig.width / layoutConfig.colNum)
      ),
      y: Math.round((event.pageY - ret.top) / layoutConfig.rowHeight),
      w: dragData.width,
      h: dragData.height,
      i: Math.random().toFixed(4),
    };
    dragData.position = position;
    layoutData.value.push(dragData);
    console.log(JSON.stringify(position));
    gridLayoutRef.value.dragEvent(
      // "dragstart",
      "drop",
      position.x,
      position.y,
      position.w,
      position.h
    );
    console.log(JSON.stringify(layoutData.value), 88);
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
const moveEvent = (i: any, newH: any, newW: any, newHPx: any, newWPx: any) => {
  console.log("moveEvent", i, newH, newW, newHPx, newWPx);
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
const movedEvent = (i: any, newH: any, newW: any, newHPx: any, newWPx: any) => {
  console.log("movedEvent", i, newH, newW, newHPx, newWPx);
};

const layoutChange = () => {
  console.log("layoutChange", layoutData.value);
};
</script>
<style lang="less" scoped>
.grid-item {
  background-color: #999;
}
</style>
