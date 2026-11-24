// 设计稿以1920px为宽度，而我把页面宽度设计为10rem的情况下
// 基准大小
const baseSize = 32;
// 这个是设计稿中1rem的大小。
function setRem() {
  let clientWidth = document.documentElement.clientWidth;
  // 当前页面宽度相对于 1080 宽的缩放比例，可根据自己需要修改。
  if (clientWidth < 1000) {
    const scale = clientWidth / 850;
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  } else {
    const scale = clientWidth / 1080;
    // if(document.documentElement.clientWidth < 1000){
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  }
}

setRem();
window.addEventListener("resize", () => {
  setRem();
});
