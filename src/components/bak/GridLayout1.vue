<template>
  <div class="drag-wrap">
    <div
      @drag="onDrop"
      @dragend="onDragStop"
      @dragstart="dragstart"
      class="droppable-element"
      draggable="true"
      unselectable="on"
    >
      Droppable Element (Drag me!)
    </div>
    <grid-layout
      v-model:layout="layoutData"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :auto-size="true"
      :containerPadding="[0, 0]"
      :margin="[0, 0]"
      :use-css-transforms="true"
      @layout-updated="layoutChange"
      @drag-start="onDragStart"
      @resize-stop="onResizeStop"
      @drop.native="drop"
      @dragend.native="dropend"
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
        @resized="resizeEvent"
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
// const { layoutData } = storeToRefs(store);

let mouseXY = { x: 0, y: 0 };
let DragPos = { x: 0, y: 0, w: 1, h: 1, i: "" };
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);
const drop = (event: any) => {
  event.preventDefault();
  console.log("drop", event.dataTransfer.getData("text"));
};
const dropend = (event: any) => {
  event.preventDefault();
  console.log("dropend");
};
const dragstart = (e: any) => {
  console.log("dragstart");
  if (e.dataTransfer) {
    e.dataTransfer.setData("text/plain", "aaaa");
  }
};

const layoutData = ref([
  { x: 0, y: 0, w: 2, h: 2, i: "0" },
  { x: 2, y: 0, w: 2, h: 4, i: "1" },
  { x: 4, y: 0, w: 2, h: 5, i: "2" },
  { x: 6, y: 0, w: 2, h: 3, i: "3" },
  { x: 8, y: 0, w: 2, h: 3, i: "4" },
  { x: 10, y: 0, w: 2, h: 3, i: "5" },
  { x: 0, y: 5, w: 2, h: 5, i: "6" },
  { x: 2, y: 5, w: 2, h: 5, i: "7" },
  { x: 4, y: 5, w: 2, h: 5, i: "8" },
  { x: 5, y: 10, w: 4, h: 3, i: "9" },
]);

const layoutChange = () => {
  console.log("layoutChange");
};
const resizeEvent = () => {
  console.log("resizeEvent");
};
const onDrop = () => {
  console.log("onDrop");
  let parentRect = gridLayoutRef.value.$el.getBoundingClientRect();
  let mouseInGrid = false;
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true;
  }
  if (
    mouseInGrid === true &&
    layoutData.value.findIndex((item) => item.i === "drop") === -1
  ) {
    layoutData.value.push({
      x: (layoutData.value.length * 2) % 12,
      y: layoutData.value.length + 12, // puts it at the bottom
      w: 1,
      h: 1,
      i: "drop",
    });
  }
  let index = layoutData.value.findIndex((item) => item.i === "drop");
  if (index !== -1) {
    try {
      gridItemRef.value[layoutData.value.length].$el.style.display = "none";
    } catch {}
    const el = gridItemRef.value[index];
    if (!el) return;
    el.dragging = {
      top: mouseXY.y - parentRect.top,
      left: mouseXY.x - parentRect.left,
    };

    let new_pos = el.calcXY(
      mouseXY.y - parentRect.top,
      mouseXY.x - parentRect.left
    );
    if (mouseInGrid === true) {
      gridLayoutRef.value.dragEvent(
        "dragstart",
        "drop",
        new_pos.x,
        new_pos.y,
        1,
        1
      );
      DragPos.i = String(index);
      DragPos.x = layoutData.value[index].x;
      DragPos.y = layoutData.value[index].y;
    }
    if (mouseInGrid === false) {
      gridLayoutRef.value.dragEvent(
        "dragend",
        "drop",
        new_pos.x,
        new_pos.y,
        1,
        1
      );
      layoutData.value = layoutData.value.filter((obj) => obj.i !== "drop");
    }
  }
};
const onDragStart = () => {
  console.log("onDragStart");
};
const onDragStop = () => {
  console.log("onDragStop");

  let parentRect = gridLayoutRef.value.$el.getBoundingClientRect();
  let mouseInGrid = false;
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true;
  }
  if (mouseInGrid === true) {
    console.log(
      `Dropped element props:\n${JSON.stringify(
        DragPos,
        ["x", "y", "w", "h"],
        2
      )}`
    );
    gridLayoutRef.value.dragEvent(
      "dragend",
      "drop",
      DragPos.x,
      DragPos.y,
      1,
      1
    );
    layoutData.value = layoutData.value.filter((obj) => obj.i !== "drop");
    // UNCOMMENT below if you want to add a grid-item
    /*
    layoutData.value.push({
        x: DragPos.x,
        y: DragPos.y,
        w: 1,
        h: 1,
        i: DragPos.i,
    });
    gridLayoutRef.value.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
    try {
        gridLayoutRef.value.$children[layoutData.value.length].$refs.item.style.display="block";
    } catch {
    }
    */
  }
};
const onResizeStop = () => {
  console.log("onResizeStop");
};

onMounted(() => {
  document.addEventListener(
    "dragover",
    function (e) {
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
    },
    false
  );
});
</script>
<style lang="less" scoped>
.drag-wrap {
  width: 1260px;
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
