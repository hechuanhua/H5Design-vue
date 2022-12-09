<template>
  <grid-layout
    v-model:layout="propsData"
    :style="{ width: `100%`, height: '100%', background: '#ccc' }"
    :col-num="layoutConfig.colNum"
    :row-height="layoutConfig.rowHeight"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :is-bounded="true"
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
    :class="{ 'children-grid-layout': isChildren }"
  >
    <grid-item
      ref="gridItemRef"
      class="grid-item"
      v-for="(item, index) in propsData"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
    >
      {{ item.i }}
      {{ isChildren }}222
      <Input v-if="item.type === ComponentsType.INPUT"></Input>
      <GridLayoutClone
        v-if="item.type === ComponentsType.FROM"
        v-model:layoutData="item.children"
        :isChildren="true"
      ></GridLayoutClone>
    </grid-item>
  </grid-layout>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { ComponentsInfo, ComponentsType } from "@/typings/Component";

export default defineComponent({
  name: "GridLayoutClone",
});
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Tabs } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { useLayoutDataStore } from "@/stores/layoutData";

const props = defineProps({
  layoutData: {
    type: Array<any>,
    default: () => [],
  },
  isChildren: {
    type: Boolean,
    default: false,
  },
});

const propsData = ref(props.layoutData);
const emit = defineEmits(["update:layoutData"]);

const TabPane = Tabs.TabPane;

const layoutConfig = {
  width: 1200,
  colNum: 600,
  rowHeight: 1,
};

const tabVal = ref("1");
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);

const drop = (event: DragEvent) => {
  event.preventDefault();
  const tempData = event.dataTransfer?.getData("dragData");
  console.log("children=>drop", props);
  if (tempData) {
    const dragData: any = JSON.parse(tempData);

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
    propsData.value = props.layoutData.concat(position);

    console.log(propsData.value, JSON.stringify(props.layoutData), 111);
    emit("update:layoutData", propsData.value);
    console.log(
      "drop",
      props.layoutData,
      event.dataTransfer?.getData("dragData")
    );
  }
};

const layoutChange = () => {
  // console.log("layoutChange", layoutData);
};
</script>
<style lang="less" scoped>
.grid-item {
  background-color: #999;
}
</style>
