<template>
  <div class="MendCondition" :class="{ 'MendCondition--en': isEn }">
    <PageTopBanner
      banner-id="aboutUs"
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      :language="language"
      :title="bannerTitle"
      :nav-items="bannerNavItems"
      @nav-click="handleBannerNavClick"
    />
    <div class="supervision" id="service-supervision">
      <div class="text3" :class="{ 'en-bold': isEn }">
        {{ sectionTitles.vision }}
      </div>
    </div>
    <div v-if="isEn" class="vision-en">
      <p class="vision-en__tagline en-bold">
        Empower People to Live Healthy, Fulfilling Lives
      </p>
      <p class="vision-en__text en-light">
        Since the founding of Vishee, our vision has been to leverage innovative
        technology to empower people to live healthy, fulfilling lives
      </p>
      <p class="vision-en__text en-light">
        This warm, resolute mission has driven our endeavors for years
      </p>
      <p class="vision-en__text en-light">
        Our magnetic stimulation technology has long spearheaded industrial
        innovation, ranking among the top market sellers
      </p>
      <p class="vision-en__text en-light">
        Looking ahead, we strive for another breakthrough by expanding into
        radiofrequency and laser energy source
      </p>
      <p class="vision-en__text en-light">
        We infuse brand-new momentum through innovative technology, continuously
        advancing clinical practice
      </p>
      <p class="vision-en__text en-light">
        We firmly believe the light of technology will illuminate every
        heartfelt aspiration, leading people toward greater autonomy, dignity
        and a richer life
      </p>
    </div>
    <div v-else class="since-vishee">
      <img :src="$ossUrl('aboutUs/since-vishee.png')" alt="" srcset="" />
    </div>
    <div class="secDiv" id="founder-message">
      <div class="text3" :class="{ 'en-bold': isEn }">
        {{ sectionTitles.founderMessage }}
      </div>
    </div>
    <div v-if="isEn" class="founderMessage">
      <div>
        I am passionate about my career and driven to work with fervor, guided
        by clear, unwavering goals
      </div>
      <div>
        Faced with every challenge I maintain a healthy sense of urgency paired
        with boundless passion, pushing our business to reach new heights
      </div>
      <div>
        while constantly evolving into a better version of myself. That’s all
      </div>
      <div class="name">— Rafael Wang</div>
      <div class="founderMessage-img">
        <img :src="$ossUrl('aboutUs/编组 7@2x.png')" alt="产品线" srcset="" />
      </div>
    </div>
    <div class="message" v-else>
      <img
        v-if="$root.isMobile"
        :src="
          $ossUrl(isEn ? 'aboutUs/编组 18@3xEn.png' : 'aboutUs/编组 18@3x.png')
        "
        alt=""
        srcset=""
      />
      <img
        v-else
        :src="$ossUrl(isEn ? 'aboutUs/编组 7@2x.png' : 'aboutUs/编组 7@3x.png')"
        alt=""
        srcset=""
      />
    </div>

    <div class="secDiv" id="history">
      <div class="text3" :class="{ 'en-bold': isEn }">
        {{ sectionTitles.history }}
      </div>
    </div>
    <div class="development">
      <img
        v-if="$root.isMobile"
        :src="
          $ossUrl(isEn ? 'aboutUs/编组 17@3xEn.png' : 'aboutUs/编组 17@3x.png')
        "
        alt=""
        srcset=""
      />
      <img
        v-else
        :src="
          $ossUrl(isEn ? 'aboutUs/编组 12@2x.png' : 'aboutUs/编组 4@3x.png')
        "
        alt=""
        srcset=""
      />
    </div>
    <template v-if="!isEn">
      <div class="secDiv" id="anniversary">
        <div class="text3">{{ sectionTitles.anniversary }}</div>
      </div>
      <div class="videoDiv">
        <video
          class="videoOne"
          :poster="$ossUrl('talentDevelopment/不二.png')"
          :src="videoUrl"
          muted
          webkit-playsinline
          playsinline
          x5-video-player-type="h5-page"
          preload="none"
          controls
          :autoplay="!$root.isMobile"
          controlsList="nodownload noremoteplayback noplaybackrate"
          disablePictureInPicture
        ></video>
      </div>
    </template>
    <div class="secDiv" id="infinite-film">
      <div class="text3 text-small" :class="{ 'en-bold': isEn }">
        {{ sectionTitles.infiniteFilm }}
      </div>
      <div class="text3" :class="{ 'en-bold': isEn }">
        {{ sectionTitles.title }}
      </div>
    </div>
    <div class="videoDiv">
      <video
        :poster="$ossUrl('talentDevelopment/伟思无限.png')"
        class="videoOne"
        :src="videoUrl1"
        muted
        webkit-playsinline
        playsinline
        x5-video-player-type="h5-page"
        preload="none"
        controls
        :autoplay="!$root.isMobile"
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
      ></video>
    </div>
    <div class="secDiv" id="contact">
      <div class="text3" :class="{ 'en-bold': isEn }">
        {{ sectionTitles.contact }}
      </div>
    </div>
    <div class="thirdDiv thirdDiv--pc" v-if="!$root.isMobile && !isEn">
      <div class="contact-card">
        <div class="contact-card__title">产品销售</div>
        <div class="contact-card__line">
          国内 | 025-69670061
          <span @click="handleCopy('025-69670061')">
            <i class="el-icon-document-copy"></i>
          </span>
          &nbsp&nbsp&nbsp ChinaBusiness@vishee.com
          <span @click="handleCopy('ChinaBusiness@vishee.com')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
        <div class="contact-card__line">
          Global | GlobalBusiness@vishee.com
          <span @click="handleCopy('GlobalBusiness@vishee.com')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
      </div>
      <div class="contact-card">
        <div class="contact-card__title">用户服务</div>
        <div class="contact-card__line">
          国内 | 400 696 4936
          <span @click="handleCopy('400 696 4936')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
        <div class="contact-card__line">
          Global | GlobalService@vishee.com
          <span @click="handleCopy('GlobalService@vishee.com')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
      </div>
      <div class="contact-card">
        <div class="contact-card__title">投资者关系</div>
        <div class="contact-card__line">
          025-69670036
          <span @click="handleCopy('025-69670036')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
      </div>
      <div class="contact-card">
        <div class="contact-card__title">投诉</div>
        <div class="contact-card__line">
          国内 | 025-69670019
          <span @click="handleCopy('025-69670019')">
            <i class="el-icon-document-copy"></i>
          </span>
          &nbsp&nbsp&nbsp ChinaBusiness@vishee.com
          <span @click="handleCopy('ChinaBusiness@vishee.com')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
        <div class="contact-card__line">
          Global | GlobalBusiness@vishee.com
          <span @click="handleCopy('GlobalBusiness@vishee.com')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="thirdDiv thirdDiv--pc" v-else-if="!$root.isMobile">
      <div v-for="card in contactCards" :key="card.title" class="contact-card">
        <div class="contact-card__title">{{ card.title }}</div>
        <div
          v-for="(line, index) in card.lines"
          :key="index"
          class="contact-card__line"
        >
          <template v-if="line.label">{{ line.label }} | </template
          >{{ line.text }}
          <span @click="handleCopy(line.text)">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="thirdDiv" v-else-if="!isEn">
      <div class="leftItem">
        <div class="title">产品销售</div>
        <div class="text">
          <p>国内</p>
          <p>
            025-69670061
            <span @click="handleCopy('025-69670061')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
          <p>
            ChinaBusiness@vishee.com
            <span @click="handleCopy('ChinaBusiness@vishee.com')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
        </div>
        <br />
        <div class="text">
          <p>Global</p>
          <p>
            GlobalBusiness@vishee.com
            <span @click="handleCopy('GlobalBusiness@vishee.com')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="leftItem">
        <div class="title">用户服务</div>
        <div class="text">
          <p>国内</p>
          <p>
            400 696 4936
            <span @click="handleCopy('400 696 4936')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
          <br />
          <br />
          <p>Global</p>
          <p>
            GlobalService@vishee.com
            <span @click="handleCopy('GlobalService@vishee.com')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="leftItem">
        <div class="title">投资者关系</div>
        <div class="text">
          <p>
            025-69670036
            <span @click="handleCopy('025-69670036')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="leftItem">
        <div class="title">投诉</div>
        <div class="text">
          <p>国内</p>
          <p>
            025-69670019
            <span @click="handleCopy('025-69670019')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
          <p>
            ChinaBusiness@vishee.com
            <span @click="handleCopy('ChinaBusiness@vishee.com')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
        </div>
        <br />
        <div class="text">
          <p>Global</p>
          <p>
            GlobalBusiness@vishee.com
            <span @click="handleCopy('GlobalBusiness@vishee.com')">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="thirdDiv" v-else>
      <div v-for="card in contactCards" :key="card.title" class="leftItem">
        <div class="title">{{ card.title }}</div>
        <div
          v-for="(block, blockIndex) in card.mobileBlocks"
          :key="blockIndex"
          class="text"
        >
          <template v-if="block.label">
            <p>{{ block.label }}</p>
          </template>
          <p v-for="(line, lineIndex) in block.lines" :key="lineIndex">
            {{ line }}
            <span @click="handleCopy(line)">
              <i class="el-icon-document-copy"></i>
            </span>
          </p>
          <br v-if="blockIndex < card.mobileBlocks.length - 1" />
        </div>
      </div>
    </div>

    <systemBottom :language="language" class="itemBottom" />
    <dialogPop :language="language" ref="dialogPop" />
  </div>
</template>
<script>
import { ossUrl } from "@/constants/ossAssets";
import $bus from "../components/eventBus";
import PageTopBanner from "../components/PageTopBanner.vue";
import systemBottom from "../components/systemBottom.vue";
import dialogPop from "./dialogPop.vue";
import { optionsCN, optionsEN } from "@/constants/menuOptions";
import { getPageBannerTitle } from "@/utils/menuLabel";
import { copyToClipboard } from "../utils/util";
import {
  isTopLevelPageAnchor,
  scrollToPageAnchor,
  scrollToSectionAnchor,
} from "@/utils/pageAnchor";
import { getAboutUsBannerNav } from "@/constants/pageBannerNav";

const SECTION_TITLES = {
  cn: {
    vision: "愿景",
    founderMessage: "创始人寄语",
    history: "发展历程",
    anniversary: "20周年纪念片《不二》",
    infiniteFilm: "南园大楼启用纪念片《无限》",
    contact: "联系伟思",
  },
  en: {
    vision: "Our Vision",
    founderMessage: "Founder's Message",
    history: "Development MileStones",
    infiniteFilm: "Nanyuan Building Grand Opening Commemorative Video",
    contact: "Contact Us",
    title: "《Infinity》",
  },
};

const CONTACT_CARDS_EN = [
  {
    title: "Product Sales & Business Support",
    lines: [
      { label: "Domestic Market", text: "ChinaBusiness@vishee.com" },
      { label: "Global Market", text: "GlobalBusiness@vishee.com" },
    ],
    mobileBlocks: [
      {
        label: "Domestic Market",
        lines: ["ChinaBusiness@vishee.com"],
      },
      { label: "Global Market", lines: ["GlobalBusiness@vishee.com"] },
    ],
  },
  {
    title: "Customer Service",
    lines: [
      { label: null, text: "400 696 4936" },
      { label: null, text: "GlobalService@vishee.com" },
    ],
    mobileBlocks: [
      { label: null, lines: ["400 696 4936", "GlobalService@vishee.com"] },
    ],
  },
  {
    title: "Investment Relationship",
    lines: [
      { label: null, text: "025-69670036" },
      { label: null, text: "ir@vishee.com" },
    ],
    mobileBlocks: [{ label: null, lines: ["025-69670036", "ir@vishee.com"] }],
  },
];

export default {
  name: "aboutUs",
  components: {
    PageTopBanner,
    systemBottom,
    dialogPop,
  },
  data() {
    return {
      language: "cn",
      bgImage: ossUrl("aboutUs/bg_gywm@3x.png"),
      bgImage2: ossUrl("aboutUs/bg_picov@2x.png"),
      index: "",
      videoUrl:
        "https://vishee.oss-cn-shanghai.aliyuncs.com/official-test/common/%E4%B8%8D%E4%BA%8C.mp4",
      videoUrl1:
        "https://vishee.oss-cn-shanghai.aliyuncs.com/official/video/visheeInfinite_0.mp4",
      menuKey: "aboutUs",
    };
  },
  computed: {
    isEn() {
      return this.language === "en";
    },
    bannerTitle() {
      const options = this.language === "cn" ? optionsCN : optionsEN;
      return getPageBannerTitle(options, this.menuKey);
    },
    bannerNavItems() {
      return getAboutUsBannerNav(this.language);
    },
    sectionTitles() {
      return this.isEn ? SECTION_TITLES.en : SECTION_TITLES.cn;
    },
    contactCards() {
      return CONTACT_CARDS_EN;
    },
  },
  created() {
    this.language = this.$route.params.language;
    const pageId = sessionStorage.getItem("pageId");
    if (pageId) {
      this.index = pageId;
    }
  },
  mounted() {
    $bus.$on("languageChange", (item) => {
      this.language = item;
      this.$router.push({ path: `/${item}/aboutUs` }).catch(() => {});
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
      if (this.isEn && this.index === "anniversary") {
        this.index = "infinite-film";
      }
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
      copyToClipboard(text, this.language);
    },
  },
  beforeDestroy() {
    $bus.$off("languageChange");
    $bus.$off("pageId");
  },
};
</script>
<style lang="less" scoped>
.MendCondition {
  background: #001b33;
  width: 100%;

  .vision-en {
    width: 53%;
    margin: 0 auto 4vw;
    text-align: center;
    color: #ffffff;

    &__tagline {
      font-size: 1.6vw;
      line-height: 2.4vw;
      margin-bottom: 2.5vw;
    }

    &__text {
      font-size: 0.95vw;
      line-height: 1.4vw;
      margin: 0 0 1.2vw;
      font-family: Roboto-Medium;
      font-weight: 200;
    }
  }
  .founderMessage {
    width: 88vw;
    margin: 0 auto;
    text-align: center;
    font-size: 0.95vw;
    font-family: Roboto-Medium;
    font-weight: 200;
    div {
      line-height: 1.8vw;
      margin: 0 0 1.2vw;
    }
    .name {
      width: 30vw;
      margin: 80px auto 30px;
      text-align: right;
    }
    .founderMessage-img {
      width: 60vw;
      margin: 140px auto 0;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
  .message {
    width: 100%;
    padding: 0 14vw;

    img {
      width: 100%;
      background-size: contain;
    }
  }
  .since-vishee {
    width: 100%;
    padding: 0 35vw;

    img {
      width: 100%;
      background-size: contain;
    }
  }
  .development {
    margin: 0 auto;
    width: 70%;
    img {
      width: 100%;
      background-size: contain;
    }
  }
  .videoDiv {
    text-align: center;
    .videoOne {
      width: 62.5vw;
      object-fit: cover;
    }
  }
  .thirdDiv {
    width: 35%;
    margin: 30px auto 30px;
    border-radius: 20px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &--pc {
      flex-direction: column;
      gap: 1.2vw;
      width: 70%;

      .contact-card {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 1vw;
        padding: 2.2vw 2vw;
        text-align: center;
        box-sizing: border-box;
        margin: 1vw auto 1vw;

        &__title {
          font-size: 1.1vw;
          font-family: SourceHanSansCN-Bold;
          color: #ffffff;
          line-height: 1.6vw;
          margin-bottom: 1.2vw;
        }

        &__line {
          font-size: 0.85vw;
          font-family: SourceHanSansCN-Light;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.8vw;

          & + & {
            margin-top: 0.4vw;
          }

          span {
            cursor: pointer;
            margin-left: 0.3vw;

            i {
              font-size: 0.85vw;
            }
          }
        }
      }
    }

    .leftItem {
      width: 18vw;
      height: 20vw;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1vw;
      padding: 2vw;

      .title {
        margin-top: 1vw;
        font-size: 1vw;
        font-family: SourceHanSansCN-Bold;
        color: #ffffff;
        line-height: 2.2vw;
        text-align: center;
        margin-bottom: 2vw;
      }

      .text {
        font-size: 0.8vw;
        font-family: SourceHanSansCN-Light;
        color: #ffffff;
        line-height: 1vw;
        opacity: 0.8;
        p {
          margin-bottom: 0.3vw;
        }
      }
    }
  }

  &--en {
    .thirdDiv--pc {
      .contact-card {
        &__title {
          font-family: Roboto-Bold;
        }

        &__line {
          font-family: Roboto-Light;
        }
      }
    }

    .thirdDiv .leftItem {
      height: auto;
      min-height: 200px;

      .title {
        font-family: Roboto-Bold;
      }

      .text {
        font-family: Roboto-Light;
      }
    }
  }
}
@media only screen and (max-width: 833px) {
  .MendCondition {
    .vision-en {
      width: calc(100% - 40px);
      padding: 0 20px 30px;

      &__tagline {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
      }

      &__text {
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 14px;
      }
    }
    .founderMessage {
      width: 90vw;
      margin: 0 auto;
      font-size: 12px;

      div {
        line-height: 20px;
        margin-bottom: 14px;
      }
      .name {
        width: 70vw;
        margin: 30px auto 30px;
      }
      .founderMessage-img {
        width: 90vw;
      }
    }
    .message {
      width: 100%;
      padding: 25px 15px;

      img {
        width: 100%;
        background-size: contain;
      }
    }
    .videoDiv {
      .videoOne {
        width: 100%;
      }
    }
    .development {
      width: 100%;
      padding: 50px 15px;
      img {
        width: 100%;
        background-size: contain;
      }
    }
    .since-vishee {
      width: 100%;
      padding: 30px 75px 25px;
    }
    .environmentDiv {
      padding: 5px 6vw 0;
      margin-top: 0;
      width: 100%;

      .environment {
        flex-direction: column;
        height: auto;

        .rightImage {
          width: 100%;
          height: auto;
        }
        .leftTextDiv {
          width: 100%;
          height: auto;
          padding: 25px 30px;
          border-radius: 10px;
          margin-bottom: 20px;

          .title {
            font-size: 14px;
            line-height: 22px;
          }

          .text {
            font-size: 10px;
            line-height: 16px;
          }
        }
      }
    }
    .thirdDiv {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      background: #001b33;

      .leftItem {
        background: rgba(255, 255, 255, 0.1);
        width: 100%;
        height: 200px;
        border-radius: 20px;
        margin: 0 0 25px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 14px;
          line-height: 22px;
          text-align: left;
        }

        .text {
          font-size: 10px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
