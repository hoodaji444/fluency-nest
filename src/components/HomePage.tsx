"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { SITE_CONFIG, COURSES, FAQ_ITEMS } from "@/lib/config";
import EnquiryForm from "@/components/EnquiryForm";
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
    desc: "Fill in the short form below with your preferred course, learning mode (online or Sonipat), and a convenient time to be contacted.",
  },
  {
    number: "03",
    title: "Speak with our team",
    desc: "We will call you to answer questions, confirm your level, and enrol you in the right batch.",
  },
  {
    number: "04",
    title: "Attend your first class",
    desc: "Join a live session — in our Sonipat classroom or online — and start building the language from day one.",
  },
];

// ── Main Page ───────────────────────────────────────────────
export default function HomePage() {

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [activeTab, setActiveTab] = useState<"german" | "other">("german");

  useScrollReveal([activeTab]);

  const openEnquiry = useCallback((courseId: string = "") => {
    setSelectedCourse(courseId);
    setFormOpen(true);
    setTimeout(() => {
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  const germanCourses = COURSES.filter((c) => c.language === "German");
  const otherCourses  = COURSES.filter((c) => c.language !== "German");

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero} id="home" aria-label="Hero">
        <div className={styles.heroBg}>
          <Image
            src="/hero-bg.jpg"
            alt="Berlin Brandenburg Gate — Germany"
            fill
            priority
            quality={90}
            style={{ objectFit: "cover", objectPosition: "center 60%" }}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroInner}>
            {/* Location tag — plain text, no glass */}
            <p className={styles.heroLocation}>
              <MapPin size={13} aria-hidden="true" />
              Sonipat, Haryana · Online &amp; Offline Classes
            </p>

            <h1 className={`heading-display heading-xl ${styles.heroTitle}`}>
              Learn German.<br />
              <em>Build the future you planned.</em>
            </h1>

            <p className={`body-lg ${styles.heroSub}`}>
              Structured German courses from A1 to C2 — taught in small batches,
              online and in Sonipat. French and English also available.
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
                className={`btn btn-outline-light btn-lg`}
              >
                View Courses
              </a>
            </div>

            {/* Contact strip — no card, just inline text */}
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

      {/* ── ABOUT ── */}
      <section className={`section ${styles.about}`} id="about">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <Image
                src="/teacher.jpg"
                alt="German language class at Fluency Nest, Sonipat"
                width={480}
                height={560}
                className={styles.aboutImg}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.aboutContent}>
              <div className="reveal">
                <div className="section-label">About Fluency Nest</div>
                <h2 className={`heading-display heading-lg ${styles.aboutTitle}`}>
                  A language school in Sonipat,<br />
                  <em>focused on one thing.</em>
                </h2>
                <div className="divider" />
              </div>

              <div className="reveal reveal-delay-2">
                <p className={styles.aboutPara}>
                  Fluency Nest is a language institute in Sonipat, Haryana. We teach German
                  from A1 to C2, along with French and English, using the CEFR framework —
                  the same standard used by German universities and employers worldwide.
                </p>
                <p className={styles.aboutPara}>
                  Classes are live and interactive, kept to small batches so every student
                  gets real practice time. You can attend in person in Sonipat or join
                  online — same teacher, same curriculum.
                </p>
              </div>

              <ul className={`${styles.aboutPoints} reveal reveal-delay-3`}>
                {[
                  "German A1 to C2 — all CEFR levels",
                  "French and English courses available",
                  "Small batch sizes for focused learning",
                  "Online and offline, same curriculum",
                  "Based in Sonipat, Haryana",
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

      {/* ── COURSES ── */}
      <section className={`section ${styles.courses}`} id="courses-german">
        <div className="container">
          <div className={`${styles.coursesHeader} reveal`}>
            <div className="section-label">Our Courses</div>
            <h2 className={`heading-display heading-lg ${styles.coursesTitle}`}>
              German, French &amp; English
            </h2>
            <p className={styles.coursesSub}>
              All courses follow the CEFR framework. Contact us to confirm current
              batch timings and fees — they vary by level and mode.
            </p>
          </div>

          <div className={`${styles.courseTabs} reveal reveal-delay-2`}>
            <button
              className={`${styles.courseTab} ${activeTab === "german" ? styles.courseTabActive : ""}`}
              onClick={() => setActiveTab("german")}
            >
              German (A1–C2)
            </button>
            <button
              className={`${styles.courseTab} ${activeTab === "other" ? styles.courseTabActive : ""}`}
              onClick={() => setActiveTab("other")}
              id="courses-other"
            >
              French &amp; English
            </button>
          </div>

          <span id="courses-french" />
          <span id="courses-english" />

          <div className={styles.coursesGrid}>
            {(activeTab === "german" ? germanCourses : otherCourses).map((course, i) => (
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
                  title: "Online and offline — same class",
                  desc: "Attend in Sonipat or join the same live session online. No separate recordings.",
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

      {/* ── CLASSROOM ── */}
      <section className={`section ${styles.classroomSection}`}>
        <div className="container">
          <div className={styles.classroomGrid}>
            <div className={styles.classroomImage}>
              <Image
                src="/classroom.jpg"
                alt="Live German language class at Fluency Nest, Sonipat"
                width={600}
                height={440}
                className={styles.classroomImg}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.classroomContent}>
              <div className="reveal">
                <div className="section-label">Our Classroom</div>
                <h2 className={`heading-display heading-md ${styles.classroomTitle}`}>
                  Live sessions, small groups,<br />no pre-recorded content
                </h2>
                <div className="divider" />
              </div>
              <div className="reveal reveal-delay-2">
                <p className={styles.classroomText}>
                  Every class at Fluency Nest — whether in our Sonipat centre or
                  online — is a live, interactive session with your teacher.
                  You speak, ask questions, and receive corrections in real time.
                </p>
                <p className={styles.classroomText}>
                  Our lessons cover all four skills: speaking, listening, reading,
                  and writing — following the structure of the CEFR levels so you
                  are always building toward a measurable milestone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <div className="section-label">Contact</div>
            <h2 className={`heading-display heading-lg ${styles.contactTitle}`}>
              Find us in Sonipat
            </h2>
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
                src="https://www.google.com/maps?q=29.009771,77.077504&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fluency Nest — SCO-10, Eldeco County, Murthal, Sonipat"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
