import { ref } from "vue";
import { defineStore } from "pinia";
import { ComponentsInfo } from "@/typings/Common";
export const usePageDataStore = defineStore("pageData", () => {
  const params = ref<any>({});
  const responseData = ref<any>({});
  const layoutData = ref<ComponentsInfo[]>([]);
  return { params, responseData, layoutData };
});
