import { ref } from "vue";
import { defineStore } from "pinia";
import { ComponentsInfo, TemplateData } from "@/typings/Common";

export const useEditDataStore = defineStore("layoutData", () => {
  const layoutData = ref<ComponentsInfo[]>([]);
  const currentId = ref(localStorage.getItem("currentId"));
  const templateId = ref("");
  const data = localStorage.getItem("layoutData");
  if (data && data.length) {
    layoutData.value = JSON.parse(data);
  }
  const templateData = ref<TemplateData[]>([]);
  return { layoutData, currentId, templateData, templateId };
});
