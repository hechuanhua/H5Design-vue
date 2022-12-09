<template>
  <header>
    <h2 class="title">页面设计器</h2>
    <div class="operation">
      <Button @click="clearData">清空数据</Button>
      <Button type="primary" @click="preview">预览</Button>
      <Button @click="saveVisible = true">保存</Button>
      <Button @click="publish">发布</Button>
    </div>
  </header>
  <Modal
    :visible="saveVisible"
    :title="'确定保存'"
    @cancel="saveVisible = false"
    @ok="saveSubmit"
  >
  </Modal>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Button, Modal } from "ant-design-vue";
import { useLayoutDataStore } from "@/stores/layoutData";

const store = useLayoutDataStore();
const saveVisible = ref(false);
const clearData = () => {
  store.layoutData = [];
};
const preview = () => {};
const saveSubmit = () => {
  saveVisible.value = false;
};
const publish = () => {};
</script>

<style lang="less" scoped>
header {
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .operation {
    background: #fff;
    padding: 10px 60px;
    button {
      margin-left: 15px;
    }
  }
}
</style>
