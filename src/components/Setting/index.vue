<template>
  <div class="setting-container" v-if="selectGridItem.i">
    <Tabs v-model:active-key="tab">
      <TabPane tab="属性设置" key="1">
        <Form>
          <FormItem
            :label="item.label"
            v-for="item in selectGridItem.column"
            :key="item.key"
          >
            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.INPUT"
            >
              <Input
                :placeholder="`请输入${item.label}`"
                v-model:value="selectGridItem.config[item.key]"
              />
            </div>
            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.SELECT"
            >
              <Select
                v-model:value="selectGridItem.config[item.key]"
                :options="item.options"
                :style="{ width: '100%' }"
                placeholder="请选择"
              >
              </Select>
            </div>
            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.SELECT_EDIT"
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

            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.API"
            >
              <InputGroup compact class="flex">
                <Select
                  :options="item.options"
                  v-model:value="selectGridItem.config[item.key].method"
                ></Select>
                <Input
                  v-model:value="selectGridItem.config[item.key].url"
                ></Input>
              </InputGroup>
            </div>

            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.TEXTAREA"
            >
              <Textarea v-model:value="selectGridItem.config[item.key]">
              </Textarea>
            </div>

            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.NUMBER"
            >
              <InputNumber v-model:value="selectGridItem.config[item.key]">
              </InputNumber>
            </div>

            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.COLOR"
            >
              <Input
                v-model:value="selectGridItem.config[item.key]"
                @focus="sketchColor = true"
              ></Input>
              <!-- <div class="sketch" v-if="sketchColor">
                <div class="sketch-bg" @click="sketchColor = false"></div>
                <Sketch v-model="selectGridItem.config[item.key]" @click.stop />
              </div> -->
            </div>

            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.RADIO"
            >
              <RadioGroup
                v-model:value="selectGridItem.config[item.key]"
                :options="item.options"
                optionType="button"
                @change="onRadioChange(selectGridItem.config[item.key])"
              >
              </RadioGroup>
            </div>

            <div
              :class="`${item.type}-setting`"
              v-if="item.type === ColumnType.SWITCH"
            >
              <Switch v-model:checked="selectGridItem.config[item.key]">
              </Switch>
            </div>
          </FormItem>
        </Form>
      </TabPane>
      <!-- <TabPane tab="交互设置" key="2">
        <Form>
          <FormItem :label="'跳转链接'">
            <Input placeholder="请输入跳转链接"></Input>
          </FormItem>
        </Form>
      </TabPane> -->
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Tabs,
  Form,
  Input,
  Select,
  Button,
  Textarea,
  InputNumber,
  Radio,
  Switch,
} from "ant-design-vue";
import { ColumnType, ComponentsType } from "@/typings/Common";
import { useLayoutDataStore } from "@/stores/layoutData";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
import { Sketch } from "@ckpack/vue-color";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;

const store = useLayoutDataStore();

const selectGridItem = ref<any>({});
const sketchColor = ref(false);

const addOptionItem = () => {
  if (selectGridItem.value.type === ComponentsType.TABS) {
    selectGridItem.value.config.options.push({
      label: "",
      value: "",
      children: [],
    });
  } else {
    selectGridItem.value.config.options.push({
      label: "",
      value: "",
    });
  }
};
const deleteOptionItem = (index: number) => {
  selectGridItem.value.config.options.splice(index, 1);
};

const onRadioChange = (data: string | number | undefined) => {
  if (selectGridItem.value.type === ComponentsType.ECHARTS) {
    selectGridItem.value.config.echartData.series.forEach((item: any) => {
      item.type = data;
    });
  }
};

const loop = (data: any) => {
  let current = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].i === store.currentId) {
      current = data[i];
      break;
    }
  }
  return current;
};

const getCurrentLayout = () => {
  let current: any = null;
  for (let i = 0; i < store.layoutData.length; i++) {
    if (store.layoutData[i].i === store.currentId) {
      current = store.layoutData[i];
      break;
    }

    if (store.layoutData[i].type === ComponentsType.TABS) {
      const options = store.layoutData[i].config.options;
      for (let j = 0; j < options.length; j++) {
        if (options[j].children.length) {
          current = loop(options[j].children);
          if (current) {
            break;
          }
        }
      }
    }
    if (current) break;
    const children = store.layoutData[i].children;
    if (children && children.length) {
      current = loop(children);
      if (current) break;
    }
  }
  return current;
};

watch(
  () => store.currentId,
  () => {
    if (!store.currentId) {
      selectGridItem.value = {};
      return;
    }
    const ret = getCurrentLayout();
    if (ret) {
      console.log(ret, "selectGridItem");
      selectGridItem.value = ret;
    }
  },
  {
    immediate: true,
  }
);

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
.sketch {
  .sketch-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
  }
  :deep(.vc-sketch) {
    z-index: 10;
  }
}
</style>
