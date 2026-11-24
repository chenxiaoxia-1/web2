<template>
  <div class="MendCondition">
    <div class="contentTitle">
      <div class="img1" v-if="$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2备份EN@3x.png')" />
      </div>
      <div class="img1" v-else>
        <img
          :src="$ossUrl('aesthetics/编组 8备份 EN2@2x.png')"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="magGraver">
      <div class="content">
        <div>
          <div class="content-main-title">What MagGraver Treats?</div>
          <div>
            <div class="main-title">FDA-Cleared(K222875)</div>
            <div
              v-for="(ite, idx) in clearedData"
              :key="idx"
              class="clearedData"
            >
              <div class="part" v-html="ite"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="content-main-title">Why MagGraver?</div>
          <div v-for="(item, index) in magGraverData" :key="index">
            <div class="title">{{ item }}</div>
          </div>
        </div>
      </div>
      <div>
        <img :src="$ossUrl('aesthetics/编组11EN.png')" />
      </div>
    </div>
    <!-- RFIntima  -->
    <div class="contentTitle">
      <div class="img1" v-if="$root.isMobile">
        <img :src="$ossUrl('aesthetics/编组 2备份 3@3x.png')" />
      </div>
      <div class="img1" v-else>
        <img :src="$ossUrl('aesthetics/编组 8备份EN@2x.png')" />
      </div>
    </div>

    <div class="RFIntima">
      <div>
        <img :src="$ossUrl('aesthetics/编组 7@3x.png')" />
      </div>
      <div class="content">
        <div>
          <div class="content-main-title">What RFIntima Treats?</div>
          <div v-for="(item, index) in frequency1" :key="index">
            <div class="part" v-html="item"></div>
          </div>
        </div>
        <div>
          <div class="content-main-title">Why RFItima?</div>
          <div v-for="(item, index) in frequency2" :key="index">
            <div class="frequency-title">{{ item.title }}</div>
            <div class="part-its">
              <div v-for="its in item.content">
                <div class="its">{{ its }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contentTitle">
      <div class="img1" v-if="$root.isMobile">
        <img
          :src="$ossUrl('aesthetics/编组 2备份 4@3x.png')"
          alt=""
          srcset=""
        />
      </div>
      <div class="img1" v-else>
        <img
          :src="$ossUrl('aesthetics/编组 8备份 5@2x.png')"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <!-- MagBelle -->
    <div class="magBelle">
      <div class="content">
        <div>
          <div class="content-main-title">What MagBelle Treats?</div>
          <div v-for="(item, index) in magBelleList1" :key="index">
            <div class="title">{{ item.sectionTitle }}</div>
            <div v-for="(ite, idx) in item.items" :key="idx">
              <div class="part" v-html="ite"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="content-main-title">Why MagBelle?</div>
          <div v-for="(item, index) in magBelleList2" :key="index">
            <div class="title">{{ item }}</div>
          </div>
        </div>
      </div>
      <div>
        <img :src="$ossUrl('aesthetics/编组12EN.png')" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AestheticsEN",
  data() {
    return {
      clearedData: [
        "Improvement of abdominal tone, strengthening of the abdominal muscles, development of firmer abdomen",
        "Strengthening, Toning and Firming of buttocks",
      ],
      magGraverData: [
        "Clinically Proven",
        "Real-Time Muscle Monitoring (RMM)",
        "Dedicated Abdominal & Gluteal Applicators",
      ],
      frequency1: [
        `RFIntima is an intelligent 3-in-1 RF platform designed to address a full spectrum of aesthetic and intimate health needs – from skin tightening and body contouring to feminine wellness`,
      ],

      frequency2: [
        {
          title: "Intimate Wellness",
          content: [
            "Intelligent Treatment System",
            "Monopolar & Bipolar Treatment in One",
            "12-Channel Precision Temperature Control",
          ],
        },
        {
          title: "Skin Tightening",
          content: [
            "Dual-Sized Handpieces",
            "Motion-Contact-Temperature (MCT) Technology",
            "Lightweight Ergonomic Design",
          ],
        },
        {
          title: "Body Contouring",
          content: [
            "Vacuum‑Assisted RF",
            "Exclusive Vacuum Chamber & Electrode Design",
            "Smart IR Thermal Feedback",
            "Lightweight Ergonomic Design",
          ],
        },
      ],
      magBelleList1: [
        {
          sectionTitle: "FDA-Cleared(K222875)",
          items: [
            "Improvement of abdominal tone, strengthening of the abdominal muscles, development of firmer abdomen",
            "Strengthening, Toning and Firming of buttocks",
          ],
        },
      ],
      magBelleList2: [
        "Pioneering 3-in-1 Technology",
        "Exclusive Dual-Target Therapy",
        "Real-time Posture Monitoring",
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.MendCondition {
  margin-top: 8vw;
  .contentTitle {
    text-align: center;
    padding: 0;

    .img1 {
      width: 40%;
      margin: 200px auto 0;
    }
    img {
      width: 100%;
    }
  }
  .magGraver {
    width: 80vw;
    margin: 80px auto;
    display: grid;
    grid-template-columns: 35vw 45vw;

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
        margin-top: 12%;
        width: 90%;
      }
    }
  }
  .magBelle {
    display: grid;
    grid-template-columns: 30vw 45vw;
    gap: 5vw;
    width: 80vw;
    margin: 120px auto;
    align-items: end;
    div {
      img {
        width: 100%;
      }
    }

    margin: 4vw auto 10vw;
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
    .title,
    .frequency-title {
      font-family: Roboto-Medium;
    }
    .frequency-title {
      margin: 0 0 15px;
    }
    .title {
      line-height: 30px;
    }
    .part,
    .main-title {
      margin-bottom: 30px;
    }
    .its {
      padding-left: 18px;
    }
    .part,
    .its {
      font-family: Roboto-Regular;
    }
    .part-its {
      margin: 15px 0 30px;
    }
    .main-title {
      font-family: Roboto-Medium;
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
      .its {
        padding-left: 10px;
      }
      .part,
      .main-title,
      .its {
        font-size: 12px;
        margin-bottom: 15px;
        margin-bottom: 15px;
      }
      .title {
        line-height: 18px;
        font-size: 12px;
      }
      .part,
      .main-title,
      .frequency-title {
        margin-bottom: 20px;
        font-size: 12px;
      }
    }

    .magGraver,
    .magBelle {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>
