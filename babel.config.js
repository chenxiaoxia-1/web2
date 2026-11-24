module.exports = {
  presets: ["@vue/app"],
  plugins: [["@babel/plugin-transform-optional-chaining", { loose: false }]],
  sourceType: "unambiguous",
};
