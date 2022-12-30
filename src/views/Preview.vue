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
import { createPinia, setActivePinia } from "pinia";
import { Spin } from "ant-design-vue";
import GridLayout from "@/components/Core/index.vue";
import { ComponentsType, ComponentsInfo, PageType } from "@/typings/Common";
import { gridLayoutConfig } from "@/components/Core/service";
import { usePreviewDataStore } from "@/stores/previewData";
import { getTemplateByTid } from "@/api/index";
setActivePinia(createPinia());

const props = defineProps({
  tid: String,
});
console.log(props.tid, " tid");
const layoutData = ref(
  (JSON.parse(
    localStorage.getItem("layoutData") as string
  ) as ComponentsInfo[]) || []
);

const previewStore = usePreviewDataStore();

const initData = () => {
  if (import.meta.env.MODE === "lib") {
    if (!props.tid) return;
    getTemplateByTid(props.tid).then((res: any) => {
      layoutData.value = JSON.parse(res.layout_data);
    });
  }
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
      previewStore.params[item.i] = params;
    }

    item.parentId = "top";
    const params: any = {};
    if (item.config.key) {
      params[item.config.key] = item.config.value;
    }
    previewStore.params[item.i] = params;
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
  height: 100%;
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
