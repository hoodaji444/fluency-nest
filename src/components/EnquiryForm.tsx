"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import styles from "./EnquiryForm.module.css";

const COURSES_OPTIONS = [
  // German (A1–C2)
  { value: "german-a1", label: "German A1 — Beginner" },
  { value: "german-a2", label: "German A2 — Elementary" },
  { value: "german-b1", label: "German B1 — Intermediate" },
  { value: "german-b2", label: "German B2 — Upper Intermediate" },
  { value: "german-c1", label: "German C1 — Advanced" },
  { value: "german-c2", label: "German C2 — Mastery" },
  // French (A1–C2)
  { value: "french-a1", label: "French A1 — Beginner (DELF A1)" },
  { value: "french-a2", label: "French A2 — Elementary (DELF A2)" },
  { value: "french-b1", label: "French B1 — Intermediate (DELF B1)" },
  { value: "french-b2", label: "French B2 — Upper Intermediate (DELF B2)" },
  { value: "french-c1", label: "French C1 — Advanced (DALF C1)" },
  { value: "french-c2", label: "French C2 — Mastery (DALF C2)" },
  // English (A1–C2)
  { value: "english-a1", label: "English A1 — Foundational Beginner" },
  { value: "english-a2", label: "English A2 — Elementary Speaking" },
  { value: "english-b1", label: "English B1 — Intermediate & Spoken Fluency" },
  { value: "english-b2", label: "English B2 — Professional & Business Fluency" },
  { value: "english-c1", label: "English C1 — Advanced & Global Academic" },
  { value: "english-c2", label: "English C2 — Native Mastery & Public Speaking" },
  // Guidance
  { value: "not-sure", label: "Not Sure — Need Level Assessment" },
];

const MODE_OPTIONS = [
  { value: "online", label: "Online Classes (Live Interactive)" },
  { value: "offline", label: "Offline In-Person (Eldeco County, Murthal, Sonipat)" },
  { value: "guidance", label: "Need Guidance" },
];

const GOAL_OPTIONS = [
  { value: "study-germany", label: "Study in Germany" },
  { value: "work-germany", label: "Work in Germany" },
  { value: "exam-prep", label: "Language Examination Preparation" },
  { value: "personal-interest", label: "Personal Interest" },
  { value: "improve-communication", label: "Improve Communication" },
  { value: "other", label: "Other" },
];

const TIMING_OPTIONS = [
  { value: "morning", label: "Morning (8 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 4 PM)" },
  { value: "evening", label: "Evening (4 PM – 8 PM)" },
  { value: "flexible", label: "Flexible / Discuss with Team" },
];

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  course: string;
  mode: string;
  city: string;
  timing: string;
  goal: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  course?: string;
  mode?: string;
  consent?: string;
}

interface EnquiryFormProps {
  defaultCourse?: string;
}

function validateMobile(mobile: string): boolean {
  const cleaned = mobile.replace(/\s|-/g, "");
  return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
}

export default function EnquiryForm({ defaultCourse = "" }: EnquiryFormProps) {
  const [botField, setBotField] = useState("");
  const [form, setForm] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    course: defaultCourse,
    mode: "",
    city: "",
    timing: "",
    goal: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitCount = useRef(0);
  const lastSubmitTime = useRef(0);

  // Update course when defaultCourse changes (from course card clicks)
  useEffect(() => {
    if (defaultCourse) {
      setForm((prev) => ({ ...prev, course: defaultCourse }));
    }
  }, [defaultCourse]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 characters).";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!validateMobile(form.mobile)) {
      newErrors.mobile = "Please enter a valid Indian mobile number.";
    }

    if (!form.course) {
      newErrors.course = "Please select a course you are interested in.";
    }

    if (!form.mode) {
      newErrors.mode = "Please select your preferred learning mode.";
    }

    if (!form.consent) {
      newErrors.consent = "Please confirm your consent to be contacted.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Basic spam protection — limit to 3 submissions per 5 minutes
    const now = Date.now();
    if (now - lastSubmitTime.current < 5 * 60 * 1000 && submitCount.current >= 3) {
      setSubmitError("Too many submissions. Please wait a few minutes before trying again.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          botField,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        submitCount.current += 1;
        lastSubmitTime.current = now;
      } else {
        setSubmitError(
          data.message || "Something went wrong. Please try again or contact us directly."
        );
      }
    } catch {
      setSubmitError(
        "Unable to submit. Please check your internet connection or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>
          <CheckCircle size={52} color="#10b981" />
        </div>
        <h3 className={styles.successTitle}>Enquiry Received!</h3>
        <p className={styles.successText}>
          Thank you for your enquiry! Our team will contact you soon to help you choose the right course.
        </p>
        <div className={styles.successMeta}>
          <span>✅ Name: {form.fullName}</span>
          <span>✅ Mobile: {form.mobile}</span>
          {form.course && (
            <span>
              ✅ Course: {COURSES_OPTIONS.find((c) => c.value === form.course)?.label}
            </span>
          )}
        </div>
        <button
          className={`btn btn-outline btn-sm ${styles.successReset}`}
          onClick={() => {
            setSubmitted(false);
            setBotField("");
            setForm({
              fullName: "",
              mobile: "",
              email: "",
              course: "",
              mode: "",
              city: "",
              timing: "",
              goal: "",
              message: "",
              consent: false,
            });
          }}
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Student enquiry form"
      id="enquiry-form"
    >
      {/* Honeypot field for anti-spambot protection (invisible to humans) */}
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
        <label htmlFor="hp_website_url">Do not fill this</label>
        <input
          id="hp_website_url"
          type="text"
          name="website_url"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>Student Enquiry</h3>
        <p className={styles.formSubtitle}>
          Fill in your details and we will get back to you shortly.
        </p>
        <div className={styles.formRequired}>
          Fields marked with <span style={{ color: "#c8102e" }}>*</span> are required.
        </div>
      </div>

      {/* ── Honeypot (spam protection) ── */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div className={styles.formBody}>
        {/* Row 1: Name + Mobile */}
        <div className={styles.formRow}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name <span>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`form-input ${errors.fullName ? "error" : ""}`}
              placeholder="e.g. Priya Sharma"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
              maxLength={100}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              aria-required="true"
            />
            {errors.fullName && (
              <span className="form-error" id="fullName-error" role="alert">
                <AlertCircle size={13} />
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile Number <span>*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className={`form-input ${errors.mobile ? "error" : ""}`}
              placeholder="e.g. 98765 43210"
              value={form.mobile}
              onChange={handleChange}
              autoComplete="tel"
              maxLength={15}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
              aria-required="true"
            />
            {errors.mobile && (
              <span className="form-error" id="mobile-error" role="alert">
                <AlertCircle size={13} />
                {errors.mobile}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span style={{ color: "#718096", fontWeight: 400 }}>(Optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="e.g. priya@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={120}
          />
        </div>

        {/* Course */}
        <div className="form-group">
          <label htmlFor="course" className="form-label">
            Preferred Course <span>*</span>
          </label>
          <select
            id="course"
            name="course"
            className={`form-select ${errors.course ? "error" : ""}`}
            value={form.course}
            onChange={handleChange}
            aria-describedby={errors.course ? "course-error" : undefined}
            aria-required="true"
          >
            <option value="">— Select a course —</option>
            {COURSES_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.course && (
            <span className="form-error" id="course-error" role="alert">
              <AlertCircle size={13} />
              {errors.course}
            </span>
          )}
        </div>

        {/* Mode */}
        <div className="form-group">
          <label className="form-label" id="mode-label">
            Preferred Learning Mode <span>*</span>
          </label>
          <div className={styles.radioGroup} role="radiogroup" aria-labelledby="mode-label">
            {MODE_OPTIONS.map((opt) => (
              <label key={opt.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="mode"
                  value={opt.value}
                  checked={form.mode === opt.value}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioCustom} />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.mode && (
            <span className="form-error" role="alert">
              <AlertCircle size={13} />
              {errors.mode}
            </span>
          )}
        </div>

        {/* Row 2: City + Timing */}
        <div className={styles.formRow}>
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              Current City <span style={{ color: "#718096", fontWeight: 400 }}>(Optional)</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-input"
              placeholder="e.g. Delhi, Chandigarh, Sonipat"
              value={form.city}
              onChange={handleChange}
              maxLength={60}
            />
          </div>

          <div className="form-group">
            <label htmlFor="timing" className="form-label">
              Preferred Batch Timing <span style={{ color: "#718096", fontWeight: 400 }}>(Optional)</span>
            </label>
            <select
              id="timing"
              name="timing"
              className="form-select"
              value={form.timing}
              onChange={handleChange}
            >
              <option value="">— Select timing —</option>
              {TIMING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Goal */}
        <div className="form-group">
          <label htmlFor="goal" className="form-label">
            Learning Goal <span style={{ color: "#718096", fontWeight: 400 }}>(Optional)</span>
          </label>
          <select
            id="goal"
            name="goal"
            className="form-select"
            value={form.goal}
            onChange={handleChange}
          >
            <option value="">— What is your main goal? —</option>
            {GOAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Additional Message <span style={{ color: "#718096", fontWeight: 400 }}>(Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            placeholder="Tell us anything that would help us guide you better — your current level, questions about the course, etc."
            value={form.message}
            onChange={handleChange}
            maxLength={600}
          />
        </div>

        {/* Consent */}
        <div className={styles.consentGroup}>
          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className={styles.consentCheckbox}
              aria-required="true"
            />
            <span className={styles.consentCustom} />
            <span className={styles.consentText}>
              I consent to Fluency Nest contacting me via phone, WhatsApp, or email regarding my course enquiry. My information will only be used for this purpose.{" "}
              <a href="/privacy-policy" target="_blank" className={styles.consentLink}>
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.consent && (
            <span className="form-error" role="alert">
              <AlertCircle size={13} />
              {errors.consent}
            </span>
          )}
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className={styles.submitError} role="alert">
            <AlertCircle size={16} />
            <span>{submitError}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className={`btn btn-primary btn-lg ${styles.submitBtn}`}
          disabled={submitting}
          id="form-submit-btn"
        >
          {submitting ? (
            <>
              <Loader2 size={20} className={styles.loadingIcon} />
              Submitting Enquiry...
            </>
          ) : (
            <>
              Submit Enquiry
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        <p className={styles.formDisclaimer}>
          Your information is kept confidential and will only be used to respond to your enquiry.
        </p>
      </div>
    </form>
  );
}
