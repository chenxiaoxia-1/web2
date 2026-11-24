<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view :key="$route.fullPath"></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: SourceHanSansCN-Light, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  width: 100%;
}
html {
  overflow-y: auto;
}
html,
body {
  width: 100%;
  padding: 0;
  margin: 0;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
}
.el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
}
@media only screen and (max-width: 833px) {
  body .el-message-box {
    width: 100%;
  }
}
</style>
