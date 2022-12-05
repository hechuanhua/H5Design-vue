<template>
  <div class="menu-wrap">
    <Menu
      :selectedKeys="[1]"
      mode="inline"
      theme="dark"
      @select="select"
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
    </Menu>
    <Library></Library>
  </div>
</template>
<script setup lang="ts">
import { Menu } from "ant-design-vue";
import Library from "@/components/Library/index.vue";
const MenuItem = Menu.Item;

const select = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
  console.log(item, key, keyPath, selectedKeys, domEvent);
};
</script>

<style lang="less" scoped>
.menu-wrap {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  background: #fff;
  width: 380px;
  display: flex;
}
</style>
