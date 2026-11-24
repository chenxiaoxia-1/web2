const TerserPlugin = require("terser-webpack-plugin"); // 用于在生成环境剔除debuger和console
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 代码分析工具
const fs = require("fs");
const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

function getOssBaseFromLess() {
  const content = fs.readFileSync(resolve("src/common/style/oss.less"), "utf8");
  const match =
    content.match(/@oss-base:\s*~?'([^']+)';/) ||
    content.match(/@oss-base:\s*"([^"]+)";/);
  if (!match) return "~''";
  return `~'${match[1]}'`;
}

const ossBase = getOssBaseFromLess();

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "./dist",
  assetsDir: "static",
  filenameHashing: true, // false 来关闭文件名哈希
  lintOnSave: false, // 关闭eslint
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8012,
    https: true,
    historyApiFallback: {
      index: "/", //与output的publicPath
    },
    // TODO
    proxy: {
      "/api": {
        // target: "http://192.168.31.216:8084",
        // target: "https://www.vishee.com/api/",
        target: "https://developer.vishee.com:8888/api/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  // webpack相关配置
  chainWebpack: (config) => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach((oneOf) => {
      config.module
        .rule("less")
        .oneOf(oneOf)
        .use("less-loader")
        .tap((options) => {
          options.globalVars = Object.assign({}, options.globalVars, {
            "oss-base": ossBase,
          });
          return options;
        });
    });

    config.entry.app = ["babel-polyfill", "./src/main.js"];
    config.resolve.alias
      .set("@", resolve("src"))
      .set("cps", resolve("src/components"));
    // 关闭npm run build之后，This can impact web performance 警告
    config.performance.set("hints", false);
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 仅生产环境压缩，开发环境保持可读以便 Vue DevTools 调试
    config.optimization.minimize(process.env.NODE_ENV === "production");
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all",
    });
    config.module.rule("svg").exclude.add(resolve("src/svg")).end();
    config.module
      .rule("svgs-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    // 对图片进行压缩处理
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        disable: true, // webpack@2.x and newer
        quality: "65-80",
        speed: 4,
      })
      .end();
    // 项目文件大小分析
    config.plugin("webpack-bundle-analyzer").use(
      new BundleAnalyzerPlugin({
        openAnalyzer: false, // 是否打开默认浏览器
        analyzerPort: 8899,
      }),
    );
  },
  configureWebpack: () => {
    const config = {};

    if (process.env.NODE_ENV === "development") {
      config.devtool = "eval-cheap-module-source-map";
    }

    if (process.env.NODE_ENV === "production") {
      // 去除console来减少文件大小，效果同'UglifyJsPlugin'
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"],
          },
        },
      });
    }

    return config;
  },

  pluginOptions: {},
};
