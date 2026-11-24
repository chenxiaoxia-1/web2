<template>
  <div class="accessory-recommendations">
    <div class="accessory-recommendations__track">
      <div
        v-for="item in visibleItems"
        :key="`slot-${item.offset}`"
        class="accessory-item"
        :class="itemClass(item.offset)"
        @click="handleItemClick(item.offset)"
      >
        <div class="accessory-item__visual">
          <div class="accessory-item__frame">
            <img
              :src="item.image"
              :alt="item.name"
              class="accessory-item__img"
              decoding="async"
            />
          </div>
        </div>

        <transition name="accessory-info-fade">
          <div
            v-if="item.offset === 0"
            class="accessory-item__info"
            :class="infoClass"
          >
            <div class="accessory-item__info-row">
              <span class="accessory-item__label">{{ labels.name }}</span>
              <span>{{ item.name }}</span>
            </div>
            <div class="accessory-item__info-row">
              <span class="accessory-item__label">{{ labels.product }}</span>
              <span>{{ item.product }}</span>
            </div>
            <div class="accessory-item__info-row">
              <span class="accessory-item__label">{{ labels.scenario }}</span>
              <span>{{ item.scenario }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { getAccessoryRecommendations } from "@/constants/accessoryRecommendations";

const PC_VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];
const MOBILE_VISIBLE_OFFSETS = [-1, 0, 1];

const LABELS = {
  cn: {
    name: "配件名称：",
    product: "适配产品：",
    scenario: "应用场景：",
  },
  en: {
    name: "Accessory Name: ",
    product: "Compatible Device: ",
    scenario: "Application Scenarios: ",
  },
};

export default {
  name: "AccessoryRecommendations",
  props: {
    language: {
      type: String,
      default: "cn",
    },
  },
  data() {
    return {
      activeIndex: 0,
      justSelected: false,
    };
  },
  computed: {
    items() {
      return getAccessoryRecommendations(this.language);
    },
    labels() {
      return LABELS[this.language] || LABELS.cn;
    },
    infoClass() {
      return this.language === "en" ? "accessory-item__info--en" : "";
    },
    visibleOffsets() {
      return this.$root.isMobile ? MOBILE_VISIBLE_OFFSETS : PC_VISIBLE_OFFSETS;
    },
    visibleItems() {
      const len = this.items.length;
      return this.visibleOffsets.map((offset) => {
        const index = (this.activeIndex + offset + len) % len;
        return {
          ...this.items[index],
          offset,
          index,
        };
      });
    },
  },
  watch: {
    language() {
      this.activeIndex = 0;
    },
  },
  methods: {
    itemClass(offset) {
      return {
        "is-center": offset === 0,
        "is-pop": offset === 0 && this.justSelected,
      };
    },
    handleItemClick(offset) {
      if (offset === 0) return;

      const len = this.items.length;
      this.activeIndex = (this.activeIndex + offset + len) % len;
      this.triggerPopAnimation();
    },
    triggerPopAnimation() {
      this.justSelected = false;
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.justSelected = true;
          if (this.popTimer) {
            clearTimeout(this.popTimer);
          }
          this.popTimer = setTimeout(() => {
            this.justSelected = false;
          }, 680);
        });
      });
    },
  },
  beforeDestroy() {
    if (this.popTimer) {
      clearTimeout(this.popTimer);
    }
  },
};
</script>

<style scoped lang="less">
.accessory-recommendations {
  width: 70vw;
  margin: 0 auto;
  padding: 4vw 0 3vw;
  box-sizing: border-box;

  &__track {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 1vw;
  }
}

.accessory-item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  cursor: pointer;

  &.is-center {
    flex: 1.35 1 0;
    cursor: default;
  }

  &__visual {
    height: 14vw;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  &__frame {
    width: 100%;
    height: 12vw;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    border-radius: 0.5vw;
    padding: 0.5vw;
    box-sizing: border-box;
    background: transparent;
    transform-origin: bottom center;
    transition: background 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &.is-center &__frame {
    height: 14vw;
    border-style: solid;
    border-color: transparent;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0.35vw 1vw rgba(0, 0, 0, 0.22);
  }

  &.is-center.is-pop &__frame {
    will-change: transform, box-shadow;
    animation: accessory-frame-pop 0.65s cubic-bezier(0.33, 1, 0.68, 1);
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: bottom center;
    display: block;
    pointer-events: none;
  }

  &__info {
    width: 100%;
    margin-top: 1vw;
    color: #ffffff;
    font-size: 0.75vw;
    line-height: 1.35vw;
    font-family: SourceHanSansCN-Light;
    text-align: left;
  }

  &__info-row {
    margin-bottom: 0.2vw;
  }

  &__label {
    font-family: SourceHanSansCN-Bold;
  }

  &__info--en {
    font-family: "Roboto-Light";

    .accessory-item__label {
      font-family: "Roboto-Bold";
    }
  }
}

.accessory-info-fade-enter-active,
.accessory-info-fade-leave-active {
  transition: opacity 0.3s ease;
}

.accessory-info-fade-enter,
.accessory-info-fade-leave-to {
  opacity: 0;
}

@keyframes accessory-frame-pop {
  0% {
    transform: scale(1);
    box-shadow: 0 0.35vw 1vw rgba(0, 0, 0, 0.22);
  }
  42% {
    transform: scale(1.12);
    box-shadow: 0 0.55vw 1.4vw rgba(0, 0, 0, 0.28);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0.35vw 1vw rgba(0, 0, 0, 0.22);
  }
}

@keyframes accessory-frame-pop-mobile {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
  }
  42% {
    transform: scale(1.12);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
  }
}

@media only screen and (max-width: 833px) {
  .accessory-recommendations {
    width: 100%;
    padding: 20px 0 30px;

    &__track {
      gap: 8px;
      padding: 0 12px;
      box-sizing: border-box;
    }
  }

  .accessory-item {
    &.is-center {
      flex: 1.35 1 0;
    }

    &__visual {
      height: 140px;
    }

    &__frame {
      height: 110px;
      border-radius: 6px;
      padding: 6px;
      // transform-origin: bottom center;
    }

    &.is-center &__frame {
      height: 130px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
    }

    &.is-center.is-pop &__frame {
      animation: accessory-frame-pop-mobile 0.65s cubic-bezier(0.33, 1, 0.68, 1);
    }

    &__info {
      margin-top: 10px;
      font-size: 10px;
      line-height: 16px;
    }
  }
}
</style>
