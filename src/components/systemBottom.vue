<template>
  <div>
    <div
      class="systemBottom"
      @touchstart="toucoStartAction"
      @touchmove="touchMoveAction"
      @touchend="touchEndAction"
      ref="systemBottom"
    >
      <div class="systemBottomTop" v-show="!$root.isMobile">
        <div class="topItem" v-for="item in options" :key="item.value">
          <div
            class="topTitle"
            :class="[
              ['career', 'investor', 'services', 'aboutUs'].includes(item.value)
                ? 'underLine'
                : '',
              fontRegularClass,
            ]"
            @click="handleTopLevelMenu(item.value)"
          >
            {{ item.label }}
          </div>
          <div
            class="item"
            v-for="ite in item.children"
            :key="ite.value"
            @click="handleMenuNavigation(item.value, ite.value)"
            :class="fontLightClass"
          >
            {{ ite.label }}
          </div>
        </div>
      </div>
      <el-menu
        v-if="$root.isMobile"
        class="transition-box"
        :unique-opened="true"
        @select="menuSelect"
      >
        <el-submenu
          :index="item.value"
          v-for="item in options"
          :key="item.value"
        >
          <div class="menuTitle" slot="title" :class="fontBoldClass">
            {{ item.label }}
          </div>
          <div v-if="item.children">
            <el-menu-item
              v-for="item2 in item.children"
              :index="item2.value"
              style="color: #b9b9b9"
              :class="fontLightClass"
              :key="item2.value"
              >{{ item2.label }}</el-menu-item
            >
          </div>
        </el-submenu>
      </el-menu>

      <div class="systemMiddle">
        <div class="telDiv" @click="telClick" :class="fontRegularClass">
          {{ language === "cn" ? "联系方式" : "CONTACT US" }}
        </div>
        <div class="midText" :class="fontRegularClass" v-if="language === 'cn'">
          产品销售：025-69670061
          <span @click="handleCopy('025-69670061')">
            &nbsp;<i class="el-icon-document-copy"></i>
          </span>
          、用户服务： 400 696 4936
          <span @click="handleCopy('400 696 4936')">
            &nbsp;<i class="el-icon-document-copy"></i> </span
          >、投资者关系：025-69670036
          <span @click="handleCopy('025-69670036')">
            &nbsp; <i class="el-icon-document-copy"></i>
          </span>
          、投诉：025-69670019
          <span @click="handleCopy('025-69670019')">
            &nbsp; <i class="el-icon-document-copy"></i>
          </span>
        </div>
        <div class="midText" :class="fontRegularClass" v-else>
          E-mail: GlobalBusiness@vishee.com <br />
          Web: www.vishee.com
        </div>
        <div class="addressDiv" :class="fontRegularClass">
          {{ language === "cn" ? "地址" : "ADDRESS" }}
        </div>
        <div class="midText" :class="fontLightClass">
          {{
            language === "cn"
              ? "江苏省南京市雨花台区硕果路1号"
              : "No. 1, Shuoguo Road, Yuhuatai District, 210012 Nanjing, Jiangsu Province, PEOPLE'S REPUBLIC OF CHINA"
          }}
        </div>
        <div class="companyInfoDiv" :class="fontRegularClass">
          {{ language === "cn" ? "公司介绍" : "COMPANY OVERVIEW" }}
        </div>
        <div class="midText" v-if="language === 'cn'" v-html="texthtml"></div>
        <div class="midText2" v-if="language !== 'cn'" v-html="texthtml2"></div>
      </div>
      <div
        class="systemBottomBottom"
        v-if="$root.isMobile"
        style="cursor: default"
      >
        <div>
          <el-link target="_blank" type="info" style="cursor: default"
            >网站信息：互联网药品医疗器械信息服务备案凭证
          </el-link>
        </div>
        <div>
          <el-link target="_blank" type="info" style="cursor: default">
            备案编号:
          </el-link>
          <el-link
            href="https://zwpt.da.jiangsu.gov.cn/datacenter/dc/listSearch/162025362f0e405aa7333cedf84da093"
            target="_blank"
            type="info"
          >
            苏网药械信备字【2026】000072号</el-link
          >
        </div>
      </div>
      <div class="systemBottomBottom" v-else>
        <el-link target="_blank" style="cursor: default"
          >网站信息：互联网药品医疗器械信息服务备案凭证
        </el-link>
        <el-link target="_blank" type="info" style="cursor: default">
          备案编号:
        </el-link>
        <el-link
          href="https://zwpt.da.jiangsu.gov.cn/datacenter/dc/listSearch/162025362f0e405aa7333cedf84da093"
          target="_blank"
          type="info"
        >
          苏网药械信备字【2026】000072号</el-link
        >
      </div>
    </div>
    <dialogPop :language="language" ref="dialogPop" />
  </div>
</template>

<script>
import dialogPop from "../page/dialogPop.vue";
import menuNavigationMixin from "@/mixins/menuNavigation.js";
import { copyToClipboard } from "../utils/util";

export default {
  mixins: [menuNavigationMixin],
  props: {
    language: {
      type: String,
      default: "cn",
    },
  },
  components: {
    dialogPop,
  },
  computed: {
    productLists: {
      get() {
        return this.$store.state.menu.productList;
      },
    },
    solutionList: {
      get() {
        return this.$store.state.menu.solutionList;
      },
    },
    options: {
      get() {
        return this.$store.state.menu.menuList;
      },
    },
    fontRegularClass() {
      return this.language === "cn" ? "cn-normal" : "en-regular";
    },
    fontLightClass() {
      return this.language === "cn" ? "cn-light" : "en-light";
    },
    fontBoldClass() {
      return this.language === "cn" ? "cn-bold" : "en-bold";
    },
  },
  data() {
    return {
      touchStartY: 0,
      touchMoveY: 0,
      carouselScrolling: false,
      value: [],
      texthtml: `<p> 
    南京伟思医疗科技股份有限公司是技术创新驱动型医疗器械企业，获评国家高新技术企业、科创板上市公司（688580）、国家级专精特新“小巨人”企业。公司秉持“成就健康幸福人生”的使命，聚焦抑郁症、盆底功能障碍、脑卒中、医美需求及泌尿系统结石等人群的健康需求。
战略布局上，公司以康复业务为基石，深耕精神康复、盆底康复、神经康复三大细分领域；同时积极培育医疗美容、泌尿及国际业务，构建“康复+新兴”双轮驱动的业务体系。
技术积淀上，历经20余年研发，公司已形成磁刺激、电刺激及智能康复with BCI、能量源三大技术平台。旗下拥有经颅磁刺激仪 MagNeuro、盆底磁刺激仪 MagBelle、塑形磁刺激仪 MagGraver、物理因子平台 VisheeNEO、皮秒激光治疗仪 PicoV、高频电灼仪 RFIntima、强脉冲光Vlumina、钬激光VCurestar、团体生物反馈仪 Freemind、智能康复训练系统 Xlocom等核心产品品牌，以技术创新驱动产品迭代升级，全面覆盖临床诊疗场景。</p >
      `,
      texthtml2: `<p>
        Nanjing Vishee Medical Technology Co., Ltd. is a technology-driven
        medical device company, listed on the STAR Market (Shanghai Stock
        Exchange Science and Technology Innovation Board). It is a national
        high-tech enterprise and a national-level "Little Giant" specializing in
        sophisticated, unique, novel and niche products.
      </p>
      <p>
        Committed to empowering healthy and happy lives, the company focuses on
        meeting the healthcare needs of patients in mental health, pelvic
        health, neurological rehabilitation, medical aesthetics, and urology.
      </p>
      <p>
        Building on over 20 years of expertise, Vishee has developed core
        technology platforms including magnetic stimulation, electrical
        stimulation, intelligent rehabilitation, and radiofrequency & laser
        energy systems. Its flagship product portfolio covers transcranial
        magnetic stimulation, pelvic health solutions, aesthetic devices,
        urological lasers, biofeedback systems, and intelligent rehabilitation
        equipment, providing comprehensive and innovative clinical solutions
        worldwide.
      </p>`,
      developmentList: ["20周年纪念", "人在伟思", "社会招聘", "校园招聘"],
      investorRelationsList: [
        "公司介绍",
        "宣传视频",
        "实时股价",
        "投关资讯",
        "活动",
      ],
      customerServiceList: ["服务网络", "服务项目", "服务监督"],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("heightChange");
    });
  },
  watch: {
    content() {
      this.$nextTick(() => {
        this.$emit("heightChange");
      });
    },
  },
  methods: {
    toucoStartAction(e) {
      this.touchStartY = e.changedTouches[0].clientY;
      this.touchMoveY = 0;
    },
    touchMoveAction(e) {
      // 记录移动距离，但不阻止默认行为
      if (this.$root.isMobile) {
        this.touchMoveY = e.changedTouches[0].clientY;
      }
    },
    handleCopy(text) {
      copyToClipboard(text, this.language);
    },
    touchEndAction(e) {
      if (!this.$root.isMobile) return;

      var startY = this.touchStartY;
      var endY = e.changedTouches[0].clientY;
      var diff = endY - startY;

      // 判断是否为有效滑动（滑动距离大于30px）
      if (Math.abs(diff) < 30) {
        this.touchStartY = 0;
        return;
      }

      // 向上滑动（手指向下滑，diff > 0）
      if (diff > 30 && !this.carouselScrolling) {
        this.carouselScrolling = true;
        // 通知父组件向上滚动
        this.$emit("scroll-up");
        this.touchStartY = 0;
        setTimeout(() => {
          this.carouselScrolling = false;
        }, 1000);
      }

      // 向下滑动（手指向上滑，diff < 0）- 阻止页面滚动到更底部
      if (diff < -30 && !this.carouselScrolling) {
        // 已经到底部了，阻止继续滑动
        this.carouselScrolling = true;
        this.touchStartY = 0;
        setTimeout(() => {
          this.carouselScrolling = false;
        }, 500);
        return;
      }
    },
    telClick() {
      this.$refs.dialogPop.openDialog();
    },
  },
};
</script>

<style lang="less" scoped>
.systemBottom {
  padding-top: 10vh;
  position: relative;
  // 关键：阻止移动端的滚动穿透
  touch-action: none;
  -webkit-overflow-scrolling: touch;

  .systemBottomTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 62vw;
    margin-left: auto;
    margin-right: auto;

    .topItem {
      text-align: left;
      .topTitle {
        font-size: 1.69vh;
        color: #f4faff;
        line-height: 2.5vh;
        margin-bottom: 3.1vh;
      }
      .underLine {
        text-decoration: underline;
        cursor: pointer;
      }

      .item {
        font-size: 1.58vh;
        color: #bababa;
        line-height: 2.2vh;
        margin-bottom: 1.57vh;
        cursor: pointer;
      }

      .item:hover {
        opacity: 0.8;
      }
    }
  }

  .systemMiddle {
    width: 62vw;
    margin-left: auto;
    margin-right: auto;

    .telDiv {
      font-size: 1.69vh;
      color: #f4faff;
      line-height: 2.5vh;
      cursor: pointer;
      text-decoration: underline;
    }

    .telDiv:hover {
      opacity: 0.8;
    }

    .addressDiv {
      font-size: 1.69vh;
      color: #f4faff;
      line-height: 2.5vh;
      margin-top: 2vh;
    }

    .companyInfoDiv {
      font-size: 1.69vh;
      color: #f4faff;
      line-height: 2.5vh;
      margin-top: 2vh;
    }

    .midText {
      margin-top: 5px;
      font-size: 1.58vh;
      color: #bababa;
      line-height: 2.5vh;
    }

    .midText2 {
      margin-top: 5px;
      font-size: 1.35vh;
      font-family: Roboto-Light;
      color: #bababa;
      line-height: 1.8vh;
    }
  }

  .systemBottomBottom {
    font-size: 1.89vh;
    color: #f4faff;
    opacity: 0.4;
    text-align: center;
    white-space: nowrap;
    margin-top: 30px;
    padding-bottom: 15px;
    font-family: SourceHanSansCN-Normal;
    /deep/ .el-link--inner {
      font-size: 1.89vh;
      color: #f4faff;
    }
  }
}

@media only screen and (max-width: 833px) {
  .systemBottom {
    padding-top: 26px;
    height: auto;
    padding-bottom: 40px;
    overflow-y: auto;
    touch-action: auto; // 移动端恢复触摸滚动
    -webkit-overflow-scrolling: touch;

    .systemMiddle {
      width: calc(100% - 40px);

      .addressDiv,
      .companyInfoDiv,
      .telDiv {
        font-size: 12px;
        line-height: 18px;
      }

      .midText {
        font-size: 10px;
        line-height: 15px;
      }
    }

    .systemBottomBottom {
      display: flex;
      flex-direction: column;
      font-size: 8px;
      margin-top: 40px;
      /deep/ .el-link--inner {
        font-size: 8px;
      }
    }
  }

  /deep/ .el-menu {
    background-color: transparent;
    border: 0;

    .el-submenu__title {
      height: 64px;
      line-height: 64px;
      padding: 0 20px;
    }

    .menuTitle {
      font-size: 12px;
      color: #fff;
    }

    .el-radio-group {
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 25px;

      .el-radio-button__inner {
        border-radius: 25px;
        border: none;
        font-size: 10px;
        padding: 7px;
        background-color: transparent;
      }

      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #333333;
        box-shadow: none;
      }
    }

    .el-submenu__icon-arrow {
      font-size: 16px;
    }

    .el-menu-item {
      font-size: 10px;
      height: 55px;
      line-height: 55px;
      padding-left: 36px !important;
    }

    .el-submenu__title:hover {
      background-color: transparent;
    }
  }
}
</style>
