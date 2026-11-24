<template>
  <div class="content-detail">
    <div class="topImageDiv" :style="bannerStyle"></div>
    <div class="contentDiv1">
      <p class="ql-editor" v-html="content" ref="ql-editor"></p>
    </div>
    <systemBottom language="cn" class="itemBottom" />
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import {
  getActivityById,
  getNewsById,
  searchActivityInvest,
} from "@/api/serviceApi";
import systemBottom from "../components/systemBottom.vue";

const BANNER_IMAGES = {
  activity: {
    pc: ossUrl("contentDetail/news.png"),
    mobile: ossUrl("contentDetail/newsMobile.png"),
  },
  news: {
    pc: ossUrl("contentDetail/information.png"),
    mobile: ossUrl("contentDetail/informationMobile.png"),
  },
  investorOpenDay: {
    pc: ossUrl("contentDetail/investorOpenDay.png"),
    mobile: ossUrl("contentDetail/investorOpenDayMobile.png"),
  },
};

const CONTENT_FETCHERS = {
  activity: getActivityById,
  news: getNewsById,
  investorOpenDay: (params) => searchActivityInvest(params.id),
};

export default {
  name: "contentDetail",
  components: {
    systemBottom,
  },
  data() {
    return {
      content: "",
      contentType: "news",
    };
  },
  computed: {
    bannerStyle() {
      const images = BANNER_IMAGES[this.contentType] || BANNER_IMAGES.news;
      const image = this.$root.isMobile ? images.mobile : images.pc;
      return {
        backgroundImage: `url(${image})`,
      };
    },
  },
  created() {
    this.contentType = this.$route.query.type || "news";
    this.fetchContent(this.$route.query.productId);
  },
  watch: {
    "$route.query"(query) {
      if (query.type) {
        this.contentType = query.type;
      }
      if (query.productId) {
        this.fetchContent(query.productId);
      }
    },
  },
  methods: {
    fetchContent(id) {
      if (!id) return;

      const fetcher = CONTENT_FETCHERS[this.contentType] || getNewsById;
      fetcher({ id }).then((res) => {
        if (res.status == 200) {
          this.content = res.data.content;
          this.$nextTick(() => {
            this.formatContent();
          });
        }
      });
    },
    formatContent() {
      const div = this.$refs["ql-editor"];
      if (!div) return;

      div.querySelectorAll("img").forEach((img) => {
        img.style.width = "100%";
      });

      if (this.$root.isMobile) {
        div.querySelectorAll(".ql-align-center").forEach((element) => {
          element.style.fontSize = "14px";
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content-detail {
  width: 100%;
  background: #001b33;

  .topImageDiv {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 20.8vw;
  }

  .contentDiv1 {
    width: 1230px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5.2vw;
    padding-bottom: 7.8vw;
    color: #ffffff;

    .ql-editor {
      color: #ffffff;

      /deep/ p,
      /deep/ span,
      /deep/ div,
      /deep/ li,
      /deep/ h1,
      /deep/ h2,
      /deep/ h3,
      /deep/ h4,
      /deep/ h5,
      /deep/ h6,
      /deep/ strong,
      /deep/ em {
        color: #ffffff !important;
      }
    }
  }

  .itemBottom {
    background: #001b33 no-repeat right top;
  }
}

@media only screen and (max-width: 833px) {
  .content-detail {
    .topImageDiv {
      height: 180px;
      background-size: contain;
    }

    .contentDiv1 {
      width: 100%;
      font-size: 10px;
    }
  }
}
</style>
