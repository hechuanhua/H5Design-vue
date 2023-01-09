<template>
  <div class="template-list">
    <div
      :class="['item', { active: editStore.templateId === item.tid }]"
      v-for="item in editStore.templateData"
    >
      <div class="title" :title="item.title">{{ item.title }}</div>
      <div class="use" @click="use(item)" :title="item.title">立即使用</div>
      <div class="use" @click="DeleteTemplate(item)" style="display: none">
        立即删除
      </div>
    </div>

    <Modal
      :visible="deleteVisible"
      :title="'删除模板？'"
      @cancel="deleteVisible = false"
      @ok="deleteSubmit"
    >
      删除后不可恢复，是否删除标题为<span style="color: red; padding: 0 10px">{{
        deleteInfo.title
      }}</span
      >的模板？
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { message, Modal } from "ant-design-vue";
import { TemplateData } from "@/typings/Common";
import { useEditDataStore } from "@/stores/editData";
import { deleteTemplate, getTemplateList } from "@/api";

const editStore = useEditDataStore();
const deleteVisible = ref(false);
const deleteInfo = ref({} as TemplateData);

const use = (data: TemplateData) => {
  editStore.layoutData = JSON.parse(data.layout_data);
  editStore.currentId = "";
  editStore.templateId = data.tid;
};

const deleteSubmit = () => {
  deleteTemplate(deleteInfo.value.tid).then(() => {
    message.success("删除成功");
    deleteVisible.value = false;
    getTemplateList().then((res) => {
      editStore.templateData = res;
    });
  });
};

const DeleteTemplate = (data: TemplateData) => {
  deleteVisible.value = true;
  deleteInfo.value = data;
};
</script>
<style lang="less" scoped>
.template-list {
  width: 95px;
  .item {
    padding: 15px 0;
    position: relative;
    &.active {
      background-color: #e6f7ff;
      color: #1890ff;
    }
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
