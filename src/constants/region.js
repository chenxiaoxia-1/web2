/** 站点区域：cn 中国站 | us 美国站 | en 国际英文站 */
export const REGION_OPTIONS = [
  { value: "cn", label: "中" },
  { value: "us", label: "US" },
  { value: "en", label: "EN" },
];

export const HOME_ROUTE_NAMES = new Set([
  "home",
  "homeUs",
]);

/** 子站首页路径 */
export function getRegionHomePath(region) {
  return `/${region}`;
}

/** 复制提示、底部等：非中文站使用英文文案 */
export function isEnglishSiteRegion(region) {
  return region === "en" || region === "us";
}