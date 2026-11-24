<template>
  <div class="investorRelations">
    <PageTopBanner
      banner-id="investor"
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      :language="language"
      :title="bannerTitle"
    />
    <div class="company-profile">
      <CompanyProfile />
    </div>

    <systemBottom :language="language" class="itemBottom" />
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import $bus from "../components/eventBus";
import PageTopBanner from "../components/PageTopBanner.vue";
import systemBottom from "../components/systemBottom.vue";
import { optionsCN, optionsEN } from "@/constants/menuOptions";
import { getPageBannerTitle } from "@/utils/menuLabel";
import {
  isTopLevelPageAnchor,
  scrollToPageAnchor,
  scrollToSectionAnchor,
  getInvestorRelationsPath,
} from "@/utils/pageAnchor";
import CompanyProfile from "../components/CompanyProfile/CompanyProfileEN.vue";

export default {
  name: "investorRelations",
  components: {
    PageTopBanner,
    systemBottom,
    CompanyProfile,
  },
  data() {
    return {
      language: "en",
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
  },
  beforeDestroy() {
    $bus.$off("languageChange");
    $bus.$off("pageId");
  },
};
</script>

<style scoped lang="less">
.investorRelations {
  width: 100%;
  background: #001b33;
  color: #ffffff;

  .itemBottom {
    background: #001b33 no-repeat right top;
  }

  .company-profile {
    width: 62.5vw;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 833px) {
  .investorRelations {
    overflow-x: hidden;

    .company-profile {
      width: 100%;
      margin: 0 auto;
      padding: 10px;
    }
  }
}
</style>
