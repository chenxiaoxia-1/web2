<template>
  <div class="investorRelations">
    <section id="company-profile" class="ir-section">
      <div class="supervision">
        <div class="text3 en-regular">Company Profile</div>
      </div>

      <div v-html="textHtml" class="htmlDiv"></div>
    </section>

    <section id="faq" class="ir-section">
      <div class="secDiv">
        <div class="text3 en-regular">FAQ</div>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item
          title="Q1: What is Vishee Medical’s strategic positioning and main business?"
          name="1"
        >
          <div class="collapse">
            Nanjing Vishee Medical Technology Co., Ltd. is a technology
            innovation-driven medical device company. Strategically, the company
            takes rehabilitation as its cornerstone and maintains steady growth
            in its segmented rehabilitation businesses: mental health
            rehabilitation, pelvic floor rehabilitation, and neurological
            rehabilitation. Meanwhile, it vigorously expands emerging businesses
            including medical aesthetics, urology, and international operations,
            establishing a dual-engine business system driven by rehabilitation
            and emerging sectors.
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="Q2: What are the company’s business segments and target customers?"
          name="2"
        >
          <div class="collapse">
            <div class="collapse-title">I. Rehabilitation Business</div>
            <p>
              Divided into mental health rehabilitation, pelvic floor
              rehabilitation, and neurological rehabilitation based on customer
              groups and indications.
            </p>

            <div class="collapse-title">Mental Health Rehabilitation</div>
            <p>
              Serves psychiatry and pediatric departments in general hospitals,
              as well as specialized psychiatric and children’s hospitals.
            </p>
            <p>
              Indications: depression, anxiety, attention deficit hyperactivity
              disorder (ADHD), etc.
            </p>
            <div class="collapse-title">Pelvic Floor Rehabilitation</div>
            <p>
              Serves obstetrics and gynecology departments, pelvic floor
              rehabilitation centers in general hospitals, and maternal and
              child hospitals.
            </p>
            <p>
              Indications: urinary incontinence, pelvic organ prolapse, etc.
            </p>
            <div class="collapse-title">Neurological Rehabilitation</div>
            <p>
              Serves rehabilitation and neurology departments in general
              hospitals, as well as specialized rehabilitation hospitals
            </p>
            <p>Indications: stroke sequelae, hemiplegia, etc.</p>
            <div class="collapse-title">II. Emerging Businesses</div>
            <div class="collapse-title">Medical Aesthetics</div>
            <p>
              Serves dermatology, laser, and medical aesthetics departments in
              general hospitals, as well as private aesthetic clinics.
            </p>
            <p>
              Indications: pigmentary disorders, skin rejuvenation and
              anti-aging, body contouring, pelvic floor laxity, etc.
            </p>
            <div class="collapse-title">Urology</div>
            <p>
              Serves urology departments in general hospitals and stone disease
              hospitals. Indications: urinary calculi, urinary control
              disorders, etc.
            </p>
            <div class="collapse-title">International Business</div>
            <p>
              Serves overseas markets, supplying magnetic stimulation,
              radiofrequency, and other products.
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="Q3: How is the company’s rehabilitation business developing?"
          name="3"
        >
          <div class="collapse-title">
            Mental Health Rehabilitation (Established in 2001)
          </div>
          <p>Largest business segment.</p>
          <p>
            Core products: Transcranial Magnetic Stimulator, Group Biofeedback
            Instrument, MRI Robot-Guided Transcranial Magnetic Stimulator.
          </p>
          <p>
            Highlights: Market leading share for all core products; MRI
            robot-guided TMS leads high-end demand.
          </p>
          <div class="collapse-title">
            Pelvic Floor Rehabilitation (Established in 2013)
          </div>
          <p>Second-largest business segment.</p>
          <p>
            Core products: Pelvic Floor Magnetic Stimulator, Pelvic Floor
            Electrical Stimulator, Body Sculpting Magnetic Stimulator,
            High-Frequency Electrosurgical Unit (Pelvic Floor RF Robot),
            Picosecond Laser Therapeutic Device, Intense Pulsed Light Device.
          </p>
          <p>
            Highlights: Leading market share in magnetic, electrical, and
            radiofrequency segments; pelvic floor RF robot leads high-end
            demand; picosecond and IPL devices are essential light aesthetic
            products.
          </p>
          <div class="collapse-title">
            Neurological Rehabilitation (Established in 2007)
          </div>
          <p>Rapidly growing business segment.</p>
          <p>
            Core products: Electrical stimulation for rehabilitation (physical
            therapy platform), intelligent rehabilitation training, TMS, MRI
            robot-guided TMS, pelvic floor magnetic stimulation.
          </p>
          <p>
            Highlights: Leading market share in magnetic stimulation products;
            MRI robot-guided TMS leads high-end demand; newly launched
            high-cost-performance physical therapy platform.
          </p>
        </el-collapse-item>
        <el-collapse-item
          title="Q4: How is the company’s emerging business developing?"
          name="4"
        >
          <div class="collapse-title">
            Medical Aesthetics (Established in 2023)
          </div>
          <p>Expanded into essential treatment services.</p>
          <p>
            Core products: Picosecond laser, intense pulsed light, body
            sculpting magnetic stimulation, pelvic floor electrical stimulation,
            pelvic floor magnetic stimulation, pelvic floor RF robot.
          </p>
          <p>
            Highlights: Synergistic skin whitening and anti-aging combination of
            laser and light; the only medical-grade body sculpting magnetic
            device on the market; female intimate product line validated by
            public hospitals.
          </p>
          <div class="collapse-title">Urology (Established in 2023)</div>
          <p>Entered clinical surgery through acquisition.</p>
          <p>
            Core products: Holmium laser, optical fibers, pelvic floor
            electrical stimulation, pelvic floor magnetic stimulation.
          </p>
          <p>
            Highlights: Gold standard for urinary calculi surgery; addresses
            rehabilitation needs for male pelvic floor dysfunction.
          </p>
          <div class="collapse-title">
            International Business (Established in 2025)
          </div>
          <p>Gradually improving market access to unlock long-term growth.</p>
          <p>
            Core products: TMS, pelvic floor magnetic stimulation, body
            sculpting magnetic stimulation, radiofrequency, laser.
          </p>
          <p>
            Highlights: Magnetic stimulation product portfolio validated in the
            Chinese market with global competitiveness; magnetic stimulation,
            radiofrequency, and laser products are essential in global markets.
          </p>
        </el-collapse-item>
        <el-collapse-item
          title="Q5: What technologies and core products does the company offer?"
          name="5"
        >
          <div class="collapse-title">Magnetic Stimulation</div>
          <div>
            <p>MagNeuro & MagNeuro ONE Transcranial Magnetic Stimulators</p>
            <p>
              Main applications: mental health rehabilitation, neurological
              rehabilitation
            </p>
          </div>
          <div>
            <p>MagBelle Pelvic Floor Magnetic Stimulator</p>
            <p>
              Main applications: pelvic floor & postpartum rehabilitation,
              medical aesthetics
            </p>
          </div>
          <div>
            <p>MagGraver Body Sculpting Magnetic Stimulator</p>
            <p>
              Main applications: pelvic floor & postpartum rehabilitation,
              medical aesthetics
            </p>
          </div>
          <div class="collapse-title">
            Electrical Stimulation & Intelligent Rehabilitation (+BCI)
          </div>
          <div>
            <p>VisheeNEO Bio-Stimulation Feedback System</p>
            <p>
              Main applications: pelvic floor & postpartum rehabilitation,
              neurological rehabilitation
            </p>
          </div>
          <div>
            <p>Xlocom Intelligent Rehabilitation Training System</p>
            <p>Main applications: neurological rehabilitation</p>
          </div>
          <div>
            <p>Freemind Group Biofeedback System</p>
            <p>Main applications: mental health rehabilitation</p>
          </div>
          <div class="collapse-title">Energy-Based Devices</div>
          <div>
            <p>RFIntima High-Frequency Electrosurgical Unit</p>
            <p>
              Main applications: pelvic floor & postpartum rehabilitation,
              medical aesthetics
            </p>
          </div>
          <div>
            <p>CureStar Holmium Laser Therapeutic System</p>
            <p>Main applications: urology</p>
          </div>
          <div>
            <p>PicoV Picosecond Laser Therapeutic Device</p>
            <p>Main applications: medical aesthetics</p>
          </div>
          <div>
            <p>Vlumina Intense Pulsed Light (IPL) System</p>
            <p>Main applications: medical aesthetics</p>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="Q6: What are the company’s magnetic stimulation products and technological advantages?"
          name="6"
        >
          <div class="collapse-title">World-leading product portfolio</div>
          <p>Conventional TMS</p>
          <p>Precision TMS – rapid growth</p>
          <p>Deep TMS – new</p>
          <p>Pelvic floor magnetic</p>
          <p>Body sculpting magnetic</p>
          <div class="collapse-title">World-leading technologies</div>
          <p>MRI-guided robotic technology</p>
          <p>MEP automatic measurement technology</p>
          <p>High-power power supply technology</p>
          <p>
            Advanced thermal management supporting 24-hour continuous burst
            operation
          </p>
          <p>World’s largest coil portfolio with up to 30 coil types</p>
          <p>
            Biofeedback technology integrated into pelvic floor magnetic
            stimulation
          </p>
          <p>
            One-click dual-target technology for pelvic floor magnetic
            stimulation
          </p>
          <p>RMM technology for body sculpting magnetic stimulation</p>
          <p>Flexible coil technology</p>
          <div class="collapse-title">World-leading sales volume</div>
          <p>
            Installed base exceeds that of Nasdaq-listed Neuronetics and
            Brainsway.
          </p>
        </el-collapse-item>
        <el-collapse-item
          title="Q7: What are the company’s energy-based products and technological advantages?"
          name="7"
        >
          <div class="collapse-title">
            Diversified energy-based technology layout, competing with high-end
            imported brands.
          </div>
          <div class="collapse-title">Product line</div>
          <p>Picosecond laser (dual wavelength)</p>
          <p>Holmium laser</p>
          <p>Intense pulsed light</p>
          <p>Radiofrequency</p>
          <div class="collapse-title">Advanced technologies</div>
          <p>Ultra-short pulse modulation technology (250ps)</p>
          <p>
            Vmaster intelligent filter switching, Vmotion variable-frequency
            scanning, Vskin high-precision skin identification, Vfree
            intelligent weight-following technologies
          </p>
          <p>RF robot with precise temperature control</p>
          <p>
            High-power holmium laser & in-situ lithotripsy technology (coming
            soon)
          </p>
        </el-collapse-item>
        <el-collapse-item
          title="Q8: What are the company’s electrophysiology & intelligent rehabilitation (BCI) products and technological advantages?"
          name="8"
        >
          <div class="collapse-title">
            Comprehensive layout of brain-computer interface for intelligent
            rehabilitation.
          </div>
          <div class="collapse-title">Product line</div>
          <p>Rehabilitation electrical stimulation series</p>
          <p>Pelvic floor electrical stimulation series</p>
          <p>Biofeedback series</p>
          <p>Neuromodulation series</p>
          <p>Active & passive training series</p>
          <p>Cognitive rehabilitation series</p>
          <div class="collapse-title">Technologies</div>
          <p>Closed-loop neuromodulation based on EEG evaluation</p>
          <p>Multimodal brain-computer interface rehabilitation training</p>
        </el-collapse-item>
        <el-collapse-item
          title="Q9: What is the company’s listing status, headquarters location and number of employees?"
          name="9"
        >
          <div>
            Vishee Medical was listed on the STAR Market of the Shanghai Stock
            Exchange on July 21, 2020, with the stock code 688580.SH.
          </div>
          <div>
            Its headquarters, "Vishee Infinite", is located at No. 1 Shuoguo
            Road, Yuhuatai District, Nanjing, Jiangsu Province.
          </div>
          <div>
            As of the end of 2025, the company had 635 employees in total,
            including 137 R&D personnel, accounting for 22% of the total
            workforce.
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="Q10: What is the company’s investor return, including dividends and share repurchases?"
          name="10"
          class="section-body"
        >
          <el-table
            :data="tableData"
            style="width: 100%"
            :span-method="objectSpanMethod"
            class="data-table"
          >
            <el-table-column
              label="Dividend Payout Status Since Listing"
              align="center"
            >
              <el-table-column
                prop="year"
                label="Fiscal Year"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="parentNetProfit"
                label="Net Profit"
              ></el-table-column>
              <el-table-column
                prop="cashDividend"
                label="Total Cash Dividends"
              ></el-table-column>
              <el-table-column
                prop="payoutRatio"
                label="Cash Dividend Payout Ratio"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="buyback"
                label="Share Repurchases in Cash"
              ></el-table-column>
              <el-table-column
                prop="totalPayoutRatio"
                label="Comprehensive Cash Payout Ratio (Dividends + Repurchases)"
              ></el-table-column>
              <el-table-column
                prop="totalPayoutSinceIPO"
                label="Total Cumulative Cash Dividends & Repurchases Since Listing"
              ></el-table-column>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </section>

    <section id="stock-info" class="ir-section">
      <div class="secDiv">
        <div class="text3 en-regular">Real-time Stock Price</div>
      </div>
      <div class="priceDiv">
        <div class="priceLeft">
          <div>
            <div class="title1 en-bold">VISHEE 688580</div>
            {{ closeDate }}&nbsp;CST
          </div>
          <div>
            <div class="title1 title3 en-bold">
              {{ priceStr }}<span class="title11">RMB</span>
            </div>
            <div
              class="title2 title4 cn-medium"
              :style="variation > 0 ? 'color:#FF4040;' : 'color:#40FF88 ;'"
            >
              <span>{{ variation >= 0 ? "▲" : "▼" }}</span>
              <span style="margin-left: 0.26vw">{{
                variation > 0
                  ? "+" + variation
                  : variation == "0"
                  ? variation
                  : +variation
              }}</span>
              <span style="margin-left: 0.78vw">{{
                increase > 0
                  ? "+" + increase + "%"
                  : variation == "0"
                  ? increase + "%"
                  : +increase + "%"
              }}</span>
            </div>
          </div>
        </div>
        <div class="priceRight">
          <div>
            <div class="title3 en-regular">
              Share price is just for reference, not for transaction purpose.
              Vishee doesn't provide any related service.
            </div>
            <div class="title4 en-light">
              *Share price may have 15 minutes delay
            </div>
          </div>
          <div>
            <div class="title3 en-regular">Trading Volume（{{ unit2 }}）</div>
            <div class="title1 en-medium">{{ turnover2 }}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="investor-contact" class="ir-section">
      <div class="secDiv">
        <div class="text3 en-regular">Contact</div>
      </div>
      <div class="InvestorContactInformation">
        <div>
          Vishee IR Tel: +86-025-69670036
          <span class="copyable" @click="handleCopy('+86-025-69670036')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
        <div>
          Investor E-mail: ir@vishee.com
          <span class="copyable" @click="handleCopy('ir@vishee.com')">
            <i class="el-icon-document-copy"></i>
          </span>
        </div>
        <div>
          Address: No.1 Shuoguo Road, Yuhuatai District, Nanjing City, Jiangsu
          Province
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { copyToClipboard } from "../../utils/util";

export default {
  data() {
    return {
      videoUrl:
        "https://vishee.oss-cn-shanghai.aliyuncs.com/official-test/common/%E5%85%AC%E5%8F%B8%E4%BB%8B%E7%BB%8D.mp4",
      textHtml: `<p>
        Nanjing Vishee Medical Technology Co., Ltd. is a technology-driven
        medical device company, listed on the STAR Market (Shanghai Stock
        Exchange Science and Technology Innovation Board). It is a national
        high-tech enterprise and a national-level "Little Giant" specializing in
        sophisticated, unique, novel and niche products.
      </p>
      <p>
        Committed to empowering healthy and happy lives, the company focuses on
        meeting the healthcare needs of patients in mental health, pelvic
        health, neurological rehabilitation, medical aesthetics, and urology.
      </p>
      <p>
        Building on over 20 years of expertise, Vishee has developed core
        technology platforms including magnetic stimulation, electrical
        stimulation, intelligent rehabilitation, and radiofrequency & laser
        energy systems. Its flagship product portfolio covers transcranial
        magnetic stimulation, pelvic health solutions, aesthetic devices,
        urological lasers, biofeedback systems, and intelligent rehabilitation
        equipment, providing comprehensive and innovative clinical solutions
        worldwide.
      </p>`,
      activeNames: ["1"],
      timer: null,
      closeDate: "",
      priceStr: "",
      variation: "",
      increase: "",
      turnover2: "",
      unit2: "",
      tableData: [
        {
          year: "2021",
          parentNetProfit: "RMB 178 million",
          cashDividend: "RMB 88.91 million",
          payoutRatio: "50%",
          buyback: "——",
          totalPayoutRatio: "50%",
          totalPayoutSinceIPO: "RMB 529.41 million",
        },
        {
          year: "2022",
          parentNetProfit: "RMB 93.82 million",
          cashDividend: "RMB 46.9 million",
          payoutRatio: "50%",
          buyback: "RMB 14.85 million",
          totalPayoutRatio: "65.83%",
        },
        {
          year: "2023",
          parentNetProfit: "RMB 136 million",
          cashDividend: "RMB 102.17 million",
          payoutRatio: "75%",
          buyback: "RMB 11.56 million",
          totalPayoutRatio: "83.49%",
        },
        {
          year: "2024",
          parentNetProfit: "RMB 102 million",
          cashDividend: "RMB 76.57 million",
          payoutRatio: "75%",
          buyback: "RMB 13.62 million",
          totalPayoutRatio: "88.45%",
        },
        {
          year: "2025",
          parentNetProfit: "RMB 138 million",
          cashDividend: "RMB 103 million",
          payoutRatio: "75%",
          buyback: "——",
          totalPayoutRatio: "75%",
        },
        {
          year: "Total",
          parentNetProfit: "RMB 791.82 million",
          cashDividend: "RMB 489.38 million",
          payoutRatio: "61.8%",
          buyback: "RMB 40.03 million",
          totalPayoutRatio: "66.86%",
          totalPayoutSinceIPO: "",
        },
      ],
    };
  },
  mounted() {
    this.getStockData();
    this.timer = setInterval(() => {
      this.getStockData();
    }, 5000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    getStockData() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://qt.gtimg.cn/q=sh688580");
      xhr.onload = () => {
        if (xhr.status !== 200) return;
        const data = xhr.response.split("~");
        const year = data[30].slice(0, 4);
        const month = data[30].slice(4, 6);
        const day = data[30].slice(6, 8);
        const hour = data[30].slice(8, 10);
        const min = data[30].slice(10, 12);
        const second = data[30].slice(12, 14);
        this.closeDate = `${year}-${month}-${day} ${hour}:${min}:${second}`;
        this.priceStr = data[3];
        this.variation = data[31];
        this.increase = data[32];
        if (data[37] > 100) {
          this.turnover2 = parseFloat(data[37] / 100).toFixed(2);
          this.unit2 = "Million";
        } else {
          this.turnover2 = parseFloat(data[37]) * 10;
          this.unit2 = "Thousand";
        }
      };
      xhr.send();
    },
    objectSpanMethod({ row, column, rowIndex }) {
      // 目标：合并 "上市后累计派现与回购总额" 这一列 (索引为 6)
      // 合并 2021-2024 (索引 0-3)
      if (column.property === "totalPayoutSinceIPO") {
        // 前4行合并，第6行(2025)和第5行(合计)保持正常显示
        if (rowIndex < 6) {
          return {
            rowspan: 6, // 跨越6行
            colspan: 1,
          };
        }
      }
    },

    handleCopy(text) {
      // 直接调用导入的函数
      copyToClipboard(text, "en");
    },
  },
};
</script>

<style scoped lang="less">
.investorRelations {
  width: 100%;

  .ir-section {
    scroll-margin-top: 80px;
  }

  .htmlDiv {
    margin-top: 4.15vw;
    width: 62.5vw;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1vw;
    font-family: Roboto-Light;
    color: #ffffff;
    line-height: 2.1vw;
  }

  .priceDiv {
    margin-top: 1rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 1vw;
    padding: 3.9vw 2.6vw;
    background-color: rgba(255, 255, 255, 0.1);

    .priceLeft {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3.8vw;

      .title1 {
        font-size: 2.5vw;
        line-height: 3.75vw;
      }

      .title2 {
        margin-top: 0.36vw;
        font-size: 1vw;
        line-height: 1.8vw;
      }
    }

    .priceRight {
      display: flex;
      justify-content: space-between;

      .title1 {
        font-size: 2vw;
        line-height: 2.8vw;

        .title11 {
          margin-left: 0.52vw;
          font-size: 1.25vw;
          line-height: 1.8vw;
        }
      }

      .title3 {
        font-size: 0.8vw;
        line-height: 1.25vw;
      }

      .title4 {
        margin-top: 0.2vw;
        font-size: 1vw;
        line-height: 1.25vw;
        opacity: 0.5;
      }
    }
  }

  .InvestorContactInformation {
    font-size: 1.1vw;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    line-height: 2.25vw;
    margin-bottom: 7vw;
    margin-top: 1rem;
    padding-left: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 2vw;
    border-radius: 1vw;
    font-family: Roboto-Regular;
    div {
      span {
        cursor: pointer;
        &:hover {
          color: #005bac;
        }
      }
    }
    /deep/ .el-link.el-link--primary {
      font-size: 1.1vw;
    }

    .tip {
      font-size: 12px;
      line-height: 16px;
    }
  }
  /deep/.el-collapse {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border: none;
    margin-top: 1rem;

    .el-collapse-item {
      margin-bottom: 20px;
      font-family: Roboto-Regular;
    }

    .el-collapse-item__wrap {
      background: #001b33;
      border-bottom: none;
      font-family: Roboto-Bold;

      .cell {
        /* 只在空格处换行，长单词不被截断 */
        word-break: keep-all;
        /* 防止单词溢出（可选） */
        overflow-wrap: break-word;
        font-family: Roboto-Light;
      }
    }

    .el-collapse-item__header {
      border-radius: 8px;
      border-bottom: none;
      height: 56px;
      font-size: 1.1vw;
      padding-left: 20px;
      cursor: default;
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      font-family: Roboto-Regular;
    }

    .el-collapse-item__content {
      margin: 30px 30px 10px;
      font-size: 0.937vw;
      font-family: Roboto-Light;
      color: #ffffff;
    }
    .collapse-title {
      font-family: Roboto-Bold;
    }
  }

  .contactDiv {
    margin-top: 2vw;
    width: 62.5vw;
    height: 10vw;
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    border-radius: 1vw;
    padding: 2.1vw 2.6vw 1.5vw 2.6vw;

    .title1,
    .title2 {
      font-size: 1.15vw;
      font-family: Roboto-Light;
      color: #000000;
      line-height: 1.6vw;
    }

    .title2 {
      margin-top: 0.5vw;
    }
  }
}

@media only screen and (max-width: 833px) {
  .investorRelations {
    .htmlDiv {
      font-size: 10px;
      line-height: 15px;
      width: 100%;
      margin-top: 40px;
      padding: 0 20px;
    }

    .priceDiv {
      width: auto;
      margin: 30px 20px;
      height: auto;
      padding: 30px 20px;
      border-radius: 10px;

      .priceLeft {
        flex-direction: column;

        .title1 {
          font-size: 20px;
          line-height: 30px;
        }

        .title2 {
          font-size: 12px;
          line-height: 18px;
        }

        .title3 {
          font-size: 30px;
          line-height: 45px;
        }

        .title4 {
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 18px;
        }
      }

      .priceRight {
        flex-direction: column-reverse;

        .title3 {
          font-size: 10px;
          line-height: 15px;
        }

        .title4 {
          font-size: 12px;
          line-height: 18px;
        }

        .title1 {
          font-size: 30px;
          line-height: 45px;
          margin-bottom: 30px;
        }
      }
    }

    .contactDiv {
      width: auto;
      padding: 20px;
      height: auto;
      margin: 0 20px;
      border-radius: 10px;

      .title1,
      .title2 {
        font-size: 10px;
        line-height: 15px;
      }
    }

    .activityDiv {
      width: auto;
      margin: 20px;
      height: auto;
      flex-direction: column;

      .activityItem {
        width: 100%;
        height: auto;
        padding-bottom: 34px;
        margin-bottom: 20px;
        border-radius: 20px;

        .activityImage {
          width: 100%;
          height: auto;
        }

        .title1 {
          font-size: 16px;
          line-height: 24px;
          margin-top: 24px;
          margin-left: 20px;
        }

        .title2 {
          font-size: 10px;
          line-height: 15px;
          margin-left: 20px;
        }
      }
    }
    .title {
      font-size: 20px;
      line-height: 21px;
      width: auto;
      margin: 20px;
    }

    /deep/.el-collapse {
      width: 100%;
      padding: 0 20px 20px;
      border: none;

      .el-collapse-item__wrap {
        background-color: transparent;
        border-bottom: none;
        margin: 15px 15px 0;
        .cell {
          font-size: 2vw;
        }
      }

      .el-collapse-item__header {
        border-radius: 8px;
        height: 30px;
        font-size: 10px;
        line-height: 16px;
        padding: 30px 20px;
        cursor: default;
        justify-content: center;
      }

      .el-collapse-item__content {
        margin: 0;
        font-size: 2.5vw;
      }
    }

    .InvestorContactInformation {
      font-size: 12px;
      line-height: 18px;
      width: 90%;
      padding: 30px 20px;
      border-radius: 10px;
      /deep/ .el-link.el-link--primary {
        font-size: 12px;
      }
      .tip {
        font-size: 8px;
        line-height: 12px;
      }
    }
  }
}
</style>
