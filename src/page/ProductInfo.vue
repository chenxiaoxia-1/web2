<template>
  <div class="productInfo" @click="productInfoClick">
    <el-carousel
      v-show="dataList.length > 1"
      class="topCarouselDiv"
      height="100vh"
      @change="carouselChange"
      :autoplay="false"
      :arrow="'always'"
      :interval="10000"
      trigger="click"
      ref="carousel"
      :indicator-type="$root.isMobile ? 'circle' : 'dot'"
    >
      <el-carousel-item v-for="(item, index) in dataList" :key="index">
        <div
          class="carouselItem"
          :style="{
            'background-image': 'url(' + item.productData.banner + ')',
          }"
        >
          <div class="topImg1" v-if="language === 'cn'">
            <div class="subtitle cn-bold">
              {{ productInfoData.subtitle1 }}
            </div>
            <img :src="productInfoData.itemImage" alt="" />
            <div class="topText1 cn-bold">
              {{ productInfoData.bannerCopywriting }}
            </div>
          </div>
          <div class="topImg1" v-if="language === 'en'">
            <img :src="productInfoData.itemImage" alt="" />
            <div class="subtitle en-bold">
              {{ productInfoData.subtitle1 }}
            </div>
            <div class="topText1 en-bold">
              {{ productInfoData.bannerCopywriting }}
            </div>
          </div>
          <div
            class="bottomImageDiv"
            v-if="productInfoData.advantageImage1?.length"
          >
            <img
              class="topDivImg"
              :src="productInfoData.advantageImage1"
              alt=""
            />
            <img
              class="topDivImg"
              :src="productInfoData.advantageImage2"
              alt=""
            />
            <img
              class="topDivImg"
              :src="productInfoData.advantageImage3"
              alt=""
            />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div
      v-if="dataList?.length == 1"
      class="topDiv"
      :style="{ 'background-image': 'url(' + productInfoData.banner + ')' }"
    >
      <div class="topImg1" v-if="language === 'cn'">
        <div class="subtitle cn-bold">
          {{ productInfoData.subtitle1 }}
        </div>
        <img :src="productInfoData.itemImage" alt="" />
        <div class="topText1 cn-bold">
          {{ productInfoData.bannerCopywriting }}
        </div>
      </div>
      <div class="topImg1" v-if="language === 'en'">
        <img :src="productInfoData.itemImage" alt="" />
        <div class="subtitle en-bold">
          {{ productInfoData.subtitle1 }}
        </div>
        <div class="topText1 en-bold">
          {{ productInfoData.bannerCopywriting }}
        </div>
      </div>
      <div
        class="bottomImageDiv"
        v-if="productInfoData.advantageImage1?.length"
      >
        <img class="topDivImg" :src="productInfoData.advantageImage1" alt="" />
        <img class="topDivImg" :src="productInfoData.advantageImage2" alt="" />
        <img class="topDivImg" :src="productInfoData.advantageImage3" alt="" />
      </div>
    </div>

    <!-- 指南与共识 pc端 -->
    <div
      class="znygs"
      v-if="!$root.isMobile && productInfoData?.guideImage1?.length"
    >
      <div class="title en-bold" v-if="language === 'en'">
        Rooted in Science
      </div>
      <img class="znygs-img" :src="productInfoData.guideImage1" alt="" />
    </div>
    <!-- 指南与共识 移动端端 -->
    <div
      class="znygs"
      v-if="$root.isMobile && productInfoData.guideTextMobile.length"
    >
      <div class="title" :class="fontBoldClass">
        {{ language === "cn" ? "指南与共识" : "Rooted in Science" }}
      </div>
      <div
        class="ql-editor"
        :class="fontLightClass"
        v-html="productInfoData.guideTextMobile"
      ></div>
    </div>

    <div v-if="productInfoData.video.length">
      <video
        :poster="productInfoData.videoCover"
        class="videoDiv"
        :src="productInfoData.video"
        muted
        webkit-playsinline
        playsinline="true"
        x5-video-player-type="h5-page"
        preload="none"
        :controls="$root.isMobile"
        :autoplay="!$root.isMobile"
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        controls
        loop
      ></video>
    </div>
    <div class="maidianDiv">
      <div
        class="item1 maidian1"
        id="item1Id"
        v-if="sellingPointsList?.length > 0"
      >
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow1"
            class="leftImage"
            :src="sellingPointsList[0].image"
            alt=""
          />
        </transition>
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow1" class="rightTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[0].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[0].introduce"
            ></div>
          </div>
        </transition>
      </div>
      <div
        class="item1 maidian2"
        id="item2Id"
        v-if="sellingPointsList?.length > 1"
      >
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow2" class="leftTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[1].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[1].introduce"
            ></div>
          </div>
        </transition>
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow2"
            class="rightImage"
            :src="sellingPointsList[1].image"
            alt=""
          />
        </transition>
      </div>

      <div
        class="item1 maidian3"
        id="item3Id"
        v-if="sellingPointsList?.length > 2"
      >
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow3"
            class="leftImage"
            :src="sellingPointsList[2].image"
            alt=""
          />
        </transition>
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow3" class="rightTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[2].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[2].introduce"
            ></div>
          </div>
        </transition>
      </div>
      <div
        class="item1 maidian4"
        id="item4Id"
        v-if="sellingPointsList?.length > 3"
      >
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow4" class="leftTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[3].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[3].introduce"
            ></div>
          </div>
        </transition>
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow4"
            class="rightImage"
            :src="sellingPointsList[3].image"
            alt=""
          />
        </transition>
      </div>
      <div
        class="item1 maidian5"
        id="item5Id"
        v-if="sellingPointsList?.length > 4"
      >
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow5"
            class="leftImage"
            :src="sellingPointsList[4].image"
            alt=""
          />
        </transition>
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow5" class="rightTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[4].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[4].introduce"
            ></div>
          </div>
        </transition>
      </div>
      <div
        class="item1 maidian6"
        id="item6Id"
        v-if="sellingPointsList?.length > 5"
      >
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow6" class="leftTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[5].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[5].introduce"
            ></div>
          </div>
        </transition>
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow6"
            class="rightImage"
            :src="sellingPointsList[5].image"
            alt=""
          />
        </transition>
      </div>
      <div
        class="item1 maidian7"
        id="item7Id"
        v-if="sellingPointsList?.length > 6"
      >
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow7"
            class="leftImage"
            :src="sellingPointsList[6].image"
            alt=""
          />
        </transition>
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow7" class="rightTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[6].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[6].introduce"
            ></div>
          </div>
        </transition>
      </div>
      <div
        class="item1 maidian8"
        id="item8Id"
        v-if="sellingPointsList?.length > 7"
      >
        <transition name="transitionBottomToTop">
          <div v-show="maidianshow8" class="leftTextDiv">
            <div class="title" :class="fontBoldClass">
              {{ sellingPointsList[7].name }}
            </div>
            <div
              class="text"
              :class="fontLightClass"
              v-html="sellingPointsList[7].introduce"
            ></div>
          </div>
        </transition>
        <transition name="transitionBottomToTop">
          <img
            v-show="maidianshow8"
            class="rightImage"
            :src="sellingPointsList[7].image"
            alt=""
          />
        </transition>
      </div>
    </div>
    <div class="brochureDiv">
      <div class="brochureRightDiv">
        <div class="brochureTitle" :class="fontBoldClass">
          {{ language == "cn" ? "产品宣传册" : "Brochure" }}
        </div>
        <div class="brochureTitle2 cn-light" v-if="language === 'cn'">
          了解产品细节内容、详细技术说明、临床案例
        </div>
        <div class="brochureTitle2 en-light" v-if="language !== 'cn'">
          Explore detailed product information,
        </div>
        <div class="brochureTitle2 en-light" v-if="language !== 'cn'">
          technical specifications, and clinical case studies
        </div>
        <el-button
          class="brochureBtn"
          :class="fontLightClass"
          @click="brochureBtnAction"
          >{{ language == "cn" ? "下载" : "Download" }}</el-button
        >
      </div>
    </div>

    <div class="serviceDiv" v-if="language === 'cn'">
      <div class="title1 cn-bold">用服务解决客户需求</div>
      <div class="title2 cn-light">
        真诚沟通 热情 耐心 敬业 365全天候人工服务
      </div>
      <el-button class="serviceButton cn-normal" @click="serviceButtonAction"
        >了解更多</el-button
      >
    </div>
    <div class="literatureDiv" v-if="productInfoData.literature?.length">
      <div class="bgDiv">
        <div class="itemTitle" :class="fontBoldClass">
          {{
            language === "cn" ? "文献与注释：" : "References and Annotations"
          }}
        </div>
        <div
          class="ql-editor"
          :class="fontLightClass"
          v-html="productInfoData.literature"
        ></div>
      </div>
    </div>
    <systemBottom :language="language" class="itemBottom" />
    <dialogPop :language="language" ref="dialogPop" />
  </div>
</template>

<script>
import { getIndexProductByIndexId } from "@/api/serviceApi";
import systemBottom from "../components/systemBottom.vue";
import dialogPop from "./dialogPop.vue";
import $bus from "../components/eventBus";

export default {
  name: "productInfo",
  components: {
    systemBottom,
    dialogPop,
  },
  data() {
    return {
      language: "cn",
      activeIndex: 0,
      dataList: [],
      productInfoData: {},
      sellingPointsList: [],
      maidianshow1: false,
      maidianshow2: false,
      maidianshow3: false,
      maidianshow4: false,
      maidianshow5: false,
      maidianshow6: false,
      maidianshow7: false,
      maidianshow8: false,
      pageNum: 1,
      total: 1,
      sortOrder: "0",
      currentSlide: 0,
      productId: "",
      routeId: "",
      autoPlayTimer: null,
      scrollTimer: null,
      resizeTimer: null,
      lastLoadedProductId: null,
      lastLoadedClient: null,
      isAutoPlayStopped: false, // 轮播是否已永久停止
    };
  },
  computed: {
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
  created() {
    const pageId = sessionStorage.getItem("pageId");
    this.routeId = pageId;
    const url = this.$route.params;
    if (url) {
      this.language = url.language;
    }
    this.loadProductByPageId(pageId, true);

    $bus.$on("pageId", (pageId) => {
      this.routeId = pageId;
      this.resetCarouselState();
      this.loadProductByPageId(pageId, true);
    });
  },
  mounted() {
    this.initArrowEvents();
    window.addEventListener("popstate", this.reLoadPage);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  methods: {
    // 启动自动播放（10秒切换）
    startAutoPlay() {
      // 如果已经永久停止，不再启动
      if (this.isAutoPlayStopped) {
        return;
      }

      // 清除已存在的定时器
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }

      // 如果轮播组件不存在或只有一张图片，不启动
      if (!this.$refs.carousel || this.dataList.length <= 1) {
        return;
      }

      this.autoPlayTimer = setInterval(() => {
        // 检查是否可以自动切换
        if (this.isAutoPlayStopped) {
          return;
        }

        const carousel = this.$refs.carousel;
        if (carousel && window.scrollY === 0) {
          const currentIndex = carousel.activeIndex;
          const nextIndex = currentIndex + 1;

          // 如果是最后一张，永久停止轮播
          if (nextIndex >= this.dataList.length) {
            this.stopAutoPlayPermanently();
            return;
          }

          // 切换到下一张
          carousel.setActiveItem(nextIndex);
        }
      }, 10000); // 10秒切换
    },

    // 永久停止自动播放
    stopAutoPlayPermanently() {
      this.isAutoPlayStopped = true;
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    },

    // 临时停止自动播放（鼠标悬停时使用）
    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    },

    // 重新启动（仅在未永久停止时使用）
    restartAutoPlay() {
      if (!this.isAutoPlayStopped) {
        this.startAutoPlay();
      }
    },

    initArrowEvents() {
      this.$nextTick(() => {
        const carousel = this.$refs.carousel;
        if (carousel && carousel.$el) {
          const indicator = carousel.$el.querySelectorAll(
            ".el-carousel__indicators",
          );
          const arrows = carousel.$el.querySelectorAll(".el-carousel__arrow");

          // 绑定箭头和指示器的鼠标悬停事件
          arrows.forEach((arrow) => {
            arrow.removeEventListener("mouseenter", this.stopAutoPlay);
            arrow.addEventListener("mouseenter", this.stopAutoPlay);
          });

          indicator.forEach((ind) => {
            ind.removeEventListener("mouseenter", this.stopAutoPlay);
            ind.addEventListener("mouseenter", this.stopAutoPlay);
          });

          // 使用 MutationObserver 监听 bottomImageDiv 的动态添加
          const observer = new MutationObserver(() => {
            const carouselItems =
              carousel.$el.querySelectorAll(".el-carousel__item");
            let bottomImageDivs = [];

            carouselItems.forEach((item) => {
              const bottomDiv = item.querySelector(".bottomImageDiv");
              if (bottomDiv && !bottomDiv.hasAttribute("data-event-bound")) {
                bottomDiv.setAttribute("data-event-bound", "true");
                bottomDiv.addEventListener("mouseenter", this.stopAutoPlay);
                bottomImageDivs.push(bottomDiv);
              }
            });

            if (bottomImageDivs.length > 0) {
              // 绑定完成后断开观察
              observer.disconnect();
            }
          });

          // 开始观察轮播组件内部的变化
          observer.observe(carousel.$el, {
            childList: true,
            subtree: true,
          });

          // 保存 observer 以便在 beforeDestroy 中断开
          this.carouselObserver = observer;
        }
      });
    },

    handleVisibilityChange() {
      // 页面重新可见时，如果未永久停止且在顶部，重新启动
      if (!document.hidden && window.scrollY === 0 && !this.isAutoPlayStopped) {
        this.restartAutoPlay();
      }
    },

    // 路由从浏览器切返回到这个页面时页面需要重新获取数据渲染
    reLoadPage() {
      const pageId = sessionStorage.getItem("pageId");
      this.routeId = pageId;
      const url = this.$route.params;
      if (url) {
        this.language = url.language;
      }
      this.loadProductByPageId(pageId, true);
    },

    parseProductId(pageId) {
      if (
        !pageId ||
        typeof pageId !== "string" ||
        !pageId.startsWith("products-")
      ) {
        return null;
      }
      const id = pageId.split("-").pop();
      const productId = Number(id);
      return Number.isNaN(productId) ? null : productId;
    },

    resetCarouselState() {
      this.activeIndex = 0;
      this.maidianshow1 = false;
      this.maidianshow2 = false;
      this.maidianshow3 = false;
      this.maidianshow4 = false;
      this.maidianshow5 = false;
      this.maidianshow6 = false;
      this.maidianshow7 = false;
      this.maidianshow8 = false;
      this.isAutoPlayStopped = false;
      this.$nextTick(() => {
        this.startAutoPlay();
      });
    },

    loadProductByPageId(pageId, force = false) {
      const productId = this.parseProductId(pageId);
      if (!productId) return;

      const client = this.$root.isMobile ? "phone" : "web";
      if (
        !force &&
        productId === this.lastLoadedProductId &&
        client === this.lastLoadedClient
      ) {
        return;
      }

      this.lastLoadedProductId = productId;
      this.lastLoadedClient = client;
      this.getProductInfo(productId, client);
    },

    handleScroll(e) {
      // 防抖处理
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }

      this.scrollTimer = setTimeout(() => {
        const currentScrollY = window.scrollY;

        // 获取轮播元素的位置
        const carouselElement = document.querySelector(".topCarouselDiv");
        if (carouselElement) {
          const rect = carouselElement.getBoundingClientRect();
          // 检查轮播区域是否还在视口中可见
          const isCarouselVisible =
            rect.bottom > 0 && rect.top < window.innerHeight;

          // 只有当轮播区域在视口内时才控制自动播放
          if (
            isCarouselVisible &&
            currentScrollY > 0 &&
            !this.isAutoPlayStopped
          ) {
            // 滚动离开顶部时永久停止自动播放
            this.stopAutoPlayPermanently();
          }
        }
      }, 50);

      // 卖点动画触发逻辑
      var box1 = document.querySelector(".maidian1");
      var box2 = document.querySelector(".maidian2");
      var box3 = document.querySelector(".maidian3");
      var box4 = document.querySelector(".maidian4");
      var box5 = document.querySelector(".maidian5");
      var box6 = document.querySelector(".maidian6");
      var box7 = document.querySelector(".maidian7");
      var box8 = document.querySelector(".maidian8");
      if (box1) {
        var triggerHeight1 = box1.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight1 && !this.maidianshow1) {
          this.maidianshow1 = true;
        }
      }
      if (box2) {
        var triggerHeight2 = box2.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight2 && !this.maidianshow2) {
          this.maidianshow2 = true;
        }
      }
      if (box3) {
        var triggerHeight3 = box3.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight3 && !this.maidianshow3) {
          this.maidianshow3 = true;
        }
      }
      if (box4) {
        var triggerHeight4 = box4.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight4 && !this.maidianshow4) {
          this.maidianshow4 = true;
        }
      }
      if (box5) {
        var triggerHeight5 = box5.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight5 && !this.maidianshow5) {
          this.maidianshow5 = true;
        }
      }
      if (box6) {
        var triggerHeight6 = box6.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight6 && !this.maidianshow6) {
          this.maidianshow6 = true;
        }
      }
      if (box7) {
        var triggerHeight7 = box7.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight7 && !this.maidianshow7) {
          this.maidianshow7 = true;
        }
      }
      if (box8) {
        var triggerHeight8 = box8.offsetTop - window.innerHeight;
        if (window.scrollY - 200 > triggerHeight8 && !this.maidianshow8) {
          this.maidianshow8 = true;
        }
      }
    },

    handleResize() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.loadProductByPageId(sessionStorage.getItem("pageId"));
      }, 200);
    },

    productInfoClick() {
      $bus.$emit("menuRecover", "1");
    },

    getProductInfo(id, client) {
      const productId = Number(id);
      if (Number.isNaN(productId)) return;

      const requestClient = client || (this.$root.isMobile ? "phone" : "web");

      getIndexProductByIndexId({
        id: productId,
        client: requestClient,
      }).then((res) => {
        if (res.status == 200 && Array.isArray(res.data) && res.data.length) {
          this.dataList = res.data;
          const dic = res.data[this.activeIndex] || res.data[0];
          this.productInfoData = dic.productData;
          this.sellingPointsList = dic.sellingPoints;
          this.productId = dic.productConfig?.product_id;

          if (this.dataList.length > 1 && !this.isAutoPlayStopped) {
            this.$nextTick(() => {
              this.startAutoPlay();
            });
          }
        }
      });
    },

    // 轮播切换事件
    carouselChange(active, val) {
      // 检查是否到达最后一张
      if (active === this.dataList.length - 1) {
        this.stopAutoPlayPermanently();
      }

      // 重置卖点动画显示
      this.maidianshow1 = false;
      this.maidianshow2 = false;
      this.maidianshow3 = false;
      this.maidianshow4 = false;
      this.maidianshow5 = false;
      this.maidianshow6 = false;
      this.maidianshow7 = false;
      this.maidianshow8 = false;

      // 更新当前显示的数据
      var dic = this.dataList[active];
      this.productInfoData = dic.productData;
      this.sellingPointsList = dic.sellingPoints;
    },

    brochureBtnAction() {
      this.$refs.dialogPop.openDialog();
    },

    serviceButtonAction() {
      if (this.language === "cn") {
        sessionStorage.setItem("pageId", "service-network");
      } else {
        sessionStorage.setItem("pageId", "sales-inquiry");
      }
      this.$router.push({ path: `/${this.language}/services` });
    },
  },
  beforeDestroy() {
    $bus.$off("pageId");
    if (this.carouselObserver) {
      this.carouselObserver.disconnect();
    }
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("popstate", this.reLoadPage);
    window.removeEventListener("visibilitychange", this.handleVisibilityChange);

    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }

    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }

    if (this.$refs.carousel && this.$refs.carousel.$el) {
      const arrows = this.$refs.carousel.$el.querySelectorAll(
        ".el-carousel__arrow",
      );
      const indicator = this.$refs.carousel.$el.querySelectorAll(
        ".el-carousel__indicators",
      );

      // 清理 bottomImageDivs 的事件
      const carouselItems =
        this.$refs.carousel.$el.querySelectorAll(".el-carousel__item");
      carouselItems.forEach((item) => {
        const bottomDiv = item.querySelector(".bottomImageDiv");
        if (bottomDiv) {
          bottomDiv.removeEventListener("mouseenter", this.stopAutoPlay);
        }
      });

      arrows.forEach((arrow) => {
        arrow.removeEventListener("mouseenter", this.stopAutoPlay);
      });
      indicator.forEach((ind) => {
        ind.removeEventListener("mouseenter", this.stopAutoPlay);
      });
    }
  },
};
</script>

<style scoped lang="less">
:deep(.el-carousel__arrow) {
  width: 200px;
  background-color: transparent;
  border: none;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 1;
}

/* 左箭头 */
:deep(.el-carousel__arrow--left) {
  background-image: url("@{oss-base}/productInfo/icon_fanye备份@2x.png");
}

/* 右箭头 */
:deep(.el-carousel__arrow--right) {
  background-image: url("@{oss-base}/productInfo/icon_fanye@2x.png");
}

/* 隐藏默认的箭头图标 */
:deep(.el-carousel__arrow i) {
  display: none;
}

:deep(.el-carousel__arrow:hover) {
  opacity: 0.5;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #005bac;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #005bac !important;
}
/deep/.el-pagination .el-pager li {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
/deep/ .el-pagination.is-background {
  .btn-prev {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .btn-next {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.productInfo {
  width: 100%;
  .topCarouselDiv {
    height: 100vh;
    width: 100%;

    .carouselItem {
      height: 100vh;
      background-size: cover;
      background-position: center;
      text-align: center;

      .bottomImageDiv {
        position: relative;
        margin-top: calc(100vh - 20.5vw);
        display: flex;
        flex-direction: row;
        justify-content: center;

        .topDivImg {
          margin-left: 0.5vw;
          margin-right: 0.5vw;
          width: 30vw;
        }
      }
    }
  }

  .topDiv {
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    text-align: center;

    .bottomImageDiv {
      position: relative;
      margin-top: calc(100vh - 20.5vw);
      display: flex;
      flex-direction: row;
      justify-content: center;

      .topDivImg {
        margin-left: 0.5vw;
        margin-right: 0.5vw;
        width: 30vw;
      }
    }
  }

  .znygs {
    width: 100%;
    background-color: #001b33;
    padding: 0 10% 100px;
    .title {
      text-align: center;
      padding-top: 3vw;
      font-size: 25px;
    }
    .znygs-img {
      width: 100%;
    }
  }

  .videoDiv {
    width: 100%;
    height: auto;
    position: relative;
    object-fit: contain;
    vertical-align: bottom;
    background-color: #001b33;
  }

  .maidianDiv {
    margin-top: 0px;
    background-color: #001b33;
    padding: 5.2vw 0;
    width: 100%;
    min-height: 100vh;

    .item1 {
      width: 61.45vw;
      height: 16.67vw;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 1vw;

      .leftImage {
        width: 29vw;
        height: 16.3vw;
      }

      .rightTextDiv {
        margin-left: 3.33vw;
        width: 29vw;
        height: 16.3vw;
        padding-left: 4vw;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          margin-bottom: 1vw;
          font-size: 0.9vw;
          color: #ffffff;
          line-height: 1.5vw;
        }

        .text {
          font-size: 0.83vw;
          color: #ffffff;
          line-height: 1.3vw;
          opacity: 0.8;
        }
      }

      .leftTextDiv {
        width: 29vw;
        height: 16.3vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 4vw;

        .title {
          margin-bottom: 1vw;
          font-size: 0.9vw;
          color: #ffffff;
          line-height: 1.5vw;
        }

        .text {
          font-size: 0.83vw;
          color: #ffffff;
          line-height: 1.3vw;
          opacity: 0.8;
        }
      }

      .rightImage {
        margin-left: 3.33vw;
        width: 29vw;
        height: 16.3vw;
      }
    }

    .item2 {
      width: 61.45vw;
      height: 16.67vw;
      margin-top: 0.5vw;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      flex-direction: row;
      justify-content: center;

      .leftTextDiv {
        width: 29vw;
        height: 16.3vw;

        .title {
          margin-top: 5.2vw;
          margin-bottom: 1vw;
          font-size: 1vw;
          color: #ffffff;
          line-height: 1.5vw;
        }

        .text {
          font-size: 0.9vw;
          color: #ffffff;
          line-height: 1.3vw;
        }
      }

      .rightImage {
        margin-left: 3.33vw;
        width: 29vw;
        height: 16.3vw;
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

        color: #ffffff;
        line-height: 1.87vw;
        margin-bottom: 0.5vw;
      }

      .brochureTitle2 {
        font-size: 0.9vw;
        color: #ffffff;
        line-height: 1.4vw;
      }

      .brochureBtn {
        font-size: 0.9vw;
        margin-top: 1vw;
        width: 9.9vw;
        height: 2.6vw;
        background-color: #005bac;
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
      color: #ffffff;
      line-height: 3.54vw;
      text-align: center;
    }

    .title2 {
      font-size: 0.9vw;
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

  .literatureDiv {
    background-color: #001b33;

    .bgDiv {
      width: 61.45vw;
      margin-left: auto;
      margin-right: auto;

      .itemTitle {
        padding-top: 6.25vw;
        font-size: 0.83vw;
        color: #ffffff;
        line-height: 1.25vw;
        margin-bottom: 0.5vw;
      }

      .itemDiv {
        font-size: 0.78vw;
        color: #bababa;
        line-height: 1vw;
        padding-bottom: 0.26vw;
        display: flex;
        flex-direction: row;
      }
      .ql-editor {
        font-size: 0.83vw;
        color: #ffffff;
        line-height: 1.3vw;
        /deep/ span {
          color: #ffffff !important;
          background-color: #001b33 !important;
        }
      }
    }
  }

  .itemBottom {
    background: #001b33 no-repeat right top;
  }

  .topImg1 {
    height: 2.18vw;
    margin-left: auto;
    margin-right: auto;
    padding: 10vh;
    img {
      height: 2vw;
      margin-top: 0.7vw;
    }
    .subtitle {
      font-size: 1vw;
      color: #333333;
      text-align: center;
    }

    .topText1 {
      margin-top: 0.5vw;
      font-size: 1vw;
      color: #333333;
      text-align: center;
    }
  }
}

/* 移动端圆形指示器样式 - 15px */
@media only screen and (max-width: 833px) {
  /deep/ .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
  }
  /deep/ .is-active .el-carousel__button {
    background-color: rgba(255, 255, 255, 0.9);
  }
  /deep/ .el-carousel__arrow {
    width: 20px;
    background-size: contain;
  }
  :deep(.el-carousel__arrow:hover) {
    opacity: 0.8;
  }

  .productInfo {
    .topCarouselDiv .carouselItem,
    .topDiv {
      position: relative;
      .topImg1 {
        .subtitle {
          width: 100%;
          font-size: 16px;
          line-height: 30px;
        }
        .topText1 {
          font-size: 16px;
          line-height: 25px;
        }
        img {
          height: 24px;
        }
      }

      .topText1 {
        font-size: 20px;
        line-height: 30px;
      }

      .subtitle {
        font-size: 20px;
        line-height: 30px;
      }
      .bottomImageDiv {
        position: absolute;
        flex-direction: column;
        bottom: 7vh;
        width: 100%;
        align-items: center;

        .topDivImg {
          width: 80%;
          margin: 10px 0 0 0;
        }
      }
    }

    .videoDiv {
      height: auto;
    }

    .maidianDiv {
      padding: 30px 20px 10px;

      .item1 {
        flex-direction: column;
        height: auto;
        width: 100%;

        &:nth-of-type(even) {
          flex-direction: column-reverse;
        }

        .rightImage,
        .leftImage {
          width: 100%;
          height: auto;
        }

        .rightImage {
          margin: 0;
        }

        .leftTextDiv,
        .rightTextDiv {
          margin: 20px 0 30px;
          padding: 0;
          width: 100%;
          height: auto;

          .title {
            font-size: 12px;
            line-height: 18px;
          }

          .text {
            font-size: 10px;
            line-height: 15px;
          }
        }
      }
    }
    .znygs {
      padding: 20px 5% 50px;
      .title {
        text-align: center;
        margin-bottom: 25px;
        font-size: 14px;
      }
      .ql-editor {
        font-size: 2.5vw;
        color: #ffffff;
        line-height: 6vw;
        /deep/ span {
          color: #ffffff !important;
          background-color: #001b33 !important;
        }
      }
    }
    .brochureDiv {
      height: auto;
      background-image: url("@{oss-base}/productInfo/mk_cpxc@2x.png");
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

    .literatureDiv {
      .bgDiv {
        width: 100%;
        padding: 0 20px;

        .itemDiv,
        .itemTitle {
          font-size: 10px;
          line-height: 15px;
        }
      }
    }
    .ql-editor {
      font-size: 2.5vw !important;
      line-height: 6vw !important;
    }
  }
}
</style>
<style>
.transitionBottomToTop-enter-active {
  animation: slidein 0.6s ease;
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
