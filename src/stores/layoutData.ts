import { ref } from "vue";
import { defineStore } from "pinia";
import { LayoutDataItem, ComponentsInfo } from "@/typings/Component";

export const useLayoutDataStore = defineStore("layoutData", () => {
  const layoutData = ref<ComponentsInfo[]>([]);
  const setLayoutData = (data: any) => {
    layoutData.value = data;
    console.log(data);
  };
  return { layoutData, setLayoutData };
});
