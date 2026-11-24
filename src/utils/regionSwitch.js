import $bus from "@/components/eventBus";
import { getRegionHomePath, HOME_ROUTE_NAMES } from "@/constants/region";

/** 与原有 LanguageChange 一致：这些路由切换中英文时回到对应首页 */
const RESET_TO_HOME_ROUTE_NAMES = [
  "products",
  "solutions",
  "home",
  "homeUs",
  "career",
  "stroke",
  "pelvicHealth",
];

/**
 * 三区域切换：us 与 cn/en 互跳走各站首页；cn/en 内页仍走原有 bus 逻辑
 */
export function applyRegionSwitch(vm, region) {
  const current = vm.$route.params.language;
  if (region === current) return;

  if (region === "us" || current === "us") {
    vm.$router.push({ path: getRegionHomePath(region) }).catch(() => {});
    return;
  }

  const routeName = vm.$route.name;
  if (RESET_TO_HOME_ROUTE_NAMES.includes(routeName)) {
    vm.$router.push({ path: getRegionHomePath(region) }).catch(() => {});
  } else {
    $bus.$emit("languageChange", region);
    if (typeof vm.getHomeData === "function") vm.getHomeData(true);
    if (typeof vm.getSolutionData === "function") vm.getSolutionData(true);
  }
}

export function isUsHomeRoute(route) {
  return route.name === "homeUs" || route.params.language === "us";
}