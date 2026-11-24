import { getIndexProductList, getSchemeList } from "@/api/serviceApi";
import { optionsCN, optionsEN } from "@/constants/menuOptions";
import $bus from "../components/eventBus";
import { applyRegionSwitch } from "@/utils/regionSwitch";

let homeDataCacheKey = null;
let homeDataPromise = null;
/** 按语言缓存方案列表，避免中英文数据串用 */
const schemeListByLang = { cn: null, en: null };
const schemeListPromiseByLang = { cn: null, en: null };

const DEFAULT_SOLUTION_CHILDREN_CN = [
  { value: "depression", label: "抑郁症" },
  { value: "aesthetics", label: "伟思美学" },
];

function getSolutionsMenuIndex(options) {
  return options.findIndex((item) => item.value === "solutions");
}

function getDefaultSolutionChildrenEN() {
  const menu = optionsEN.find((item) => item.value === "solutions");
  return JSON.parse(JSON.stringify(menu?.children || []));
}

export default {
  data() {
    return {
      options: [],
      optionsCN: JSON.parse(JSON.stringify(optionsCN)),
      optionsEN: JSON.parse(JSON.stringify(optionsEN)),
      defaultSolutionChildrenEN: getDefaultSolutionChildrenEN(),
      language: this.$route.params.language,
    };
  },
  created() {
    this.language = this.$route.params.language;
    this.$store.commit("menu/setMenuList", this.optionsCN);
    this.$store.commit("menu/setMenuList", this.optionsEN);
    this.options = this.language === "cn" ? this.optionsCN : this.optionsEN;
    this.getHomeData();
    this.getSolutionData();
  },
  mounted() {
    if (document.body.clientWidth < 1224) {
      this.mode = "vertical";
    }
    window.onresize = () => {
      if (document.body.clientWidth < 1224) {
        this.mode = "vertical";
      } else {
        this.mode = "horizontal";
      }
    };
  },
  methods: {
    /** @deprecated 使用 RegionChange */
    LanguageChange(val) {
      this.RegionChange(val);
    },

    /**
     * 区域切换：中 / US / EN
     * @param {String} val - cn | us | en
     */
    RegionChange(val) {
      if (val === "us" || this.$route.params.language === "us") {
        applyRegionSwitch(this, val);
        this.language = val;
        return;
      }

      const stayingOnPage = ![
        "products",
        "solutions",
        "home",
        "homeUs",
        "career",
        "stroke",
        "pelvicHealth",
      ].includes(this.$route.name);

      this.language = val;
      this.options = val === "cn" ? this.optionsCN : this.optionsEN;
      this.$store.commit("menu/setMenuList", this.options);
      applyRegionSwitch(this, val);

      if (stayingOnPage) {
        this.getHomeData(true);
        this.getSolutionData(true);
      }
    },

    getHomeDataCacheKey() {
      return `${this.language}-${this.$root.isMobile ? "phone" : "web"}`;
    },

    /**
     * 获取首页产品列表（带缓存，避免重复请求）
     */
    getHomeData(force = false) {
      const cacheKey = this.getHomeDataCacheKey();
      const productList = this.$store.state.menu.productList;

      if (!force && productList.length > 0 && homeDataCacheKey === cacheKey) {
        this.dealData();
        return;
      }

      if (!force && homeDataPromise && homeDataCacheKey === cacheKey) {
        homeDataPromise.then(() => this.dealData());
        return;
      }

      homeDataCacheKey = cacheKey;
      homeDataPromise = getIndexProductList({
        language: this.language,
        client: this.$root.isMobile ? "phone" : "web",
      })
        .then((res) => {
          if (res?.status === 200 && Array.isArray(res.data)) {
            this.$store.commit("menu/SET_PRODUCT_LIST", res.data);
          }
        })
        .finally(() => {
          homeDataPromise = null;
        });

      homeDataPromise.then(() => this.dealData());
    },

    /**
     * 获取解决方案菜单（带缓存，避免重复请求）
     */
    getSolutionData(force = false) {
      const lang = this.language;

      if (!force && schemeListByLang[lang]) {
        this.updateSolutionOptions(schemeListByLang[lang], lang);
        return;
      }

      if (!force && schemeListPromiseByLang[lang]) {
        schemeListPromiseByLang[lang].then((result) => {
          if (result) this.updateSolutionOptions(result.data, result.lang);
        });
        return;
      }

      schemeListPromiseByLang[lang] = getSchemeList({ language: lang })
        .then((res) => {
          const data =
            res?.status === 200 && Array.isArray(res.data) ? res.data : [];
          schemeListByLang[lang] = data;
          if (lang === this.language) {
            this.$store.commit("menu/SET_SOLUTION_LIST", data);
          }
          return { data, lang };
        })
        .finally(() => {
          schemeListPromiseByLang[lang] = null;
        });

      schemeListPromiseByLang[lang].then((result) => {
        if (result) this.updateSolutionOptions(result.data, result.lang);
      });
    },

    /**
     * 将接口返回的方案追加到对应语言的解决方案子菜单
     * @param {Array} solutionData - 接口数据
     * @param {String} lang - 请求时的语言 cn | en
     */
    updateSolutionOptions(solutionData, lang) {
      const isCn = lang === "cn";
      const targetOptions = isCn ? this.optionsCN : this.optionsEN;
      const menuIndex = getSolutionsMenuIndex(targetOptions);
      if (menuIndex === -1) return;

      const apiChildren = (solutionData || []).map((item) => ({
        value: `solutions-${item.id}`,
        label: item.groupName,
      }));
      const baseChildren = isCn
        ? DEFAULT_SOLUTION_CHILDREN_CN
        : this.defaultSolutionChildrenEN;

      targetOptions[menuIndex].children = [...baseChildren, ...apiChildren];

      if (lang === this.language) {
        this.options = isCn ? [...this.optionsCN] : [...this.optionsEN];
        this.$store.commit("menu/setMenuList", this.options);
      }
    },

    /**
     * 处理数据到菜单列表
     */
    dealData() {
      if (this.$store.state.menu.productList.length > 0) {
        const products = this.$store.state.menu.productList.map((item) => ({
          value: `products-${item.id}`,
          label: item.name,
        }));

        if (this.language === "cn") {
          this.optionsCN[0].children = products;
          this.options = [...this.optionsCN];
        } else {
          this.optionsEN[0].children = products;
          this.options = [...this.optionsEN];
        }
        this.$store.commit("menu/setMenuList", this.options);
      }
    },
  },
};
