import Vue from "vue";
import { OSS_BASE, ossUrl } from "@/constants/ossAssets";
import App from "./App";
import "babel-polyfill";
import router from "./router";
import store from "./store/";
import "./common/style/common.less";
import "./common/style/elementUi.less";
import "./common/style/solutions.less";

const isDev = process.env.NODE_ENV !== "production";
Vue.config.devtools = isDev;
Vue.config.productionTip = isDev;

Vue.prototype.$ossBase = OSS_BASE;
Vue.prototype.$ossUrl = ossUrl;

import ElementUI from "element-ui";
Vue.use(ElementUI);

import quillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(quillEditor /* { default global options } */);

import("element-ui/lib/theme-chalk/index.css");

Vue.prototype.$bus = new Vue();

Date.prototype.format = function () {
  var s = "";
  var mouth =
    this.getMonth() + 1 >= 10
      ? this.getMonth() + 1
      : "0" + (this.getMonth() + 1);
  var day = this.getDate() >= 10 ? this.getDate() : "0" + this.getDate();
  s += this.getFullYear() + "-"; // 获取年份。
  s += mouth + "-"; // 获取月份。
  s += day; // 获取日。
  return s; // 返回日期。
};
let getMobile = function () {
  var u = navigator.userAgent,
    app = navigator.appVersion;
  let browser = {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
  };
  // alert(u)
  if (
    (browser.mobile ||
      browser.ios ||
      browser.android ||
      browser.iPhone ||
      browser.iPad) &&
    window.screen.width < 834
  ) {
    return true;
  } else {
    return false; //pc端进入这里
  }
};
window.addEventListener("popstate", () => {
  sessionStorage.removeItem("pageId");
});

function loadStandaloneDevtools() {
  if (process.env.VUE_APP_ENABLE_STANDALONE_DEVTOOLS !== "true") return;

  const script = document.createElement("script");
  script.src = "http://localhost:8098";
  script.onerror = () => {
    console.warn(
      "[Vue DevTools] 独立调试工具未连接。请先执行 npm run devtools，再将 .env.development 中 VUE_APP_ENABLE_STANDALONE_DEVTOOLS 设为 true。",
    );
  };
  document.head.appendChild(script);
}

if (isDev) {
  loadStandaloneDevtools();
}

const app = new Vue({
  router,
  store,
  data() {
    return {
      isMobile: getMobile(),
    };
  },
  mounted() {
    window.addEventListener("resize", this.SetResize);
  },
  methods: {
    SetResize() {
      this.isMobile = getMobile();
    },
  },

  render: (h) => h(App),
});

app.$mount("#app");

if (isDev) {
  window.__VUE_ROOT__ = app;
  window.__VUE_ROUTER__ = router;
  window.__VUE_STORE__ = store;
  console.info(
    "[Vue Debug] 可在控制台使用 __VUE_ROOT__ / __VUE_ROUTER__ / __VUE_STORE__ 调试",
  );
}
