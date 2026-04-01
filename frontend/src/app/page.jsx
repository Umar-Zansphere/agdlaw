"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  MessageCircle,
  MapPin,
  Mail,
  PhoneCall,
  Send,
  X,
} from "lucide-react";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const GavelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M10.293 3.293 6 7.586 4.707 6.293 3.293 7.707l1.293 1.293L2 11.586l4.414 4.414L9 13.414l1.293 1.293 1.414-1.414L10.414 12 14 8.414l-1.293-1.293 1.293-1.293-1.414-1.414L11.293 5.7 9.879 4.293ZM15 9l-2 2 5 5 2-2-5-5Z" />
  </svg>
);

const ArrowDiagonalIcon = () => (
  <svg
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.9973 2.07298C24.0376 1.52216 23.6238 1.04297 23.073 1.00267L14.097 0.345886C13.5462 0.305583 13.067 0.719432 13.0267 1.27024C12.9864 1.82106 13.4002 2.30025 13.951 2.34055L21.9297 2.92436L21.3459 10.903C21.3056 11.4538 21.7194 11.933 22.2702 11.9733C22.8211 12.0136 23.3003 11.5998 23.3406 11.049L23.9973 2.07298ZM1 21L1.65362 21.7568L23.6536 2.75682L23 2L22.3464 1.24318L0.34638 20.2432L1 21Z"
      fill="currentColor"
    />
  </svg>
);

const FacebookBrandIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const XBrandIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.9L5.9 22H2.8l7.3-8.3L1 2h6.3l4.4 6.3L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
  </svg>
);

const AccordionPlusIcon = ({ expanded }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7 transition-transform duration-300"
    style={{ transform: expanded ? "rotate(135deg)" : "rotate(0deg)" }}
  >
    <g clipPath="url(#clip0_1621_287)">
      <path
        d="M16.0293 16.0001L16.0293 4.97925L18.0293 4.97925L18.0293 16L29.0501 16.0001L29.0501 18.0001L18.0293 18.0001L18.0293 29.0209L16.0293 29.0209L16.0293 18.0001L5.00845 18.0001L5.00852 16L16.0293 16.0001Z"
        fill="#C5DFC0"
      />
    </g>
    <defs>
      <clipPath id="clip0_1621_287">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(17.0293 0.029541) rotate(45)"
        />
      </clipPath>
    </defs>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    title: "Criminal law practice",
    description:
      "Bail (anticipatory and regular), criminal trials, FIR quashing, cheque dishonour matters, white-collar crime defense, and cybercrime and financial fraud litigation.",
    img: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=700&h=394&fit=crop",
    alt: "Criminal law practice",
  },
  {
    title: "Civil litigation",
    description:
      "Property disputes, partition and inheritance matters, injunction and declaration suits, contractual and recovery disputes, execution proceedings, and civil appeals.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=410&fit=crop",
    alt: "Civil litigation",
  },
  {
    title: "Writs & constitutional remedies",
    description:
      "Writ petitions, PIL matters, and challenges to governmental or statutory actions before constitutional courts.",
    img: "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=600&h=400&fit=crop",
    alt: "Writs and constitutional remedies",
  },
  {
    title: "Consumer protection",
    description:
      "Consumer complaints, deficiency in service claims, product liability disputes, and compensation-focused consumer litigation.",
    img: "https://images.unsplash.com/photo-1609220136736-443140cfeaa8?w=600&h=399&fit=crop",
    alt: "Consumer protection",
  },
  {
    title: "Property & real estate law",
    description:
      "Title verification, due diligence, sale and lease drafting, registration support, encumbrance verification, and real estate dispute resolution.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=410&fit=crop",
    alt: "Property and real estate law",
  },
  {
    title: "Family & matrimonial law",
    description:
      "Divorce matters (mutual and contested), child custody, guardianship, maintenance, alimony, and domestic violence proceedings.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=410&fit=crop",
    alt: "Family and matrimonial law",
  },
  {
    title: "Arbitration & ADR",
    description:
      "Arbitration, mediation, conciliation, commercial dispute settlement, and enforcement of arbitral awards.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=410&fit=crop",
    alt: "Arbitration and alternative dispute resolution",
  },
  {
    title: "Corporate & commercial advisory",
    description:
      "Contract drafting and vetting, compliance advisory, business dispute strategy, partnership and shareholder agreements, and legal due diligence.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=410&fit=crop",
    alt: "Corporate and commercial advisory",
  },
  {
    title: "Motor accident & rent control",
    description:
      "MCOP and RCOP matters, accident compensation claims, insurance disputes, eviction proceedings, fair rent fixation, and rent control litigation.",
    img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&h=410&fit=crop",
    alt: "Motor accident and rent control matters",
  },
];

const testimonials = [
  {
    name: "AGD Bala Kumar",
    role: "Advocate | Managing Counsel",
    feedback:
      "AGD Bala Kumar has over 12 years of experience in litigation and legal advisory, with focused practice across criminal law, civil disputes, constitutional remedies, consumer matters, property law, family law, arbitration, corporate advisory, MCOP, and RCOP matters.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=450&h=300&fit=crop",
  },
  {
    name: "AGD Law Associates",
    role: "Our Vision",
    feedback:
      "To become a trusted and leading boutique law firm recognized for excellence, integrity, and client satisfaction through precision-driven advocacy, transparent communication, and timely legal solutions.",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=450&h=300&fit=crop",
  },
];

const faqs = [
  {
    q: "What forums do you represent clients before?",
    a: "We regularly appear before the Madras High Court, District Courts, Metropolitan Courts, Tribunals, and Consumer Disputes Redressal Commissions.",
  },
  {
    q: "Why choose AGD Law Associates?",
    a: "We are a boutique firm with personalized attention, strong litigation and advisory expertise, ethical and transparent practice, efficient case management, and active Pan-Tamil Nadu plus inter-state presence.",
  },
  {
    q: "What is your legal approach?",
    a: "Our structured process includes detailed case analysis, clear legal opinion and roadmap, transparent communication, strong courtroom advocacy, and focus on timely resolution.",
  },
  {
    q: "What are your office hours?",
    a: "Monday to Friday: 10:00 AM to 6:30 PM. Saturday: 11:00 AM to 5:00 PM. Second and last Saturdays are holidays.",
  },
  {
    q: "Where do you have active practice presence?",
    a: "Our active litigation presence includes Chennai, Tambaram, Avadi, Coimbatore, Tiruppur, and Bangalore, along with districts such as Chengalpattu, Tiruvallur, Kancheepuram, and Dindigul.",
  },
];

// ─── Reusable Button ──────────────────────────────────────────────────────────

function BtnPrimary({ children, icon, href = "#", className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 w-fit px-7 py-2.5 pl-8 text-base font-medium rounded-full no-underline transition-all duration-300 cursor-pointer select-none bg-[#c5dfc0] text-[#0b0b0b] hover:bg-[#0b0b0b] hover:text-white ${className}`}
    >
      <span>{children}</span>
      {icon && (
        <span className="text-[#0b0b0b] bg-white p-2 rounded-full inline-flex items-center justify-center leading-none">
          {icon}
        </span>
      )}
    </a>
  );
}

function BtnSecondary({ children, icon, href = "#", className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 w-fit px-7 py-2.5 pl-8 text-base font-medium rounded-full no-underline transition-all duration-300 cursor-pointer select-none bg-white text-[#0b0b0b] border border-[#c5dfc0] hover:bg-[#c5dfc0] ${className}`}
    >
      <span>{children}</span>
      {icon && (
        <span className="text-[#c5dfc0] bg-[#0b0b0b] p-2 rounded-full inline-flex items-center justify-center leading-none">
          {icon}
        </span>
      )}
    </a>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#service", label: "Practice Areas" },
    { href: "#testimonial", label: "Founder" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @keyframes headerSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes navLinkIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .header-root {
          animation: headerSlideDown 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        .nav-link {
          position: relative;
          letter-spacing: 0.08em;
          font-size: 0.78rem;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(255,255,255,0.84);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c5dfc0;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link:hover { color: #c5dfc0; }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #c5dfc0; }
 
        .scrolled-header {
          background: rgba(11,11,11,0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
          border-bottom: 1px solid rgba(197,223,192,0.12);
        }
 
        .mobile-menu-panel {
          animation: mobileMenuIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
        .mobile-nav-link {
          animation: navLinkIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 400;
          color: #ffffff;
          text-decoration: none;
          padding: 18px 0;
          border-bottom: 1px solid rgba(197,223,192,0.15);
          transition: color 0.2s ease, padding-left 0.2s ease;
          letter-spacing: -0.01em;
        }
        .mobile-nav-link:hover { color: #c5dfc0; padding-left: 8px; }
        .mobile-nav-link .link-num {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: #c5dfc0;
          font-family: 'Inter', sans-serif;
          opacity: 0.8;
        }
 
        .cta-btn-header {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          text-decoration: none;
          color: #0b0b0b;
          background: #c5dfc0;
          padding: 9px 22px;
          border-radius: 50px;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          box-shadow: 0 2px 12px rgba(197,223,192,0.25);
          white-space: nowrap;
        }
        .cta-btn-header:hover {
          background: #0b0b0b;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(197,223,192,0.35);
        }
        .cta-btn-header:active { transform: translateY(0); }
 
        .hamburger-line {
          display: block;
          width: 100%;
          height: 1.5px;
          background: #ffffff;
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.2s ease,
                      top 0.35s cubic-bezier(0.22,1,0.36,1),
                      bottom 0.35s cubic-bezier(0.22,1,0.36,1);
          position: absolute;
          left: 0;
        }
 
        .logo-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: clamp(0.5rem, 1.5vw, 0.6rem);
          letter-spacing: clamp(0.05em, 1.5vw, 0.18em);
          text-transform: uppercase;
          color: #c5dfc0;
          opacity: 0.7;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          padding-top: 2px;
          min-width: 0;
        }
        .logo-badge-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #c5dfc0;
          opacity: 0.7;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .logo-badge { gap: 6px; }
          .logo-badge-dot { width: 4px; height: 4px; }
        }
      `}</style>

      <header
        className={`header-root fixed top-0 left-0 right-0 z-[900] transition-all duration-500`}
        style={{ marginBottom: 0 }}
      >
        {/* Top bar */}
        <div
          className={`transition-all duration-500 ${scrolled ? "scrolled-header" : ""}`}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <nav
              className="flex items-center justify-between h-[76px] gap-3 sm:gap-5 lg:gap-8 min-w-0"
              aria-label="Main navigation"
            >
              {/* Logo */}
              <Link
                href="/"
                aria-label="AGD Law Associates — Home"
                className="flex flex-col no-underline flex-shrink-1 min-w-0 group"
              >
                <span
                  className="text-white leading-none transition-opacity duration-200 group-hover:opacity-80 truncate"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.1rem, 4.5vw, 1.55rem)",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  AGD LAW ASSOCIATES
                </span>
                <span className="logo-badge truncate">
                  <span className="logo-badge-dot hidden sm:block" />
                  <span className="truncate">Boutique Law Firm | Est. 2016</span>
                  <span className="logo-badge-dot hidden sm:block" />
                </span>
              </Link>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Desktop nav */}
              <ul
                className="hidden lg:flex items-center gap-7"
                id="main-navigation"
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav-link ${activeLink === link.href ? "active" : ""}`}
                      onClick={() => setActiveLink(link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div
                className="hidden lg:block w-px h-5 opacity-20"
                style={{ background: "#c5dfc0" }}
              />

              {/* Desktop CTA */}
              <a href="#contact" className="cta-btn-header hidden lg:inline-flex items-center gap-2">
                Schedule Consultation
                <ArrowRight size={13} strokeWidth={2.5} />
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="relative w-7 h-5 lg:hidden flex-shrink-0 focus-visible:outline-none"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span
                  className="hamburger-line"
                  style={{
                    top: menuOpen ? "calc(50% - 0.75px)" : "0",
                    transform: menuOpen ? "rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="hamburger-line"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="hamburger-line"
                  style={{
                    bottom: menuOpen ? "calc(50% - 0.75px)" : "0",
                    transform: menuOpen ? "rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer so content isn't hidden under fixed header */}
      <div className="h-[76px]" style={{ marginBottom: "-76px" }} />

      {/* Mobile menu — full-screen slide-in panel */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="mobile-menu-panel fixed inset-0 z-[800] lg:hidden flex flex-col"
          style={{ background: "#0b0b0b" }}
        >
          {/* Header row inside panel */}
          <div className="flex items-center justify-between px-6 h-[76px] flex-shrink-0 border-b border-white/10 gap-3">

            {/* <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:border-[#c5dfc0] hover:text-[#c5dfc0] transition-colors"
            >
              <X size={18} />
            </button> */}
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-6 pt-6 overflow-y-auto">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    style={{ animationDelay: `${0.06 + i * 0.07}s` }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="link-num">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div
              className="mt-10"
              style={{ animation: "navLinkIn 0.4s 0.38s both" }}
            >
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-[#0b0b0b] font-semibold text-sm tracking-widest uppercase no-underline transition-all"
                style={{ background: "#c5dfc0", letterSpacing: "0.1em" }}
              >
                Schedule Consultation
                <ArrowRight size={15} />
              </a>
            </div>
          </nav>

          {/* Footer inside menu */}
          <div className="px-6 py-6 border-t border-white/10 flex-shrink-0">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(197,223,192,0.5)", letterSpacing: "0.15em" }}
            >
              © {new Date().getFullYear()} AGD Law Associates
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-[calc(5rem+70px)] -mb-[50px]"
    >
      {/* bg-1: dark overlay left */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 w-full h-[60%] rounded-b-[50px] overflow-hidden -z-[1] lg:right-auto lg:bottom-0 lg:w-[58%] lg:h-full lg:rounded-none lg:rounded-r-[50px]"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=1400&h=900&fit=crop') no-repeat center center / cover",
        }}
      >
        <div className="w-full h-full" style={{ backgroundColor: "#0b0b0bda" }} />
      </div>
      {/* bg-2: light right */}
      <div
        className="pointer-events-none absolute w-full h-[50%] left-0 top-[50%] -z-[2] lg:left-auto lg:right-0 lg:top-0 lg:w-[52%] lg:h-full"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop') no-repeat 50% 50% / cover",
        }}
      >
        <div
          className="w-full h-full"
          style={{ backgroundColor: "#c5dfc070" }}
        />
      </div>

      {/* Container */}
      <div className="flex flex-col lg:flex-row max-w-[1200px] px-6 w-full mx-auto gap-5 lg:-translate-y-[50px] lg:overflow-hidden">
        {/* Content */}
        <div className="flex flex-col text-[#ffffff] pb-5 gap-5 lg:max-w-[60%] lg:justify-center">
          <p className="flex items-center w-fit text-[14px] font-medium tracking-[0.5px] bg-white/20 backdrop-blur-md px-5 py-1 rounded-full border border-white/20 gap-2">
            <span className="inline-flex items-center text-xl leading-none text-[#c5dfc0]">
              <GavelIcon />
            </span>
            <span>Boutique Law Firm | Chennai</span>
          </p>

          <h1
            className="text-[clamp(2.5rem,1.3rem+4.267vw,4.5rem)] text-white font-normal capitalize leading-[120%]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            AGD Law Associates
            <br />
            Precision. Strategy. Results.
          </h1>

          <p className="text-[clamp(1.125rem,1.05rem+.267vw,1.25rem)] lg:max-w-[550px]">
            Established in 2016, AGD Law Associates delivers high-quality
            litigation and advisory services across criminal, civil, consumer,
            constitutional, and commercial matters.
          </p>

          <div className="flex flex-wrap gap-4">
            <BtnPrimary href="#contact" icon={<ArrowRight size={16} />}>
              Request consultation
            </BtnPrimary>
            <BtnSecondary href="tel:+919994388855" icon={<Phone size={16} />}>
              Call now
            </BtnSecondary>
          </div>
        </div>

        {/* Media */}
        <div className="text-center lg:max-w-[50%] overflow-hidden">
          <img
            src="/image.webp"
            alt="AGD Law Associates legal team"
            width={670}
            height={828}
            loading="lazy"
            className="max-w-full h-auto relative lg:max-w-[145%]"
          />
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function CountUpNumber({ target, duration = 1800, delay = 0 }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const numeric = parseInt(target.replace(/\D/g, ""), 10);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * numeric));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  const suffix = target.replace(/\d/g, "");
  return <>{val.toLocaleString()}{suffix}</>;
}

function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "2016", label: "Established", delay: 0 },
    { number: "10+", label: "Associate advocates", delay: 120 },
    { number: "12+", label: "Years of founder practice", delay: 240 },
  ];

  const credentials = [
    "Integrity & Professionalism",
    "Confidentiality & Trust",
    "Client-Focused Service",
    "Excellence in Advocacy",
    "Timely Legal Solutions",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white z-[10] rounded-t-[40px] lg:rounded-t-[60px] shadow-[0_-15px_40px_rgba(0,0,0,0.06)]"
      style={{ paddingTop: "clamp(5rem,4rem+4vw,8rem)" }}
    >

      <style>{`
        /* ── About fade-up ── */
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ab { opacity: 0; }
        .ab.vis { animation: aboutFadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        .ab.vis.d0 { animation-delay: 0.05s; }
        .ab.vis.d1 { animation-delay: 0.15s; }
        .ab.vis.d2 { animation-delay: 0.28s; }
        .ab.vis.d3 { animation-delay: 0.40s; }
        .ab.vis.d4 { animation-delay: 0.52s; }
        .ab.vis.d5 { animation-delay: 0.62s; }

        /* ── Photo reveal ── */
        @keyframes aboutImgReveal {
          from { opacity: 0; transform: scale(0.96) translateX(-14px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        .about-photo { opacity: 0; }
        .about-photo.vis { animation: aboutImgReveal 1s cubic-bezier(0.22,1,0.36,1) 0.05s both; }

        /* ── Stat card ── */
        @keyframes statCardIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-card { opacity: 0; }
        .stat-card.vis { animation: statCardIn 0.65s cubic-bezier(0.22,1,0.36,1) both; }

        .stat-card-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 20px 24px 20px 20px;
          border-radius: 20px;
          background: #fff;
          border: 1.5px solid #c5dfc0;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
          cursor: default;
        }
        .stat-card-inner::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #c5dfc0 0%, #c5dfc0 100%);
          border-radius: 4px 0 0 4px;
          transition: width 0.3s ease;
        }
        .stat-card-inner:hover {
          border-color: #c5dfc0;
          box-shadow: 0 8px 32px rgba(197,223,192,0.22);
          transform: translateY(-3px);
        }
        .stat-card-inner:hover::before { width: 6px; }

        /* ── Credential pill ── */
        .cred-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 50px;
          border: 1.5px solid #c5dfc0;
          background: rgba(197,223,192,0.08);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #0b0b0b;
          white-space: nowrap;
        }
        .cred-pill::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #c5dfc0;
          flex-shrink: 0;
        }

        /* ── Signature line ── */
        .about-sig {
          font-family: 'Georgia', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-style: italic;
          font-weight: 400;
          color: #0b0b0b;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        /* ── Trust bar ── */
        .about-trust-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 14px;
          background: rgba(197,223,192,0.12);
          border: 1px solid rgba(197,223,192,0.28);
          width: fit-content;
        }

        /* ── Photo badge ── */
        .photo-badge {
          position: absolute;
          bottom: 28px;
          right: -16px;
          background: #0b0b0b;
          border-radius: 16px;
          padding: 14px 18px;
          box-shadow: 0 12px 40px rgba(11,11,11,0.28);
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 136px;
          z-index: 2;
        }

        @keyframes badgeIn {
          from { opacity: 0; transform: scale(0.88) translateX(10px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        .photo-badge.vis {
          animation: badgeIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.45s both;
        }
        .photo-badge-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 500;
          color: #c5dfc0;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .photo-badge-lbl {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(197,223,192,0.65);
          font-weight: 500;
        }

        @media (max-width: 1023px) {
          .photo-badge { right: 16px; bottom: 20px; }
        }
      `}</style>

      <div
        className="relative max-w-[1200px] px-6 w-full mx-auto"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col lg:flex-row gap-[clamp(2rem,2rem+2vw,4rem)] items-start">

          {/* ── LEFT: Photo column ── */}
          <div
            className={`about-photo ${visible ? "vis" : ""} order-2 lg:order-1 relative flex-shrink-0 w-full lg:w-[42%]`}
          >
            <div
              className="relative rounded-[clamp(1.5rem,1rem+2vw,2.5rem)] overflow-visible"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Decorative green bg shape behind image */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "clamp(1.5rem,1rem+2vw,2.5rem)",
                  background: "linear-gradient(145deg,#c5dfc022 0%,#c5dfc014 100%)",
                  transform: "translate(10px, 10px)",
                  zIndex: 0,
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=1000&fit=crop&crop=faces"
                alt="AGD Law Associates counsel"
                loading="lazy"
                className="relative w-full h-full object-cover"
                style={{
                  borderRadius: "clamp(1.5rem,1rem+2vw,2.5rem)",
                  zIndex: 1,
                  boxShadow: "0 24px 80px rgba(11,11,11,0.16)",
                }}
              />
              {/* Floating achievement badge */}
              <div className={`photo-badge ${visible ? "vis" : ""}`}>
                <span className="photo-badge-num">
                  {visible ? <CountUpNumber target="2016" duration={1600} delay={500} /> : "0"}
                </span>
                <span className="photo-badge-lbl">Founded<br />in</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Content column ── */}
          <div className="order-1 lg:order-2 flex flex-col gap-6 flex-1 min-w-0 lg:pt-6">

            {/* Trust bar */}
            <div className={`ab d0 about-trust-bar ${visible ? "vis" : ""}`}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#c5dfc0", display: "inline-block", flexShrink: 0,
              }} />
              <span style={{
                fontSize: "0.72rem", letterSpacing: "0.12em",
                textTransform: "uppercase", fontWeight: 600, color: "#0b0b0b",
              }}>
                Chennai-Based Boutique Law Firm
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-[clamp(2rem,1.4rem+2.133vw,3rem)] font-normal capitalize leading-[120%] text-[#0b0b0b]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Litigation excellence with{" "}
              <span className="text-[#c5dfc0]">precision and integrity</span>
            </h2>

            {/* Body copy */}
            <p
              className={`ab ${visible ? "vis d2" : ""}`}
              style={{
                fontSize: "clamp(1rem,0.95rem+0.2vw,1.15rem)",
                lineHeight: 1.8,
                color: "#0b0b0b",
                margin: 0,
              }}
            >
              AGD Law Associates was founded to provide efficient, client-centric,
              and result-driven legal solutions. We represent clients before the
              Madras High Court, District Courts, Metropolitan Courts, Tribunals,
              and Consumer Disputes Redressal Commissions with direct involvement
              and careful scrutiny in every matter.
            </p>

            {/* Signature */}
            <div className={`ab ${visible ? "vis d3" : ""} flex items-center gap-4`}>
              <span className="about-sig">AGD Bala Kumar</span>
              <span style={{
                width: 1, height: 36, background: "#c5dfc0", flexShrink: 0,
              }} />
              <span style={{
                fontSize: "0.75rem", color: "#0b0b0b",
                lineHeight: 1.5, letterSpacing: "0.04em",
              }}>
                Advocate &middot; Managing Counsel<br />AGD Law Associates
              </span>
            </div>

            {/* Stat cards */}
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`stat-card ${visible ? "vis" : ""}`}
                  style={{ animationDelay: `${0.42 + s.delay / 1000}s` }}
                >
                  <div className="stat-card-inner">
                    <span style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                      fontWeight: 400,
                      color: "#0b0b0b",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}>
                      {visible
                        ? <CountUpNumber target={s.number} duration={1800} delay={500 + s.delay} />
                        : "0"
                      }
                    </span>
                    <span style={{
                      fontSize: "0.72rem",
                      color: "#0b0b0b",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}>
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Credential pills */}
            <div className={`ab ${visible ? "vis d5" : ""} flex flex-wrap gap-2`}>
              {credentials.map((c) => (
                <span key={c} className="cred-pill">{c}</span>
              ))}
            </div>

            {/* CTA */}
            <div className={`ab ${visible ? "vis d5" : ""}`}>
              <BtnPrimary icon={<ArrowRight size={16} />} href="#contact">
                Consult with our team
              </BtnPrimary>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: "clamp(3rem,2rem+4vw,5.5rem)" }} />
    </section>
  );
}

// ─── Service ──────────────────────────────────────────────────────────────────

function Service() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="service"
      className="bg-white pt-[clamp(2rem,1.125rem+3.5vw,3.75rem)] pb-[calc(clamp(3rem,2rem+4vw,5rem)+50px)] -mb-[50px] relative z-10"
    >
      <div className="flex flex-col max-w-[1200px] px-6 w-full mx-auto gap-[clamp(1.5rem,1rem+2vw,2.5rem)] relative">
        <h2
          className="text-[clamp(2rem,1.4rem+2.133vw,3rem)] font-normal capitalize leading-[120%] text-[#0b0b0b] sm:text-center"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Key <span className="text-[#c5dfc0]">Practice Areas</span>
        </h2>

        <div className="flex flex-col relative w-full border-t border-[#c5dfc0]">
          {services.map((s, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <article
                key={s.title}
                className="relative flex justify-between items-start py-8 lg:py-[30px] border-b border-[#c5dfc0] group cursor-pointer transition-colors duration-300"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
              >
                {/* Left side */}
                <div className="flex flex-col w-full md:w-[60%] lg:w-[50%]">
                  <h3
                    className="capitalize text-[clamp(1.5rem,1.35rem+.533vw,1.75rem)] font-normal text-[#0b0b0b] transition-all duration-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {s.title}
                  </h3>

                  {/* Expandable Description */}
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isHovered ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[#0b0b0b] text-[clamp(0.95rem,0.5vw+0.8rem,1.1rem)] leading-[1.6]">
                        {s.description}
                      </p>
                      <a
                        href="#contact"
                        className="inline-block mt-5 text-sm font-semibold tracking-wide uppercase border-b border-[#0b0b0b] pb-1 text-[#0b0b0b] hover:text-[#c5dfc0] hover:border-[#c5dfc0] transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Discuss this matter
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right side: Arrow Diagonal Icon */}
                <span
                  className={`flex w-fit p-3 rounded-full transition-all duration-200 mt-0 lg:mt-2 ${isHovered ? "bg-[#c5dfc0] scale-110 text-[#0b0b0b]" : "text-[#0b0b0b]"
                    }`}
                >
                  <ArrowDiagonalIcon />
                </span>
              </article>
            );
          })}

          {/* Floating Image (Desktop only) */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[450px] pointer-events-none z-10">
            <div
              className="sticky top-[15vh] w-full aspect-[4/4.5] mt-[10vh]"
              style={{ perspective: "1000px" }}
            >
              {services.map((s, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <img
                    key={s.title}
                    src={s.img}
                    alt={s.alt}
                    className="absolute inset-0 w-[85%] h-full object-cover rounded-[30px] transition-all duration-[800ms] ml-auto"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered
                        ? "rotate(4deg) scale(1) translateX(0) translateZ(0)"
                        : "rotate(-2deg) scale(0.9) translateX(30px) translateZ(-50px)",
                      boxShadow: isHovered ? "0 40px 80px rgba(0,0,0,0.15)" : "none",
                      transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)"
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Me ───────────────────────────────────────────────────────────────────

function WhyMe() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section
      id="why-me"
      className="relative pt-[clamp(3rem,2rem+4vw,5rem)] pb-[calc(clamp(3rem,2rem+4vw,5rem)+50px)] rounded-[40px_40px_0_0] overflow-hidden -mb-[50px]"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&h=900&fit=crop') no-repeat center center / cover",
      }}
    >
      {/* Overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0000001a, #0b0b0b)" }}
      />

      <div className="relative flex flex-col max-w-[1200px] px-6 w-full mx-auto min-h-[55vh] justify-around items-center gap-5 z-[2]">
        <h2
          className="text-white text-center text-[clamp(2rem,1.4rem+2.133vw,3rem)] font-normal"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Our Presence Across Regions
        </h2>


        {/* List */}
        <ul className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap justify-center w-full">
          {[
            "Chennai, Tambaram, Avadi",
            "Coimbatore, Tiruppur, Bangalore",
            "Chengalpattu, Tiruvallur, Kancheepuram, Dindigul",
          ].map((item, i) => (
            <li
              key={item}
              className={`relative text-center text-[#ffffff] font-serif text-[clamp(1.5rem,1.35rem+.533vw,1.75rem)] p-5 sm:w-1/2 md:w-auto md:flex-1 ${i < 2
                ? "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-1/2 after:h-px after:bg-[#c5dfc0] after:-translate-x-1/2 sm:after:w-px sm:after:h-[calc(100%-20px)] sm:after:left-auto sm:after:right-0 sm:after:top-0 sm:after:bottom-auto sm:after:translate-x-0"
                : ""
                }`}
              style={{ fontFamily: "Georgia, serif" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

function Testimonial() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index) => setCurrent((index + total) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const t = testimonials[current];
  const nextIndex = (current + 1) % total;
  const progress = ((current + 1) / total) * 100;

  return (
    <section
      id="testimonial"
      className="relative bg-white pt-[clamp(3.5rem,2.2rem+4.2vw,6rem)] pb-[clamp(2.5rem,1.5rem+4vw,5rem)] rounded-[40px_40px_0_0] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes testimonialCardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .testimonial-card-enter {
          animation: testimonialCardIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-20 w-[340px] h-[340px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(197,223,192,0.34) 0%, rgba(197,223,192,0) 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 w-[300px] h-[300px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(197,223,192,0.28) 0%, rgba(197,223,192,0) 70%)" }}
      />

      <div className="relative grid lg:grid-cols-[minmax(290px,420px)_1fr] max-w-[1200px] px-6 w-full mx-auto gap-[clamp(2rem,1.25rem+2.5vw,4rem)] items-start">
        {/* Intro panel */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-[92px]">
          <span className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-[#c5dfc0] bg-[#ffffff] text-[#0b0b0b] uppercase tracking-[0.16em] text-[0.66rem] font-semibold">
            Founder & managing counsel
          </span>
          <h2
            className="text-[clamp(2rem,1.3rem+2.4vw,3.1rem)] font-normal leading-[118%] text-[#0b0b0b]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Leadership with
            <span className="text-[#c5dfc0]"> courtroom precision</span>
          </h2>
          <p className="text-[#0b0b0b] leading-[1.75]">
            AGD Bala Kumar leads the firm with over 12 years of practice,
            combining litigation strength with strategic advisory for complex,
            sensitive, and high-impact legal matters.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="group inline-flex items-center justify-center w-11 h-11 border border-[#c5dfc0] text-[#0b0b0b] rounded-full hover:bg-[#c5dfc0] hover:border-[#c5dfc0] hover:text-[#0b0b0b] transition-all"
              aria-label="Previous"
            >
              <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center justify-center w-11 h-11 border border-[#c5dfc0] text-[#0b0b0b] rounded-full hover:bg-[#c5dfc0] hover:border-[#c5dfc0] hover:text-[#0b0b0b] transition-all"
              aria-label="Next"
            >
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#0b0b0b] text-[#ffffff] text-[0.72rem] tracking-[0.14em] uppercase font-medium">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#ffffff] overflow-hidden">
            <span
              className="block h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #c5dfc0 0%, #c5dfc0 100%)",
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial from ${item.name}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-10 bg-[#0b0b0b]" : "w-2.5 bg-[#c5dfc0] hover:bg-[#c5dfc0]"}`}
              />
            ))}
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {testimonials.map((item, i) => (
              <button
                key={`${item.name}-mini`}
                type="button"
                onClick={() => goTo(i)}
                className={`text-left flex items-center gap-3 rounded-2xl p-3 transition-all border ${i === current
                  ? "bg-[#0b0b0b] text-white border-[#0b0b0b]"
                  : "bg-white border-[#c5dfc0] hover:border-[#c5dfc0]"
                  }`}
                aria-label={`Open review by ${item.name}`}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium truncate">{item.name}</span>
                  <span className={`block text-[0.7rem] uppercase tracking-[0.08em] truncate ${i === current ? "text-[#c5dfc0]" : "text-[#0b0b0b]"}`}>
                    {item.role}
                  </span>
                </span>
              </button>
            ))}
          </div> */}
        </div>

        {/* Active review card */}
        <div className="relative">
          <article
            key={`${t.name}-${current}`}
            className="testimonial-card-enter relative bg-[linear-gradient(160deg,#ffffff_0%,#ffffff_100%)] border border-[#c5dfc0] rounded-[30px] p-[clamp(1.25rem,1rem+1vw,2rem)] lg:p-[clamp(1.75rem,1.1rem+1.2vw,2.4rem)] shadow-[0_24px_70px_rgba(11,11,11,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <span
                aria-hidden
                className="leading-none text-[clamp(3.25rem,2.3rem+3vw,5rem)] text-[#c5dfc0]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <div className="inline-flex items-center gap-1 rounded-full border border-[#c5dfc0] bg-white px-3 py-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[#c5dfc0] text-base leading-none">★</span>
                ))}
                <span className="ml-1 text-[0.72rem] uppercase tracking-[0.11em] text-[#0b0b0b] font-semibold">
                  Verified
                </span>
              </div>
            </div>

            <blockquote className="mt-4">
              <p className="text-[clamp(1.06rem,0.95rem+0.45vw,1.32rem)] leading-[1.85] text-[#0b0b0b]">
                {t.feedback}
              </p>
            </blockquote>

            <div className="mt-8 pt-6 border-t border-[#c5dfc0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -inset-1 rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #c5dfc0 0%, #c5dfc0 100%)" }}
                  />
                  <img
                    src={t.img}
                    alt={`Image of ${t.name}`}
                    loading="lazy"
                    className="relative w-16 h-16 rounded-2xl object-cover"
                  />
                </div>
                <div>
                  <h4
                    className="font-normal text-[#0b0b0b] text-[1.2rem] leading-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {t.name}
                  </h4>
                  <p className="text-[0.82rem] tracking-[0.1em] uppercase text-[#0b0b0b] mt-1">
                    {t.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => goTo(nextIndex)}
                className="inline-flex items-center justify-center gap-2 w-fit px-5 py-2.5 rounded-full border border-[#c5dfc0] text-[#0b0b0b] hover:bg-[#c5dfc0] hover:text-[#0b0b0b] transition-colors text-sm font-medium"
              >
                View next profile
                <ArrowRight size={15} />
              </button>
            </div>
          </article>

          {/* <div className="mt-4 rounded-2xl border border-[#e0eade] bg-[#f7fbf6] px-4 py-3 flex items-center justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p className="text-[#0b0b0b] font-medium truncate">
                Up next: {testimonials[nextIndex].name}
              </p>
              <p className="text-[#0b0b0b] text-[0.78rem] uppercase tracking-[0.08em] truncate">
                {testimonials[nextIndex].role}
              </p>
            </div>
            <button
              type="button"
              onClick={() => goTo(nextIndex)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#c5dfc0] text-[#4e6f52] hover:bg-[#c5dfc0] hover:text-white transition-colors flex-shrink-0"
              aria-label={`Go to testimonial from ${testimonials[nextIndex].name}`}
            >
              <ArrowRight size={16} />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="bg-white py-[clamp(2rem,1.125rem+3.5vw,3.75rem)]"
    >
      <div className="flex flex-col max-w-[1200px] px-6 w-full mx-auto gap-[clamp(1.5rem,1rem+2vw,2.5rem)]">
        <h2
          className="text-[clamp(2rem,1.4rem+2.133vw,3rem)] font-normal capitalize leading-[120%] text-[#0b0b0b] lg:text-center"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Core values &{" "}
          <span className="text-[#c5dfc0] block">firm clarity</span>
        </h2>

        <div className="flex flex-col gap-[clamp(1.5rem,1rem+2vw,2.5rem)]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`flex flex-col gap-[15px] ${i < faqs.length - 1 ? "border-b border-[#c5dfc0]" : ""
                  }`}
              >
                <button
                  type="button"
                  id={`accordion-button-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${i}`}
                  onClick={() => toggle(i)}
                  className="flex justify-between items-start w-full text-left gap-5 bg-none border-none cursor-pointer"
                >
                  <span
                    className="text-[clamp(1.5rem,1.35rem+.533vw,1.75rem)] text-[#0b0b0b]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {faq.q}
                  </span>
                  <span aria-hidden="true" className="flex-shrink-0">
                    <AccordionPlusIcon expanded={isOpen} />
                  </span>
                </button>
                <div
                  id={`accordion-content-${i}`}
                  role="region"
                  aria-labelledby={`accordion-button-${i}`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0 pb-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#0b0b0b] lg:max-w-[90%]">{faq.a}</p>
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

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const initialForm = {
    your_name: "",
    your_email: "",
    service_type: "",
    budget: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "", message: "" });

  const selectPill = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.service_type || !form.budget) {
      setSubmitState({
        type: "error",
        message: "Please select a service and preferred timeline.",
      });
      return;
    }

    const serviceLabel =
      serviceOptions.find((s) => s.value === form.service_type)?.label ||
      form.service_type;
    const budgetLabel =
      budgetOptions.find((b) => b.value === form.budget)?.label || form.budget;

    try {
      setIsSubmitting(true);
      setSubmitState({ type: "", message: "" });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service_label: serviceLabel,
          budget_label: budgetLabel,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSubmitState({
        type: "success",
        message:
          "Thanks, your message was sent successfully. We will contact you soon.",
      });
      setForm(initialForm);
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error.message ||
          "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: "criminal_law", label: "Criminal law practice" },
    { value: "civil_litigation", label: "Civil litigation" },
    { value: "writ_constitutional", label: "Writs & constitutional remedies" },
    { value: "consumer_protection", label: "Consumer protection" },
    { value: "property_real_estate", label: "Property & real estate law" },
    { value: "family_matrimonial", label: "Family & matrimonial law" },
    { value: "arbitration_adr", label: "Arbitration & ADR" },
    { value: "corporate_advisory", label: "Corporate & commercial advisory" },
    { value: "mcop_rcop", label: "Motor accident & rent control" },
  ];

  const budgetOptions = [
    { value: "immediate", label: "Immediate assistance" },
    { value: "within_week", label: "Within this week" },
    { value: "scheduled", label: "Scheduled consultation" },
  ];

  const chipClass = (active) =>
    `px-[clamp(1.2rem,1rem+1vw,1.5rem)] py-[clamp(0.6rem,0.5rem+0.5vw,0.8rem)] rounded-full text-[clamp(0.9rem,0.8rem+0.5vw,1rem)] font-medium transition-all duration-300 border ${active
      ? "bg-[#c5dfc0] text-[#0b0b0b] border-[#c5dfc0] ring-2 ring-[#c5dfc0]/70 shadow-[0_8px_20px_rgba(197,223,192,0.4)] scale-[1.02]"
      : "bg-[#ffffff] text-[#0b0b0b] border-[#e0e0e0] hover:border-[#c5dfc0] hover:bg-[#f9fdf8] hover:-translate-y-0.5"
    }`;

  return (
    <section
      id="contact"
      className="relative z-0 bg-white pt-[clamp(2.5rem,1.4rem+4vw,5rem)] pb-[clamp(3rem,2rem+4vw,5.5rem)] rounded-[0_0_40px_40px] lg:rounded-[0_0_50px_50px] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[330px] h-[330px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(197,223,192,0.32) 0%, rgba(197,223,192,0) 70%)" }}
      />
      <div className="relative flex flex-col max-w-[1200px] px-6 w-full mx-auto gap-[clamp(2rem,1.5rem+3vw,4rem)] items-center">
        {/* Form Panel */}
        <div className="w-full rounded-[40px] border border-[#c5dfc0] bg-white px-[clamp(1.5rem,1rem+3vw,3.5rem)] py-[clamp(2rem,1.5rem+3vw,4rem)] shadow-[0_24px_60px_rgba(11,11,11,0.08)]">
          <h2
            className="text-[clamp(2.5rem,1.8rem+2.8vw,4.5rem)] font-normal leading-[110%] text-[#0b0b0b] max-w-[680px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Need legal support?
            <br />
            <span className="text-[#c5dfc0]">Let&apos;s connect.</span>
          </h2>

          <form onSubmit={handleSubmit} className="mt-10 lg:mt-12 flex flex-col gap-[clamp(2rem,1.5rem+2vw,3rem)]">
            <div className="space-y-4">
              <p className="text-[1.05rem] text-[#0b0b0b] font-semibold tracking-wide">Select Service Area</p>
              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((service) => (
                  <button
                    key={service.value}
                    type="button"
                    onClick={() => selectPill("service_type", service.value)}
                    className={chipClass(form.service_type === service.value)}
                    aria-pressed={form.service_type === service.value}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[1.05rem] text-[#0b0b0b] font-semibold tracking-wide">Preferred Timeline</p>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget.value}
                    type="button"
                    onClick={() => selectPill("budget", budget.value)}
                    className={chipClass(form.budget === budget.value)}
                    aria-pressed={form.budget === budget.value}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
              <div className="relative group">
                <label htmlFor="your-name" className="block text-[0.95rem] text-[#555] font-medium mb-3 transition-colors group-focus-within:text-[#0b0b0b]">
                  Your Name
                </label>
                <input
                  type="text"
                  name="your_name"
                  id="your-name"
                  placeholder="John Doe"
                  required
                  aria-required="true"
                  value={form.your_name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[#e0e0e0] px-0 pb-3 text-[1.1rem] text-[#0b0b0b] focus:outline-none focus:border-[#c5dfc0] transition-colors placeholder:text-[#a0a0a0]"
                />
              </div>
              <div className="relative group">
                <label htmlFor="your-email" className="block text-[0.95rem] text-[#555] font-medium mb-3 transition-colors group-focus-within:text-[#0b0b0b]">
                  Your Email
                </label>
                <input
                  type="email"
                  name="your_email"
                  id="your-email"
                  placeholder="john@example.com"
                  required
                  aria-required="true"
                  value={form.your_email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[#e0e0e0] px-0 pb-3 text-[1.1rem] text-[#0b0b0b] focus:outline-none focus:border-[#c5dfc0] transition-colors placeholder:text-[#a0a0a0]"
                />
              </div>
            </div>

            <div className="relative group mt-2">
              <label htmlFor="message" className="block text-[0.95rem] text-[#555] font-medium mb-3 transition-colors group-focus-within:text-[#0b0b0b]">
                Details <span className="text-[#888] font-normal">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Share brief details about your case or inquiry..."
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b-2 border-[#e0e0e0] px-0 pb-3 text-[1.1rem] text-[#0b0b0b] placeholder:text-[#a0a0a0] focus:outline-none focus:border-[#c5dfc0] transition-colors resize-none"
              />
            </div>

            <div className="pt-4 lg:pt-6 flex items-center gap-4">
              <button
                type="submit"
                aria-label="Send message"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c5dfc0] text-[#0b0b0b] text-[0.9rem] font-bold tracking-[0.08em] uppercase overflow-hidden hover:bg-[#0b0b0b] hover:text-white transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(197,223,192,0.4)] hover:shadow-[0_12px_25px_rgba(11,11,11,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
            {submitState.message && (
              <p
                className={`text-sm ${submitState.type === "success"
                  ? "text-[#0b0b0b]"
                  : "text-[#0b0b0b]"
                  }`}
              >
                {submitState.message}
              </p>
            )}
          </form>
        </div>

        {/* Contact Info Card */}
        <aside className="w-full rounded-[32px] bg-[#ffffff] border border-[#c5dfc0] p-[clamp(1.5rem,1.5rem+2vw,3rem)] flex flex-col md:flex-row gap-[clamp(2rem,2vw+1.5rem,4rem)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(11,11,11,0.05)]">
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[1.8rem] text-[#0b0b0b] font-medium" style={{ fontFamily: "Georgia, serif" }}>Contacts</h3>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#f9fdf8] border border-[#c5dfc0] text-[#0b0b0b] inline-flex items-center justify-center hover:bg-[#c5dfc0] transition-colors"><FacebookBrandIcon size={15} /></a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-10 h-10 rounded-full bg-[#f9fdf8] border border-[#c5dfc0] text-[#0b0b0b] inline-flex items-center justify-center hover:bg-[#c5dfc0] transition-colors"><XBrandIcon size={15} /></a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin size={22} className="mt-1 text-[#0b0b0b] flex-shrink-0" />
              <p className="text-[1.05rem] leading-relaxed text-[#0b0b0b]">
                No.5c, 5th Floor, Sri Venkatesh Bhavan,<br />
                No.75/31, Armenian Street,<br />Chennai - 600001
              </p>
            </div>

            <div className="flex items-start gap-4">
              <PhoneCall size={22} className="mt-1 text-[#0b0b0b] flex-shrink-0" />
              <div>
                <p className="text-[0.92rem] text-[#555] font-medium mb-1">Call us directly</p>
                <a href="tel:+919994388855" className="text-[1.2rem] sm:text-[1.35rem] font-medium text-[#0b0b0b] hover:text-opacity-80 transition-colors">99943 88855 / 89395 88855</a>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px bg-[#e0eade]" />

          <div className="flex-1 space-y-8 flex flex-col justify-center">
            <div className="flex items-start gap-4">
              <Mail size={22} className="mt-1 text-[#0b0b0b] flex-shrink-0" />
              <div>
                <p className="text-[0.92rem] text-[#555] font-medium mb-1">For general inquiries</p>
                <a href="mailto:agdlawassociatesoffice@gmail.com" className="text-[1.05rem] text-[#0b0b0b] font-medium hover:text-opacity-80 transition-colors break-all">agdlawassociatesoffice@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-5 h-5 mt-1 border-[1.5px] border-[#0b0b0b] rounded-full flex items-center justify-center opacity-80" aria-hidden="true">
                <div className="w-1.5 h-1.5 bg-[#0b0b0b] rounded-full" />
              </div>
              <div>
                <p className="text-[0.92rem] text-[#555] font-medium mb-1">Website</p>
                <a href="https://www.agdlawassociates.in" target="_blank" rel="noopener noreferrer" className="text-[1.05rem] text-[#0b0b0b] font-medium hover:text-opacity-80 transition-colors break-all">www.agdlawassociates.in</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-5 h-5 mt-1 border-[1.5px] border-[#0b0b0b] border-t-transparent rounded-full opacity-80" aria-hidden="true" />
              <div>
                <p className="text-[0.92rem] text-[#555] font-medium mb-1">Office hours</p>
                <p className="text-[1.05rem] leading-relaxed text-[#0b0b0b]">
                  Mon - Fri: 10:00 AM - 6:30 PM<br />
                  Sat: 11:00 AM - 5:00 PM<br />
                  <span className="text-[0.85rem] text-[#555] block mt-1">(2nd & last Saturday holiday)</span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#service", label: "Practice Areas" },
    { href: "#testimonial", label: "Founder" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  const services = [
    "Criminal Law Practice",
    "Civil Litigation",
    "Property & Real Estate",
    "Family & Matrimonial",
    "Arbitration & ADR",
  ];

  return (
    <footer
      id="footer"
      className="relative bg-[#0b0b0b] text-[#ffffff] pt-[clamp(3rem,2rem+4vw,5rem)] pb-[clamp(2rem,1.25rem+3vw,3.5rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(197,223,192,0.16) 0%, rgba(197,223,192,0) 100%)",
        }}
      />

      <div className="relative max-w-[1200px] px-6 w-full mx-auto">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-5">
            <p
              className="text-[clamp(2rem,1.2rem+3vw,3rem)] leading-[1.08]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              AGD Law
              <br />
              <span className="text-[#c5dfc0]">Associates</span>
            </p>
            <p className="text-[#ffffff] max-w-[420px] leading-7">
              Boutique Law Firm | Established in 2016
              <br />
              Chennai | Tamil Nadu
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/20 text-[#c5dfc0] inline-flex items-center justify-center hover:bg-[#c5dfc0] hover:text-[#0b0b0b] transition-colors"
              >
                <FacebookBrandIcon size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-10 h-10 rounded-full border border-white/20 text-[#c5dfc0] inline-flex items-center justify-center hover:bg-[#c5dfc0] hover:text-[#0b0b0b] transition-colors"
              >
                <XBrandIcon size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg text-white font-medium">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#ffffff] hover:text-[#c5dfc0] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg text-white font-medium">Practice Areas</h3>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item} className="text-[#ffffff]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[#ffffff] text-sm">
            © {new Date().getFullYear()} AGD Law Associates. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href="mailto:agdlawassociatesoffice@gmail.com"
              className="inline-flex items-center gap-2 text-[#ffffff] hover:text-[#c5dfc0] transition-colors"
            >
              <Mail size={15} />
              agdlawassociatesoffice@gmail.com
            </a>
            <a
              href="tel:+919994388855"
              className="inline-flex items-center gap-2 text-[#ffffff] hover:text-[#c5dfc0] transition-colors"
            >
              <PhoneCall size={15} />
              +91 99943 88855
            </a>
            <a
              href="https://www.agdlawassociates.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#ffffff] hover:text-[#c5dfc0] transition-colors"
            >
              www.agdlawassociates.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Floating Chat ───────────────────────────────────────────────────

function WhatsAppFloatingChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "919994388855";

  const quickMessages = [
    "Hi, I need a legal consultation with AGD Law Associates.",
    "I want to discuss a criminal law matter.",
    "I need support in a property dispute.",
    "Please schedule a consultation call.",
  ];

  const openWhatsApp = (textToSend) => {
    const finalMessage = (textToSend || message).trim();
    if (!finalMessage) return;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[980] flex flex-col items-end">
      <div
        className={`mb-3 w-[min(92vw,360px)] rounded-[22px] overflow-hidden border border-[#c5dfc0] bg-white shadow-[0_22px_60px_rgba(11,11,11,0.2)] transition-all duration-300 origin-bottom-right ${open
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
      >
        <div className="px-4 py-3 bg-[#0b0b0b] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#c5dfc0] text-[#0b0b0b] inline-flex items-center justify-center">
              <MessageCircle size={16} />
            </span>
            <div>
              <p className="text-sm font-medium leading-tight">AGD Legal Desk</p>
              <p className="text-[0.72rem] text-[#c5dfc0]">Replies during office hours</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close WhatsApp chat"
            className="w-8 h-8 rounded-full border border-white/20 inline-flex items-center justify-center hover:border-[#c5dfc0] hover:text-[#c5dfc0] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-4 bg-[#ffffff] space-y-3">
          <div className="max-w-[90%] bg-white border border-[#c5dfc0] text-[#0b0b0b] rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm leading-6">
            Hi, thanks for contacting AGD Law Associates. Select a message or type your query and continue on WhatsApp.
          </div>

          <div className="flex flex-wrap gap-2">
            {quickMessages.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMessage(item)}
                className="text-left text-[0.8rem] px-3 py-2 rounded-full border border-[#c5dfc0] text-[#0b0b0b] bg-white hover:border-[#c5dfc0] hover:bg-[#c5dfc0] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2 pt-1">
            <label htmlFor="wa-custom-message" className="sr-only">
              Type your WhatsApp message
            </label>
            <textarea
              id="wa-custom-message"
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  openWhatsApp();
                }
              }}
              placeholder="Type your message..."
              className="w-full resize-none rounded-2xl border border-[#c5dfc0] bg-white px-3 py-2.5 text-sm text-[#0b0b0b] placeholder:text-[#0b0b0b] focus:outline-none focus:border-[#c5dfc0]"
            />
            <button
              type="button"
              onClick={() => openWhatsApp()}
              aria-label="Send message to WhatsApp"
              className="h-11 w-11 flex-shrink-0 rounded-full bg-[#c5dfc0] text-[#0b0b0b] inline-flex items-center justify-center hover:bg-[#0b0b0b] hover:text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {!open && (
        <p className="mb-2 mr-1 px-3 py-1.5 rounded-full bg-[#0b0b0b] text-[#c5dfc0] text-[0.7rem] tracking-[0.08em] uppercase">
          Chat with AGD
        </p>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        className={`group w-14 h-14 rounded-full shadow-[0_14px_35px_rgba(11,11,11,0.35)] inline-flex items-center justify-center transition-all duration-300 ${open
          ? "bg-[#0b0b0b] text-[#c5dfc0]"
          : "bg-[#c5dfc0] text-[#0b0b0b] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(197,223,192,0.45)]"
          }`}
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        :root {
          --theme-paper: #ffffff;
          --theme-ink: #0b0b0b;
          --theme-accent: #c5dfc0;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: var(--theme-paper);
          color: var(--theme-ink);
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 400;
        }
        img, picture, video { max-width: 100%; height: auto; }
        a[class] { text-decoration: none; }
        button { cursor: pointer; }
        ul[class], ol[class] { padding: 0; list-style: none; }
        :focus-visible { outline: 2px solid #c5dfc0; outline-offset: 2px; }
      `}</style>

      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Service />
        <WhyMe />
        <Testimonial />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatingChat />
    </>
  );
}
