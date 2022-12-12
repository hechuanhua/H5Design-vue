import { ref } from "vue";
import { defineStore } from "pinia";
import { LayoutDataItem, ComponentsInfo } from "@/typings/Component";

export const useLayoutDataStore = defineStore("layoutData", () => {
  const layoutData = ref<ComponentsInfo[]>([]);
  const currentId = ref(localStorage.getItem("currentId"));
  const data = localStorage.getItem("layoutData");
  if (data && data.length) {
    layoutData.value = JSON.parse(data);
  }
  return { layoutData, currentId };
});
