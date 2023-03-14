import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  static: {
    enable: true,
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  httpProxy: {
    enable: true,
    package: "@eggjs/http-proxy",
  },
};

export default plugin;
