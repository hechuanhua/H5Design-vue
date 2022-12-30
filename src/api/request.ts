import { message } from "ant-design-vue";
import config from "@/config/config";
import { usePreviewDataStore } from "@/stores/previewData";

interface obj2StringPrams {
  [key: string]: any;
}
function obj2String(obj: obj2StringPrams, arr: any = [], idx: number = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]];
  }
  return new URLSearchParams(arr).toString();
}

type Response<T> = {
  code: number;
  data: T;
  message: string;
};

const previewStore = usePreviewDataStore();

const get = <T>(url: string, params?: any) => {
  return new Promise<T>((resolve, reject) => {
    fetch(
      `${url.indexOf("http") > -1 ? url : config.api + url}${
        params ? "?" + obj2String(params) : ""
      }`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((res: Response<T>) => {
        if (res.code === 200) {
          resolve(res.data);
        } else {
          message.error(res.message, 3);
          reject(res);
          previewStore.loading = false;
        }
      })
      .catch((e) => {
        console.log("error");
        previewStore.loading = false;
      });
  });
};

const post = (url: string, params: any) => {
  const isFormData = params.formData;
  let headers: any = {
    "Content-Type": "application/json;charset=utf-8",
  };
  if (isFormData) {
    headers = {};
  }
  return new Promise((resolve, reject) => {
    fetch(`${url.indexOf("http") <= -1 ? url : config.api + url}`, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: isFormData ? params.data : JSON.stringify(params),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (isFormData) {
          resolve(res);
        } else {
          if (res.code === 200) {
            resolve(res.data);
          } else {
            message.error(res.message, 3);
            reject(res);
            previewStore.loading = false;
          }
        }
      })
      .catch((e) => {
        console.log("error");
        previewStore.loading = false;
      });
  });
};

export { get, post };
