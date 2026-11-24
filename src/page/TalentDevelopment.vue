<template>
  <!-- 人才发展页面 -->
  <div class="talentDevelopment" @click="talentDevelopmentClick">
    <PageTopBanner
      banner-id="career"
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      :language="language"
      :title="bannerTitle"
      :nav-items="bannerNavItems"
      @nav-click="handleBannerNavClick"
    />
    <div class="environmentDiv" id="anniversary" v-if="language != 'cn'">
      <div class="secDiv">
        <div class="text3 en-regular">&lt;Nothing But The Best&gt;</div>
        <div class="environmenttext en-light">20th Anniversary Film</div>
      </div>
    </div>
    <div class="videoDiv" v-if="language !== 'cn'">
      <video
        :poster="$ossUrl('talentDevelopment/不二.png')"
        class="videoOne"
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
    <div class="environmentDiv" id="life" v-if="language !== 'cn'">
      <div class="secDiv">
        <div class="text3 en-regular">Life At Vishee</div>
        <div class="environmenttext en-light">
          Enjoy flexible working time and work life balance<span
            class="recruitText3"
          ></span>
        </div>
      </div>

      <div class="environmentVideoDiv">
        <video
          :poster="$ossUrl('talentDevelopment/公司介绍.png')"
          class="videoOne"
          :src="videoUrl2"
          webkit-playsinline
          playsinline="true"
          x5-video-player-type="h5-page"
          preload="none"
          muted
          :controls="$root.isMobile"
          :autoplay="!$root.isMobile"
          controlsList="nodownload noremoteplayback noplaybackrate"
          loop
          disablePictureInPicture
        ></video>
      </div>
    </div>
    <!-- 伟思生活 -->
    <div v-if="language === 'cn'" id="life">
      <div class="supervision">
        <div class="text3">伟思生活</div>
      </div>
      <div class="life" ref="lifeSection">
        <FloorPlan v-if="lifeSectionReady" />
        <div v-else class="life-placeholder" aria-hidden="true"></div>
      </div>

      <!-- 职业生涯-->
      <div class="secDiv">
        <div class="text3">职业生涯</div>
      </div>
      <div class="honor" id="honor" ref="honorSection">
        <template v-if="honorSectionReady">
          <div class="genius">
            <div class="honor-img">
              <img
                :src="$ossUrl('talentDevelopment/编组 20@3x.png')"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div class="content">
                Honor 系列：聚焦于杰出的领导力、创造力，及其带来的绩效贡献
                包含年度提名&年度人物、年度优秀两大奖项
              </div>

              <div class="content">
                Genius
                系列：聚焦于专业技能，挖掘天才工程师、生产质量服务等高水平的技术型人才
                包含创新奖、质量奖及专业职级
              </div>

              <div class="title"></div>
              <div class="content">
                五角星：代表获奖次数。累计355人次获得过年度奖项，获奖最多的同事已荣获7个奖项
              </div>
              <div class="content">
                星途璀璨，邀您共赴。让专业被看见，让优秀被发现
              </div>
            </div>
          </div>
          <div v-for="(item, index) in excellentRepresentative" :key="index">
            <div class="excellent">
              <div class="excellent-person">
                <div class="photo">
                  <img
                    :src="item.photo"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="name">{{ item.name }}</div>
              </div>
              <div class="excellent-experience">
                <div class="star">
                  <div v-for="n in item.years" :key="n" class="span">
                    <img
                      :src="$ossUrl('talentDevelopment/星形.png')"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{{ n }}</span>
                  </div>
                </div>
                <div>{{ item.experience }}</div>
                <div>{{ item.testimonial }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 中文版：职位预览列表 -->
    <div
      v-if="language === 'cn'"
      class="recruit-preview-wrap"
      ref="recruitSection"
    >
      <section id="social-recruitment" class="recruit-preview">
        <div class="secDiv">
          <div class="text3">社会招聘</div>
        </div>
        <div class="recruit-preview__list">
          <div
            v-for="(item, index) in socialJobList"
            :key="'social-' + index"
            class="recruit-preview__card"
            @click="jobClick(item)"
          >
            <div class="recruit-preview__card-title">{{ item.name }}</div>
            <div class="recruit-preview__card-meta">
              {{ formatJobMeta(item) }}
            </div>
            <div
              class="recruit-preview__card-desc"
              v-html="item.responsibility"
            ></div>
          </div>
        </div>
        <button
          type="button"
          class="recruit-preview__more"
          @click="recruitClick(0)"
        >
          了解更多职位 &gt;
        </button>
      </section>

      <section id="campus-recruitment" class="recruit-preview">
        <div class="secDiv">
          <div class="text3">校园招聘</div>
        </div>
        <div class="recruit-preview__list">
          <div
            v-for="(item, index) in campusJobList"
            :key="'campus-' + index"
            class="recruit-preview__card"
            @click="jobClick(item)"
          >
            <div class="recruit-preview__card-title">{{ item.name }}</div>
            <div class="recruit-preview__card-meta">
              {{ formatJobMeta(item) }}
            </div>
            <div
              class="recruit-preview__card-desc"
              v-html="item.responsibility"
            ></div>
          </div>
        </div>
        <button
          type="button"
          class="recruit-preview__more"
          @click="recruitClick(1)"
        >
          了解更多职位 &gt;
        </button>
      </section>
    </div>

    <!-- 英文版：保留原样式 -->
    <div v-else class="recruitDiv" ref="recruitSection">
      <div class="secDiv">
        <div class="text3 en-regular">Ultimate Working Experience</div>
      </div>
      <div
        id="social-recruitment"
        class="recruitItem"
        :style="{
          'background-image': recruitSectionReady
            ? 'url(' + recruitmentBgImage + ')'
            : 'none',
        }"
      >
        <div class="itemTitle en-bold">Recruitment for Experienced Workers</div>
        <el-button class="itemButton en-light" @click="recruitClick(0)"
          >Explore more positions</el-button
        >
      </div>
      <div
        class="recruitItem"
        id="campus-recruitment"
        :style="{
          'background-image': recruitSectionReady
            ? 'url(' + campusBgImage + ')'
            : 'none',
        }"
      >
        <div class="itemTitle en-bold">Recruitment on Campus</div>
        <el-button class="itemButton en-light" @click="recruitClick(1)"
          >Explore more positions</el-button
        >
      </div>
    </div>

    <systemBottom :language="language" class="itemBottom" />
  </div>
</template>

<script>
import $bus from "../components/eventBus";
import PageTopBanner from "../components/PageTopBanner.vue";
import systemBottom from "../components/systemBottom.vue";
import { optionsCN, optionsEN } from "@/constants/menuOptions";
import { getPageBannerTitle } from "@/utils/menuLabel";
import { observeOnce } from "@/utils/lazyObserve";
import {
  isTopLevelPageAnchor,
  scrollToPageAnchor,
  scrollToSectionAnchor,
} from "@/utils/pageAnchor";
import { getTalentDevelopmentBannerNav } from "@/constants/pageBannerNav";
import { getJobList } from "@/api/serviceApi";
import { ossUrl } from "@/constants/ossAssets";

export default {
  name: "talentDevelopment",
  components: {
    PageTopBanner,
    systemBottom,
    FloorPlan: () => import("../components/FloorPlan.vue"),
  },
  data() {
    return {
      language: "cn",
      index: "career",
      lifeSectionReady: false,
      honorSectionReady: false,
      recruitSectionReady: false,
      bgImage2: ossUrl("talentDevelopment/bg_tzzgx@3x.png"),
      bgImage: ossUrl("talentDevelopment/bg_picov@2x.png"),
      recruitmentBgImage: ossUrl("talentDevelopment/20260508-102842@2x.png"),
      campusBgImage: ossUrl("talentDevelopment/20260508-102835@2x.png"),
      socialJobList: [],
      campusJobList: [],
      videoUrl:
        "https://vishee.oss-cn-shanghai.aliyuncs.com/official-test/common/%E4%B8%8D%E4%BA%8C.mp4",
      videoUrl2:
        "https://vishee.oss-cn-shanghai.aliyuncs.com/official-test/common/%E4%BA%BA%E5%9C%A8%E4%BC%9F%E6%80%9D.mp4",
      excellentRepresentative: [
        {
          photo: ossUrl("talentDevelopment/20260511-143803@3x.png"),
          name: "高飞",
          num: "6",
          experience: "2010年入职，从毕业生到事业部高级总监",
          years: [2019, 2019, 2020, 2022, 2024, 2025],
          testimonial:
            "个人感言：伟思给了一个平台让我十年专心于“磁”，不断拓展自己的视野。从解决技术难题，到产品以及临床路线规划。我和公司有共同的目标：做一流品质的产品，成就更多人的健康幸福人生",
        },
        {
          photo: ossUrl("talentDevelopment/20260511-143803@3x(1).png"),
          name: "韩卓",
          num: "4",
          experience: "2007年入职，从行政文员到行政总监",
          years: [2018, 2021, 2023, 2025],
          testimonial:
            "个人感言：伟思是一个拥有“无限”可能的平台，机会对所有做好准备的人敞开。当你做好准备，就有机会可以接触更多的项目，与更好的团队合作，个人能力亦能不断提高",
        },
        {
          photo: ossUrl("talentDevelopment/20260511-143803备份@3x.png"),
          name: "袁小文",
          num: "2",
          experience: "2021年入职，从一线销售到省区经理（2024年）",
          years: [2023, 2025],
          testimonial:
            "个人感言：公司给予我们每个人公平的机会，和公司、团队共同成长，把自己热爱的事情做到极致",
        },
        {
          photo: ossUrl("talentDevelopment/20260511-143803备份 2@3x.png"),
          name: "朱芸",
          num: "1",
          experience: "2022年入职，从一线产品经理到市场部经理",
          years: [2024],
          testimonial:
            "个人感言：伟思对产品经理有很大的自由度和包容度，按照既定目标全力以赴。有热情，够专注，就会收获好的结果",
        },
      ],
      menuKey: "career",
    };
  },
  computed: {
    bannerTitle() {
      const options = this.language === "cn" ? optionsCN : optionsEN;
      return getPageBannerTitle(options, this.menuKey);
    },
    bannerNavItems() {
      return getTalentDevelopmentBannerNav(this.language);
    },
  },
  created() {
    let careerId = sessionStorage.getItem("pageId");
    var url = this.$route.params;
    if (url) {
      this.language = url.language;
    }
    this.index = careerId;
  },
  mounted() {
    $bus.$on("languageChange", (item) => {
      this.language = item;
      this.$router.push({ path: `/${item}/career` });
      if (item === "cn") {
        this.fetchRecruitPreviewJobs();
      }
    });
    $bus.$on("pageId", (index) => {
      this.index = index;
      this.scrollToSection();
    });

    if (this.index) {
      this.scrollToSection();
    }

    this.$nextTick(() => {
      this.setupLazySections();
    });
    if (this.language === "cn") {
      this.fetchRecruitPreviewJobs();
    }
  },
  methods: {
    setupLazySections() {
      if (this.language !== "cn") {
        this.lifeSectionReady = true;
        this.honorSectionReady = true;
      } else {
        observeOnce(this.$refs.lifeSection, () => {
          this.lifeSectionReady = true;
        });
        observeOnce(this.$refs.honorSection, () => {
          this.honorSectionReady = true;
        });
      }

      observeOnce(this.$refs.recruitSection, () => {
        this.recruitSectionReady = true;
        if (this.language === "cn") {
          this.fetchRecruitPreviewJobs();
        }
      });
    },
    fetchRecruitPreviewJobs() {
      getJobList({
        pageNum: 1,
        pageSize: 3,
        wd: "",
        jobCategoryIds: "",
        jobPlaceIds: "",
        source: "social",
      }).then((res) => {
        if (res.status == 200) {
          this.socialJobList = (res.data.list || []).slice(0, 3);
        }
      });
      getJobList({
        pageNum: 1,
        pageSize: 3,
        wd: "",
        jobCategoryIds: "",
        jobPlaceIds: "",
        source: "school",
      }).then((res) => {
        if (res.status == 200) {
          this.campusJobList = (res.data.list || []).slice(0, 3);
        }
      });
    },
    formatJobMeta(item) {
      const places = (item.jobPlaces || [])
        .map((p) => p.jobPlaceName)
        .join("、");
      return `${places}丨${item.jobCategory}丨${item.number}位`;
    },
    jobClick(item) {
      sessionStorage.setItem("pageId", item.id);
      this.$router.push({ path: `/${this.language}/jobDetails` });
    },
    scrollToSection() {
      if (!this.index) return;
      this.ensureSectionReady(this.index);
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
      this.ensureSectionReady(item.anchor);
    },
    ensureSectionReady(anchor) {
      if (!anchor) return;
      if (anchor === "life") {
        this.lifeSectionReady = true;
      }
      if (anchor === "honor") {
        this.lifeSectionReady = true;
        this.honorSectionReady = true;
      }
      if (anchor === "social-recruitment" || anchor === "campus-recruitment") {
        this.recruitSectionReady = true;
        if (this.language === "cn") {
          this.fetchRecruitPreviewJobs();
        }
      }
    },

    talentDevelopmentClick() {
      $bus.$emit("menuRecover", "1");
    },
    recruitClick(index) {
      if (index === 0) {
        this.$router.push({
          path: `/${this.language}/socialRecruitment`,
          query: { source: "social" },
        });
      }
      if (index === 1) {
        this.$router.push({
          path: `/${this.language}/campus`,
          query: { source: "school" },
        });
      }
    },
  },
  beforeDestroy() {
    $bus.$off("languageChange");
    $bus.$off("pageId");
  },
};
</script>

<style scoped lang="less">
.talentDevelopment {
  width: 100%;
  background: #001b33;
  .environmentVideoDiv,
  .videoDiv {
    text-align: center;
    .videoOne {
      width: 62.5vw;
      object-fit: cover;
    }
  }
  .environmentVideoDiv {
    margin-top: 2.6vw;
  }

  //生活因此斑斓
  .environmentDiv {
    padding-top: 5.2vw;
    .environmenttitle {
      text-align: center;
      font-size: 3.1vw;
      line-height: 4.7vw;
      .recruitText3 {
        font-weight: bold;
      }
    }
    .environmenttext {
      text-align: center;
      font-size: 1.2vw;
      line-height: 1.5vw;
    }
  }
  .life {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    text-align: center;
    margin: 2.1vw auto 10vw;
    .life-placeholder {
      width: 100%;
      height: 70vh;
      background: rgba(255, 255, 255, 0.04);
    }
  }
  .honor {
    width: 50vw;
    font-size: 3.1vw;
    margin: 2.1vw auto 2.5vw;

    .genius {
      margin-top: 2.1vw auto 0;
      .honor-img {
        text-align: left;
        display: flex;
        flex-direction: column;
        margin-bottom: 5vw;
        align-items: center;
        img {
          width: 100%;
          height: 30vw;
          object-fit: contain;
        }
        .content {
          font-family: SourceHanSansCN-Normal;
          font-size: 0.8vw;
          opacity: 0.8;
        }
      }
    }

    .excellent {
      display: flex;
      justify-content: space-around;
      border-radius: 8px;
      align-items: center;
      background: url("@{oss-base}/talentDevelopment/BG@2x.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      color: #333333;
      height: 16vw;

      .excellent-person {
        width: 10%;
        border-radius: 25%;
        display: flex;
        flex-direction: column;
        font-size: 1.2vw;
        font-family: SourceHanSansCN-Bold;
        align-items: center;
        img {
          width: 100%;
          object-fit: contain;
        }
      }
      .excellent-experience {
        width: 70%;
        text-align: left;
        display: flex;
        flex-direction: column;
        font-size: 0.8vw;
        font-family: SourceHanSansCN-Normal;

        .star {
          display: flex;
          align-items: center;
          .span {
            display: flex;
            flex-direction: column;
            font-family: D-DINExp-Bold;
            font-size: 12px;
            margin-right: 6px;
            align-items: center;
          }
          img {
            width: 30px;
            height: 30px;
          }
        }

        div {
          margin-top: 0.6vw;
        }
      }
    }
  }
  .recruit-preview-wrap {
    padding-bottom: 6.7vw;
  }

  .recruit-preview + .recruit-preview {
    margin-top: 4.2vw;
  }

  .recruit-preview {
    width: 62.5vw;
    margin: 0 auto;
    padding-top: 2.1vw;

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1.2vw;
    }

    &__card {
      padding: 1.8vw 2.2vw;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.1);
      cursor: pointer;
      text-align: left;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.16);
      }
    }

    &__card-title {
      font-size: 1.45vw;
      line-height: 2.2vw;
      font-family: SourceHanSansCN-Bold, sans-serif;
      color: #ffffff;
    }

    &__card-meta {
      margin-top: 0.5vw;
      font-size: 1vw;
      line-height: 1.5vw;
      font-family: SourceHanSansCN-Normal, sans-serif;
      color: rgba(255, 255, 255, 0.75);
    }

    &__card-desc {
      margin-top: 1.2vw;
      font-size: 0.85vw;
      line-height: 1.35vw;
      font-family: SourceHanSansCN-Light, sans-serif;
      color: rgba(255, 255, 255, 0.65);
      max-height: 2.7vw;
      overflow: hidden;

      /deep/ p {
        margin: 0;
      }
    }

    &__more {
      display: block;
      margin-top: 1.6vw;
      margin-left: auto;
      padding: 0;
      border: none;
      background: none;
      font-size: 0.95vw;
      line-height: 1.4vw;
      font-family: SourceHanSansCN-Normal, sans-serif;
      color: #54b0ff;
      cursor: pointer;

      &:hover {
        opacity: 0.85;
      }
    }
  }

  //智聚如此不同
  .recruitDiv {
    padding-top: 5.2vw;
    padding-bottom: 6.7vw;
    display: block;
    .recruitTitle1 {
      text-align: center;
      margin-top: 2.6vw;
      font-size: 3.1vw;
      line-height: 4.6vw;
      .recruitText {
        font-weight: 400;
      }
    }
    .recruitTitle2 {
      text-align: center;
      margin-top: 0.5vw;
      font-size: 1vw;
      line-height: 1.5vw;
    }
    .recruitTitle3 {
      text-align: center;
      margin-top: 0.5vw;
      font-size: 2.1vw;
      line-height: 3.1vw;
      .recruitText3 {
        font-weight: bold;
      }
    }

    .recruitItem {
      padding-top: 9vw;
      margin: 2.1vw auto 0;
      width: 62.5vw;
      height: 27.5vw;
      border-radius: 1vw;
      text-align: center;
      background-size: contain;
      background-repeat: no-repeat;

      .itemTitle {
        font-size: 2.5vw;
        line-height: 3.75vw;
      }
      .itemText {
        margin-top: 0.5vw;
        font-size: 0.9vw;
        line-height: 1.4vw;
      }
      .itemButton {
        margin-top: 1.8vw;
        width: 13vw;
        height: 3.1vw;
        border-radius: 0.2vw;
        font-size: 0.8vw;
        background-color: rgba(255, 255, 255, 0.2);
        color: #ffffff;
        box-shadow: none;
        border: none;
      }
      .itemButton:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transform: translate(0px, 0px);
        transition: transform 0.2s;
      }
    }
  }

  .itemBottom {
    background: #001b33 no-repeat right top;
  }
}
@media only screen and (max-width: 833px) {
  .talentDevelopment {
    .environmentVideoDiv,
    .videoDiv {
      .videoOne {
        width: 100%;
      }
    }

    .environmentDiv {
      padding-top: 30px;
      .environmenttitle {
        font-size: 24px;
        line-height: 36px;
      }

      .environmenttext {
        font-size: 10px;
        line-height: 15px;
      }
      .environmentVideoDiv {
        margin-top: 30px;
      }
    }
    .recruit-preview {
      width: calc(100% - 30px);
      padding-top: 20px;

      &__list {
        gap: 12px;
      }

      &__card {
        padding: 16px 18px;
        border-radius: 8px;
      }

      &__card-title {
        font-size: 16px;
        line-height: 24px;
      }

      &__card-meta {
        margin-top: 6px;
        font-size: 12px;
        line-height: 18px;
      }

      &__card-desc {
        margin-top: 12px;
        font-size: 11px;
        line-height: 17px;
        max-height: 34px;
      }

      &__more {
        margin-top: 14px;
        font-size: 12px;
        line-height: 18px;
      }
    }

    .recruitDiv {
      .recruitTitle1 {
        font-size: 24px;
        line-height: 36px;
      }
      .recruitTitle3 {
        font-size: 16px;
      }
      .recruitTitle2 {
        font-size: 10px;
        line-height: 15px;
      }

      .recruitItem {
        width: 100%;
        height: 200px;
        border-radius: 4px;
        background-size: contain;

        .itemTitle {
          width: 100%;
          font-size: 16px;
          line-height: 30px;
        }

        .itemButton {
          width: 150px;
          height: 26px;
          font-size: 8px;
          padding: 9px 0;
          margin-top: 20px;
          margin-bottom: 24px;
          border-radius: 4px;
        }
      }
    }
    .honor {
      width: 100%;
      padding: 0 15px;
      .life {
        margin: 50px 0;
        .life-placeholder {
          height: 70vh;
        }
      }
      .representative {
        margin-top: 25px;
        font-size: 10px;
      }
      .excellent {
        padding: 0;
        height: 150px;
        width: 100%;
        background: url("@{oss-base}/talentDevelopment/编组 3@3x.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        margin-top: 5px;
        .excellent-experience {
          width: 60%;
          font-size: 8px;
          .star {
            .span {
              font-size: 8px;
              margin-right: 8px;
            }
            img {
              width: 18px;
              height: 18px;
            }
          }
        }
        .excellent-person {
          width: 20%;
          .name {
            font-size: 10px;
          }
        }
      }
      .genius {
        margin-top: 25px;
        .honor-img {
          width: 100%;
          margin-bottom: 20px;
          img {
            width: 100%;
            height: 200px;
            object-fit: contain;
          }
          .title {
            text-align: left;
            font-size: 6px;
          }

          .content {
            text-align: left;
            padding: 5px 10px;
            font-size: 6px;
          }
        }
      }
    }
  }
}
</style>

<style>
.transitionBottomToTop-enter-active {
  animation: slidein 0.8s ease;
}
@keyframes slidein {
  from {
    opacity: 1;
    transform: translateY(40%);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
