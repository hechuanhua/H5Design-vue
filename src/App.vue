<template>
  <Header></Header>
  <main>
    <SideMenu></SideMenu>
    <Setting></Setting>
    <GridLayout></GridLayout>
  </main>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import SideMenu from "@/components/SideMenu.vue";
import Setting from "@/components/Setting.vue";
import GridLayout from "@/components/GridLayout.vue";
</script>

<style lang="less" scoped>
main {
  top: 60px;
  width: 100%;
  margin-top: 100px;
}
</style>
