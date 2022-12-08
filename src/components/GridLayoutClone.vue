<template>
  <div style="height: 100%; background: #ccc">
    <grid-layout
      v-model:layout="props.layoutData"
      :style="{ width: `100%`, height: '100%' }"
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
      class="children-grid-layout"
    >
      <grid-item
        ref="gridItemRef"
        class="grid-item"
        v-for="(item, index) in props.layoutData"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        {{ item.i }}
        <!-- <Tabs v-model:active-key="tabVal" v-if="index === 0">
          <TabPane key="1" tab="tab1"
            >tab1
            {{ item.children }}
            <GridLayoutSlef v-if="item.children.length"></GridLayoutSlef>
          </TabPane>
          <TabPane key="2" tab="tab2"
            >tab2
            <GridLayout></GridLayout>
          </TabPane>
        </Tabs> -->
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
  name: "GridLayoutSlef",
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
});

const emit = defineEmits(["update:layoutData"]);

const TabPane = Tabs.TabPane;
const store = useLayoutDataStore();
// const { layoutData } = storeToRefs(store) as any;

const layoutConfig = {
  width: 1200,
  colNum: 600,
  rowHeight: 1,
};

const tabVal = ref("1");
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);
console.log(props.layoutData, 77);
// store.$subscribe((mutation, state): any => {
//   localStorage.setItem("layoutData", JSON.stringify(state.layoutData));
// });
// const layoutData = ref<LayoutDataItem[]>([]);

const drop = (event: DragEvent) => {
  event.preventDefault();
  const tempData = event.dataTransfer?.getData("dragData");
  console.log("children=>drop", tempData);
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
    const layoutData = props.layoutData.concat(position);

    console.log(layoutData, JSON.stringify(props.layoutData), 111);
    emit("update:layoutData", layoutData);
    console.log(
      "drop",
      props.layoutData,
      event.dataTransfer?.getData("dragData")
    );
  }
};

watch(
  () => props.layoutData,
  () => {
    console.log("watch", JSON.parse(JSON.stringify(props.layoutData)));
  }
);
const layoutChange = () => {
  // console.log("layoutChange", layoutData);
};
</script>
<style lang="less" scoped>
.grid-item {
  background-color: #999;
}
</style>
