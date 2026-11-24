<template>
  <div class="MendCondition">
    <div class="contentPart">
      <div class="solutions-title">Who We Help?</div>
      <div class="textPart1">
        <div>
          <span> Major depressive disorder(MDD)</span> is a leading cause of
          disability worldwide. Yet for a significant subset of patients,
          existing first‑line treatments—antidepressant medications—do not
          provide sufficient relief, or their side effects make long‑term
          adherence difficult. The search for alternative, well‑tolerated
          therapies has become a clinical priority
        </div>
        <div>
          <p><span> The Limits of Antidepressants</span></p>
          Over the past two decades, transcranial magnetic stimulation (TMS) has
          emerged as an evidence‑based, non‑invasive option for patients who
          need something more
        </div>
      </div>
      <div class="textPart2">
        <div>
          <img
            :src="$ossUrl('depression/20260710-153545@2x.png')"
            alt=""
            style="width: 100%"
          />
        </div>
        <div>
          <img
            :src="
              $ossUrl(
                'depression/img_v3_0213f_f6ad656b-45f1-4624-9ce8-7c79e6a44b5g@2x.png',
              )
            "
            alt=""
            style="width: 100%"
          />
        </div>
      </div>
    </div>

    <div class="solutions-title">Why TMS ?</div>
    <div class="TMS-Protocol" v-if="$root.isMobile">
      <div class="en-bold key-title">
        Key FDA Milestones in TMS for Depression
      </div>
      <div v-for="(item, index) in TMSProtocol" :key="index">
        <div class="en-bold title">· {{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
        <div class="desc1" v-if="item.desc1">{{ item.desc1 }}</div>
        <div v-for="ite in item.items">
          <div class="en-bold content">- {{ ite.content }}</div>
          <div class="protocol">{{ ite.protocol }}</div>
        </div>
      </div>
    </div>
    <div class="tms-timeline-wrap" v-else>
      <table class="tms-timeline-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>Conventional TMS</th>
            <th>Deep TMS</th>
            <th>Precision TMS</th>
          </tr>
        </thead>
        <tbody>
          <!-- 2008 -->
          <tr>
            <td class="year-cell">2008</td>
            <td class="content-cell dark-cell">
              <div class="para">
                First FDA clearance for treatment-resistant depression in adults
              </div>
              <div>Protocol: ~37.5 min per session, 3,000 pulses</div>
              <div class="para-Italic">(Neuronetics K083538)</div>
            </td>
            <td class="content-cell"></td>
            <td class="content-cell"></td>
          </tr>
          <!-- 2013 -->
          <tr>
            <td class="year-cell">2013</td>
            <td class="content-cell"></td>
            <td class="content-cell dark-cell">
              <div class="para">
                First deep TMS system cleared for depression
              </div>
              <div>Protocol: ~20 min per session</div>
              <div class="para-Italic">(BrainsWay K122288)</div>
            </td>
            <td class="content-cell"></td>
          </tr>
          <!-- 2018 -->
          <tr>
            <td class="year-cell">2018</td>
            <td class="content-cell dark-cell">
              <div class="para">iTBS (theta-burst) cleared for depression</div>
              <div>Protocol: ~3 min per session</div>
              <div class="para-Italic">(MagVenture K173620)</div>
            </td>
            <td class="content-cell"></td>
            <td class="content-cell"></td>
          </tr>
          <!-- 2022 -->
          <tr>
            <td class="year-cell">2022</td>
            <td class="content-cell"></td>
            <td class="content-cell"></td>
            <td class="content-cell dark-cell">
              <div class="para">
                Accelerated protocol (SNT) cleared with Breakthrough Device
                designation
              </div>
              <div>Protocol: 10 sessions/day × 5 days, 10 min per session</div>
              <div class="para-Italic">(Magnus Medical K220177)</div>
            </td>
          </tr>
          <!-- 2023 -->
          <tr>
            <td class="year-cell">2023</td>
            <td class="content-cell dark-cell">
              <div>
                TMS cleared for adolescents (15–21) as adjunctive treatment
              </div>
              <div class="para-Italic">(Neuronetics K231926)</div>
            </td>
            <td class="content-cell"></td>
            <td class="content-cell"></td>
          </tr>
          <!-- 2025 -->
          <tr>
            <td class="year-cell">2025</td>
            <td class="content-cell"></td>

            <td class="content-cell dark-cell">
              <div class="para">
                Accelerated Deep TMS Protocol for Major Depressive Disorder
                (MDD)
              </div>
              <div>Protocol: 5 sessions/day × 6 days, 10 min per session</div>
              <div class="para-Italic">(Brainsway K251449)</div>
            </td>
            <td class="content-cell"></td>
          </tr>
          <!-- 2026 -->
          <tr>
            <td class="year-cell">2026</td>
            <td class="content-cell dark-cell">
              <div>
                FDA-cleared accelerated TMS for Major Depressive Disorder (MDD),
                delivered over a flexible treatment schedule, as fast as 5 days.
              </div>
              <div class="para-Italic">(MagVenture K260189)</div>
            </td>
            <td class="content-cell"></td>
            <td class="content-cell"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="solutions-title">How TMS Works?</div>
    <div class="productInfo">
      <div class="part-detail">
        <p>
          Depression is linked to reduced activity in the dorsolateral
          prefrontal cortex (DLPFC)—a key region for emotional regulation
        </p>
        <p>
          TMS delivers focused magnetic pulses to the DLPFC, stimulating neural
          activity and restoring function in mood-regulating circuits. Over a
          course of treatment this can lead to lasting improvement in emotional
          control
        </p>
        <p>
          Since the 1980s, TMS has evolved into a mature, evidence-based
          treatment option supported by decades of clinical research
        </p>
      </div>
    </div>
    <div class="solutions-title">Depression Solutions</div>

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
      <div class="img-title">
        <div class="title-img">
          <img :src="$ossUrl('depression/编组 12.png')" />
        </div>
        <div class="title">Precision TMS</div>
        <div class="part-title">
          Robotic Navigated TMS System for Precision Therapy Robotic-navigated.
          MRI-based. Built for precision
        </div>
        <div class="productInfo-image">
          <img :src="$ossUrl('depression/编组 4@2x.png')" />
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
      TMSProtocol: [
        {
          title: "Conventional TMS",
          desc: "Transcranial magnetic stimulation (TMS) is a non-invasive, FDA-cleared neuromodulation technique supported by extensive clinical evidence",
          items: [
            {
              content:
                "2008 — First FDA clearance for treatment-resistant depression in adults",
              protocol:
                "Protocol:~37.5 min per session, 3,000 pulses (Neuronics K083538)",
            },
            {
              content: "2018 — iTBS (theta-burst) cleared for depression",
              protocol: "Protocol:~3 min per session (MagVenture K173620)",
            },
            {
              content:
                "2023 — TMS cleared for adolescents (15–21) as adjunctive treatment",
              protocol: "(Neuronics K231926)",
            },
            {
              content:
                "2026 — FDA-cleared accelerated TMS for Major Depressive Disorder (MDD), delivered over a flexible treatment schedule, as fast as 5 days",
              protocol: "(MagVenture–K260189)",
            },
          ],
        },
        {
          title: "Deep TMS",
          desc: "Deep TMS combines advanced coil technology with deeper brain stimulation for targeted treatment of deeper regions",
          items: [
            {
              content: "2013 — First deep TMS system cleared for depression",
              protocol: "Protocol:~20 min per session (BrainsWay K122288)",
            },
            {
              content:
                "2025 — Accelerated Deep TMS Protocol for Major Depressive Disorder (MDD)",
              protocol:
                "Protocol:5 sessions/day x 6 days, 10 min per session (K251449 〈brainsway〉)",
            },
          ],
        },
        {
          title: "Precision TMS",
          desc: "Precision TMS combines individualized targeting with accelerated stimulation for faster, more personalized care",
          desc1:
            "In 2022, Stanford introduced SNT—an fMRI-guided, high-dose iTBS protocol delivered over 5 days (10 sessions/day, ~10 min each). Studies report ~80% of patients with severe depression improved within one week, earning FDA Breakthrough Device designation",
          items: [
            {
              content:
                "2022 — Accelerated protocol (SNT) cleared with Breakthrough Device designation",
              protocol:
                "Protocol: 10 sessions/day × 5 days, 10 min per session (Magnus Medical K220177)",
            },
          ],
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
    margin: 3vw auto;
    width: 76vw;
    font-family: "Roboto-Regular";

    .textPart1 {
      div {
        margin-top: 1vw;
        font-size: 1vw;
        text-align: left;
        font-family: "Roboto-Regular";
        line-height: 40px;
        margin-bottom: 30px;
        span {
          font-family: Roboto-Bold;
          opacity: 1;
        }
      }
    }

    .textPart2 {
      display: flex;
      margin: 5vw auto;
      justify-content: space-between;

      > div {
        width: 45%;
      }
    }
  }

  .productInfo {
    margin: 3vw auto;
    width: 76vw;

    p {
      font-size: 1vw;
      width: 76vw;
      margin-bottom: 1vw;
      line-height: 30px;
      font-family: "Roboto-Regular";
    }
  }
  .productInfo-img {
    width: 76vw;
    display: flex;
    text-align: center;
    justify-content: space-between;
    margin: 4vw auto;
    align-items: center;
    .img-title {
      width: 36vw;
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 5vw;
      font-family: "Roboto-Regular";
      .title-img {
        width: 12vw;
        margin: 0 auto;
        height: 2vw;
      }
      .productInfo-image {
        height: 26vw;
        img {
          height: 100%;
        }
      }
      .part-title {
        padding: 0 16%;
        font-size: 0.8vw;
        margin-top: 1vw;
        height: 4vw;
        opacity: 0.8;
      }
    }
  }
  .TMS-Protocol {
    .desc,
    .desc1 {
      padding-left: 10px;
    }
    .content {
      padding-left: 25px;
    }
    .protocol {
      padding-left: 35px;
    }
  }
  .tms-timeline-wrap {
    width: 76vw;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid white;
  }
  .tms-timeline-table {
    width: 100%;
    border-collapse: collapse;
    color: #e6edf7;
    table-layout: fixed;
    font-family: Roboto-Regular;

    colgroup {
      col:nth-child(1) {
        width: 16%;
      }
      col:nth-child(2) {
        width: 24%;
      }
      col:nth-child(3) {
        width: 24%;
      }
      col:nth-child(4) {
        width: 24%;
      }
    }

    th,
    td {
      border: 1px solid #ffffff50;
      padding: 32px 28px;
      vertical-align: middle;
      line-height: 1.6;
      width: auto !important;
    }
    th {
      text-align: center;
      font-size: 1vw;
    }
    .year-cell {
      text-align: center;
      font-size: 1vw;
      font-family: D-DINExp-Bold;
    }
    .content-cell {
      font-size: 1vw;
      .para {
        margin-bottom: 18px;
      }
      .para-Italic {
        font-family: Roboto-Italic;
      }
      &.dark-cell {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

@media only screen and (max-width: 833px) {
  .solutions-title {
    font-size: 5vw;
    margin: 80px 0 20px;
    font-family: "Roboto-Regular";
  }
  .MendCondition {
    .contentPart {
      height: auto;
      width: 90vw;
      .title1 {
        font-size: 22px;
      }
      .textPart1 {
        font-size: 12px;
        height: auto;
        line-height: 18px;

        div {
          font-size: 12px;
          height: auto;
          line-height: 18px;
          padding: 5px;
        }
        .title {
          font-size: 5vw;
          font-family: "Roboto-Regular";
          margin-top: 30px;
        }
      }
      .textPart {
        font-size: 22px;
        text-align: center;
        margin: 15px auto;
      }
      .textPart2 {
        flex-direction: column;

        > div {
          width: 100%;
          margin-bottom: 25px;
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
    .productInfo {
      width: 90vw;
      p {
        font-size: 3vw;
        margin-bottom: 20px;
        line-height: 18px;
        width: 90vw;
      }
    }
    .productInfo-img {
      flex-direction: column;

      align-items: center;
      .img-title {
        padding: 50px 0;
        width: 90vw;
        margin-bottom: 15vw;
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
    .TMS-Protocol {
      .desc,
      .desc1 {
        padding-left: 8px;
      }
      .content {
        padding-left: 18px;
      }
      .protocol {
        padding-left: 25px;
      }
    }
  }
}
</style>
