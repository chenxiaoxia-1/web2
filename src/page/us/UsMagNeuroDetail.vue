<template>
  <div class="mag-neuro-detail">
    <HeadMenuUS
      :nav-index-num="0"
      :products="products"
      :flag="headerSolid"
      @scrollByIndex="onProductNav"
    />

    <MagNeuroPerspectiveNav
      v-if="subNavCompact"
      :perspective="perspective"
      :compact="true"
      :sections="sectionNav"
      :active-section="activeSection"
      :compact-label="audience.compactLabel"
      :sticky-top="stickyTop"
      @update:perspective="setPerspective"
      @navigate="scrollToSection"
    />

    <header
      class="mag-neuro-detail__hero"
      :style="{ backgroundImage: `url(${heroBg})` }"
    >
      <div class="mag-neuro-detail__hero-overlay" />
      <div class="mag-neuro-detail__hero-content">
        <h1 class="mag-neuro-detail__title en-bold">
          {{ audience.heroTitle }}
        </h1>
        <el-button
          class="mag-neuro-detail__cta en-light"
          @click="scrollToSection('research')"
        >
          {{ audience.heroCta }}
        </el-button>

        <MagNeuroPerspectiveNav
          v-show="!subNavCompact"
          :perspective="perspective"
          :compact="false"
          :sections="sectionNav"
          :active-section="activeSection"
          @update:perspective="setPerspective"
          @navigate="scrollToSection"
        />
      </div>
      <div ref="heroSentinel" class="mag-neuro-detail__hero-sentinel" />
    </header>

    <main
      class="mag-neuro-detail__main"
      :class="{ 'mag-neuro-detail__main--offset': subNavCompact }"
    >
      <section
        v-for="section in sectionNav"
        :id="domId(section.id)"
        :key="`${perspective}-${section.id}`"
        class="mag-neuro-detail__section"
        :data-section="section.id"
      >
        <div class="mag-neuro-detail__section-inner">
          <h2 class="mag-neuro-detail__section-title en-bold">
            {{ audience.sections[section.id].title }}
          </h2>

          <template v-if="section.id !== 'faqs'">
            <article
              v-for="(block, idx) in audience.sections[section.id].blocks"
              :key="idx"
              class="mag-neuro-detail__block"
            >
              <h3 class="en-bold">{{ block.heading }}</h3>
              <p class="en-regular">{{ block.body }}</p>
            </article>
          </template>

          <el-collapse v-else accordion class="mag-neuro-detail__faq">
            <el-collapse-item
              v-for="(item, idx) in audience.sections.faqs.items"
              :key="idx"
              :title="item.q"
              :name="String(idx)"
            >
              <p class="en-regular">{{ item.a }}</p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HeadMenuUS from "@/components/HeadMenuUS.vue";
import MagNeuroPerspectiveNav from "@/components/us/magNeuro/MagNeuroPerspectiveNav.vue";
import { US_HOME_PRODUCTS } from "@/constants/usHomeProducts";
import {
  MAGNEURO_AUDIENCES,
  MAGNEURO_HERO_BG,
  MAGNEURO_SECTION_NAV,
  sectionDomId,
} from "@/constants/usMagNeuroDetail";

const DEFAULT_PERSPECTIVE = "patients";

export default {
  name: "UsMagNeuroDetail",
  components: {
    HeadMenuUS,
    MagNeuroPerspectiveNav,
  },
  data() {
    return {
      products: US_HOME_PRODUCTS,
      heroBg: MAGNEURO_HERO_BG,
      sectionNav: MAGNEURO_SECTION_NAV,
      perspective: DEFAULT_PERSPECTIVE,
      subNavCompact: false,
      headerSolid: false,
      activeSection: "research",
      stickyTop: "5vw",
      scrollSpyObserver: null,
      heroIntersectionObserver: null,
    };
  },
  computed: {
    audience() {
      return (
        MAGNEURO_AUDIENCES[this.perspective] || MAGNEURO_AUDIENCES.patients
      );
    },
  },
  watch: {
    "$route.query.audience": {
      immediate: true,
      handler(val) {
        if (val === "professionals" || val === "patients") {
          this.perspective = val;
        }
      },
    },
    subNavCompact() {
      this.$nextTick(() => this.bindScrollSpy());
    },
    perspective() {
      this.$nextTick(() => this.bindScrollSpy());
    },
  },
  mounted() {
    this.updateStickyMetrics();
    window.addEventListener("resize", this.updateStickyMetrics, {
      passive: true,
    });
    window.addEventListener("scroll", this.onWindowScroll, { passive: true });
    this.bindHeroObserver();
    this.bindScrollSpy();
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.updateStickyMetrics);
      window.removeEventListener("scroll", this.onWindowScroll);
      this.heroIntersectionObserver?.disconnect();
      this.scrollSpyObserver?.disconnect();
    });
  },
  methods: {
    domId: sectionDomId,
    onProductNav(index) {
      const slug = this.products[index]?.productSlug;
      if (!slug || slug === "MagNeuro") return;
      this.$router.push({ path: `/us/products/${slug}` }).catch(() => {});
    },
    setPerspective(next) {
      if (next === this.perspective) return;
      this.perspective = next;
      this.activeSection = "research";
      this.$router
        .replace({
          query: { ...this.$route.query, audience: next },
        })
        .catch(() => {});
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    scrollOffset() {
      const nav = document.querySelector(".page-nav--us");
      const sub = this.subNavCompact
        ? document.querySelector(".mn-perspective-nav--compact")
        : null;
      const navH = nav ? nav.getBoundingClientRect().height : 0;
      const subH = sub ? sub.getBoundingClientRect().height : 0;
      return navH + subH + 8;
    },
    scrollToSection(sectionId) {
      const el = document.getElementById(sectionDomId(sectionId));
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - this.scrollOffset();
      window.scrollTo({ top, behavior: "smooth" });
      this.activeSection = sectionId;
    },
    onWindowScroll() {
      this.headerSolid = window.scrollY > 24;
    },
    updateStickyMetrics() {
      const nav = document.querySelector(".page-nav--us");
      if (nav) {
        this.stickyTop = `${nav.getBoundingClientRect().height}px`;
      }
    },
    bindHeroObserver() {
      const sentinel = this.$refs.heroSentinel;
      if (!sentinel) return;
      const rootMarginTop = this.stickyTop
        ? `-${parseFloat(this.stickyTop) || 80}px`
        : "-80px";
      this.heroIntersectionObserver = new IntersectionObserver(
        ([entry]) => {
          this.subNavCompact = !entry.isIntersecting;
        },
        { threshold: 0, rootMargin: `${rootMarginTop} 0px 0px 0px` },
      );
      this.heroIntersectionObserver.observe(sentinel);
    },
    bindScrollSpy() {
      this.scrollSpyObserver?.disconnect();
      const sections = this.$el.querySelectorAll("[data-section]");
      if (!sections.length) return;

      this.scrollSpyObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) {
            this.activeSection = visible[0].target.getAttribute("data-section");
          }
        },
        {
          rootMargin: `-${this.scrollOffset()}px 0px -55% 0px`,
          threshold: [0, 0.2, 0.5, 0.75],
        },
      );

      sections.forEach((el) => this.scrollSpyObserver.observe(el));
    },
  },
};
</script>

<style lang="less" scoped>
.mag-neuro-detail {
  min-height: 100vh;
  background: #001b33;
  color: #fff;
}

.mag-neuro-detail__hero {
  position: relative;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 8vh;
}

.mag-neuro-detail__hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 27, 51, 0.15) 0%,
    rgba(0, 27, 51, 0.55) 55%,
    rgba(0, 27, 51, 0.85) 100%
  );
}

.mag-neuro-detail__hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 5vw 2vh;
  margin-top: 18vh;
}

.mag-neuro-detail__title {
  font-size: 2.2vw;
  line-height: 1.35;
  max-width: 52vw;
  margin: 0 auto 1.5vw;
  color: #fff;
}

.mag-neuro-detail__cta {
  margin-bottom: 2vw;
  min-width: 10vw;
  background: rgba(47, 122, 223, 0.9);
  border: none;
  color: #fff;
  border-radius: 0.2vw;
  padding: 0.65vw 1.4vw;
  font-size: 0.8vw;
}

.mag-neuro-detail__hero-sentinel {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

.mag-neuro-detail__main {
  background: #001b33;
}

.mag-neuro-detail__main--offset {
  padding-top: 0.5vw;
}

.mag-neuro-detail__section {
  padding: 5vw 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  scroll-margin-top: 12vw;
}

.mag-neuro-detail__section-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 5vw;
}

.mag-neuro-detail__section-title {
  font-size: 1.6vw;
  margin-bottom: 2vw;
  color: #7eb8ff;
}

.mag-neuro-detail__block {
  margin-bottom: 2vw;

  h3 {
    font-size: 1.05vw;
    margin-bottom: 0.75vw;
  }

  p {
    font-size: 0.85vw;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.82);
  }
}

.mag-neuro-detail__faq {
  border: none;
  background: transparent;

  /deep/ .el-collapse-item__header {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    border: none;
    padding: 0 1vw;
    font-size: 0.85vw;
    height: 3vw;
    line-height: 3vw;
    margin-bottom: 0.5vw;
    border-radius: 0.2vw;
  }

  /deep/ .el-collapse-item__wrap {
    background: rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 0 0 0.2vw 0.2vw;
  }

  /deep/ .el-collapse-item__content {
    color: rgba(255, 255, 255, 0.8);
    padding: 1vw;
    font-size: 0.8vw;
    line-height: 1.6;
  }
}

@media only screen and (max-width: 833px) {
  .mag-neuro-detail__title {
    font-size: 22px;
    max-width: none;
  }

  .mag-neuro-detail__cta {
    font-size: 14px;
    padding: 10px 20px;
    margin-bottom: 20px;
  }

  .mag-neuro-detail__section-title {
    font-size: 20px;
  }

  .mag-neuro-detail__block {
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
  }

  .mag-neuro-detail__faq /deep/ .el-collapse-item__header {
    font-size: 14px;
    height: auto;
    line-height: 1.4;
    padding: 12px;
  }
}
</style>