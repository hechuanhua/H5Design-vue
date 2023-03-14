import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1672911433110_7982";

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // 连接mongodb的配置
  config.mongoose = {
    client: {
      url: "mongodb://192.168.1.1/graph",
      options: {},
    },
  };
  config.cors = {
    origin: (ctx: any) => {
      return ctx.request.header.origin;
    },
    allowMethods: "GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS",
    credentials: true,
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.httpProxy = {
    withCredentials: true,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
