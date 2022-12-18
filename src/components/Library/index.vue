<template>
  <div class="components-list">
    <div
      :class="['components', 'components-' + item.type]"
      v-for="item in componentsList"
      :key="item.type"
      draggable="true"
      @dragstart="dragstart($event, item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ComponentsInfo } from "@/typings/Common";
import { componentsList } from "@/components/GridLayout/service";

const dragstart = (event: DragEvent, data: ComponentsInfo) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("dragData", JSON.stringify(data));
  }
};
</script>
<style lang="less" scoped>
.components {
  text-align: center;
  cursor: pointer;
  flex: 1;
  margin-top: 5px;
  padding: 5px;
  border: 1px solid;
  width: 80px;
}
</style>
