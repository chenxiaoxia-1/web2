<template>
  <div
    class="mn-perspective-nav"
    :class="{
      'mn-perspective-nav--compact': compact,
      'mn-perspective-nav--hero': !compact,
    }"
    :style="compact ? { top: stickyTop } : null"
  >
    <div class="mn-perspective-nav__inner">
      <div class="mn-perspective-nav__audience">
        <template v-if="compact">
          <button
            type="button"
            class="mn-perspective-nav__pill"
            @click="toggleAudience"
          >
            <span>{{ compactLabel }}</span>
            <i class="el-icon-refresh-right mn-perspective-nav__switch" />
          </button>
        </template>
        <template v-else>
          <button
            v-for="opt in audienceOptions"
            :key="opt.key"
            type="button"
            class="mn-perspective-nav__toggle"
            :class="{ 'is-active': perspective === opt.key }"
            @click="$emit('update:perspective', opt.key)"
          >
            {{ opt.toggleLabel }}
          </button>
        </template>
      </div>

      <nav class="mn-perspective-nav__sections" aria-label="Section navigation">
        <button
          v-for="item in sections"
          :key="item.id"
          type="button"
          class="mn-perspective-nav__section"
          :class="{ 'is-active': activeSection === item.id }"
          @click="$emit('navigate', item.id)"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { MAGNEURO_AUDIENCES } from "@/constants/usMagNeuroDetail";

export default {
  name: "MagNeuroPerspectiveNav",
  props: {
    perspective: {
      type: String,
      required: true,
    },
    compact: Boolean,
    sections: {
      type: Array,
      default: () => [],
    },
    activeSection: {
      type: String,
      default: "research",
    },
    stickyTop: {
      type: String,
      default: "5vw",
    },
    compactLabel: {
      type: String,
      default: "",
    },
  },
  computed: {
    audienceOptions() {
      return Object.values(MAGNEURO_AUDIENCES);
    },
  },
  methods: {
    toggleAudience() {
      const next =
        this.perspective === "patients" ? "professionals" : "patients";
      this.$emit("update:perspective", next);
    },
  },
};
</script>

<style lang="less" scoped>
.mn-perspective-nav--hero {
  position: relative;
  z-index: 2;
  padding: 1.5vw 0 0;
}

.mn-perspective-nav--compact {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.mn-perspective-nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75vw 2.5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2vw;
}

.mn-perspective-nav--hero .mn-perspective-nav__inner {
  flex-direction: column;
  gap: 1.25vw;
  padding: 0 5vw;
}

.mn-perspective-nav__audience {
  display: flex;
  align-items: center;
  gap: 0.6vw;
}

.mn-perspective-nav__toggle {
  border: 1px solid rgba(47, 122, 223, 0.35);
  background: rgba(255, 255, 255, 0.65);
  color: #2f7adf;
  font-size: 0.75vw;
  padding: 0.45vw 1.1vw;
  border-radius: 2vw;
  cursor: pointer;
  font-family: Roboto-Bold, sans-serif;

  &.is-active {
    background: #2f7adf;
    color: #fff;
    border-color: #2f7adf;
  }
}

.mn-perspective-nav__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5vw;
  border: none;
  background: #2f7adf;
  color: #fff;
  font-size: 0.7vw;
  padding: 0.45vw 1vw;
  border-radius: 2vw;
  cursor: pointer;
  text-transform: lowercase;
  font-family: Roboto-Bold, sans-serif;
}

.mn-perspective-nav__switch {
  font-size: 0.85vw;
}

.mn-perspective-nav__sections {
  display: flex;
  align-items: center;
  gap: 1.5vw;
}

.mn-perspective-nav--hero .mn-perspective-nav__sections {
  gap: 2.5vw;
}

.mn-perspective-nav__section {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.8vw;
  color: rgba(51, 51, 51, 0.55);
  font-family: Roboto-Bold, sans-serif;
  padding: 0.25vw 0;
  position: relative;

  &.is-active {
    color: #2f7adf;
  }

  &.is-active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.35vw;
    height: 2px;
    background: #2f7adf;
  }
}

@media only screen and (max-width: 833px) {
  .mn-perspective-nav__inner {
    padding: 10px 16px;
    flex-wrap: wrap;
  }

  .mn-perspective-nav--hero .mn-perspective-nav__inner {
    padding: 0 20px;
  }

  .mn-perspective-nav__toggle,
  .mn-perspective-nav__pill {
    font-size: 12px;
    padding: 8px 14px;
  }

  .mn-perspective-nav__section {
    font-size: 13px;
  }
}
</style>