<template>
  <div class="MendCondition">
    <PageTopBanner
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      :language="language"
      :title="bannerTitle"
    />
    <div v-if="language === 'cn'">
      <DepressionCN />
    </div>
    <div v-else>
      <DepressionEN />
    </div>

    <systemBottom :language="language" class="itemBottom" />
    <dialogPop :language="language" ref="dialogPop" />
  </div>
</template>
<script>
import { ossUrl } from "@/constants/ossAssets";
import $bus from "../components/eventBus";
import DepressionCN from "../components/Depression/DepressionCN.vue";
import DepressionEN from "../components/Depression/DepressionEN.vue";
import systemBottom from "../components/systemBottom.vue";
import dialogPop from "./dialogPop.vue";
import PageTopBanner from "../components/PageTopBanner.vue";

export default {
  name: "MendCondition",
  components: {
    systemBottom,
    dialogPop,
    DepressionCN,
    DepressionEN,
    PageTopBanner,
  },
  data() {
    return {
      language: "cn",
      bgImage: ossUrl("depression/bg_yyz.png"),
      bgImage2: ossUrl("depression/bg_yyz@3x.png"),
    };
  },
  created() {
    this.language = this.$route.params.language;
  },
  computed: {
    bannerTitle() {
      return this.language === "cn" ? "抑郁症" : "DEPRESSION";
    },
  },
  mounted() {
    $bus.$on("languageChange", (item) => {
      this.language = item;
      this.$router.push({
        path: `/${item}/depression`,
      });
    });
  },
  beforeDestroy() {
    $bus.$off("languageChange");
  },
};
</script>
<style lang="less" scoped>
.MendCondition {
  background: #001b33 no-repeat right top;
}
</style>
