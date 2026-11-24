import axios from "axios";
import { Message, Loading } from "element-ui";
import crypto from "@/utils/crypto";
// TODO
let baseURL = "/api"; /** 打包 */
// let baseURL = "/api/VisheeOfficial"; /** 本地开发 */

let loadingInstance = null;
const options = {
  lock: true,
  background: "rgba(0, 0, 0, 0)",
};
// 创建axios实例
let service = axios.create({
  baseURL: baseURL,
  timeout: 15000, // 请求超时时间
  withCredentials: true,
  crossDomain: true,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers = {
      "Cache-Control": "no-cache ",
      Pragma: "no-cache ",
    };
    if (config.url == "/web/addJobSeeker" || config.url == "/web/addLinkInfo") {
      let random = Math.random();
      config.headers.token = crypto.encrypt("random:" + random);
      config.headers.random = random;
    }
    loadingInstance = Loading.service(options);
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();

    const res = response.data;
    if (
      (res.errorCode && (res.errorCode == 200 || res.errorCode == 2003)) ||
      (res.status && res.status == 200)
    ) {
      return response.data;
    }
    return response.data;
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    if (error.message.includes("timeout")) {
      Message.error("网络超时");
    } else {
      Message({
        message: "系统错误，请联系管理员",
        type: "error",
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  },
);

export default service;
export { baseURL };
