import CryptoJS from "crypto-js";

// 后端进行加密解密时，keyStr与IvStr需要和后端保持一致
const defaultKeyStr = "52ba1228df563eaf";
const defaultIvStr = "lFbGSVuAmZqtPCLa";
const defaultKey = CryptoJS.enc.Utf8.parse(defaultKeyStr);
const defaultIv = CryptoJS.enc.Utf8.parse(defaultIvStr);

export default {
  /**
   * 获取key
   * @param keyStr key字符串
   */
  getKey(keyStr) {
    if (keyStr) {
      return CryptoJS.enc.Utf8.parse(keyStr);
    }
    return defaultKey;
  },

  /**
   * 获取iv
   * @param ivStr iv字符串
   * @returns {*}
   */
  getIv(ivStr) {
    if (ivStr) {
      return CryptoJS.enc.Utf8.parse(ivStr);
    }
    return defaultIv;
  },

  /**
   * 加密
   * @param {*} word   加密前字符串
   * @param {*} keyStr key
   * @param {*} ivStr  iv
   * @return 加密后内容
   */
  encrypt(word, keyStr, ivStr) {
    let key = this.getKey(keyStr);
    let iv = this.getIv(ivStr);

    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      // iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString();
  },

  /**
   * 解密
   * @param {*} word    已加密字符串
   * @param {*} keyStr  key
   * @param {*} ivStr   iv
   * @return 解密结果
   */
  decrypt(word, keyStr, ivStr) {
    let key = this.getKey(keyStr);
    let iv = this.getIv(ivStr);

    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);

    let decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });

    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
};
