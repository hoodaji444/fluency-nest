import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  CheckCircle,
  Award,
  BookOpen,
  Sparkles,
  Users,
  GraduationCap,
  Plane,
  Compass,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import EnquiryForm from "@/components/EnquiryForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Best French Classes in Sonipat & Murthal | Fluency Nest Institute",
  description:
    "Join top French language classes in Sonipat at SCO-10, Eldeco County. Certified faculty, DELF exam preparation (A1–B2) & French for Canada PR (TEF/TCF Canada). In-person & online batches.",
  keywords: [
    "French classes in Sonipat",
    "French language institute in Sonipat",
    "French coaching Murthal",
    "French classes near me Sonipat",
    "French language institute Sonipat Haryana",
    "learn French Sonipat",
    "DELF A1 classes Sonipat",
    "DELF B1 exam coaching Sonipat",
    "French for Canada PR Sonipat",
    "TEF Canada coaching Sonipat",
    "TCF Canada classes Sonipat",
    "foreign language institute in Sonipat",
    "German classes in Sonipat",
    "Spoken English institute Sonipat",
  ],
  alternates: {
    canonical: "https://www.fluencynest.in/french-classes-sonipat",
  },
  openGraph: {
    title: "Best French Classes in Sonipat & Murthal | Fluency Nest Institute",
    description:
      "Premier French, German & English language institute at SCO-10, Eldeco County, Murthal, Sonipat. Certified faculty, DELF exam prep, TEF Canada immigration training, and interactive batches.",
    url: "https://www.fluencynest.in/french-classes-sonipat",
    siteName: "Fluency Nest",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/classroom.jpg",
        width: 1200,
        height: 630,
        alt: "Fluency Nest French Language Institute Classroom in Sonipat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best French Classes in Sonipat & Murthal | Fluency Nest Institute",
    description:
      "Join offline & online French language classes in Sonipat at SCO-10, Eldeco County. CEFR A1 to B2 DELF certification & TEF Canada PR preparation.",
    images: ["/classroom.jpg"],
  },
};

const LOCAL_FAQS = [
  {
    q: "Where is Fluency Nest located in Sonipat for French classes?",
    a: "Our physical institute is located at SCO-10, Eldeco County, Murthal, Sonipat, Haryana — 131001. We are situated directly off the GT Karnal Road (NH 44), making it easily accessible for students from Sonipat city, Murthal, Panipat, Rai, and Kundli.",
  },
  {
    q: "Can I learn French from scratch (zero level) at your Sonipat centre?",
    a: "Yes! Our French A1 Beginner course requires zero prior knowledge. You will learn French phonetics, accent rules, daily greetings, sentence structures, basic vocabulary, and everyday conversations with our patient, certified faculty.",
  },
  {
    q: "Do you prepare students for TEF Canada or TCF Canada for Express Entry PR?",
    a: "Yes! French proficiency is one of the highest-leverage pathways to boost your Canada PR CRS score (up to 50+ additional points via the Francophone Category-Based Selection). We provide focused TEF/TCF exam modules covering oral comprehension, speaking fluency, and targeted practice.",
  },
  {
    q: "Do you provide preparation for international DELF / DALF exams?",
    a: "Yes. All our French courses strictly follow the CEFR international framework (A1, A2, B1, B2) aligned with the French Ministry of National Education (Alliance Française syllabus). We conduct mock examinations, oral interview simulations, and audio listening drills.",
  },
  {
    q: "Can university students from DCRUST Murthal, Ashoka, or OP Jindal commute easily?",
    a: "Yes. Eldeco County is less than 10 minutes from DCRUST Murthal and under 20 minutes from Rajiv Gandhi Education City (Ashoka University, SRM University). We offer flexible morning, evening, and weekend batches to match university timetables.",
  },
  {
    q: "Are classes available both in-person (offline) and live online?",
    a: "Yes. You can attend interactive in-person sessions at our modern Eldeco County classrooms, or join live instructor-led online sessions from home. Students can switch between modes during college exams or personal travel.",
  },
  {
    q: "How many students are there in a French batch?",
    a: "We cap every batch at 8 to 10 students. Language cannot be learned in crowded lecture halls; our round-table setup ensures that every learner speaks French in every single class.",
  },
];

export default function FrenchClassesSonipatPage() {
  const localSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LanguageSchool", "EducationalOrganization", "LocalBusiness"],
        "@id": "https://www.fluencynest.in/french-classes-sonipat#organization",
        "name": "Fluency Nest — French Language Institute Sonipat",
        "url": "https://www.fluencynest.in/french-classes-sonipat",
        "logo": "https://www.fluencynest.in/logo.png",
        "image": "https://www.fluencynest.in/classroom.jpg",
        "description":
          "Premier French language classes in Sonipat at SCO-10, Eldeco County, Murthal. Complete CEFR A1–B2, DELF examinations, and TEF / TCF Canada PR preparation.",
        "telephone": SITE_CONFIG.phone,
        "email": "info@fluencynest.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "SCO-10, Eldeco County",
          "addressLocality": "Murthal, Sonipat",
          "addressRegion": "Haryana",
          "postalCode": "131001",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 29.009771,
          "longitude": 77.077504,
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00",
          },
        ],
        "priceRange": "₹₹",
        "sameAs": [
          "https://instagram.com/fluencynest",
          "https://facebook.com/fluencynest",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.fluencynest.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "French Classes in Sonipat",
            "item": "https://www.fluencynest.in/french-classes-sonipat",
          },
        ],
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/french-classes-sonipat#course-french-a1",
        "name": "French A1 Language Course (Beginner to DELF A1)",
        "description": "Start learning French from absolute scratch. Master phonetics, everyday dialogues, basic grammar, and DELF A1 exam preparation in Sonipat.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": SITE_CONFIG.name,
          "sameAs": SITE_CONFIG.siteUrl,
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": ["ONLINE", "OFFLINE"],
          "courseWorkload": "PT60H",
        },
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/french-classes-sonipat#course-french-b1",
        "name": "French B1 Intermediate & DELF B1 Certification",
        "description": "Autonomous French conversational skills, work communication, and targeted DELF B1 preparation for study and career abroad.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": SITE_CONFIG.name,
          "sameAs": SITE_CONFIG.siteUrl,
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": ["ONLINE", "OFFLINE"],
          "courseWorkload": "PT80H",
        },
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/french-classes-sonipat#course-french-canada-pr",
        "name": "French for Canada PR & TEF / TCF Canada Exam Prep",
        "description": "Targeted French preparation for Express Entry immigration to Canada, boosting CRS score by up to 50+ points through Francophone rounds.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": SITE_CONFIG.name,
          "sameAs": SITE_CONFIG.siteUrl,
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": ["ONLINE", "OFFLINE"],
          "courseWorkload": "PT90H",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fluencynest.in/french-classes-sonipat#faq",
        "mainEntity": LOCAL_FAQS.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a,
          },
        })),
      },
    ],
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      {/* ── HERO ── */}
      <section className={styles.localHero}>
        <div className={styles.heroBg}>
          <Image
            src="/classroom.jpg"
            alt="Fluency Nest French Language Institute Classroom in Sonipat"
            fill
            priority
            quality={90}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>French Classes in Sonipat</span>
          </nav>

          <div className={styles.locationBadge}>
            <MapPin size={14} aria-hidden="true" />
            SCO-10, Eldeco County, Murthal, Sonipat · In-Person &amp; Online Batches
          </div>

          <h1 className={`heading-display heading-xl ${styles.heroTitle}`}>
            Best French Classes in<br />
            <em>Sonipat &amp; Murthal, Haryana</em>
          </h1>

          <p className={styles.heroSub}>
            Learn French with certified language mentors at our modern institute in Eldeco County, Sonipat.
            Small interactive batches (8–10 students), CEFR curriculum (A1–B2), DELF certification preparation, and specialized French for Canada PR (TEF / TCF).
          </p>

          <div className={styles.heroCTAs}>
            <a href="#enquiry-section" className="btn btn-primary btn-lg">
              Book In-Person Trial Class
              <ArrowRight size={17} />
            </a>
            <a href="#location-map" className="btn btn-outline-light btn-lg">
              View Institute Location &amp; Map
            </a>
          </div>

          <div className={styles.trustPills}>
            <div className={styles.trustPill}>
              <Award size={14} /> Registered with NSDC &amp; Skill India
            </div>
            <div className={styles.trustPill}>
              <CheckCircle size={14} /> ISO 9001 Certified
            </div>
            <div className={styles.trustPill}>
              <BookOpen size={14} /> Alliance Française &amp; CEFR Aligned
            </div>
            <div className={styles.trustPill}>
              <Plane size={14} /> TEF / TCF Canada PR Focus
            </div>
          </div>
        </div>
      </section>

      {/* ── CANADA PR SPECIAL FEATURE BANNER ── */}
      <section className={styles.sectionLocal} style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className={styles.canadaBanner}>
            <div>
              <span className={styles.canadaBadge}>
                <Plane size={14} /> Immigrate to Canada Faster
              </span>
              <h2 className={styles.canadaTitle}>
                Boost Your Canada PR by Up to 50+ Points with French
              </h2>
              <p className={styles.canadaDesc}>
                Under Canada&apos;s Express Entry system, French proficiency (NCLC 7 / B2 level in TEF or TCF Canada) unlocks massive CRS bonus points and qualifies you for targeted <strong>Francophone Category Draws</strong> with significantly lower cutoffs.
              </p>
              <div className={styles.canadaPointsList}>
                <div className={styles.canadaPointItem}>
                  <CheckCircle size={16} /> Earn up to 50 additional CRS points even if English is your primary language.
                </div>
                <div className={styles.canadaPointItem}>
                  <CheckCircle size={16} /> Targeted TEF/TCF exam coaching: Listening, Speaking, Reading &amp; Writing drills.
                </div>
                <div className={styles.canadaPointItem}>
                  <CheckCircle size={16} /> Flexible schedules tailored for working professionals and university graduates.
                </div>
              </div>
            </div>

            <div className={styles.canadaStatsBox}>
              <div className={styles.canadaBigStat}>+50</div>
              <div className={styles.canadaStatLabel}>Extra Express Entry CRS Points</div>
              <a href="#enquiry-section" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Enquire for Canada PR Batch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY STUDY FRENCH IN SONIPAT ── */}
      <section className={styles.sectionLocal}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Why Fluency Nest Sonipat</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Why Students in Sonipat &amp; Haryana Choose Fluency Nest
            </h2>
            <p className={styles.sectionDesc}>
              Whether you are preparing for international university admission in France/Canada, seeking school curriculum excellence (CBSE/IB), or targeting Canada immigration, our Sonipat centre delivers proven results.
            </p>
          </div>

          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Compass size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Prime Highway Location</h3>
              <p className={styles.highlightCardDesc}>
                Located at SCO-10, Eldeco County, Murthal with easy access from GT Karnal Road (NH 44). Ample parking, calm academic environment, and zero city traffic jams.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <GraduationCap size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Certified French Mentors</h3>
              <p className={styles.highlightCardDesc}>
                Learn from trainers who follow international French pedagogical standards. We emphasize authentic French phonetics, nasal vowels, liaison, and natural cadence from Day 1.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Users size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Round-Table Speaking Stations</h3>
              <p className={styles.highlightCardDesc}>
                Batches are strictly capped at 8–10 learners. You practice live dialogues, conversational role-plays, and pronunciation corrections in every class.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Award size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>DELF &amp; TEF Exam Preparation</h3>
              <p className={styles.highlightCardDesc}>
                Extensive practice with official DELF (Diplôme d&apos;Études en Langue Française) and TEF mock papers, audio comprehension tracks, and simulated speaking interviews.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <BookOpen size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Curated Study Workbooks</h3>
              <p className={styles.highlightCardDesc}>
                Students receive structured grammar sheets, vocabulary handbooks, and French audio modules designed to demystify complex French verb conjugations.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Sparkles size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>In-Person + Online Flexibility</h3>
              <p className={styles.highlightCardDesc}>
                Study in-person at our physical Sonipat institute or switch to live interactive online classes during university exams, vacations, or office travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSE LEVELS AT SONIPAT CENTRE ── */}
      <section className={`${styles.sectionLocal} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Course Curriculum</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              French Language Courses Offered in Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Follow the international CEFR framework from beginner phonetics to fluent bilingual capability.
            </p>
          </div>

          <div className={styles.levelsGrid}>
            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeA1}`}>A1 Beginner</span>
                <h3 className={styles.levelTitle}>French A1 — Débutant (Foundation)</h3>
                <p className={styles.levelDesc}>
                  Designed for absolute beginners. Master pronunciation rules, nasal phonetics, basic greetings, present tense conjugations, everyday vocabulary, and DELF A1 exam prep.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Alphabet &amp; Accents</span>
                  <span className={styles.skillTag}>Self Introduction</span>
                  <span className={styles.skillTag}>Numbers &amp; Telling Time</span>
                  <span className={styles.skillTag}>DELF A1 Prep</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline at SCO-10 &amp; Online</span>
                <a href="#enquiry-section" className="btn btn-outline-primary btn-sm">
                  Enquire Batch
                </a>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeA2}`}>A2 Elementary</span>
                <h3 className={styles.levelTitle}>French A2 — Élémentaire (Conversational)</h3>
                <p className={styles.levelDesc}>
                  Build confidence in daily conversations, narration of past events (Passé Composé &amp; Imparfait), restaurant orders, shopping, travel bookings, and social exchanges.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Past &amp; Future Tenses</span>
                  <span className={styles.skillTag}>Travel &amp; Daily Life</span>
                  <span className={styles.skillTag}>Listening Comprehension</span>
                  <span className={styles.skillTag}>DELF A2 Prep</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline at SCO-10 &amp; Online</span>
                <a href="#enquiry-section" className="btn btn-outline-primary btn-sm">
                  Enquire Batch
                </a>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeB1}`}>B1 Intermediate</span>
                <h3 className={styles.levelTitle}>French B1 — Intermédiaire (Autonomy)</h3>
                <p className={styles.levelDesc}>
                  Express opinions, justify viewpoints, engage in workplace discussions, write formal emails, and master complex grammar (Subjonctif, Conditionnel). Essential for study abroad.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Subjonctif &amp; Conditionnel</span>
                  <span className={styles.skillTag}>Debates &amp; Arguments</span>
                  <span className={styles.skillTag}>Formal Letter Writing</span>
                  <span className={styles.skillTag}>DELF B1 Exam Prep</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline at SCO-10 &amp; Online</span>
                <a href="#enquiry-section" className="btn btn-outline-primary btn-sm">
                  Enquire Batch
                </a>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeB2}`}>B2 Upper Intermediate</span>
                <h3 className={styles.levelTitle}>French B2 — Avancé (Professional &amp; TEF)</h3>
                <p className={styles.levelDesc}>
                  Near-fluent fluency for professional settings, French university direct admissions, and achieving NCLC 7 benchmark for maximum Canada Express Entry PR points.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Advanced Rhetoric</span>
                  <span className={styles.skillTag}>Academic Synthesis</span>
                  <span className={styles.skillTag}>TEF/TCF Canada NCLC 7</span>
                  <span className={styles.skillTag}>DELF B2 Exam Prep</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline at SCO-10 &amp; Online</span>
                <a href="#enquiry-section" className="btn btn-outline-primary btn-sm">
                  Enquire Batch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTITUTE AMENITIES ── */}
      <section className={styles.sectionLocal}>
        <div className="container">
          <div className={styles.amenitiesGrid}>
            <div className={styles.amenitiesImgWrapper}>
              <Image
                src="/classroom.jpg"
                alt="Fluency Nest Modern French Classroom and Speaking Setup in Sonipat"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <div className="section-label">State-of-the-Art Learning</div>
              <h2 className={`heading-display heading-md ${styles.sectionTitle}`}>
                Classroom Amenities at Our Sonipat Centre
              </h2>
              <p className={styles.sectionDesc} style={{ marginBottom: "28px" }}>
                Language mastery requires immersion. Our physical campus at Eldeco County is tailored for interactive communication and rapid phonetics absorption.
              </p>

              <div className={styles.amenitiesList}>
                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Smart Audio-Visual Classrooms</h4>
                    <p className={styles.amenityText}>
                      High-fidelity audio monitors and displays for authentic French listening tracks, movie clips, and native pronunciation training.
                    </p>
                  </div>
                </div>

                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Round-Table Speaking Stations</h4>
                    <p className={styles.amenityText}>
                      Collaborative round-table seating layout ensuring every student engages in active conversation with peers and faculty.
                    </p>
                  </div>
                </div>

                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>DELF &amp; TEF Mock Testing Lab</h4>
                    <p className={styles.amenityText}>
                      Full-length practice test sessions under real exam conditions to build timing, stamina, and confidence before the official exam.
                    </p>
                  </div>
                </div>

                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Doubt-Clearing &amp; Batch Repeat Support</h4>
                    <p className={styles.amenityText}>
                      Need to revise tricky French grammar before an exam? Benefit from dedicated mentor support and revision sessions at no extra fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADDRESS & GOOGLE MAP ── */}
      <section className={`${styles.sectionLocal} ${styles.sectionAlt}`} id="location-map">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Campus Location &amp; Directions</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Visit Fluency Nest in Eldeco County, Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Centrally situated to serve students and professionals across Sonipat, Murthal, Rai, Kundli, Ganaur, and Panipat.
            </p>
          </div>

          <div className={styles.locationGrid}>
            <div className={styles.locationCard}>
              <div>
                <h3 className={styles.locationCardTitle}>Campus Information</h3>
                <p className={styles.locationCardDesc}>
                  We invite you to visit our physical institute for a campus tour, level assessment, and consultation with our French trainers.
                </p>

                <div className={styles.infoRows}>
                  <div className={styles.infoRow}>
                    <MapPin size={18} className={styles.infoRowIcon} />
                    <div>
                      <span className={styles.infoRowLabel}>Physical Address</span>
                      <span className={styles.infoRowVal}>
                        SCO-10, Eldeco County, Murthal, Sonipat, Haryana — 131001
                      </span>
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <Phone size={18} className={styles.infoRowIcon} />
                    <div>
                      <span className={styles.infoRowLabel}>Phone &amp; WhatsApp</span>
                      <a href={`tel:${SITE_CONFIG.phone}`} className={styles.infoRowVal}>
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <Clock size={18} className={styles.infoRowIcon} />
                    <div>
                      <span className={styles.infoRowLabel}>Visiting Hours</span>
                      <span className={styles.infoRowVal}>
                        Monday – Saturday: 9:00 AM – 7:00 PM (Sunday: Closed)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hello! I want to enquire about French classes at Fluency Nest (SCO-10, Eldeco County, Sonipat). Please share upcoming batch timings.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Schedule an In-Person Campus Visit
                </a>
              </div>
            </div>

            <div className={styles.mapBox}>
              <iframe
                src="https://www.google.com/maps?q=29.009771,77.077504&amp;z=17&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fluency Nest French Language Institute — SCO-10, Eldeco County, Murthal, Sonipat"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY & TRIAL CLASS FORM ── */}
      <section className={styles.sectionLocal} id="enquiry-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">In-Person &amp; Online Batches</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Enquire for French Classes in Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Fill in your details below. Our academic team will get in touch with fee structures, upcoming batch schedules, and free trial class timings.
            </p>
          </div>

          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <EnquiryForm defaultCourse="french-a1" />
          </div>
        </div>
      </section>

      {/* ── LOCAL FAQS ── */}
      <section className={`${styles.sectionLocal} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Frequently Asked Questions</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Questions About French Classes in Sonipat
            </h2>
          </div>

          <div className={styles.faqList}>
            {LOCAL_FAQS.map((item, idx) => (
              <div key={idx} className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  <span>{item.q}</span>
                </div>
                <div className={styles.faqAnswer}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
