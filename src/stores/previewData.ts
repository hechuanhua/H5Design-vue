import { ref } from "vue";
import { defineStore } from "pinia";
import { ComponentsInfo } from "@/typings/Common";
export const usePreviewDataStore = defineStore("pageData", () => {
  const params = ref<any>({});
  const layoutData = ref<ComponentsInfo[]>([]);
  const loading = ref(false);
  return { params, layoutData, loading };
});
