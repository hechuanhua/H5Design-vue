import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LayoutDataItem } from "@/typings/component";

export const useLayoutDataStore = defineStore("layoutData", () => {
  const layoutData = ref<LayoutDataItem[]>([]);
  const setLayoutData = (data: any) => {
    layoutData.value = data;
    console.log(data);
  };
  return { layoutData, setLayoutData };
});
