"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { X, User, Phone, CheckCircle, ArrowRight, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import styles from "./LeadPopup.module.css";

const POPUP_STORAGE_KEY = "fluencynest_popup_dismissed";
const POPUP_SUBMITTED_KEY = "fluencynest_popup_submitted";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [botField, setBotField] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [language, setLanguage] = useState<"german" | "french" | "english">("german");
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; mobile?: string }>({});

  const closePopup = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  useEffect(() => {
    // Check if already submitted or dismissed in this session
    try {
      const isDismissed = sessionStorage.getItem(POPUP_STORAGE_KEY);
      const isSubmitted = sessionStorage.getItem(POPUP_SUBMITTED_KEY);
      if (isDismissed || isSubmitted) {
        return;
      }
    } catch {
      // continue
    }

    // Trigger after 4 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    // Global listener so any button can also open it
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-lead-popup", handleOpen);

    // Close on Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-lead-popup", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopup]);

  const validate = () => {
    const errs: { fullName?: string; mobile?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name";
    }

    const cleanMobile = mobile.replace(/[\s-]/g, "");
    if (!cleanMobile) {
      errs.mobile = "Please enter your mobile or WhatsApp number";
    } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = "Please enter a valid 10-digit mobile number";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobile: mobile.trim(),
          course: language,
          mode: mode,
          source: "Website Welcome Pop-up",
          consent: true,
          botField,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        try {
          sessionStorage.setItem(POPUP_SUBMITTED_KEY, "true");
        } catch {
          // ignore
        }
        // Auto close after 3.5 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 3500);
      } else {
        setErrors({
          mobile: data.message || "Failed to submit. Please try again or contact us directly.",
        });
      }
    } catch {
      setErrors({
        mobile: "Network error. Please try again or WhatsApp us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePopup();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
    >
      <div className={styles.modal}>
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={closePopup}
          aria-label="Close pop-up"
          type="button"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.topPill}>
                <Sparkles size={12} />
                <span>New Batches Enrolling</span>
              </div>
              <h2 className={styles.modalTitle} id="lead-popup-title">
                Get Course Details &amp; Fee Structure
              </h2>
              <p className={styles.modalSub}>
                Enter your name and number below — our academic counselor will contact you with batch schedules, syllabus, and trial class access.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.modalBody} noValidate>
              {/* Invisible honeypot field for anti-spambot protection */}
              <div
                style={{
                  display: "none",
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <label htmlFor="popup_hp_website_url">Do not fill this</label>
                <input
                  id="popup_hp_website_url"
                  type="text"
                  name="website_url"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Full Name */}
              <div className={styles.formGroup}>
                <label htmlFor="lead-name" className={styles.label}>
                  Your Name <span>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    id="lead-name"
                    name="fullName"
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    autoComplete="name"
                    disabled={loading}
                    autoFocus
                  />
                </div>
                {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
              </div>

              {/* Phone Number */}
              <div className={styles.formGroup}>
                <label htmlFor="lead-mobile" className={styles.label}>
                  Mobile / WhatsApp Number <span>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Phone size={16} className={styles.inputIcon} />
                  <input
                    type="tel"
                    id="lead-mobile"
                    name="mobile"
                    className={`${styles.input} ${errors.mobile ? styles.inputError : ""}`}
                    placeholder="e.g. 98765 43210"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
                    }}
                    autoComplete="tel"
                    disabled={loading}
                  />
                </div>
                {errors.mobile && <span className={styles.errorText}>{errors.mobile}</span>}
              </div>

              {/* Language Interest */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Language You Want to Learn</label>
                <div className={styles.pillsGrid}>
                  <button
                    type="button"
                    className={`${styles.pillBtn} ${language === "german" ? styles.pillBtnActive : ""}`}
                    onClick={() => setLanguage("german")}
                  >
                    <span className={styles.pillEmoji}>🇩🇪</span>
                    <span>German</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.pillBtn} ${language === "french" ? styles.pillBtnActive : ""}`}
                    onClick={() => setLanguage("french")}
                  >
                    <span className={styles.pillEmoji}>🇫🇷</span>
                    <span>French</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.pillBtn} ${language === "english" ? styles.pillBtnActive : ""}`}
                    onClick={() => setLanguage("english")}
                  >
                    <span className={styles.pillEmoji}>🇬🇧</span>
                    <span>English</span>
                  </button>
                </div>
              </div>

              {/* Preferred Mode */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Preferred Learning Mode</label>
                <div className={styles.modeToggle}>
                  <button
                    type="button"
                    className={`${styles.modeBtn} ${mode === "online" ? styles.modeBtnActive : ""}`}
                    onClick={() => setMode("online")}
                  >
                    💻 Live Online Classes
                  </button>
                  <button
                    type="button"
                    className={`${styles.modeBtn} ${mode === "offline" ? styles.modeBtnActive : ""}`}
                    onClick={() => setMode("offline")}
                  >
                    🏫 Offline In-Person
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={18} className={styles.spinner} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Request Callback &amp; Course Details</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className={styles.privacyNote}>
                <ShieldCheck size={13} />
                <span>100% confidential. No spam, only course consultation.</span>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className={styles.successBox}>
            <div className={styles.successIconWrap}>
              <CheckCircle size={36} />
            </div>
            <h3 className={styles.successTitle}>Thank You, {fullName}!</h3>
            <p className={styles.successDesc}>
              We have received your enquiry for <strong>{language.toUpperCase()}</strong>.
              Our academic counselor will call/WhatsApp you on <strong>{mobile}</strong> shortly with complete batch schedules and fee structure.
            </p>
            <button
              type="button"
              className={styles.successCloseBtn}
              onClick={closePopup}
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
