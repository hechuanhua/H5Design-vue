import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  const prefix = "/api";
  router.get(`${prefix}/getTemplateList`, controller.template.getTemplateList);
  router.post(`${prefix}/saveTemplate`, controller.template.saveTemplate);
  router.post(`${prefix}/updateTemplate`, controller.template.updateTemplate);
  router.post(`${prefix}/deleteTemplate`, controller.template.deleteTemplate);
  router.get(`${prefix}/queryTemplate`, controller.template.queryTemplate);
  router.all(`${prefix}/proxy`, controller.template.proxy);
  router.all(`${prefix}/takeSession`, controller.template.takeSession);
};
