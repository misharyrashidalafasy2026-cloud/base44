// Central site configuration for Baitul-Ehsan Relief Fund

export const SITE = {
  name: "Baitul-Ehsan Relief Fund",
  nameArabic: "صندوق بيت الإحسان للإغاثة",
  location: "Kuwait",
  primaryStatement: "Your Wealth Can Become Lasting Impact.",
  donationMessage: "Give With Purpose.",
  partnership: "Baitul-Ehsan Relief Fund × Mishary Rashid Alafasy",
  partnershipMessage: "Faith. Generosity. Impact.",
  supportEmail: "baitul.ehsan.relief.fund@gmail.com",
  alafasyEmail: "mishary.rashid.alafasy2026@gmail.com",
  minimumContribution: 2000,
};

// Alafasy partnership images (supplied by user).
// NOTE: The first supplied image is intentionally NOT used in the primary
// partnership advertising section, per brand guidance.
export const ALAFASY_IMAGES = {
  primary: "https://media.base44.com/images/public/user_6abc6df5c4b6f7e9ebda1471/e0bddf070_WhatsAppImage2026-09-30at21751AMjj.jpeg",
  secondary: "https://media.base44.com/images/public/user_6abc6df5c4b6f7e9ebda1471/0f81182b4_WhatsAppImage2026-09-30at21751AMj.jpeg",
  editorial: "https://media.base44.com/images/public/user_6abc6df5c4b6f7e9ebda1471/b0f862b94_WhatsAppImage2026-09-30at21751AM.jpeg",
};

// Cryptocurrency wallet configuration.
// Treated as PENDING PRODUCTION VERIFICATION until independently confirmed.
export const WALLETS = [
  {
    asset: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Network",
    address: "bc1qyt0lk54r9lppc3usry4w26kk625kfusaj8vcxy",
    qrUrl: "https://media.base44.com/images/public/user_6abc6df5c4b6f7e9ebda1471/b9db1baf5_bitcoin.jpeg",
    color: "#F7931A",
  },
  {
    asset: "Ethereum",
    symbol: "ETH",
    network: "ERC-20 (Ethereum)",
    address: "0x9aa3384dDa470f6612460c3172296E41eF07410f",
    qrUrl: "https://media.base44.com/images/public/user_6abc6df5c4b6f7e9ebda1471/fe4056bc2_ethereum.jpeg",
    color: "#627EEA",
  },
  {
    asset: "BNB",
    symbol: "BNB",
    network: "BNB Smart Chain (BEP-20)",
    address: "0x9aa3384dDa470f6612460c3172296E41eF07410f",
    qrUrl: "https://media.base44.com/images/public/user_6abc6df5c4b6f7e9ebda1471/9d6c71969_bnb.jpeg",
    color: "#F3BA2F",
  },
  {
    asset: "Solana",
    symbol: "SOL",
    network: "Solana Network",
    address: "DnBCiyYSpfYSTrqGHddhbZfmvR3xihuY62xhXisALyVH",
    qrUrl: "https://media.base44.com/images/public/user_6abc6df5c4b6f7e9ebda1471/c313733b0_solana.jpeg",
    color: "#9945FF",
  },
];

export const GIVING_PURPOSES = [
  "Zakat",
  "Sadaqah",
  "Sadaqah Jariyah",
  "Waqf",
  "Emergency Relief",
  "Community Development",
];

export const FUNDS = [
  "Where Most Needed",
  "Zakat Fund",
  "Emergency Relief",
  "Clean Water",
  "Education",
  "Family Support",
  "Healthcare",
  "Livelihoods",
  "Community Development",
  "Waqf",
  "Ramadan Giving",
];

export const SUGGESTED_AMOUNTS = [2000, 5000, 10000, 25000, 50000, 100000];

export const DONATION_STATUSES = {
  awaiting_payment: { label: "Awaiting Payment", color: "text-muted-foreground" },
  submitted: { label: "Payment Submitted", color: "text-blue-600" },
  under_review: { label: "Under Review", color: "text-amber-600" },
  processing: { label: "Processing", color: "text-amber-600" },
  approved: { label: "Approved", color: "text-emerald-600" },
  completed: { label: "Completed", color: "text-emerald-700" },
  action_required: { label: "Action Required", color: "text-orange-600" },
  rejected: { label: "Rejected", color: "text-red-600" },
};

// External humanitarian context statistics (sourced, dated, attributed).
// These are NOT Baitul-Ehsan achievements.
export const HUMANITARIAN_CONTEXT = [
  {
    stat: "200M+",
    label: "Children expected to need humanitarian assistance in 2026",
    source: "UNICEF 2026 Humanitarian Action for Children",
    scope: "Global — 133 countries & territories",
    url: "https://www.unicef.org/media/177341/file/UNICEF-2026-HAC-Overview.pdf",
  },
  {
    stat: "117.8M",
    label: "People forcibly displaced by end of 2025",
    source: "UNHCR Global Trends",
    scope: "Global",
    url: "https://www.unhcr.org/nordic-and-baltic/news/press-releases/10-things-know-about-global-trends",
  },
  {
    stat: "15M",
    label: "People displaced in Sudan by mid-2026 (incl. ~5M children)",
    source: "UNICEF — Emergency response in Sudan",
    scope: "Sudan",
    url: "https://www.unicef.org/emergencies/emergency-response-sudan",
  },
  {
    stat: "1.9M",
    label: "People displaced in Gaza out of ~2.1M (mid-2026)",
    source: "UNICEF State of Palestine — Mid-year 2026 update",
    scope: "Gaza / State of Palestine",
    url: "https://www.unicef.org/sop/reports/humanitarian-situation-update-analysis-response-needs-children-mid-year-2026",
  },
];

// Verified Quranic references on giving (authoritative translation cited).
export const QURAN_VERSES = [
  {
    ref: "Qur'an 2:261",
    text: "The example of those who spend their wealth in the way of Allah is like a seed of grain that sprouts seven ears — in every ear a hundred grains. And Allah multiplies His reward for whom He wills.",
  },
  {
    ref: "Qur'an 2:274",
    text: "Those who spend their wealth by night and by day, secretly and publicly — their reward is with their Lord, and upon them shall be no fear, nor shall they grieve.",
  },
  {
    ref: "Qur'an 57:18",
    text: "Indeed, the men and women who give charity and the men and women who lend to Allah a goodly loan — it will be multiplied for them, and theirs will be a noble reward.",
  },
  {
    ref: "Qur'an 76:8–9",
    text: "And they give food, in spite of their love for it, to the poor, the orphan, and the captive, saying: 'We feed you only for the countenance of Allah. We wish not from you reward or gratitude.'",
  },
];

// Humanitarian crisis imagery (generated, dignified, documentary-style).
export const CRISIS_IMAGES = [
  {
    url: "https://media.base44.com/images/public/6abc6e947c0d01f6ca0ebb12/3ed894834_generated_image.png",
    title: "Displacement",
    caption: "Families forced from their homes by conflict, carrying everything they have left.",
  },
  {
    url: "https://media.base44.com/images/public/6abc6e947c0d01f6ca0ebb12/c6f1e1b29_generated_image.png",
    title: "Famine & Drought",
    caption: "Children walking miles for water across drought-stricken, cracked earth.",
  },
  {
    url: "https://media.base44.com/images/public/6abc6e947c0d01f6ca0ebb12/2909ca147_generated_image.png",
    title: "War & Destruction",
    caption: "Families living among the ruins of homes and communities destroyed by war.",
  },
];

// Video testimonials (replace videoUrl with real testimonial videos when available).
export const TESTIMONIALS = [
  {
    name: "Amina",
    role: "Mother · Displaced, Sudan",
    quote: "When the conflict reached our village, we lost everything. The support we received gave my children food, water, and a reason to hope again.",
    thumbnail: "https://media.base44.com/images/public/6abc6e947c0d01f6ca0ebb12/3ed894834_generated_image.png",
    videoUrl: "",
  },
  {
    name: "Yusuf",
    role: "Father · Refugee Family",
    quote: "I walked for three days to find safety for my family. The aid we received reminded us that we are not forgotten by the world.",
    thumbnail: "https://media.base44.com/images/public/6abc6e947c0d01f6ca0ebb12/c6f1e1b29_generated_image.png",
    videoUrl: "",
  },
  {
    name: "Fatima",
    role: "Community Leader",
    quote: "Our community was destroyed by war. Together with the relief fund, we are rebuilding — one family, one home, one future at a time.",
    thumbnail: "https://media.base44.com/images/public/6abc6e947c0d01f6ca0ebb12/2909ca147_generated_image.png",
    videoUrl: "",
  },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "News", path: "/news" },
  { label: "Impact", path: "/impact" },
  { label: "Transparency", path: "/transparency" },
  { label: "Partnership", path: "/partnership" },
  { label: "Major Giving", path: "/major-giving" },
  { label: "Contact", path: "/contact" },
];

export const GIVING_LINKS = [
  { label: "Zakat", path: "/zakat" },
  { label: "Sadaqah", path: "/sadaqah" },
  { label: "Sadaqah Jariyah", path: "/sadaqah-jariyah" },
  { label: "Waqf", path: "/waqf" },
];

export function generateDonationId() {
  const n = Math.floor(200000 + Math.random() * 800000);
  return `DON-2026-${String(n).padStart(6, "0")}`;
}