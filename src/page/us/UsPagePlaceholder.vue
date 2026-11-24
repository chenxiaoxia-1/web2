<template>
  <div class="us-placeholder">
    <HeadMenuUS
      :nav-index-num="0"
      :products="products"
      :flag="true"
    />
    <main class="us-placeholder__body">
      <h1 class="en-bold">{{ title }}</h1>
      <p class="en-regular">
        This US site section is reserved for upcoming release. Content and layout
        will be customized separately.
      </p>
      <el-button type="primary" plain @click="$router.push({ path: '/us' })">
        Back to US Home
      </el-button>
    </main>
  </div>
</template>

<script>
import HeadMenuUS from "@/components/HeadMenuUS.vue";
import { US_HOME_PRODUCTS } from "@/constants/usHomeProducts";

export default {
  name: "UsPagePlaceholder",
  components: { HeadMenuUS },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      products: US_HOME_PRODUCTS,
    };
  },
};
</script>

<style lang="less" scoped>
.us-placeholder {
  min-height: 100vh;
  background: #f5f5f5;
}

.us-placeholder__body {
  max-width: 640px;
  margin: 0 auto;
  padding: 14vh 24px 48px;
  text-align: center;
  color: #333;

  h1 {
    font-size: 28px;
    margin-bottom: 16px;
  }

  p {
    line-height: 1.6;
    margin-bottom: 24px;
    color: #666;
  }
}
</style>