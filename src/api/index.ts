import { get, post } from "./request";
import { TemplateData } from "@/typings/Common";

// 保存模板库
export const saveTemplate = (params: { title: string; layout_data: string }) =>
  post(`/saveTemplate`, params);

// 获取模板库列表
export const getTemplateList = () => get<TemplateData[]>(`/getTemplateList`);

// 根据Tid获取模块数据
export const getLayoutByTid = (params: any) => get(`/getLayoutByTid`, params);

// 删除模板
export const deleteTemplate = (params: any) => post(`/deleteTemplate`, params);
