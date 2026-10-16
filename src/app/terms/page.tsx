import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import styles from "../privacy-policy/legal.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions — Fluency Nest",
  description: "Terms and Conditions for Fluency Nest German Language Institute.",
};

export default function TermsPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.legalHero}>
        <div className="container">
          <div className="section-label" style={{ color: "rgba(255,255,255,0.65)" }}>
            Legal
          </div>
          <h1 className={`heading-display heading-lg ${styles.legalTitle}`}>
            Terms &amp; Conditions
          </h1>
          <p className={styles.legalMeta}>Last updated: October 2025</p>
        </div>
      </div>

      <div className={`section ${styles.legalContent}`}>
        <div className={`container ${styles.legalContainer}`}>
          <section className={styles.legalSection}>
            <h2>1. About Fluency Nest</h2>
            <p>
              {SITE_CONFIG.name} is a language training institute based at {SITE_CONFIG.address.full}, providing German, French, and English language courses. By using this website, you agree to these Terms and Conditions.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Use of This Website</h2>
            <p>
              This website is intended for individuals interested in learning about our language courses and submitting course enquiries. You agree not to misuse the website, submit false information, or use it for any unlawful purpose.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Course Enquiries</h2>
            <p>
              Submitting an enquiry through our website does not constitute enrolment or a booking. Our team will contact you after receiving your enquiry to discuss course availability, fees, and batch timings. Admission is confirmed only after direct communication with our team and payment of applicable fees.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Accuracy of Information</h2>
            <p>
              We make every effort to ensure that the information on this website is accurate and up to date. However, course details, fees, and batch timings are subject to change. Please confirm current details with our team before making any decisions.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>5. Examination Services</h2>
            <p>
              {SITE_CONFIG.name} is a language teaching institute and is not affiliated with or authorised to conduct official language examinations such as those offered by Goethe-Institut or any other examination body. Our courses are designed to help students build language skills and may support examination preparation, but results and examination registration are the responsibility of the student and the relevant examination authority.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>6. No Immigration or Visa Advice</h2>
            <p>
              {SITE_CONFIG.name} provides language education only. We do not offer visa advice, university application assistance, job placement, or immigration services. Any information about opportunities in Germany provided on this website is for general educational context only.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and design, is the property of {SITE_CONFIG.name} unless otherwise stated. You may not reproduce, copy, or distribute any content without prior written permission.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>8. Limitation of Liability</h2>
            <p>
              {SITE_CONFIG.name} is not liable for any loss or damage arising from reliance on information provided on this website. We do not guarantee specific language learning outcomes or examination results.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>9. Changes to These Terms</h2>
            <p>
              We may update these Terms and Conditions from time to time. Continued use of this website after changes are published constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>10. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts in Sonipat, Haryana.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>11. Contact</h2>
            <div className={styles.contactBlock}>
              <p><strong>{SITE_CONFIG.name}</strong></p>
              <p>{SITE_CONFIG.address.full}</p>
              <p>Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></p>
              <p>Phone: {SITE_CONFIG.phone}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
