<template>
  <Header></Header>
  <main>
    <SideMenu></SideMenu>
    <Setting></Setting>
    <div class="drag-wrap">
      <GridLayout></GridLayout>
    </div>
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

.drag-wrap {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  background: #eee;
}
</style>
