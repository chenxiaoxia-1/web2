<template>
  <!--TODO 语言切换回首页 社会招聘 -->
  <div class="socialRecruitment" @click="socialRecruitmentClick">
    <div class="topDiv" :class="enTopImageDiv">
      <div class="select">
        <el-select
          class="select1"
          v-model="select1"
          clearable
          placeholder="职位类别"
          :size="$root.isMobile ? 'small' : ''"
        >
          <el-option
            v-for="item in jobCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          class="select2"
          v-model="select2"
          clearable
          placeholder="工作地点"
          :size="$root.isMobile ? 'small' : ''"
        >
          <el-option
            v-for="item in jobPlaceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-input
          class="inputClass"
          placeholder="请输入职位"
          v-model="inputStr"
          clearable
          :size="$root.isMobile ? 'small' : ''"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <el-button
            slot="append"
            class="searchBtn"
            icon="el-icon-search"
            @click="searchBtnAction"
            :size="$root.isMobile ? 'small' : ''"
          ></el-button>
        </el-input>
      </div>
    </div>
    <div class="campus-content" v-if="$route.name === 'campus'">
      <div class="secDiv" id="founder-message">
        <div class="text3">我们能提供什么</div>
      </div>
      <div class="benefits">
        <div class="benefits-com">
          <img :src="$ossUrl('talentDevelopment/pic3-campus.png')" alt="" />
        </div>
        <div class="benefits-com">
          <div
            v-for="(item, index) in benefits"
            :key="index"
            class="benefits-detail"
          >
            <div class="title">{{ item.title }}</div>
            <div class="detail">{{ item.detail }}</div>
          </div>
        </div>
      </div>
      <div class="secDiv" id="founder-message">
        <div class="text3">应届生入职成长感言</div>
      </div>
      <div class="testimonial">
        <div v-for="(item, index) in representative" :key="index">
          <div class="title">{{ item.experience }}</div>
          <div class="detail">{{ item.testimonial }}</div>
        </div>
      </div>
    </div>
    <div class="jobBox">
      <div class="secDiv" id="founder-message" v-if="!isSearching">
        <div class="text3">招聘职位</div>
      </div>

      <div class="jobNumberDiv" v-if="isSearching">
        找到{{ dataList.length }}个职位
      </div>
      <div
        class="jobItemDiv"
        v-for="(item, index) in dataList"
        :key="index"
        @click="jobClick(item)"
      >
        <div class="title1">{{ item.name }}</div>
        <div class="title2">
          {{ item.jobPlaces.map((item) => item.jobPlaceName).join("、") }}丨{{
            item.jobCategory
          }}丨{{ item.number }}位
        </div>
        <div class="title3" v-html="item.responsibility"></div>
      </div>
      <div class="section-pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="10"
          :pager-count="11"
          layout=" prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <systemBottom :language="language" class="itemBottom" />
  </div>
</template>

<script>
import {
  getJobCategoryList,
  getJobPlaceList,
  getJobList,
} from "@/api/serviceApi";
import $bus from "../components/eventBus";
import systemBottom from "../components/systemBottom.vue";

export default {
  name: "socialRecruitment",
  components: {
    systemBottom,
  },
  data() {
    return {
      jobCategoryList: [],
      jobPlaceList: [],
      inputStr: "",
      select1: "",
      select2: "",
      isSearching: false,
      pageNum: 1,
      dataList: [],
      total: 0,
      enTopImageDiv: "socialRecruitment",
      benefits: [
        {
          title: "薪酬福利",
          detail:
            "有竞争力的应届起薪，六险一金，带薪年假，定期体检，公寓租赁协助",
        },
        {
          title: "成长培养",
          detail: "中层1v1带教培养，专业导师指导，核心项目实践",
        },
        {
          title: "职业发展",
          detail: "双通道职业发展路径（专业/管理），快速晋升与发展",
        },
      ],
      representative: [
        {
          experience: "国际市场 | 房同学",
          testimonial:
            "2024年加入国际市场团队，短短2年时间，足迹遍布各大洲，获得了许多参与商业文化交流、学习国际产品策略的机会，让我迅速成长",
        },
        {
          experience: "盆底市场 | 沈同学",
          testimonial:
            "2024年加入盆底市场团队，入职1年，就有机会负责公司核心产品生物反馈磁FMS的规划工作，立志成为一名优秀的产品经理",
        },
        {
          experience: "工艺工程师 | 朱同学",
          testimonial:
            "2024年加入质量部，在上级的支持与鼓励之下，从0-1主导建立光学工艺，能够把专业与实践成功连接、转化，不断的用自己的思路解决业务难题， 真的非常有成就感",
        },
        {
          experience: "光学工程师 | 乔同学",
          testimonial: `2023年加入研发皮秒激光治疗仪PicoV团队，通过和团队成员一起共同学习成长，攻坚克难，在2025年初完成了产品的成功上市交付。在2025年还获得了公司的“年度优秀员工”奖项`,
        },
      ],
    };
  },
  created() {
    var url = this.$route.params;
    if (url) {
      this.language = url.language;
    }
    this.getJobCategoryListData();
    this.getJobPlaceListData();
    this.getJobListData();
    if (this.$route.name === "socialRecruitment") {
      const id = this.$route.query.id;
      this.enTopImageDiv = "socialRecruitment";
    } else {
      const id = this.$route.query.productId;
      this.enTopImageDiv = "campus";
    }
  },
  mounted() {
    $bus.$on("languageChange", (item) => {
      this.language = item;
      this.$router.push({
        path: "socialRecruitment",
        query: {
          language: this.language,
        },
      });
      this.getJobCategoryListData();
      this.getJobPlaceListData();
      this.getJobListData();
    });
  },
  methods: {
    socialRecruitmentClick() {
      $bus.$emit("menuRecover", "1");
    },
    getJobCategoryListData() {
      getJobCategoryList().then((res) => {
        if (res.status == 200) {
          this.jobCategoryList = res.data;
        }
      });
    },
    getJobPlaceListData() {
      getJobPlaceList().then((res) => {
        if (res.status == 200) {
          this.jobPlaceList = res.data;
        }
      });
    },
    getJobListData() {
      var dic = {
        pageNum: this.pageNum,
        pageSize: 10,
        jobCategoryIds: this.select1,
        jobPlaceIds: this.select2,
        wd: this.inputStr,
        source: this.$route.query.source,
      };
      getJobList(dic).then((res) => {
        if (res.status == 200) {
          this.dataList = res.data.list;
          this.total = res.data.total;
          this.dealJobNumber();
        }
      });
    },
    searchBtnAction() {
      this.getJobListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getJobListData();
    },
    dealJobNumber() {
      if (
        this.select1.toString() != "" ||
        this.select2.toString() != "" ||
        this.inputStr.length > 0
      ) {
        this.isSearching = true;
      } else {
        this.isSearching = false;
      }
    },
    jobClick(item) {
      sessionStorage.setItem("pageId", item.id);
      this.$router.push({ path: `/${this.language}/jobDetails` });
    },
  },
  beforeDestroy() {
    $bus.$off("languageChange");
  },
};
</script>

<style scoped lang="less">
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #005bac;
}
/deep/.el-pagination .el-pager li:hover {
  color: #005bac;
}
.socialRecruitment {
  background: #001b33;
  .campus {
    background: url("@{oss-base}/talentDevelopment/bg_piccampus.png") no-repeat;
    background-size: cover;
  }
  .socialRecruitment {
    background: url("@{oss-base}/talentDevelopment/bg_pic@2x.png") no-repeat;
    background-size: cover;
  }
  .topDiv {
    height: 100vh;
    position: relative;
    .select {
      position: absolute;
      top: 56%;
      display: flex;
      width: 100%;
      justify-content: center;
      /deep/ .el-input__inner {
        background: #e8e8e8 !important;
        border: none;
      }
      /deep/ .el-input__prefix {
        display: none;
      }
      .select1,
      .select2 {
        width: 150px;
        height: 48px;
      }

      .select2 {
        margin-left: 6px;
      }

      .inputClass {
        margin-left: 6px;
        width: 400px;
        height: 48px;
        border-radius: 4px;
        overflow: hidden;

        .searchBtn {
          height: 48px;
          background: #005bac;
          font-size: 16px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: #333333;
          text-align: center;
          margin-right: -22px;
          border-radius: 0 3px 3px 0;
          background: #e8e8e8;
        }

        .searchBtn:hover {
          transform: translate(0px, 0px);
          transition: transform 0.2s;
        }
      }
    }
  }
  .campus-content {
    margin: 50px auto 0;
    max-width: 1180px;
    min-width: 335px;
    width: 70vw;
    font-family: SourceHanSansCN-Light;

    .campus-title {
      font-size: 3.1vw;
      text-align: center;
      margin: 5vw 0 1.2vw;
      span {
        font-family: SourceHanSansCN-Bold;
      }
    }
    .benefits {
      border-radius: 4px;
      display: flex;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.1);

      .benefits-com {
        flex: 50%;
        img {
          width: 100%;
          object-fit: contain;
          display: block;
        }
        .benefits-detail {
          .title {
            padding-top: 2vw;
            padding-left: 2vw;
            font-family: SourceHanSansCN-Bold;
            font-size: 1.2vw;
          }
          .detail {
            padding-left: 2vw;
            font-size: 0.8vw;
          }
        }
      }
    }
    .testimonial {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      padding: 30px 40px 50px;
      .title {
        margin-top: 2vw;
        margin-left: 2vw;
        font-family: SourceHanSansCN-Bold;
        font-size: 1.2vw;
      }
      .detail {
        margin-left: 2vw;
        font-size: 0.8vw;
      }
    }
  }

  .jobNumberDiv {
    margin: 50px auto 0;
    max-width: 1180px;
    min-width: 335px;
    width: 70vw;
    font-size: 32px;
    font-family: SourceHanSansCN-Bold;
    color: #ffffff;
  }

  .jobItemDiv {
    padding: 30px 40px;
    margin-top: 20px;
    max-width: 1180px;
    min-width: 335px;
    width: 70vw;
    height: 225px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;

    .title1 {
      font-size: 28px;
      font-family: SourceHanSansCN-Bold;
      color: #ffffff;
      line-height: 42px;
    }

    .title2 {
      margin-top: 10px;
      font-size: 20px;
      font-family: SourceHanSansCN-Normal;
      color: #ffffff;
      line-height: 30px;
    }

    .title3 {
      margin-top: 35px;
      font-size: 16px;
      font-family: SourceHanSansCN-Light;
      color: #ffffff;
      line-height: 24px;
      height: 48px;
      overflow: hidden;
    }
  }

  .section-pagination {
    margin-top: 20px;
    margin-bottom: 100px;
    max-width: 1180px;
    min-width: 335px;
    width: 70vw;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
  }

  .itemBottom {
    background: #001b33 no-repeat right top;
  }
}

@media only screen and (max-width: 833px) {
  .socialRecruitment {
    .campus {
      background-image: url("@{oss-base}/talentDevelopment/bg_pic@3xcampus.png");
    }
    .socialRecruitment {
      background: url("@{oss-base}/talentDevelopment/bg_pic@3x.png") no-repeat;
    }
    .topDiv {
      height: 100vh;
      background-size: cover;
      background-position: center;
      padding: 0;
      flex-wrap: wrap;
      align-content: flex-start;
      width: 100%;

      .select {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 25px;
        top: 43%;
        .select1,
        .select2 {
          height: 60px;
        }
        .select2 {
          margin: 0;
        }
        .inputClass {
          width: 100%;
          height: 32px;
          margin-left: 0;
          .searchBtn {
            height: 34px;
            margin-right: -22px;
          }
        }
      }
    }
    .campus-content {
      .campus-title {
        font-size: 16px;
        margin: 25px;
      }
      .benefits {
        .benefits-com {
          .benefits-detail {
            .title {
              font-size: 10px;
            }
            .detail {
              font-size: 8px;
            }
          }
        }
      }
      .testimonial {
        padding: 16px 8px;
        .title {
          margin-top: 2vw;
          margin-left: 2vw;
          font-size: 10px;
        }
        .detail {
          margin-left: 2vw;
          font-size: 8px;
        }
      }
    }

    .jobNumberDiv {
      font-size: 16px;
      font-weight: bold;
      margin-top: 40px;
    }

    .jobItemDiv {
      height: 138px;
      overflow: hidden;
      padding-left: 20px;
      padding-right: 20px;

      .title1 {
        font-size: 16px;
        line-height: 24px;
      }

      .title2 {
        font-size: 12px;
        line-height: 18px;
        margin-top: 5px;
      }

      .title3 {
        font-size: 10px;
        line-height: 14px;
        margin-top: 5px;
        height: 30px;
      }
    }

    .section-pagination {
      margin-bottom: 40px;
    }
  }
}
</style>
<style>
.inputClass .el-input__inner {
  border: #ffffff 1px solid;
}

.el-select-dropdown__item {
  font-size: 16px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: #999999;
}

.el-select-dropdown__item.selected {
  font-size: 16px;
  font-family: SourceHanSansCN-Normal;
  color: #333333 !important;
  font-weight: 400;
}

.el-input__inner {
  height: 48px;
  font-size: 16px;
  font-family: SourceHanSansCN-Normal;
  color: #333333;
}
</style>
