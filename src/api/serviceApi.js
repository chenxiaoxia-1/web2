import axios from "../utils/axios";

//===========================解决方案分组首页======================
export function getSolutionGroupData(params) {
  return axios.get(
    "/web/scheme-group?sgid=" + params.sgid + "&client=" + params.client,
  );
}

export function geIindex() {
  return axios.get("/web/index");
}

export function geIproductGroup(params) {
  return axios.get("/web/product-group?pgid=" + params);
}

export function geIproductItem() {
  return axios.get("/web/product-item");
}

export function getSchemeItem() {
  return axios.get("/web/scheme-item");
}
//-----------------------------产品详情--------------
export function getProductInfo(params) {
  return axios.get("/web/product?productId=" + params);
}
//----------------------------行政区域信息--------------------
export function getDistricts(params) {
  return axios.get("/sys/districts?fid=" + params.fid);
}
//---------------------------国家电话区号信息-------------------
export function getPhoneCodeList() {
  return axios.get("/sys/getPhoneCodeList");
}
//---------------------------国家信息-------------------
export function getCountryList() {
  return axios.get("/sys/getCountryList");
}
//----------------------------添加联系信息--------------------
export function addLinkInfo(params) {
  return axios.post("/web/addLinkInfo", params);
}
//----------------------------获取首页信息----------------------
export function getIndexProductList(params) {
  return axios.get(
    "/web/getIndexProductList?language=" +
      params.language +
      "&client=" +
      params.client,
  );
}
//----------------------------获取产品详情页信息----------------------
export function getIndexProductById(params) {
  return axios.get("/web/getIndexProductById?productId=" + params.productId);
}
//----------------------------获取产品详情页信息----------------------
export function getIndexProductByIndexId(params) {
  return axios.get(
    "/web/getProductListByIndexId?id=" + params.id + "&client=" + params.client,
  );
}
//-----------------------------获取产品下拉列表------------------------
export function getAllProductList() {
  return axios.get("/index/getAllProductList");
}
//-----------------------------获取方案列表------------------------
export function getSchemeList(params) {
  return axios.get("/scheme/getSchemeList?language=" + params.language);
}
//-----------------------------投资者关系--公告列表------------------------
export function getAnnouncementList(params) {
  return axios.get(
    "/web/getAnnouncementList?pageNum=" +
      params.pageNum +
      "&pageSize=" +
      params.pageSize +
      "&category=" +
      params.category +
      "&sort=" +
      params.sort,
  );
}
//-----------------------------投资者关系--公告列表------------------------
export function getAnnouncement(params) {
  return axios.get(
    "/web/getAnnouncement?announceTime=" +
      params.announceTime +
      "&announcementId=" +
      params.announcementId,
  );
}

//-----------------------------求职者查询职位------------------------
export function getJobList(params) {
  return axios.get(
    "/web/getJobList?pageNum=" +
      params.pageNum +
      "&pageSize=" +
      params.pageSize +
      "&wd=" +
      params.wd +
      "&jobPlaceIds=" +
      params.jobPlaceIds +
      "&jobCategoryIds=" +
      params.jobCategoryIds +
      "&source=" +
      params.source,
  );
}
//-----------------------------根据id查询职位详情------------------------
export function getJobById(params) {
  return axios.get("/web/getJobById?id=" + params);
}
//-----------------------------提交简历信息------------------------
export function addJobSeeker(params) {
  return axios.post("/web/addJobSeeker", params);
}
//-----------------------------查询职位类别列表（下拉框）------------------------
export function getJobCategoryList() {
  return axios.get("/recruitment/getJobCategoryList");
}
//-----------------------------查询工作地点列表（下拉框）------------------------
export function getJobPlaceList() {
  return axios.get("/recruitment/getJobPlaceList");
}
//-----------------------------分页查询------------------------
export function getActivityList(params) {
  return axios.get(
    "/web/getActivityList?language=" +
      params.language +
      "&pageNum=" +
      params.pageNum +
      "&pageSize=" +
      params.pageSize,
  );
}
//-----------------------------投资者关系--活动详情------------------------
export function getActivityById(params) {
  return axios.get("/web/getActivityById?id=" + params.id);
}
//-----------------------------分页查询------------------------
export function getNewsList(params) {
  return axios.get(
    "/web/getNewsList?language=" +
      params.language +
      "&pageNum=" +
      params.pageNum +
      "&pageSize=" +
      params.pageSize +
      "&sort=" +
      params.sort,
  );
}
//-----------------------------投资者关系--活动详情------------------------
export function getNewsById(params) {
  return axios.get("/web/getNewsById?id=" + params.id);
}
/**
 * 查询TDK列表
 * @param params
 * @returns
 */
export function getTdkByPage(params) {
  return axios.get("/web/getTdkByPage", { params });
}
/**
 * 查询公告列表
 * @param params
 * @returns
 */
export function getNoticeList(params) {
  return axios.get("/web/getNoticeList", { params });
}

/**
 *根据产品组查询文章
 * @param params
 * @returns
 */
export function getProductArticles(params) {
  return axios.get("/web/getProductArticles", { params });
}

// ----------------------------- 查询产品文章详情------------------------
export function searchProductArticle(id) {
  return axios.get("/web/getProductArticleById?id=" + id);
}

// ----------------------------- 分页查询投资人者活动日列表------------------------
export function getActivityInvestList({
  language,
  pageNum,
  pageSize,
  sort,
  type,
}) {
  return axios.get(
    "/web/getActivityInvestList?language=" +
      language +
      "&pageNum=" +
      pageNum +
      "&pageSize=" +
      pageSize +
      "&sort=" +
      sort,
  );
}

// ----------------------------- 查询投资人活动详情------------------------
export function searchActivityInvest(id) {
  return axios.get("/web/getActivityInvestById?id=" + id);
}

// ----------------------------- 客户服务--培训课程列表------------------------
export function getTrainList(params) {
  return axios.get(
    "/web/getTrainList?pageNum=" +
      params.pageNum +
      "&pageSize=" +
      params.pageSize +
      "&keyWord=" +
      (params.keyWord || ""),
  );
}
