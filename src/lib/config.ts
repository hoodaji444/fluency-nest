// ============================================================
// FLUENT NEST — SITE CONFIGURATION
// Edit this file to update all business information across the site
// ============================================================

export const SITE_CONFIG = {
  // Business Information
  name: "Fluency Nest",
  tagline: "German, French & Spoken English Institute in Sonipat",
  description:
    "Fluency Nest is Sonipat's premier German language institute — offline centre coming soon in Sonipat! Certified Goethe & Telc exam coaching (A1–C2), French & Spoken English classes, and live interactive online batches nationwide.",

  // Contact Details — UPDATE THESE
  phone: "+91 93507 76044",
  whatsapp: "+919350776044", // No spaces or dashes — used in WhatsApp links
  whatsappMessage:
    "Hello, I am interested in your language courses. Please share the course details and fees.",
  email: "info@fluencynest.in",

  // Address
  address: {
    line1: "Sonipat (Offline Centre Coming Soon)",
    line2: "Haryana",
    city: "Sonipat",
    state: "Haryana",
    pin: "131001",
    country: "India",
    full: "Sonipat, Haryana — 131001 (Offline Centre Coming Soon)",
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

  // ── FRENCH COURSES (A1–C2) ──────────────────────────────────
  {
    id: "french-a1",
    language: "French",
    level: "A1",
    title: "Beginner",
    subtitle: "French A1 — Beginner (DELF A1)",
    description:
      "Begin your French language journey from scratch. Master French phonetics, basic greetings, everyday vocabulary, and core grammar to introduce yourself, ask simple questions, and converse in day-to-day situations.",
    skills: ["French phonetics & accents", "Everyday vocabulary", "Basic sentence structure", "Greetings & self-introduction", "DELF A1 exam prep"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Start Here",
    badgeColor: "#10b981",
    color: "#1e3a5f",
  },
  {
    id: "french-a2",
    language: "French",
    level: "A2",
    title: "Elementary",
    subtitle: "French A2 — Elementary (DELF A2)",
    description:
      "Build on your foundation with enriched vocabulary and essential compound tenses (Passé Composé & Imparfait). Confidently handle travel situations, social interactions, routine tasks, and personal descriptions.",
    skills: ["Past & future tenses", "Travel & daily interactions", "Reading short French texts", "Conversational listening", "DELF A2 exam prep"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Popular",
    badgeColor: "#3b82f6",
    color: "#1e3a5f",
  },
  {
    id: "french-b1",
    language: "French",
    level: "B1",
    title: "Intermediate",
    subtitle: "French B1 — Intermediate (DELF B1)",
    description:
      "Attain independent communication in French. Express personal opinions, describe ambitions and experiences, understand authentic audio, and prepare for immigration, university entry, and DELF B1 certification.",
    skills: ["Independent conversation", "Subjunctive & conditional moods", "Formal writing & emails", "Spontaneous speaking", "DELF B1 certification"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Exam Ready",
    badgeColor: "#f59e0b",
    color: "#1e3a5f",
  },
  {
    id: "french-b2",
    language: "French",
    level: "B2",
    title: "Upper Intermediate",
    subtitle: "French B2 — Upper Intermediate (DELF B2)",
    description:
      "Achieve fluent, articulate expression for professional and academic spheres in France, Canada, and Francophone nations. Master complex argument construction, advanced syntax, and authentic media debate.",
    skills: ["Academic & business French", "Complex argumentation", "Authentic media analysis", "Fluency with native speakers", "DELF B2 / TEF / TCF prep"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Advanced",
    badgeColor: "#8b5cf6",
    color: "#1e3a5f",
  },
  {
    id: "french-c1",
    language: "French",
    level: "C1",
    title: "Advanced",
    subtitle: "French C1 — Advanced (DALF C1)",
    description:
      "Express yourself spontaneously and fluently without searching for words. Analyse sophisticated literature, academic essays, and socio-economic texts with structural precision and idiomatic command.",
    skills: ["Spontaneous sophisticated speech", "Nuanced academic writing", "Complex literary analysis", "DALF C1 qualification", "Professional negotiation"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Professional",
    badgeColor: "#c8102e",
    color: "#1e3a5f",
  },
  {
    id: "french-c2",
    language: "French",
    level: "C2",
    title: "Mastery",
    subtitle: "French C2 — Mastery (DALF C2)",
    description:
      "Reach the pinnacle of French language proficiency. Understand with ease virtually everything heard or read, synthesise complex arguments from varied sources, and express subtle shades of meaning with native elegance.",
    skills: ["Near-native command", "Subtle nuance & rhetoric", "High-level critique & synthesis", "DALF C2 exam mastery", "Diplomatic & academic French"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Mastery",
    badgeColor: "#0d1b2e",
    color: "#1e3a5f",
  },

  // ── ENGLISH COURSES (A1–C2) ─────────────────────────────────
  {
    id: "english-a1",
    language: "English",
    level: "A1",
    title: "Beginner",
    subtitle: "English A1 — Foundational Beginner",
    description:
      "Start from the ground up to overcome hesitation. Master basic everyday vocabulary, simple sentence construction, clear pronunciation, and self-introductions in a warm, encouraging environment.",
    skills: ["Overcoming hesitation", "Daily vocabulary & phrases", "Basic grammar foundations", "Clear pronunciation", "Simple self-introduction"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Start Here",
    badgeColor: "#10b981",
    color: "#1e3a5f",
  },
  {
    id: "english-a2",
    language: "English",
    level: "A2",
    title: "Elementary",
    subtitle: "English A2 — Elementary Speaking",
    description:
      "Gain day-to-day conversational ease. Practice speaking about routine tasks, shopping, work backgrounds, and social situations with correct verb forms and enhanced listening comprehension.",
    skills: ["Routine conversation", "Tenses & question framing", "Everyday social English", "Listening comprehension", "Sentence fluency"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Popular",
    badgeColor: "#3b82f6",
    color: "#1e3a5f",
  },
  {
    id: "english-b1",
    language: "English",
    level: "B1",
    title: "Intermediate",
    subtitle: "English B1 — Intermediate & Spoken Fluency",
    description:
      "Speak independently without frequent pauses. Master expressing opinions, narrating experiences, writing structured emails, and preparing for initial job interviews and travel overseas.",
    skills: ["Spoken fluency without pause", "Formal & informal emails", "Interview communication", "Expressing ideas & opinions", "IELTS 5.0–5.5 foundation"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Fluency",
    badgeColor: "#f59e0b",
    color: "#1e3a5f",
  },
  {
    id: "english-b2",
    language: "English",
    level: "B2",
    title: "Upper Intermediate",
    subtitle: "English B2 — Professional & Business Fluency",
    description:
      "Ideal for corporate professionals and study abroad aspirants. Learn high-impact workplace communication, presentations, group discussions, advanced idioms, and IELTS / TOEFL preparation.",
    skills: ["Corporate presentations", "Group discussions & debates", "Business correspondence", "Advanced idioms & phrasals", "IELTS 6.0–6.5 preparation"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Career Ready",
    badgeColor: "#8b5cf6",
    color: "#1e3a5f",
  },
  {
    id: "english-c1",
    language: "English",
    level: "C1",
    title: "Advanced",
    subtitle: "English C1 — Advanced & Global Academic",
    description:
      "Communicate with precision, authority, and elegance in executive or university environments. Tackle complex academic texts, executive leadership communication, and achieve IELTS 7.0–8.0+ readiness.",
    skills: ["Executive leadership speech", "Advanced academic writing", "IELTS 7.0–8.0+ preparation", "Nuanced persuasion & rhetoric", "Critical discourse analysis"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Executive",
    badgeColor: "#c8102e",
    color: "#1e3a5f",
  },
  {
    id: "english-c2",
    language: "English",
    level: "C2",
    title: "Mastery",
    subtitle: "English C2 — Native Mastery & Public Speaking",
    description:
      "Reach complete mastery of the English language. Deliver compelling keynote presentations, write publication-grade reports, and express complex conceptual nuances with effortless ease.",
    skills: ["Public speaking & diplomacy", "Native-like precision & flair", "High-level argumentation", "IELTS 8.5–9.0 band readiness", "Publishing & editorial writing"],
    duration: "Contact us for batch timings",
    fee: "Contact us for fee details",
    mode: ["Offline Classes", "Online Classes"],
    badge: "Mastery",
    badgeColor: "#0d1b2e",
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
      "Fluency Nest was established in 2024 as an online language training institute. After successfully mentoring students across India online with structured, CEFR-aligned courses, we are now launching our dedicated physical offline classroom institute in Sonipat (Coming Soon).",
  },
  {
    question: "Do you offer offline in-person classes?",
    answer:
      "We are launching our dedicated offline in-person classroom batches in Sonipat very soon! Currently, our live interactive online batches are actively running nationwide with small batch sizes and round-table speaking sessions. You can also pre-register your interest for our upcoming Sonipat offline batches.",
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

// ============================================================
// TESTIMONIALS & REVIEWS
// ============================================================

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  course: "English" | "French" | "German";
  courseBadge: string;
  quote: string;
  rating: number;
  type: "parent" | "student";
}

export const TESTIMONIALS: Testimonial[] = [
  // ── ENGLISH ──────────────────────────────────────────────
  {
    id: "ankit-chahal-english",
    name: "Ankit Chahal",
    role: "Senior Analyst, MNC (Gurugram)",
    location: "Sonipat",
    course: "English",
    courseBadge: "Corporate Communication & Interview Lab",
    quote:
      "I understood English well technically, but I always hesitated during international client meetings and presentations. The debate sessions and round-table speaking stations at Fluency Nest completely changed my workplace presence and confidence.",
    rating: 5,
    type: "student",
  },
  {
    id: "megha-juneja-english",
    name: "Megha Juneja",
    role: "MBA Student, O.P. Jindal Global University",
    location: "Sonipat",
    course: "English",
    courseBadge: "Public Speaking & GD Mastery",
    quote:
      "Campus placement group discussions require spontaneous thinking and clear articulation under pressure. The mock GD rounds and constructive feedback from the mentors helped me crack my dream consulting placement effortlessly.",
    rating: 5,
    type: "student",
  },
  {
    id: "gaurav-deswal-english",
    name: "Gaurav Deswal",
    role: "Software Developer, Settled in Toronto",
    location: "Toronto, Canada",
    course: "English",
    courseBadge: "IELTS 7.5+ & Advanced Fluency",
    quote:
      "Before moving abroad, I needed to improve my natural spoken fluency and IELTS score. The structured speaking modules helped me score Band 8 in IELTS Speaking and made adapting to workplace communication in Canada completely seamless.",
    rating: 5,
    type: "student",
  },
  {
    id: "aarav-sharma",
    name: "Sunita Sharma",
    role: "Mother of Aarav (Class 5)",
    location: "Sonipat",
    course: "English",
    courseBadge: "English Fluency Batch",
    quote:
      "Before joining Fluency Nest, Aarav was very shy and hesitated to speak English during school assemblies. Within just three months of attending classes at Fluency Nest, his hesitation vanished and his vocabulary improved remarkably.",
    rating: 5,
    type: "parent",
  },

  // ── GERMAN ───────────────────────────────────────────────
  {
    id: "rohan-dahiya-german",
    name: "Rohan Dahiya",
    role: "Final Year B.Tech Student",
    location: "Sonipat",
    course: "German",
    courseBadge: "German A2 & B1 — Offline",
    quote:
      "Balancing college lectures with language coaching was tough until I joined Fluency Nest. The trainers explained tricky German grammar with real clarity, helping me clear Goethe-Zertifikat B1 on my very first attempt.",
    rating: 5,
    type: "student",
  },
  {
    id: "simran-kaur-german",
    name: "Simran Kaur",
    role: "Homemaker & Spouse Visa Aspirant",
    location: "Panipat",
    course: "German",
    courseBadge: "German A1 — Live Online",
    quote:
      "Starting a new language after a long study gap felt intimidating, but the teachers were so patient and encouraging. Within two months, I gained the vocabulary and confidence needed to clear my A1 exam for my German family reunion visa.",
    rating: 5,
    type: "student",
  },
  {
    id: "naveen-hooda-german",
    name: "Naveen Hooda",
    role: "Software Engineer, Settled in Frankfurt",
    location: "Frankfurt, Germany",
    course: "German",
    courseBadge: "German B2 — Evening Batch",
    quote:
      "Even after moving to Germany, managing conversations at work and government offices was stressful. Fluency Nest's flexible online evening sessions helped me level up to B2 and speak German spontaneously without hesitating.",
    rating: 5,
    type: "student",
  },
  {
    id: "priya-sharma-german",
    name: "Priya Sharma",
    role: "M.Sc. Student, TU Munich",
    location: "Munich, Germany",
    course: "German",
    courseBadge: "German B1/B2 Exam Prep",
    quote:
      "Getting admission to a German public university required solid language proficiency. The intensive mock exams and targeted speaking sessions at Fluency Nest were crucial in preparing me for academic life here in Munich.",
    rating: 5,
    type: "student",
  },
  {
    id: "vikram-malik-german",
    name: "Vikram Malik",
    role: "Automotive Engineer, Settled in Stuttgart",
    location: "Stuttgart, Germany",
    course: "German",
    courseBadge: "German B2 — Chancenkarte & Work Visa",
    quote:
      "Clearing Goethe B2 was mandatory for my engineering job role in Germany. The exam-focused mocks and professional speaking drills at Fluency Nest were the reason I cleared my Goethe exam in 4 months and secured my EU Blue Card.",
    rating: 5,
    type: "student",
  },
  {
    id: "aakash-bansal-german",
    name: "Aakash Bansal",
    role: "Engineering Graduate & RWTH Aachen Admit",
    location: "Sonipat",
    course: "German",
    courseBadge: "German B1/B2 Fast-Track",
    quote:
      "Studying at top German public universities tuition-free requires solid German command. The structured CEFR syllabus and daily speaking practice at the Sonipat center made passing Goethe B2 smooth and stress-free.",
    rating: 5,
    type: "student",
  },

  // ── FRENCH ───────────────────────────────────────────────
  {
    id: "divya-sachdeva-french",
    name: "Divya Sachdeva",
    role: "IT Consultant & Canada PR Aspirant",
    location: "Delhi NCR",
    course: "French",
    courseBadge: "TEF Canada & DELF B2 Fast-Track",
    quote:
      "Learning French from scratch for Canada Express Entry points sounded impossible until I joined Fluency Nest. The trainers focus relentlessly on TEF exam strategies and listening comprehension, making rapid progress achievable.",
    rating: 5,
    type: "student",
  },
  {
    id: "sahil-grover-french",
    name: "Sahil Grover",
    role: "University Student, French Studies (DU)",
    location: "Sonipat",
    course: "French",
    courseBadge: "DELF B1/B2 Certification",
    quote:
      "The university curriculum covered mostly literature, but Fluency Nest gave me genuine conversational fluency and pronunciation correction. It helped me pass my DELF B2 exam and secure my French university admission.",
    rating: 5,
    type: "student",
  },
  {
    id: "rohan-riya-nanda",
    name: "Pooja Nanda",
    role: "Mother of Rohan & Riya (Class 6)",
    location: "Chandigarh",
    course: "French",
    courseBadge: "French Middle School — Online",
    quote:
      "Both my children picked French as their third language in school and were struggling with pronunciation and reading. The teachers at Fluency Nest broke everything down with clear phonetics and constant practice, making learning smooth and enjoyable for them.",
    rating: 5,
    type: "parent",
  },
];
