<template>
  <div class="customer-service-sections">
    <section id="service-network" class="service-section">
      <div class="supervision">
        <div class="text3">维修服务</div>
      </div>
      <div
        class="service-cards"
        :class="
          $root.isMobile ? 'service-cards--stack' : 'service-cards--repair'
        "
      >
        <div v-for="card in repairCards" :key="card.title" class="service-card">
          <div class="service-card__icon-wrap">
            <img
              :src="card.icon"
              :alt="card.title"
              class="service-card__icon-img"
            />
          </div>
          <div class="service-card__title">{{ card.title }}</div>
          <div class="service-card__desc">
            <template v-if="card.copyText">
              {{ card.desc }}
              <span @click.stop="$emit('copy', card.copyText)">
                <i class="el-icon-document-copy"></i>
              </span>
            </template>
            <template v-else>{{ card.desc }}</template>
          </div>
        </div>
      </div>
    </section>

    <section
      id="service-items"
      class="service-section service-section--training"
    >
      <div class="training-block">
        <div class="secDiv">
          <div class="text3">培训服务</div>
        </div>
        <div
          class="service-cards"
          :class="
            $root.isMobile ? 'service-cards--stack' : 'service-cards--training'
          "
        >
          <div
            v-for="card in trainingCards"
            :key="card.title"
            class="service-card"
          >
            <div class="service-card__icon-wrap">
              <img
                :src="card.icon"
                :alt="card.title"
                class="service-card__icon-img"
              />
            </div>
            <div class="service-card__title">{{ card.title }}</div>
            <div class="service-card__desc">{{ card.desc }}</div>
            <div class="service-card__desc">{{ card.desc1 }}</div>
          </div>
        </div>
        <TrainingServiceTable />
      </div>
    </section>
  </div>
</template>

<script>
import { ossUrl } from "@/constants/ossAssets";
import TrainingServiceTable from "./TrainingServiceTable.vue";

export default {
  name: "CustomerServiceCards",
  components: {
    TrainingServiceTable,
  },

  computed: {
    repairCards() {
      return [
        {
          title: "服务时间",
          desc: "全年无休 | 每日8:00-20:00",
          icon: ossUrl("customerService/time@2x.png"),
        },
        {
          title: "服务热线",
          desc: "400 696 4936",
          copyText: "400 696 4936",
          icon: ossUrl("customerService/time备份@2x.png"),
        },
        {
          title: "服务公众号",
          desc: "视频技术支持、服务咨询、服务订单",
          icon: ossUrl("customerService/二维码@3x.png"),
        },
      ];
    },
    trainingCards() {
      return [
        {
          title: "在线培训",
          desc: "服务公众号可即时申请，随时解答产品操作疑问",
          icon: ossUrl("customerService/time@2x(1).png"),
        },
        {
          title: "增值培训",
          desc: "伟思提供线上、线下课程 助您规范使用产品、拓展业务内容 课程计划",
          desc1: "请参考下表，更多问题可联系公众号咨询",
          icon: ossUrl("customerService/time备份 2@2x.png"),
        },
      ];
    },
  },
};
</script>

<style scoped lang="less">
.customer-service-sections {
  width: 55%;
  margin: 0 auto 5vw;
  padding-top: 1vw;
}

.service-section {
  & + & {
    margin-top: 2vw;
  }
  margin-bottom: 12vw;
}

.service-cards {
  display: grid;
  gap: 1.2vw;

  &--repair {
    grid-template-columns: repeat(3, 1fr);
  }

  &--training {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    max-width: none;
    margin: 0;
  }
}

.training-block {
  width: 100%;
  margin: 0 auto;
}

.service-section--training {
  .secDiv {
    width: 100%;
  }
}

.service-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1vw;
  padding: 2vw 1.5vw;
  text-align: center;
  box-sizing: border-box;

  &__icon-wrap {
    width: 3.6vw;
    height: 3.6vw;
    margin: 0 auto 1.2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.3vw;
    color: #ffffff;
  }

  &__icon-img {
    width: 2.2vw;
    height: 2.2vw;
    object-fit: contain;
    display: block;
  }

  &__title {
    font-size: 1vw;
    line-height: 1.5vw;
    font-family: SourceHanSansCN-Bold;
    color: #ffffff;
    margin-bottom: 0.8vw;
  }

  &__desc {
    font-size: 0.75vw;
    line-height: 1.25vw;
    font-family: SourceHanSansCN-Light;
    color: rgba(255, 255, 255, 0.85);

    span {
      cursor: pointer;
      margin-left: 0.3vw;

      i {
        font-size: 0.75vw;
      }
    }
  }
}

@media only screen and (max-width: 833px) {
  .customer-service-sections {
    width: 100%;
    padding: 20px 6vw 0;
  }

  .service-section {
    & + & {
      margin-top: 10px;
    }
  }

  .service-cards {
    gap: 12px;

    &--stack {
      grid-template-columns: 1fr;
    }

    &--repair,
    &--training {
      grid-template-columns: 1fr;
      max-width: none;
    }
  }

  .training-block {
    width: 100%;
    max-width: none;
  }

  .service-card {
    border-radius: 10px;
    padding: 24px 20px;

    &__icon-wrap {
      width: 48px;
      height: 48px;
      margin-bottom: 14px;
      border-radius: 4px;
    }

    &__icon-img {
      width: 32px;
      height: 32px;
    }

    &__title {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 10px;
    }

    &__desc {
      font-size: 10px;
      line-height: 16px;

      span i {
        font-size: 10px;
      }
    }
  }
}
</style>
