import { ossUrl } from "@/constants/ossAssets";

export const ACCESSORY_RECOMMENDATIONS_CN = [
  {
    id: "VD1",
    name: "VD1刺激线圈",
    product: "经颅磁刺激仪",
    scenario: "穿透能力强，适用于大脑深部刺激",
    image: ossUrl("accessoryRecommendations/VD1(VDC140).png"),
  },
  {
    id: "VY1",
    name: "VY1刺激线圈",
    product: "经颅磁刺激仪；磁刺激仪",
    scenario: "覆盖范围广，适用于大面积神经调控；疼痛类、骶神经刺激",
    image: ossUrl("accessoryRecommendations/VY1(VC-150).png"),
  },
  {
    id: "VB1",
    name: "VB1刺激线圈",
    product: "经颅磁刺激仪；磁刺激仪",
    scenario: "聚焦性强，适用于皮层精准刺激",
    image: ossUrl("accessoryRecommendations/VB1(VB-110).png"),
  },
  {
    id: "VB2s",
    name: "VB2s刺激线圈",
    product: "经颅磁刺激仪",
    scenario: "小尺寸设计，适用于皮层精准刺激",
    image: ossUrl("accessoryRecommendations/VB2s(VB-100).png"),
  },
  {
    id: "VR1",
    name: "VR1刺激线圈",
    product: "经颅磁刺激仪",
    scenario: "面向神经肌肉的定向刺激",
    image: ossUrl("accessoryRecommendations/VR1(VPC-90).png"),
  },
  {
    id: "VY2",
    name: "VY2刺激线圈",
    product: "经颅磁刺激仪",
    scenario: "小尺寸设计，适用于大面积神经调控",
    image: ossUrl("accessoryRecommendations/VY2.png"),
  },
  {
    id: "Form B",
    name: "Form B刺激线圈",
    product: "脉冲磁场治疗仪",
    scenario: "臀部肌肉强化、塑形",
    image: ossUrl("accessoryRecommendations/Gluteal Applicator.png"),
  },
  {
    id: "Tighten",
    name: "Tighten",
    product: "高频电灼仪",
    scenario: "腹部区域",
    image: ossUrl("accessoryRecommendations/高频电灼仪附件Tighten（RFIntima System Accessory Tighten L）.png"),
  },
  {
    id: "Smart Rolling",
    name: "Smart Rolling",
    product: "高频电灼仪",
    scenario: "智能旋转装置（搭配内阴手柄）",
    image: ossUrl("accessoryRecommendations/高频电灼仪附件Smart Rolling.png"),
  },
  {
    id: "信号采集器",
    name: "信号采集器",
    product: "生物反馈仪",
    scenario: "增加使用终端数量",
    image: ossUrl("accessoryRecommendations/信号采集器.png"),
  },
];

export const ACCESSORY_RECOMMENDATIONS_EN = [
  {
    id: "VDC-140",
    name: "VDC-140 Stimulation Coil",
    product: "MagNeuro",
    scenario: "Deeper brain stimulation for expanded clinical use",
    image: ossUrl("accessoryRecommendations/VDC-140.png"),
  },
  {
    id: "VC-150",
    name: "VC-150 Stimulation Coil",
    product: "MagNeuro",
    scenario: "Versatile for cortical and peripheral applications",
    image: ossUrl("accessoryRecommendations/VC-150.png"),
  },
  {
    id: "VB-110",
    name: "VB-110 Stimulation Coil",
    product: "MagNeuro",
    scenario: "Conforms to head curvature for focal, targeted stimulation",
    image: ossUrl("accessoryRecommendations/VB-110.png"),
  },
  {
    id: "VB-100",
    name: "VB-100 Stimulation Coil",
    product: "MagNeuro",
    scenario:
      "Compact size design, Conforms to head curvature for focal, targeted stimulation",
    image: ossUrl("accessoryRecommendations/VB-100.png"),
  },
  {
    id: "VPC-90",
    name: "VPC-90 Stimulation Coil",
    product: "MagNeuro",
    scenario: "Targeted stimulation for neuromuscular applications",
    image: ossUrl("accessoryRecommendations/VPC-90.png"),
  },
  {
    id: "Form B",
    name: "Gluteal Applicator (Form B)",
    product: "MagGraver",
    scenario: "Strengthening, toning and firming of buttocks.",
    image: ossUrl("accessoryRecommendations/Gluteal Applicator.png"),
  },
  {
    id: "Tighten",
    name: "Tighten",
    product: "RFIntima",
    scenario: "Abdominal area",
    image: ossUrl("accessoryRecommendations/高频电灼仪附件Tighten（RFIntima System Accessory Tighten L）.png"),
  },
  {
    id: "Secret Rose",
    name: "Secret Rose",
    product: "RFIntima",
    scenario: "Vulvar area",
    image: ossUrl("accessoryRecommendations/RFIntima System Accessory Secret Rose.png"),
  },
  {
    id: "Smart Rolling",
    name: "Smart Rolling",
    product: "RFIntima",
    scenario:
      "High-Frequency Electrosurgical Unit Intelligent rotating device (used with the Secret)",
    image: ossUrl("accessoryRecommendations/高频电灼仪附件Smart Rolling.png"),
  },
];

export const ACCESSORY_RECOMMENDATIONS = ACCESSORY_RECOMMENDATIONS_CN;

export function getAccessoryRecommendations(language = "cn") {
  return language === "en"
    ? ACCESSORY_RECOMMENDATIONS_EN
    : ACCESSORY_RECOMMENDATIONS_CN;
}
