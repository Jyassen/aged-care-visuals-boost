export type PrecallId = "general" | "csnp-dsnp";

export type FunnelConfig = {
  slug: string;
  source: string;
  precall: PrecallId;
  topic: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  headline: string;
  headlineAccent: string;
  subhead: string;
  /** Long-form VSL. The C-SNP / D-SNP clip is a pre-call video, so it is not used here. */
  wistiaId?: string;
  videoTitle: string;
  problemHeading: string;
  problems: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const PHONE_DISPLAY = "888-355-1085";
export const PHONE_TEL = "tel:888-355-1085";

export const DISCLOSURE =
  "We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (1-800-633-4227), TTY: 1-877-486-2048, 24 hours a day, 7 days a week, to get information on all your options. This website is not connected with or endorsed by the United States Government or the federal Medicare program. Booking a review does not enroll you in a plan.";

export const PROOF = [
  { value: "10+ years", label: "Helping people understand Medicare" },
  { value: "NY & NJ", label: "Licensed Medicare brokers" },
  { value: "Free", label: "No plan change required on the call" },
];

export const HOW_STEPS = [
  {
    n: "01",
    title: "Pick a time",
    body: "Use the form on this page, or call during posted hours. You can book without watching the rest of the video.",
  },
  {
    n: "02",
    title: "Tell us the topic",
    body: "We confirm which coverage questions you want to cover. A family member can join with your permission.",
  },
  {
    n: "03",
    title: "Start with your questions",
    body: "Have your doctors, medication list, current coverage, and any letters nearby. You do not need to know the terminology first.",
  },
];

export const REVIEW_CHECKS = [
  {
    title: "The care you use",
    body: "Your primary doctor, specialists, and the facilities you rely on. Accepting Medicare and participating in a particular Medicare Advantage network are different questions.",
  },
  {
    title: "Your medications",
    body: "The exact name, dose, and pharmacy can change prescription coverage and estimated costs. A general promise about drug coverage is not enough.",
  },
  {
    title: "Costs when you use it",
    body: "Monthly premiums are only part of the picture. We also look at other out-of-pocket costs and the rules for the services you need.",
  },
];

export const SHARED_FAQS: { q: string; a: string }[] = [
  {
    q: "How much does the review cost?",
    a: "The consultation is free. Plan prices are the same as going to the insurance company. We are paid by the insurance company if you enroll, and the agent is paid the same no matter which plan you choose. You are not required to change coverage or decide on the call.",
  },
  {
    q: "Are you an insurance company?",
    a: "No. YourMedGuy is an independent brokerage. We help you compare plans we offer from companies such as Humana, UnitedHealthcare, Aetna, and Blue Cross Blue Shield. We explain the limits of that selection. For every option in your area, contact Medicare.gov or 1-800-MEDICARE.",
  },
  {
    q: "What should I have ready?",
    a: "Your doctors, a medication list with name, dose, and pharmacy, current coverage information, and any letters or notices. Keep your Medicare number out of public forms, text messages, and regular email. Have the card available privately for the conversation.",
  },
];

export const FUNNELS: FunnelConfig[] = [
  {
    slug: "medicare-card-arrived",
    source: "vsl-medicare-card-arrived",
    precall: "general",
    topic: "Medicare card arrived",
    seoTitle: "Your Medicare Card Arrived | Free Coverage Review | YourMedGuy",
    seoDescription:
      "Your Medicare card arrived. A licensed broker in New York and New Jersey can help you check start dates, prescriptions, and whether your doctors fit the plans we offer. Free, no obligation.",
    kicker: "Medicare card arrived",
    headline: "Your card arrived.",
    headlineAccent: "That does not settle every coverage question.",
    subhead:
      "Before the first appointment, check the Part A and Part B dates on the card, how prescriptions fit, and whether the doctors you see are in a plan network. Receiving the card does not answer drug coverage or how other insurance works with Medicare.",
    wistiaId: "xvwkulo513",
    videoTitle: "Medicare Card Arrived",
    problemHeading: "What the card does not answer",
    problems: [
      {
        title: "A card is not a full answer",
        body: "Start dates for Part A and Part B show when coverage begins. They do not explain drug coverage or how benefits you already have work with Medicare.",
      },
      {
        title: "Networks are a separate question",
        body: "A doctor can accept Medicare and still sit outside a particular Medicare Advantage network. Those arrangements need a check before you assume you can keep the same care.",
      },
      {
        title: "Timelines do not all match",
        body: "If you are considering another plan, its effective date and the enrollment opportunity that applies to you have to be checked. Not every coverage decision happens on the same day.",
      },
    ],
    faqs: [
      {
        q: "Does the red, white, and blue card mean I am done?",
        a: "It means Medicare coverage is in motion. The dates on the card help show when Part A and Part B begin. Prescriptions, other insurance, and plan networks are separate questions we can walk through.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "trusted-advisor",
    source: "vsl-trusted-advisor",
    precall: "general",
    topic: "Trusted advisor review",
    seoTitle: "A Medicare Review You Can Question | YourMedGuy",
    seoDescription:
      "A commercial sounds certain. A friend likes their plan. Book a free review with a licensed New York and New Jersey broker who starts with your doctors, prescriptions, and costs.",
    kicker: "Trusted advisor",
    headline: "Whose Medicare advice",
    headlineAccent: "is actually about you?",
    subhead:
      "A commercial sounds certain. A friend likes their plan. Someone else says something different. A useful review starts with your doctors, your prescriptions, and what you need the coverage to do — and with a clear explanation of which plans we can actually offer.",
    wistiaId: "5u3t0932ok",
    videoTitle: "Trusted Advisor",
    problemHeading: "Why a confident answer can still be the wrong one",
    problems: [
      {
        title: "Someone else’s plan is not yours",
        body: "A recommendation can be a starting point. Their doctors, medications, budget, and other insurance may be different from yours, so it still has to be checked.",
      },
      {
        title: "You should know what we can offer",
        body: "Ask what a plan costs, how it works, and which details still need a check. You should also understand which plans the person you are speaking with can actually offer.",
      },
      {
        title: "You decide what happens next",
        body: "Our role is to explain the options we represent and the tradeoffs. Your role is to decide, with enough information to ask the next question. You can take more time.",
      },
    ],
    faqs: [
      {
        q: "How is this different from a commercial or a friend’s advice?",
        a: "We start with the care you use, your medications, and the costs when you use coverage. We explain what we can verify, what needs another check, and the tradeoffs between the plans we offer. We do not treat someone else’s plan as your answer.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "new-to-medicare",
    source: "vsl-new-to-medicare",
    precall: "general",
    topic: "New to Medicare",
    seoTitle: "New to Medicare | Where to Start | YourMedGuy",
    seoDescription:
      "New to Medicare and every answer brings more questions. A licensed broker walks through Original Medicare, Medicare Advantage, prescriptions, and the timing that applies to you. Free review.",
    kicker: "New to Medicare",
    headline: "New to Medicare.",
    headlineAccent: "Start with what you have.",
    subhead:
      "The mail shows up. The commercials keep playing. People tell you what they chose. You do not have to master every letter of Medicare before asking for help. Start with what you have, what it covers, and the care you use.",
    wistiaId: "4syz3ev89r",
    videoTitle: "New to Medicare",
    problemHeading: "Where to start when every answer adds a question",
    problems: [
      {
        title: "The letters are a starting point",
        body: "Original Medicare includes Part A and Part B. Medicare Advantage is another way to get Medicare coverage through a private plan. Prescription coverage and other insurance belong in the same conversation.",
      },
      {
        title: "Other insurance may come first",
        body: "Employer, retiree, union, or other coverage deserves attention before a change. We can discuss the Medicare options we offer. Questions about those existing benefits may need the organization that provides them.",
      },
      {
        title: "Your neighbor’s plan is a clue, not a decision",
        body: "Their recommendation can be a starting point. Your doctors, prescriptions, costs, and coverage situation should guide the review. We work through those questions one step at a time.",
      },
    ],
    faqs: [
      {
        q: "Do I need to understand every part of Medicare before I call?",
        a: "No. You need a clear explanation of the coverage choices, their rules, and the timing that applies to you. Bring your questions. We will also review eligibility and the enrollment window for your situation.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "dual-eligible",
    source: "vsl-dual-eligible",
    precall: "csnp-dsnp",
    topic: "Dual eligible review",
    seoTitle: "Medicare and Medicaid Review | Dual Eligible Plans | YourMedGuy",
    seoDescription:
      "Have Medicare and Medicaid? Some Medicare Advantage plans are built for people who qualify for both. Eligibility, Medicaid category, and local availability need a check. Free review.",
    kicker: "Dual eligible review",
    headline: "Medicare and Medicaid",
    headlineAccent: "still leave questions a headline cannot answer.",
    subhead:
      "Some Medicare Advantage plans are designed for people who qualify for both Medicare and Medicaid. These are called Dual Eligible Special Needs Plans. The requirements differ by plan. Having both programs does not make every plan available.",
    wistiaId: "2zm25x5et5",
    videoTitle: "Dual Eligible Review",
    problemHeading: "What having both programs still leaves open",
    problems: [
      {
        title: "Both programs are not a blank check",
        body: "The Medicaid eligibility category the plan accepts, and the service area, need to be checked. We explain the options we offer, including how applicable plans coordinate Medicare and Medicaid benefits.",
      },
      {
        title: "A familiar card can hide a change",
        body: "Read the notices your plan sends if you are looking at a new plan year. Some requirements may change. That does not mean every person with both programs must switch.",
      },
      {
        title: "Bring the letters",
        body: "We can review what a notice says and identify the Medicare next steps. The goal is a clear picture of eligibility, coverage, and the options we represent, with room for your questions.",
      },
    ],
    faqs: [
      {
        q: "If I have Medicare and Medicaid, do I have to switch plans?",
        a: "No. Having both programs does not make every plan available, and a plan notice does not mean every person must switch. We check the Medicaid category, the service area, and the plans we offer before talking about a change.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "csnp-dsnp",
    source: "vsl-csnp-dsnp",
    precall: "csnp-dsnp",
    topic: "C-SNP or D-SNP review",
    seoTitle: "C-SNP and D-SNP Plan Review | YourMedGuy",
    seoDescription:
      "Asking about a Medicare plan for a qualifying chronic condition, or for people with Medicare and Medicaid? Eligibility and local availability need a check. Free consultation.",
    kicker: "C-SNP and D-SNP",
    headline: "A special needs plan",
    headlineAccent: "only fits if you qualify, and if it is offered where you live.",
    subhead:
      "Chronic Condition Special Needs Plans (C-SNP) are built around a qualifying chronic condition. Dual Eligible Special Needs Plans (D-SNP) are for people with Medicare and Medicaid. Eligibility and local availability have to be checked. We discuss the details privately.",
    videoTitle: "C-SNP and D-SNP review",
    problemHeading: "Eligibility is the first question, not the plan name",
    problems: [
      {
        title: "The condition has to match the plan",
        body: "A C-SNP is not a general Medicare Advantage plan with a new name. The plan is designed for specific chronic conditions, and you have to meet that plan’s rules. We do not assume a diagnosis makes a plan available.",
      },
      {
        title: "Medicare plus Medicaid is its own check",
        body: "A D-SNP depends on the Medicaid category the plan accepts and on the county it serves. Having both programs does not open every plan.",
      },
      {
        title: "Health details stay off text and email",
        body: "Have doctors, medications, current coverage, and notices ready for the call. Keep health details and personal numbers out of texts and regular email.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a C-SNP and a D-SNP?",
        a: "A C-SNP is a Medicare Advantage plan for people with certain chronic conditions. A D-SNP is for people who qualify for both Medicare and Medicaid. Each plan has its own eligibility rules and service area. We check both before talking about a change.",
      },
      ...SHARED_FAQS,
    ],
  },
];

export function funnelBySlug(slug: string) {
  return FUNNELS.find((funnel) => funnel.slug === slug);
}

export function precallPath(id: PrecallId) {
  return id === "general" ? "/precall" : "/precall/csnp-dsnp";
}

export const PRECALLS: Record<
  PrecallId,
  {
    wistiaId: string;
    seoTitle: string;
    seoDescription: string;
    kicker: string;
    headline: string;
    subhead: string;
    checklist: string[];
  }
> = {
  general: {
    wistiaId: "se1whepj9z",
    seoTitle: "Your Medicare Review Is Booked | YourMedGuy",
    seoDescription:
      "Thanks for booking a free Medicare consultation. Watch a short note on what to have ready. The call does not enroll you in a plan.",
    kicker: "Booking confirmation",
    headline: "Thanks for booking your free Medicare consultation.",
    subhead:
      "We will start with your questions, confirm the coverage topics you want to discuss, and review the plans we offer in your area. Please watch this short note before the call.",
    checklist: [
      "Doctor list, including specialists and the facilities you use",
      "Medications, with the name, dose, and pharmacy",
      "Current coverage information and any letters or notices",
      "A family member can join with your permission",
    ],
  },
  "csnp-dsnp": {
    wistiaId: "x48ppxqtsu",
    seoTitle: "Your C-SNP or D-SNP Review Is Booked | YourMedGuy",
    seoDescription:
      "Thanks for scheduling a free consultation about a chronic condition plan or Medicare and Medicaid. Eligibility and local availability are checked on the call.",
    kicker: "Special needs confirmation",
    headline: "Thanks for scheduling your free consultation.",
    subhead:
      "If you are asking about a plan for a qualifying chronic condition, or for people with Medicare and Medicaid, eligibility and local availability need to be checked. Watch this short note, then keep the details for the call.",
    checklist: [
      "Doctors, medications, current coverage, and relevant notices",
      "Any plan letters you want explained",
      "Questions about a chronic condition plan (C-SNP) or Medicare and Medicaid (D-SNP)",
      "Keep health details and personal numbers out of texts and regular email",
    ],
  },
};
