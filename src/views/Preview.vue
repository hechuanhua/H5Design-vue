<template>
  <div class="drag-container">
    <GridLayout
      v-model:layoutData="layoutData"
      :type="LayoutType.PREVIEW"
    ></GridLayout>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import GridLayout from "@/components/GridLayout/index.vue";
import {
  ComponentsType,
  ComponentsInfo,
  LayoutType,
} from "@/typings/Component";

const layoutData = ref(
  JSON.parse(localStorage.getItem("layoutData") as string) as ComponentsInfo[]
);

const initData = () => {
  layoutData.value.forEach((item) => {
    if (
      item.type === ComponentsType.FROM &&
      item.children &&
      item.children.length
    ) {
      item.children.forEach((v) => {
        v.formConfig = item.config;
      });
    }
  });
  console.log(JSON.parse(JSON.stringify(layoutData.value)), "transform");
};

initData();
</script>

<style lang="less" scoped>
.drag-container {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  background: #eee;
}
</style>
