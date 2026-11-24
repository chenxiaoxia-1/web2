<template>
  <div class="investorRelations">
    <div class="secDiv">
      <div class="text3">新闻快讯</div>
    </div>
    <div class="activityDiv">
      <div
        class="activityItem"
        v-for="(item, index) in activityList"
        :key="index"
        @click="activityClick(item)"
      >
        <img class="activityImage" :src="item.imagePath" alt="" />
        <div class="title1 cn-bold">
          {{ item.title }}
        </div>
        <div class="title2 cn-normal">
          {{ item.time }}
        </div>
        <div class="title2 cn-normal" v-if="item.category.length">
          【{{ item.category }}】
        </div>
      </div>
    </div>
    <div class="section-pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-size="3"
        layout=" prev, pager, next"
        :small="$root.isMobile ? true : false"
        :total="total"
      >
      </el-pagination>
    </div>

    <div id="investor-open-day" class="secDiv">
      <div class="text3">投资者开放日</div>
    </div>
    <div class="section-body">
      <el-table
        class="data-table"
        :data="investorEventList"
        @sort-change="investorEventListSortChange"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :width="!$root.isMobile ? '80' : '60'"
        >
        </el-table-column>
        <el-table-column
          label="活动日期"
          :width="!$root.isMobile ? '120' : ''"
          prop="time"
          sortable
          :sort-orders="['ascending', 'descending']"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.time }}</div>
              <div
                v-if="$root.isMobile"
                class="title-link"
                @click="investorEventClick(scope.row)"
              >
                {{ scope.row.title }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!$root.isMobile"
          label="活动标题"
          prop="shortTitle"
        >
          <template #default="scope">
            <div class="cell-text">
              <div class="title-link" @click="investorEventClick(scope.row)">
                {{ scope.row.title }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="参加报名" align="center" width="80">
          <template
            slot-scope="scope"
            v-if="scope.row.endTime > new Date().toISOString().slice(0, 10)"
          >
            <img
              @click="reportClickPath(scope.row.url)"
              style="cursor: pointer"
              :src="$ossUrl('touzizheguanxi/icon_baoming.png')"
              alt=""
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="section-pagination">
      <el-pagination
        background
        @current-change="changeCurrentInvestorEventList"
        :current-page="investorEventListPageNum"
        :page-size="5"
        :small="$root.isMobile ? true : false"
        layout=" prev, pager, next"
        :total="investorEventTotal"
      >
      </el-pagination>
    </div>
    <div class="secDiv">
      <div class="text3">演讲报告&一图读懂</div>
    </div>
    <div class="section-body">
      <el-table
        class="data-table"
        :data="keynoteReportList"
        :highlight-current-row="false"
        @sort-change="keynoteReportSortChange"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :width="!$root.isMobile ? '80' : '60'"
        >
        </el-table-column>
        <el-table-column
          label="报告日期"
          :width="!$root.isMobile ? '120' : ''"
          prop="time"
          sortable
          :sort-orders="['ascending', 'descending']"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.time }}</div>
              <div v-if="$root.isMobile">{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!$root.isMobile"
          label="报告标题"
          prop="shortTitle"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="下载" align="center" width="80">
          <template slot-scope="scope">
            <img
              @click="reportClick(scope.row)"
              style="cursor: pointer"
              :src="$ossUrl('touzizheguanxi/icon_downroad.png')"
              alt=""
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="section-pagination">
      <el-pagination
        background
        @current-change="changeCurrentKeynoteReport"
        :current-page="keynoteReportTotalNum"
        :page-size="5"
        :small="$root.isMobile ? true : false"
        layout=" prev, pager, next"
        :total="keynoteReportTotal"
      >
      </el-pagination>
    </div>
    <div class="secDiv">
      <div class="text3">投资者关系活动表</div>
    </div>
    <div class="section-body">
      <el-table
        class="data-table"
        :data="presentationsList"
        :highlight-current-row="false"
        @sort-change="presentationsSortChange"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :width="!$root.isMobile ? '80' : '60'"
        >
        </el-table-column>
        <el-table-column
          :width="!$root.isMobile ? '120' : ''"
          label="活动日期"
          prop="time"
          sortable
          :sort-orders="['ascending', 'descending']"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.time }}</div>
              <div v-if="$root.isMobile">{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!$root.isMobile"
          label="活动标题"
          prop="shortTitle"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="下载" align="center" width="80">
          <template slot-scope="scope">
            <img
              @click="reportClick(scope.row)"
              style="cursor: pointer"
              class="icon-img"
              :src="$ossUrl('touzizheguanxi/icon_downroad.png')"
              alt=""
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="section-pagination">
      <el-pagination
        background
        @current-change="changeCurrentPresentations"
        :current-page="presentationsPageNum"
        :page-size="5"
        :small="$root.isMobile ? true : false"
        layout=" prev, pager, next"
        :total="presentationsTotal"
      >
      </el-pagination>
    </div>

    <div class="secDiv">
      <div class="text3">券商研究报告</div>
    </div>
    <div class="section-body">
      <el-table
        class="data-table"
        :data="analystList"
        :highlight-current-row="false"
        @sort-change="analystSortChange"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :width="!$root.isMobile ? '80' : '60'"
        >
        </el-table-column>
        <el-table-column
          label="报告日期"
          :width="!$root.isMobile ? '120' : ''"
          prop="time"
          sortable
          :sort-orders="['ascending', 'descending']"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.time }}</div>
              <div v-if="$root.isMobile">{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!$root.isMobile"
          label="报告标题"
          prop="shortTitle"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="下载" align="center" width="80">
          <template slot-scope="scope">
            <img
              @click="reportClick(scope.row)"
              style="cursor: pointer"
              :src="$ossUrl('touzizheguanxi/icon_downroad.png')"
              alt=""
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="section-pagination">
      <el-pagination
        background
        @current-change="changeCurrentAnalystReports"
        :current-page="analystReportsPageNum"
        :page-size="5"
        :small="$root.isMobile ? true : false"
        layout=" prev, pager, next"
        :total="analystReportsTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getActivityList,
  getNoticeList,
  getActivityInvestList,
} from "@/api/serviceApi";
import $bus from "../../components/eventBus";

export default {
  name: "investorRelations",
  data() {
    return {
      timer: null,
      pageNum: 1,
      total: 0,
      activityList: [],
      analystReportsPageNum: 1,
      presentationsPageNum: 1,
      analystList: [],
      analystReportsTotal: 0,
      presentationsList: [],
      presentationsTotal: 0,
      // 原有数据...
      presentationsSortOrder: "desc", // 投资者关系活动表排序顺序
      analystReportsSortOrder: "desc", // 研究报告排序顺序
      activeMonth: null,
      activeYear: null, // 新增：当前年份，用于跨年显示
      investorEventList: [],
      activeTime: "",
      PresentationsPageNum: 1,
      investorEventListPageNum: 1,
      investorEventTotal: 0,
      keynoteReportTotalNum: 1,
      keynoteReportTotal: 0,
      keynoteReportSortOrder: "desc",
      keynoteReportList: [],
      investorEventSortOrder: "desc",
    };
  },

  created() {
    const now = new Date();
    const month = now.getMonth();
    this.activeMonth = month + 1;
    this.activeYear = now.getFullYear();

    if (this.activeMonth < 10) {
      this.activeTime = `${this.activeYear}-0${this.activeMonth}`;
    } else {
      this.activeTime = `${this.activeYear}-${this.activeMonth}`;
    }

    this.getActivityList();
    this.getAnalystReportsList();
    this.getPresentationsList();
    this.getInvestorEventList();
    this.getKeynoteReportList();
  },

  methods: {
    getInvestorEventList() {
      const data = {
        pageSize: 5,
        pageNum: this.investorEventListPageNum,
        sort: this.investorEventSortOrder || "desc",
        language: "cn",
      };
      getActivityInvestList(data).then((res) => {
        this.investorEventList = res.data.list;
        this.investorEventTotal = res.data.total;
      });
    },
    getAnalystReportsList() {
      var data = {
        pageSize: 5,
        pageNum: this.analystReportsPageNum,
        type: 2,
        sort: this.analystReportsSortOrder || "desc", // 默认降序
      };
      getNoticeList(data).then((res) => {
        if (res.status == 200) {
          this.analystList = res.data.list;
          this.analystReportsTotal = res.data.total;
        }
      });
    },

    getPresentationsList() {
      var data = {
        pageSize: 5,
        pageNum: this.presentationsPageNum,
        type: 1,
        sort: this.presentationsSortOrder || "desc", // 默认降序
      };
      getNoticeList(data).then((res) => {
        if (res.status == 200) {
          this.presentationsList = res.data.list;
          this.presentationsTotal = res.data.total;
        }
      });
    },
    getKeynoteReportList() {
      var data = {
        pageSize: 5,
        pageNum: this.keynoteReportTotalNum,
        type: 3,
        sort: this.keynoteReportSortOrder || "desc", // 默认降序
      };
      getNoticeList(data).then((res) => {
        if (res.status == 200) {
          this.keynoteReportList = res.data.list;
          this.keynoteReportTotal = res.data.total;
        }
      });
    },
    reportClick(row) {
      window.open(row.path);
    },
    reportClickPath(path) {
      window.open(path);
    },
    getActivityList() {
      var data = {
        language: "cn",
        pageNum: this.pageNum,
        pageSize: 3,
      };
      getActivityList(data).then((res) => {
        if (res.status == 200) {
          this.activityList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getActivityList();
    },
    changeCurrentInvestorEventList(val) {
      this.investorEventListPageNum = val;
      this.getInvestorEventList();
    },
    changeCurrentPresentations(val) {
      this.presentationsPageNum = val;
      this.getPresentationsList();
    },
    changeCurrentAnalystReports(val) {
      this.analystReportsPageNum = val;
      this.getAnalystReportsList();
    },
    changeCurrentKeynoteReport(val) {
      this.keynoteReportTotalNum = val;
      this.getKeynoteReportList();
    },
    activityClick(item) {
      localStorage.setItem("pageId", "investment-info");
      this.$router.push({
        path: "/cn/contentDetail",
        query: { productId: item.id, type: "activity" },
      });
    },
    newClick(item) {
      localStorage.setItem("pageId", "investment-info");
      this.$router.push({
        path: "/cn/contentDetail",
        query: { productId: item.id, type: "news" },
      });
    },
    investorEventClick(item) {
      localStorage.setItem("pageId", "investment-info");
      this.$router.push({
        path: "/cn/contentDetail",
        query: { productId: item.id, type: "investorOpenDay" },
      });
    },
    // 投资者关系活动表排序变化
    presentationsSortChange({ column, prop, order }) {
      this.presentationsSortOrder = order === "ascending" ? "asc" : "desc";
      this.getPresentationsList();
    },

    // 研究报告排序变化
    analystSortChange({ column, prop, order }) {
      this.analystReportsSortOrder = order === "ascending" ? "asc" : "desc";
      this.getAnalystReportsList();
    },
    // 演讲报告&一图读懂
    keynoteReportSortChange({ column, prop, order }) {
      this.keynoteReportSortOrder = order === "ascending" ? "asc" : "desc";
      this.getKeynoteReportList();
    },
    // 投资人活动
    investorEventListSortChange({ column, prop, order }) {
      this.investorEventSortOrder = order === "ascending" ? "asc" : "desc";
      this.getInvestorEventList();
    },
  },
  beforeDestroy() {
    $bus.$off("getInvestorRelationsInfo");
    clearInterval(this.timer); // 清除定时器
    this.timer = null;
  },
};
</script>

<style scoped lang="less">
.investorRelations {
  width: 100%;
  background: #001b33;

  #investor-open-day {
    scroll-margin-top: 80px;
  }

  .title-link {
    cursor: pointer;

    &:hover {
      color: #005bac;
    }
  }

  .category {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;

    span {
      display: inline-block;
      width: 8vw;
      height: 3vw;
      line-height: 3vw;
      font-size: 0.937vw;
      color: #999;
      margin-right: 10px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.1);

      &.active {
        background: #005bac;
        color: #ffffff;
        font-weight: bold;
      }
    }
  }

  .activityDiv {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2vw;

    .activityItem {
      width: 20vw;
      min-height: 18.5vw;
      background: #ffffff;
      border-radius: 0.5vw;
      overflow: hidden;
      cursor: pointer;
      .activityImage {
        width: 20vw;
        height: 11.25vw;
        object-fit: cover;
      }

      .title1 {
        margin-left: 1vw;
        margin-top: 0.78vw;
        font-size: 1vw;
        color: #000000;
        line-height: 1.5vw;
        /* 多行截断 */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        /* 备选方案：限制最大高度 */
        max-height: 3vw; /* line-height (1.5vw) * 2行 */
      }

      .title2 {
        font-size: 0.625vw;
        color: #999999;
        line-height: 0.9vw;
        padding: 2.5px 0;
        margin-left: 1vw;
      }
    }
  }

  .contactDiv {
    margin-top: 2vw;
    width: 100%;
    height: 10vw;
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    border-radius: 1vw;
    padding: 2.1vw 2.6vw 1.5vw 2.6vw;

    .title1 {
      font-size: 1.15vw;
      font-family: SourceHanSansCN-Normal;
      line-height: 1.6vw;
    }

    .title2 {
      margin-top: 0.5vw;
      font-size: 1.15vw;
      font-family: SourceHanSansCN-Normal;
      line-height: 1.6vw;
    }
  }

  // 月份时间线样式（横线 + 13个点）
  .month-timeline-wrapper {
    position: relative;
    width: 100%;
    margin: 2vw 0 0;
    padding: 1.5rem 0 2rem;

    .timeline-line {
      position: absolute;
      top: 30px;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.2);
    }

    .timeline-points {
      position: relative;
      width: 100%;
      height: 44px;

      .timeline-point {
        position: absolute;
        transform: translateX(-50%);
        top: 0;
        cursor: pointer;

        .point-dot {
          width: 14px;
          height: 14px;
          background: #999999;
          border: none;
          border-radius: 50%;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 8px;
        }

        .point-tooltip {
          position: absolute;
          top: -30px;
          left: 40%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          padding: 4px 8px;
          border-radius: 16px;
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 0.2s;
          z-index: 10;
        }

        // 当前月份特殊样式（第7个点）
        &.is-current {
          .point-dot {
            width: 15px;
            height: 15px;
            background: #d1e3ff;
          }
        }
      }
    }
  }

  .itemBottom {
    background: #001b33 no-repeat right top;
  }
}

@media only screen and (max-width: 833px) {
  .investorRelations {
    .category {
      margin: 20px;

      span {
        width: 100px;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
      }
    }

    .contactDiv {
      width: auto;
      padding: 20px;
      height: auto;
      margin: 0 20px;
      border-radius: 10px;

      .title1,
      .title2 {
        font-size: 10px;
        line-height: 15px;
      }
    }

    .activityDiv {
      display: flex;
      width: auto;
      margin: 20px;
      height: auto;
      flex-direction: column;

      .activityItem {
        width: 100%;
        height: auto;
        padding-bottom: 34px;
        margin-bottom: 20px;
        border-radius: 20px;

        .activityImage {
          width: 100%;
          height: auto;
        }

        .title1 {
          font-size: 16px;
          line-height: 24px;
          margin-top: 24px;
          margin-left: 20px;
          /* 移动端多行截断 */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 48px; /* 24px * 2行 */
        }

        .title2 {
          font-size: 10px;
          line-height: 15px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
