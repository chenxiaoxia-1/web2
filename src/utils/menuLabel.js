/**
 * 从 optionsCN / optionsEN 获取菜单标题
 * @param {Array} options - 一级菜单配置（含 children 二级项）
 * @param {String} menuValue - 一级菜单 value
 * @param {String} [childValue] - 二级菜单 value，传入时返回二级标题
 */
export function getMenuItemLabel(options, menuValue, childValue) {
  const menu = options.find((item) => item.value === menuValue);
  if (!menu) return "";

  if (childValue && Array.isArray(menu.children)) {
    const child = menu.children.find((item) => item.value === childValue);
    if (child) return child.label;
  }

  return menu.label;
}

/** 页面顶部 Banner 标题：对应当前页面的一级菜单项 */
export function getPageBannerTitle(options, menuValue) {
  return getMenuItemLabel(options, menuValue);
}
