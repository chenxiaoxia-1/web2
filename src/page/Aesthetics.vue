<template>
  <div class="MendCondition">
    <PageTopBanner
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      :language="language"
      title="AESTHETICS"
      v-if="language === 'en'"
    />
    <div v-if="language === 'cn'">
      <AestheticsCN />
    </div>
    <div v-else>
      <AestheticsEN />
    </div>

    <systemBottom :language="language" class="itemBottom" />
    <dialogPop :language="language" ref="dialogPop" />
  </div>
</template>
<script>
import { ossUrl } from "@/constants/ossAssets";
import $bus from "../components/eventBus";
import AestheticsCN from "../components/Aesthetics/AestheticsCN.vue";
import AestheticsEN from "../components/Aesthetics/AestheticsEN.vue";
import systemBottom from "../components/systemBottom.vue";
import dialogPop from "./dialogPop.vue";
import PageTopBanner from "../components/PageTopBanner.vue";

export default {
  name: "Aesthetics",
  components: {
    systemBottom,
    dialogPop,
    AestheticsCN,
    AestheticsEN,
    PageTopBanner,
  },
  data() {
    return {
      language: "cn",
      bgImage: ossUrl("aesthetics/bg_picov@2x.png"),
      bgImage2: ossUrl("aesthetics/bg_yyz@3x.png"),
    };
  },

  created() {
    this.language = this.$route.params.language;
  },
  mounted() {
    $bus.$on("languageChange", (item) => {
      this.language = item;
      this.$router.push({
        path: `/${item}/aesthetics`,
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
  background: #001b33;
}
</style>
