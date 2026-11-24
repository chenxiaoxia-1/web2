<template>
  <div class="MendCondition">
    <PageTopBanner
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      language="en"
      title="STROKE"
    />
    <div class="solutions-title">Who We Help?</div>
    <div class="contentPart">
      <div class="content">
        Stroke is one of the world‘s leading causes of long-term motor,
        cognitive, and language impairment
      </div>
      <div class="content">
        For many patients, conventional rehabilitation reaches a plateau:
        spasticity persists, fine motor skills fail to return, cognitive and
        language gains are slow, and chronic pain remains – limiting independent
        living and social reintegration
      </div>
      <div class="content">
        There is a growing clinical need for a safe, non-invasive
        neuromodulation approach that enhances conventional stroke
        rehabilitation
      </div>
      <div class="content">
        Today, TMS is increasingly used in stroke rehabilitation, with strong
        evidence supporting its value in motor, language, cognitive, and pain
        management
      </div>
    </div>
    <div class="solutions-title">Why TMS ?</div>
    <div class="TMS-Protocol">
      <div class="en-bold">
        2019 – IFCN guidelines supported rTMS for post-stroke motor
        rehabilitation
      </div>
      <div>
        <span class="en-bold">Protocol: </span>1 Hz rTMS over contralesional M1
        for upper limb motor recovery (Level A evidence)
      </div>
      <div class="en-bold expanding">
        2019 – Expanding applications in stroke rehabilitation
      </div>
      <div v-for="(item, index) in TMSList" :key="index">
        <div>
          <span class="en-bold">{{ item.content }}</span
          >{{ item.protocol }}
        </div>
      </div>
    </div>
    <div class="solutions-title">How TMS Works?</div>
    <div class="contentPart3">
      <div class="tmsWorkPart">
        <div class="tmsWorkImg">
          <img :src="$ossUrl('stroke/20260624-091237@2x.png')" alt="" />
        </div>
        <div class="tmsWorkContent">
          <div v-for="(item, index) in tmsWork" :key="index">
            <div class="tmsTitle">{{ item.title }}</div>
            <div v-for="(ite, idx) in item.content" :key="idx">
              <div class="tmsContent">
                {{ ite }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="(item, index) in tmsConventional"
        :key="index"
        class="tmsConventional"
      >
        <div class="tmsTitle">{{ item.title }}</div>
        <div v-for="(ite, idx) in item.content" :key="idx">
          <div class="tmsContent">
            {{ ite }}
          </div>
        </div>
      </div>
    </div>
    <div class="solutions-title">Stroke Solutions</div>
    <div class="productInfo-img">
      <div class="img-title">
        <div class="title-img">
          <img :src="$ossUrl('depression/编组 7.png')" />
        </div>
        <div class="title">Conventional TMS</div>
        <div class="part-title">
          The Legacy TMS System for Clinical Practice Proven since 2016. Built
          for reliability
        </div>
        <div class="productInfo-image">
          <img :src="$ossUrl('depression/20260210-134658.png')" />
        </div>
      </div>
    </div>
    <systemBottom :language="language" class="itemBottom" />
    <dialogPop :language="language" ref="dialogPop" />
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import systemBottom from "../components/systemBottom.vue";
import dialogPop from "./dialogPop.vue";
import PageTopBanner from "../components/PageTopBanner.vue";

export default {
  name: "stroke",
  components: {
    systemBottom,
    dialogPop,
    PageTopBanner,
  },
  data() {
    return {
      language: "en",
      bgImage: ossUrl("depression/bg_yyz.png"),
      bgImage2: ossUrl("depression/bg_yyz@3x.png"),
      strokeData: [
        {
          title: "· Motor recovery",
          content: `Passive/active range-of-motion training offers limited effect on central
        spasticity or motor plateau; relies on patient cooperation, limiting use
        in patients with impaired consciousness or cognition`,
        },
        {
          title: "· Speech recovery ",
          content: `Local muscle-oriented training progresses slowly in severe aphasia, with modest long-term outcomes`,
        },
        {
          title: "· Cognitive recovery",
          content: `Routine attention/memory training is time-consuming with variable results; limited benefit in moderate-to-severe impairment`,
        },
        {
          title: "· Pain management",
          content: `Conventional electrotherapy lacks depth and focality;
           pharmacotherapy carries risks of tolerance and dependency`,
        },
      ],
      tmsWork: [
        {
          title: "Restoring Interhemispheric Balance",
          content: [
            `Stroke disrupts the normal balance of excitability between the two cerebral hemispheres. The ipsilesional (affected) cortex becomes hypoactive, while the contralesional (intact) cortex becomes relatively hyperactive, which further impairs functional recovery`,
            `Low‑frequency (≤1 Hz) rTMS applied to the contralesional cortex reduces its overactivity, whereas high‑frequency (≥5 Hz) rTMS over the ipsilesional cortex increases its excitability. Together, these approaches help rebalance interhemispheric inhibition and create more favorable conditions for motor and language recovery`,
          ],
        },
        {
          title: "Neuroplastic Effects",
          content: [
            `TMS over M1 modulates corticospinal tract excitability and promotes long‑term potentiation (LTP)-like plasticity. It also reshapes neural network connectivity, improving the efficiency of motor‑sensory‑cognitive loops`,
          ],
        },
      ],
      tmsConventional: [
        {
          title: "Conventional TMS",
          content: [
            `In standard post‑stroke rehabilitation, low‑frequency (1 Hz) rTMS is typically used. A usual course consists of 10 to 20 sessions, each lasting 20 to 40 minutes`,
            `Extensive randomized controlled trials and real‑world evidence support the use of TMS in post‑stroke motor rehabilitation, Parkinson‘s disease, neuropathic pain, and other conditions. TMS is well suited for routine clinical rehabilitation settings, particularly for stroke patients`,
          ],
        },
      ],
      TMSList: [
        { content: "Motor Recovery:", protocol: " HF-rTMS targeting M1" },
        {
          content: "Aphasia:",
          protocol: " 1 Hz rTMS targeting right inferior frontal gyrus",
        },
        {
          content: "Dysphagia:",
          protocol: " rTMS targeting pharyngeal motor cortex",
        },
        {
          content: "Cognitive Impairment:",
          protocol: " HF-rTMS/iTBS targeting DLPFC",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.MendCondition {
  background: #001b33 no-repeat right top;

  .contentPart {
    width: 76vw;
    margin: 0 auto;
    font-family: Roboto-Regular;
    font-size: 1vw;

    .content {
      line-height: 30px;
    }
  }
  .TMS-Protocol {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 40px 60px;
    border-radius: 10px;
    line-height: 35px;
    .expanding {
      margin-top: 30px;
    }
  }
  .contentPart3 {
    margin: 0 auto;
    width: 76vw;
    font-size: 1vw;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    margin-bottom: 5vw;
    .tmsWorkPart {
      display: flex;
      justify-content: space-between;
      .tmsWorkImg {
        height: 20vw;
        img {
          height: 100%;
          object-fit: contain;
        }
      }
      .tmsWorkContent {
        font-size: 1vw;
        width: 50vw;
        height: 20vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .tmsConventional {
      margin-top: 150px;
    }
    .tmsTitle {
      font-size: 1vw;
      font-family: Roboto-Bold;
      padding-bottom: 30px;
    }
    .tmsContent {
      font-size: 1vw;
      padding-bottom: 20px;
      font-family: Roboto-Regular;
    }
  }

  .productInfo-img {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    width: 76vw;
    padding: 3vw;
    margin: 0 auto;
    border-radius: 15px;

    .img-title {
      display: flex;
      flex-direction: column;

      border-radius: 8px;
      padding: 3vw;
      font-family: Roboto-Regular;
      .title-img {
        width: 16vw;
        margin: 0 auto;
        height: 2vw;
        img {
          object-fit: contain;
        }
      }
      .title {
        font-size: 1vw;
      }
      .productInfo-image {
        height: 20vw;
        img {
          height: 100%;
        }
      }
      .part-title {
        padding: 0 10%;
        font-size: 0.8vw;
        margin-top: 1vw;
        height: 4vw;
      }
    }
  }
}
@media only screen and (max-width: 833px) {
  .MendCondition {
    .contentPart {
      height: auto;
      margin-bottom: 25px;
      width: 90vw;

      .content {
        font-size: 12px;
        margin-bottom: 20px;
        line-height: 18px;
      }
    }
    .TMS-Protocol {
      padding: 20px 30px;
      border-radius: 5px;
      line-height: 20px;
      .expanding {
        margin-top: 30px;
      }
    }
    .productInfo-img {
      flex-direction: column;
      width: 88vw;
      align-items: center;
      border-radius: 8px;
      .img-title {
        padding: 50px 0;
        width: 90vw;
        .title-img {
          width: 100%;
          height: 6vw;
          img {
            height: 100%;
          }
        }
        .title {
          font-size: 14px;
        }
        .part-title {
          font-size: 3vw;
          margin-bottom: 10vw;
        }
        .productInfo-image {
          margin-top: 10vw;
          height: 80vw;
          img {
            object-fit: contain;
            width: 100%;
          }
        }
      }
    }
    .contentPart3 {
      width: 90vw;
      display: flex;
      flex-direction: column;
      margin: 0 auto 50px;
      .tmsWorkPart {
        flex-direction: column;
        .tmsWorkImg {
          height: 200px;
          margin: 0 auto 30px;
        }
        .tmsWorkContent {
          width: 100%;
          height: auto;
        }
      }
      .tmsTitle,
      .tmsContent {
        font-size: 12px;
        line-height: 18px;
        padding-bottom: 15px;
      }
      .tmsTitle {
        margin-top: 15px;
      }
      .tmsConventional {
        margin-top: 10px;
      }
    }
  }
}
</style>
