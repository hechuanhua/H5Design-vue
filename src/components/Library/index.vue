<template>
  <div class="components-list">
    <div
      :class="['components', 'components-' + item.type]"
      v-for="item in componentsList"
      :key="item.type"
      draggable="true"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ComponentsInfo, ComponentsType } from "@/typings/component";

const componentsList: ComponentsInfo[] = [
  {
    name: "文本",
    type: ComponentsType.TEXT,
    icon: "",
  },
  {
    name: "图片",
    type: ComponentsType.IMAGE,
    icon: "",
  },
  {
    name: "输入框",
    type: ComponentsType.INPUT,
    icon: "",
  },
];
</script>
<style lang="less" scoped>
.components {
  text-align: center;
  cursor: pointer;
  flex: 1;
  margin-top: 5px;
  padding: 10px 20px;
  border: 1px solid;
  width: 80px;
}
</style>
