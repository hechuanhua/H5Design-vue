import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueGridLayout from "vue-grid-layout";

import "ant-design-vue/dist/antd.css";
import "./assets/styles/common.less";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueGridLayout);

app.mount("#app");
