<template>
  <div
    class="page-nav page-nav--us"
    :class="!$root.isMobile && (isScrolled || flag) ? 'page-nav-Scrolled' : ''"
    ref="page-nav"
  >
    <div class="logoDiv" @click="logoClick">
      <img
        :src="$root.isMobile ? vishee_black : logo2x"
        alt="Vishee"
        class="page-nav-logo"
      />
    </div>

    <div v-if="!$root.isMobile" class="title title--us">
      <div
        v-for="(item, index) in products"
        :key="item.id"
        class="nav-type"
        @click="$emit('scrollByIndex', index)"
      >
        <p :class="['nav-item', { active: navIndex === index }]">
          {{ item.name }}
        </p>
      </div>
    </div>
    <div v-else class="title title--us title--us-mobile">
      <span>{{ products[navIndex] && products[navIndex].name }}</span>
    </div>

    <div class="page-menu page-menu--us">
      <button type="button" class="us-link" @click="goPlaceholder('usStore')">
        Store
      </button>
      <button type="button" class="us-link" @click="goPlaceholder('usEvents')">
        Events
      </button>
      <button type="button" class="us-link" @click="goPlaceholder('usAbout')">
        About Vishee
      </button>
      <RegionSelect v-model="region" @change="onRegionChange" />
    </div>
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import RegionSelect from "@/components/RegionSelect.vue";
import { applyRegionSwitch } from "@/utils/regionSwitch";

export default {
  name: "HeadMenuUS",
  components: { RegionSelect },
  props: {
    navIndexNum: { type: Number, default: 0 },
    flag: Boolean,
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      logo2x: ossUrl("home/vishee_black@2x.png"),
      vishee_black: ossUrl("home/vishee_black@2x.png"),
      region: "us",
      isScrolled: false,
    };
  },
  computed: {
    navIndex() {
      return this.navIndexNum;
    },
  },
  created() {
    this.region = this.$route.params.language || "us";
  },
  watch: {
    "$route.params.language"(val) {
      if (val) this.region = val;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.syncNavBackground, { passive: true });
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("scroll", this.syncNavBackground);
    });
  },
  methods: {
    logoClick() {
      if (this.$route.name !== "homeUs") {
        this.$router.push({ path: "/us" }).catch(() => {});
      }
    },
    onRegionChange(val) {
      applyRegionSwitch(this, val);
      this.region = val;
    },
    goPlaceholder(routeName) {
      this.$router.push({ name: routeName }).catch(() => {});
    },
    syncNavBackground() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      this.isScrolled = scrollTop > 10;
    },
  },
};
</script>

<style lang="less" scoped>
.page-nav--us {
  .title--us {
    .nav-type {
      margin: 0 1.2vw;

      .nav-item {
        margin: 0;
        padding-bottom: 0.25vw;
        border-bottom: 2px solid transparent;

        &.active {
          color: #333333;
          border-bottom-color: #2f7adf;
        }
      }
    }
  }

  .page-menu--us {
    display: flex;
    align-items: center;
    gap: 1.2vw;

    .us-link {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: Roboto-Bold, sans-serif;
      font-size: 0.8vw;
      color: #333333;
      padding: 0;

      &:hover {
        color: rgba(51, 51, 51, 0.75);
      }
    }
  }
}

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

    .nav-type {
      cursor: pointer;
      font-family: Roboto-Bold, sans-serif;
      font-size: 0.8vw;
      color: #333333;
    }
  }

  .page-nav-logo {
    height: 1vw;
  }
}

@media only screen and (max-width: 833px) {
  .page-nav {
    height: auto;
    padding: 20px;

    .page-nav-logo {
      height: 10px;
    }

    .page-menu--us .us-link {
      font-size: 11px;
    }

    .title--us-mobile span {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>