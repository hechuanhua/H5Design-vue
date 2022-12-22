<template>
  <div class="drag-container" :style="{ width: gridLayoutConfig + 'px' }">
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
import { Spin } from "ant-design-vue";
import GridLayout from "@/components/GridLayout/index.vue";
import { ComponentsType, ComponentsInfo, PageType } from "@/typings/Common";
import { usePreviewDataStore } from "@/stores/previewData";
import { gridLayoutConfig } from "@/components/GridLayout/service";

const layoutData = ref(
  JSON.parse(localStorage.getItem("layoutData") as string) as ComponentsInfo[]
);

const previewStore = usePreviewDataStore();

const initData = () => {
  layoutData.value.forEach((item) => {
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
    }
    if (
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
    }

    item.parentId = "top";
    const params: any = {};
    if (item.config.key) {
      params[item.config.key] = item.config.value;
    }
    previewStore.params["top"] = params;
  });
  previewStore.layoutData = layoutData.value;
};

initData();
</script>

<style lang="less" scoped>
.drag-container {
  width: 1600px;
  margin: 0 auto;
  min-height: 500px;
  height: 100vh;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  background: #eee;
}
:deep(.ant-spin-nested-loading) {
  height: 100%;
  .ant-spin-container {
    height: 100%;
  }
}
</style>
