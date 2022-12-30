<template>
  <Modal
    :title="'自定义转换函数'"
    :visible="visible"
    @cancel="emit('update:visible', false)"
    @ok="ok"
    width="800px"
  >
    <div
      ref="monacoEditor"
      class="monaco-editor"
      style="min-height: 150px"
    ></div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { Modal } from "ant-design-vue";

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:visible"]);

let editor = null as any;
const monacoEditor = ref<HTMLElement | null>(null);
const defaultCode = `function transformData(data) {
    // data 表示接口返回的数据源
    const newData = []
    console.log(data);

    return newData  // 返回自定义数据结构
}`;
const code = ref(defaultCode);

const ok = () => {
  const code = editor.getValue();
  props.data.config.transformCode = code;
  emit("update:visible", false);
};

const initMonaco = () => {
  console.log("initMonaco");
  (self as any).MonacoEnvironment = {
    getWorker(_: any, label: string) {
      if (label === "json") {
        return new jsonWorker();
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new cssWorker();
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new htmlWorker();
      }
      if (label === "typescript" || label === "javascript") {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };
  editor = monaco.editor.create(monacoEditor.value as HTMLElement, {
    value: code.value,
    language: "javascript",
    automaticLayout: true,
    theme: "vs-dark",
    minimap: {
      enabled: false, // 不要小地图
    },
    contextmenu: false,
    wordWrap: "on",
  });
};

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      const propsCode = props.data?.config?.transformCode;
      if (editor) {
        if (propsCode) {
          code.value = propsCode;
        } else {
          code.value = defaultCode;
        }
        editor.setValue(code.value);
      } else {
        nextTick(() => {
          if (propsCode) {
            code.value = propsCode;
          } else {
            code.value = defaultCode;
          }
          initMonaco();
        });
      }
    }
  }
);
</script>
