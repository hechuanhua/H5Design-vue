<template>
  <header>
    <h2 class="title">页面设计器</h2>
    <div class="operation">
      <Button @click="clearData">清空数据</Button>
      <Button type="primary" @click="preview">预览</Button>
      <Button
        @click="
          saveVisible = true;
          pageTitle = '';
        "
        >保存</Button
      >
      <Button @click="updateVisible = true" v-if="templateTitle"
        >更新模板</Button
      >
    </div>
  </header>
  <Modal
    :visible="saveVisible"
    :title="'保存新模板？'"
    @cancel="saveVisible = false"
    @ok="saveSubmit"
  >
    <Form>
      <FormItem label="模板标题">
        <Input v-model:value="pageTitle"></Input>
      </FormItem>
    </Form>
  </Modal>
  <Modal
    :visible="updateVisible"
    :title="'更新模板？'"
    @cancel="updateVisible = false"
    @ok="updateSubmit"
  >
    当前已存在标题为<span style="color: red; padding: 0 10px">{{
      templateTitle
    }}</span
    >的模板，是否更新
  </Modal>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { Button, Modal, Form, Input, message } from "ant-design-vue";
import { useEditDataStore } from "@/stores/editData";
import { saveTemplate, getTemplateList, updateTemplate } from "@/api";

const FormItem = Form.Item;
const editStore = useEditDataStore();
const saveVisible = ref(false);
const updateVisible = ref(false);
const pageTitle = ref("");

const templateTitle = computed(() => {
  const current = editStore.templateData.find(
    (item) => item.tid === editStore.templateId
  );
  return current?.title;
});

const clearData = () => {
  editStore.$patch({
    layoutData: [],
    currentId: "",
    templateId: "",
  });
};
const preview = () => {
  window.open("./#/preview");
};
const saveSubmit = () => {
  if (!pageTitle.value) return message.error("请填写模板标题");
  saveVisible.value = false;
  saveTemplate({
    title: pageTitle.value,
    layout_data: localStorage.getItem("layoutData")!,
  })
    .then(() => {
      message.success("保存成功");
      getTemplateList().then((res) => {
        editStore.templateData = res;
      });
    })
    .catch((res) => {
      console.log(res);
    });
};
const updateSubmit = () => {
  updateVisible.value = false;
  updateTemplate({
    tid: editStore.templateId,
    layout_data: localStorage.getItem("layoutData")!,
  })
    .then(() => {
      message.success("更新成功");
      getTemplateList().then((res) => {
        editStore.templateData = res;
      });
    })
    .catch((res) => {
      console.log(res);
    });
};
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
