import { notification } from "ant-design-vue";
import axios from "axios";
const baseURL = "";

const request = axios.create({
  baseURL,
  timeout: 60000, // 请求超时时间
  // 为什么 dev 环境 withCredentials 设置成 false？
  // 解决的问题：后端设置 'access-control-allow-orign: *'
  // 解决跨域问题,但是前端设置 withCredentials: true（想要传凭证给后台，比如 cookie）,
  // 那么跨域会报错，除非后端设置 'access-control-allow-orign: 请求的域名'
  // 为什么后端不设置：因为 ingress 设置比较麻烦，而且后端说现在不需要 cookie，
  // 所以由前端来解决这个问题（如果后续在 dev 环境也需要跨域传递 cookie，那么设置 withCredentials: true,并且让后端去设置相应配置）
  withCredentials: true,
});

// request.defaults.headers.common["Content-Type"] =
//   "application/json;charset=UTF-8";
request.defaults.headers.common["Content-Type"] = "multipart/form-data";

const err = (error: any) => {
  const { response } = error;
  if (response && response.status) {
    const { data, status } = response;

    // 登录失败或者过期
    if (status === 401) {
      notification.error({
        description: data.msg || data.content || data.message,
        message: "请重新登录",
      });
    } else if (status === 403) {
      // 无接口权限
      if (data.code === 4077) {
        notification.error({
          description: data.msg || data.content || data.message,
          message: "请求失败",
        });
        // eslint-disable-next-line max-len
      } else if (
        data.code === 4005 ||
        data.code === 4010 ||
        data.code === 4011 ||
        data.code === 4012 ||
        data.code === 4013
      ) {
        notification.error({
          description: data.msg || data.content || data.message,
          message: "请重新登录",
        });
      } else {
        notification.error({
          description: data.msg || data.content || data.message,
          message: "请求失败",
        });
      }
    } else {
      notification.error({
        message: `请求错误: ${status}`,
        description: data.msg || data.content || data.message,
      });
    }
  } else {
    notification.error({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
  }
  return Promise.reject(error);
};

let noLogin = false;
const codeList = [401, 4005, 4010, 4011, 4012, 4013]; // 不需要多次提示的码
function noLoginErr(error: any) {
  const { response } = error;
  if (response && response.status) {
    const { status } = response;
    const data = response.data || {};
    if (!noLogin) {
      if (codeList.includes(status) || codeList.includes(data.code)) {
        noLogin = true;
        err(error);
        setTimeout(() => {
          noLogin = false;
        }, 1000 * 3);
      } else {
        err(error);
      }
    }
  } else {
    err(error);
  }
}
// request interceptor
request.interceptors.request.use((config: any) => {
  const token = "";
  if (token) {
    // eslint-disable-next-line
    config.headers["Authorization"] = "sessionId=" + token;
  }
  return config;
}, noLoginErr);

request.interceptors.response.use((response) => response.data, noLoginErr);

export default request;
