const types = {
  SET_LEFT_COLLAPSE: "SET_LEFT_COLLAPSE", // 改变左边菜单的收缩宽度
  SET_PRODUCT_ID: "SET_PRODUCT_ID",
  SET_PRODUCT_LIST: "SET_PRODUCT_LIST",
};
const menu = {
  namespaced: true,
  state: {
    productList: [],
    solutionList: [],
    productId: "",
    menuList: [],
    defaultActive: "",
  },
  getters: {
    productId: (state) => state.activity,
  },
  mutations: {
    SET_PRODUCT_ID(state, data) {
      state.productId = data;
    },

    SET_PRODUCT_LIST(state, data) {
      state.productList = data;
    },
    SET_SOLUTION_LIST(state, data) {
      state.solutionList = data;
    },
    setMenuList(state, data) {
      state.menuList = data;
    },
    setMenuDefaultActive(state, { key, keyPath }) {
      state.defaultActive = key;
      state.defaultOpeneds = keyPath;
    },
  },
};

export default menu;
