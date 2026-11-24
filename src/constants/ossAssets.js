export const OSS_BASE =
  "https://vishee.oss-cn-shanghai.aliyuncs.com/official/official_img/official_img";

export function ossUrl(relativePath = "") {
  if (!relativePath) return OSS_BASE;
  return `${OSS_BASE}/${relativePath.replace(/^\//, "")}`;
}
