"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  BookOpen,
  Globe,
  MessageSquare,
  Phone,
} from "lucide-react";
import styles from "./Navbar.module.css";
import { SITE_CONFIG } from "@/lib/config";

interface DropdownItem {
  href: string;
  label: string;
  highlight?: boolean;
  icon?: "map-pin" | "german" | "french" | "english";
}

interface NavLinkItem {
  href?: string;
  label: string;
  isSpecial?: boolean;
  dropdown?: DropdownItem[];
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
  { href: "/#why-us", label: "Why Choose Us" },
];

function renderDropdownIcon(icon?: string) {
  switch (icon) {
    case "map-pin":
      return <MapPin size={14} aria-hidden="true" className={styles.itemIcon} />;
    case "german":
      return <BookOpen size={14} aria-hidden="true" className={styles.itemIcon} />;
    case "french":
      return <Globe size={14} aria-hidden="true" className={styles.itemIcon} />;
    case "english":
      return <MessageSquare size={14} aria-hidden="true" className={styles.itemIcon} />;
    default:
      return null;
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileGroups, setExpandedMobileGroups] = useState<Record<string, boolean>>({
    "Courses": true,
  });

  const toggleMobileGroup = (label: string) => {
    setExpandedMobileGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

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

  const cleanPhone = SITE_CONFIG.phone.replace(/\s+/g, "");
  const whatsappTarget = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\+/g, "")}`;

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link
            href="/"
            className={styles.logo}
            onClick={closeMenu}
            aria-label="Fluency Nest Home"
          >
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
                    type="button"
                    className={`${styles.navLink} ${
                      link.isSpecial ? styles.specialNavLink : ""
                    }`}
                    aria-expanded={activeDropdown === link.label}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={activeDropdown === link.label ? styles.chevronOpen : ""}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`${styles.dropdown} ${
                      activeDropdown === link.label ? styles.dropdownOpen : ""
                    }`}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.dropdownItem} ${
                          item.highlight ? styles.highlightDropdownItem : ""
                        }`}
                        onClick={closeMenu}
                      >
                        {renderDropdownIcon(item.icon)}
                        <span>{item.label}</span>
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

          {/* Action Button: Enquire Now + Mobile Toggle */}
          <div className={styles.ctaArea}>
            <button
              type="button"
              className={`btn btn-primary ${styles.enquireBtn}`}
              onClick={handleEnquireClick}
              id="nav-enquire-btn"
            >
              Enquire Now
            </button>
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
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
          {/* Mobile Drawer Header */}
          <div className={styles.mobileMenuHeader}>
            <div className={styles.mobileMenuBrand}>
              <div className={styles.mobileMenuLogoIcon}>
                <Image
                  src="/logo.png"
                  alt="Fluency Nest"
                  width={38}
                  height={24}
                  className={styles.mobileMenuLogoImg}
                />
              </div>
              <div className={styles.mobileMenuBrandText}>
                <span className={styles.mobileMenuBrandName}>{SITE_CONFIG.name}</span>
                <span className={styles.mobileMenuBrandSub}>Language Institute Sonipat</span>
              </div>
            </div>
            <button
              type="button"
              className={styles.mobileMenuCloseBtn}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Quick Action CTAs inside Drawer */}
          <div className={styles.mobileActionsTop}>
            <button
              type="button"
              className={`btn btn-primary ${styles.mobileEnquireBtn}`}
              onClick={handleEnquireClick}
              id="mobile-drawer-enquire-btn"
            >
              Enquire Now
            </button>
            <a
              href={whatsappTarget}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileWhatsAppBtn}
              aria-label="Chat on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
                aria-hidden="true"
                className={styles.whatsappIcon}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          <div className={styles.mobileDivider} />

          {/* Navigation Items */}
          <div className={styles.mobileNavLinksList}>
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label} className={styles.mobileGroup}>
                  <button
                    type="button"
                    className={`${styles.mobileGroupToggle} ${
                      link.isSpecial ? styles.mobileSpecialLabel : ""
                    }`}
                    onClick={() => toggleMobileGroup(link.label)}
                    aria-expanded={expandedMobileGroups[link.label] ?? true}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={16}
                      className={`${styles.mobileChevron} ${
                        (expandedMobileGroups[link.label] ?? true) ? styles.mobileChevronOpen : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`${styles.mobileSubList} ${
                      (expandedMobileGroups[link.label] ?? true) ? styles.mobileSubListOpen : ""
                    }`}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.mobileSub} ${
                          item.highlight ? styles.mobileHighlightSub : ""
                        }`}
                        onClick={closeMenu}
                      >
                        {renderDropdownIcon(item.icon)}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
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
          </div>

          <div className={styles.mobileDivider} />

          <div className={styles.mobileContact}>
            <a
              href={`tel:${cleanPhone}`}
              className={styles.mobilePhoneLink}
              aria-label={`Call Fluency Nest at ${SITE_CONFIG.phone}`}
            >
              <Phone size={15} aria-hidden="true" />
              <span className={styles.mobilePhoneText}>{SITE_CONFIG.phone}</span>
            </a>
            <p className={styles.mobileLocationNote}>
              Sonipat, Haryana (Offline Centre Coming Soon)
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
