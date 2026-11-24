import { ossUrl } from "@/constants/ossAssets";

export const MAGNEURO_HERO_BG = ossUrl("usMagNeuro-pro/bg_yyz@3x.png");

export const MAGNEURO_SECTION_NAV = [
  { id: "research", label: "Research" },
  { id: "product", label: "Product" },
  { id: "faqs", label: "Patient FAQs" },
];

export const MAGNEURO_AUDIENCES = {
  patients: {
    key: "patients",
    toggleLabel: "For Patients",
    compactLabel: "for patients",
    heroTitle: "A drug-free path forward for depression.",
    heroCta: "Learn More",
    sections: {
      research: {
        title: "Research",
        blocks: [
          {
            heading: "What is rTMS?",
            body:
              "Repetitive transcranial magnetic stimulation (rTMS) is a non-invasive neuromodulation therapy that uses magnetic pulses to stimulate nerve cells in the brain.",
          },
          {
            heading: "History of rTMS",
            body:
              "Decades of clinical research support rTMS as an evidence-based option for patients who have not responded adequately to medication.",
          },
        ],
      },
      product: {
        title: "Product",
        blocks: [
          {
            heading: "MagNeuro™",
            body:
              "An integrated transcranial magnetic stimulation platform with multiple channels, disease-specific coils, and pulse energy monitoring.",
          },
        ],
      },
      faqs: {
        title: "Patient FAQs",
        items: [
          {
            q: "What does a treatment session feel like?",
            a: "Patients typically hear a clicking sound and feel a tapping sensation on the scalp. Most tolerate treatment well.",
          },
          {
            q: "How long is a course of treatment?",
            a: "A standard course often includes daily sessions over several weeks, as prescribed by your clinician.",
          },
        ],
      },
    },
  },
  professionals: {
    key: "professionals",
    toggleLabel: "For Professionals",
    compactLabel: "for professionals",
    heroTitle: "Clinical-grade rTMS for your practice.",
    heroCta: "Explore Clinical Data",
    sections: {
      research: {
        title: "Research",
        blocks: [
          {
            heading: "Clinical evidence",
            body:
              "Peer-reviewed studies demonstrate rTMS efficacy across depression and related indications, with growing protocol standardization.",
          },
          {
            heading: "Protocol overview",
            body:
              "Indication-specific parameters including targeted brain region, intensity, pulses per session, and course length can be aligned to your workflow.",
          },
        ],
      },
      product: {
        title: "Product",
        blocks: [
          {
            heading: "MagNeuro & MagNeuro ONE™",
            body:
              "Flexible coil options, integrated navigation, and monitoring of pulse energy output support repeatable, clinic-ready protocols.",
          },
        ],
      },
      faqs: {
        title: "Patient FAQs",
        items: [
          {
            q: "What training is required for staff?",
            a: "Vishee provides product training and clinical support resources for qualified healthcare professionals.",
          },
          {
            q: "Can protocols be customized?",
            a: "Preset and customizable parameters are available subject to local regulatory requirements.",
          },
        ],
      },
    },
  },
};

export function sectionDomId(sectionId) {
  return `us-mn-${sectionId}`;
}