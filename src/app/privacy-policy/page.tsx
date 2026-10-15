import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Fluency Nest",
  description:
    "Privacy Policy for Fluency Nest — learn how we collect, use, and protect your personal data submitted through our student enquiry form.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2025";

  return (
    <div className={styles.legalPage}>
      <div className={styles.legalHero}>
        <div className="container">
          <div className="section-label" style={{ color: "rgba(255,255,255,0.65)" }}>
            Legal
          </div>
          <h1 className={`heading-display heading-lg ${styles.legalTitle}`}>
            Privacy Policy
          </h1>
          <p className={styles.legalMeta}>Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className={`section ${styles.legalContent}`}>
        <div className={`container ${styles.legalContainer}`}>
          <section className={styles.legalSection}>
            <h2>1. Who We Are</h2>
            <p>
              This Privacy Policy applies to <strong>{SITE_CONFIG.name}</strong>, a German language institute based at {SITE_CONFIG.address.full}. We can be contacted at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a> or {SITE_CONFIG.phone}.
            </p>
            <p>
              This policy explains how we collect, use, and protect information submitted through our website at{" "}
              <a href={SITE_CONFIG.siteUrl}>{SITE_CONFIG.siteUrl}</a>.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Information We Collect</h2>
            <p>We collect the following information when you submit an enquiry through our website:</p>
            <ul>
              <li><strong>Full Name</strong> — to address you correctly</li>
              <li><strong>Mobile Number</strong> — to contact you about your enquiry</li>
              <li><strong>Email Address</strong> (optional) — to send additional course information</li>
              <li><strong>Selected Course</strong> — to provide relevant information</li>
              <li><strong>Preferred Learning Mode</strong> — to match you with the appropriate batch</li>
              <li><strong>City</strong> (optional) — to understand your location for class planning</li>
              <li><strong>Preferred Batch Timing</strong> (optional) — to suggest suitable batches</li>
              <li><strong>Learning Goal</strong> (optional) — to provide personalised guidance</li>
              <li><strong>Additional Message</strong> (optional) — any specific questions or requirements</li>
              <li><strong>Submission timestamp</strong> — for record-keeping</li>
            </ul>
            <p>We do not collect payment information through this website.</p>
          </section>

          <section className={styles.legalSection}>
            <h2>3. How We Use Your Information</h2>
            <p>Information submitted through our enquiry form is used exclusively for the following purposes:</p>
            <ul>
              <li>To respond to your course enquiry</li>
              <li>To provide information about our courses, fees, and batch timings</li>
              <li>To contact you via phone, WhatsApp, or email as indicated in your enquiry</li>
              <li>To maintain records of student enquiries for our internal purposes</li>
            </ul>
            <p>We do not use your information for automated decision-making or profiling.</p>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Data Sharing and Storage</h2>
            <p>
              Your enquiry data may be stored in a Google Sheet managed by {SITE_CONFIG.name}, protected by Google&apos;s security and access controls. Only authorised staff at {SITE_CONFIG.name} have access to this data.
            </p>
            <p>We do not sell, rent, or share your personal information with any third party for marketing purposes.</p>
            <p>We may share your information only where required by applicable Indian law.</p>
          </section>

          <section className={styles.legalSection}>
            <h2>5. Data Retention</h2>
            <p>
              We retain enquiry data for a reasonable period (typically up to 12 months) after which it will be reviewed and deleted if no further communication has occurred.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw your consent at any time by contacting us</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>7. Website Cookies and Analytics</h2>
            <p>
              This website may use basic analytics (such as Google Analytics) to understand visitor behaviour. Analytics tools may use cookies and collect anonymised data such as page views and geographic region. No personally identifiable information is sent to analytics services.
            </p>
            <p>You can disable cookies in your browser settings at any time.</p>
          </section>

          <section className={styles.legalSection}>
            <h2>8. Security</h2>
            <p>
              We take reasonable measures to protect your personal data from unauthorised access, including the use of secure HTTPS connections and access-controlled data storage.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The current version will always be published on this page with the date of the last update.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className={styles.contactBlock}>
              <p><strong>{SITE_CONFIG.name}</strong></p>
              <p>{SITE_CONFIG.address.full}</p>
              <p>
                Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </p>
              <p>Phone: {SITE_CONFIG.phone}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
