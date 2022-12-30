<template>
  <grid-layout
    v-model:layout="propsData"
    :style="{
      width: `${gridLayoutConfig.width}px`,
      height: isChildren
        ? '200px'
        : (isEdit
            ? 1600
            : propsData.reduce((sum, item) => (sum += item.h), 0)) + 'px',
    }"
    :col-num="gridLayoutConfig.colNum"
    :row-height="gridLayoutConfig.rowHeight"
    :is-draggable="isEdit"
    :is-resizable="isEdit"
    :is-bounded="isEdit"
    :vertical-compact="isEdit"
    :responsive="false"
    :auto-size="isEdit"
    :containerPadding="[0, 0]"
    :margin="[0, 0]"
    :use-css-transforms="true"
    @drop.native="drop"
    @dragend.prevent
    @dragover.prevent
    ref="gridLayoutRef"
    :class="[
      'gridLayout',
      { 'gridLayout-preview': type === 'preview' },
      { 'gridLayout-children': isChildren },
    ]"
  >
    <grid-item
      ref="gridItemRef"
      :class="['grid-item', { active: editStore.currentId === item.i }]"
      v-for="item in propsData"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      @click.stop="selectGridItem(item)"
    >
      <span
        class="formKey"
        v-if="
          type === PageType.EDIT && item.type === ComponentsType.COMMONCONTAINER
        "
      >
        {{ item.config.formKey }}
      </span>
      <span
        class="remove"
        @click="removeItem(item)"
        v-if="type === PageType.EDIT"
        >x</span
      >
      <Render
        :layoutItem="item"
        :dragData="dragData"
        :type="type"
        :layoutData="layoutData"
        :isChildren="isChildren"
      ></Render>
    </grid-item>
  </grid-layout>
</template>

<script lang="ts" setup>
import { ref, watch, PropType, computed } from "vue";
import {
  ComponentsInfo,
  ComponentsType,
  LayoutDataItem,
  PageType,
} from "@/typings/Common";
import { useEditDataStore } from "@/stores/editData";
import { createUuid } from "@/utils/index";
import Render from "./Render.vue";
import { gridLayoutConfig } from "./service";
import GridLayout from "@/components/GridLayout/GridLayout.vue";
import GridItem from "@/components/GridLayout/GridItem.vue";
const props = defineProps({
  layoutData: {
    type: Array as PropType<ComponentsInfo[]>,
    default: () => [],
  },
  isChildren: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<PageType>,
    default: PageType.EDIT,
  },
});

const emit = defineEmits(["update:layoutData"]);
const editStore = useEditDataStore();
const propsData = ref(props.layoutData);
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);
const dragData = ref({} as ComponentsInfo);
const isEdit = computed(() => props.type === PageType.EDIT);

const drop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  const tempData = event.dataTransfer?.getData("dragData");
  if (tempData) {
    dragData.value = JSON.parse(tempData);
    console.log(dragData.value, "dragData");
    const ret = gridLayoutRef.value.$el.getBoundingClientRect();
    const uuid = createUuid(6);
    const position = {
      x: Math.round(
        (event.pageX - ret.left) /
          (gridLayoutConfig.width / gridLayoutConfig.colNum)
      ),
      y: Math.round((event.pageY - ret.top) / gridLayoutConfig.rowHeight),
      w: dragData.value.w,
      h: dragData.value.h,
      i: uuid,
    };
    propsData.value.push({ ...dragData.value, ...position });

    gridLayoutRef.value.dragEvent(
      "dragstart",
      "drop",
      position.x,
      position.y,
      1,
      1
    );
    emit("update:layoutData", propsData.value);
    editStore.currentId = uuid;
  }
};

const selectGridItem = (item: LayoutDataItem) => {
  if (props.type === PageType.PREVIEW) return;
  console.log(item, "selectGridItem");
  editStore.currentId = item.i;
};

const removeItem = (item: LayoutDataItem) => {
  propsData.value = propsData.value.filter((v) => v.i !== item.i);
  if (editStore.currentId === item.i) {
    editStore.currentId = "";
  }
  emit("update:layoutData", propsData.value);
};

watch(
  () => props.layoutData,
  () => {
    propsData.value = props.layoutData;
  }
);
</script>
<style lang="less" scoped>
.gridLayout {
  &.gridLayout-preview {
    .grid-item {
      border: none;
    }
  }
  .grid-item {
    border: 1px solid #333;
    &.active {
      border: 2px solid red;
      box-sizing: content-box;
    }
    .remove {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      text-align: center;
      cursor: pointer;
      z-index: 10;
    }
    .formKey {
      position: absolute;
      z-index: 111;
      color: red;
    }
  }
}
</style>
