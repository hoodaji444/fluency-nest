"use client";

import { useState } from "react";
import { Star, MapPin, Quote } from "lucide-react";
import { TESTIMONIALS, Testimonial } from "@/lib/config";
import styles from "./TestimonialsSection.module.css";

interface TestimonialsSectionProps {
  filterCourse?: "English" | "French" | "German";
  title?: string;
  subtitle?: string;
  showFilter?: boolean;
  id?: string;
}

export default function TestimonialsSection({
  filterCourse,
  title = "What Students & Parents Say About Us",
  subtitle = "Genuine feedback from young learners and parents across Sonipat and our live online batches nationwide.",
  showFilter = true,
  id = "testimonials",
}: TestimonialsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    filterCourse || "all"
  );

  const categories = [
    { label: "All Reviews", value: "all" },
    { label: "Spoken English", value: "English" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
  ];

  const displayedTestimonials = TESTIMONIALS.filter((item: Testimonial) => {
    if (filterCourse) {
      return item.course === filterCourse;
    }
    if (activeCategory === "all") return true;
    return item.course === activeCategory;
  });

  return (
    <section className={styles.testimonialsSection} id={id}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <Quote size={14} style={{ display: "inline", marginRight: 4 }} />
            Genuine Reviews &amp; Feedback
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {showFilter && !filterCourse && (
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`${styles.filterBtn} ${
                  activeCategory === cat.value ? styles.filterBtnActive : ""
                }`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.grid}>
          {displayedTestimonials.map((item) => {
            const initials = item.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");

            return (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.badgeRow}>
                    <span className={styles.courseBadge}>{item.courseBadge}</span>
                    <span className={styles.typeBadge}>
                      {item.type === "parent" ? "Parent Review" : "Student Voice"}
                    </span>
                  </div>

                  <div className={styles.rating} aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>

                <div className={styles.cardFooter}>
                  <div className={styles.avatar}>{initials}</div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{item.name}</span>
                    <span className={styles.authorRole}>{item.role}</span>
                    <span className={styles.authorLocation}>
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

