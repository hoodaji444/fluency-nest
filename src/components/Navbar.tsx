"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./Navbar.module.css";
import { SITE_CONFIG } from "@/lib/config";

interface NavLinkItem {
  href?: string;
  label: string;
  isSpecial?: boolean;
  dropdown?: Array<{
    href: string;
    label: string;
    highlight?: boolean;
  }>;
}

const NAV_LINKS: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  {
    label: "Courses",
    dropdown: [
      { href: "/#courses-german", label: "German Courses (A1–C2)" },
      { href: "/#courses-french", label: "French Courses (A1–C2)" },
      { href: "/#courses-english", label: "English Courses (Fluency)" },
    ],
  },
  {
    label: "Sonipat Centre (SCO-10)",
    isSpecial: true,
    dropdown: [
      { href: "/#classroom", label: "📍 Campus Tour & Facilities (SCO-10)", highlight: true },
      { href: "/german-classes-sonipat", label: "🇩🇪 German Language Institute (Sonipat)" },
      { href: "/french-classes-sonipat", label: "🇫🇷 French Classes in Sonipat" },
      { href: "/spoken-english-classes-sonipat", label: "🇬🇧 Spoken English in Sonipat" },
    ],
  },
  { href: "/#why-us", label: "Why Choose Us" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 48);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleEnquireClick = () => {
    closeMenu();
    const form = document.getElementById("enquiry");
    form?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu} aria-label="Fluency Nest Home">
            <div className={styles.logoIcon}>
              <Image
                src="/logo.png"
                alt="Fluency Nest Logo"
                width={52}
                height={32}
                priority
                className={styles.logoImg}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>{SITE_CONFIG.name}</span>
              <span className={styles.logoSub}>{SITE_CONFIG.tagline}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className={styles.dropdownWrapper}
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`${styles.navLink} ${link.isSpecial ? styles.specialNavLink : ""}`}
                    aria-expanded={activeDropdown === link.label}
                  >
                    {link.isSpecial && <span className={styles.navLocationDot} aria-hidden="true" />}
                    {link.label}
                    <ChevronDown size={14} className={activeDropdown === link.label ? styles.chevronOpen : ""} />
                  </button>
                  <div className={`${styles.dropdown} ${activeDropdown === link.label ? styles.dropdownOpen : ""}`}>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.dropdownItem} ${item.highlight ? styles.highlightDropdownItem : ""}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href!} className={styles.navLink}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className={styles.ctaArea}>
            <button className={`btn btn-primary ${styles.enquireBtn}`} onClick={handleEnquireClick} id="nav-enquire-btn">
              Enquire Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`${styles.mobileOverlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <nav
        className={`${styles.mobileMenu} ${isOpen ? styles.menuOpen : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileMenuInner}>
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className={styles.mobileGroup}>
                <div className={`${styles.mobileGroupLabel} ${link.isSpecial ? styles.mobileSpecialLabel : ""}`}>
                  {link.isSpecial && <span className={styles.navLocationDot} aria-hidden="true" />}
                  {link.label}
                </div>
                {link.dropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.mobileSub} ${item.highlight ? styles.mobileHighlightSub : ""}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={styles.mobileLink}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            )
          )}

          <div className={styles.mobileDivider} />
          <button
            className={`btn btn-primary btn-lg ${styles.mobileEnquireBtn}`}
            onClick={handleEnquireClick}
            id="mobile-enquire-btn"
          >
            Enquire Now
          </button>
          <div className={styles.mobileContact}>
            <a href={`tel:${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a>
          </div>
        </div>
      </nav>
    </>
  );
}
