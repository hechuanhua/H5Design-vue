<template>
  <div class="setting-wrap">
    <Tabs v-model:active-key="tab">
      <TabPane tab="属性设置" key="1">
        <Form>
          <FormItem :label="'文字大小'">
            <Input placeholder="请输入文字大小"></Input>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane tab="交互设置" key="2">
        <Form>
          <FormItem :label="'跳转链接'">
            <Input placeholder="请输入跳转链接"></Input>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Tabs, Form, Input } from "ant-design-vue";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const tab = ref("1");
</script>

<style lang="less" scoped>
.setting-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: fixed;
  right: 10px;
  top: 54px;
  bottom: 0;
  width: 300px;
  background: #fff;
  padding-left: 20px;
}
</style>
