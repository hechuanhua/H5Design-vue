<template>
  <div class="menu-container">
    <Menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inlineCollapsed="false"
      :style="{
        width: '100px',
        background: '#fff',
        color: '#000',
        borderRight: '1px solid #ccd5db',
        boxShadow: '-1px 0 0 0 #e6ebed',
      }"
    >
      <MenuItem :key="1">组件库</MenuItem>
      <MenuItem :key="2">模板库</MenuItem>
    </Menu>
    <Library v-if="selectedKeys[0] === 1"></Library>
    <Template v-if="selectedKeys[0] === 2"></Template>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Menu } from "ant-design-vue";
import Library from "@/components/Library/index.vue";
import Template from "@/components/Template.vue";
const MenuItem = Menu.Item;
const selectedKeys = ref([1]);
</script>

<style lang="less" scoped>
.menu-container {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex;
}
</style>
