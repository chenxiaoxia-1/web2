<template>
  <div
    class="page-nav"
    :class="!$root.isMobile && (isScrolled || flag) ? 'page-nav-Scrolled' : ''"
    ref="page-nav"
  >
    <div class="logoDiv" @click="logoClick">
      <i class="el-icon-back" v-if="$root.isMobile && shouldShowComponent"></i>
      <img
        v-else
        :src="$root.isMobile ? vishee_black : logo2x"
        alt=""
        class="page-nav-logo"
      />
    </div>
    <div v-if="!$root.isMobile" class="title">
      <div
        v-for="(item, index) in $store.state.menu.productList"
        :key="item.id"
        @click="handleItemClick(item, index)"
        class="nav-type"
      >
        <p :class="getItemClasses(item, index)">{{ item.name }}</p>
      </div>
    </div>
    <div class="page-menu">
      <template v-if="language === 'en'">
        <div class="youtube pageIcon" @click="goToSocials('youtube')"></div>
        <div class="facebook pageIcon" @click="goToSocials('facebook')"></div>
        <div class="linkedin pageIcon" @click="goToSocials('linkedin')"></div>
        <div class="instagram pageIcon" @click="goToSocials('instagram')"></div
      ></template>
      <div class="pageMenuImage" @click="menuImageClick"></div>

      <RegionSelect
        v-if="!shouldShowComponent"
        v-model="language"
        @change="RegionChange"
      />
      <transition name="el-zoom-in-top">
        <div
          v-if="innerShow"
          class="menuWrapper"
          @click.self="innerShow = false"
        >
          <div
            class="menutrigger"
            @click="innerShow = !innerShow"
            v-if="$root.isMobile"
          >
            <i class="el-icon-close"></i>
          </div>
          <div class="menuSelectWrapper">
            <el-cascader-panel
              v-if="!$root.isMobile"
              v-model="$store.state.menu.defaultOpeneds"
              ref="cascaderPanel"
              :options="options"
              :props="{
                expandTrigger: 'hover',
                checkStrictly: true,
              }"
              class="reverse-cascader"
            >
              <template #default="{ node, data }">
                <div
                  class="custom-cascader-node"
                  @click="menuChange(node, data)"
                >
                  {{ data.label }}
                </div>
              </template>
            </el-cascader-panel>
            <el-menu
              v-if="$root.isMobile"
              :unique-opened="true"
              @select="menuSelect"
              :defaultActive="$store.state.menu.defaultActive"
              :default-openeds="$store.state.menu.defaultOpeneds"
              text-color="#b9b9b9"
              active-text-color="#333333"
            >
              <el-submenu
                :index="item.value"
                v-for="item in options"
                :key="Math.random()"
              >
                <div
                  class="menuTitle"
                  slot="title"
                  style="color: #333333; font-weight: bold"
                >
                  {{ item.label }}
                </div>
                <div v-if="item.children">
                  <el-menu-item
                    v-for="item2 in item.children"
                    :index="item2.value"
                    style="padding: 1vw; font-weight: 500"
                    :key="Math.random()"
                    >{{ item2.label }}</el-menu-item
                  >
                </div>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import $bus from "../components/eventBus";
import menuDataMixin from "@/mixins/menuData";
import menuNavigationMixin from "@/mixins/menuNavigation.js";
import { isTopLevelPageAnchor } from "@/utils/pageAnchor";
import RegionSelect from "@/components/RegionSelect.vue";

/** 顶部未滚动时导航栏使用纯白背景的路由 */
const WHITE_NAV_ROUTE_NAMES = [
  "career",
  "solutions",
  "aesthetics",
  "depression",
  "aboutUs",
  "jobDetails",
  "services",
  "investorRelations",
  "investor",
  "contentDetail",
  "pelvicHealth",
  "stroke",
];

export default {
  mixins: [menuDataMixin, menuNavigationMixin],
  name: "layout",
  components: { RegionSelect },
  props: { navIndexNum: Number, show: Boolean, flag: Boolean },
  data() {
    return {
      logo2x: ossUrl("home/vishee_black@2x.png"),
      vishee_black: ossUrl("home/vishee_black@2x.png"),
      defaultCollapse: false,
      textColor: "rgba(255,255,255,0.1)",
      scrollTopValue: null,
      cascaderValue: [],
      isPath: false, // 包含路由名
      language: "cn",
    };
  },
  created() {
    this.language = this.$route.params.language;
    this.bindNavScrollHandlers();
  },
  watch: {
    "$route.params.language"(val) {
      if (val && val !== "us") this.language = val;
    },
  },
  mounted() {
    $bus.$on("menuRecover", () => {
      this.innerShow = false;
    });
    this.$nextTick(() => this.syncNavBackground());
  },
  computed: {
    isOnHomePage() {
      return this.$route.name === "home";
    },

    currentProductName() {
      return this.$route.params.id;
    },
    navIndex() {
      return this.navIndexNum;
    },
    // 针对性没有路由设置
    shouldShowComponent() {
      const excludePaths = ["jobDetails", "contentDetail"];
      return excludePaths.some((path) => this.$route.fullPath.includes(path));
    },
    innerShow: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      },
    },
  },
  methods: {
    isWhiteNavRoute(route = this.$route) {
      return WHITE_NAV_ROUTE_NAMES.includes(route.name);
    },

    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },

    /** 进入白底导航页且位于顶部时，立即应用纯白背景 */
    applyWhiteNavAtTop() {
      if (!this.isWhiteNavRoute() || !this.$refs["page-nav"]) return;
      this.isScrolled = false;
      this.$refs["page-nav"].style.background = "#fff";
    },

    syncNavBackground() {
      if (!this.$refs["page-nav"]) return;

      const scrollTop = this.getScrollTop();
      this.innerShow = false;
      this.isScrolled = scrollTop > 10;
      this.isPath = this.isWhiteNavRoute();

      if (this.isPath && !this.isScrolled) {
        this.$refs["page-nav"].style.background = "#fff";
      } else if (this.isScrolled && this.isPath) {
        this.$refs["page-nav"].style.background = "rgba(255, 255, 255, 0.4)";
      } else {
        this.$refs["page-nav"].style.background = "";
      }
    },

    bindNavScrollHandlers() {
      const debouncedSync = (() => {
        let timer;
        return () => {
          clearTimeout(timer);
          timer = setTimeout(() => this.syncNavBackground(), 50);
        };
      })();

      window.addEventListener("scroll", debouncedSync);

      this.$watch("$route", (to) => {
        if (this.isWhiteNavRoute(to)) {
          const pageId = sessionStorage.getItem("pageId");
          // 仅一级菜单进入页面时滚至顶部；二级小标题保留锚点定位
          if (!pageId || isTopLevelPageAnchor(pageId)) {
            window.scrollTo(0, 0);
            this.applyWhiteNavAtTop();
          }
        }
        this.$nextTick(() => {
          this.syncNavBackground();
          requestAnimationFrame(() => this.syncNavBackground());
        });
      });

      this._onPageIdNav = (pageId) => {
        if (isTopLevelPageAnchor(pageId)) {
          this.applyWhiteNavAtTop();
        }
        this.$nextTick(() => {
          this.syncNavBackground();
          requestAnimationFrame(() => this.syncNavBackground());
        });
      };
      $bus.$on("pageId", this._onPageIdNav);

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("scroll", debouncedSync);
        $bus.$off("pageId", this._onPageIdNav);
      });
    },
    handleItemClick(item, index) {
      this.innerShow = false;
      if (this.$route.name === "home") {
        this.$emit("scrollByIndex", index);
      } else {
        this.clickProductsName(index);
      }
    },
    logoClick() {
      if (this.$route.name === "home") return;
      if (this.$root.isMobile && this.shouldShowComponent) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: `/${this.language}` });
      }
    },
    // 标题选中滚动到指定位置置灰
    getItemClasses(item, index) {
      const classes = ["nav-item"];

      if (this.isOnHomePage) {
        // 首页逻辑
        if (this.navIndex === index) {
          classes.push("active");
        }
      } else {
        // 非首页逻辑
        if (this.currentProductName === item.name) {
          classes.push("active");
        }
      }

      return classes;
    },
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
      $bus.$emit(
        "pageId",
        `products-${this.$store.state.menu.productList[index].id}`,
      );
      this.$router
        .push({
          path: `/${this.language}/products/${this.$store.state.menu.productList[index].name}`,
        })
        .catch(() => {});
    },
    menuImageClick() {
      this.innerShow = !this.innerShow;
    },
  },
  beforeDestroy() {
    $bus.$off("menuRecover");
  },
};
</script>

<style lang="less" scoped>
.page-nav-Scrolled {
  background-color: rgba(216, 216, 216, 0.4);
}

.page-nav {
  padding: 1.5vw 2.5vw 1.5vw 2.4vw;
  text-align: center;
  display: flex;
  position: fixed;
  height: 5vw;
  top: 0;
  z-index: 100;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  box-sizing: border-box;

  .logoDiv {
    cursor: pointer;
    flex-shrink: 0;
  }

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    pointer-events: auto;

    .nav-type {
      cursor: pointer;
      font-family: Roboto-Bold;
      font-size: 0.8vw;
      color: #333333;
      display: inline-block;
      margin: 0 0.8vw;
      white-space: nowrap;

      .active {
        color: rgba(51, 51, 51, 0.6);
      }

      p {
        white-space: nowrap;
        margin: 0;
        padding: 0;
        display: block;
      }
    }
  }

  .page-menu {
    position: relative;
    margin-left: 0.5vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;

    /deep/ .region-select {
      margin-left: 1vw;
    }

    /deep/ .el-radio-group {
      margin-left: 1vw;
      background-color: #d8d8d8;
      border-radius: 1vw;

      .el-radio-button__inner {
        border-radius: 1vw;
        border: none;
        font-size: 0.5vw;
        padding: 0.5vw;
        background-color: transparent;
      }

      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #333333;
        box-shadow: none;
      }

      .el-radio-button__inner:hover {
        color: black;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner:hover {
        color: #ffffff;
      }
    }

    .pageIcon {
      margin-left: 1.56vw;
      cursor: pointer;
      width: 1.5vw;
      height: 1.5vw;
    }

    .facebook {
      background: url("@{oss-base}/home/Facebook.png") no-repeat;
      background-size: cover;
      background-position: center;
    }

    .instagram {
      background: url("@{oss-base}/home/Instagram.png") no-repeat;
      background-size: cover;
      background-position: center;
    }

    .linkedin {
      background: url("@{oss-base}/home/Linkedin.png") no-repeat;
      background-size: cover;
      background-position: center;
    }

    .youtube {
      background: url("@{oss-base}/home/youtube.png") no-repeat;
      background-size: cover;
      background-position: center;
    }

    .pageMenuImage {
      margin-left: 1.56vw;
      cursor: pointer;
      width: 1.5vw;
      height: 1.5vw;
      background: url("@{oss-base}/home/icon_more2.png") no-repeat;
      background-size: cover;
      background-position: center;

      &:hover {
        background: url("@{oss-base}/home/icon_more3.png") no-repeat;
        background-size: cover;
        background-position: center;
      }
    }

    .menuWrapper {
      position: absolute;
      right: 0vw;
      width: auto;
      top: 2vw;

      .menuSelectWrapper {
        height: auto !important;
        overflow: visible !important;
        display: inline-block;
        .el-cascader-panel.is-bordered {
          border: 0;
        }
        /* 级联面板样式 */
        /deep/ .el-cascader-panel,
        /deep/ .el-cascader-menu__wrap,
        /deep/ .el-cascader-menu {
          &::after {
            background-color: rgba(0, 0, 0, 0.1) !important;
            opacity: 0.6;
          }
          height: auto !important;
          max-height: none !important;
          text-align: left;
          overflow-x: hidden !important;
          overflow-y: hidden !important;
          padding-top: 0.2vw;
          padding-bottom: 0.3vw;
          background: #ffffff;

          /* 一级菜单项常态样式 */
          .el-cascader-node:not(:hover) .el-cascader-node__label {
            font-family: SourceHanSansCN-Normal;
            color: #999999 !important;
          }

          /* 一级菜单项悬停和激活样式 */
          .el-cascader-node:hover .el-cascader-node__label,
          .el-cascader-node.is-active .el-cascader-node__label,
          .el-cascader-node.in-active-path .el-cascader-node__label {
            font-family: SourceHanSansCN-Normal;
            color: #333333 !important;
          }
        }

        /deep/ .el-cascader-node__postfix {
          color: #999999;
          padding-right: 2vw;
        }

        /deep/ .el-cascader-node {
          padding: 0;

          .custom-cascader-node {
            height: 3vw;
            line-height: 3vw;
            padding: 0 60px 0 30px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          justify-content: flex-end;
          position: relative;
          .el-radio {
            display: none !important;
          }
        }

        ::v-deep .el-cascader-panel {
          .el-radio {
            display: none !important;
          }

          .el-cascader-node__label {
            width: 100%;
            text-align: right;
            padding-right: 25px;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal;
            color: #999999;
            cursor: pointer;
          }

          .in-checked-path {
            .el-cascader-node__label {
              color: #333333;
              font-family: SourceHanSansCN-Normal;
            }
          }

          .el-cascader-node:hover {
            background-color: #f4f4f4;
          }

          .el-cascader-node.is-active,
          .el-cascader-node.is-selected {
            background-color: #f4f4f4 !important;
          }
        }
      }
    }

    .el-menu {
      border: none;
    }

    /* 反转级联面板样式 */
    .el-cascader-panel {
      display: flex;
      flex-direction: row-reverse;
    }

    .el-cascader-menu {
      float: right;
      border-left: 1px solid #e4e7ed;
      border-right: none;
      width: 180px;
      height: auto !important;

      &:first-child {
        border-left: none;
        border-right: 1px solid #e4e7ed;
      }
    }

    /deep/ .el-cascader-node {
      height: 40px;
      line-height: 40px;
      padding: 0 60px 0 30px;
      align-items: center;
    }

    .el-cascader-node__label {
      width: 100%;
      font-size: 14px;
      padding-right: 8px;

      > div {
        text-align: left;
      }
    }

    .el-cascader-node.is-active .el-cascader-node__label,
    .el-cascader-node.in-active-path .el-cascader-node__label {
      color: #333333 !important;
      font-weight: bold;
    }

    .el-cascader-node:hover {
      background-color: #f5f7fa;
    }

    .el-radio {
      display: none !important;
    }

    /deep/ .el-cascader-node__postfix {
      position: absolute;
      left: -30px;
      right: auto;
      transform: rotate(180deg);
      color: #999999;
      margin-right: 50px;
    }

    /deep/ .reverse-cascader .el-cascader-node__postfix i {
      transform: rotate(180deg);
      display: block;
    }
  }

  .menuTitle {
    font-size: 0.8vw;
    font-weight: 500;
    color: #666666;
  }

  .nav-type:hover {
    color: rgba(51, 51, 51, 0.8);
  }

  .el-icon-more {
    transform: rotate(90deg);
    color: #828385;
    font-size: 1.25vw;
    cursor: pointer;
  }

  .page-nav-logo {
    height: 1vw;
  }
}

.el-icon-back {
  color: #000;
}

@media only screen and (max-width: 833px) {
  .page-nav {
    height: auto;
    padding-top: 20px;
    padding-bottom: 10px;
    position: fixed;
    background: transparent;
    padding-left: 20px;
    padding-right: 20px;

    .page-nav-logo {
      height: 10px;
    }

    .page-menu {
      .pageIcon {
        height: 24px;
        width: 24px;
      }
      .pageMenuImage {
        height: 24px;
        width: 24px;
        background-image: url("@{oss-base}/home/icon_more1.png");
      }

      /deep/ .el-submenu__title {
        height: 44px;
        line-height: 44px;
        padding: 0 20px;
      }

      .menuTitle {
        font-size: 16px;
      }

      /deep/ .el-radio-group {
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 25px;

        .el-radio-button__inner {
          border-radius: 25px;
          border: none;
          font-size: 10px;
          padding: 7px;
          background-color: transparent;
        }

        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background-color: #333333;
          box-shadow: none;
        }
      }

      .menuWrapper {
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        height: auto;
        position: fixed;
        width: 100vw;
        z-index: 2;
        border-radius: 0.2vw;
        padding: 1vw 0;
        background: #ffffff;

        .menutrigger {
          color: #333333;
          font-size: 16px;
          height: 44px;
          line-height: 44px;
          text-align: right;
          padding: 0 20px;
        }
        .menuSelectWrapper {
          overflow-y: auto;
          height: calc(100% - 44px);
          width: 100%;
          .el-menu {
            border: none;

            .menuTitle {
              font-weight: 500;
              color: #666666;
            }
          }
        }
      }

      /deep/ .el-submenu__icon-arrow {
        font-size: 16px;
      }

      /deep/ .el-menu-item {
        font-size: 16px;
        height: 55px;
        line-height: 55px;
        padding-left: 36px !important;
      }
    }
  }
}
</style>

<style>
.page-menu .el-submenu__title {
  text-align: left;
  padding-left: 2.1vw;
  height: 2.9vw;
  line-height: 2.9vw;
}

.page-menu .el-menu-item {
  text-align: left;
  padding-left: 3.1vw;
  white-space: normal;
  line-height: 0.9vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 2.6vw;
  font-size: 0.7vw;
  padding: 0 2.3vw;
}

.page-sum .el-dropdown-menu__item:focus,
.page-sum .el-dropdown-menu__item:not(.is-disabled):hover {
  color: #333333 !important;
  background-color: #f4f4f4;
}

.page-sum .el-dropdown-menu__item:focus,
.page-sum .el-dropdown-menu__item {
  color: #999999 !important;
  padding-left: 0.8vw;
  font-weight: 500;
}
</style>
