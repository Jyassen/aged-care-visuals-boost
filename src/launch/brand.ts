export const BRAND = "YourMedGuy";
export const LEGAL_NAME = "Yassco Consulting Group LLC";
export const BRAND_LEGAL = `${BRAND}, a subsidiary of ${LEGAL_NAME}`;
export const PHONE_DISPLAY = "(917) 703-8352";
export const PHONE_TEL = "tel:+19177038352";
export const EMAIL = "help@yourmedguy.com";
export const ADDRESS = "21501 102nd Ave Queens Village NY 11429";
export const AREA = "Queens Village, Queens County, NY";
export const UPDATED = "10/26/2026";
export const LEGAL_EFFECTIVE = "10/12/2025";
export const HEADLINE = "Clear Medicare guidance for every step";
export const ABOUT_BLURB =
  "Explain Medicare parts and common plan options in plain language, including what each option typically covers and how to evaluate fit based on personal circumstances.";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=21501%20102nd%20Ave%20Queens%20Village%20NY%2011429";
export const HERO_IMAGE = "/launch/hero.jpg";

export const SERVICES = [
  {
    title: "Medicare Plan Education",
    body: "Explain Medicare parts and common plan options in plain language, including what each option typically covers and how to evaluate fit based on personal circumstances.",
  },
  {
    title: "Coverage Comparison Support",
    body: "Help review and compare plan features such as benefits, provider networks, and cost considerations so you can better understand differences between available options.",
  },
  {
    title: "Medicare Option Guidance",
    body: "Provide step-by-step guidance on navigating Medicare choices, including clarifying questions to ask and identifying what information is needed to understand your options.",
  },
] as const;

export const WHY = [
  "Medicare-focused guidance centered on plan education and coverage comparisons",
  "Local service for seniors in Queens Village and surrounding Queens County communities",
  "Support designed to clarify complex Medicare details and help you understand differences between plan options",
] as const;

export const LAUNCH_PAGES = [
  {
    path: "/launch",
    title: "YourMedGuy — Queens Village, Queens County, NY",
    description:
      "Clear Medicare guidance for every step. YourMedGuy helps Queens Village and Queens County residents understand Medicare options.",
  },
  {
    path: "/launch/about",
    title: "About — YourMedGuy",
    description:
      "YourMedGuy helps seniors in Queens Village understand Medicare options through clear, practical guidance.",
  },
  {
    path: "/launch/services",
    title: "Services — YourMedGuy",
    description:
      "Medicare plan education, coverage comparison support, and option guidance from YourMedGuy in Queens Village.",
  },
  {
    path: "/launch/contact",
    title: "Contact — YourMedGuy",
    description: "Request Medicare information from YourMedGuy. We follow up within 24 hours.",
  },
  {
    path: "/launch/privacy",
    title: "Privacy Policy — YourMedGuy",
    description: "Privacy policy for YourMedGuy, including how text-message opt-in data is handled.",
  },
  {
    path: "/launch/terms",
    title: "Terms of Service — YourMedGuy",
    description: "Terms of service and SMS program terms for YourMedGuy.",
  },
  {
    path: "/launch/sms",
    title: "SMS Program — YourMedGuy",
    description: "How the YourMedGuy text-message program works, including STOP and HELP.",
  },
] as const;
