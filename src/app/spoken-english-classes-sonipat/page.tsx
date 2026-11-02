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
  Briefcase,
  Compass,
  Mic,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import EnquiryForm from "@/components/EnquiryForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Spoken English & Public Speaking Institute in Sonipat | Fluency Nest",
  description:
    "Master English fluency, eliminate hesitation, and excel in MNC job interviews with Fluency Nest — the leading Spoken English & Public Speaking Institute in Sonipat (Offline Centre Coming Soon). Interactive speaking batches & live online options.",
  keywords: [
    "Spoken English & Public Speaking Institute in Sonipat",
    "Spoken English Institute in Sonipat",
    "Public Speaking Institute in Sonipat",
    "english speaking institute in sonipat",
    "Spoken English classes in Sonipat",
    "English speaking classes near me Sonipat",
    "corporate communication course Sonipat",
    "public speaking classes Sonipat",
    "personality development institute Sonipat",
    "interview preparation classes Sonipat",
    "IELTS spoken English foundation Sonipat",
    "English speaking institute Sonipat Haryana",
    "German classes in Sonipat",
    "French classes in Sonipat",
  ],
  alternates: {
    canonical: "https://www.fluencynest.in/spoken-english-classes-sonipat",
  },
  openGraph: {
    title: "Spoken English & Public Speaking Institute in Sonipat | Fluency Nest",
    description:
      "Premier Spoken English & Public Speaking Institute in Sonipat (Offline Centre Coming Soon). Small batches, mock interviews, public speaking, and neutral accent training.",
    url: "https://www.fluencynest.in/spoken-english-classes-sonipat",
    siteName: "Fluency Nest",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/classroom.jpg",
        width: 1200,
        height: 630,
        alt: "Fluency Nest Spoken English & Public Speaking Institute in Sonipat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spoken English & Public Speaking Institute in Sonipat | Fluency Nest",
    description:
      "Premier Spoken English & Public Speaking Institute in Sonipat (Offline Centre Coming Soon). Small batches, mock interviews, and confidence building.",
    images: ["/classroom.jpg"],
  },
};

const LOCAL_FAQS = [
  {
    q: "Where is Fluency Nest located in Sonipat for English classes?",
    a: "Our upcoming offline centre is situated in Sonipat, Haryana — 131001, providing convenient connectivity from GT Karnal Road (NH 44). We are currently accepting offline batch pre-registrations while our live interactive online classes run actively.",
  },
  {
    q: "I know English grammar in writing, but I freeze when speaking. Can you help?",
    a: "This is the most common challenge our students face! Traditional schools teach English through written rules, not active speaking. At Fluency Nest, our classes are 100% conversational. Through round-table discussions, roleplays, and daily stage practice, we eliminate mental hesitation and build natural spontaneity.",
  },
  {
    q: "Do you prepare college students for campus placements and job interviews?",
    a: "Yes! A significant portion of our students come from DCRUST Murthal, Ashoka University, OP Jindal, SRM, and local engineering/MBA colleges. We conduct intensive mock interviews, Group Discussion (GD) simulations, HR Q&A workshops, and resume-polishing sessions.",
  },
  {
    q: "How do you help learners overcome Mother Tongue Influence (MTI) and accent hesitation?",
    a: "We provide dedicated Voice & Accent training. You will learn mouth positioning, tongue placement, syllable stress, intonation, and neutral pronunciation to speak clearly and professionally without regional hesitation.",
  },
  {
    q: "What is the batch size for Spoken English classes?",
    a: "Every batch is strictly capped at 8 to 10 students. You will never sit silently in a crowded classroom. Every single student speaks for a minimum of 15–20 minutes in every session.",
  },
  {
    q: "Are weekend and evening batches available for working professionals?",
    a: "Yes. For working professionals commuting from Kundli, Rai Industrial Area, or Delhi-NCR, we offer early morning, evening, and weekend batches. You can also alternate between classroom sessions and live online classes.",
  },
  {
    q: "Does this course help with IELTS or PTE speaking preparation?",
    a: "Yes. Our curriculum establishes strong foundational fluency, vocabulary expansion, and structured spontaneous thought organization, which directly translates to Band 7+ performance in the IELTS Speaking module.",
  },
];

export default function SpokenEnglishClassesSonipatPage() {
  const localSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LanguageSchool", "EducationalOrganization", "LocalBusiness"],
        "@id": "https://www.fluencynest.in/spoken-english-classes-sonipat#organization",
        "name": "Fluency Nest — Spoken English & Public Speaking Institute in Sonipat",
        "alternateName": [
          "Spoken English & Public Speaking Institute in Sonipat",
          "Spoken English Institute in Sonipat",
          "Public Speaking Institute in Sonipat",
          "English Speaking Classes in Sonipat",
          "Fluency Nest Spoken English",
        ],
        "url": "https://www.fluencynest.in/spoken-english-classes-sonipat",
        "logo": "https://www.fluencynest.in/logo.png",
        "image": "https://www.fluencynest.in/classroom.jpg",
        "description":
          "Premier Spoken English & Public Speaking Institute in Sonipat (Offline Centre Coming Soon). Small batches, mock interviews, and confidence building.",
        "telephone": SITE_CONFIG.phone,
        "email": "info@fluencynest.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sonipat (Offline Centre Coming Soon)",
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
            "name": "Spoken English Classes in Sonipat",
            "item": "https://www.fluencynest.in/spoken-english-classes-sonipat",
          },
        ],
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/spoken-english-classes-sonipat#course-foundation-english",
        "name": "Foundation Spoken English & Hesitation Removal Course",
        "description": "Overcome fear of speaking English in public. Master daily conversational flow, correct pronunciation, sentence framing, and confidence building.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": SITE_CONFIG.name,
          "sameAs": SITE_CONFIG.siteUrl,
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": ["ONLINE", "OFFLINE"],
          "courseWorkload": "PT50H",
        },
      },
      {
        "@type": "Course",
        "@id": "https://www.fluencynest.in/spoken-english-classes-sonipat#course-advanced-public-speaking",
        "name": "Advanced English Fluency & Public Speaking Mastery",
        "description": "Express complex ideas effortlessly. Covers debates, Group Discussions (GD), impromptu speaking (JAM), and neutral voice & accent training.",
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
        "@id": "https://www.fluencynest.in/spoken-english-classes-sonipat#course-corporate-communication",
        "name": "Corporate Communication & MNC Job Interview Preparation",
        "description": "Master professional business English: executive boardroom presentations, corporate email drafting, salary negotiations, and HR mock interviews.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": SITE_CONFIG.name,
          "sameAs": SITE_CONFIG.siteUrl,
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": ["ONLINE", "OFFLINE"],
          "courseWorkload": "PT50H",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fluencynest.in/spoken-english-classes-sonipat#faq",
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
            alt="Fluency Nest Spoken English & Corporate Communication Institute in Sonipat"
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
            <span className={styles.breadcrumbCurrent}>Spoken English &amp; Public Speaking Institute in Sonipat</span>
          </nav>

          <div className={styles.locationBadge}>
            <MapPin size={14} aria-hidden="true" />
            Spoken English &amp; Public Speaking Institute in Sonipat · Offline Centre (Coming Soon)
          </div>

          <h1 className={`heading-display heading-xl ${styles.heroTitle}`}>
            Spoken English &amp; Public Speaking Institute in Sonipat<br />
            <em>Offline Centre Coming Soon · Live Online Batches Active</em>
          </h1>

          <p className={styles.heroSub}>
            Speak English fluently, clearly, and without hesitation. Learn in small interactive batches (8–10 learners) with Fluency Nest.
            100% practical speaking practice, neutral accent training, mock interviews, and corporate communication mastery. Pre-register for our Sonipat centre or join live online today.
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
              <Mic size={14} /> 100% Practical Speaking Drills
            </div>
            <div className={styles.trustPill}>
              <Briefcase size={14} /> MNC Interview &amp; GD Focus
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERVIEW & CAREER FEATURE BANNER ── */}
      <section className={styles.sectionLocal} style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className={styles.careerBanner}>
            <div>
              <span className={styles.careerBadge}>
                <Briefcase size={14} /> Career &amp; Campus Placement Edge
              </span>
              <h2 className={styles.careerTitle}>
                Crack MNC Job Interviews &amp; Speak with Unshakable Confidence
              </h2>
              <p className={styles.careerDesc}>
                Whether you are graduating from DCRUST Murthal, Ashoka University, or navigating corporate meetings in Kundli/Delhi-NCR, your English fluency dictates your career velocity. We train you in executive communication that commands respect.
              </p>
              <div className={styles.careerPointsList}>
                <div className={styles.careerPointItem}>
                  <CheckCircle size={16} /> Live simulated HR &amp; Technical mock interviews with video feedback.
                </div>
                <div className={styles.careerPointItem}>
                  <CheckCircle size={16} /> Group Discussion (GD) mastery: opening arguments, moderating, and summarizing.
                </div>
                <div className={styles.careerPointItem}>
                  <CheckCircle size={16} /> Professional corporate email writing, presentation decks, and boardroom etiquette.
                </div>
              </div>
            </div>

            <div className={styles.careerStatsBox}>
              <div className={styles.careerBigStat}>100%</div>
              <div className={styles.careerStatLabel}>Speaking Practice in Every Class</div>
              <a href="#enquiry-section" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Enquire for Placement Batch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY STUDY SPOKEN ENGLISH IN SONIPAT ── */}
      <section className={styles.sectionLocal}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Why Fluency Nest Sonipat</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Why Learners in Sonipat &amp; Haryana Choose Fluency Nest
            </h2>
            <p className={styles.sectionDesc}>
              Say goodbye to boring grammar rules and rote translation. We train you to think in English and speak naturally from the very first session.
            </p>
          </div>

          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Mic size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Hesitation Elimination Lab</h3>
              <p className={styles.highlightCardDesc}>
                Break the barrier of overthinking. Our daily impromptu speaking, JAM (Just A Minute) sessions, and speech drills train your brain to form English sentences spontaneously.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <GraduationCap size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Voice &amp; Neutral Accent</h3>
              <p className={styles.highlightCardDesc}>
                Overcome Mother Tongue Influence (MTI). Learn tongue positioning, syllable stress, cadence, and clear pronunciation so you are understood by international clients.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Users size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Round-Table Speaking Stations</h3>
              <p className={styles.highlightCardDesc}>
                Capped at 8–10 students. No large lecture halls where you hide behind others. Every learner has a voice and receives personalized feedback in every single session.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Briefcase size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>MNC Placement &amp; GD Practice</h3>
              <p className={styles.highlightCardDesc}>
                Designed specifically for engineering, management, and university graduates preparing for corporate job interviews, campus recruitment, and LinkedIn networking.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Compass size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>Upcoming Sonipat Centre</h3>
              <p className={styles.highlightCardDesc}>
                Centrally accessible in Sonipat with easy connectivity from GT Karnal Road (NH 44). Ample parking, peaceful surroundings, and close proximity to Sonipat universities.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIconBox}>
                <Sparkles size={24} />
              </div>
              <h3 className={styles.highlightCardTitle}>In-Person + Online Flexibility</h3>
              <p className={styles.highlightCardDesc}>
                Attend classroom sessions at our Sonipat centre, or connect to live online batches during exams, university breaks, or corporate travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSE PROGRAMS AT SONIPAT CENTRE ── */}
      <section className={`${styles.sectionLocal} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Course Programs</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Spoken English &amp; Communication Programs Offered in Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Tailored learning paths designed for beginners, aspiring professionals, and corporate executives.
            </p>
          </div>

          <div className={styles.levelsGrid}>
            <div className={styles.levelCard}>
              <div>
                <span className={`${styles.levelBadge} ${styles.levelBadgeFoundation}`}>Level 1 — Foundation</span>
                <h3 className={styles.levelTitle}>Foundation English &amp; Hesitation Removal</h3>
                <p className={styles.levelDesc}>
                  Overcome stage fright and hesitation. Master correct sentence structures, daily conversational phrases, essential vocabulary, and confident daily dialogue.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>Eliminating Hesitation</span>
                  <span className={styles.skillTag}>Everyday Conversations</span>
                  <span className={styles.skillTag}>Sentence Construction</span>
                  <span className={styles.skillTag}>Pronunciation Basics</span>
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
                <span className={`${styles.levelBadge} ${styles.levelBadgeFluency}`}>Level 2 — Fluency &amp; Debate</span>
                <h3 className={styles.levelTitle}>Advanced Fluency &amp; Public Speaking</h3>
                <p className={styles.levelDesc}>
                  Express complex ideas spontaneously without translating in your head. Master group debates, impromptu speeches, voice modulation, and neutral accent refinement.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>JAM Sessions (Just A Minute)</span>
                  <span className={styles.skillTag}>Neutral Accent &amp; MTI Removal</span>
                  <span className={styles.skillTag}>Public Speaking &amp; Stage Presence</span>
                  <span className={styles.skillTag}>Group Discussions (GD)</span>
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
                <span className={`${styles.levelBadge} ${styles.levelBadgeCorporate}`}>Level 3 — Career &amp; Corporate</span>
                <h3 className={styles.levelTitle}>Corporate Communication &amp; MNC Interviews</h3>
                <p className={styles.levelDesc}>
                  Designed for college graduates and working professionals. Master boardroom presentations, formal email drafting, salary negotiations, and HR interview drills.
                </p>
                <div className={styles.levelSkills}>
                  <span className={styles.skillTag}>MNC Mock Interviews</span>
                  <span className={styles.skillTag}>Executive Presentations</span>
                  <span className={styles.skillTag}>Professional Email Etiquette</span>
                  <span className={styles.skillTag}>Corporate Body Language</span>
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
                alt="Fluency Nest Modern Speaking and Presentation Classroom in Sonipat"
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
                True fluency requires a supportive, energetic environment designed for active communication and zero fear of making mistakes.
              </p>

              <div className={styles.amenitiesList}>
                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Smart Audio-Visual Classrooms</h4>
                    <p className={styles.amenityText}>
                      High-definition multimedia screens and audio monitors for pronunciation drills, global podcast listening, and video recording playback.
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
                      Face-to-face peer interaction setup mirroring corporate conference rooms, eliminating stage fear and building boardroom readiness.
                    </p>
                  </div>
                </div>

                <div className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className={styles.amenityTitle}>Mock Interview &amp; GD Lab</h4>
                    <p className={styles.amenityText}>
                      Real-time simulation sessions under formal interview conditions, with constructive performance reviews and feedback notes.
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
                      Need additional speaking practice before an important placement drive? Attend revision speaking sessions without paying extra.
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
              Centrally situated to serve students and working professionals across Sonipat, Rai, Kundli, Ganaur, Panipat, and Delhi-NCR. Live online batches are running actively.
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
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hello! I want to enquire about Spoken English classes and pre-register for the upcoming Sonipat offline centre at Fluency Nest.")}`}
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
                title="Fluency Nest Spoken English Institute — Sonipat, Haryana (Offline Coming Soon)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDENT & PARENT REVIEWS ── */}
      <TestimonialsSection
        filterCourse="English"
        title="Student & Parent Reviews in Sonipat"
        subtitle="Real feedback from young learners and parents who built spoken English fluency, stage presence, and confidence with us."
      />

      {/* ── ENQUIRY & TRIAL CLASS FORM ── */}
      <section className={styles.sectionLocal} id="enquiry-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">In-Person &amp; Online Batches</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Enquire for Spoken English Classes in Sonipat
            </h2>
            <p className={styles.sectionDesc}>
              Fill in your details below. Our counseling team will get in touch with fee structures, batch schedules, and free trial class timings.
            </p>
          </div>

          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <EnquiryForm defaultCourse="english-corporate" />
          </div>
        </div>
      </section>

      {/* ── LOCAL FAQS ── */}
      <section className={`${styles.sectionLocal} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">Frequently Asked Questions</div>
            <h2 className={`heading-display heading-lg ${styles.sectionTitle}`}>
              Questions About Spoken English Classes in Sonipat
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
