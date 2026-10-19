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
  Star,
  Compass,
  Sparkles,
  Users,
  GraduationCap,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import EnquiryForm from "@/components/EnquiryForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sonipat German Language Institute | Best German Classes in Sonipat | Fluency Nest",
  description:
    "Looking for the best Sonipat German language institute? Fluency Nest offers certified Goethe & Telc exam coaching (A1–C2) at Eldeco County, Murthal. Small batches & free trial classes.",
  keywords: [
    "sonipat german language institute",
    "german language institute in sonipat",
    "german language institute sonipat",
    "german institute in sonipat",
    "german classes in sonipat",
    "german coaching in sonipat",
    "best german institute sonipat",
    "learn german in sonipat",
    "german coaching murthal",
    "german institute near DCRUST murthal",
    "german A1 classes sonipat",
    "german B1 coaching sonipat",
    "goethe exam preparation sonipat",
    "foreign language institute in sonipat",
    "French classes in Sonipat",
    "Spoken English institute Sonipat",
  ],
  alternates: {
    canonical: "https://www.fluencynest.in/german-classes-sonipat",
  },
  openGraph: {
    title: "Sonipat German Language Institute | Best German Classes in Sonipat | Fluency Nest",
    description:
      "Fluency Nest is Sonipat's premier German language institute located at Eldeco County, Murthal. Goethe & Telc exam prep (A1–C2), smart classrooms, and native faculty mentorship.",
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
    title: "Sonipat German Language Institute | Fluency Nest",
    description:
      "Premier German language institute in Sonipat at Eldeco County. A1 to C2 CEFR certification.",
    images: ["/classroom.jpg"],
  },
};

const LOCAL_FAQS = [
  {
    q: "Which is the best German language institute in Sonipat?",
    a: "Fluency Nest is recognized as the best German language institute in Sonipat, located at Eldeco County, Murthal (Haryana — 131001). We specialize exclusively in CEFR-aligned German courses from A1 to C2, offering official Goethe-Zertifikat and Telc exam preparation, interactive smart classrooms, small batches (8-10 students), and direct mentorship.",
  },
  {
    q: "Where is Fluency Nest located in Sonipat?",
    a: "Our physical institute is located at Eldeco County, Murthal, Sonipat, Haryana — 131001. We are conveniently accessible right off the GT Karnal Road / NH 44 highway, offering peaceful surroundings and dedicated parking for students.",
  },
  {
    q: "Can complete beginners join German classes at your Sonipat centre?",
    a: "Yes! Our German A1 Beginner course starts from absolute zero. You will learn the German alphabet, pronunciation, basic vocabulary, everyday dialogues, and foundational grammar with supportive faculty guidance.",
  },
  {
    q: "Can students from DCRUST Murthal, Ashoka University, or Panipat commute easily?",
    a: "Yes. Eldeco County is located right in Murthal, less than 10 minutes from DCRUST University and within comfortable driving/transit distance from Rajiv Gandhi Education City (Ashoka University, SRM) as well as Panipat and Kundli.",
  },
  {
    q: "Do you offer both offline classroom and online batches?",
    a: "Yes. You can attend in-person classroom batches at our Sonipat institute, or join live interactive online sessions. Students can also switch between modes if they are traveling or have academic exams.",
  },
  {
    q: "Do you prepare students for official Goethe-Zertifikat and Telc exams?",
    a: "Yes. All our German courses adhere strictly to the CEFR framework (A1, A2, B1, B2, C1, C2) and include targeted practice with mock papers, listening audio tracks, speaking simulations, and exam strategies for Goethe and Telc exams.",
  },
  {
    q: "Are French and Spoken English courses also offered at the Sonipat institute?",
    a: "Yes. Alongside German, we offer complete CEFR French language courses (A1–C2 for DELF & Canada PR preparation) and Spoken English & Corporate Communication classes at our physical centre.",
  },
];

export default function GermanClassesSonipatPage() {
  const localSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LanguageSchool", "EducationalOrganization", "LocalBusiness"],
        "@id": "https://www.fluencynest.in/german-classes-sonipat#institute",
        "name": "Fluency Nest — German Language Institute Sonipat",
        "alternateName": [
          "Sonipat German Language Institute",
          "German Language Institute in Sonipat",
          "German Institute Sonipat",
          "Fluency Nest German Classes"
        ],
        "url": "https://www.fluencynest.in/german-classes-sonipat",
        "logo": "https://www.fluencynest.in/logo.png",
        "image": "https://www.fluencynest.in/classroom.jpg",
        "description":
          "Leading German language institute in Sonipat located at Eldeco County, Murthal. Complete CEFR A1–C2, Goethe-Zertifikat and Telc exam preparation.",
        "telephone": SITE_CONFIG.phone,
        "email": "info@fluencynest.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Eldeco County",
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
        "areaServed": [
          { "@type": "City", "name": "Sonipat" },
          { "@type": "Place", "name": "Murthal" },
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
        "sameAs": [
          "https://instagram.com/fluencynest",
          "https://facebook.com/fluencynest",
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
            alt="Fluency Nest German Language Institute Classroom in Sonipat"
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
            <span className={styles.breadcrumbCurrent}>Sonipat German Language Institute</span>
          </nav>

          <div className={styles.locationBadge}>
            <MapPin size={14} aria-hidden="true" />
            Sonipat German Language Institute · Eldeco County, Murthal
          </div>

          <h1 className={`heading-display heading-xl ${styles.heroTitle}`}>
            #1 German Language Institute<br />
            <em>in Sonipat &amp; Murthal</em>
          </h1>

          <p className={styles.heroSub}>
            Welcome to Fluency Nest — the leading German language institute in Sonipat. Located in Eldeco County (5 mins from DCRUST Murthal), we offer certified Goethe &amp; Telc exam coaching from Beginner (A1) to Advanced (C2) with interactive multimedia classrooms and small batch sizes.
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
              <BookOpen size={14} /> Telc Digital Exam Affiliate
            </div>
            <div className={styles.trustPill}>
              <Users size={14} /> 8–10 Students per Batch
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
              Why Students in Sonipat &amp; Delhi-NCR Choose Us
            </h2>
            <p className={styles.sectionDesc}>
              Whether you are an engineering student at DCRUST Murthal, an academic aspirant in Rajiv Gandhi Education City, or a medical professional planning to work in Germany, our Sonipat centre is designed specifically for your goals.
            </p>
          </div>

          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Compass size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Prime Highway Location</h3>
              <p className={styles.highlightCardDesc}>
                Situated inside Eldeco County, Murthal with easy access from GT Karnal Road (NH 44). Enjoy a serene study environment, no city congestion, and hassle-free vehicle parking.
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
              <h3 className={styles.highlightCardTitle}>Round-Table Speaking Clubs</h3>
              <p className={styles.highlightCardDesc}>
                Never sit silently in a crowded hall. Our classes feature small groups (8–10 learners) and round-table discussions where every student speaks in every single session.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Award size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Goethe &amp; Telc Exam Focus</h3>
              <p className={styles.highlightCardDesc}>
                Comprehensive preparation for Goethe-Zertifikat and Telc Deutsch examinations required for German university admission, Jobseeker visas, and Opportunity Cards (Chancenkarte).
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <BookOpen size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Proprietary Published Books</h3>
              <p className={styles.highlightCardDesc}>
                Students receive curated learning materials and vocabulary handbooks published on Amazon KDP, specifically tailored to help Indian students master German grammar.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Sparkles size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Offline + Online Flexibility</h3>
              <p className={styles.highlightCardDesc}>
                Study offline at our Sonipat physical classrooms, or switch seamlessly to live interactive online batches during exams, university breaks, or personal travel.
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
              German Language Courses Offered in Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Follow the international CEFR framework from foundational beginner to near-native fluency.
            </p>
          </div>

          <div className={styles.levelsGrid}>
            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeA1}`}>A1 Beginner</span>
                <h3 className={styles.levelTitle}>German A1 — Foundation Course</h3>
                <p className={styles.levelDesc}>
                  Designed for absolute beginners. Master pronunciation, sentence framing, essential everyday vocabulary, greetings, and basic German grammar rules.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Alphabet &amp; Phonetics</span>
                  <span className={styles.skillTag}>Self Introduction</span>
                  <span className={styles.skillTag}>Everyday Conversations</span>
                  <span className={styles.skillTag}>Goethe A1 Prep</span>
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
                <span className={`${styles.levelBadge} ${styles.levelBadgeA2}`}>A2 Elementary</span>
                <h3 className={styles.levelTitle}>German A2 — Elementary Fluency</h3>
                <p className={styles.levelDesc}>
                  Gain confidence in daily conversations, routine work scenarios, social gatherings, past tense narration, and intermediate listening comprehension.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Past &amp; Future Tenses</span>
                  <span className={styles.skillTag}>Work &amp; Travel Vocabulary</span>
                  <span className={styles.skillTag}>Audio Listening Labs</span>
                  <span className={styles.skillTag}>Goethe A2 Prep</span>
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
                <span className={`${styles.levelBadge} ${styles.levelBadgeB1}`}>B1 Intermediate</span>
                <h3 className={styles.levelTitle}>German B1 — Study &amp; Career Gateway</h3>
                <p className={styles.levelDesc}>
                  The mandatory benchmark for German university entrance examinations (Studienkolleg), Opportunity Card (Chancenkarte), and work visas in Germany.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Complex Grammar (Konjunktiv II)</span>
                  <span className={styles.skillTag}>Opinion Arguments</span>
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
                <span className={`${styles.levelBadge} ${styles.levelBadgeB2}`}>B2 Upper Intermediate</span>
                <h3 className={styles.levelTitle}>German B2 — Professional Fluency</h3>
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
                alt="Fluency Nest Modern Classroom and Speaking Setup in Sonipat"
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
              Visit Fluency Nest in Eldeco County, Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Centrally situated to serve students across Sonipat, Murthal, Rai, Kundli, Ganaur, and Panipat.
            </p>
          </div>

          <div className={styles.locationGrid}>
            <div className={styles.locationCard}>
              <div>
                <h3 className={styles.locationCardTitle}>Campus Information</h3>
                <p className={styles.locationCardDesc}>
                  We welcome you to visit our physical institute for a campus tour, level assessment, and faculty discussion.
                </p>

                <div className={styles.infoRows}>
                  <div className={styles.infoRow}>
                    <MapPin size={18} className={styles.infoRowIcon} />
                    <div>
                      <span className={styles.infoRowLabel}>Physical Address</span>
                      <span className={styles.infoRowVal}>
                        Eldeco County, Murthal, Sonipat, Haryana — 131001
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
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hello! I want to visit Fluency Nest at Eldeco County, Sonipat. Please share timing and batch details.")}`}
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
                title="Fluency Nest Language Institute — Eldeco County, Murthal, Sonipat"
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
              Enquire for German Classes in Sonipat
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
              Questions About German Classes in Sonipat
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
