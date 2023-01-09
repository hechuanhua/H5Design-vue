<template>
  <div
    :class="['drag-container', { webcomponents: isWebcomponents }]"
    :style="{ width: gridLayoutConfig + 'px' }"
  >
    <Spin :spinning="previewStore.loading">
      <GridLayout
        v-model:layoutData="layoutData"
        :type="PageType.PREVIEW"
      ></GridLayout>
    </Spin>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { message, Spin } from "ant-design-vue";
import { ComponentsType, ComponentsInfo, PageType } from "@/typings/Common";
import { gridLayoutConfig } from "@/components/Core/service";
import { usePreviewDataStore } from "@/stores/previewData";
import { queryTemplate } from "@/api/index";
import GridLayout from "@/components/Core/index.vue";
setActivePinia(createPinia());

const props = defineProps({
  tid: String,
  title: String,
});
console.log(props.tid, "tid");
const layoutData = ref([] as ComponentsInfo[]);
const previewStore = usePreviewDataStore();
const isWebcomponents = import.meta.env.VITE_MODE === "lib";

const getParams = (layout_data: ComponentsInfo[]) => {
  const top: any = {};
  layout_data.forEach((item) => {
    if (
      item.type === ComponentsType.CONTAINER &&
      item.children &&
      item.children.length
    ) {
      const params: any = {};
      item.children.forEach((v) => {
        v.parentId = item.i;
        if (v.config.key) {
          params[v.config.key] = v.config.value;
        }
      });
      previewStore.params[item.i] = params;
    } else if (
      item.type === ComponentsType.COMMONCONTAINER &&
      item.children &&
      item.children.length
    ) {
      const params: any = {};
      item.children.forEach((v) => {
        v.parentId = "common";
        if (v.config.key) {
          if (v.type === ComponentsType.DATEPICKER) {
            v.config.value = v.config.value.toString();
          } else if (v.type === ComponentsType.SELECT) {
            if (v.config.multiple) {
              v.config.value = [];
            }
          }
          params[v.config.key] = v.config.value;
        }
      });
      previewStore.params["common"] = params;
    } else {
      item.parentId = "top";
      if (item.config.key) {
        top[item.config.key] = item.config.value;
      }
    }
  });
  if (Object.keys(top).length) {
    previewStore.params["top"] = top;
  }
  console.log(previewStore.params, "previewStore.params");
  previewStore.layoutData = layout_data;
};

const initData = () => {
  if (isWebcomponents) {
    if (!props.tid && !props.title) return message.error("参数错误");
    const params = {} as { title?: string; tid?: string };
    if (props.tid) {
      params.tid = props.tid;
    }
    if (props.title) {
      params.title = props.title;
    }
    queryTemplate(params).then((res: any) => {
      const layout_data = JSON.parse(res.layout_data) as ComponentsInfo[];
      getParams(layout_data);
      layoutData.value = layout_data;
    });
  } else {
    layoutData.value = JSON.parse(localStorage.getItem("layoutData") || "[]");
    getParams(layoutData.value);
  }
};

initData();
</script>

<style lang="less" scoped>
.drag-container {
  width: 1600px;
  margin: 0 auto;
  min-height: 500px;
  height: 100%;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  background-color: #f0f2f5;
  &.webcomponents {
    margin: inherit;
    min-height: auto;
    box-shadow: none;
  }
}
:deep(.ant-spin-nested-loading) {
  height: 100%;
  .ant-spin-container {
    height: 100%;
  }
}
</style>
