<template>
  <component :is="pageComponent" />
</template>

<script>
import UsMagNeuroDetail from "./UsMagNeuroDetail.vue";
import UsPagePlaceholder from "./UsPagePlaceholder.vue";

export default {
  name: "UsProductDetail",
  computed: {
    productId() {
      return (this.$route.params.id || "").toLowerCase();
    },
    pageComponent() {
      if (this.productId === "magneuro") {
        return UsMagNeuroDetail;
      }
      return {
        render(h) {
          return h(UsPagePlaceholder, {
            props: { title: `Product: ${this.$parent.$route.params.id}` },
          });
        },
      };
    },
  },
};
</script>