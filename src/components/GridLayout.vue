<template>
  <div class="drag-wrap">
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
      >
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useLayoutDataStore } from "@/stores/layoutData";

const store = useLayoutDataStore();
const { layoutData } = storeToRefs(store);

const layoutConfig = {
  width: 1200,
  colNum: 600,
  rowHeight: 1,
};
store.$subscribe((mutation, state): any => {
  console.log(111, mutation, state);
});
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);

// const layoutData = ref<LayoutDataItem[]>([]);

const drop = (event: any) => {
  event.preventDefault();
  const ret = gridLayoutRef.value.$el.getBoundingClientRect();
  const position = {
    x: Math.round(
      (event.pageX - ret.left) / (layoutConfig.width / layoutConfig.colNum)
    ),
    y: Math.round((event.pageY - ret.top) / layoutConfig.rowHeight),
    w: 50,
    h: 100,
    i: Math.random().toFixed(4),
  };
  layoutData.value.push(position);
  console.log(layoutData.value, 666);
  gridLayoutRef.value.dragEvent(
    // "dragstart",
    "drop",
    position.x,
    position.y,
    position.w,
    position.h
  );
  console.log("drop", event, position, event.dataTransfer.getData("text"));
};

const layoutChange = () => {
  console.log("layoutChange", layoutData.value);
};
</script>
<style lang="less" scoped>
.drag-wrap {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  background: #eee;
  .droppable-element {
    width: 150px;
    text-align: center;
    background: #fdd;
    border: 1px solid #000;
    margin: 10px 0;
    padding: 10px;
  }
  .grid-item {
    background-color: #999;
  }
}
</style>
