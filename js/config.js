/**
 * Feilan Global — Site Configuration
 * TODO: Replace all YOUR_* placeholders before going live.
 * Copy/text snippets can later be moved to Decap CMS; keep keys stable.
 */
window.FEILAN_CONFIG = {
  /* --- Third-party IDs --- */
  FORM_PATIENT_ENDPOINT: "https://forminit.com/f/YOUR_PATIENT_FORM_ID",   // TODO: Forminit patient form ID
  FORM_PARTNER_ENDPOINT: "https://forminit.com/f/YOUR_PARTNER_FORM_ID",   // TODO: Forminit partner form ID
  ANALYTICS_TOKEN: "YOUR_CLOUDFLARE_WEB_ANALYTICS_TOKEN",                 // TODO: Cloudflare Web Analytics token

  /* --- Contact (display only; mailto disabled until mailbox is live) --- */
  CONTACT_EMAIL: "contact@flgj.net",
  CONTACT_PHONE: "+86-000-0000-0000",
  CONTACT_COMING_SOON: true,           // shows "Coming Soon" tag, disables mailto/tel
  ADDRESS_ZH: "中国 · 浙江省杭州市萧山区宁围街道通北路189号",
  ADDRESS_EN: "No. 189 Tongbei Road, Ningwei Street, Xiaoshan District, Hangzhou, Zhejiang Province, China",
  OFFICIAL_SITE: "www.flgj.net",

  /* --- QR code image paths (placeholder SVGs until real QR images available) --- */
  QR_WHATSAPP: "/assets/img/placeholder-whatsapp.svg",
  QR_WECHAT: "/assets/img/placeholder-wechat.svg",

  /* --- Legal / compliance copy (single source of truth) --- */
  COST_NOTE_EN: "Costs vary by hospital, condition, and treatment plan; actual quotes are provided by partner hospitals.",
  COST_NOTE_ZH: "费用因医院、病情、方案而异，具体以合作医院报价为准。",
  MEDICAL_DISCLAIMER_EN: "Feilan Global provides medical information consultation and medical coordination services only. We are not a medical institution and do not provide medical diagnosis, treatment, or prescribe medications. All clinical decisions, treatments, and outcomes are the sole responsibility of the partner medical institutions and their licensed physicians. The information on this website does not constitute medical advice and should not be relied upon as a substitute for professional medical consultation.",
  MEDICAL_DISCLAIMER_ZH: "飞澜国际仅提供医疗信息咨询与就医协调服务，并非医疗机构，不提供医学诊断、治疗或处方。所有临床决策、治疗方案及诊疗效果均由合作医疗机构及其执业医师独立做出并承担相应医疗责任。本网站信息不构成医疗建议，不应作为专业医疗咨询的替代。"
};
