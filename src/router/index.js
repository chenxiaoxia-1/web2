import Vue from "vue";
import Router from "vue-router";
import Layout from "@/page/Layout";
import { getTdkByPage } from "@/api/serviceApi";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/cn",
    },
    {
      path: "/:language(cn|en)", //主页只能是cn或者en
      name: "home",
      meta: {
        title: "首页",
        scrollTop: true, // 设置进入页面时是否需要滚动至最上方
      },
      component: () => import("@/page/Home"),
    },
    {
      path: "/:language(us)",
      name: "homeUs",
      meta: {
        title: "Home",
        scrollTop: true,
      },
      component: () => import("@/page/HomeUS"),
    },
    {
      path: "/us/products/:id",
      name: "usProducts",
      meta: {
        title: "Product",
        scrollTop: true,
      },
      component: () => import("@/page/us/UsProductDetail"),
    },
    {
      path: "/us/store",
      name: "usStore",
      meta: { title: "Store", scrollTop: true },
      component: () => import("@/page/us/UsStore"),
    },
    {
      path: "/us/events",
      name: "usEvents",
      meta: { title: "Events", scrollTop: true },
      component: () => import("@/page/us/UsEvents"),
    },
    {
      path: "/us/about",
      name: "usAbout",
      meta: { title: "About Vishee", scrollTop: true },
      component: () => import("@/page/us/UsAbout"),
    },
    {
      path: "/detail",
      name: "Layout",
      meta: {
        title: "Layout",
      },
      component: Layout,
      noDropdown: true,
      children: [
        {
          path: "/:language(cn|en)/solutions/:id",
          meta: {
            title: "解决方案",
            scrollTop: true,
          },
          name: "solutions",
          component: () => import("@/page/Solution"),
          props: true,
        },
        {
          path: "/:language(cn|en)/products/:id",
          name: "products",
          meta: {
            title: "产品详情",
            scrollTop: true,
          },
          component: () => import("@/page/ProductInfo"),
        },
        {
          path: "/:language(cn|en)/depression",
          name: "depression",
          meta: {
            title: "抑郁症",
            scrollTop: true,
          },
          component: () => import("@/page/MendCondition"),
        },
        {
          path: "/:language(cn|en)/aesthetics",
          name: "aesthetics",
          meta: {
            title: "伟思美学",
            scrollTop: true,
          },
          component: () => import("@/page/Aesthetics"),
        },
        // TODO
        {
          path: "/:language(cn|en)/stroke",
          name: "stroke",
          meta: {
            title: "stroke",
            scrollTop: true,
          },
          component: () => import("@/page/Stroke"),
        },
        {
          path: "/:language(cn|en)/pelvicHealth",
          name: "pelvicHealth",
          meta: {
            title: "pelvicHealth",
            scrollTop: true,
          },
          component: () => import("@/page/PelvicHealth"),
        },
        {
          path: "/:language(cn|en)/career",
          name: "career",
          meta: {
            title: "人才发展",
            scrollTop: true,
          },
          component: () => import("@/page/TalentDevelopment"),
        },
        {
          path: "/:language(cn|en)/investorRelations",
          name: "investorRelations",
          meta: {
            title: "投资者关系",
            scrollTop: true,
          },
          component: () => import("@/page/InvestorRelations"),
        },
        {
          path: "/:language(cn|en)/investor",
          name: "investor",
          meta: {
            title: "公司介绍",
            scrollTop: true,
          },
          component: () => import("@/page/CompanyProfile"),
        },

        {
          path: "/:language(cn|en)/services",
          name: "services",
          meta: {
            title: "客户服务",
            scrollTop: true,
          },
          component: () => import("@/page/CustomerService"),
        },
        {
          path: "/:language(cn|en)/socialRecruitment",
          name: "socialRecruitment",
          meta: {
            title: "社会招聘",
            scrollTop: true,
          },
          component: () => import("@/page/SocialRecruitment"),
        },
        {
          path: "/:language(cn|en)/campus",
          name: "campus",
          meta: {
            title: "校园招聘",
            scrollTop: true,
          },
          component: () => import("@/page/SocialRecruitment"),
        },
        {
          path: "/:language(cn|en)/jobDetails",
          name: "jobDetails",
          meta: {
            title: "职位详情",
            scrollTop: true,
          },
          component: () => import("@/page/JobDetails"),
        },
        {
          path: "/:language(cn|en)/contentDetail",
          name: "contentDetail",
          meta: {
            title: "内容详情",
            scrollTop: true,
          },
          component: () => import("@/page/ContentDetail"),
        },
        {
          path: "/:language(cn|en)/activity",
          redirect: (to) => ({
            path: `/${to.params.language}/contentDetail`,
            query: { ...to.query, type: "activity" },
          }),
        },
        {
          path: "/:language(cn|en)/news",
          redirect: (to) => ({
            path: `/${to.params.language}/contentDetail`,
            query: { ...to.query, type: "news" },
          }),
        },
        {
          path: "/:language(cn|en)/aboutUs",
          name: "aboutUs",
          meta: {
            title: "关于我们",
            scrollTop: true,
          },
          component: () => import("@/page/AboutUs"),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.scrollTop) {
      window.scrollTo(0, 0);
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  // 1. 防止重复跳转（核心修复）
  if (to.fullPath === from.fullPath) {
    return next();
  }

  try {
    // 3. 统一获取TDK（去掉死循环定时器）
    const pageId = sessionStorage.getItem("pageId") || "";
    const tdkLang =
      to.params.language === "us" ? "en" : to.params.language || "cn";
    const res = await getTdkByPage({
      language: tdkLang,
      pageId: pageId,
      pageName: to.params.id || to.name,
    });

    if (res.status === 200 && res.data) {
      const TDK = res.data;
      document.querySelector('meta[name="keywords"]').content =
        TDK.keywords || "";
      document.title = TDK.title || "";
      document.querySelector('meta[name="description"]').content =
        TDK.description || "";
    }
  } catch (err) {
    console.error(err, "TDK接口异常");
  }

  next();
});

export default router;
