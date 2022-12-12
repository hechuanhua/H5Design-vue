import { ref } from "vue";
import { defineStore } from "pinia";

export const usePageDataStore = defineStore("pageData", () => {
  const pageData = ref<any>({});
  return { pageData };
});

