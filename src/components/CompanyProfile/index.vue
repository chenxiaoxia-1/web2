<template>
  <div class="investorRelations">
    <div class="supervision">
      <div class="text3">公司介绍</div>
    </div>
    <div class="htmlDiv">
      南京伟思医疗科技股份有限公司是技术创新驱动型医疗器械企业，获评国家高新技术企业、科创板上市公司（688580）、国家级专精特新“小巨人”企业。公司秉持“成就健康幸福人生”的使命，聚焦抑郁症、盆底功能障碍、脑卒中、医美需求及泌尿系统结石等人群的健康需求。
      战略布局上，公司以康复业务为基石，深耕精神康复、盆底康复、神经康复三大细分领域；同时积极培育医疗美容、泌尿及国际业务，构建“康复+新兴”双轮驱动的业务体系。
      技术积淀上，历经20余年研发，公司已形成磁刺激、电刺激及智能康复with
      BCI、能量源三大技术平台。旗下拥有经颅磁刺激仪 MagNeuro、盆底磁刺激仪
      MagBelle、塑形磁刺激仪 MagGraver、物理因子平台 VisheeNEO、皮秒激光治疗仪
      PicoV、高频电灼仪
      RFIntima、强脉冲光Vlumina、钬激光VCurestar、团体生物反馈仪
      Freemind、智能康复训练系统
      Xlocom等核心产品品牌，以技术创新驱动产品迭代升级，全面覆盖临床诊疗场景。
    </div>

    <div class="videoDiv">
      <video
        :poster="$ossUrl('talentDevelopment/公司介绍.png')"
        :src="videoUrl"
        muted
        controls
        preload="none"
        webkit-playsinline
        playsinline
        x5-video-player-type="h5-page"
        :autoplay="!$root.isMobile"
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
      ></video>
    </div>
    <div class="secDiv">
      <div class="text3">常见问题</div>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="Q1：伟思医疗的战略定位和主要业务？" name="1">
        <div class="collapse-html">
          南京伟思医疗科技股份有限公司，是技术创新驱动型医疗器械企业。在战略布局上，公司立足康复业务这一基石，在精神康复、盆底康复、神经康复各细分业务，稳健持续发展；同时大力开拓医疗美容、泌尿及国际业务等新兴业务，构建起康复业务与新兴业务双轮驱动的业务体系。
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="Q2：公司主要有哪些业务板块，针对哪些客户？"
        name="2"
      >
        <div>
          <img :src="$ossUrl('touzizheguanxi/faq2.png')" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="Q3：公司康复业务的发展情况？" name="3">
        <div class="business-title">
          三大业务板块协同互补，共同构成坚实的业务基本盘，推动公司在康复领域持续领跑
        </div>
        <div
          class="business"
          v-for="item in rehabBusinessList"
          :key="item.title"
        >
          <div class="item">
            <div class="item-1">
              <div class="title">{{ item.title }}</div>
              <div class="startYear">{{ item.startYear }}</div>
            </div>
            <div class="item-2">
              <div class="products">产品：{{ item.products }}</div>
              <div>优势：{{ item.advantage }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Q4：公司新兴业务的发展情况？" name="4">
        <div class="business-title">
          通过内生研发与外延并购，构建了“医美+临床外科+全球化”的新兴业务增长引擎
        </div>
        <div
          class="business"
          v-for="item in otherBusinessList"
          :key="item.title"
        >
          <div class="item">
            <div class="item-1">
              <div class="title">{{ item.title }}</div>
              <div class="startYear">{{ item.startYear }}</div>
            </div>
            <div class="item-2">
              <div class="products">产品：{{ item.products }}</div>
              <div>优势：{{ item.advantage }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Q5：公司有哪些技术和核心产品？" name="5">
        <div class="product-swiper-wrap">
          <!-- 轮播标题 -->
          <div class="swiper-top-title">{{ swiperTitle }}</div>
          <!-- 轮播容器 -->
          <div class="swiper-box">
            <div class="swiper-btn prev" @click="swiperPrev">
              <img
                :src="$ossUrl('productInfo/icon_fanye备份@2x.png')"
                alt="右箭头"
              />
            </div>
            <div class="swiper-content">
              <img
                v-for="(img, idx) in swiperImgList"
                :key="idx"
                :src="img.src"
                class="swiper-img"
                :class="{ active: currentSwiperIdx === idx }"
              />
            </div>
            <div class="swiper-btn next" @click="swiperNext">
              <img
                :src="$ossUrl('productInfo/icon_fanye@2x.png')"
                alt="左箭头"
              />
            </div>
          </div>
          <!-- 底部圆点指示器 -->
          <div class="swiper-dots">
            <span
              v-for="(dot, idx) in swiperImgList"
              :key="idx"
              class="dot"
              :class="{ active: currentSwiperIdx === idx }"
              @click="currentSwiperIdx = idx"
            ></span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="Q6：公司有哪些磁刺激产品，技术有哪些优势？"
        name="6"
      >
        <div class="techAdvantage">
          <div
            class="advantageData"
            v-for="item in techAdvantageData"
            :key="item.title"
          >
            <div class="title">| {{ item.title }} |</div>
            <div v-for="ite in item.items" :key="ite" class="item">
              • {{ ite }}
            </div>
            <div class="split-line"></div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="Q7：公司有哪些能量源产品，技术有哪些优势？"
        name="7"
      >
        <div class="laserRfTechData">
          <div class="title">多元技术布局，高端进口替代</div>
          <div v-for="item in laserRfTechData">
            <div class="techDate">
              <span>{{ item.name }}{{ item?.status ? item.status : "" }}</span
              >{{ item.tech }}
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="Q8：公司的有哪些电生理&智能康复（BCI）产品，技术有哪些优势？"
        name="8"
      >
        <div class="techAdvantage">
          <div
            class="advantageData"
            v-for="item in rehabProductBciData"
            :key="item.title"
          >
            <div class="title">| {{ item.title }} |</div>
            <div v-for="ite in item.items" :key="ite" class="item">
              • {{ ite }}
            </div>
          </div>
          <div class="split-line"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="Q9：公司的上市情况？总部和办公地点在哪？有多少名员工？"
        name="9"
      >
        <div class="collapse-html">
          <p>
            伟思医疗于2020年7月21日在上海证券交易所科创板上市，股票交易代码为688580.SH
          </p>
          <p>总部“伟思无限”位于江苏省南京市雨花台区硕果路1号</p>
          <p>
            截至2025年末，公司员工合计635人，其中研发人员达137人，占总员工数的​​22%​​。
          </p>
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="Q10：公司分红回购等投资人回报情况如何？"
        name="10"
      >
        <div class="section-body">
          <el-table
            :data="tableData"
            style="width: 100%"
            :span-method="objectSpanMethod"
            :cell-style="cellStyle"
            class="data-table section-body"
          >
            <el-table-column
              label="上市后分红情况（单位：亿元）"
              align="center"
            >
              <el-table-column
                prop="year"
                label="会计年度"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="parentNetProfit"
                label="归母净利润"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="cashDividend"
                label="现金分红总额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="payoutRatio"
                label="现金股利支付率"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="buyback"
                label="现金回购"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="totalPayoutRatio"
                label="综合现金分红支付率（派现+回购）"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="totalPayoutSinceIPO"
                label="上市后累计派现与回购总额"
                align="center"
              ></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="secDiv">
      <div class="text3">投资者联系方式</div>
    </div>
    <div class="InvestorContactInformation">
      <div>
        投资者专线：+86-025-69670036
        <span @click="handleCopy('+86-025-69670036')">
          <i class="el-icon-document-copy"></i>
        </span>
      </div>
      <div>
        投资者邮箱：ir@vishee.com
        <span @click="handleCopy('ir@vishee.com')">
          <i class="el-icon-document-copy"></i>
        </span>
      </div>
      <div>投资者现场调研地址：江苏省南京市雨花台区硕果路1号</div>
      <div>
        投资者互动平台：https://sns.sseinfo.com/company.do?uid=173881
        <span
          @click="handleCopy('https://sns.sseinfo.com/company.do?uid=173881')"
        >
          <i class="el-icon-document-copy"></i>
        </span>
      </div>
      <div class="tip">
        重要提示：伟思官方网站投资者关系频道，为公司投资者关系相关信息及动态的官方权威发布渠道。公司另每年统筹组织
        4
        场线下投资者交流活动，旨在搭建高效沟通桥梁、保障投资者知情权与参与权，诚邀广大投资者积极报名参与。相关活动的具体时间、参与方式及报名入口，将通过“<span
          class="anchor-link"
          @click="scrollToAnchor('investment-info')"
          >投关资讯</span
        >”下“<span
          class="anchor-link"
          @click="scrollToAnchor('investor-open-day')"
          >投资者开放日</span
        >” 板块及时发布，敬请广大投资者留意查阅。
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import { copyToClipboard } from "../../utils/util";
import { scrollToSectionAnchor } from "../../utils/pageAnchor";
import $bus from "../eventBus";

export default {
  data() {
    return {
      videoUrl:
        "https://vishee.oss-cn-shanghai.aliyuncs.com/official-test/common/%E4%BC%9F%E6%80%9D%E4%BB%8B%E7%BB%8D2025%20F.mp4",
      videoUrl2:
        "https://vishee.oss-cn-shanghai.aliyuncs.com/official-test/common/%E6%8A%95%E8%B5%84%E8%80%85%E5%85%B3%E7%B3%BB.mp4",
      activeNames: ["1"],
      tableData: [
        {
          year: "2021",
          parentNetProfit: 1.78,
          cashDividend: 0.8891,
          payoutRatio: "50%",
          buyback: "——",
          totalPayoutRatio: "50%",
          totalPayoutSinceIPO: "5.2941",
        },
        {
          year: "2022",
          parentNetProfit: 0.9382,
          cashDividend: 0.469,
          payoutRatio: "50%",
          buyback: 0.1485,
          totalPayoutRatio: "65.83%",
        },
        {
          year: "2023",
          parentNetProfit: 1.36,
          cashDividend: 1.0217,
          payoutRatio: "75%",
          buyback: 0.1156,
          totalPayoutRatio: "83.49%",
        },
        {
          year: "2024",
          parentNetProfit: 1.02,
          cashDividend: 0.7657,
          payoutRatio: "75%",
          buyback: 0.1362,
          totalPayoutRatio: "88.45%",
        },
        {
          year: "2025",
          parentNetProfit: "1.38",
          cashDividend: "1.03",
          payoutRatio: "75%",
          buyback: "——",
          totalPayoutRatio: "75%",
        },
        {
          year: "合计",
          parentNetProfit: 7.9182,
          cashDividend: 4.8938,
          payoutRatio: "61.8%",
          buyback: 0.4003,
          totalPayoutRatio: "66.86%",
          totalPayoutSinceIPO: "",
        },
      ],
      rehabBusinessList: [
        {
          title: "精神康复",
          startYear: "始于2001年",
          products: "经颅磁刺激仪、团体生物反馈仪、MRI机器人导航经颅磁刺激",
          advantage:
            "各产品市占率稳居市场前列，MRI机器人导航经颅磁刺激仪引领高端需求",
        },
        {
          title: "盆底康复",
          startYear: "始于2013年",
          products:
            "经颅磁刺激仪、盆底电刺激仪、塑形磁刺激仪、高频电灼仪（盆底射频机器人）、皮秒激光治疗仪、强脉冲光治疗仪",
          advantage: "磁电射频市占稳居市场前列，塑形磁引领形体需求",
        },
        {
          title: "神经康复",
          startYear: "始于2007年",
          products:
            "康复电（物理因子平台）、智能运康、经颅磁刺激仪、MRI机器人导航经颅磁刺激、盆底磁刺激仪",
          advantage: "磁刺激产品市占率稳居市场前列，物理因子平台全新上市",
        },
      ],
      otherBusinessList: [
        {
          title: "医疗美容",
          startYear: "始于2023年",
          products: "公司拓展至刚需治疗业务",
          advantage:
            "唯一医疗级塑形器械 -塑形磁(2023)、领先的私密产品线 -私密(2024)、皮秒(2025)、强脉冲光(2026)",
        },
        {
          title: "泌尿外科",
          startYear: "始于2023年",
          products: "公司通过并购进入临床外科业务",
          advantage:
            "高功率钬激光即将上市(2026)、男性盆底功能疾病物理康复、一次性光纤(2025)",
        },
        {
          title: "国际业务",
          startYear: "始于2025年",
          products: "公司逐步完善准入，打开长期发展空间",
          advantage:
            "磁刺激技术全球领先，磁、射频、激光产品均为全球主流刚需产品",
        },
      ],
      currentSwiperIdx: 0, // 默认磁刺激第二张
      swiperImgList: [
        {
          title: "磁刺激",
          src: this.$ossUrl("touzizheguanxi/faq5-1.png"),
        },
        {
          title: "电刺激和智能康复with BCI",
          src: this.$ossUrl("touzizheguanxi/faq5-2.png"),
        },
        {
          title: "能量源",
          src: this.$ossUrl("touzizheguanxi/faq5-3.png"),
        },
      ],
      techAdvantageData: [
        {
          title: "全球最全产品布局",
          items: ["常规TMS", "精准TMS", "深部TMS", "盆底磁", "塑形磁"],
        },
        {
          title: "技术全球领先",
          items: [
            "MRI导航机器人技术",
            "MEP自动测量技术",
            "高功率电源技术",
            "极致散热技术 7产品线全球最全技术全球领先",
            "全球最多线圈技术，多达30种线圈",
            "生物反馈技术用于盆底磁",
            "一键双靶点技术用于盆底磁",
            "RMM技术,用于塑形磁",
            "柔性线圈技术",
          ],
        },
      ],
      laserRfTechData: [
        {
          name: "射频：",
          tech: "机器人技术、极致温控",
        },
        {
          name: "皮秒激光：",
          tech: "双波长、超短脉宽调制技术、250ps极致速度",
        },
        {
          name: "强脉冲光：",
          tech: "Vmaster滤光片智能切换技术&Vmotion变频滑动技术&Vmotion变频滑动技术&Vfree智能减重跟随技术",
        },
        {
          name: "钬激光",
          status: "(coming soon)：",
          tech: "高功率技术平台、原位碎石技术",
        },
      ],
      rehabProductBciData: [
        {
          title: "多元产品组合",
          items: [
            "康复电刺激系列",
            "生物反馈系列",
            "主被动系列",
            "盆底电刺激系列",
            "神经调控系列",
            "认知康复系列",
          ],
        },
        {
          title: "BCI技术和业务布局",
          items: ["基于脑电评估的闭环神经调控技术", "多模态BCI康复训练技术"],
        },
      ],
    };
  },
  computed: {
    swiperTitle() {
      return this.swiperImgList[this.currentSwiperIdx].title;
    },
  },
  methods: {
    swiperPrev() {
      if (this.currentSwiperIdx <= 0) {
        this.currentSwiperIdx = this.swiperImgList.length - 1;
      } else {
        this.currentSwiperIdx--;
      }
    },
    swiperNext() {
      if (this.currentSwiperIdx >= this.swiperImgList.length - 1) {
        this.currentSwiperIdx = 0;
      } else {
        this.currentSwiperIdx++;
      }
    },
    objectSpanMethod({ row, column, rowIndex }) {
      if (column.property === "totalPayoutSinceIPO") {
        if (rowIndex < 6) {
          return {
            rowspan: 6, // 跨越6行
            colspan: 1,
          };
        }
      }
    },
    cellStyle({ row, column }) {
      if (row.year === "合计") {
        return {
          fontWeight: "bold",
        };
      }
    },

    handleCopy(text) {
      copyToClipboard(text, "cn");
    },
    scrollToAnchor(anchorId) {
      sessionStorage.setItem("pageId", anchorId);
      $bus.$emit("pageId", anchorId);
      this.$nextTick(() => {
        requestAnimationFrame(() => scrollToSectionAnchor(anchorId));
      });
    },
  },
};
</script>

<style scoped lang="less">
.investorRelations {
  width: 100%;
  font-size: 0.937vw;

  //公司介绍
  .htmlDiv {
    width: 100%;
    margin: 0 auto 1.5vw;
    height: auto;
    font-family: SourceHanSansCN-Light;
    opacity: 0.9;
  }

  .videoDiv {
    text-align: center;
    margin-top: 1em;

    video {
      width: 100%;
      object-fit: cover;
    }
  }

  /deep/.el-collapse {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border: none;
    margin-top: 1rem;

    .el-collapse-item {
      margin-bottom: 20px;
      font-family: SourceHanSansCN-Normal;

      .business-title {
        margin: 0 0 15px;
        padding: 0 15px;
      }
      .collapse-html {
        padding: 0 2vw;
      }
      img {
        width: 100%;
        object-fit: contain;
      }
      .business-title {
        width: 100%;
        text-align: center;
        margin: 2vh 0;
      }
      .business {
        width: 100%;
        .item {
          display: flex;
          width: 100%;
          text-align: left;
          height: 6vw;
          background: rgba(255, 255, 255, 0.1);
          padding: 2vw;
          margin-bottom: 2vw;
          border-radius: 10px;
          align-items: center;
          .item-1 {
            flex: 1;
          }
          .item-2 {
            flex: 6;
          }
          .title,
          .products {
            font-family: SourceHanSansCN-Bold;
          }
        }
      }
      .product-swiper-wrap {
        width: 100%;
        .swiper-top-title {
          text-align: center;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .swiper-box {
          position: relative;
          width: 100%;
          border-radius: 10px;
          overflow: visible !important;
          padding: 4vh 0;
          display: flex;
          align-items: center;
          .swiper-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999 !important; // 确保在最上层
            pointer-events: auto !important; // 确保可点击
            border-radius: 50%;

            img {
              width: 30px;
              height: 30px;
              pointer-events: none; // 重要：让点击穿透
            }
            &.prev {
              left: 90px;
            }
            &.next {
              right: 90px;
            }
          }
          .swiper-content {
            width: 100%;
            height: 60vh;
            position: relative;
            z-index: 1;

            .swiper-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              transition: opacity 0.3s ease;
              pointer-events: none; // 防止图片阻止点击

              &.active {
                opacity: 1;
              }
            }
          }
        }
        .swiper-dots {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 20px;
          .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            &.active {
              background: #fff;
            }
          }
        }
      }
      .techAdvantage {
        display: flex;
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        padding: 4vh 0;

        border-radius: 10px;
        position: relative;
        gap: 10px;
        justify-content: space-around;
        // 中间分割竖线样式
        .split-line {
          position: absolute;
          left: 50%;
          top: 50px;
          bottom: 50px;
          transform: translateX(-50%);
          width: 1px;
          box-shadow: -2px 0px 0px 0px #000000;
          border: 1px solid #2d5981;
        }
        .advantageData {
          flex: 1;
          padding-left: 4vw;
          .title {
            font-family: SourceHanSansCN-Bold;
            padding-bottom: 2vh;
          }
          .item {
            padding-top: 1.2vh;
          }
        }
      }
      .laserRfTechData {
        width: 100%;
        padding: 3vw;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        .title {
          text-align: center;
          margin-bottom: 3vh;
        }
        .techDate {
          margin-bottom: 3vh;
          span {
            font-family: SourceHanSansCN-Bold;
          }
        }
      }
    }

    .el-collapse-item__wrap {
      border-bottom: none;
      background: #001b33;
    }

    .el-collapse-item__header {
      border-radius: 8px;
      border-bottom: none;
      height: 56px;
      font-size: 0.937vw;
      padding: 0 20px;
      cursor: default;
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      font-family: SourceHanSansCN-Normal;
    }

    .el-collapse-item__content {
      margin: 60px 0 10px;
      font-size: 0.937vw;
      font-family: SourceHanSansCN-Light;
      color: #ffffff;
      opacity: 0.8;
    }
  }
  .InvestorContactInformation {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    line-height: 2.25vw;
    margin-bottom: 7vw;
    margin-top: 1rem;
    padding-left: 20px;
    background: rgba(255, 255, 255, 0.1);
    padding: 3vw;
    border-radius: 1vw;
    div {
      span {
        cursor: pointer;

        &:hover {
          color: #005bac;
        }
      }
    }

    .tip {
      font-size: 12px;
      line-height: 16px;
      opacity: 0.8;

      .anchor-link {
        color: #54b0ff;
        cursor: pointer;
        text-decoration: underline;

        &:hover {
          opacity: 0.85;
        }
      }
    }
  }
}

@media only screen and (max-width: 833px) {
  .investorRelations {
    .htmlDiv {
      font-size: 10px;
      line-height: 15px;
      width: 100%;
      margin-top: 40px;
      padding: 0 20px;
    }

    .videoDiv {
      margin-top: 40px;

      video {
        width: 100%;
      }
    }

    /deep/.el-collapse {
      width: 100%;
      padding: 0 20px 20px;
      border: none;

      .el-collapse-item__wrap {
        border-bottom: none;
        .cell {
          font-size: 2vw;
        }
      }

      .el-collapse-item__header {
        border-radius: 4px;
        height: auto;
        margin-bottom: 8px;
        font-size: 10px;
        line-height: 15px;
        padding: 15px;
        cursor: default;
        justify-content: center;
      }

      .el-collapse-item__content {
        margin: 20px 0;
        font-size: 2.5vw;
      }
      .el-collapse-item {
        margin-bottom: 0;
        padding: 0;
        .business {
          .item {
            height: auto;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 2px;
            display: flex;
            align-items: center;
            .item-2 {
              flex: 3;
            }
            .item-1,
            .item-2 {
              font-size: 2.5vw;
            }
          }
        }
        .product-swiper-wrap {
          width: 100%;
          .swiper-top-title {
            font-family: SourceHanSansCN-Bold;
          }
          .swiper-box {
            position: relative;
            width: 100%;
            border-radius: 5px;
            padding: 5px 0;
            display: flex;
            align-items: center;
            .swiper-btn {
              width: 20px;
              height: 20px;
              img {
                width: 10px;
                height: 10px;
              }
              &.prev {
                left: 15px;
              }
              &.next {
                right: 15px;
              }
            }
            .swiper-content {
              width: 100%;
              height: 150px;
            }
          }
          .swiper-dots {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-top: 20px;
            .dot {
              width: 5px;
              height: 5px;
            }
          }
        }

        .collapse-html {
          padding: 0 15px;
        }
        .techAdvantage {
          padding: 15px 0;
          border-radius: 5px;
          // 中间分割竖线样式
          .split-line {
            top: 25px;
            bottom: 25px;
          }
          .advantageData {
            padding: 15px 25px;
            .title {
              font-family: SourceHanSansCN-Bold;
              padding-bottom: 15px;
            }
            .item {
              padding-top: 10px;
            }
          }
        }
        .laserRfTechData {
          padding: 15px 25px;
          border-radius: 5px;
          .title {
            margin: 3vh 0;
          }
        }
      }
    }

    .InvestorContactInformation {
      font-size: 12px;
      line-height: 18px;
      padding: 20px;
      .tip {
        font-size: 8px;
        line-height: 12px;
      }
    }
  }
}
</style>
