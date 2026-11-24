<template>
  <div class="investorRelations">
    <div class="secDiv">
      <div class="text3">实时股价</div>
    </div>
    <div class="priceDiv">
      <div class="priceLeft">
        <div>
          <div class="title1 cn-bold">{{ companyName }} 688580</div>
          <div class="title2 cn-normal">
            截止&nbsp;{{ closeDate }}&nbsp;北京时间
          </div>
        </div>
        <div>
          <div class="title1 title3 cn-bold">
            {{ priceStr }}
            <span class="title11"> 元 </span>
          </div>
          <div
            class="title4 cn-medium"
            :style="variation > 0 ? 'color:#FF4040;' : 'color:#40FF88 ;'"
          >
            <span>{{ variation >= 0 ? "▲" : "▼" }}</span>
            <span style="margin-left: 0.26vw">{{
              variation > 0
                ? "+" + variation
                : variation == "0"
                ? variation
                : +variation
            }}</span>
            <span style="margin-left: 0.78vw">{{
              increase > 0
                ? "+" + increase + "%"
                : variation == "0"
                ? increase + "%"
                : +increase + "%"
            }}</span>
          </div>
        </div>
      </div>
      <div class="priceRight">
        <div>
          <div class="title3 cn-normal">
            提供的股票信息仅供参考，不用于交易目的。股价信息由第三方服务巨潮资讯提供，伟思医疗不向该服务提供信息。
          </div>
          <div class="title4 cn-normal">*报价有十五分钟或以上延迟</div>
        </div>
        <div>
          <div class="title3 cn-normal">成交额（{{ unit }}）</div>
          <div class="title1 cn-medium">{{ turnover }}</div>
        </div>
      </div>
    </div>

    <div class="secDiv">
      <div class="text3">公告信息</div>
    </div>
    <div class="category cn-normal">
      <span :class="category === '' ? 'active' : ''" @click="changeCategory('')"
        >全部</span
      >
      <span
        :class="category === 'new' ? 'active' : ''"
        @click="changeCategory('new')"
        >最新公告</span
      >
      <span
        :class="category === 'regularReport' ? 'active' : ''"
        @click="changeCategory('regularReport')"
        >定期报告</span
      >
    </div>

    <div class="section-body">
      <el-table
        class="data-table"
        :data="reportList"
        :highlight-current-row="false"
        @sort-change="handleSortChange"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :width="!$root.isMobile ? '80' : '60'"
        >
        </el-table-column>
        <el-table-column
          label="公告日期"
          prop="formattedAnnouncementTime"
          sortable
          :sort-orders="['ascending', 'descending']"
          :width="!$root.isMobile ? '120' : ''"
        >
          <template slot-scope="scope">
            <div class="cell-text">
              <div>
                {{ formatDateOnly(scope.row.formattedAnnouncementTime) }}
              </div>
              <div v-if="$root.isMobile">
                {{ scope.row.shortTitle }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="公告标题"
          prop="shortTitle"
          v-if="!$root.isMobile"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.shortTitle }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="下载" width="80" align="center">
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
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-size="5"
        :small="$root.isMobile ? true : false"
        layout=" prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="secDiv">
      <div class="text3">信息公示</div>
    </div>
    <div class="section-body">
      <el-table
        class="data-table"
        :data="newList"
        :highlight-current-row="false"
        @sort-change="handleSortChange3"
        @row-click="newClick"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :width="!$root.isMobile ? '80' : '60'"
        >
        </el-table-column>
        <el-table-column
          label="公告日期"
          prop="time"
          :width="!$root.isMobile ? '120' : ''"
          sortable
          :sort-orders="['ascending', 'descending']"
        >
          <template #default="scope">
            <div class="cell-text">
              <div>
                {{ formatDateOnly(scope.row.time) }}
              </div>
              <div v-if="$root.isMobile">{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="!$root.isMobile" label="公告标题" prop="title">
          <template #default="scope">
            <div class="cell-text">
              <div>{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="section-pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange2"
        :current-page="pageNum2"
        :page-size="5"
        :small="$root.isMobile ? true : false"
        layout=" prev, pager, next"
        :total="total2"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getAnnouncementList,
  getNewsList,
  getAnnouncement,
} from "@/api/serviceApi";

export default {
  name: "StockInformation",
  data() {
    return {
      timer: null,
      companyName: "",
      closeDate: "",
      priceStr: "",
      variation: "",
      increase: "",
      turnover: "",
      unit: "",
      reportList: [],
      pageNum: 1,
      total: 0,
      category: "",
      newList: [],
      sortOrder3: "desc",
      pageNum2: 1,
      total2: 0,
    };
  },
  created() {
    this.getReportList();
    this.getNewsList();
  },
  mounted() {
    this.getStockData();
    this.timer = setInterval(() => {
      this.getStockData();
    }, 5000);
  },
  methods: {
    formatDateOnly(value) {
      if (!value) return "";
      const str = String(value);
      return str.length >= 10 ? str.slice(0, 10) : str;
    },
    changeCategory(val) {
      this.category = val;
      this.getReportList();
    },
    getStockData() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://qt.gtimg.cn/q=sh688580");
      xhr.onload = () => {
        if (xhr.status !== 200) return;
        const data = xhr.response.split("~");
        this.companyName = data[1];
        const year = data[30].slice(0, 4);
        const month = data[30].slice(4, 6);
        const day = data[30].slice(6, 8);
        const hour = data[30].slice(8, 10);
        const min = data[30].slice(10, 12);
        const second = data[30].slice(12, 14);
        this.closeDate = `${year}-${month}-${day} ${hour}:${min}:${second}`;
        this.priceStr = data[3];
        this.variation = data[31];
        this.increase = data[32];
        if (data[37] > 10000) {
          this.turnover = parseFloat(data[37] / 10000).toFixed(2);
          this.unit = "亿";
        } else {
          this.turnover = data[37];
          this.unit = "万";
        }
      };
      xhr.send();
    },
    getReportList() {
      const dic = {
        pageNum: this.pageNum,
        pageSize: 5,
        category: this.category === "new" ? "" : this.category,
        sort: this.sortOrder || "desc",
      };
      getAnnouncementList(dic).then((res) => {
        if (res.status == 200) {
          this.reportList = res.data.announcements;
          this.total = res.data.totalAnnouncement;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getReportList();
    },
    reportClick(row) {
      const dic = {
        announceTime: row.formattedAnnouncementTime,
        announcementId: row.announcementId,
      };
      getAnnouncement(dic).then((res) => {
        if (res.status == 200) {
          const downloadDom = document.createElement("a");
          downloadDom.href = res.data.fileUrl;
          document.body.appendChild(downloadDom);
          downloadDom.click();
          document.body.removeChild(downloadDom);
        }
      });
    },
    handleSortChange({ prop, order }) {
      if (prop === "formattedAnnouncementTime") {
        this.sortOrder = order === "ascending" ? "asc" : "desc";
        this.getReportList();
      }
    },
    handleSortChange3({ order }) {
      this.sortOrder3 = order === "ascending" ? "asc" : "desc";
      this.getNewsList();
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.getNewsList();
    },
    getNewsList() {
      const data = {
        language: "cn",
        pageNum: this.pageNum2,
        pageSize: 5,
        sort: this.sortOrder3 || "desc",
      };
      getNewsList(data).then((res) => {
        if (res.status == 200) {
          this.newList = res.data.list;
          this.total2 = res.data.total;
        }
      });
    },
    newClick(item) {
      localStorage.setItem("pageId", "investment-info");
      this.$router.push({
        path: "/cn/contentDetail",
        query: { productId: item.id, type: "news" },
      });
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style scoped lang="less">
.investorRelations {
  width: 100%;
  background: #001b33;

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

  ::v-deep.el-table {
    td.el-table__cell {
      padding: 2px 0;
    }
  }

  .priceDiv {
    margin-top: 1rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 1vw;
    padding: 3.9vw 2.6vw;
    background-color: rgba(255, 255, 255, 0.1);

    .priceLeft {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3.8vw;

      .title1 {
        font-size: 2.5vw;
        line-height: 3.75vw;
      }

      .title2 {
        margin-top: 0.36vw;
        font-size: 1.25vw;
        line-height: 1.8vw;
      }
      .title4 {
        font-size: 1vw;
      }
    }

    .priceRight {
      display: flex;
      justify-content: space-between;

      .title1 {
        font-size: 2vw;
        line-height: 2.8vw;

        .title11 {
          margin-left: 0.52vw;
          font-size: 1.25vw;
          line-height: 1.8vw;
        }
      }

      .title3 {
        font-size: 0.8vw;
        line-height: 1.25vw;
      }

      .title4 {
        margin-top: 0.2vw;
        font-size: 1vw;
        line-height: 1.25vw;
        opacity: 0.5;
      }
    }
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

    .priceDiv {
      width: auto;
      margin: 30px 20px;
      height: auto;
      padding: 30px 20px;
      border-radius: 10px;

      .priceLeft {
        flex-direction: column;

        .title1 {
          font-size: 20px;
          line-height: 30px;
        }

        .title2 {
          font-size: 12px;
          line-height: 18px;
        }

        .title3 {
          font-size: 30px;
          line-height: 45px;
        }

        .title4 {
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 18px;
        }
      }

      .priceRight {
        flex-direction: column-reverse;

        .title3 {
          font-size: 10px;
          line-height: 15px;
        }

        .title4 {
          font-size: 12px;
          line-height: 18px;
        }

        .title1 {
          font-size: 30px;
          line-height: 45px;
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>
