<template>
  <div class="solution" @click="solutionClick">
    <div class="allPicDiv">
      <img class="allPicImage" :src="familyImage" alt="" />
    </div>
    <div class="tedianDiv" v-for="(item, index) in introduceList" :key="index">
      <div
        class="introduceItem1"
        v-if="item.textDirection == 'right' && !$root.isMobile"
      >
        <div class="introduceItem1Left">
          <el-image
            :fit="$root.isMobile ? 'contain' : 'cover'"
            :src="item.introduceBg"
          ></el-image>
        </div>

        <div class="introduceItem1Right">
          <div class="title1">{{ item.title }}</div>
          <div class="title2" v-html="item.introduce"></div>
        </div>
      </div>
      <div
        class="introduceItem2"
        v-if="item.textDirection == 'left' && !$root.isMobile"
      >
        <div class="introduceItem2Left">
          <div class="title1">{{ item.title }}</div>
          <div class="title2" v-html="item.introduce"></div>
        </div>

        <el-image
          class="introduceItem2Right"
          :fit="$root.isMobile ? 'contain' : 'cover'"
          :src="item.introduceBg"
        ></el-image>
      </div>
      <div
        class="introduceItem1 right"
        v-if="item.textDirection == 'right' && $root.isMobile"
        :style="{ 'background-image': 'url(' + item.introduceBg + ')' }"
      >
        <div class="introduceItem1Right">
          <div class="title1">{{ item.title }}</div>
          <div class="title2" v-html="item.introduce"></div>
        </div>
      </div>
      <div
        class="introduceItem2 left"
        :style="{ 'background-image': 'url(' + item.introduceBg + ')' }"
        v-if="item.textDirection == 'left' && $root.isMobile"
      >
        <div class="introduceItem2Left">
          <div class="title1">{{ item.title }}</div>
          <div class="title2" v-html="item.introduce"></div>
        </div>
      </div>
    </div>
    <div class="brochureDiv">
      <div class="brochureRightDiv">
        <div class="brochureTitle">
          {{ language == "cn" ? "产品宣传册" : "Brochure" }}
        </div>
        <div class="brochureTitle2" v-if="language == 'cn'">
          了解产品细节内容、详细技术说明、临床案例
        </div>
        <div class="brochureTitle2" v-if="language != 'cn'">
          Explore detailed product information,
        </div>
        <div class="brochureTitle2" v-if="language != 'cn'">
          technical specifications, and clinical case studies
        </div>
        <el-button class="brochureBtn" @click="brochureBtnAction">{{
          language == "cn" ? "下载" : "Download"
        }}</el-button>
      </div>
    </div>
    <div class="serviceDiv">
      <div class="title1">
        {{
          language == "cn"
            ? "用服务解决客户需求"
            : "Addressing Customer Needs Through Services"
        }}
      </div>
      <div class="title2">
        {{
          language == "cn"
            ? "真诚沟通 热情 耐心 敬业 365全天候人工服务"
            : "Communication, Enthusiastic, Patient, Professional; 365 All-Day Human Service"
        }}
      </div>
      <el-button class="serviceButton" @click="serviceButtonAction">{{
        language == "cn" ? "了解更多" : "Explore More"
      }}</el-button>
    </div>

    <systemBottom :language="language" class="itemBottom" />
    <dialogPop :language="language" ref="dialogPop" />
  </div>
</template>

<script>
import { getSolutionGroupData } from "@/api/serviceApi";
import systemBottom from "../components/systemBottom.vue";
import dialogPop from "./dialogPop.vue";
import $bus from "../components/eventBus";

export default {
  name: "solution",
  components: {
    systemBottom,
    dialogPop,
  },
  data() {
    return {
      language: "cn",
      videoURL: "",
      topTitle: "",
      topText: "",
      downloadURL: "",
      familyImage: "",
      carouselActiveIndex: 0,
      productsList: [],
      index: 0,
      position: 0,
      leftAllow: false,
      rightAllow: true,
      introduceList: [],
    };
  },
  created() {
    const pageId = sessionStorage.getItem("pageId");
    if (pageId) {
      const sgid = this.parseSolutionId(pageId);
      if (sgid) this.getData(sgid);
    }
    var url = this.$route.params;
    if (url) {
      this.language = url.language;
    }
    $bus.$on("pageId", (pageId) => {
      const sgid = this.parseSolutionId(pageId);
      if (sgid) this.getData(sgid);
    });
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      const pageId = sessionStorage.getItem("pageId");
      const sgid = this.parseSolutionId(pageId);
      if (sgid) this.getData(sgid);
    },
    parseSolutionId(pageId) {
      if (!pageId || typeof pageId !== "string") return null;
      const id = pageId.includes("-") ? pageId.split("-").pop() : pageId;
      const sgid = Number(id);
      return Number.isNaN(sgid) ? null : sgid;
    },
    solutionClick() {
      $bus.$emit("menuRecover", "1");
    },
    getData(sgid) {
      const numericId = Number(sgid);
      if (Number.isNaN(numericId)) return;

      getSolutionGroupData({
        sgid: numericId,
        client: this.$root.isMobile ? "phone" : "web",
      }).then((res) => {
        if (res.status == 200) {
          if (res.data && res.data.indexData && res.data.indexData.banner) {
            this.videoURL = res.data.indexData.banner;
          }
          if (res.data && res.data.indexData && res.data.indexData.groupName) {
            this.topTitle = res.data.indexData.bannerTitle;
          }
          if (
            res.data &&
            res.data.indexData &&
            res.data.indexData.bannerCopywriting
          ) {
            this.topText = res.data.indexData.bannerCopywriting;
          }
          if (res.data && res.data.indexData && res.data.indexData.download) {
            this.downloadURL = res.data.indexData.download;
          }
          if (
            res.data &&
            res.data.indexData &&
            res.data.indexData.familyImage
          ) {
            this.familyImage = res.data.indexData.familyImage;
          }
          if (res.data && res.data.introduces) {
            this.introduceList = res.data.introduces;
          }
          if (res.data && res.data.products) {
            this.productsList = res.data.products;
          }
        } else {
        }
      });
    },
    carouselChange(active, val) {
      this.carouselActiveIndex = active;
    },

    brochureBtnAction() {
      //填写资料，邮件发送
      this.$refs.dialogPop.openDialog();
    },
    serviceButtonAction() {
      sessionStorage.setItem("pageId", "services");
      this.$router.push({ path: `/${this.language}/services` });
    },
  },
  beforeDestroy() {
    $bus.$off("pageId");
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped lang="less">
.solution {
  width: 100%;

  .allPicDiv {
    background: #001b33;

    .allPicImage {
      width: 100%;
    }
  }
  .productsDiv {
    width: 100%;
    height: 44.27vw;
    background: linear-gradient(180deg, #fafafa 0%, #ebebeb 89%, #f4f4f4 100%);
  }

  .tedianDiv {
    background-color: #001b33;
    .introduceItem1 {
      width: 100%;
      height: 22vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: linear-gradient(
        93deg,
        rgba(255, 255, 255, 0.14) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      .introduceItem1Left {
        width: 50%;
        height: 22vw;
      }
      .introduceItem1Right {
        width: 50%;
        height: 22vw;
        padding-left: 12%;
        padding-right: 6%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title1 {
          margin-bottom: 1vw;
          font-size: 0.9vw;
          font-family: SourceHanSansCN-Bold;
          color: #fff;
          line-height: 1.5vw;
        }
        .title2 {
          font-size: 0.83vw;
          font-family: SourceHanSansCN-Light;
          color: #fff;
          line-height: 1.3vw;
        }
      }
    }
    .introduceItem2 {
      width: 100%;
      height: 22vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: linear-gradient(
        93deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.14) 100%
      );

      .introduceItem2Left {
        width: 50%;
        height: 22vw;
        padding-left: 21%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title1 {
          margin-bottom: 1vw;
          font-size: 0.9vw;
          font-family: SourceHanSansCN-Bold;
          color: #fff;
          line-height: 1.5vw;
        }
        .title2 {
          font-size: 0.83vw;
          font-family: SourceHanSansCN-Light;
          color: #fff;
          line-height: 1.3vw;
        }
      }
      .introduceItem2Right {
        width: 50%;
        height: 22vw;
      }
    }
  }
  .brochureDiv {
    width: 100%;
    height: 20vw;
    background: url("@{oss-base}/productInfo/xuanchuanbeijing@2x.png") no-repeat;
    background-size: cover;
    background-position: center;
    .brochureRightDiv {
      margin-left: 50%;
      height: 20vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 4%;
      .brochureTitle {
        font-size: 1.25vw;
        font-family: SourceHanSansCN-Bold;
        color: #ffffff;
        line-height: 1.87vw;
        margin-bottom: 0.5vw;
      }
      .brochureTitle2 {
        font-size: 0.9vw;
        line-height: 1.4vw;
        font-family: SourceHanSansCN-Light;
        color: #ffffff;
      }
      .brochureBtn {
        font-size: 0.9vw;
        margin-top: 1vw;
        width: 9.9vw;
        height: 2.6vw;
        background-color: #1d6eb7;
        color: #ffffff;
        border: none;
        box-shadow: none;
      }
      .brochureBtn:hover {
        transform: translate(0px, 0px);
        transition: transform 0.2s;
        background-color: rgba(0, 97, 172, 0.8);
      }
    }
  }
  .serviceDiv {
    width: 100%;
    height: 28vw;
    background: url("@{oss-base}/productInfo/img_khfw@2x.png") no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title1 {
      font-size: 2.34vw;
      font-family: SourceHanSansCN-Bold;
      color: #ffffff;
      line-height: 3.5vw;
      text-align: center;
    }
    .title2 {
      font-size: 0.9vw;
      font-family: SourceHanSansCN-Light;
      color: #ffffff;
      line-height: 1.4vw;
      text-align: center;
    }
    .serviceButton {
      font-size: 0.9vw;
      margin-top: 1vw;
      width: 9.9vw;
      height: 2.6vw;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 0.2vw;
      color: #ffffff;
      border: none;
      margin-left: auto;
      margin-right: auto;
      box-shadow: none;
      border: none;
    }
    .serviceButton:hover {
      background-color: rgba(255, 255, 255, 0.06);
      transform: translate(0px, 0px);
      transition: transform 0.2s;
    }
  }
  .itemBottom {
    background: #001b33 no-repeat right top;
  }
}
@media only screen and (max-width: 833px) {
  .solution {
    .topImageDiv {
      .topTitleDiv {
        font-size: 20px;
        line-height: 30px;
        padding-top: 56px;
      }
      .topTextDiv {
        font-size: 12px;
        line-height: 18px;
        margin: 16px 20px 0;
      }
    }
    .allPicDiv {
      padding: 0;
    }
    .tedianDiv {
      height: 200px;
      .introduceItem2,
      .introduceItem1 {
        flex-direction: column;
        background: #001b33;
        background-size: cover; /* 覆盖整个容器，保持比例裁剪 */
        background-position: center; /* 背景图居中 */
        background-repeat: no-repeat; /* 禁止重复 */
        width: 100%; /* 宽度100% */
        height: 100%;
        .introduceItem2Left,
        .introduceItem2Right,
        .introduceItem1Right,
        .introduceItem1Left {
          width: 100%;
          height: 100%;
        }

        .introduceItem2Left {
          background: linear-gradient(
            93deg,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        .introduceItem1Right {
          background: linear-gradient(
            93deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.14) 100%
          );
        }
        .introduceItem2Left {
          padding-left: 60%;
          padding-top: 20px;
          padding-bottom: 40px;
          .title1 {
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 8px;
          }
          .title2 {
            font-size: 10px;
            line-height: 15px;
          }
        }
        .introduceItem1Right {
          padding-top: 20px;
          padding-bottom: 40px;
          padding-right: 60%;

          .title1 {
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 8px;
          }
          .title2 {
            font-size: 10px;
            line-height: 15px;
          }
        }
      }
      .introduceItem2 {
        flex-direction: column-reverse;
      }
    }
    .brochureDiv {
      height: auto;
      background: url("@{oss-base}/productInfo/mk_cpxc@2x.png");
      background-size: contain;
      padding: 35px 0;
      .brochureRightDiv {
        height: auto;
        margin-left: 36%;
        padding-left: 0;
        .brochureTitle {
          font-size: 16px;
          line-height: 24px;
        }
        .brochureTitle2 {
          font-size: 10px;
          line-height: 15px;
        }
        .brochureBtn {
          width: 92px;
          height: 24px;
          font-size: 10px;
          padding: 7px 20px;
          margin-top: 10px;
        }
      }
    }
    .serviceDiv {
      height: 120px;
      .title1 {
        font-size: 16px;
        line-height: 24px;
      }
      .title2 {
        font-size: 10px;
        line-height: 15px;
      }
      .serviceButton {
        width: 92px;
        height: 24px;
        font-size: 10px;
        padding: 7px 20px;
        margin-top: 10px;
      }
    }
  }
}
</style>
