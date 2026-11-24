<template>
  <!-- 客户服务页面 -->
  <div class="customerService" @click="customerServiceClick">
    <PageTopBanner
      banner-id="services"
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      :language="language"
      :title="bannerTitle"
      :nav-items="bannerNavItems"
      @nav-click="handleBannerNavClick"
    />

    <div v-if="language !== 'cn'" class="after-sales" id="service-network">
      <div class="server-en">
        <div class="box">
          <div class="word">Service Hotline</div>
          <div class="part">
            400 696 4936（CHN，GMT+8）
            <span @click="handleCopy('400 696 4936')">
              <i class="el-icon-document-copy"></i>
            </span>
          </div>
        </div>

        <div class="box">
          <div class="word">Service E-mail</div>
          <div class="part">
            GlobalService@vishee.com
            <span @click="handleCopy('GlobalService@vishee.com')">
              <i class="el-icon-document-copy"></i>
            </span>
            <div class="email">
              Email is the preferred contact method for Vishee oversea
              customers. Service will respond within 2 business days.
            </div>
          </div>
        </div>
      </div>
    </div>
    <CustomerServiceCards v-if="language === 'cn'" @copy="handleCopy" />
    <div class="accessory-section" id="spare-part">
      <div class="secDiv">
        <div class="text3" :class="language === 'en' ? 'en-regular' : ''">
          {{ accessorySectionTitle }}
        </div>
      </div>
      <AccessoryRecommendations :language="language" />
    </div>
    <systemBottom :language="language" class="itemBottom" />
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import $bus from "../components/eventBus";
import PageTopBanner from "../components/PageTopBanner.vue";
import AccessoryRecommendations from "../components/CustomerService/AccessoryRecommendations.vue";
import CustomerServiceCards from "../components/CustomerService/CustomerServiceCards.vue";
import systemBottom from "../components/systemBottom.vue";
import { optionsCN, optionsEN } from "@/constants/menuOptions";
import { getPageBannerTitle } from "@/utils/menuLabel";
import { copyToClipboard } from "../utils/util";
import {
  isTopLevelPageAnchor,
  scrollToPageAnchor,
  scrollToSectionAnchor,
} from "@/utils/pageAnchor";
import { getCustomerServiceBannerNav } from "@/constants/pageBannerNav";

export default {
  name: "customerService",
  components: {
    PageTopBanner,
    AccessoryRecommendations,
    CustomerServiceCards,
    systemBottom,
  },
  data() {
    return {
      language: "cn",
      index: "services",
      bgImage2: ossUrl("customerService/bg_rcfz@3x.png"),
      bgImage: ossUrl("customerService/bg_picov@2x.png"),
      menuKey: "services",
    };
  },
  computed: {
    bannerTitle() {
      const options = this.language === "cn" ? optionsCN : optionsEN;
      return getPageBannerTitle(options, this.menuKey);
    },
    bannerNavItems() {
      return getCustomerServiceBannerNav(this.language);
    },
    accessorySectionTitle() {
      return this.language === "cn" ? "配件推荐" : "Accessory Recommendations";
    },
  },
  created() {
    let servicesId = sessionStorage.getItem("pageId");
    var url = this.$route.params;
    if (url) {
      this.language = url.language;
    }
    this.index = servicesId;
  },
  mounted() {
    $bus.$on("languageChange", (item) => {
      this.language = item;
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
    handleCopy(text) {
      // 直接调用导入的函数
      copyToClipboard(text, this.language);
    },
    customerServiceClick() {
      $bus.$emit("menuRecover", "1");
    },
  },
  beforeDestroy() {
    $bus.$off("languageChange");
    $bus.$off("pageId");
  },
};
</script>

<style scoped lang="less">
.customerService {
  width: 100%;
  background: #001b33;
  font-family: SourceHanSansCN-Light;

  .after-sales {
    padding: 4.5vw 1vw;
    width: 60%;
    margin: 3.1vw auto 0;
    border-radius: 8px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
    .server-en {
      width: 100%;
      display: flex;
      padding: 0 auto;
      justify-content: space-around;
      .box {
        flex: 1;
        .word {
          height: 2vw;
          font-family: SourceHanSansCN-Bold;
          margin: 1vw;
          font-size: 1vw;
        }
        .part {
          padding: 0 5vw;
          font-size: 14px;
          font-family: "Roboto-Light";
          .email {
            font-size: 10px;
            opacity: 0.8;
          }
        }
      }
    }
  }
  .accessory-section {
    width: 100%;
    margin: 1.5vw auto 5vw;
    .en-light {
      font-size: 2.1vw;
    }
  }

  .itemBottom {
    margin-top: 80px;
    background: #001b33 no-repeat right top;
  }
}

@media only screen and (max-width: 833px) {
  .customerService {
    .itemBottom {
      margin-top: 30px;
    }

    .accessory-section {
      margin-top: 25px;
      padding: 0;
      .en-light {
        font-size: 16px;
      }
    }

    .after-sales {
      width: 85%;
      .server-en {
        display: flex;
        flex-direction: column;
        align-items: center;
        .box {
          margin-top: 25px;
          width: 100%;
          height: 200px;
          padding: 10%;
          .word {
            font-size: 16px !important;
            height: 18px !important;
          }
          .part {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
