<template>
  <div class="drag-container" :style="{ width: gridLayoutConfig + 'px' }">
    <GridLayout
      v-model:layoutData="layoutData"
      :type="LayoutType.PREVIEW"
    ></GridLayout>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import GridLayout from "@/components/GridLayout/index.vue";
import { ComponentsType, ComponentsInfo, LayoutType } from "@/typings/Common";
import { usePageDataStore } from "@/stores/pageData";
import { gridLayoutConfig } from "@/components/GridLayout/service";

const layoutData = ref(
  JSON.parse(localStorage.getItem("layoutData") as string) as ComponentsInfo[]
);

const pageStore = usePageDataStore();
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
      pageStore.params[item.i] = params;
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
            params[v.config.key] = v.config.value.toString();
          } else if (v.type === ComponentsType.SELECT) {
            if (v.config.multiple) {
              v.config.value = [];
            }
          } else {
            params[v.config.key] = v.config.value;
          }
        }
      });
      pageStore.params["common"] = params;
    }

    item.parentId = "top";
    const params: any = {};
    if (item.config.key) {
      params[item.config.key] = item.config.value;
    }
    pageStore.params["top"] = params;
  });
  pageStore.layoutData = layoutData.value;
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
</style>
