<template>
  <div class="MendCondition">
    <div class="allPicDiv">
      <img
        v-if="$root.isMobile"
        class="allPicImage"
        :src="$ossUrl('aesthetics/bg_yyz@3xCn.png')"
        alt=""
      />
      <img
        v-else
        class="allPicImage"
        :src="$ossUrl('aesthetics/bg_magneuro@2x.png')"
        alt=""
      />
    </div>
    <!-- 色素狙击手 -->
    <div class="contentTitle">
      <div class="img1" v-if="!$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2@2x.png')" alt="" srcset="" />
      </div>
      <div class="img1" v-if="$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2@3x.png')" alt="" srcset="" />
      </div>
      <div class="img2">
        <img
          :src="$ossUrl('aesthetics/编组 2备份 4@2x.png')"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="pigment">
      <div>
        <img :src="$ossUrl('aesthetics/编组 6@2x.png')" alt="" srcset="" />
      </div>
      <div class="content pigmentContent">
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">应用领域</div>
          </div>
          <div v-for="(item, index) in pigment1" :key="index">
            <div class="title text cn-bold">{{ item.title }}</div>
            <div class="part text cn-normal">{{ item.part }}</div>
          </div>
        </div>
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">核心优势</div>
          </div>
          <div v-for="(item, index) in pigment2" :key="index">
            <div class="part text cn-normal">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 光速全身 -->
    <div class="contentTitle">
      <div class="img2">
        <img
          :src="$ossUrl('aesthetics/编组 2备份 5@2x.png')"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="speedLight">
      <div class="content">
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">应用领域</div>
          </div>
          <div v-if="!$root.isMobile">
            <div v-for="(item, index) in speedLight1" :key="index">
              <div class="title text cn-normal">{{ item }}</div>
            </div>
          </div>
          <div v-if="$root.isMobile">
            <div v-for="(item, index) in speedLight3" :key="index">
              <div class="title text cn-normal">{{ item }}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">核心优势</div>
          </div>
          <div v-for="(item, index) in speedLight2" :key="index">
            <div class="part text cn-normal">{{ item }}</div>
          </div>
        </div>
      </div>
      <div>
        <img :src="$ossUrl('aesthetics/编组 6备份 4@2x.png')" />
      </div>
    </div>
    <!-- 面面俱到 -->
    <div class="contentTitle">
      <div class="img2">
        <img :src="$ossUrl('aesthetics/编组 2备份 7@2x.png')" />
      </div>
    </div>
    <div class="pigment">
      <div>
        <img :src="$ossUrl('aesthetics/编组 6备份@2x.png')" />
      </div>
      <div class="content face">
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">应用领域</div>
          </div>
          <div v-for="(item, index) in pigment3" :key="index">
            <div class="title text cn-bold">{{ item.title }}</div>
            <div class="part text cn-normal">{{ item.part }}</div>
          </div>
        </div>
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">核心优势</div>
          </div>
          <div v-for="(item, index) in pigment4" :key="index">
            <div class="part text cn-normal">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 双认证减围塑型磁 -->
    <div class="contentTitle">
      <div class="img1" v-if="!$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2备份@2x.png')" alt="" srcset="" />
      </div>
      <div class="img1" v-if="$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2备份@3x.png')" />
      </div>

      <div class="img2">
        <img :src="$ossUrl('aesthetics/编组 8备份 2@2x.png')" />
      </div>
    </div>
    <div class="sculpting frequency">
      <div class="img">
        <img :src="$ossUrl('aesthetics/编组 2备份 3@2x.png')" />
      </div>
      <div class="content">
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">应用领域</div>
          </div>
          <div v-for="(item, index) in sculpting1" :key="index">
            <div class="part text cn-normal">{{ item }}</div>
          </div>
        </div>
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">核心优势</div>
          </div>
          <div v-for="(item, index) in sculpting2" :key="index">
            <div class="part text cn-normal">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 射频机器人 -->
    <div class="contentTitle">
      <div class="img1" v-if="!$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2备份 6@2x.png')" />
      </div>
      <div class="img1" v-if="$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2备份 2@3x.png')" />
      </div>
      <div class="img2">
        <img :src="$ossUrl('aesthetics/编组 8备份@2x.png')" />
      </div>
    </div>
    <div class="sculpting frequency">
      <div class="img">
        <img :src="$ossUrl('aesthetics/编组 9备份@2x.png')" />
      </div>
      <div class="content">
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">应用领域</div>
          </div>
          <div v-if="!$root.isMobile">
            <div v-for="(item, index) in frequency1" :key="index">
              <div class="part text cn-normal">{{ item }}</div>
            </div>
          </div>
          <div v-if="$root.isMobile">
            <div v-for="(item, index) in frequency3" :key="index">
              <div class="part text cn-normal">{{ item }}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="content-main-title">
            <div class="main-title"></div>
            <div class="text cn-bold">核心优势</div>
          </div>
          <div v-for="(item, index) in frequency2" :key="index">
            <div class="part text cn-normal">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AestheticsCN",
  data() {
    return {
      pigment1: [
        { title: "浅层色素", part: "雀斑，老年斑，扁平疣的治疗" },
        { title: "深层色素", part: "黄褐斑，太田痣等深层色素的治疗" },
        { title: "去除纹身", part: "纹身、纹眉、唇线等" },
      ],
      pigment2: [
        "集成1064nm与532nm双波长系统， 搭配250ps超短脉宽，可精准粉碎不同深度的黑色素",
        "独有电动变焦手具，能智能调节光斑大小，显著提升色素清除效率",
      ],
      speedLight1: ["身体嫩肤", "全身提亮肤色", "痤疮", "面部细纹改善"],
      speedLight2: [
        "全球首款集成自研的“4V”模块，可实时感知手具移动速度并自动调节出光频率，确保光能均匀、连续覆盖治疗区域，高效轻松出光",
        "结合高精度皮肤检测装置与智能分析算法，系统能实时识别肤质并自动匹配个性化参数，从而实现安全且舒适的皮肤外观综合改善治疗",
      ],
      speedLight3: ["身体嫩肤，全身提亮肤色，痤疮，面部细纹改善"],
      pigment3: [
        {
          title: "血管性疾病",
          part: "毛细血管扩张症（红血丝），玫瑰痤疮，蜘蛛痣等",
        },
        { title: "色素性疾病", part: "黄褐斑，太田痣等深层色素的治疗" },
      ],
      pigment4: [
        "高精度的能量校准系统，有效克服元件老化导致的能量衰减，确保每一发光斑的实际输出能量均误差＜5%",
        "配备宽谱与窄谱多组滤光片，宽谱光全面改善肤质、提亮肤色；窄谱光精准靶向色素与血管",
        "通过层次化能量递送，实现从表皮到真皮的多维度、个性化综合美肤治疗",
      ],
      sculpting1: [
        "针对腹部、臀部等多个身体部位实现精准减围与塑形",
        "作用于腹部时，通过诱导肌肉超强收缩，高效燃烧脂肪、紧致腹壁",
        "作用于臀部时，则能有效刺激深层肌群，提升臀线、优化轮廓曲线",
        "通过刺激运动神经元诱导肌肉收缩，用于腹部减围塑形",
      ],
      sculpting2: [
        "国内首款同时获得中国NMPA与美国FDA双重认证的磁刺激减围塑形系统",
        "专属设计的聚焦线圈，可输出高强度电磁能量",
        "结合实时肌肉状态监测与智能强度调节技术，能确保治疗的安全与高效",
        "个性化的“3M”塑形方案，提供非侵入性的精准减围与长效形体优化方案",
      ],
      frequency1: [
        "阴道松弛",
        "压力性尿失禁",
        "增强阴道收缩功能",
        "提高女性性功能指数",
        "治疗女性性功能障碍",
      ],

      frequency2: [
        "机器人自动化操作，12路实时温控，专业化的电极设计",
        "对治疗部位的精准可控的深层加热，从而快速提升紧致度与支撑力，有效改善盆底功能，提升女性性功能，提高女性性功能指数 ",
        "为女性私密健康保驾护航",
      ],
      frequency3: [
        "阴道松弛，压力性尿失禁，增强阴道收缩功能，提高女性性功能指数，治疗女性性功能障碍",
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.MendCondition {
  .allPicDiv {
    .allPicImage {
      width: 100%;
    }
  }

  .contentTitle {
    .img1 {
      padding: 3vw 24vw 0;
    }
    .img2 {
      padding: 1vw 40vw 0;
    }
    img {
      width: 100%;
    }
  }
  .pigment {
    padding: 3vw 10vw 10vw;
    display: grid;
    grid-template-columns: 45vw 20vw;
    grid-column-gap: 10vw;
    div {
      img {
        width: 100%;
      }
    }
    .pigmentContent {
      margin: auto 0;
    }
    .face {
      margin: 0 0 2vw;
    }
    .content {
      .content-main-title {
        width: 140px;
        height: 50px;
        position: relative;
        margin-top: 60px;
        .main-title {
          width: 160px;
          height: 20px;
          background: linear-gradient(
            90deg,
            rgba(0, 91, 172, 0.6) 0%,
            rgba(0, 91, 172, 0) 100%
          );
          border-radius: 2px;
        }
        .text {
          position: absolute;
          font-size: 30px;
          right: 0;
          top: -25px;
        }
      }

      .title {
        font-size: 20px;
        height: 30px;
        margin: 15px 0 0 0;
      }
      .part {
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 25px;
        font-weight: 400;
      }
    }
  }
  .speedLight {
    padding: 5vw 10vw 10vw;
    display: grid;
    grid-template-columns: 25vw 40vw;
    grid-column-gap: 10vw;
    div {
      img {
        width: 100%;
      }
    }
    .content {
      margin: auto 0;

      .content-main-title {
        width: 140px;
        height: 50px;
        position: relative;
        margin-top: 60px;

        .main-title {
          width: 160px;
          height: 20px;
          background: linear-gradient(
            90deg,
            rgba(0, 91, 172, 0.6) 0%,
            rgba(0, 91, 172, 0) 100%
          );
          border-radius: 2px;
        }
        .text {
          position: absolute;
          font-size: 30px;
          right: 0;
          top: -25px;
        }
      }
      .title {
        font-size: 16px;
        line-height: 25px;
      }
      .part {
        font-size: 16px;
        line-height: 25px;
        margin-bottom: 15px;
      }
    }
  }

  .sculpting {
    padding: 5vw 10vw 5vw;
    display: grid;
    grid-template-columns: 30vw 30vw;
    grid-column-gap: 20vw;
    border-radius: 8px;
    margin: 0 3vw;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 48%;
      transform: translateY(-50%);
      width: 100%;
      height: 60%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      z-index: -1;
    }

    div {
      img {
        width: 100%;
      }
    }
    .content {
      margin: auto 0;
      .content-main-title {
        width: 140px;
        height: 50px;
        position: relative;
        margin-top: 50px;
        .main-title {
          width: 160px;
          height: 20px;
          background: linear-gradient(
            90deg,
            rgba(0, 91, 172, 0.6) 0%,
            rgba(0, 91, 172, 0) 100%
          );
          border-radius: 2px;
        }
        .text {
          position: absolute;
          font-size: 30px;
          right: 0;
          top: -25px;
        }
      }
    }

    .part {
      font-size: 16px;
      line-height: 25px;
      margin-bottom: 15px;
    }
  }
  .footer {
    width: 95vw;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 833px) {
  .MendCondition {
    .allPicDiv {
      padding: 0;
    }
    .contentTitle {
      .img1 {
        padding: 15vw 10vw 0;
      }
      .img2 {
        padding: 2vw 30vw 0;
      }
      img {
        width: 100%;
      }
    }
    .pigment {
      display: flex;
      flex-direction: column;
      .content {
        width: 100%;

        .content-main-title {
          margin-top: 60px;
          width: 86px;
          height: 28px;
          .text {
            font-size: 18px;
            top: -14px;
          }
        }
        .title {
          margin-top: 0;
          font-size: 14px;
          height: 20px;
        }
        .part {
          font-size: 14px;
          margin-bottom: 10px;
          opacity: 0.9;
        }
      }
    }

    .frequency {
      padding: 0;
    }
    .sculpting {
      padding: 3vw;
      display: flex;
      flex-direction: column;
      /* 高度居中、宽度铺满的背景 */
      .img {
        padding: 7vw;
        img {
          width: 100%;
        }
      }
      &::before {
        background: #001b33;
      }
      .content {
        background: rgba(255, 255, 255, 0.1);
        padding: 7vw;
        .content-main-title {
          margin-top: 60px;
          width: 86px;
          height: 28px;
          .text {
            font-size: 18px;
            top: -14px;
          }
        }
        .title {
          margin-top: 0;
          font-size: 14px;
          height: 20px;
        }
        .part {
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
    }
    .speedLight {
      display: flex;
      flex-direction: column-reverse;
      .content {
        width: 100%;
        .content-main-title {
          margin-top: 60px;
          width: 86px;
          height: 28px;
          .text {
            font-size: 18px;
            top: -14px;
          }
        }
        .title {
          margin-top: 0;
          font-size: 14px;
          height: 18px;
          opacity: 0.9;
        }
        .part {
          font-size: 14px;
          margin-bottom: 10px;
          opacity: 0.9;
        }
      }
    }
    .content {
      width: 100%;

      .content-main-title {
        margin-top: 60px;
        width: 86px;
        height: 28px;
        .text {
          font-size: 18px;
          top: -14px;
        }
      }
      .title {
        margin-top: 0;
        font-size: 16px;
        height: 18px;
      }
      .part {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
