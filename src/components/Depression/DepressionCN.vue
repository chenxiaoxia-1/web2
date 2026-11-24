<template>
  <div class="MendCondition">
    <div class="contentPart1">
      <div class="title1 text"><span>我们帮助的是谁</span></div>
      <div class="textPart1 text">
        我们主要面向经规范抗抑郁药物治疗后<span>疗效不足</span>，或因<span>药物副作用</span>难以长期坚持治疗的<span>抑郁症患者</span>。
      </div>
      <div class="textPart text"><span>抗抑郁药的局限性</span></div>
      <div class="textPart2">
        <div>
          <img
            :src="$ossUrl('depression/编组 19.png')"
            alt=""
            style="width: 100%"
          />
          <div class="words">
            迄今为止规模最大的重度抑郁症前瞻性临床试验--STAR*D研究表明，患者每次尝试新的药物治疗后，病情缓解的几率都会降低。
          </div>
        </div>
        <div>
          <img
            :src="$ossUrl('depression/编组 19备份 2@2x.png')"
            alt=""
            style="width: 100%"
          />
          <div class="words">
            STAR*D
            研究还表明，因副作用而停用抗抑郁药的概率随着药物尝试次数的增加而增加。
          </div>
        </div>
      </div>
      <div class="textPart3 text">
        <div>
          <span>经颅磁刺激（TMS）</span>
          作为一种非药物、非侵入式的物理治疗方式
        </div>
        <div>为抑郁症患者提供了药物治疗之外的<span>另一种治疗选择</span></div>
      </div>
    </div>
    <div class="contentPart2">
      <img
        v-if="!$root.isMobile"
        :src="$ossUrl('depression/编组 19(1).png')"
        alt=""
        srcset=""
      />
      <img
        v-else
        :src="$ossUrl('depression/编组 19@2x(1).png')"
        alt=""
        srcset=""
      />
    </div>
    <div class="contentPart2-title">
      <div class="title1 text"><span>经典经颅磁-rTMS</span></div>
      <div class="textPart1 text">
        经颅磁刺激（TMS）是一种经 FDA
        批准、具有循证医学证据支持的非药物、非侵入式神经调控技术
      </div>
      <div class="contentPart3">
        <div class="contentPart-img">
          <img
            class="title1 text"
            :src="$ossUrl('depression/编组7.png')"
            alt=""
          />
        </div>
        <div class="textPart text">主流临床应用，稳定可靠 10 年寿命</div>
      </div>
    </div>

    <div class="contentPart5">
      <img
        :src="$ossUrl('depression/20260210-134658.png')"
        alt=""
        class="rightImg"
      />
      <div v-for="(item, index) in dataList2" :key="index" class="itemFive">
        <div class="title1 text">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="contentPart2-title">
      <div class="title1 text">
        <span>精准经颅磁-精准rTMS</span>
      </div>

      <div class="contentPart3">
        <div class="contentPart-img">
          <img
            class="title1 text"
            :src="$ossUrl('depression/编组 12@2x.png')"
            alt=""
          />
        </div>
        <div class="textPart text">与SAINT同行，有你，有ONE</div>
        <div class="textPart text">
          剂量精准、定位精准、刺激精准，完美适配 SNT
        </div>
      </div>
    </div>

    <div class="contentPart6">
      <img :src="$ossUrl('depression/编组 4@2x.png')" alt="" class="leftImg" />
      <div v-for="(item, index) in dataList1" :key="index" class="itemFive">
        <div class="title1 text">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="contentPart2-title">
      <div class="title1 text">
        <span>深部经颅磁-Deep TMS</span>
      </div>
      <div class="textPart1 text">
        抑郁症不仅涉及表层皮质（如
        DLPFC），还与深层皮层下结构和功能网络失衡相关，包括前扣带皮层、岛叶、海马和边缘系统。
      </div>
      <div class="textPart1 text">
        传统 TMS 受磁场衰减限制，难以直接作用深层脑区，部分患者疗效有限
      </div>
      <div class="contentPart3">
        <div class="contentPart-img">
          <img
            class="title1 text"
            :src="$ossUrl('depression/编组 7备份@2x.png')"
            alt=""
          />
        </div>
        <div class="textPart text">全球经颅磁治疗的“双金标准”之一</div>
        <div class="textPart text">
          深部抑郁磁刺激 -- 每次稳定覆盖 DLPFC，直达抑郁神经环路
        </div>
      </div>
    </div>

    <div class="contentPart7">
      <img
        :src="$ossUrl('depression/编组 4@2x(1).png')"
        alt=""
        class="rightImg"
      />
      <div class="itemFive">
        <div class="title1 text">
          BrainsWay 是全球深部经颅磁的引领者。其 Deep TMS 系统于 2013 年获得 FDA
          批准，是首个获批的深部 TMS
          系统。专业线圈设计产生更深、更广的磁场，同时覆盖浅层皮质和深层脑网络，激活调节情绪和认知的多个功能回路
        </div>
        <div class="title1 text">
          临床研究显示，在 1,351 名重度抑郁症患者的多中心分析中，完成 30 次 Deep
          TMS 治疗后，约 65.3% 的患者达到症状缓解（remission）。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DepressionCN",
  data() {
    return {
      dataList1: [
        "Neuronetics 是精准 rTMS 的开创者。其 NeuroStar 系统通过解剖标志和线圈标准定位，对左背外侧前额叶（L-DLPFC）实现精准、可重复刺激。研究显示，每日一次，4–6 周治疗后约 62% 的患者症状缓解",
        "斯坦福大学于 2022 年提出 SNT（SAINT）精准加速经颅磁疗法，结合功能性 MRI 个体化靶点定位和高密度 iTBS 加速刺激，将治疗周期缩短至 5 天每日 10 次，研究显示 约 80% 的重度抑郁症患者在一周内显著缓解，并获得 FDA 重大技术突破（Breakthrough Device）认定",
      ],
      dataList2: [
        "2008 年，FDA 批准经颅磁刺激用于治疗成人重度抑郁障碍（Major Depressive Disorder, MDD），适用于在当前发作中至少接受过一次足量、足疗程抗抑郁药物治疗仍未获得满意改善的患者",
        "在此基础上，标准 rTMS 治疗方案逐步形成并广泛应用。该方案通常采用固定刺激参数和标准化治疗流程，单次治疗时间约 18.8–37.5 分钟，强调治疗过程的规范性、可重复性及临床可及性，成为抑郁症经颅磁治疗的经典路径",
        "2018 年：MagVenture 首次获得 FDA 批准，将 iTBS 模式用于重度抑郁症治疗，进一步丰富了标准 rTMS 的治疗选择",
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.MendCondition {
  background: #001b33 no-repeat right top;

  .contentPart1 {
    width: 100%;
    height: 1225px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("@{oss-base}/depression/pexels-malachi-cowie.png");
    .title1 {
      padding: 120px 0 70px;
      font-size: 45px;
    }
    .textPart1 {
      height: 3vw;
      font-size: 30px;
      opacity: 0.9;
    }
    .textPart {
      font-size: 40px;
      width: 80vw;
      margin: 3vw auto;
    }
    .textPart3 {
      font-size: 40px;
      width: 80vw;
      margin: 3vw auto;
    }
    .textPart2 {
      display: flex;
      margin: 0 auto;
      justify-content: space-around;

      .words {
        margin-top: 30px;
        font-size: 16px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
        font-style: normal;
      }

      > div {
        width: 36.5vw;
      }
    }
  }

  .contentPart2 {
    width: 100%;
    padding: 6vw 6vw 0;
    img {
      width: 100%;
    }
  }
  .contentPart2-title {
    padding: 8vw;
    .title1 {
      font-size: 45px;
    }
    .textPart {
      font-size: 30px;
    }
    .textPart1 {
      font-size: 20px;
      margin: 0 auto;
    }
    .contentPart3 {
      padding: 0 14vw;
      .contentPart-img {
        width: 18vw;
        margin: 5vw auto 0;
        img {
          width: 100%;
          object-fit: contain;
        }
      }
      .textPart {
        font-size: 20px;
        margin: 0 auto;
      }
      .textPart1 {
        display: flex;
        justify-content: space-between;

        .leftImg {
          height: 1000px;
        }
      }
    }
  }

  .contentPart5 {
    padding: 0 8.9vw;
    position: relative;
    margin-top: 4vw;

    .itemFive {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      margin-top: 2vw;
      padding: 3vw 0 60px 5vw;

      .title1 {
        width: 35vw;
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 20px;
        text-align: left;
        line-height: 24px;
      }
    }

    .rightImg {
      position: absolute;
      width: 25vw;
      right: 15vw;
      top: -8vw;
    }
  }
  .contentPart6 {
    padding: 0 8.9vw;
    position: relative;
    margin-top: 20vw;

    .itemFive {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      margin-top: 2vw;
      padding: 3vw 0 60px 8vw;

      .title1 {
        width: 36vw;
        font-size: 18px;
        line-height: 18px;
        margin-left: 35vw;
        text-align: left;
        line-height: 24px;
      }
    }

    .leftImg {
      position: absolute;
      left: 8vw;
      top: -25vw;
      width: 50vw;
    }
  }
  .contentPart7 {
    padding: 0 8.9vw;
    position: relative;
    margin-top: 15vw;
    margin-bottom: 10vw;

    .itemFive {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      margin-top: 2vw;
      padding: 10vw 0 10vw 5vw;

      .title1 {
        width: 35vw;
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 20px;
        text-align: left;
        line-height: 24px;
      }
    }

    .rightImg {
      position: absolute;
      width: 50vw;
      right: 5vw;
      top: -18vw;
    }
  }
  .text {
    font-style: normal;
    text-align: center;
    color: #ffffff;
    font-family: SourceHanSansCN-Light;
    span {
      font-family: SourceHanSansCN-Bold;
    }
  }
}

@media only screen and (max-width: 833px) {
  .MendCondition {
    .contentPart1 {
      background-image: url("@{oss-base}/depression/pexels-malachi-cowie-@2x.png");
      height: auto;
      .title1 {
        font-size: 22px;
        font-family: SourceHanSansCN-Normal;
        padding: 35px;
      }
      .textPart1 {
        font-size: 12px;
        font-family: SourceHanSansCN-Normal;
        height: auto;
        line-height: 18px;
        text-align: left;
        padding: 0 20px;
      }
      .textPart {
        font-size: 22px;
        font-family: SourceHanSansCN-Normal;
        text-align: center;
        margin: 15px auto;
      }
      .textPart2 {
        flex-direction: column;
        padding: 0 20px;

        > div {
          width: 100%;
        }

        .words {
          font-size: 12px;
          padding: 20px;
          line-height: 15px;
          margin: 0;

          > div {
            font-size: 12px;
            margin-bottom: 6px;
          }
        }
      }
      .textPart3 {
        text-align: left;
        font-size: 22px;
        margin-bottom: 25px;
      }
    }
    .contentPart2-title {
      width: 100vw;

      .contentPart3 {
        margin: 0 auto;
        .contentPart-img {
          width: 50vw;
        }
        .title1 {
          padding-top: 35px;
          width: 50vw;
          padding-bottom: 0;
          margin-bottom: 0;
        }
        .textPart {
          padding: 0;
          font-size: 12px;
          font-family: SourceHanSansCN-Normal;
        }
      }
      .title1 {
        font-size: 18px;
        font-family: SourceHanSansCN-Normal;
        margin-bottom: 15px;
      }
      .textPart1 {
        font-size: 12px;
        font-family: SourceHanSansCN-Normal;
      }
    }
    .contentPart2 {
      padding: 20px;
    }

    .contentPart5 {
      margin-top: 20px;

      .rightImg {
        position: static;
        transform: translate(60%, 0px);
        width: 50%;
        margin-bottom: 25px;
      }

      .itemFive {
        margin: 0;
        padding: 20px;

        .title1 {
          font-size: 12px;
          line-height: 18px;
          margin: 0px;
          width: 100%;
          padding: 0px;
        }
      }
    }

    .contentPart6 {
      margin-top: 20px;

      .leftImg {
        position: static;
        transform: translate(20%, 0px);
        width: 80%;
        margin-bottom: 25px;
      }

      .itemFive {
        margin: 0;
        padding: 20px;

        .title1 {
          font-size: 12px;
          line-height: 18px;
          margin: 0px;
          width: 100%;
          padding: 0px;
        }
      }
    }
    .contentPart7 {
      margin-top: 20px;

      .rightImg {
        position: static;
        transform: translate(20%, 0px);
        width: 80%;
        margin-bottom: 25px;
      }

      .itemFive {
        margin: 0;
        padding: 20px;
        text-align: left;

        .title1 {
          font-size: 12px;
          line-height: 18px;
          margin: 0px;
          width: 100%;
          padding: 0px;
        }
      }
    }
  }
}
</style>
