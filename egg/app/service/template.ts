import { Service } from "egg";
import { createUuid } from "../utils/index";

export default class TemplateService extends Service {
  async queryTemplateList() {
    const Template = this.ctx.model.Template;
    const res = await Template.find();
    return res;
  }
  async createTemplate(templateInfo: any) {
    const Template = this.ctx.model.Template;
    const ret = await Template.find({ title: templateInfo.title });
    if (ret.length) {
      return "页面标题不能重复";
    }
    const nowDate = new Date();
    await Template.create({
      ...templateInfo,
      _id: createUuid(8),
      create_date: nowDate,
      update_date: nowDate,
    });
  }
  async queryTemplate(data: { tid?: string; title?: string }) {
    if (data.tid) {
      const Template = this.ctx.model.Template;
      const ret = await Template.find({ _id: data.tid });
      return ret;
    } else if (data.title) {
      const Template = this.ctx.model.Template;
      const ret = await Template.find({ title: data.title });
      return ret;
    }
    return [];
  }
  async updateTemplate(templateInfo: {
    tid?: string;
    title?: string;
    layout_data: string;
  }) {
    const Template = this.ctx.model.Template;
    let ret: any = [];
    if (templateInfo.tid) {
      ret = await Template.find({ _id: templateInfo.tid });
    } else if (templateInfo.title) {
      ret = await Template.find({ title: templateInfo.title });
    }
    if (ret.length) {
      const temp = Object.assign({}, templateInfo, { update_date: new Date() });
      const ret = await Template.findOneAndUpdate(
        { _id: templateInfo.tid },
        temp
      );
      return ret;
    }
    return [];
  }
  async deleteTemplate(tid: string) {
    const Template = this.ctx.model.Template;
    const res = await Template.findOneAndDelete({ _id: tid });
    return res;
  }
}
