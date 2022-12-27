import { ref } from "vue";
import { defineStore, createPinia, setActivePinia } from "pinia";
import { ComponentsInfo } from "@/typings/Common";

setActivePinia(createPinia());

export const usePreviewDataStore = defineStore("pageData", () => {
  const params = ref<any>({});
  const layoutData = ref<ComponentsInfo[]>([]);
  const loading = ref(false);
  return { params, layoutData, loading };
});
