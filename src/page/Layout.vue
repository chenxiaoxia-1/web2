<template>
  <div class="layout">
    <HeadMenu :navIndexNum="navIndex" :show.sync="show"></HeadMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import $bus from "../components/eventBus";
import menuNavigationMixin from "@/mixins/menuNavigation";
import HeadMenu from "../components/HeadMenu.vue";

export default {
  mixins: [menuNavigationMixin],
  name: "layout",
  components: {
    HeadMenu,
  },
  data() {
    return {
      isCollapse: false,
      defaultCollapse: false,
      textColor: "rgba(255,255,255,0.1)",
      scrollTopValue: null,
      cascaderValue: [],
      isPath: false, // 包含路由名
      navIndex: -1,
      show: false,
    };
  },

  methods: {
    clickProductsName(index) {
      sessionStorage.setItem(
        "pageId",
        `products-${this.$store.state.menu.productList[index].id}`,
      );
      this.$store.commit("menu/setMenuDefaultActive", {
        key: `products-${this.$store.state.menu.productList[index].id}`,
        keyPath: [
          "products",
          `products-${this.$store.state.menu.productList[index].id}`,
        ],
      });
      this.$router
        .push({
          path: `/${this.language}/products/${this.$store.state.menu.productList[index].name}`,
        })
        .catch(() => {});
    },

    menuImageClick() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
      let then = this;
      this.$nextTick(() => {
        then.isCollapse = false;
      });
    },
  },
  beforeDestroy() {
    $bus.$off("menuRecover");
  },
};
</script>
