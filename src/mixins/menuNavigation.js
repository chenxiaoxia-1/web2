import $bus from "../components/eventBus";
import {
  TOP_LEVEL_PAGE_ANCHORS,
  scrollToPageAnchor,
  getInvestorRelationsPath,
} from "@/utils/pageAnchor";

export default {
  data() {
    return {
      isScrolled: false, // 页面是否滚动
    };
  },
  methods: {
    goToSocials(app) {
      const socialMedia = [
        {
          value: "facebook",
          net: "https://www.facebook.com/VisheeMedical",
        },
        {
          value: "linkedin",
          net: "https://www.linkedin.com/company/vishee",
        },
        {
          value: "instagram",
          net: "https://www.instagram.com/vishee_medical",
        },
        {
          value: "youtube",
          net: "https://www.youtube.com/@VisheeMedical",
        },
      ];

      // 查找匹配的社交媒体平台
      const platform = socialMedia.find((item) => item.value === app);

      if (platform) {
        window.open(platform.net, "_blank");
      } else {
        console.warn(`未找到对应的社交媒体平台: ${app}`);
      }
    },

    menuSelect(key, keyPath) {
      const languageItem = this.$route.params.language;
      // 保持菜单选中状态
      this.$store.commit("menu/setMenuDefaultActive", { key, keyPath });
      sessionStorage.setItem("pageId", key);
      $bus.$emit("pageId", key);
      const keyStr = key.split("-")[1];
      switch (keyPath[0]) {
        case "products":
          this.$router
            .push({
              path: `/${languageItem}/products/${
                this.$store.state.menu.productList.find((item) => {
                  return item.id === +keyStr;
                }).name
              }`,
            })
            .catch(() => {});

          break;
        case "solutions":
          let dataList = [];
          dataList = this.options[1].children;

          const obj = dataList.find((item) => {
            return item.value === key;
          });

          if (
            ["depression", "aesthetics", "pelvicHealth", "stroke"].includes(
              obj.value,
            )
          ) {
            this.$router.push({ path: `/${languageItem}/${obj.value}` });
          } else {
            this.$router
              .push({
                path: `/${languageItem}/solutions/${obj.label}`,
              })
              .catch(() => {});
          }

          break;
        case "career":
          if (location.pathname.indexOf("career") != -1) {
            $bus.$emit("pageId", key);
          } else {
            this.$router.push({
              path: `/${languageItem}/career`,
            });
          }
          break;
        case "investor":
          if (languageItem == "cn") {
            if (location.pathname.indexOf("investor") != -1) {
              $bus.$emit("pageId", key);
            } else {
              this.$router
                .push({
                  path: getInvestorRelationsPath(languageItem),
                })
                .catch(() => {});
            }
          } else {
            if (location.pathname.indexOf("investorRelations") != -1) {
              $bus.$emit("pageId", key);
            } else {
              this.$router
                .push({
                  path: getInvestorRelationsPath(languageItem),
                })
                .catch(() => {});
            }
          }
          break;
        case "services":
          if (location.pathname.indexOf("services") != -1) {
            $bus.$emit("pageId", key);
          } else {
            this.$router
              .push({
                path: `/${languageItem}/services`,
              })
              .catch(() => {});
          }
          break;
        case "aboutUs":
          if (location.pathname.indexOf("aboutUs") != -1) {
            $bus.$emit("pageId", key);
          } else {
            this.$router
              .push({
                path: `/${languageItem}/aboutUs`,
              })
              .catch(() => {});
          }
          break;
        default:
          break;
      }
      this.$emit("update:show", false);
    },
    /**
     * 处理菜单变更
     * @param {Object} node - 菜单节点
     * @param {Object} data - 菜单数据
     */
    menuChange(node, data) {
      if (!node || !data) return;

      const { parent, value } = node;
      const twoLevel = value;
      if (parent) {
        const oneLevel = parent.value;
        this.handleMenuNavigation(oneLevel, twoLevel);
      } else {
        this.handleTopLevelMenu(value);
      }
      this.$emit("update:show", false);
    },

    /**
     * 处理菜单导航
     * @param {String} oneLevel - 一级菜单
     * @param {String} twoLevel - 二级菜单
     * @param {String} keyStr - 菜单key
     */
    handleMenuNavigation(oneLevel, twoLevel) {
      sessionStorage.setItem("pageId", twoLevel);
      $bus.$emit("pageId", twoLevel);
      this.$store.commit("menu/setMenuDefaultActive", {
        key: twoLevel,
        keyPath: [oneLevel, twoLevel],
      });
      const routeMap = {
        products: () => this.navigateToProduct(twoLevel),
        solutions: () => this.navigateToSolution(twoLevel),
        career: () => this.navigateToCareer(twoLevel),
        investor: () => this.navigateToInvestor(twoLevel),
        services: () => this.navigateToServices(twoLevel),
        aboutUs: () => this.navigateToAbout(twoLevel),
      };

      if (routeMap[oneLevel]) {
        routeMap[oneLevel]();
      }
    },

    /**
     * 处理顶级菜单导航：定位到页面顶部 Banner 并滚至最上方
     * @param {String} value - 一级菜单 value（career / investor / services / aboutUs）
     */
    handleTopLevelMenu(value) {
      const bannerId = TOP_LEVEL_PAGE_ANCHORS[value];
      if (!bannerId) return;

      sessionStorage.setItem("pageId", bannerId);
      $bus.$emit("pageId", bannerId);
      this.$store.commit("menu/setMenuDefaultActive", {
        key: value,
        keyPath: [value],
      });

      const routeMap = {
        career: () => this.navigateToCareer(),
        investor: () => this.navigateToInvestor(),
        services: () => this.navigateToServices(),
        aboutUs: () => this.navigateToAbout(),
      };
      routeMap[value]?.();
    },

    /** 当前路由是否已在指定页面 */
    isOnPage(routeSegment) {
      return location.pathname
        .toLowerCase()
        .includes(routeSegment.toLowerCase());
    },

    /**
     * 导航到产品页面
     * @param {String} productId - 产品ID
     */
    navigateToProduct(idData) {
      const languageItem = this.$route.params.language;
      const [_, productId] = idData.split("-");

      if (!productId) return;
      $bus.$emit("pageId", idData);

      const product = this.$store.state.menu.productList.find(
        (item) => item.id == productId,
      );

      if (product) {
        this.$router
          .push({
            path: `/${languageItem}/products/${product.name}`,
          })
          .catch(() => {});
      }
    },

    /**
     * 导航到解决方案页面
     * @param {String} solutionId - 解决方案ID
     */
    navigateToSolution(solutionId) {
      const languageItem = this.$route.params.language;
      const solutions = this.options[1]?.children || [];
      const solution = solutions.find((item) => item.value === solutionId);

      if (solution) {
        if (
          ["depression", "aesthetics", "stroke", "pelvicHealth"].includes(
            solution.value,
          )
        ) {
          if (location.pathname.indexOf(`${solution.value}`) != -1) {
          } else {
            this.$router.push({ path: `/${languageItem}/${solution.value}` });
          }
        } else {
          this.$router.push({
            path: `/${languageItem}/solutions/${solution.label}`,
          });
        }
      }
    },

    /**
     * 导航到职业发展页面
     * @param {String} [subPath] - 子路径
     */
    navigateToCareer(subPath) {
      const languageItem = this.$route.params.language;
      const path = `/${languageItem}/career`;

      if (subPath) {
        if (this.isOnPage("career")) {
          $bus.$emit("pageId", subPath);
        } else {
          sessionStorage.setItem("pageId", subPath);
          this.$router.push({ path }).catch(() => {});
        }
        return;
      }

      if (this.isOnPage("career")) {
        scrollToPageAnchor(TOP_LEVEL_PAGE_ANCHORS.career);
      } else {
        this.$router.push({ path }).catch(() => {});
      }
    },

    /**
     * 导航到投资者关系页面
     */
    navigateToInvestor(subPath) {
      const languageItem = this.$route.params.language;
      const path = getInvestorRelationsPath(languageItem);
      const onPage = this.isOnPage(
        languageItem === "cn" ? "investor" : "investorRelations",
      );

      if (subPath) {
        if (onPage) {
          $bus.$emit("pageId", subPath);
        } else {
          sessionStorage.setItem("pageId", subPath);
          this.$router.push({ path }).catch(() => {});
        }
        return;
      }

      if (onPage) {
        scrollToPageAnchor(TOP_LEVEL_PAGE_ANCHORS.investor);
      } else {
        this.$router.push({ path }).catch(() => {});
      }
    },

    /**
     * 导航到服务页面
     * @param {String} [subPath] - 子路径
     */
    navigateToServices(subPath) {
      const languageItem = this.$route.params.language;
      const path = `/${languageItem}/services`;

      if (subPath) {
        if (this.isOnPage("services")) {
          $bus.$emit("pageId", subPath);
        } else {
          sessionStorage.setItem("pageId", subPath);
          this.$router.push({ path }).catch(() => {});
        }
        return;
      }

      if (this.isOnPage("services")) {
        scrollToPageAnchor(TOP_LEVEL_PAGE_ANCHORS.services);
      } else {
        this.$router.push({ path }).catch(() => {});
      }
    },
    /**
     * 导航到关于我们
     * @param {String} [subPath] - 子路径
     */
    navigateToAbout(subPath) {
      const languageItem = this.$route.params.language;
      const path = `/${languageItem}/aboutUs`;

      if (subPath) {
        if (this.isOnPage("aboutUs")) {
          $bus.$emit("pageId", subPath);
        } else {
          sessionStorage.setItem("pageId", subPath);
          this.$router.push({ path }).catch(() => {});
        }
        return;
      }

      if (this.isOnPage("aboutUs")) {
        scrollToPageAnchor(TOP_LEVEL_PAGE_ANCHORS.aboutUs);
      } else {
        this.$router.push({ path }).catch(() => {});
      }
    },
  },
};
