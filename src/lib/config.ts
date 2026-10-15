// ============================================================
// FLUENT NEST — SITE CONFIGURATION
// Edit this file to update all business information across the site
// ============================================================

export const SITE_CONFIG = {
  // Business Information
  name: "Fluency Nest",
  tagline: "German Language Institute",
  description:
    "Teaching since 2024. Proven online language education, now expanding with our dedicated offline institute in Sonipat, Haryana. Learn German (A1–C2), French & English with expert live guidance.",

  // Contact Details — UPDATE THESE
  phone: "+91 90509 06044",
  whatsapp: "+919050906044", // No spaces or dashes — used in WhatsApp links
  whatsappMessage:
    "Hello, I am interested in your German language courses. Please share the course details and fees.",
  email: "info@fluencynest.in",

  // Address
  address: {
    line1: "SCO-10, Eldeco County",
    line2: "Murthal, Sonipat",
    city: "Sonipat",
    state: "Haryana",
    pin: "131001",
    country: "India",
    full: "SCO-10, Eldeco County, Murthal, Sonipat, Haryana — 131001",
  },

  // Social Media — UPDATE THESE
  social: {
    instagram: "https://instagram.com/fluencynest",
    facebook: "https://facebook.com/fluencynest",
  },

  // Hours
  hours: {
    weekdays: "Monday – Saturday: 9:00 AM – 7:00 PM",
    sunday: "Sunday: Closed",
  },

  // SEO & Branding
  siteUrl: "https://www.fluencynest.in",
  logo: "/logo.png",
  ogImage: "/og-image.png",
};

// ============================================================
// COURSES CONFIGURATION
// ============================================================

export const COURSES = [
  {
    id: "german-a1",
    language: "German",
    level: "A1",
    title: "Beginner",
    subtitle: "German A1 — Beginner",
    description:
      "Start your German language journey from absolute zero. Learn basic vocabulary, everyday expressions, simple conversations, pronunciation, and the foundational grammar you need to introduce yourself and interact in familiar situations.",
    skills: ["Basic vocabulary", "Everyday expressions", "German pronunciation", "Simple grammar", "Self-introduction"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Start Here",
    badgeColor: "#10b981",
    color: "#1e3a5f",
  },
  {
    id: "german-a2",
    language: "German",
    level: "A2",
    title: "Elementary",
    subtitle: "German A2 — Elementary",
    description:
      "Build on your A1 foundation and develop greater conversational confidence. Learn to talk about familiar topics, understand common phrases, and express yourself in routine situations with improved grammar and vocabulary.",
    skills: ["Conversational fluency", "Everyday topics", "Grammar expansion", "Reading comprehension", "Listening skills"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Popular",
    badgeColor: "#3b82f6",
    color: "#1e3a5f",
  },
  {
    id: "german-b1",
    language: "German",
    level: "B1",
    title: "Intermediate",
    subtitle: "German B1 — Intermediate",
    description:
      "Develop independent communication skills and significantly improve your reading, writing, listening, and speaking abilities. This level is recommended for those preparing for German language examinations or planning to study or work in a German-speaking environment.",
    skills: ["Independent communication", "Extended reading", "Structured writing", "Exam preparation", "Professional vocabulary"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Exam Ready",
    badgeColor: "#f59e0b",
    color: "#1e3a5f",
  },
  {
    id: "german-b2",
    language: "German",
    level: "B2",
    title: "Upper Intermediate",
    subtitle: "German B2 — Upper Intermediate",
    description:
      "Achieve advanced communication skills for academic, professional, and everyday situations in Germany. At B2, you will understand complex texts, express ideas fluently, and interact with native speakers with a high degree of confidence.",
    skills: ["Academic German", "Professional communication", "Complex text comprehension", "Debate & discussion", "Advanced writing"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Advanced",
    badgeColor: "#8b5cf6",
    color: "#1e3a5f",
  },
  {
    id: "german-c1",
    language: "German",
    level: "C1",
    title: "Advanced",
    subtitle: "German C1 — Advanced",
    description:
      "Master complex, demanding German content with a high degree of accuracy and fluency. C1 is ideal for those pursuing higher education in Germany, working in professional German-speaking environments, or preparing for advanced language certifications. You will understand a wide range of longer texts and express yourself spontaneously and flexibly.",
    skills: ["Academic & professional fluency", "Complex text analysis", "Spontaneous expression", "Advanced grammar mastery", "Certification preparation"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Professional",
    badgeColor: "#c8102e",
    color: "#1e3a5f",
  },
  {
    id: "german-c2",
    language: "German",
    level: "C2",
    title: "Mastery",
    subtitle: "German C2 — Mastery",
    description:
      "Reach the highest level of German language proficiency. At C2, you will understand virtually everything heard or read, summarise information from different spoken and written sources, and express yourself spontaneously with the precision and nuance of a highly proficient speaker. This is the level of near-native fluency.",
    skills: ["Near-native fluency", "Nuanced expression", "Critical analysis in German", "C2 exam preparation", "Research-level comprehension"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Mastery",
    badgeColor: "#0d1b2e",
    color: "#1e3a5f",
  },
  {
    id: "french",
    language: "French",
    level: "A1–B2",
    title: "French Language",
    subtitle: "French Language Courses",
    description:
      "Explore the French language from beginner to upper-intermediate level. Learn French grammar, vocabulary, conversational skills, and develop the ability to communicate confidently in French-speaking contexts.",
    skills: ["French grammar", "Vocabulary building", "Conversation practice", "Reading & writing", "Cultural context"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Available",
    badgeColor: "#0ea5e9",
    color: "#1e3a5f",
  },
  {
    id: "english",
    language: "English",
    level: "All Levels",
    title: "English Language",
    subtitle: "English Language Courses",
    description:
      "Strengthen your English communication skills for personal, academic, or professional growth. Covers spoken English, grammar, writing, and comprehension for learners at all levels.",
    skills: ["Spoken English", "Grammar & writing", "Business communication", "Reading comprehension", "Confidence building"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "All Levels",
    badgeColor: "#10b981",
    color: "#1e3a5f",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Can complete beginners learn German at Fluency Nest?",
    answer:
      "Yes, absolutely. Our German A1 course is specifically designed for complete beginners with no prior knowledge of the German language. You will start from the very basics, including pronunciation, the alphabet, simple vocabulary, and foundational grammar, and progress at a comfortable pace.",
  },
  {
    question: "Which German course should I start with?",
    answer:
      "If you have never studied German before, we recommend starting with the German A1 (Beginner) course. If you have some prior knowledge, we can help you assess your current level and place you in the appropriate course. Feel free to contact us or submit an enquiry and our team will guide you.",
  },
  {
    question: "What is the difference between A1, A2, B1, B2, C1, and C2?",
    answer:
      "These levels follow the Common European Framework of Reference for Languages (CEFR). A1 and A2 are beginner to elementary levels, covering basic communication and everyday language. B1 is intermediate, where you develop independent communication skills. B2 is upper intermediate, ideal for academic and professional contexts. C1 is advanced — the level required by most German universities for admission. C2 is mastery level, representing near-native proficiency. Each level builds on the previous one.",
  },
  {
    question: "Do you offer online German classes?",
    answer:
      "Yes, we offer both online and offline German classes. Our online classes are conducted through live, interactive sessions, ensuring the same quality of learning as offline classes. You can choose the learning mode that suits your schedule and location.",
  },
  {
    question: "How long has Fluency Nest been training students?",
    answer:
      "Fluency Nest was established in 2024 as an online language training institute. After successfully mentoring students across India online with structured, CEFR-aligned courses, we have taken our next big leap by opening our dedicated offline physical centre in Sonipat, Haryana.",
  },
  {
    question: "Do you offer offline classes in Sonipat?",
    answer:
      "Yes! After building a trusted track record online since 2024, we are now open offline at SCO-10, Eldeco County, Murthal, Sonipat. Students in Sonipat and the NCR can now attend in-person classroom batches with round-table speaking sessions, or continue to join our live interactive online batches.",
  },
  {
    question: "How can I enquire about course fees?",
    answer:
      "Course fees can vary based on the level, batch, and learning mode. Please submit an enquiry using our online form or contact us directly via phone or WhatsApp, and our team will provide you with the current fee structure and available batch timings.",
  },
  {
    question: "How do I register for a trial or demo class?",
    answer:
      "You can submit an enquiry using our enquiry form, mentioning your interest in a trial class. Our team will get in touch with you to arrange a convenient trial session so you can experience our teaching approach before committing to a full course.",
  },
  {
    question: "Do you provide preparation for Goethe or other German language examinations?",
    answer:
      "Our courses are structured according to CEFR levels (A1, A2, B1, B2, C1, C2), which align with the content tested in official German language examinations. However, Fluency Nest is not an official examination centre. Examinations such as Goethe-Zertifikat are conducted by the Goethe-Institut and other authorised centres. We can help you prepare for such examinations through our courses, but registration for the examinations must be done directly with the respective examination body.",
  },
];
