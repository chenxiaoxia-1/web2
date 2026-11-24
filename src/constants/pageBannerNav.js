import { ossUrl } from "@/constants/ossAssets";

/**
 * 页面顶部 Banner 快捷导航配置
 * @typedef {Object} BannerNavItem
 * @property {string} anchor 页面内锚点 id
 * @property {string} label 导航标题
 * @property {string|Object} icon 图标资源
 * @property {boolean} [hidden] 是否隐藏（区块未展示时可设为 true）
 */

const ABOUT_US_BANNER_NAV_CN = [
  {
    anchor: "service-supervision",
    label: "愿景",
    icon: ossUrl("pageTopBanner/aboutUs/icon-vision.png"),
  },
  {
    anchor: "founder-message",
    label: "创始人寄语",
    icon: ossUrl("pageTopBanner/aboutUs/icon-founder.png"),
  },
  {
    anchor: "history",
    label: "发展历程",
    icon: ossUrl("pageTopBanner/aboutUs/icon-history.png"),
  },
  {
    anchor: "anniversary",
    label: "纪念片《不二》",
    icon: ossUrl("pageTopBanner/aboutUs/icon-film-buer.png"),
  },
  {
    anchor: "infinite-film",
    label: "纪念片《无限》",
    icon: ossUrl("pageTopBanner/aboutUs/icon-film-infinite.png"),
  },
  {
    anchor: "contact",
    label: "联系我们",
    icon: ossUrl("pageTopBanner/aboutUs/icon-contact.png"),
  },
];

const ABOUT_US_BANNER_NAV_EN = [
  {
    anchor: "service-supervision",
    label: "Our Vision",
    icon: ossUrl("pageTopBanner/aboutUs/icon-vision.png"),
  },
  {
    anchor: "founder-message",
    label: "Founder's Message",
    icon: ossUrl("pageTopBanner/aboutUs/icon-founder.png"),
  },
  {
    anchor: "history",
    label: "Development MileStones",
    icon: ossUrl("pageTopBanner/aboutUs/icon-history.png"),
  },
  {
    anchor: "infinite-film",
    label: "Infinity",
    icon: ossUrl("pageTopBanner/aboutUs/icon-film-infinite.png"),
  },
  {
    anchor: "contact",
    label: "Contact Us",
    icon: ossUrl("pageTopBanner/aboutUs/icon-contact.png"),
  },
];

function cnOnly(language, items) {
  return language === "cn" ? items : [];
}

/** @returns {BannerNavItem[]} */
export function getAboutUsBannerNav(language = "cn") {
  return language === "en" ? ABOUT_US_BANNER_NAV_EN : ABOUT_US_BANNER_NAV_CN;
}

/** @returns {BannerNavItem[]} */
export function getCustomerServiceBannerNav(language = "cn") {
  return cnOnly(language, [
    {
      anchor: "service-network",
      label: "维修服务",
      icon: ossUrl("pageTopBanner/customerService/icon-repair.png"),
    },
    {
      anchor: "service-items",
      label: "培训服务",
      icon: ossUrl("pageTopBanner/customerService/icon-training.png"),
    },
    {
      anchor: "spare-part",
      label: "配件推荐",
      icon: ossUrl("pageTopBanner/customerService/icon-spare-part.png"),
    },
  ]);
}

/** @returns {BannerNavItem[]} */
export function getInvestorRelationsBannerNav(language = "cn") {
  return cnOnly(language, [
    {
      anchor: "company-profile",
      label: "公司介绍",
      icon: ossUrl("pageTopBanner/investorRelations/icon-company-profile.png"),
    },
    {
      anchor: "stock-info",
      label: "股票信息",
      icon: ossUrl("pageTopBanner/investorRelations/icon-stock-info.png"),
    },
    {
      anchor: "investment-info",
      label: "投关资讯",
      icon: ossUrl("pageTopBanner/investorRelations/icon-investment-info.png"),
    },
  ]);
}

/** @returns {BannerNavItem[]} */
export function getTalentDevelopmentBannerNav(language = "cn") {
  return cnOnly(language, [
    {
      anchor: "life",
      label: "伟思生活",
      icon: ossUrl("pageTopBanner/talentDevelopment/icon-life.png"),
    },
    {
      anchor: "honor",
      label: "职业生涯",
      icon: ossUrl("pageTopBanner/talentDevelopment/icon-honor.png"),
    },
    {
      anchor: "social-recruitment",
      label: "社会招聘",
      icon: ossUrl(
        "pageTopBanner/talentDevelopment/icon-social-recruitment.png",
      ),
    },
    {
      anchor: "campus-recruitment",
      label: "校园招聘",
      icon: ossUrl(
        "pageTopBanner/talentDevelopment/icon-campus-recruitment.png",
      ),
    },
  ]);
}
