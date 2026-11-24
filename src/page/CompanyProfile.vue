<template>
  <!-- 投资者关系 -->
  <div class="investorRelations">
    <PageTopBanner
      banner-id="investor"
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      :language="language"
      :title="bannerTitle"
      :nav-items="bannerNavItems"
      @nav-click="handleBannerNavClick"
    />

    <section id="company-profile" class="ir-section company-profile">
      <CompanyProfile />
    </section>
    <section id="stock-info" class="ir-section company-profile">
      <StockInformation />
    </section>
    <section id="investment-info" class="ir-section company-profile">
      <InvestmentInformation />
    </section>

    <BackToTop target-id="investor" />
    <systemBottom :language="language" class="itemBottom" />
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import $bus from "../components/eventBus";
import PageTopBanner from "../components/PageTopBanner.vue";
import BackToTop from "../components/BackToTop.vue";
import systemBottom from "../components/systemBottom.vue";
import { optionsCN, optionsEN } from "@/constants/menuOptions";
import { getPageBannerTitle } from "@/utils/menuLabel";
import {
  isTopLevelPageAnchor,
  scrollToPageAnchor,
  scrollToSectionAnchor,
  getInvestorRelationsPath,
} from "@/utils/pageAnchor";
import { getInvestorRelationsBannerNav } from "@/constants/pageBannerNav";
import CompanyProfile from "../components/CompanyProfile/index.vue";
import StockInformation from "../components/CompanyProfile/StockInformation.vue";
import InvestmentInformation from "../components/CompanyProfile/InvestmentInformation.vue";

export default {
  name: "investorRelations",
  components: {
    PageTopBanner,
    BackToTop,
    systemBottom,
    CompanyProfile,
    StockInformation,
    InvestmentInformation,
  },
  data() {
    return {
      language: "cn",
      index: "",
      bgImage: ossUrl("touzizheguanxi/bg_picov@2x.png"),
      bgImage2: ossUrl("touzizheguanxi/bg_tzzgx@3x.png"),
      menuKey: "investor",
    };
  },
  computed: {
    bannerTitle() {
      const options = this.language === "cn" ? optionsCN : optionsEN;
      return getPageBannerTitle(options, this.menuKey);
    },
    bannerNavItems() {
      return getInvestorRelationsBannerNav(this.language);
    },
  },
  created() {
    const pageId = sessionStorage.getItem("pageId");
    if (pageId) {
      this.index = pageId;
    }
    const url = this.$route.params;
    if (url) {
      this.language = url.language;
    }
  },
  mounted() {
    $bus.$on("languageChange", (item) => {
      this.language = item;
      this.$router.push({
        path: getInvestorRelationsPath(item),
      });
    });
    $bus.$on("pageId", (index) => {
      this.index = index;
      this.scrollToSection();
    });
    if (this.index) {
      this.scrollToSection();
    }
  },
  methods: {
    scrollToSection() {
      if (!this.index) return;
      if (isTopLevelPageAnchor(this.index)) {
        scrollToPageAnchor(this.index);
        return;
      }
      this.$nextTick(() => {
        requestAnimationFrame(() => scrollToSectionAnchor(this.index));
      });
    },
    handleBannerNavClick(item) {
      this.index = item.anchor;
      sessionStorage.setItem("pageId", item.anchor);
    },
  },
  beforeDestroy() {
    $bus.$off("pageId");
    $bus.$off("languageChange");
  },
};
</script>

<style scoped lang="less">
@import url(../common/style/elementUi.less);

.investorRelations {
  width: 100%;
  background: #001b33;
  color: #ffffff;

  .itemBottom {
    background: #001b33 no-repeat right top;
  }

  .ir-section {
    scroll-margin-top: 80px;
  }

  .company-profile {
    width: 62.5vw;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 833px) {
  .investorRelations {
    .company-profile {
      width: 100%;
      margin: 0 auto;
      padding: 10px;
    }
  }
}
</style>
