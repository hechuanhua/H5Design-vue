<template>
  <Header></Header>
  <main>
    <SideMenu></SideMenu>
    <Setting></Setting>
    <div class="drag-container" :style="{ width: gridLayoutConfig + 'px' }">
      <GridLayout v-model:layoutData="editStore.layoutData"></GridLayout>
    </div>
  </main>
</template>
<script setup lang="ts">
import { watch } from "vue";
import Header from "@/components/Header.vue";
import SideMenu from "@/components/SideMenu/index.vue";
import Setting from "@/components/Setting/index.vue";
import { useEditDataStore } from "@/stores/editData";
import GridLayout from "@/components/Core/index.vue";
import { gridLayoutConfig } from "@/components/Core/service";
import { getTemplateList } from "@/api";

const editStore = useEditDataStore();

watch(
  () => editStore.layoutData,
  () => {
    localStorage.setItem("layoutData", JSON.stringify(editStore.layoutData));
  },
  { deep: true }
);

getTemplateList().then((res) => {
  editStore.templateData = res;
});
</script>

<style lang="less" scoped>
main {
  top: 60px;
  width: 100%;
  margin-top: 100px;
}

.drag-container {
  width: 1600px;
  margin-left: 200px;
  min-height: 500px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  background: #eee;
}
</style>
