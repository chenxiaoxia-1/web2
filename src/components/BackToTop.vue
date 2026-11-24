<template>
  <transition name="back-to-top-fade">
    <button
      v-show="visible"
      type="button"
      class="back-to-top"
      :aria-label="label"
      @click="scrollTop"
    >
      <span class="back-to-top__icon">
        <img
          class="back-to-top__icon-img"
          :src="backToTopIcon"
          alt=""
          aria-hidden="true"
        />
      </span>
      <span class="back-to-top__text">{{ label }}</span>
    </button>
  </transition>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import { scrollToPageAnchor, notifyNavScrollUpdate } from "@/utils/pageAnchor";

export default {
  name: "BackToTop",
  props: {
    /** 回到顶部时定位的 Banner 锚点 id，不传则滚至页面最顶 */
    targetId: {
      type: String,
      default: "",
    },
    /** 滚动超过该距离后显示按钮 */
    offset: {
      type: Number,
      default: 300,
    },
    label: {
      type: String,
      default: "回到顶部",
    },
  },
  data() {
    return {
      visible: false,
      backToTopIcon: ossUrl("talentDevelopment/12@2x.png"),
    };
  },
  mounted() {
    this.onScroll = () => {
      this.visible = window.scrollY > this.offset;
    };
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.onScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    scrollTop() {
      if (this.targetId) {
        scrollToPageAnchor(this.targetId);
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      notifyNavScrollUpdate();
    },
  },
};
</script>

<style scoped lang="less">
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: calc(100vh / 6);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;

  &__icon {
    position: relative;
    display: block;
    width: 44px;
    height: 44px;
    overflow: hidden;
    transition: background-color 0.2s ease;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: transparent;
      transition: background-color 0.2s ease;
      pointer-events: none;
    }

    &-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    font-size: 12px;
    line-height: 1;
    font-family: SourceHanSansCN-Light, sans-serif;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
  }

  &:hover .back-to-top__icon::after {
    background: rgba(255, 255, 255, 0.1);
  }
}

.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media only screen and (max-width: 833px) {
  .back-to-top {
    right: 16px;

    &__icon {
      width: 40px;
      height: 40px;
    }

    &__text {
      font-size: 10px;
    }
  }
}
</style>
