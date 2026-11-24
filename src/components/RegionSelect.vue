<template>
  <el-dropdown class="region-select" trigger="click" @command="handleCommand">
    <span class="region-select__trigger">
      <span class="region-select__label">{{ currentLabel }}</span>
    </span>
    <el-dropdown-menu slot="dropdown" class="region-select__menu">
      <el-dropdown-item
        v-for="item in options"
        :key="item.value"
        :command="item.value"
        :class="{ 'is-active': item.value === value }"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { REGION_OPTIONS } from "@/constants/region";

export default {
  name: "RegionSelect",
  props: {
    value: {
      type: String,
      default: "cn",
    },
  },
  data() {
    return {
      options: REGION_OPTIONS,
    };
  },
  computed: {
    currentLabel() {
      const found = this.options.find((o) => o.value === this.value);
      return found ? found.label : this.value;
    },
  },
  methods: {
    handleCommand(command) {
      if (command !== this.value) {
        this.$emit("input", command);
        this.$emit("change", command);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.region-select__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35vw;
  padding: 0.45vw 0.65vw;
  background-color: #d8d8d8;
  border-radius: 1vw;
  cursor: pointer;
  font-size: 0.55vw;
  color: #333333;
  user-select: none;
}

@media only screen and (max-width: 833px) {
  .region-select__trigger {
    font-size: 10px;
    padding: 7px 10px;
    border-radius: 25px;
    gap: 4px;
  }
}
</style>

<style lang="less">
.region-select__menu {
  .el-dropdown-menu__item.is-active {
    color: #333333;
    font-weight: 600;
    background-color: #f4f4f4;
  }
}
</style>
