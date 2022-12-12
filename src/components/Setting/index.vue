<template>
  <div class="setting-container">
    <Tabs v-model:active-key="tab">
      <TabPane tab="属性设置" key="1">
        <Form>
          <FormItem
            :label="item.label"
            v-for="item in selectGridItem.column"
            :key="item.key"
          >
            <Input
              :placeholder="`请输入${item.label}`"
              v-model:value="selectGridItem.config[item.key]"
              v-if="item.type === ComponentsType.INPUT"
            />
            <div
              class="select-setting"
              v-if="item.type === ComponentsType.SELECT"
            >
              <FormItem v-for="(v, index) in selectGridItem.config.options">
                <div class="flex">
                  <Input v-model:value="v.value"></Input>
                  <Input v-model:value="v.label"></Input>
                  <Button
                    type="link"
                    @click="deleteOptionItem(index)"
                    v-if="selectGridItem.config.options.length > 1"
                    ><MinusCircleOutlined
                  /></Button>
                </div>
              </FormItem>
              <Button
                type="link"
                @click="addOptionItem"
                v-if="selectGridItem.config.options.length"
                ><PlusOutlined></PlusOutlined>新增选项</Button
              >
            </div>
            <div class="text-setting" v-if="item.type === ComponentsType.TEXT">
              <Input
                :placeholder="`请输入${item.label}`"
                v-model:value="selectGridItem.config[item.key]"
              />
            </div>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane tab="交互设置" key="2">
        <Form>
          <FormItem :label="'跳转链接'">
            <Input placeholder="请输入跳转链接"></Input>
          </FormItem>
        </Form>
        <FormItem :label="'自定义转换函数'">
          <Button @click="monacoEditorVisible = true" type="primary"
            >设置</Button
          >
        </FormItem>
      </TabPane>
    </Tabs>
    <MonacoEditor
      v-model:visible="monacoEditorVisible"
      :data="selectGridItem"
    ></MonacoEditor>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { Tabs, Form, Input, Select, Button } from "ant-design-vue";
import FromContainer from "./FormContainer.vue";
import InputSetting from "./InputSetting.vue";
import SelectSetting from "./SelectSetting.vue";
import {
  ComponentsInfo,
  ComponentsType,
  LayoutDataItem,
} from "@/typings/Component";
import { useLayoutDataStore } from "@/stores/layoutData";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
import MonacoEditor from "@/components/MonacoEditor.vue";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const store = useLayoutDataStore();

const selectGridItem = ref<any>({});

const addOptionItem = () => {
  selectGridItem.value.config.options.push({
    label: "",
    value: "",
  });
};
const deleteOptionItem = (index: number) => {
  selectGridItem.value.config.options.splice(index, 1);
};

const getCurrentLayout = () => {
  let current = null;
  for (let i = 0; i < store.layoutData.length; i++) {
    if (store.layoutData[i].i === store.currentId) {
      current = store.layoutData[i];
      break;
    }
    const children = store.layoutData[i].children;
    if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].i === store.currentId) {
          current = children[i];
          break;
        }
      }
    }
  }
  return current;
};

watch(
  () => store.currentId,
  () => {
    const ret = getCurrentLayout();
    console.log(ret, 222);
    if (ret) {
      selectGridItem.value = ret;
    }
  },
  {
    immediate: true,
  }
);
const monacoEditorVisible = ref(false);

const tab = ref("1");
</script>

<style lang="less" scoped>
.setting-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: fixed;
  right: 10px;
  top: 54px;
  bottom: 0;
  width: 330px;
  background: #fff;
  padding-left: 20px;
  box-shadow: -5px 0px 10px 0px rgb(0 0 0 / 10%);
}
</style>
