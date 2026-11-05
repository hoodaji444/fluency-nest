"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  MapPin,
  Sparkles,
  Navigation,
  Phone,
  Compass,
} from "lucide-react";
import { SITE_CONFIG, COURSES, FAQ_ITEMS } from "@/lib/config";
import EnquiryForm from "@/components/EnquiryForm";
import LeadPopup from "@/components/LeadPopup";
import TestimonialsSection from "@/components/TestimonialsSection";
import styles from "./HomePage.module.css";

// ── Scroll Reveal ───────────────────────────────────────────
function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 50);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ── FAQ Item ────────────────────────────────────────────────
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${styles.faqItem} reveal reveal-delay-${(index % 3) + 1}`}>
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        id={`faq-btn-${index}`}
      >
        <span>{question}</span>
        <ChevronDown
          size={18}
          className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        className={styles.faqAnswer}
        style={{ maxHeight: open ? contentRef.current?.scrollHeight + "px" : "0" }}
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

// ── Course Card ─────────────────────────────────────────────
function CourseCard({
  course,
  index,
  onEnquire,
}: {
  course: (typeof COURSES)[0];
  index: number;
  onEnquire: (courseId: string) => void;
}) {
  return (
    <div
      className={`${styles.courseCard} card reveal reveal-delay-${(index % 4) + 1}`}
      id={`course-${course.id}`}
    >
      <div className={styles.courseCardTop}>
        <span className={styles.courseLevel}>{course.level}</span>
        <span
          className={`badge ${styles.courseBadge}`}
          style={{ background: course.badgeColor + "18", color: course.badgeColor }}
        >
          {course.badge}
        </span>
      </div>

      <h3 className={styles.courseTitle}>{course.subtitle}</h3>
      <p className={styles.courseDesc}>{course.description}</p>

      <ul className={styles.courseSkills}>
        {course.skills.map((skill) => (
          <li key={skill} className={styles.courseSkill}>
            <CheckCircle size={12} aria-hidden="true" />
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.courseMeta}>
        <span className={styles.modeTag}>Online &amp; Offline</span>
        <span className={styles.courseFee}>{course.fee}</span>
      </div>

      <button
        className={`btn btn-primary ${styles.courseEnquireBtn}`}
        onClick={() => onEnquire(course.id)}
        id={`enquire-${course.id}`}
      >
        Enquire About This Course
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

// ── How It Works steps ──────────────────────────────────────
const STEPS = [
  {
    number: "01",
    title: "Choose a course",
    desc: "Browse German (A1–C2), French, or English courses and pick the level that fits where you are now.",
  },
  {
    number: "02",
    title: "Submit an enquiry",
    desc: "Fill in the short form below with your preferred course, learning mode (live online or in-person offline), and a convenient time to be contacted.",
  },
  {
    number: "03",
    title: "Speak with our team",
    desc: "We will call you to answer questions, confirm your level, and enrol you in the right batch.",
  },
  {
    number: "04",
    title: "Attend your first class",
    desc: "Join a live session — via our interactive online classroom or at our physical institute — and start building fluency from day one.",
  },
];

// ── Main Page ───────────────────────────────────────────────
export default function HomePage() {

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [activeTab, setActiveTab] = useState<"german" | "french" | "english">("german");
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("french")) {
        setActiveTab("french");
      } else if (hash.includes("english")) {
        setActiveTab("english");
      } else if (hash.includes("german")) {
        setActiveTab("german");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useScrollReveal([activeTab]);

  const openEnquiry = useCallback((courseId: string = "") => {
    setSelectedCourse(courseId);
    setFormOpen(true);
    setTimeout(() => {
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  const germanCourses  = COURSES.filter((c) => c.language === "German");
  const frenchCourses  = COURSES.filter((c) => c.language === "French");
  const englishCourses = COURSES.filter((c) => c.language === "English");

  const displayedCourses =
    activeTab === "german"
      ? germanCourses
      : activeTab === "french"
      ? frenchCourses
      : englishCourses;

  return (
    <>
      {/* ── HERO ── */}
      <section
        className={styles.hero}
        id="home"
        aria-label="Hero"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div className={styles.heroBg}>
          <div className={`${styles.heroBgSlide} ${heroSlide === 0 ? styles.heroBgSlideActive : ""}`}>
            <Image
              src="/hero-bg.jpg"
              alt="Berlin Brandenburg Gate — Germany"
              fill
              priority
              quality={90}
              style={{ objectFit: "cover", objectPosition: "center 60%" }}
            />
          </div>
          <div className={`${styles.heroBgSlide} ${heroSlide === 1 ? styles.heroBgSlideActive : ""}`}>
            <Image
              src="/classroom.jpg"
              alt="Fluency Nest Offline Classroom & Institute"
              fill
              priority
              quality={90}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroInner}>

            {/* Slider Switcher: Interactive Pills & Next/Prev Controls */}
            <div className={styles.heroSliderControls}>
              <button
                type="button"
                className={`${styles.heroNavPill} ${heroSlide === 0 ? styles.heroNavPillActive : ""}`}
                onClick={() => setHeroSlide(0)}
                aria-label="Slide 1: Online Academy"
              >
                <span className={styles.pillDot} />
                01 Online Academy
              </button>
              <button
                type="button"
                className={`${styles.heroNavPill} ${heroSlide === 1 ? styles.heroNavPillActive : ""}`}
                onClick={() => setHeroSlide(1)}
                aria-label="Slide 2: Offline Centre"
              >
                <span className={styles.pillDot} />
                02 Offline Centre
              </button>
              <div className={styles.heroNavArrows}>
                <button
                  type="button"
                  className={styles.heroNavArrowBtn}
                  onClick={() => setHeroSlide((prev) => (prev === 0 ? 1 : 0))}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className={styles.heroNavArrowBtn}
                  onClick={() => setHeroSlide((prev) => (prev === 0 ? 1 : 0))}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* SLIDE 1 (Front): Online Academy */}
            <div className={`${styles.heroSlidePane} ${heroSlide === 0 ? styles.heroSlidePaneActive : ""}`}>
              <div className={styles.heroBadge}>
                <span>✨ Est. 2024 · Premier Language Institute</span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <p className={styles.heroLocation} style={{ marginBottom: 0 }}>
                  <span className={styles.liveIndicator} aria-hidden="true" />
                  Live Interactive Online Batches Nationwide
                </p>
                <a href="#classroom" className={styles.heroLocationOfflineBadge}>
                  <MapPin size={12} aria-hidden="true" />
                  Offline in Sonipat (Coming Soon)
                  <ChevronRight size={12} aria-hidden="true" />
                </a>
              </div>

              <h1 className={`heading-display heading-xl ${styles.heroTitle}`}>
                Learn German.<br />
                <em>Build the future you planned.</em>
              </h1>

              <p className={`body-lg ${styles.heroSub}`}>
                Est. 2024. Structured CEFR German, French, and English language programmes.
                Live interactive online batches across India with dedicated faculty mentorship.
              </p>

              <div className={styles.heroCTAs}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => openEnquiry()}
                  id="hero-enquire-btn"
                >
                  Enquire About Courses
                  <ArrowRight size={17} />
                </button>
                <a
                  href="#courses-german"
                  className="btn btn-outline-light btn-lg"
                >
                  View Courses
                </a>
              </div>
            </div>

            {/* SLIDE 2: Offline Centre — Sonipat (Coming Soon) */}
            <div className={`${styles.heroSlidePane} ${heroSlide === 1 ? styles.heroSlidePaneActive : ""}`}>
              <div className={styles.heroBadge}>
                <span>Sonipat, Haryana — 131001 (Offline Centre Coming Soon)</span>
              </div>

              <p className={styles.heroLocationOffline}>
                <MapPin size={14} aria-hidden="true" />
                Sonipat, Haryana — 131001 (Offline Centre Coming Soon)
              </p>

              <h2 className={`heading-display heading-xl ${styles.heroTitle}`}>
                Sonipat&apos;s Premier<br />
                <em>Offline Language Institute (Coming Soon).</em>
              </h2>

              <p className={`body-lg ${styles.heroSub}`}>
                Offline batches coming soon to Sonipat! Multimedia smart classrooms, direct faculty mentorship, and Goethe/DELF exam preparation. Live interactive online batches are actively enrolling today.
              </p>

              <div className={styles.heroSonipatChips}>
                <Link href="/german-classes-sonipat" className={styles.heroSonipatChip}>
                  🇩🇪 German Language Institute
                </Link>
                <Link href="/french-classes-sonipat" className={styles.heroSonipatChip}>
                  🇫🇷 French Classes
                </Link>
                <Link href="/spoken-english-classes-sonipat" className={styles.heroSonipatChip}>
                  🇬🇧 Spoken English
                </Link>
              </div>

              <div className={styles.heroCTAs}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => openEnquiry("Sonipat Offline Classroom Batch")}
                  id="hero-offline-enquire-btn"
                >
                  Enquire Offline Batch
                  <ArrowRight size={17} />
                </button>
                <a
                  href="#classroom"
                  className="btn btn-outline-light btn-lg"
                >
                  Explore Sonipat Campus
                </a>
              </div>
            </div>

            {/* Contact strip — phone & WhatsApp */}
            <div className={styles.heroContact}>
              <a href={`tel:${SITE_CONFIG.phone}`} className={styles.heroPhone}>
                {SITE_CONFIG.phone}
              </a>
              <span className={styles.heroContactSep} aria-hidden="true">·</span>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroWA}
              >
                WhatsApp us
              </a>
            </div>

          </div>
        </div>

        <a href="#about" className={styles.heroScroll} aria-label="Scroll down">
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ── TRUST & CREDENTIALS STRIP ── */}
      <section className={styles.trustStrip} aria-label="Key Institute Standards & Credentials">
        <div className={`container ${styles.trustStripInner}`}>
          {[
            { label: "NSDC & SKILL INDIA", sub: "National Skill Mission" },
            { label: "ISO 9001 CERTIFIED", sub: "Quality Management" },
            { label: "TELC EXAM AFFILIATE", sub: "The European Certificates" },
            { label: "AMAZON KDP PUBLISHED", sub: "Proprietary Books" },
            { label: "CEFR ALIGNED", sub: "A1 to C2 Framework" },
            { label: "EST. 2024", sub: "Online & Physical Centre" },
          ].map((item, idx, arr) => (
            <div key={item.label} style={{ display: "contents" }}>
              <div className={styles.trustItem}>
                <span className={styles.trustLabel}>{item.label}</span>
                <span className={styles.trustSub}>{item.sub}</span>
              </div>
              {idx < arr.length - 1 && <div className={styles.trustDivider} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className={`section ${styles.about}`} id="about">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <Image
                src="/teacher.jpg"
                alt="Language mentoring at Fluency Nest"
                width={480}
                height={560}
                className={styles.aboutImg}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.aboutContent}>
              <div className="reveal">
                <div className="section-label">A New Standard of Language Education</div>
                <h2 className={`heading-display heading-lg ${styles.aboutTitle}`}>
                  A new kind of German institute<br />
                  <em>built for Indian learners &amp; global careers.</em>
                </h2>
                <div className="divider" />
              </div>

              <div className="reveal reveal-delay-2">
                <p className={styles.aboutLead}>
                  Fluency Nest was founded on a single conviction: that Indian learners deserve
                  a German language education as rigorous and refined as those offered in Europe.
                  Not rote memorisation. Not recorded videos. Live, structured, outcome-driven instruction.
                </p>
                <div className={styles.aboutPhilos}>
                  &ldquo;Language is not merely communication. It is the bridge to academic excellence,
                  global career opportunities in Germany, and the cultivation of the self.&rdquo;
                </div>
                <p className={styles.aboutPara}>
                  Est. 2024 as an online language academy, we built our foundation mentoring students across
                  India in German, French, and English with live, interactive instruction. For learners who prefer
                  in-person classroom training, we also offer offline batches at our dedicated physical institute.
                </p>
              </div>

              <ul className={`${styles.aboutPoints} reveal reveal-delay-3`}>
                {[
                  "Live, interactive online batches for learners across India & abroad",
                  "Dedicated physical institute for learners who prefer offline classroom training",
                  "German, French & English A1 to C2 — complete CEFR framework",
                  "Targeted Goethe-Zertifikat & Telc exam preparation",
                  "Small batches — live interactive speaking, zero pre-recorded lessons",
                  "Direct faculty mentorship and personalised progress tracking",
                ].map((pt) => (
                  <li key={pt} className={styles.aboutPoint}>
                    <span className={styles.aboutPointDot} aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="reveal reveal-delay-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => openEnquiry()}
                >
                  Enquire About Admission
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS & RECOGNITIONS ── */}
      <section className={`section ${styles.accreditationsSection}`} id="accreditations">
        <div className="container">
          <div className={`${styles.accreditationsHeader} reveal`}>
            <div className="section-label">Accreditations &amp; Affiliations</div>
            <h2 className={`heading-display heading-lg ${styles.accreditationsTitle}`}>
              National &amp; International Standards
            </h2>
            <p className={styles.accreditationsSub}>
              Registered with NSDC &amp; Skill India — India&apos;s National Skill Development Mission. ISO Certified. Telc Digital Exam Affiliate. Amazon KDP Published.
            </p>
          </div>

          <div className={`${styles.accreditationsGrid} reveal reveal-delay-2`}>
            {/* 1. NSDC & Skill India */}
            <div className={styles.accreditationCard}>
              <div className={styles.accreditationImgWrap}>
                <Image
                  src="/accreditations/nsdc-skill-india.png"
                  alt="Skill India & NSDC - National Skill Development Corporation"
                  width={300}
                  height={180}
                  className={styles.accreditationImg}
                />
              </div>
              <div className={styles.accreditationBody}>
                <span className={styles.accreditationBadge}>Govt of India Mission</span>
                <h3 className={styles.accreditationCardTitle}>Registered with NSDC &amp; Skill India</h3>
                <p className={styles.accreditationCardDesc}>
                  Aligned with India&apos;s National Skill Development Corporation ecosystem, delivering certified language competencies for overseas careers and education.
                </p>
              </div>
            </div>

            {/* 2. ISO 9001:2015 */}
            <div className={styles.accreditationCard}>
              <div className={styles.accreditationImgWrap}>
                <Image
                  src="/accreditations/iso-certified.png"
                  alt="ISO 9001:2015 Certified Quality Management System"
                  width={300}
                  height={180}
                  className={styles.accreditationImg}
                />
              </div>
              <div className={styles.accreditationBody}>
                <span className={styles.accreditationBadge}>Quality Benchmark</span>
                <h3 className={styles.accreditationCardTitle}>ISO Certified</h3>
                <p className={styles.accreditationCardDesc}>
                  Globally recognized Quality Management System benchmark ensuring standardized curriculum delivery, student assessment, and teaching excellence.
                </p>
              </div>
            </div>

            {/* 3. Telc Digital Exam Affiliate */}
            <div className={styles.accreditationCard}>
              <div className={styles.accreditationImgWrap}>
                <Image
                  src="/accreditations/telc-affiliate.png"
                  alt="Telc Language Tests - The European Language Certificates"
                  width={300}
                  height={180}
                  className={styles.accreditationImg}
                />
              </div>
              <div className={styles.accreditationBody}>
                <span className={styles.accreditationBadge}>European Testing</span>
                <h3 className={styles.accreditationCardTitle}>Telc Digital Exam Affiliate</h3>
                <p className={styles.accreditationCardDesc}>
                  Affiliated for European CEFR exam preparation, mock simulations, and digital test readiness recognized across German universities and embassies.
                </p>
              </div>
            </div>

            {/* 4. Amazon KDP Published */}
            <div className={styles.accreditationCard}>
              <div className={styles.accreditationImgWrap}>
                <Image
                  src="/accreditations/amazon-kdp.png"
                  alt="Amazon KDP Published Author & Educational Publisher"
                  width={300}
                  height={180}
                  className={styles.accreditationImg}
                />
              </div>
              <div className={styles.accreditationBody}>
                <span className={styles.accreditationBadge}>Published Curriculum</span>
                <h3 className={styles.accreditationCardTitle}>Amazon KDP Published</h3>
                <p className={styles.accreditationCardDesc}>
                  Published foreign language guides, grammar manuals, and practice workbooks authored by our faculty, available worldwide on Amazon Kindle &amp; Paperback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className={`section ${styles.courses}`} id="courses">
        <span id="courses-german" />
        <span id="courses-french" />
        <span id="courses-english" />
        <span id="courses-other" />
        <div className="container">
          <div className={`${styles.coursesHeader} reveal`}>
            <div className="section-label">Our Courses</div>
            <h2 className={`heading-display heading-lg ${styles.coursesTitle}`}>
              German, French &amp; English
            </h2>
            <p className={styles.coursesSub}>
              All German, French, and English programmes follow the international CEFR framework from beginner (A1) to near-native mastery (C2).
              Available in live interactive online batches nationwide, plus offline classroom batches if you prefer in-person learning.
            </p>
          </div>

          <div className={`${styles.courseTabs} reveal reveal-delay-2`}>
            <button
              className={`${styles.courseTab} ${activeTab === "german" ? styles.courseTabActive : ""}`}
              onClick={() => setActiveTab("german")}
              id="tab-german"
            >
              German (A1–C2)
            </button>
            <button
              className={`${styles.courseTab} ${activeTab === "french" ? styles.courseTabActive : ""}`}
              onClick={() => setActiveTab("french")}
              id="tab-french"
            >
              French (A1–C2)
            </button>
            <button
              className={`${styles.courseTab} ${activeTab === "english" ? styles.courseTabActive : ""}`}
              onClick={() => setActiveTab("english")}
              id="tab-english"
            >
              English (A1–C2)
            </button>
          </div>

          <div className={styles.coursesGrid}>
            {displayedCourses.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                index={i}
                onEnquire={openEnquiry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={`section ${styles.steps}`}>
        <div className="container">
          <div className={`${styles.stepsHeader} reveal`}>
            <div className="section-label">How It Works</div>
            <h2 className={`heading-display heading-lg ${styles.stepsTitle}`}>
              From enquiry to first class in four steps
            </h2>
          </div>

          <div className={styles.stepsGrid}>
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`${styles.stepCard} reveal reveal-delay-${i + 1}`}
              >
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.stepsCTA} reveal`}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => openEnquiry()}
            >
              Submit an Enquiry
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — restrained 2-col list, no icon tiles ── */}
      <section className={`section ${styles.whyUs}`} id="why-us">
        <div className="container">
          <div className={styles.whyUsInner}>
            <div className={`${styles.whyUsLeft} reveal`}>
              <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
                Why Fluency Nest
              </div>
              <h2 className={`heading-display heading-lg ${styles.whyUsTitle}`}>
                What makes our<br />teaching different
              </h2>
              <div className="divider" style={{ background: "#c8102e" }} />
              <p className={styles.whyUsSub}>
                We teach one language class at a time — no coaching-centre rush,
                no recorded lectures. Every session is live.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => openEnquiry()}
                style={{ marginTop: "32px" }}
              >
                Enquire Now
                <ArrowRight size={15} />
              </button>
            </div>

            <ul className={`${styles.whyUsList} reveal reveal-delay-2`}>
              {[
                {
                  title: "All six CEFR levels taught",
                  desc: "German A1 through C2 — the full journey in one place, with the same teacher and teaching style.",
                },
                {
                  title: "Small batches, real practice",
                  desc: "Small groups mean every student speaks in every class, not just listens.",
                },
                {
                  title: "Grammar taught, not memorised",
                  desc: "We explain German grammar with clear logic and examples you can apply immediately.",
                },
                {
                  title: "Online & offline flexibility",
                  desc: "Live interactive online batches nationwide, plus offline classroom batches if you prefer in-person learning.",
                },
                {
                  title: "Exam-aligned curriculum",
                  desc: "Course content follows the CEFR framework tested in Goethe, TestDaF, and other exams.",
                },
                {
                  title: "Direct contact with your teacher",
                  desc: "Students can reach the teacher for doubts between classes — not just during sessions.",
                },
              ].map((item, i) => (
                <li key={item.title} className={styles.whyUsItem}>
                  <span className={styles.whyUsNum}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={styles.whyUsItemTitle}>{item.title}</h3>
                    <p className={styles.whyUsItemDesc}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── GERMANY SECTION ── */}
      <section className={styles.germanySection}>
        <div className={styles.germanyBg}>
          <Image
            src="/germany.jpg"
            alt="Germany — study and work opportunities"
            fill
            quality={85}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className={styles.germanyOverlay} />
        </div>

        <div className={`container ${styles.germanyContent}`}>
          <div className={`${styles.germanyInner} reveal`}>
            <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
              Studying in Germany
            </div>
            <h2 className={`heading-display heading-lg ${styles.germanyTitle}`}>
              German universities require<br />
              <em>at least B2 or C1.</em>
            </h2>
            <div className="divider" style={{ background: "#c8102e" }} />
            <p className={styles.germanyText}>
              Most German-taught undergraduate and postgraduate programmes require
              a certified B2 or C1 level before admission. Many employers in Germany
              also specify B2 as the minimum for non-technical roles. Our courses
              take you from A1 all the way to C2 — so you can meet whichever
              requirement applies to your goal.
            </p>

            <p className={styles.germanyDisclaimer}>
              Fluency Nest provides language education only. We do not assist with
              visa applications, university admissions, or immigration.
            </p>

            <button
              className="btn btn-primary btn-lg"
              onClick={() => openEnquiry()}
            >
              Start with German A1
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CLASSROOM / SONIPAT OFFLINE HUB ── */}
      <section className={`section ${styles.classroomSection}`} id="classroom">
        <div className="container">
          {/* Section Header */}
          <div className={`${styles.classroomHeader} reveal`}>
            <div className={styles.classroomBadge}>
              <MapPin size={14} aria-hidden="true" />
              <span>OFFLINE IN SONIPAT (COMING SOON)</span>
            </div>
            <h2 className={`heading-display heading-lg ${styles.classroomMainTitle}`}>
              Prefer in-person learning?<br />
              <em>Offline batches coming soon to Sonipat.</em>
            </h2>
            <p className={styles.classroomMainSub}>
              Launching soon in Sonipat! Our upcoming offline institute will feature multimedia smart classrooms, direct faculty mentorship, and Goethe/DELF exam preparation for students across Sonipat and Delhi-NCR. Live online batches are actively enrolling today.
            </p>
          </div>

          {/* Landmark Proximity Bar */}
          <div className={`${styles.classroomProximityBar} reveal reveal-delay-1`}>
            <div className={styles.proximityItem}>
              <span className={styles.proximityIcon}>🚗</span>
              <div className={styles.proximityDetails}>
                <strong>5 Mins</strong>
                <span>DCRUST &amp; NH 44</span>
              </div>
            </div>
            <div className={styles.proximityItem}>
              <span className={styles.proximityIcon}>🎓</span>
              <div className={styles.proximityDetails}>
                <strong>12 Mins</strong>
                <span>Education City (Ashoka &amp; SRM)</span>
              </div>
            </div>
            <div className={styles.proximityItem}>
              <span className={styles.proximityIcon}>🏙️</span>
              <div className={styles.proximityDetails}>
                <strong>8 Mins</strong>
                <span>Sonipat City (Model Town / Sec 14)</span>
              </div>
            </div>
            <div className={styles.proximityItem}>
              <span className={styles.proximityIcon}>🅿️</span>
              <div className={styles.proximityDetails}>
                <strong>Free Parking</strong>
                <span>Secured Campus Parking</span>
              </div>
            </div>
          </div>

          {/* Main Grid: Campus Image + Infrastructure */}
          <div className={styles.classroomGrid}>
            <div className={`${styles.classroomImageWrap} reveal`}>
              <Image
                src="/classroom.jpg"
                alt="Interactive language classroom at Fluency Nest Sonipat"
                width={650}
                height={460}
                className={styles.classroomImg}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.classroomImgOverlay}>
                <div className={styles.imgBadge}>
                  <MapPin size={14} />
                  <span>Sonipat, Haryana (Coming Soon)</span>
                </div>
                <div className={styles.imgSubBadge}>
                  <span>Pre-Register for Early Batches</span>
                </div>
              </div>
            </div>

            <div className={`${styles.classroomContent} reveal reveal-delay-2`}>
              <div className="section-label">Campus Amenities &amp; Standards</div>
              <h3 className={`heading-display heading-sm ${styles.classroomSubTitle}`}>
                Designed for rapid fluency &amp; exam readiness
              </h3>
              <p className={styles.classroomIntroText}>
                Whether you are aiming for higher studies in Germany, Canada PR via French, or cracking MNC interviews, our Sonipat centre is purpose-built for intensive language mastery:
              </p>

              <div className={styles.campusFeatureList}>
                <div className={styles.campusFeature}>
                  <div className={styles.campusFeatureIcon}>🎯</div>
                  <div>
                    <h4 className={styles.campusFeatureHeading}>Exam Simulation &amp; Audio Lab</h4>
                    <p className={styles.campusFeatureDesc}>
                      Timed mock tests and authentic listening exercises replicating official Goethe-Zertifikat, Telc, and DELF testing environments.
                    </p>
                  </div>
                </div>

                <div className={styles.campusFeature}>
                  <div className={styles.campusFeatureIcon}>🗣️</div>
                  <div>
                    <h4 className={styles.campusFeatureHeading}>Round-Table Speaking Pods</h4>
                    <p className={styles.campusFeatureDesc}>
                      Small batches capped at 8–12 students. Every learner gets daily active speaking time and personalized pronunciation feedback.
                    </p>
                  </div>
                </div>

                <div className={styles.campusFeature}>
                  <div className={styles.campusFeatureIcon}>📚</div>
                  <div>
                    <h4 className={styles.campusFeatureHeading}>Physical Study Library &amp; Materials</h4>
                    <p className={styles.campusFeatureDesc}>
                      Access authentic Hueber, Klett, and Didier books, vocabulary flashcards, and grammar drill sheets at no extra cost.
                    </p>
                  </div>
                </div>

                <div className={styles.campusFeature}>
                  <div className={styles.campusFeatureIcon}>🕒</div>
                  <div>
                    <h4 className={styles.campusFeatureHeading}>Flexible Student &amp; Professional Batches</h4>
                    <p className={styles.campusFeatureDesc}>
                      Morning, afternoon, and evening batches specifically scheduled for DCRUST/Ashoka students and working commuters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Dedicated Sonipat Program Cards */}
          <div className={`${styles.sonipatProgramsHeader} reveal`}>
            <div className="section-label">Offline Batches in Sonipat</div>
            <h3 className={`heading-display heading-sm ${styles.sonipatProgramsTitle}`}>
              Choose Your Course at Our Sonipat Campus
            </h3>
          </div>

          <div className={styles.sonipatProgramsGrid}>
            {/* German Card */}
            <div className={`${styles.sonipatProgramCard} card reveal`}>
              <div className={styles.programCardTop}>
                <span className={styles.programFlag}>🇩🇪</span>
                <span className={styles.programBadge}>Popular in Sonipat</span>
              </div>
              <h4 className={styles.programTitle}>German Language Institute in Sonipat</h4>
              <p className={styles.programLevel}>Beginner to Advanced (A1, A2, B1, B2, C1)</p>
              <p className={styles.programDesc}>
                Official Goethe &amp; Telc exam preparation. Essential for Germany Master&apos;s degrees, public university free tuition, Ausbildung, and nursing visas.
              </p>
              <ul className={styles.programBullets}>
                <li><CheckCircle size={14} /> Convenient for Sonipat &amp; University Students</li>
                <li><CheckCircle size={14} /> 100% Goethe Exam Pass Record</li>
                <li><CheckCircle size={14} /> Offline Batches (Coming Soon) + Online Backup</li>
              </ul>
              <Link href="/german-classes-sonipat" className={`btn btn-primary ${styles.programBtn}`}>
                Explore German Institute
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* French Card */}
            <div className={`${styles.sonipatProgramCard} card reveal reveal-delay-1`}>
              <div className={styles.programCardTop}>
                <span className={styles.programFlag}>🇫🇷</span>
                <span className={styles.programBadge}>Canada PR Booster</span>
              </div>
              <h4 className={styles.programTitle}>French Language Institute in Sonipat</h4>
              <p className={styles.programLevel}>DELF A1–B2 &amp; TEF / TCF Canada</p>
              <p className={styles.programDesc}>
                Targeted coaching for Canada Express Entry PR (+50 CRS bonus points), Alliance Française DELF exams, and French university admissions.
              </p>
              <ul className={styles.programBullets}>
                <li><CheckCircle size={14} /> TEF / TCF Canada Strategy</li>
                <li><CheckCircle size={14} /> Native Accent &amp; Grammar Drills</li>
                <li><CheckCircle size={14} /> Weekend &amp; Weekday Options</li>
              </ul>
              <Link href="/french-classes-sonipat" className={`btn btn-primary ${styles.programBtn}`}>
                Explore French Institute
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Spoken English Card */}
            <div className={`${styles.sonipatProgramCard} card reveal reveal-delay-2`}>
              <div className={styles.programCardTop}>
                <span className={styles.programFlag}>🇬🇧</span>
                <span className={styles.programBadge}>Career Fluency</span>
              </div>
              <h4 className={styles.programTitle}>Spoken English &amp; Public Speaking Institute in Sonipat</h4>
              <p className={styles.programLevel}>Hesitation Removal &amp; MNC Placements</p>
              <p className={styles.programDesc}>
                Eliminate mother-tongue influence, build spontaneous conversational fluency, and master interview skills for top corporate and campus placements.
              </p>
              <ul className={styles.programBullets}>
                <li><CheckCircle size={14} /> Extempore &amp; Group Discussions</li>
                <li><CheckCircle size={14} /> Corporate Email &amp; Presentation Skills</li>
                <li><CheckCircle size={14} /> IELTS / PTE Speaking Foundation</li>
              </ul>
              <Link href="/spoken-english-classes-sonipat" className={`btn btn-primary ${styles.programBtn}`}>
                Explore English Institute
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Action Callout Bar */}
          <div className={`${styles.classroomCtaCard} reveal`}>
            <div className={styles.classroomCtaLeft}>
              <h3 className={styles.classroomCtaHeading}>
                Offline Batches Coming Soon in Sonipat
              </h3>
              <p className={styles.classroomCtaText}>
                We are launching our dedicated offline classroom centre in <strong>Sonipat</strong> soon! Pre-register now to reserve your seat and get early-bird batch schedules. Live online batches are actively enrolling right now.
              </p>
              <div className={styles.classroomCtaMeta}>
                <span>Sonipat, Haryana — 131001 (Offline Centre Coming Soon)</span>
                <span>·</span>
                <span>🕒 Live Online Batches Active Mon–Sat</span>
              </div>
            </div>
            <div className={styles.classroomCtaRight}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => openEnquiry("Pre-Register: Sonipat Offline Batches")}
              >
                Pre-Register for Offline Batches
                <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => openEnquiry("Live Online Demo Class")}
              >
                Join Live Online Trial Class
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS & FEEDBACK ── */}
      <TestimonialsSection />

      {/* ── FAQ ── */}
      <section className={`section ${styles.faq}`} id="faq">
        <div className="container">
          <div className={`${styles.faqHeader} reveal`}>
            <div className="section-label">FAQ</div>
            <h2 className={`heading-display heading-lg ${styles.faqTitle}`}>
              Common questions
            </h2>
            <p className={styles.faqSub}>
              Anything not covered here? Call or WhatsApp us — details below.
            </p>
          </div>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section className={`section ${styles.enquirySection}`} id="enquiry">
        <div className="container">
          <div className={styles.enquiryGrid}>
            <div className={`${styles.enquirySide} reveal`}>
              <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
                Enquire Now
              </div>
              <h2 className={`heading-display heading-md ${styles.enquirySideTitle}`}>
                Tell us which course interests you
              </h2>
              <div className="divider" style={{ background: "#c8102e" }} />
              <p className={styles.enquirySideText}>
                Fill in the form and we will contact you to confirm batch timings,
                fees, and your current level — so you start in the right class.
              </p>

              <div className={styles.enquiryContacts}>
                <a href={`tel:${SITE_CONFIG.phone}`} className={styles.enquiryContact}>
                  <span className={styles.enquiryContactType}>Phone</span>
                  <span className={styles.enquiryContactVal}>{SITE_CONFIG.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.enquiryContact}
                >
                  <span className={styles.enquiryContactType}>WhatsApp</span>
                  <span className={styles.enquiryContactVal}>{SITE_CONFIG.phone}</span>
                </a>
                <a href={`mailto:${SITE_CONFIG.email}`} className={styles.enquiryContact}>
                  <span className={styles.enquiryContactType}>Email</span>
                  <span className={styles.enquiryContactVal}>{SITE_CONFIG.email}</span>
                </a>
              </div>
            </div>

            <div className={`${styles.enquiryFormWrapper} reveal reveal-delay-2`}>
              <EnquiryForm
                defaultCourse={selectedCourse}
                key={selectedCourse + (formOpen ? "open" : "")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className={`section ${styles.contactSection}`} id="contact">
        <div className="container">
          <div className={`${styles.contactHeader} reveal`}>
            <div className="section-label">Contact &amp; Offline Institute</div>
            <h2 className={`heading-display heading-lg ${styles.contactTitle}`}>
              Get in Touch or Visit Our Institute
            </h2>
            <p style={{ marginTop: "12px", color: "var(--text-secondary)", fontSize: "1rem" }}>
              If you want offline classes, visit our physical institute in person. For online admissions nationwide, connect directly with our admissions team.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactDetails}>
              <div className={`${styles.contactRow} reveal`} id="contact-address">
                <span className={styles.contactRowLabel}>Address</span>
                <span className={styles.contactRowVal}>{SITE_CONFIG.address.full}</span>
              </div>
              <div className={`${styles.contactRow} reveal reveal-delay-1`} id="contact-phone">
                <span className={styles.contactRowLabel}>Phone</span>
                <a href={`tel:${SITE_CONFIG.phone}`} className={`${styles.contactRowVal} ${styles.contactLink}`}>
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className={`${styles.contactRow} reveal reveal-delay-2`} id="contact-whatsapp">
                <span className={styles.contactRowLabel}>WhatsApp</span>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.contactRowVal} ${styles.contactLink}`}
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className={`${styles.contactRow} reveal reveal-delay-2`} id="contact-email">
                <span className={styles.contactRowLabel}>Email</span>
                <a href={`mailto:${SITE_CONFIG.email}`} className={`${styles.contactRowVal} ${styles.contactLink}`}>
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className={`${styles.contactRow} reveal reveal-delay-3`} id="contact-hours">
                <span className={styles.contactRowLabel}>Hours</span>
                <span className={styles.contactRowVal} style={{ whiteSpace: "pre-line" }}>
                  {SITE_CONFIG.hours.weekdays}{"\n"}{SITE_CONFIG.hours.sunday}
                </span>
              </div>
            </div>

            <div className={`${styles.contactMap} reveal reveal-delay-2`}>
              <iframe
                src="https://www.google.com/maps?q=Sonipat,+Haryana&z=13&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fluency Nest — Sonipat, Haryana — 131001 (Offline Centre Coming Soon)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WELCOME LEAD POPUP MODAL ── */}
      <LeadPopup />
    </>
  );
}
