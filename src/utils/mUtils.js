var weekday = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getStore = (name) => {
  if (!name) return;
  var value = window.sessionStorage.getItem(name);
  if (value !== null) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      value = value;
    }
  }
  return value;
};

/**
 * 删除sessionStorage
 */
export const removeStore = (name) => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
export const formatDate = (date, type) => {
  var year = date.getFullYear(); //年
  var month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1; //月
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //日
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
  var seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
  var milliseconds =
    date.getMilliseconds() < 10
      ? "0" + date.getMilliseconds()
      : date.getMilliseconds(); //毫秒
  if (type == 1) {
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds +
      "." +
      milliseconds
    );
  } else if (type == 2) {
    return (
      year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds
    );
  } else if (type == 3) {
    return year + "-" + month + "-" + day;
  } else {
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }
};
//获取当前毫秒数
export const formatMs = () => {
  var date2 = Date.parse(new Date());
  return date2;
};
/**
 * 时间转换：20150101010101 --> '2015-01-01 01:01:01'
 */
export const parseToDate = (timeValue) => {
  var result = "";
  var year = timeValue.substr(0, 4);
  var month = timeValue.substr(4, 2);
  var date = timeValue.substr(6, 2);
  var hour = timeValue.substr(8, 2);
  var minute = timeValue.substr(10, 2);
  var second = timeValue.substr(12, 2);
  result =
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  return result;
};
/**
 * 判断空值
 */
export const isEmpty = (keys) => {
  if (typeof keys === "string") {
    keys = keys.replace(/\"|&nbsp;|\\/g, "").replace(/(^\s*)|(\s*$)/g, "");
    if (keys == "" || keys == null || keys == "null" || keys === "undefined") {
      return true;
    } else {
      return false;
    }
  } else if (typeof keys === "undefined") {
    // 未定义
    return true;
  } else if (typeof keys === "number") {
    return false;
  } else if (typeof keys === "boolean") {
    return false;
  } else if (typeof keys == "object") {
    if (JSON.stringify(keys) == "{}") {
      return true;
    } else if (keys == null) {
      return true;
    } else {
      return false;
    }
  }

  if (keys instanceof Array && keys.length == 0) {
    // 数组
    return true;
  }
};

/**
 * 返回两位的小数的字符串
 */
export const toFixedNum = (num) => {
  const tonum = Number(num).toFixed(2);
  return tonum;
};

/**
 * 读取base64
 */
export const readFile = (file) => {
  //var file = this.files[0];
  //判断是否是图片类型
  if (!/image\/\w+/.test(file.raw.type)) {
    alert("只能选择图片");
    return false;
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    var filedata = {
      filename: file.name,
      filebase64: e.target.result,
    };
    alert(e.target.result);
  };
};

/**
 * 动态插入css
 */
export const loadStyle = (url) => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
};
/**
 * 设置浏览器头部标题
 */
export const setTitle = (title) => {
  title = title ? `${title}` : "伟思芃芃（护士站）";
  window.document.title = title;
};

export const param2Obj = (url) => {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}',
  );
};

//是否为正整数
export const isInteger = (s) => {
  var re = /^[0-9]+$/;
  return re.test(s);
};

export const setContentHeight = (that, ele, height) => {
  that.$nextTick(() => {
    ele.style.height = document.body.clientHeight - height + "px";
  });
};
const CryptoJS = require("crypto-js"); //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("F3DC71C61C6AFD6C"); //十六位十六进制数作为密钥

export const packageParams = (params) => {
  let timeStamp1 = Date.parse(new Date());
  let dic = params;
  if (params == null) {
    dic = {};
  }
  dic.timeStamp = timeStamp1;
  let tokenStr = "";
  for (let key in dic) {
    if (dic[key] != null && dic[key] != "") {
      if (tokenStr.length == 0) {
        tokenStr += `${key}=${dic[key]}`;
      } else {
        tokenStr += `&${key}=${dic[key]}`;
      }
    }
  }
  //加密方法
  let srcs = CryptoJS.enc.Utf8.parse(tokenStr);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};
//处理一周日期数据
export const getOneWeek = (begin, end) => {
  var html = [];
  var unixDb = new Date(begin).getTime();
  var unixDe = new Date(end).getTime();
  for (var k = unixDb; k <= unixDe; ) {
    var date = new Date(parseInt(k)).format();
    var index = new Date(k).getDay();
    if (index == 0) {
      index = 7;
    }
    var weekdate = weekday[new Date(k).getDay()];
    html.push({
      weekdate,
      date,
      index,
    });
    k = k + 24 * 60 * 60 * 1000;
  }
  return html;
};
//处理一周日期数据
export const getAllWeek = (begin, end) => {
  var html = [];
  var unixDb = new Date(begin).getTime();
  var unixDe = new Date(end).getTime();
  var nowDate = new Date(new Date().format()).getTime();
  for (var k = unixDb; k <= unixDe; ) {
    var date = new Date(parseInt(k)).format();
    var weekdate = "";
    if (k == nowDate) {
      weekdate = date + "（今）" + "\n" + weekday[new Date(k).getDay()];
    } else if (k == nowDate + 24 * 60 * 60 * 1000) {
      weekdate = date + "（明）" + "\n" + weekday[new Date(k).getDay()];
    } else if (k == nowDate + 48 * 60 * 60 * 1000) {
      weekdate = date + "（后）" + "\n" + weekday[new Date(k).getDay()];
    } else {
      weekdate = date + "\n" + weekday[new Date(k).getDay()];
    }
    html.push({
      weekdate,
      date,
    });
    k = k + 24 * 60 * 60 * 1000;
  }
  return html;
};

//原生ajax方法
export function ajax(option) {
  var ajaxData = {
    type: (option.type || "GET").toUpperCase(),
    url: option.url || "",
    async: option.async || "true",
    data: option.data || "",
    dataType: option.dataType || "json",
    contentType:
      option.contentType || "application/x-www-form-urlencoded; charset=utf-8",
    beforeSend: option.beforeSend || function () {},
    success: option.success || function () {},
    error: option.error || function () {},
  };
  ajaxData.beforeSend();
  var xhr = new XMLHttpRequest();

  xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
  xhr.setRequestHeader("Content-Type", ajaxData.contentType);
  xhr.setRequestHeader("Pragma", "no-cache");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.responseType = ajaxData.dataType;
  xhr.withCredentials = true;
  xhr.send(ajaxData.data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        ajaxData.success(xhr.response);
      } else {
        Message({
          showClose: false,
          message: "请求失败，请检查网络设置...",
          type: "error",
          center: true,
        });
        ajaxData.error();
      }
    }
  };
}
