import { ossUrl } from "@/constants/ossAssets";

/**
 * 美国站首页固定两屏产品（背景与文案为前端配置，可按设计稿替换 OSS 路径）
 */
export const US_HOME_PRODUCTS = [
  {
    id: "magneuro",
    name: "MagNeuro",
    banner: ossUrl("usMagNeuro-pro/bg_yyz@3x.png"),
    itemImage: ossUrl("usMagNeuro-pro/编组 7@3x(2).png"),
    itemCopywritingLevel2: "Transcranial magnetic stimulation",
    itemCopywriting:
      "An integrated transcranial magnetic stimulation device featuring multiple channels, disease-specific coils, and monitoring of pulse energy output.",
    productSlug: "MagNeuro",
  },
  {
    id: "magbelle",
    name: "MagBelle",
    banner: ossUrl("usMagNeuro-pro/bg_yyz@3x.png"),
    itemImage: ossUrl("usMagNeuro-pro/编组 7@3x(2).png"),
    itemCopywritingLevel2: "Pelvic floor magnetic stimulation",
    itemCopywriting:
      "A dedicated pelvic magnetic stimulation system designed for clinical efficiency and patient comfort.",
    productSlug: "MagBelle",
  },
];
