<template>
  <div class="floor-carousel-container">
    <div class="floor-carousel">
      <div class="floor-carousel__stage">
        <div class="floor-carousel__side floor-carousel__side--prev">
          <div class="carousel-slide carousel-slide--side">
            <img
              v-if="loadedIndexes[prevIndex]"
              :src="imgList[prevIndex].img"
              :alt="imgList[prevIndex].name"
              decoding="async"
            />
            <div
              v-else
              class="carousel-slide__placeholder"
              aria-hidden="true"
            />
            <div class="carousel-slide__mask" aria-hidden="true" />
          </div>
          <button
            type="button"
            class="floor-carousel__arrow floor-carousel__arrow--left"
            aria-label="上一张"
            @click="goPrev"
          />
        </div>

        <div class="floor-carousel__gap" aria-hidden="true" />

        <div class="floor-carousel__center">
          <div class="carousel-slide carousel-slide--active">
            <img
              v-if="loadedIndexes[activeIndex]"
              :src="imgList[activeIndex].img"
              :alt="imgList[activeIndex].name"
              decoding="async"
            />
            <div
              v-else
              class="carousel-slide__placeholder"
              aria-hidden="true"
            />
            <div class="img-desc">
              {{ imgList[activeIndex].name }}
            </div>
          </div>
        </div>

        <div class="floor-carousel__gap" aria-hidden="true" />

        <div class="floor-carousel__side floor-carousel__side--next">
          <div class="carousel-slide carousel-slide--side">
            <img
              v-if="loadedIndexes[nextIndex]"
              :src="imgList[nextIndex].img"
              :alt="imgList[nextIndex].name"
              decoding="async"
            />
            <div
              v-else
              class="carousel-slide__placeholder"
              aria-hidden="true"
            />
            <div class="carousel-slide__mask" aria-hidden="true" />
          </div>
          <button
            type="button"
            class="floor-carousel__arrow floor-carousel__arrow--right"
            aria-label="下一张"
            @click="goNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
export default {
  name: "FloorPlan",
  data() {
    return {
      activeIndex: 0,
      loadedIndexes: {},
      imgList: [
        {
          img: ossUrl("FloorPlan/1伟思无限大楼.jpg"),
          name: "夕阳下的伟思",
        },
        {
          img: ossUrl("talentDevelopment/1中庭.jpg"),
          name: "Plaza",
        },
        {
          img: ossUrl("FloorPlan/3水院.jpg"),
          name: "有一水院",
        },
        {
          img: ossUrl("FloorPlan/2树院.jpg"),
          name: "无二草坪",
        },
        {
          img: ossUrl("FloorPlan/1员工餐厅.jpg"),
          name: "人间有味是清欢-有味餐厅",
        },
        {
          img: ossUrl("FloorPlan/4篮球场.jpg"),
          name: "篮球场&GYM",
        },
        {
          img: ossUrl("FloorPlan/4Glazer Hall.jpg"),
          name: "Glazer Hall",
        },
        {
          img: ossUrl("FloorPlan/2办公区域.jpg"),
          name: "Office",
        },
      ],
    };
  },
  computed: {
    prevIndex() {
      const len = this.imgList.length;
      return (this.activeIndex - 1 + len) % len;
    },
    nextIndex() {
      return (this.activeIndex + 1) % this.imgList.length;
    },
  },
  created() {
    this.preloadAround(0);
  },
  methods: {
    goPrev() {
      this.setActiveIndex(this.prevIndex);
    },
    goNext() {
      this.setActiveIndex(this.nextIndex);
    },
    setActiveIndex(index) {
      this.activeIndex = index;
      this.preloadAround(index);
    },
    preloadAround(index) {
      const len = this.imgList.length;
      [index - 1, index, index + 1, index + 2].forEach((currentIndex) => {
        const normalized = ((currentIndex % len) + len) % len;
        this.$set(this.loadedIndexes, normalized, true);
      });
    },
  },
};
</script>

<style scoped lang="less">
/* 16:9 主图区 80vw，容器高 70vh；width 100% 避免横向滚动 */
@carousel-h: 70vh;
@center-w: 80vw;

.floor-carousel-container {
  width: 100%;
  max-width: 100%;
  height: @carousel-h;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: visible;
}

.floor-carousel {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.floor-carousel__stage {
  display: grid;
  grid-template-columns: 1fr 2vw @center-w 2vw 1fr;
  align-items: stretch;
  height: @carousel-h;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
  position: relative;
}

.floor-carousel__side,
.floor-carousel__center,
.floor-carousel__gap {
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.floor-carousel__side {
  position: relative;
  overflow: visible;
}

.floor-carousel__center,
.floor-carousel__gap {
  overflow: hidden;
}

.floor-carousel__gap {
  width: 2vw;
}

.floor-carousel__center {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.06);
  }

  &__mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    pointer-events: none;
    z-index: 2;
  }
}

/* 中间主图：16:9，完整展示不拉伸，高度不超过 70vh */
.carousel-slide--active {
  width: 100%;
  max-width: @center-w;
  aspect-ratio: ~"16 / 9";
  max-height: @carousel-h;
  height: auto;
  background: #0a1628;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);

  img {
    object-fit: contain;
    object-position: center;
  }
}

/* 左右预览：与主图等高铺满侧栏，裁剪露边 + 蒙层 */
.carousel-slide--side {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: center;
    transform: scale(1.02);
  }
}

.img-desc {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 24px;
  background: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  box-sizing: border-box;
  z-index: 2;
}

.floor-carousel__arrow {
  position: absolute;
  top: 50%;
  z-index: 20;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.5;
  }
}

/* 左箭头：贴在左侧预览图右缘（靠中间） */
.floor-carousel__side--prev .floor-carousel__arrow--left {
  right: 0;
  left: auto;
  transform: translate(50%, -50%);
  background-image: url("@{oss-base}/productInfo/icon_fanye备份@2x.png");
}

/* 右箭头：贴在右侧预览图左缘（靠中间） */
.floor-carousel__side--next .floor-carousel__arrow--right {
  left: 0;
  right: auto;
  transform: translate(-50%, -50%);
  background-image: url("@{oss-base}/productInfo/icon_fanye@2x.png");
}

@media only screen and (max-width: 833px) {
  /* 移动端主图 80vw×16:9 高度 45vw，上限 70vh；左右与主图同高（PC 不变） */
  @mobile-slide-h: 45vw;

  .floor-carousel-container {
    height: @mobile-slide-h;
    max-height: @carousel-h;
  }

  .floor-carousel__stage {
    grid-template-columns: 1fr 2vw 80vw 2vw 1fr;
    height: 100%;
    align-items: stretch;
  }

  .floor-carousel__center {
    align-items: stretch;
  }

  .carousel-slide--active {
    height: 100%;
    max-height: 100%;
  }

  .carousel-slide--side {
    height: 100%;
  }

  .img-desc {
    padding: 8px 12px;
    font-size: 12px;
  }

  .floor-carousel__arrow {
    width: 20px;
    height: 20px;
  }

  .floor-carousel__arrow:hover {
    opacity: 0.8;
  }
}
</style>
