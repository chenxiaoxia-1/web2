<template>
  <div class="training-table">
    <div class="training-table__inner">
      <div class="training-table__head">
        <div class="training-table__col training-table__col--course">课程</div>
        <div class="training-table__col training-table__col--time">时间</div>
      </div>
      <div
        v-for="(row, index) in tableData"
        :key="row.trainId || index"
        class="training-table__row"
        :class="{ 'training-table__row--odd': index % 2 === 1 }"
      >
        <div class="training-table__col training-table__col--course">
          {{ row.trainContent }}
        </div>
        <div class="training-table__col training-table__col--time">
          {{ row.trainTime }}
        </div>
      </div>
      <div v-if="!tableData.length && !loading" class="training-table__empty">
        暂无课程安排
      </div>
    </div>
    <div v-if="total > 0" class="training-table__pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pageNum"
        :page-size="pageSize"
        :total="total"
        :pager-count="$root.isMobile ? 5 : 7"
        :small="$root.isMobile"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { getTrainList } from "@/api/serviceApi";

export default {
  name: "TrainingServiceTable",
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      loading: false,
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = true;
      getTrainList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyWord: "",
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.tableData = res.data.list || [];
            this.total = res.data.total || 0;
            this.pageNum = res.data.pageNum || this.pageNum;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlePageChange(page) {
      this.pageNum = page;
      this.fetchList();
    },
  },
};
</script>

<style scoped lang="less">
.training-table {
  width: 100%;
  margin-top: 1.6vw;

  &__inner {
    border-radius: 1vw;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.08);
  }

  &__head {
    display: flex;
    align-items: center;
    min-height: 3.2vw;
    background-color: rgba(255, 255, 255, 0.12);
    font-family: SourceHanSansCN-Bold, sans-serif;
    font-size: 1vw;
    line-height: 1.5vw;
    color: #ffffff;
  }

  &__row {
    display: flex;
    align-items: center;
    min-height: 3.6vw;
    background-color: rgba(255, 255, 255, 0.06);
    font-family: SourceHanSansCN-Normal, sans-serif;
    font-size: 0.9vw;
    line-height: 1.4vw;
    color: rgba(255, 255, 255, 0.9);

    &--odd {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &__col {
    flex: 1;
    padding: 0.9vw 2vw;
    text-align: center;
    box-sizing: border-box;

    &--course {
      flex: 1.4;
      text-align: center;
    }

    &--time {
      flex: 0.6;
    }
  }

  &__empty {
    padding: 2vw;
    text-align: center;
    font-size: 0.85vw;
    color: rgba(255, 255, 255, 0.6);
    font-family: SourceHanSansCN-Light, sans-serif;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 1.6vw;
  }
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #54b0ff;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #54b0ff;
}

/deep/ .el-pagination.is-background .btn-prev,
/deep/ .el-pagination.is-background .btn-next,
/deep/ .el-pagination.is-background .el-pager li {
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

@media only screen and (max-width: 833px) {
  .training-table {
    margin-top: 16px;

    &__inner {
      border-radius: 10px;
    }

    &__head {
      min-height: 44px;
      font-size: 14px;
      line-height: 22px;
    }

    &__row {
      min-height: 48px;
      font-size: 12px;
      line-height: 18px;
    }

    &__col {
      padding: 12px 14px;

      &--course {
        text-align: left;
      }
    }

    &__empty {
      padding: 20px;
      font-size: 12px;
    }

    &__pagination {
      margin-top: 16px;
    }
  }
}
</style>
