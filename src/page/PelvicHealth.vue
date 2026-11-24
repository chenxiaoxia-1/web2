<template>
  <div class="MendCondition">
    <PageTopBanner
      :bg-image="bgImage"
      :bg-image-mobile="bgImage2"
      language="en"
      title="PELVIC HEALTH & WELLNESS"
    />
    <div class="contentTitle">
      <div class="img1" v-if="$root.isMobile">
        <img :src="$ossUrl('pelvicHealth/编组 2@3x.png')" alt="" srcset="" />
      </div>
      <div class="img1" v-else>
        <img
          :src="$ossUrl('pelvicHealth/编组 2备份 9@2x.png')"
          alt=""
          srcset=""
        />
      </div>
    </div>

    <div class="magBelle">
      <div class="content">
        <div>
          <div class="content-main-title">What MagBelle Treats?</div>
          <div><div class="title">FDA-Cleared(K222875)</div></div>
          <div class="clearedData">
            <div class="part">
              Treatment of male and female urinary incontinence
            </div>
            <div class="part">Rehabilitation of weak pelvic muscles</div>
            <div class="part">Restoration of neuromuscular control</div>
          </div>
          <div>
            <div class="content-main-title">Why MagBelle ?</div>
            <div>
              <div class="title">Pioneering 3-in-1 Technology</div>
              <div class="title">Exclusive Dual-Target Therapy</div>
              <div class="title">Real-time Posture Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          :src="$ossUrl('pelvicHealth/编组 10@2x.png')"
          alt="magBelle 盆底康复设备"
        />
      </div>
    </div>

    <div class="contentTitle">
      <div class="img1">
        <img
          :src="$ossUrl('pelvicHealth/编组 8备份 3@2x.png')"
          alt=""
          srcset=""
        />
      </div>
    </div>

    <div class="RFIntima">
      <div>
        <img
          :src="$ossUrl('pelvicHealth/编组 9备份@2x.png')"
          alt="RFIntima 射频设备"
        />
      </div>
      <div class="content">
        <div class="content-main-title">What RFIntima Treats ?</div>
        <div>
          <div class="part">
            RFIntima is an intelligent 3-in-1 RF platform designed to address a
            full spectrum of aesthetic and intimate health needs – from skin
            tightening and body contouring to feminine wellness
          </div>
          <div class="part">
            Intima, its feminine wellness solution, offering non‑invasive RF
            treatments for women’s intimate concerns, including blood
            circulation, pain relief and pelvic floor weakness
          </div>
        </div>
        <div>
          <div class="content-main-title">Why RFIntima ?</div>
          <div>
            <div class="title">Intelligent Treatment System</div>
            <div class="title">Monopolar & Bipolar Treatment in One</div>
            <div class="title">12-Channel Precision Temperature Control</div>
          </div>
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
  name: "pelvicHealth",
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
    };
  },
};
</script>

<style lang="less" scoped>
.MendCondition {
  background: #001b33 no-repeat right top;
  .contentTitle {
    text-align: center;
    padding: 0;
    .img1 {
      width: 40%;
      margin: 200px auto 40px;
    }
    img {
      width: 100%;
    }
  }
  .magBelle {
    width: 80vw;
    display: grid;
    grid-template-columns: 35vw 45vw;
    margin: 80px auto;
    div {
      img {
        width: 100%;
      }
    }
  }
  .RFIntima {
    display: grid;
    grid-template-columns: 40vw 30vw;
    gap: 5vw;
    width: 88vw;
    margin: 80px auto;
    div {
      img {
        width: 100%;
      }
    }
  }
  .content-main-title {
    height: 3vw;
    text-align: left;
    font-size: 40px;
    margin: 60px 0 20px;
  }
  .content {
    margin: auto 0;
    font-family: Roboto-Regular;
    font-size: 1vw;
    height: 100%;
    .title {
      font-family: Roboto-Medium;
      line-height: 30px;
    }

    .part,
    .main-title {
      margin-bottom: 30px;
    }
    .part {
      font-family: Roboto-Regular;
    }
  }
}
@media only screen and (max-width: 833px) {
  .MendCondition {
    .contentTitle {
      .img1 {
        width: 70%;
        margin: 60px auto 20px;
      }
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    .RFIntima {
      display: flex;
      flex-direction: column;
    }
    .content {
      width: 100%;
      .content-main-title {
        margin-top: 60px;
        height: 4vw;
        font-size: 18px;
      }

      .part {
        font-size: 12px;
        margin-bottom: 15px;
        margin-bottom: 15px;
      }
      .title {
        line-height: 18px;
        font-size: 12px;
      }

      .part {
        margin-bottom: 20px;
        font-size: 12px;
      }
    }

    .magBelle {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>
