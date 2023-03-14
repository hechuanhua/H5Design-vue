import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // 连接mongodb的配置
  config.mongoose = {
    client: {
      url: "mongodb://192.168.1.1/graph",
      options: {},
    },
  };
  return config;
};
