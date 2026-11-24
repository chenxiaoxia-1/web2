import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import menu from "./modules/menu";

export default new Vuex.Store({
  modules: {
    menu,
  },
  plugins: [
    createPersistedState({
      key: "my-vuex-storage", // 存储键名
      storage: window.sessionStorage,
    }),
  ],
});
