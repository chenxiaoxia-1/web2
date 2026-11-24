<template>
  <div class="page-top-banner" :id="bannerId" :style="bannerStyle">
    <div class="page-top-banner__content" :class="contentClass">
      <slot>
        <template v-if="title">
          <div class="page-top-banner__title" :class="titleClass">
            {{ title }}
          </div>
        </template>
      </slot>
    </div>

    <nav
      v-if="visibleNavItems.length"
      class="page-top-banner__nav"
      :class="navClass"
      :style="navGridStyle"
      aria-label="页面快捷导航"
    >
      <button
        v-for="item in visibleNavItems"
        :key="item.anchor"
        type="button"
        class="page-top-banner__nav-item"
        @click="handleNavClick(item)"
      >
        <img
          class="page-top-banner__nav-icon"
          :src="item.icon"
          :alt="item.label"
        />
        <span
          class="page-top-banner__nav-label"
          :class="isEn ? 'en-medium ' : 'cn-normal'"
          >{{ item.label }}</span
        >
      </button>
    </nav>
  </div>
</template>

<script>
import { scrollToSectionAnchor } from "@/utils/pageAnchor";

export default {
  name: "PageTopBanner",
  props: {
    /** PC 端背景图 */
    bgImage: {
      type: [String, Object],
      required: true,
    },
    /** 移动端背景图，未传则使用 bgImage */
    bgImageMobile: {
      type: [String, Object],
      default: null,
    },
    /** 语言：cn | en */
    language: {
      type: String,
      default: "cn",
    },
    /** 主标题（也可使用默认插槽自定义） */
    title: {
      type: String,
      default: "",
    },
    /** 区块高度，与原先 .topDiv 一致 */
    bannerHeight: {
      type: String,
      default: "100vh",
    },
    /** 根节点 id，用于锚点等 */
    bannerId: {
      type: String,
      default: "",
    },
    /**
     * Banner 底部快捷导航
     * [{ anchor, label, icon, hidden? }]
     */
    navItems: {
      type: Array,
      default: () => [],
    },
    /** 点击导航后是否自动滚动至锚点 */
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    resolvedBgImage() {
      const mobile = this.bgImageMobile || this.bgImage;
      const src = this.$root.isMobile ? mobile : this.bgImage;
      return typeof src === "string" ? src : src;
    },
    bannerStyle() {
      return {
        height: this.bannerHeight,
        backgroundImage: `url(${this.resolvedBgImage})`,
      };
    },
    isEn() {
      return this.language === "en";
    },
    contentClass() {
      return this.isEn
        ? "page-top-banner__content--en"
        : "page-top-banner__content--cn";
    },
    titleClass() {
      return [this.isEn ? "en-bold" : "cn-bold"];
    },
    visibleNavItems() {
      return this.navItems.filter((item) => item && !item.hidden).slice(0, 6);
    },
    navClass() {
      const classes = [this.isEn ? "en-medium" : "cn-light"];
      const count = this.visibleNavItems.length;
      classes.push(`page-top-banner__nav--count-${count}`);
      if (count === 4) {
        classes.push("page-top-banner__nav--mobile-cols-2");
      }
      return classes;
    },
    navGridStyle() {
      const count = this.visibleNavItems.length;
      if (this.$root.isMobile) {
        const cols = count === 4 ? 2 : 3;
        return { gridTemplateColumns: `repeat(${cols}, 1fr)` };
      }
      return { gridTemplateColumns: `repeat(${count}, 1fr)` };
    },
  },
  methods: {
    handleNavClick(item) {
      this.$emit("nav-click", item);

      if (this.autoScroll && item.anchor) {
        scrollToSectionAnchor(item.anchor);
      }
    },
  },
};
</script>

<style scoped lang="less">
@nav-gap-pc: 1vw;
@nav-gap-mobile: 10px;
@nav-bottom-pc: 4.5vw;
@nav-bottom-mobile: 28px;

.page-top-banner {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  text-align: center;
  overflow: hidden;
  &__content--en {
    padding: 20% 5vw 0;
    .page-top-banner__title {
      font-size: 5vw;
    }
  }
  &__content--cn {
    padding: 15% 5vw 0;
    .page-top-banner__title {
      font-size: 7vw;
      letter-spacing: 16px;
    }
  }
  &__content {
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .page-top-banner__title {
      font-style: normal;
      font-weight: bolder;
    }
  }

  /* 悬浮在背景图偏下位置，非贴底整条栏 */
  &__nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: @nav-bottom-pc;
    z-index: 2;
    display: grid;
    align-items: stretch;
    width: calc(100% - 8vw);
    margin: 0;
    padding: 0;
    gap: @nav-gap-pc;
    background: transparent;
    border: none;
    box-sizing: border-box;
  }

  &__nav-item {
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6vw;
    padding: 1.4vw 0.6vw;
    border: none;
    border-radius: 2px;
    background: rgba(0, 27, 51, 0.45);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba(0, 27, 51, 0.62);
    }
  }

  &__nav-icon {
    width: 2.8vw;
    height: 2.8vw;
    object-fit: contain;
    flex-shrink: 0;
  }

  &__nav-label {
    font-size: 0.85vw;
    line-height: 1.4;
    white-space: nowrap;
    text-align: center;
  }
}

@media only screen and (max-width: 833px) {
  .page-top-banner {
    &__content--en {
      padding: 80% 18px 0;
      .page-top-banner__title {
        font-size: 40px;
      }
    }
    &__content--cn {
      padding: 60% 18px 0;
      .page-top-banner__title {
        font-size: 60px;
        letter-spacing: 4px;
      }
    }
  }

  .page-top-banner__nav {
    bottom: @nav-bottom-mobile;
    width: calc(100% - 32px);
    gap: @nav-gap-mobile;
  }

  .page-top-banner__nav-item {
    gap: 6px;
    padding: 14px 8px;
    box-sizing: border-box;
  }

  .page-top-banner__nav-icon {
    width: 28px;
    height: 28px;
  }

  .page-top-banner__nav-label {
    font-size: 12px;
    line-height: 16px;
    white-space: normal;
  }
}
</style>
