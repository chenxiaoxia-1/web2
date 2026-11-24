<template>
  <div class="page-sum layout page-sum--us">
    <HeadMenuUS
      :products="usProducts"
      :nav-index-num="navIndex"
      :flag="isScrolled"
      @scrollByIndex="scrollByIndex"
    />

    <div v-if="$root.isMobile" class="rightMenu">
      <div
        v-for="(item, index) in usProducts"
        :key="item.id"
        class="rightMenuItem"
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
        v-for="(item, index) in usProducts"
        :key="item.id"
        class="page-one"
        @touchstart="touchStartAction"
        @touchend="touchEndAction"
        :style="{ 'background-image': 'url(' + item.banner + ')' }"
      >
        <img class="image" :src="item.itemImage" :alt="item.name" />
        <div class="title2 en-bold" v-html="item.itemCopywritingLevel2"></div>
        <div class="title en-regular" v-html="item.itemCopywriting"></div>
        <el-button class="pageBtn en-light" @click="pageOneButtonClick(index)">
          Explore More
        </el-button>
      </div>
      <systemBottom
        @touchYchange="touchYchange"
        @scroll-up="handleSystemBottomScrollUp"
        language="en"
        ref="systemBottom"
        class="page-ten"
      />
    </div>
  </div>
</template>

<script>
import systemBottom from "../components/systemBottom.vue";
import HeadMenuUS from "../components/HeadMenuUS.vue";
import { US_HOME_PRODUCTS } from "@/constants/usHomeProducts";

export default {
  name: "HomeUS",
  components: {
    systemBottom,
    HeadMenuUS,
  },
  data() {
    return {
      usProducts: US_HOME_PRODUCTS,
      navIndex: 0,
      wheel: 0,
      carouselScrolling: false,
      touchStartY: 0,
      isScrolled: false,
    };
  },
  computed: {
    productListLength() {
      return this.usProducts.length;
    },
    isSystemBottomPage() {
      return this.navIndex >= this.productListLength;
    },
  },
  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") > -1) {
      window.addEventListener("DOMMouseScroll", this.handleScroll);
    } else {
      window.addEventListener("mousewheel", this.handleScroll);
    }
    const scrollIndex = sessionStorage.getItem("homeScroll");
    if (scrollIndex) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollByIndex(Number(scrollIndex));
          sessionStorage.setItem("homeScroll", "");
        }, 300);
      });
    }
  },
  methods: {
    handleSystemBottomScrollUp() {
      if (this.carouselScrolling) return;
      this.carouselScrolling = true;
      const lastIndex = this.productListLength - 1;
      this.navIndex = lastIndex;
      this.scrollByIndex(lastIndex);
      setTimeout(() => {
        this.carouselScrolling = false;
      }, 1000);
    },

    handleScroll(e) {
      const agent = navigator.userAgent.toLowerCase();
      const userAgent = navigator.userAgent;
      let direction = "";

      if (userAgent.indexOf("Firefox") > -1) {
        direction = e.detail > 0 ? "down" : "up";
      } else {
        direction = e.deltaY > 0 ? "down" : "up";
      }

      if (this.navIndex >= this.productListLength && direction === "down") {
        this.isScrolled = true;
        return;
      }
      this.isScrolled = false;

      let timer = /macintosh|mac os x/i.test(navigator.userAgent) ? 1500 : 1000;
      if (
        agent.indexOf("win32") >= 0 ||
        agent.indexOf("wow32") >= 0 ||
        agent.indexOf("win64") >= 0 ||
        agent.indexOf("wow64") >= 0
      ) {
        timer = 1000;
      }

      if (direction === "down" && e.deltaY > 0 && !this.carouselScrolling) {
        this.carouselScrolling = true;
        if (!this.isSystemBottomPage) {
          this.navIndex += 1;
          this.scrollByIndex(this.navIndex);
        }
        setTimeout(() => {
          this.carouselScrolling = false;
        }, timer);
      }
      if (direction === "up" && e.deltaY < 0 && !this.carouselScrolling) {
        this.carouselScrolling = true;
        if (this.isSystemBottomPage) {
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

    touchStartAction(e) {
      this.touchStartY = e.changedTouches[0].clientY;
    },
    touchEndAction(e) {
      if (!this.$root.isMobile) return;

      const diff = e.changedTouches[0].clientY - this.touchStartY;
      if (Math.abs(diff) < 30) {
        this.touchStartY = 0;
        return;
      }

      if (diff < 0 && !this.carouselScrolling) {
        this.carouselScrolling = true;
        if (this.isSystemBottomPage) {
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
        return;
      }

      if (diff > 0 && !this.carouselScrolling) {
        this.carouselScrolling = true;
        if (this.isSystemBottomPage) {
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

    touchYchange() {
      this.carouselScrolling = true;
      this.navIndex -= 1;
      this.scrollByIndex(this.navIndex);
      setTimeout(() => {
        this.carouselScrolling = false;
      }, 1000);
    },

    pageClick() {},

    pageOneButtonClick(index) {
      const slug = this.usProducts[index].productSlug;
      this.$router.push({ path: `/us/products/${slug}` }).catch(() => {});
    },

    scrollByIndex(index) {
      const e = { deltaY: 100 };
      this.wheel = index - 1;
      this.wheelHandler(e);
    },

    wheelHandler(e) {
      const main = document.querySelector(".page-box");
      const firstSlide = document.querySelector(".page-one");
      if (!main || !firstSlide) return;

      const headHeight = firstSlide.clientHeight;

      if (e.deltaY > 0) {
        this.wheel++;
      } else {
        if (this.wheel === 0) return;
        this.wheel--;
      }
      this.navIndex = this.wheel;
      if (this.wheel === 0) {
        main.style.transform = "translateY(0)";
      } else {
        main.style.transform = `translateY(calc(-${headHeight}px - ${
          (this.wheel - 1) * 100
        }vh))`;
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
    height: 24px;
    max-width: 80%;
    object-fit: contain;
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
    line-height: 1.35vw;
    max-width: 52vw;
    margin-left: auto;
    margin-right: auto;
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
  }
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
      max-width: none;
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
