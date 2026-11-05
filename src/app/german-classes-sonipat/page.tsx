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
  Compass,
  Sparkles,
  Users,
  GraduationCap,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import EnquiryForm from "@/components/EnquiryForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "German Language Institute in Sonipat | Goethe & Telc Prep (A1–C2)",
  description:
    "Fluency Nest is the premier German Language Institute in Sonipat (Offline Centre Coming Soon). Certified Goethe & Telc exam coaching (A1–C2), small batches (8–10) & live interactive online classes nationwide.",
  keywords: [
    "German Language Institute in Sonipat",
    "German Language Institute Sonipat",
    "german institute in sonipat",
    "sonipat german language institute",
    "german language course in sonipat",
    "german language course sonipat",
    "german language classes in sonipat",
    "best german course in sonipat",
    "german a1 course in sonipat",
    "german b1 course in sonipat",
    "german coaching in sonipat",
    "german institute near DCRUST",
    "goethe exam preparation sonipat",
    "telc german coaching sonipat",
    "study in germany course sonipat",
    "chancenkarte german course sonipat",
    "foreign language institute in sonipat",
    "Fluency Nest Sonipat",
    "French classes in Sonipat",
    "Spoken English institute Sonipat",
  ],
  alternates: {
    canonical: "https://www.fluencynest.in/german-classes-sonipat",
  },
  openGraph: {
    title: "German Language Institute in Sonipat | Fluency Nest",
    description:
      "Premier German Language Institute in Sonipat (Offline Centre Coming Soon). Certified Goethe & Telc exam coaching (A1–C2), small batches & interactive classes.",
    url: "https://www.fluencynest.in/german-classes-sonipat",
    siteName: "Fluency Nest",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/classroom.jpg",
        width: 1200,
        height: 630,
        alt: "Fluency Nest German Language Institute in Sonipat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "German Language Institute in Sonipat | Fluency Nest",
    description:
      "Premier German Language Institute in Sonipat (Offline Centre Coming Soon). Certified Goethe & Telc exam coaching (A1–C2) with small batches.",
    images: ["/classroom.jpg"],
  },
};

const LOCAL_FAQS = [
  {
    q: "Which is the best German language course in Sonipat?",
    a: "Fluency Nest offers the leading German language course in Sonipat, Haryana — 131001 (Offline Centre Coming Soon). We specialize in CEFR-aligned German courses from A1 to C2, offering official Goethe-Zertifikat and Telc exam preparation, interactive smart classrooms, small batches strictly limited to 8–10 students, and direct faculty mentorship. Live interactive online batches are actively running.",
  },
  {
    q: "What are the course levels, duration, and batch timings for German courses in Sonipat?",
    a: "We offer all levels following the international CEFR framework: A1 (Beginner: 6–8 weeks / 60 hours), A2 (Elementary: 8–10 weeks / 60–70 hours), B1 (Intermediate / Visa: 10–12 weeks / 80 hours), and B2 (Upper Intermediate / Career: 12 weeks / 80–90 hours). We provide morning, evening, and weekend batches for university students and working professionals.",
  },
  {
    q: "What is the fee structure for the German language course in Sonipat?",
    a: "Course fees vary by level (A1, A2, B1, B2) and learning mode (in-person classroom vs. live interactive online). Our fees include comprehensive study materials, Amazon KDP published vocabulary and grammar handbooks, exam mock test series, and batch repeat revision support. Submit an enquiry or message us on WhatsApp (+91 93507 76044) for current batch schedules and fee details.",
  },
  {
    q: "Where do students from Sonipat take their official Goethe-Zertifikat exams?",
    a: "Official Goethe-Zertifikat examinations for Haryana and Delhi-NCR students are conducted at Goethe-Institut / Max Mueller Bhavan in New Delhi. Because Sonipat is directly connected via GT Karnal Road (NH 44) and Delhi Metro, students can easily travel to the exam centre. Fluency Nest prepares you with authentic mock test papers, audio listening drills, and timed speaking interviews so you pass with confidence on your first attempt.",
  },
  {
    q: "Which German course level do I need for higher education in Germany or the Opportunity Card (Chancenkarte)?",
    a: "For English-taught Master's degrees, universities generally recommend German A1 or A2 for daily life, but German-taught Bachelor's or Master's programmes require B2 or C1. For the German Opportunity Card (Chancenkarte), German A1 awards points, while A2 or B1 significantly boosts your eligibility points and job prospects. Most employers require a minimum of B1 or B2 proficiency.",
  },
  {
    q: "Can complete beginners join German classes at your Sonipat centre?",
    a: "Yes! Our German A1 Beginner course starts from absolute zero. You will learn the German alphabet, pronunciation, basic vocabulary, everyday dialogues, and foundational grammar with supportive faculty guidance.",
  },
  {
    q: "Can students from DCRUST, Ashoka University, or Panipat commute easily?",
    a: "Yes. Our upcoming Sonipat offline centre is conveniently located with easy access from GT Karnal Road (NH 44), making it accessible for students from DCRUST, Rajiv Gandhi Education City (Ashoka University, SRM), Kundli, and Panipat. Live online classes are also running daily.",
  },
  {
    q: "Do you offer both offline classroom batches and live online classes?",
    a: "Yes. We are currently accepting pre-registrations for our upcoming offline classroom batches in Sonipat. Meanwhile, our live interactive online batches are actively running nationwide with flexible morning and evening timings. Students can also switch between modes when offline batches launch.",
  },
  {
    q: "Are weekend and evening batches available for working professionals and university students?",
    a: "Yes. We run early morning and late evening weekday batches, as well as dedicated Saturday–Sunday weekend batches specifically tailored for university students (from DCRUST, Ashoka, Jindal) and working professionals in Kundli and Rai Industrial Areas.",
  },
  {
    q: "What study materials and mock tests are provided with the German course?",
    a: "Students receive complete curriculum workbooks, vocabulary handbooks published on Amazon KDP, digital flashcards, dedicated audio listening tracks, and simulated Goethe & Telc mock papers with personalized mentor feedback.",
  },
];

export default function GermanClassesSonipatPage() {
  const localSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LanguageSchool", "EducationalOrganization", "LocalBusiness"],
        "@id": "https://www.fluencynest.in/german-classes-sonipat#institute",
        "name": "Fluency Nest — German Language Institute in Sonipat",
        "alternateName": [
          "German Language Institute in Sonipat",
          "Sonipat German Language Institute",
          "German Language Course in Sonipat",
          "German Institute Sonipat",
          "Fluency Nest German Classes",
        ],
        "url": "https://www.fluencynest.in/german-classes-sonipat",
        "logo": "https://www.fluencynest.in/logo.png",
        "image": "https://www.fluencynest.in/classroom.jpg",
        "description":
          "Leading German Language Institute in Sonipat (Offline Centre Coming Soon). Complete CEFR A1–C2, Goethe-Zertifikat and Telc exam preparation.",
        "telephone": SITE_CONFIG.phone,
        "email": "info@fluencynest.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": SITE_CONFIG.address.full,
          "addressLocality": "Sonipat",
          "addressRegion": "Haryana",
          "postalCode": "131001",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.993082,
          "longitude": 77.015076,
        },
        "areaServed": [
          { "@type": "City", "name": "Sonipat" },
          { "@type": "Place", "name": "Rai" },
          { "@type": "Place", "name": "Kundli" },
          { "@type": "City", "name": "Panipat" },
          { "@type": "AdministrativeArea", "name": "Haryana" },
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00",
          },
        ],
        "priceRange": "₹₹",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "48",
          "reviewCount": "48"
        },
        "sameAs": [
          "https://instagram.com/fluencynest",
          "https://facebook.com/fluencynest",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.fluencynest.in/german-classes-sonipat#breadcrumb",
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
            "name": "German Language Institute in Sonipat",
            "item": "https://www.fluencynest.in/german-classes-sonipat",
          },
        ],
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/german-classes-sonipat#course-a1",
        "name": "German A1 Course in Sonipat (Beginner Level)",
        "description":
          "Foundational German language course in Sonipat covering alphabet, phonetics, daily conversations, and Goethe-Zertifikat A1 exam preparation.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Fluency Nest",
          "sameAs": "https://www.fluencynest.in",
        },
        "educationalLevel": "Beginner (CEFR A1)",
        "courseWorkload": "PT60H",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "48"
        },
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "courseMode": "ONLINE",
            "courseWorkload": "PT60H",
            "instructor": {
              "@type": "Person",
              "name": "Certified Goethe & Telc Language Mentor"
            }
          },
          {
            "@type": "CourseInstance",
            "courseMode": "OFFLINE",
            "courseWorkload": "PT60H",
            "location": {
              "@type": "Place",
              "name": "Fluency Nest Language Institute (Sonipat)",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.address.full,
                "addressLocality": "Sonipat",
                "addressRegion": "Haryana",
                "postalCode": "131001",
                "addressCountry": "IN",
              },
            },
          }
        ],
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/german-classes-sonipat#course-b1",
        "name": "German B1 Course in Sonipat (Intermediate & Visa Gateway)",
        "description":
          "Intermediate German language course in Sonipat for university students (Studienkolleg), Opportunity Card (Chancenkarte), and Goethe / Telc B1 certification.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Fluency Nest",
          "sameAs": "https://www.fluencynest.in",
        },
        "educationalLevel": "Intermediate (CEFR B1)",
        "courseWorkload": "PT80H",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "48"
        },
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "courseMode": "ONLINE",
            "courseWorkload": "PT80H",
            "instructor": {
              "@type": "Person",
              "name": "Certified Language Mentor"
            }
          },
          {
            "@type": "CourseInstance",
            "courseMode": "OFFLINE",
            "courseWorkload": "PT80H",
            "location": {
              "@type": "Place",
              "name": "Fluency Nest Language Institute (Sonipat)",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.address.full,
                "addressLocality": "Sonipat",
                "addressRegion": "Haryana",
                "postalCode": "131001",
                "addressCountry": "IN",
              },
            },
          }
        ],
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/german-classes-sonipat#course-b2",
        "name": "German B2 Course in Sonipat (Professional & Career Fluency)",
        "description":
          "Upper-intermediate German course in Sonipat for engineers, healthcare professionals, and corporate careers in German enterprises.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Fluency Nest",
          "sameAs": "https://www.fluencynest.in",
        },
        "educationalLevel": "Upper Intermediate (CEFR B2)",
        "courseWorkload": "PT90H",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "48"
        },
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "courseMode": "ONLINE",
            "courseWorkload": "PT90H",
            "instructor": {
              "@type": "Person",
              "name": "Senior German Language Specialist"
            }
          },
          {
            "@type": "CourseInstance",
            "courseMode": "OFFLINE",
            "courseWorkload": "PT90H",
            "location": {
              "@type": "Place",
              "name": "Fluency Nest Language Institute (Sonipat)",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.address.full,
                "addressLocality": "Sonipat",
                "addressRegion": "Haryana",
                "postalCode": "131001",
                "addressCountry": "IN",
              },
            },
          }
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fluencynest.in/german-classes-sonipat#faq",
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
            alt="Fluency Nest German language course classroom setup in Sonipat"
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
            <span className={styles.breadcrumbCurrent}>German Language Institute in Sonipat</span>
          </nav>

          <div className={styles.locationBadge}>
            <MapPin size={14} aria-hidden="true" />
            German Language Institute in Sonipat · Offline Centre (Coming Soon)
          </div>

          <h1 className={`heading-display heading-xl ${styles.heroTitle}`}>
            German Language Institute in Sonipat<br />
            <em>Offline Centre Coming Soon · Live Online Batches Active</em>
          </h1>

          <p className={styles.heroSub}>
            Looking for a certified German language course in Sonipat? Fluency Nest offers comprehensive CEFR-aligned training from Beginner (A1) to Advanced (C2), specifically designed for university students (DCRUST, Ashoka, SRM), job seekers, and healthcare professionals planning to work or study in Germany. Learn in small interactive batches (8–10 learners) — pre-register for our upcoming Sonipat offline centre or join live interactive online sessions today.
          </p>

          <div className={styles.heroCTAs}>
            <a href="#enquiry-section" className="btn btn-primary btn-lg">
              Pre-Register / Book Trial Class
              <ArrowRight size={17} />
            </a>
            <a href="#location-map" className="btn btn-outline-light btn-lg">
              Sonipat Centre Details
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
              <BookOpen size={14} /> Telc Digital Exam Affiliate
            </div>
            <div className={styles.trustPill}>
              <Users size={14} /> Strictly 8–10 Students per Batch
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY STUDY GERMAN IN SONIPAT ── */}
      <section className={styles.sectionLocal}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Why Fluency Nest Sonipat</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Why Students in Sonipat &amp; Delhi-NCR Choose Our German Course
            </h2>
            <p className={styles.sectionDesc}>
              Whether you are an engineering student at DCRUST, an academic aspirant in Rajiv Gandhi Education City, or a medical professional planning to work in Germany, our Sonipat course curriculum is tailored specifically for your career goals.
            </p>
          </div>

          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Compass size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Upcoming Sonipat Centre</h3>
              <p className={styles.highlightCardDesc}>
                Centrally accessible in Sonipat with seamless connectivity from GT Karnal Road (NH 44). Enjoy a serene study environment, zero traffic hassle, and dedicated student facilities.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <GraduationCap size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Certified Native-Level Faculty</h3>
              <p className={styles.highlightCardDesc}>
                Learn under instructors trained in European pedagogical standards. We emphasize conceptual grammar, correct German phonetics, and conversational fluidity from Day 1.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Users size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Round-Table Speaking Stations</h3>
              <p className={styles.highlightCardDesc}>
                Never sit silently in a crowded lecture hall. Our batches feature small groups (8–10 learners) and round-table discussions where every student speaks in every single session.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Award size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Goethe &amp; Telc Exam Focus</h3>
              <p className={styles.highlightCardDesc}>
                Targeted preparation for Goethe-Zertifikat and Telc Deutsch examinations required for German university admission, Jobseeker visas, and Opportunity Cards (Chancenkarte).
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <BookOpen size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Proprietary Published Books</h3>
              <p className={styles.highlightCardDesc}>
                Students receive curated learning workbooks and vocabulary handbooks published on Amazon KDP, authored specifically to help Indian students master German grammar.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Sparkles size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Offline + Online Flexibility</h3>
              <p className={styles.highlightCardDesc}>
                Study offline at our Sonipat physical classrooms, or switch seamlessly to live interactive online batches during college exams, university breaks, or personal travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSE LEVELS AT SONIPAT CENTRE ── */}
      <section className={`${styles.sectionLocal} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Course Curriculum &amp; Levels</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              German Language Course Levels in Sonipat (A1 to C2)
            </h2>
            <p className={styles.sectionDesc}>
              Follow the international CEFR framework from foundational beginner to near-native fluency with targeted Goethe-Zertifikat &amp; Telc preparation.
            </p>
          </div>

          <div className={styles.levelsGrid}>
            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeA1}`}>A1 Beginner · 60 Hours</span>
                <h3 className={styles.levelTitle}>German A1 Course — Beginner Foundation</h3>
                <p className={styles.levelDesc}>
                  Designed for absolute beginners. Master pronunciation, sentence framing, essential everyday vocabulary, greetings, and basic German grammar rules.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Alphabet &amp; Phonetics</span>
                  <span className={styles.skillTag}>Self Introduction</span>
                  <span className={styles.skillTag}>Everyday Conversations</span>
                  <span className={styles.skillTag}>Goethe &amp; Telc A1 Prep</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline &amp; Online Batches</span>
                <a href="#enquiry-section" className="btn btn-outline-primary btn-sm">
                  Enquire Batch
                </a>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeA2}`}>A2 Elementary · 60–70 Hours</span>
                <h3 className={styles.levelTitle}>German A2 Course — Elementary Fluency</h3>
                <p className={styles.levelDesc}>
                  Gain confidence in daily conversations, routine work scenarios, social gatherings, past tense narration, and intermediate listening comprehension.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Past &amp; Future Tenses</span>
                  <span className={styles.skillTag}>Work &amp; Travel Vocabulary</span>
                  <span className={styles.skillTag}>Audio Listening Labs</span>
                  <span className={styles.skillTag}>Goethe &amp; Telc A2 Prep</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline &amp; Online Batches</span>
                <a href="#enquiry-section" className="btn btn-outline-primary btn-sm">
                  Enquire Batch
                </a>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeB1}`}>B1 Intermediate · 80 Hours</span>
                <h3 className={styles.levelTitle}>German B1 Course — Study &amp; Visa Gateway</h3>
                <p className={styles.levelDesc}>
                  The mandatory benchmark for German university entrance examinations (Studienkolleg), Opportunity Card (Chancenkarte), and work visas in Germany.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Complex Grammar (Subjunctive)</span>
                  <span className={styles.skillTag}>Debates &amp; Arguments</span>
                  <span className={styles.skillTag}>Formal Letter Writing</span>
                  <span className={styles.skillTag}>Goethe / Telc B1 Exam</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline &amp; Online Batches</span>
                <a href="#enquiry-section" className="btn btn-outline-primary btn-sm">
                  Enquire Batch
                </a>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeB2}`}>B2 Upper Intermediate · 80–90 Hours</span>
                <h3 className={styles.levelTitle}>German B2 Course — Professional Fluency</h3>
                <p className={styles.levelDesc}>
                  Advanced communication for corporate careers, engineers, doctors, and nurses working in German-speaking hospitals and multinational enterprises.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Medical &amp; Technical German</span>
                  <span className={styles.skillTag}>Spontaneous Debates</span>
                  <span className={styles.skillTag}>Abstract Text Analysis</span>
                  <span className={styles.skillTag}>Goethe / Telc B2 Exam</span>
                </div>
              </div>
              <div className={styles.levelFooter}>
                <span className={styles.levelMode}>Offline &amp; Online Batches</span>
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
                alt="Fluency Nest Modern German language course classroom and speaking stations in Sonipat"
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
                We believe language is best absorbed in an interactive, supportive environment designed for active speaking practice.
              </p>

              <div className={styles.amenitiesList}>
                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Smart Multimedia Classrooms</h4>
                    <p className={styles.amenityText}>
                      High-definition audio/video screens for immersive German listening, pronunciation practice, and European cultural content.
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
                      Say goodbye to rows of passive benches. Our collaborative seating arrangement encourages active face-to-face peer interaction.
                    </p>
                  </div>
                </div>

                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Library &amp; Telc Mock Exam Lab</h4>
                    <p className={styles.amenityText}>
                      Access original Goethe/Telc mock question papers, audio listening stations, and reference grammar books.
                    </p>
                  </div>
                </div>

                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Free Batch Repeat Support</h4>
                    <p className={styles.amenityText}>
                      If you need revision before your official exam, attend our dedicated doubt-clearing sessions and mock speaking practice.
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
              Fluency Nest in Sonipat — Offline Centre (Coming Soon)
            </h2>
            <p className={styles.sectionDesc}>
              Centrally situated to serve students across Sonipat, Rai, Kundli, Ganaur, Panipat, and Delhi-NCR. Live online batches are running actively.
            </p>
          </div>

          <div className={styles.locationGrid}>
            <div className={styles.locationCard}>
              <div>
                <h3 className={styles.locationCardTitle}>Sonipat Centre Information</h3>
                <p className={styles.locationCardDesc}>
                  We are launching our dedicated offline physical centre in Sonipat soon! You can pre-register for upcoming offline batches or get started immediately with our live interactive online batches.
                </p>

                <div className={styles.infoRows}>
                  <div className={styles.infoRow}>
                    <MapPin size={18} className={styles.infoRowIcon} />
                    <div>
                      <span className={styles.infoRowLabel}>Location</span>
                      <span className={styles.infoRowVal}>
                        Sonipat, Haryana — 131001 (Offline Centre Coming Soon)
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
                      <span className={styles.infoRowLabel}>Support &amp; Counselling Hours</span>
                      <span className={styles.infoRowVal}>
                        Monday – Saturday: 9:00 AM – 7:00 PM (Sunday: Closed)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hello! I want to enquire about German language batches and pre-register for the upcoming Sonipat offline centre at Fluency Nest.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Pre-Register / Connect on WhatsApp
                </a>
              </div>
            </div>

            <div className={styles.mapBox}>
              <iframe
                src="https://www.google.com/maps?q=Sonipat,+Haryana&amp;z=13&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fluency Nest German Language Institute — Sonipat, Haryana (Offline Coming Soon)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDENT & PARENT REVIEWS ── */}
      <TestimonialsSection
        filterCourse="German"
        title="Student & Parent Reviews for German"
        subtitle="Read real stories from students and parents preparing for school excellence, Goethe certifications, and studies in Germany."
      />

      {/* ── ENQUIRY & TRIAL CLASS FORM ── */}
      <section className={styles.sectionLocal} id="enquiry-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">In-Person &amp; Online Batches</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Enquire for German Language Course in Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Fill in your details below. Our academic counseling team will get in touch with fee structures, upcoming batch schedules, and trial class timings.
            </p>
          </div>

          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <EnquiryForm defaultCourse="german-a1" />
          </div>
        </div>
      </section>

      {/* ── LOCAL FAQS ── */}
      <section className={`${styles.sectionLocal} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Frequently Asked Questions</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Questions About German Language Courses in Sonipat
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
