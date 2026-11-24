<template>
  <div class="page-sum layout">
    <HeadMenu
      @scrollByIndex="scrollByIndex"
      :navIndexNum="navIndex"
      :show.sync="show"
      :flag="isScrolled"
    ></HeadMenu>

    <div v-if="$root.isMobile" class="rightMenu">
      <div
        class="rightMenuItem"
        v-for="(item, index) in $store.state.menu.productList"
        :key="item.id"
        @click="scrollByIndex(index)"
      >
        <span
          :style="
            navIndex === index ? 'background:#333;width:12px;height:12px' : ''
          "
        ></span>
      </div>
    </div>
    <div class="page-box" @click="pageClick">
      <div
        v-for="(item, index) in $store.state.menu.productList"
        :key="item.id"
        class="page-one"
        @touchstart="toucoStartAction"
        @touchend="touchEndAction"
        :style="{ 'background-image': 'url(' + item.banner + ')' }"
      >
        <img
          class="image"
          :src="item.itemImage"
          alt=""
          :style="{
            height: language == 'en' ? '24px' : '',
          }"
        />
        <div
          class="title2 en-bold"
          v-if="language === 'en'"
          v-html="item.itemCopywritingLevel2"
        ></div>
        <div
          class="title"
          :class="fontBoldClass"
          v-html="item.itemCopywriting"
        ></div>
        <el-button
          :class="fontLightClass"
          class="pageBtn"
          @click="pageOneButtonClick(index)"
          >{{ language == "cn" ? "了解详情" : "Explore More" }}</el-button
        >
      </div>
      <systemBottom
        @touchYchange="touchYchange"
        @scroll-up="handleSystemBottomScrollUp"
        :language="language"
        ref="systemBottom"
        class="page-ten"
      />
    </div>
  </div>
</template>

<script>
import systemBottom from "../components/systemBottom.vue";
import HeadMenu from "../components/HeadMenu.vue";
import menuNavigationMixin from "@/mixins/menuNavigation";

export default {
  mixins: [menuNavigationMixin],
  name: "Home",
  components: {
    systemBottom,
    HeadMenu,
  },
  data() {
    return {
      navIndex: 0,
      show: false,
      carouselScrolling: false,
      touchStartY: 0,
      language: "cn",
      isScrolled: false,
    };
  },
  created() {
    this.language = this.$route.params.language;
  },
  computed: {
    fontRegularClass() {
      return this.language === "cn" ? "cn-normal" : "en-regular";
    },
    fontLightClass() {
      return this.language === "cn" ? "cn-light" : "en-light";
    },
    fontBoldClass() {
      return this.language === "cn" ? "cn-bold" : "en-bold";
    },
    productListLength() {
      return this.$store.state.menu.productList.length;
    },
    isSystemBottomPage() {
      return this.navIndex >= this.productListLength;
    },
  },
  mounted() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") > -1) {
      window.addEventListener("DOMMouseScroll", this.handleScroll);
    } else {
      window.addEventListener("mousewheel", this.handleScroll);
    }
    var scrollIndex = sessionStorage.getItem("homeScroll");
    if (scrollIndex && scrollIndex != "") {
      this.$nextTick(() => {
        let then = this;
        setTimeout(function () {
          then.scrollByIndex(scrollIndex);
          sessionStorage.setItem("homeScroll", "");
        }, 300);
      });
    }
    this.$store.commit("menu/setMenuDefaultActive", {});
  },
  methods: {
    // 处理 systemBottom 组件的向上滑动事件
    handleSystemBottomScrollUp() {
      if (this.carouselScrolling) return;
      this.carouselScrolling = true;

      // 跳转到最后一个产品
      const lastIndex = this.productListLength - 1;
      this.navIndex = lastIndex;
      this.scrollByIndex(lastIndex);

      setTimeout(() => {
        this.carouselScrolling = false;
      }, 1000);
    },

    handleScroll(e) {
      this.show = false;
      const agent = navigator.userAgent.toLowerCase();
      const userAgent = navigator.userAgent;
      let direction = "";

      if (userAgent.indexOf("Firefox") > -1) {
        direction = e.detail > 0 ? "down" : "up";
      } else {
        direction = e.deltaY > 0 ? "down" : "up";
      }

      if (
        this.navIndex >= this.$store.state.menu.productList.length &&
        direction === "down"
      ) {
        this.isScrolled = true;
        return;
      } else {
        this.isScrolled = false;
      }

      let timer = 1500;
      const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      if (
        agent.indexOf("win32") >= 0 ||
        agent.indexOf("wow32") >= 0 ||
        agent.indexOf("win64") >= 0 ||
        agent.indexOf("wow64") >= 0
      ) {
        timer = 1000;
      }
      if (isMac) {
        timer = 1500;
      }

      if (direction == "down" && e.deltaY > 0 && !this.carouselScrolling) {
        this.carouselScrolling = true;
        if (!this.isSystemBottomPage) {
          this.navIndex += 1;
          this.scrollByIndex(this.navIndex);
        }
        setTimeout(() => {
          this.carouselScrolling = false;
        }, timer);
      }
      if (direction == "up" && e.deltaY < 0 && !this.carouselScrolling) {
        this.carouselScrolling = true;
        if (this.isSystemBottomPage) {
          // 从 systemBottom 向上滑 → 跳转到最后一个产品
          this.navIndex = this.productListLength - 1;
          this.scrollByIndex(this.navIndex);
        } else if (this.navIndex <= 0) {
          this.navIndex = 0;
          this.scrollByIndex(0);
        } else {
          this.navIndex -= 1;
          this.scrollByIndex(this.navIndex);
        }
        setTimeout(() => {
          this.carouselScrolling = false;
        }, timer);
      }
    },
    toucoStartAction(e) {
      this.touchStartY = e.changedTouches[0].clientY;
    },
    touchEndAction(e) {
      if (!this.$root.isMobile) return;

      var startY = this.touchStartY;
      var endY = e.changedTouches[0].clientY;
      var diff = endY - startY;

      if (Math.abs(diff) < 30) {
        this.touchStartY = 0;
        return;
      }

      if (diff < 0 && !this.carouselScrolling) {
        // 向下滚动（手指向上滑）
        this.carouselScrolling = true;
        if (this.isSystemBottomPage) {
          // 在 systemBottom 页面阻止继续向下
          this.carouselScrolling = false;
          this.touchStartY = 0;
          return;
        }
        this.navIndex += 1;
        this.scrollByIndex(this.navIndex);
        setTimeout(() => {
          this.carouselScrolling = false;
          this.touchStartY = 0;
        }, 1000);
      }

      if (diff > 0 && !this.carouselScrolling) {
        // 向上滚动（手指向下滑）
        this.carouselScrolling = true;
        if (this.isSystemBottomPage) {
          // 在 systemBottom 页面向上滑 → 跳转到最后一个产品
          this.navIndex = this.productListLength - 1;
          this.scrollByIndex(this.navIndex);
          setTimeout(() => {
            this.carouselScrolling = false;
            this.touchStartY = 0;
          }, 1000);
          return;
        }
        if (this.navIndex <= 0) {
          this.navIndex = 0;
          this.scrollByIndex(0);
        } else {
          this.navIndex -= 1;
          this.scrollByIndex(this.navIndex);
        }
        setTimeout(() => {
          this.carouselScrolling = false;
          this.touchStartY = 0;
        }, 1000);
      }
    },
    touchYchange(e) {
      this.carouselScrolling = true;
      this.navIndex -= 1;
      this.scrollByIndex(this.navIndex);
      setTimeout(() => {
        this.carouselScrolling = false;
      }, 1000);
    },
    pageClick(e) {
      if (!e.target.closest("a") && !e.target.closest(".el-link")) {
        this.show = false;
      }
    },
    pageOneButtonClick(index) {
      const languageItem = this.$route.params.language;
      const productName = this.$store.state.menu.productList[index].name;
      const url = this.$store.state.menu.productList[index].url;
      this.$store.commit("menu/setMenuDefaultActive", {
        key: `products-${this.$store.state.menu.productList[index].id}`,
        keyPath: [
          "products",
          `products-${this.$store.state.menu.productList[index].id}`,
        ],
      });

      sessionStorage.setItem(
        "pageId",
        `products-${this.$store.state.menu.productList[index].id}`,
      );
      if (url.length > 0) {
        window.open(url, "_blank");
      } else {
        this.$router.push({
          path: `/${languageItem}/products/${productName}`,
        });
      }
    },
    scrollByIndex(index) {
      let e = {
        deltaY: 100,
      };
      this.wheel = index - 1;
      this.wheelHandler(e);
    },
    wheelHandler(e) {
      let main = document.querySelector(".page-box");
      let headHeight = document.querySelector(".page-one").clientHeight;

      if (e.deltaY > 0) {
        this.wheel++;
      } else {
        if (this.wheel === 0) return;
        this.wheel--;
      }
      this.navIndex = this.wheel;
      if (this.wheel === 0) {
        main.style.transform = `translateY(0)`;
      } else {
        main.style.transform = `translateY(calc(-${headHeight}px - ${
          (this.wheel - 1) * 100
        }vh)`;
      }
    },
  },
  destroyed() {
    sessionStorage.setItem("homeScroll", "");
    window.removeEventListener("mousewheel", this.handleScroll);
    window.removeEventListener("DOMMouseScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.page-sum {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.page-box {
  width: 100%;
  transform: translateY(0);
  transition: 1s;

  > div {
    height: 100vh;
    background-size: cover;
    background-position: center;
  }

  .page-one {
    background-size: cover;
    position: relative;
    text-align: center;
    background-position: center;
  }

  .page-ten {
    background: #001b33 no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .image {
    margin-left: auto;
    margin-right: auto;
    margin-top: 12vh;
    height: 1.5vw;
  }

  .title2 {
    text-align: center;
    margin-top: 0.5vw;
    font-size: 1.25vw;
    color: #333333;
    line-height: 1.45vw;
    height: 1.45vw;
  }
 
  .title {
    text-align: center;
    margin-top: 0.78vw;
    font-size: 0.83vw;
    color: #333333;
    line-height: 1vw;
  }

  .pageBtn {
    font-size: 0.83vw;
    position: absolute;
    bottom: 2.6vw;
    width: 14vw;
    height: 2.18vw;
    color: #ffffff;
    background-color: rgba(51, 51, 51, 0.6);
    border-radius: 0.2vw;
    border-width: 0.5px;
    border-color: rgba(51, 51, 51, 0);
    align-self: center;
    box-shadow: none;
    left: 0;
    right: 0;
    margin: auto;
  }

  .pageBtn:hover {
    background-color: rgba(51, 51, 51, 0.4);
    border-color: rgba(51, 51, 51, 0);
    transform: translate(0px, 0px);
    transition: transform 0.2s;
  }
}

::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

::-webkit-scrollbar-thumb {
  background-color: #ddd;
  background-clip: padding-box;
  min-height: 1.75rem;
}

.rightMenu {
  position: absolute;
  right: 0;
  z-index: 1;
  top: 30vh;

  .rightMenuItem {
    padding: 7px;
    text-align: center;
    font-size: 0;

    span {
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background: #c9c7cf;
      display: inline-block;
    }
  }
}

@media only screen and (max-width: 833px) {
  .page-box {
    .image {
      height: 52px;
      margin-top: 66px;
    }

    .title {
      font-size: 12px;
      line-height: 18px;
      margin: 16px 20px 0;
    }

    .title2 {
      font-size: 20px;
      line-height: 30px;
      height: auto;
    }

    .pageBtn {
      width: 270px;
      height: 42px;
      font-size: 16px;
      bottom: 54px;
    }
  }
}
</style>
