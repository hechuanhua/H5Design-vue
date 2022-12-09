<template>
  <Form>
    <FormItem :label="item.label" v-for="item in data.column" :key="item.key">
      <Input
        :placeholder="`请输入${item.label}`"
        v-if="item.type === 'text'"
      ></Input>
      <Select :options="item.options" v-if="item.type === 'select'"></Select>
    </FormItem>
  </Form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Form, Input, Select } from "ant-design-vue";

const FormItem = Form.Item;
defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="less" scoped></style>
