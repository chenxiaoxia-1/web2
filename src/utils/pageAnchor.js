/** 一级菜单 value → 页面顶部 Banner 的 DOM id */
export const TOP_LEVEL_PAGE_ANCHORS = {
  career: "career",
  services: "services",
  investor: "investor",
  aboutUs: "aboutUs",
};

export function isTopLevelPageAnchor(anchorId) {
  return Object.values(TOP_LEVEL_PAGE_ANCHORS).includes(anchorId);
}

/** 投资者关系页路由：中文 investor，英文 investorRelations */
export function getInvestorRelationsPath(language) {
  return language === "cn"
    ? `/${language}/investor`
    : `/${language}/investorRelations`;
}

/**
 * 滚动至页面最上方并定位到 Banner 锚点
 * @param {string} anchorId Banner 元素 id
 */
/** 程序化滚动后通知导航栏同步背景（HeadMenu 监听 scroll） */
export function notifyNavScrollUpdate() {
  window.dispatchEvent(new Event("scroll"));
}

export function scrollToPageAnchor(anchorId) {
  window.scrollTo(0, 0);
  if (!anchorId) {
    notifyNavScrollUpdate();
    return;
  }

  requestAnimationFrame(() => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }
    notifyNavScrollUpdate();
  });
}

/**
 * 滚动至页面内二级区块锚点
 * @param {string} sectionId 区块元素 id
 */
export function scrollToSectionAnchor(sectionId) {
  if (!sectionId) return;
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
    notifyNavScrollUpdate();
  }
}
