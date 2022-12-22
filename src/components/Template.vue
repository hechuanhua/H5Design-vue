<template>
  <div class="template-list">
    <div class="item" v-for="item in store.templateData">
      <div class="title" :title="item.title">{{ item.title }}</div>
      <div class="use" @click="use(item)" :title="item.title">立即使用</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { TemplateData } from "@/typings/Common";
import { useEditDataStore } from "@/stores/editData";

const store = useEditDataStore();

const use = (data: TemplateData) => {
  store.layoutData = JSON.parse(data.layout_data);
  store.currentId = "";
};
</script>
<style lang="less" scoped>
.template-list {
  width: 95px;
  .item {
    padding: 15px 0;
    position: relative;
    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .use {
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      cursor: pointer;
    }
    &:hover {
      .use {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
