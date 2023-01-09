import { get, post } from "./request";
import { TemplateData } from "@/typings/Common";

// 保存模板库
export const saveTemplate = (params: { title: string; layout_data: string }) =>
  post(`/saveTemplate`, params);

// 更新模板库
export const updateTemplate = (params: { tid: string; layout_data: string }) =>
  post(`/updateTemplate`, params);

// 获取模板库列表
export const getTemplateList = () => get<TemplateData[]>(`/getTemplateList`);

// 根据Tid或者title获取模块数据
export const queryTemplate = (params: { tid?: string; title?: string }) => {
  return get(`/queryTemplate`, params);
};

// 删除模板
export const deleteTemplate = (tid: string) => post(`/deleteTemplate`, { tid });
