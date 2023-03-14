import { Controller } from "egg";
import { takeSession } from "../utils/session";

const success = (data: any, message?: string) => {
  return {
    code: 200,
    message: message || "操作成功",
    data,
  };
};
const error = (message?: string) => {
  return {
    code: 100,
    message: message || "操作失败",
    data: null,
  };
};

class TemplateController extends Controller {
  async takeSession() {
    const { ctx } = this;
    const session = await takeSession();
    ctx.cookies.set("session", session, {
      overwrite: true,
      sameSite: "Lax",
      path: "/",
      httpOnly: true,
    });
    ctx.body = success(null);
  }
  async saveTemplate() {
    const { ctx } = this;
    const { title, layout_data } = ctx.request.body;
    const templateInfo = {
      title,
      layout_data,
    };
    if (title) {
      const res = await ctx.service.template.queryTemplate({ title });
      if (res.length) {
        ctx.body = error("已存在重复标题，请修改后再提交");
      } else {
        await ctx.service.template.createTemplate(templateInfo);
        ctx.body = success(null);
      }
    } else {
      ctx.body = error("标题不能为空");
    }
  }
  async updateTemplate() {
    const { ctx } = this;
    const { tid, layout_data } = ctx.request.body;
    const templateInfo = {
      tid,
      layout_data,
    };
    if (tid) {
      const res = await ctx.service.template.updateTemplate(templateInfo);
      ctx.body = success(res);
    } else {
      ctx.body = error("更新失败，找不到相关数据");
    }
  }
  async deleteTemplate() {
    const { ctx } = this;
    const { tid } = ctx.request.body;
    if (tid) {
      const res = await ctx.service.template.deleteTemplate(tid);
      if (res) {
        ctx.body = success(null);
      } else {
        ctx.body = error("删除失败，找不到相关数据");
      }
    } else {
      ctx.body = error("删除失败，找不到相关数据");
    }
  }
  async getTemplateList() {
    const { ctx } = this;
    const res = await ctx.service.template.queryTemplateList();
    ctx.body = success(res);
  }
  async proxy() {
    const { ctx } = this;
    await ctx.proxyRequest("baidu.com", {
      rewrite(urlObj) {
        urlObj.href = urlObj.href.slice(urlObj.href.indexOf("?") + 1);
        console.log(urlObj, ctx.cookies.get("session"), 222);
        return urlObj;
      },
      async beforeResponse(proxyResult) {
        if (proxyResult.status === 401) {
          const session = await takeSession();
          proxyResult.headers[
            "set-cookie"
          ] = `session=${session}; HttpOnly; Path=/; SameSite=Lax`;
        }
        proxyResult.headers["Access-Control-Allow-Origin"] =
          ctx.request.header.origin;
        proxyResult.headers["Access-Control-Allow-Credentials"] = true;
        return proxyResult;
      },
    });
  }
  async queryTemplate() {
    const { ctx } = this;
    const { tid, title } = ctx.query;
    const _tid = tid === "undefined" ? "" : tid;
    const _title = title === "undefined" ? "" : title;
    if (!_title && !_tid) {
      ctx.body = error("参数错误");
    } else {
      const res = await ctx.service.template.queryTemplate({
        title: _title,
        tid: _tid,
      });
      const session = await takeSession();
      ctx.cookies.set("session", session, {
        overwrite: true,
        sameSite: "Lax",
        path: "/",
        httpOnly: true,
      });
      if (res.length) {
        ctx.body = success(res[0]);
      } else {
        ctx.body = success(null);
      }
    }
  }
}

module.exports = TemplateController;
