"use client";

import { useState, useEffect } from "react";
import { AGDLogoImg } from "@/components/AGDLogoImg";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
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
  Scale,
  Shield,
  Clock,
  Award,
  Users,
  BookOpen,
  Menu,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { title: "Criminal Law", description: "Bail, criminal trials, FIR quashing, cheque dishonour, white-collar crime defense, and cybercrime litigation.", icon: Scale },
  { title: "Civil Litigation", description: "Property disputes, partition matters, injunction suits, contractual disputes, execution proceedings, and civil appeals.", icon: BookOpen },
  { title: "Writs & Constitutional", description: "Writ petitions, PIL matters, and challenges to governmental or statutory actions before constitutional courts.", icon: Shield },
  { title: "Consumer Protection", description: "Consumer complaints, deficiency in service claims, product liability disputes, and consumer litigation.", icon: CheckCircle },
  { title: "Property & Real Estate", description: "Title verification, due diligence, sale and lease drafting, registration support, and dispute resolution.", icon: MapPin },
  { title: "Family & Matrimonial", description: "Divorce matters (mutual and contested), child custody, guardianship, maintenance, and domestic violence proceedings.", icon: Users },
  { title: "Arbitration & ADR", description: "Arbitration, mediation, conciliation, commercial dispute settlement, and enforcement of arbitral awards.", icon: Award },
  { title: "Corporate Advisory", description: "Contract drafting, compliance advisory, business dispute strategy, partnership agreements, and legal due diligence.", icon: BookOpen },
  { title: "MCOP & Rent Control", description: "Motor accident compensation claims, insurance disputes, eviction proceedings, fair rent fixation, and rent control litigation.", icon: Clock },
];

const teamMembers = [
  { name: "AGD Bala Kumar", role: "Managing Counsel", specialization: "Criminal & Civil Litigation", experience: "12+ Years", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=faces" },
  { name: "Priya Sundaram", role: "Senior Associate", specialization: "Family & Matrimonial Law", experience: "8 Years", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=faces" },
  { name: "Karthik Raj", role: "Associate Counsel", specialization: "Corporate & Commercial Advisory", experience: "5 Years", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=faces" },
  { name: "Meena Lakshmi", role: "Associate Advocate", specialization: "Property & Real Estate Law", experience: "4 Years", img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=800&fit=crop&crop=faces" },
];

const caseResults = [
  { category: "Criminal Law", title: "Anticipatory Bail Granted", description: "Secured anticipatory bail in a high-profile financial fraud matter at Madras High Court within 72 hours of filing.", outcome: "Bail Granted", court: "Madras High Court", year: "2024", highlight: true },
  { category: "Property Dispute", title: "Title Dispute Resolved", description: "Successfully defended a multi-acre agricultural property title dispute spanning 3 generations, resulting in clear title decree.", outcome: "Decree in Favour", court: "District Court, Coimbatore", year: "2023", highlight: false },
  { category: "Consumer Protection", title: "₹18 Lakh Compensation", description: "Obtained ₹18 lakh compensation for a client against a leading builder for deficiency in service and delayed possession.", outcome: "₹18L Awarded", court: "State Consumer Commission", year: "2024", highlight: false },
  { category: "Family Law", title: "Child Custody Secured", description: "Represented a mother in a contested custody matter, securing full custody with defined visitation rights.", outcome: "Custody Secured", court: "Family Court, Chennai", year: "2023", highlight: true },
  { category: "Writ Petition", title: "Service Matter Relief", description: "Succeeded in a writ petition challenging arbitrary termination of a government employee, securing reinstatement with back wages.", outcome: "Reinstatement Ordered", court: "Madras High Court", year: "2024", highlight: false },
  { category: "MCOP", title: "Motor Accident Claim", description: "Achieved ₹42 lakh compensation for a family that lost their breadwinner in a road accident through MCOP proceedings.", outcome: "₹42L Awarded", court: "Motor Accidents Tribunal", year: "2023", highlight: false },
];

const faqs = [
  { q: "What forums do you represent clients before?", a: "We regularly appear before the Madras High Court, District Courts, Metropolitan Courts, Tribunals, and Consumer Disputes Redressal Commissions." },
  { q: "Why choose AGD Law Associates?", a: "We are a boutique firm offering personalized attention, strong litigation and advisory expertise, ethical and transparent practice, efficient case management, and active Pan-Tamil Nadu plus inter-state presence." },
  { q: "What is your legal approach?", a: "Our structured process includes detailed case analysis, clear legal opinion and roadmap, transparent communication, strong courtroom advocacy, and focus on timely resolution." },
  { q: "What are your office hours?", a: "Monday to Friday: 10:00 AM to 6:30 PM. Saturday: 11:00 AM to 5:00 PM. Second and last Saturdays are holidays." },
  { q: "Where do you have active practice presence?", a: "Our active litigation presence includes Chennai, Tambaram, Avadi, Coimbatore, Tiruppur, and Bangalore, along with districts such as Chengalpattu, Tiruvallur, Kancheepuram, and Dindigul." },
];

const serviceOptions = [
  { value: "criminal_law", label: "Criminal Law" },
  { value: "civil_litigation", label: "Civil Litigation" },
  { value: "writ_constitutional", label: "Writs & Constitutional" },
  { value: "consumer_protection", label: "Consumer Protection" },
  { value: "property_real_estate", label: "Property & Real Estate" },
  { value: "family_matrimonial", label: "Family & Matrimonial" },
  { value: "arbitration_adr", label: "Arbitration & ADR" },
  { value: "corporate_advisory", label: "Corporate Advisory" },
  { value: "mcop_rcop", label: "MCOP & Rent Control" },
];

const budgetOptions = [
  { value: "immediate", label: "Immediate Assistance" },
  { value: "within_week", label: "Within This Week" },
  { value: "scheduled", label: "Scheduled Consultation" },
];

const testimonials = [
  { name: "AGD Bala Kumar", role: "Advocate | Managing Counsel", feedback: "AGD Bala Kumar has over 12 years of experience in litigation and legal advisory, with focused practice across criminal law, civil disputes, constitutional remedies, consumer matters, property law, family law, arbitration, corporate advisory, MCOP, and RCOP matters.", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=450&h=300&fit=crop" },
  { name: "AGD Law Associates", role: "Our Vision", feedback: "To become a trusted and leading boutique law firm recognized for excellence, integrity, and client satisfaction through precision-driven advocacy, transparent communication, and timely legal solutions.", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=450&h=300&fit=crop" },
];

const serviceTitleToSlug = {
  "Criminal Law": "criminal-law",
  "Civil Litigation": "civil-litigation",
  "Writs & Constitutional": "writs-constitutional",
  "Consumer Protection": "consumer-protection",
  "Property & Real Estate": "property-real-estate",
  "Family & Matrimonial": "family-matrimonial",
  "Arbitration & ADR": "arbitration-adr",
  "Corporate Advisory": "corporate-advisory",
  "MCOP & Rent Control": "mcop-rent-control",
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.9L5.9 22H2.8l7.3-8.3L1 2h6.3l4.4 6.3L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
  </svg>
);

// ─── Reusable primitives ──────────────────────────────────────────────────────

/** Sage pill label with a dot prefix */
function SectionLabel({ dark = false, children }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#c5dfc0] rounded-full px-[14px] py-[5px] border ${dark ? "bg-[rgba(197,223,192,0.08)] border-[rgba(197,223,192,0.2)]" : "bg-[rgba(197,223,192,0.1)] border-[rgba(197,223,192,0.2)]"}`}>
      <span className="w-[5px] h-[5px] rounded-full bg-[#c5dfc0] shrink-0" />
      {children}
    </span>
  );
}

/** Sage filled CTA button */
function BtnPrimary({ href, onClick, children, className = "" }) {
  const base = `inline-flex items-center gap-[9px] bg-[#c5dfc0] text-[#0b0b0b] text-[0.85rem] font-bold px-6 py-[13px] rounded-full transition-all duration-200 tracking-[0.03em] whitespace-nowrap hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(197,223,192,0.3)] ${className}`;
  if (href) return <a href={href} className={base}>{children}</a>;
  return <button type="button" onClick={onClick} className={base}>{children}</button>;
}

/** Ghost outline button */
function BtnGhost({ href, children, className = "" }) {
  const base = `inline-flex items-center gap-[9px] text-white/60 text-[0.85rem] font-medium px-6 py-[13px] rounded-full border border-white/15 transition-all duration-200 whitespace-nowrap hover:border-[#c5dfc0] hover:text-[#c5dfc0] ${className}`;
  if (href) return <a href={href} className={base}>{children}</a>;
  return <span className={base}>{children}</span>;
}

// ─── Fixed Background ─────────────────────────────────────────────────────────

function FixedBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#0b0b0b]">
      <img
        src="hero-bg.webp"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        loading="eager"
      />
      {/* dark overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/68 z-[2]" />
      {/* center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(197,223,192,0.12)_0%,transparent_70%)] pointer-events-none z-[3]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,11,11,0.7)_100%)] z-[4]" />
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "team", label: "Team" },
    { id: "cases", label: "Case Results" },
    { id: "blog", label: "Insights" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const handle = (e) => { if (e.matches) setMenuOpen(false); };
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-300 ${scrolled ? "bg-[rgba(11,11,11,0.88)] backdrop-blur-xl shadow-[0_1px_0_rgba(197,223,192,0.1),0_8px_32px_rgba(0,0,0,0.3)]" : ""}`}>
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="flex items-center justify-between h-[70px] gap-6">
            {/* Logo */}
            <a href="#" className="flex items-center gap-[10px] font-[Cormorant_Garamond,Georgia,serif] text-[1.35rem] font-medium text-white">
              <AGDLogoImg size={48} />
              <span>AGD Law Associates</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {navLinks.map((l) => (
                <a key={l.id} href={`#${l.id}`} className="text-[0.8rem] font-medium text-white/65 px-[13px] py-2 rounded-lg transition-all duration-200 hover:text-[#c5dfc0] hover:bg-[rgba(197,223,192,0.07)]">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <a href="#contact" className="hidden lg:inline-flex items-center gap-[7px] bg-[#c5dfc0] text-[#0b0b0b] text-[0.78rem] font-bold px-[18px] py-[9px] rounded-full tracking-[0.04em] whitespace-nowrap transition-all duration-200 hover:bg-white hover:-translate-y-px">
                Consultation <ArrowRight size={13} />
              </a>
              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center w-[38px] h-[38px] rounded-[9px] border border-[rgba(197,223,192,0.2)] bg-transparent text-white cursor-pointer"
              >
                {menuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[800] bg-[#0b0b0b] flex flex-col overflow-y-auto">
          <div className="max-w-[1200px] mx-auto px-6 w-full flex items-center justify-between h-[70px]">
            <span className="flex items-center gap-[10px] font-[Cormorant_Garamond,Georgia,serif] text-[1.35rem] font-medium text-white">
              <AGDLogoImg size={34} />
            </span>
            <button type="button" onClick={() => setMenuOpen(false)} className="w-[38px] h-[38px] border border-[rgba(197,223,192,0.2)] rounded-[9px] bg-transparent text-white flex items-center justify-center cursor-pointer">
              <X size={17} />
            </button>
          </div>
          <nav className="max-w-[1200px] mx-auto px-6 w-full flex-1 pt-4">
            {navLinks.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="flex justify-between items-center py-5 border-b border-[rgba(197,223,192,0.08)] font-[Cormorant_Garamond,Georgia,serif] text-[2rem] text-white/75 transition-colors duration-200 no-underline hover:text-[#c5dfc0]"
                style={{ animationDelay: `${0.06 + i * 0.06}s` }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{l.label}</span>
                <span className="font-[DM_Sans,sans-serif] text-[0.68rem] text-[rgba(197,223,192,0.35)] tracking-[0.1em]">0{i + 1}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 mt-8 p-4 rounded-[14px] bg-[#c5dfc0] text-[#0b0b0b] font-bold text-[0.88rem] tracking-[0.06em] no-underline uppercase"
            >
              Schedule Consultation <ArrowRight size={14} />
            </a>
          </nav>
          <div className="max-w-[1200px] mx-auto px-6 w-full pb-6 pt-6 border-t border-[rgba(197,223,192,0.08)]">
            <p className="text-[0.7rem] text-[rgba(197,223,192,0.3)] uppercase tracking-[0.12em]">© {new Date().getFullYear()} AGD Law Associates</p>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="min-h-svh flex items-end pb-20 relative [scroll-margin-top:96px]">
      {/* Decorative ring */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[rgba(197,223,192,0.06)] rounded-full pointer-events-none after:content-[''] after:absolute after:inset-10 after:border after:border-[rgba(197,223,192,0.04)] after:rounded-full" />

      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="text-center max-w-[820px] mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-[10px] text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#c5dfc0] border border-[rgba(197,223,192,0.25)] rounded-full px-4 py-[6px] mb-8 mt-20">
            <Scale size={11} />
            Boutique Law Firm · Chennai · Est. 2016
          </div>

          {/* Title */}
          <h1 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(4rem,9vw,9rem)] text-white leading-[0.92] tracking-[-0.025em] mb-3">
            AGD<br /><em className="text-[#c5dfc0] italic">Law</em>
          </h1>
          <p className="font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1rem,2vw,1.5rem)] text-white/40 tracking-[0.3em] uppercase mb-9 font-light">
            Associates
          </p>
          <p className="text-[1.05rem] text-white/50 leading-[1.75] max-w-[520px] mx-auto mb-11">
            Precision-driven litigation and advisory across criminal, civil, consumer, constitutional, and commercial matters — Tamil Nadu &amp; beyond.
          </p>

          {/* Actions */}
          <div className="flex gap-[14px] justify-center flex-wrap">
            <BtnPrimary href="#contact">Request Consultation <ArrowRight size={14} /></BtnPrimary>
            <BtnGhost href="tel:+919994388855"><Phone size={14} /> +91 99943 88855</BtnGhost>
          </div>

          {/* Stats row */}
          <div className="flex justify-center mt-14 border border-[rgba(197,223,192,0.12)] rounded-[20px] overflow-hidden w-fit mx-auto flex-wrap">
            {[
              { num: "2016", lbl: "Established" },
              { num: "12+", lbl: "Years Practice" },
              { num: "500+", lbl: "Cases Handled" },
              { num: "9", lbl: "Practice Areas" },
            ].map((s, i, arr) => (
              <div key={s.lbl} className={`px-8 py-[18px] ${i < arr.length - 1 ? "border-r border-[rgba(197,223,192,0.12)]" : ""} max-sm:flex-[1_1_50%] max-sm:text-center`}>
                <div className="font-[Cormorant_Garamond,Georgia,serif] text-[2rem] text-[#c5dfc0] leading-none max-sm:text-[1.7rem]">{s.num}</div>
                <div className="text-[0.65rem] text-white/35 uppercase tracking-[0.12em] mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div aria-hidden="true" className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-px h-10 bg-gradient-to-b from-[rgba(197,223,192,0.5)] to-transparent animate-[scrollHint_2s_ease-in-out_infinite]" />
        <span className="text-[0.6rem] text-[rgba(197,223,192,0.35)] uppercase tracking-[0.2em]">Scroll</span>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = ["Criminal Law", "Civil Litigation", "Constitutional Remedies", "Consumer Protection", "Property Law", "Family Law", "Arbitration & ADR", "Corporate Advisory", "MCOP & RCOP"];
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#c5dfc0] overflow-hidden h-[38px] flex items-center">
      <div className="flex whitespace-nowrap animate-[tickerMove_30s_linear_infinite]">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-[0.7rem] font-bold text-[#0b0b0b] uppercase tracking-[0.14em] px-7">
            {item}<span className="opacity-35"> ◆ </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const credentials = ["Integrity & Professionalism", "Confidentiality & Trust", "Client-Focused Service", "Excellence in Advocacy", "Timely Legal Solutions"];
  return (
    <section id="about" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[clamp(3rem,5vw,6rem)] items-center py-[clamp(5rem,8vw,9rem)]">
          {/* Left */}
          <div className="flex flex-col gap-7">
            <SectionLabel>About Us</SectionLabel>
            <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2.6rem,4vw,4.2rem)] leading-[1.05] tracking-[-0.015em] text-white">
              Your legal matter<br />deserves <em className="text-[#c5dfc0] italic">precision</em>
            </h2>
            <p className="text-[0.97rem] leading-[1.85] text-white/60">
              Founded in 2016, AGD Law Associates is a boutique law firm delivering high-quality litigation and advisory services across Tamil Nadu and beyond. Led by AGD Bala Kumar with over 12 years of practice, our firm combines courtroom strength with strategic advisory for complex, sensitive, and high-impact legal matters.
            </p>
            <p className="text-[0.97rem] leading-[1.85] text-white/60">
              We believe every client deserves personalized attention, clear communication, and a legal team genuinely invested in their outcome. From first consultation to final resolution, we stand by you.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[{ num: "2016", lbl: "Established" }, { num: "10+", lbl: "Advocates" }, { num: "6", lbl: "Active Cities" }].map((s) => (
                <div key={s.lbl} className="bg-white/7 backdrop-blur-xl border border-[rgba(197,223,192,0.15)] rounded-2xl p-[18px_18px_20px] flex flex-col gap-1">
                  <div className="font-[Cormorant_Garamond,Georgia,serif] text-[2.2rem] text-[#c5dfc0] leading-none">{s.num}</div>
                  <div className="text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Cred tags */}
            <div className="flex flex-wrap gap-2">
              {credentials.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 text-[0.77rem] text-[#c5dfc0] font-medium bg-[rgba(197,223,192,0.1)] border border-[rgba(197,223,192,0.2)] rounded-full px-3 py-[5px]">
                  <CheckCircle size={12} className="text-[#c5dfc0] shrink-0" />{c}
                </span>
              ))}
            </div>

            <BtnPrimary href="#contact" className="w-fit">Schedule a Consultation <ArrowRight size={14} /></BtnPrimary>
          </div>

          {/* Right — hidden on mobile */}
          <div className="hidden lg:block relative">
            <div className="relative pr-6 pt-6">
              {/* Accent image */}
              <div className="absolute top-[-20px] right-[-20px] w-[48%] aspect-square rounded-[20px] overflow-hidden border-[3px] border-white shadow-[0_16px_48px_rgba(11,11,11,0.15)]">
                <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=600&fit=crop" alt="Law office" className="w-full h-full object-cover" loading="lazy" />
              </div>
              {/* Main image */}
              <div className="rounded-[28px] overflow-hidden shadow-[0_40px_100px_rgba(11,11,11,0.15)] aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=1000&fit=crop&crop=faces" alt="AGD Law Associates counsel" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
              {/* Badge */}
              <div className="absolute bottom-[-20px] left-[-20px] bg-[#0b0b0b] rounded-[20px] p-[20px_24px] text-white shadow-[0_20px_56px_rgba(11,11,11,0.3)]">
                <div className="font-[Cormorant_Garamond,Georgia,serif] text-[2.6rem] text-[#c5dfc0] leading-none">12+</div>
                <div className="text-[0.62rem] uppercase tracking-[0.1em] text-[rgba(197,223,192,0.55)] mt-1">Years of<br />Practice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          {/* Head */}
          <div className="flex justify-between items-end mb-[clamp(2.5rem,4vw,4rem)] gap-6 flex-wrap">
            <div>
              <SectionLabel dark>Practice Areas</SectionLabel>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2.2rem,3.5vw,3.6rem)] text-white tracking-[-0.015em] mt-[14px]">
                Areas of <em className="text-[#c5dfc0] italic">expertise</em>
              </h2>
            </div>
            <BtnPrimary href="#contact" className="shrink-0">Discuss Your Case <ArrowRight size={13} /></BtnPrimary>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[rgba(197,223,192,0.1)] rounded-[28px] overflow-hidden">
            {services.map((s, i) => {
              const Icon = s.icon;
              const slug = serviceTitleToSlug[s.title];
              const isLastRow = i >= 6; // bottom 3
              const isRightEdge = (i + 1) % 3 === 0;
              return (
                <Link
                  href={slug ? `/services/${slug}` : "#"}
                  key={s.title}
                  className={`p-[30px_26px] relative overflow-hidden flex flex-col gap-3 bg-[rgba(255,255,255,0.02)] transition-colors duration-300 hover:bg-[rgba(197,223,192,0.05)] group no-underline text-inherit
                    ${!isRightEdge ? "border-r border-r-[rgba(197,223,192,0.08)]" : ""}
                    ${!isLastRow ? "border-b border-b-[rgba(197,223,192,0.08)]" : ""}
                  `}
                >
                  <span className="font-[Cormorant_Garamond,Georgia,serif] text-[0.85rem] text-[rgba(197,223,192,0.3)] tracking-[0.08em]">0{i + 1}</span>
                  <div className="w-[42px] h-[42px] rounded-[11px] border border-[rgba(197,223,192,0.18)] text-[#c5dfc0] flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(197,223,192,0.1)] group-hover:border-[#c5dfc0]">
                    <Icon size={17} />
                  </div>
                  <h3 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[1.28rem] text-white leading-[1.2]">{s.title}</h3>
                  <p className="text-[0.81rem] text-white/42 leading-[1.72]">{s.description}</p>
                  <div className="mt-auto w-[30px] h-[30px] rounded-full border border-[rgba(197,223,192,0.18)] text-[#c5dfc0] flex items-center justify-center transition-all duration-200 group-hover:bg-[#c5dfc0] group-hover:text-[#0b0b0b] group-hover:border-[#c5dfc0]">
                    <ArrowRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section id="team" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          <div className="flex justify-between items-end mb-[clamp(2.5rem,4vw,4rem)] gap-6 flex-wrap">
            <div>
              <SectionLabel>Our Team</SectionLabel>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2.2rem,3.5vw,3.6rem)] text-white tracking-[-0.015em] mt-[14px]">
                The counsel behind<br />your <em className="text-[#c5dfc0] italic">case</em>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((m) => (
              <div key={m.name} className="rounded-[28px] overflow-hidden relative aspect-[3/4] bg-[#0b0b0b] transition-all duration-[400ms] cubic-bezier-spring hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(11,11,11,0.18)] group">
                <img src={m.img} alt={m.name} className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.65]" loading="lazy" />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.95)] via-[rgba(11,11,11,0.45)] to-transparent" />
                {/* Experience badge */}
                <div className="absolute top-4 right-4 text-[0.65rem] font-bold text-[#0b0b0b] bg-[#c5dfc0] rounded-full px-[10px] py-1 uppercase tracking-[0.08em]">
                  {m.experience}
                </div>
                {/* Body */}
                <div className="absolute bottom-0 left-0 right-0 p-[22px_18px] flex flex-col gap-[3px]">
                  <div className="text-[0.63rem] text-[#c5dfc0] uppercase tracking-[0.1em]">{m.specialization}</div>
                  <div className="font-[Cormorant_Garamond,Georgia,serif] text-[1.2rem] text-white leading-[1.1]">{m.name}</div>
                  <div className="text-[0.72rem] text-white/45">{m.role}</div>
                  <div className="mt-2">
                    <a href="#" aria-label={`${m.name} LinkedIn`} className="w-7 h-7 rounded-lg border border-[rgba(197,223,192,0.25)] text-[#c5dfc0] inline-flex items-center justify-center transition-all duration-200 hover:bg-[#c5dfc0] hover:text-[#0b0b0b]">
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Case Results ─────────────────────────────────────────────────────────────

function CaseResults() {
  const stats = [
    { num: "500+", lbl: "Cases Handled" },
    { num: "92%", lbl: "Success Rate" },
    { num: "6", lbl: "Active Cities" },
    { num: "12+", lbl: "Years Practice" },
  ];
  return (
    <section id="cases" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          <div className="flex justify-between items-end mb-[clamp(2rem,4vw,3.5rem)] gap-6 flex-wrap">
            <div>
              <SectionLabel>Track Record</SectionLabel>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2.2rem,3.5vw,3.6rem)] text-white tracking-[-0.015em] mt-[14px]">
                Results that <em className="text-[#c5dfc0] italic">speak</em>
              </h2>
            </div>
            <BtnPrimary href="#contact" className="shrink-0">Discuss Your Case <ArrowRight size={13} /></BtnPrimary>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {stats.map((s) => (
              <div key={s.lbl} className="bg-white/[0.06] backdrop-blur-xl border border-[rgba(197,223,192,0.15)] rounded-[18px] p-[22px_20px] text-center">
                <div className="font-[Cormorant_Garamond,Georgia,serif] text-[2.4rem] text-[#c5dfc0] leading-none">{s.num}</div>
                <div className="text-[0.67rem] text-white/35 uppercase tracking-[0.1em] mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseResults.map((c, i) => (
              <article
                key={i}
                className={`rounded-[20px] p-[26px_24px] flex flex-col gap-[10px] border transition-all duration-300 hover:-translate-y-1 ${c.highlight ? "bg-[rgba(197,223,192,0.1)] border-[rgba(197,223,192,0.25)]" : "bg-white/7 backdrop-blur-[16px] border-white/12 hover:border-[rgba(197,223,192,0.3)]"}`}
              >
                <div className="text-[0.63rem] font-bold uppercase tracking-[0.12em] text-[#c5dfc0]">{c.category}</div>
                <h3 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[1.25rem] text-white">{c.title}</h3>
                <p className="text-[0.81rem] text-white/50 leading-[1.72]">{c.description}</p>
                <div className="flex justify-between items-end mt-auto pt-2 border-t border-white/[0.06]">
                  <div>
                    <div className="text-[0.72rem] text-white/45">{c.court}</div>
                    <div className="text-[0.65rem] text-white/25 mt-0.5">{c.year}</div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[0.67rem] font-semibold text-[#c5dfc0] bg-[rgba(197,223,192,0.12)] border border-[rgba(197,223,192,0.2)] rounded-full px-[10px] py-1">
                    <CheckCircle size={10} />{c.outcome}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why / Regions ────────────────────────────────────────────────────────────

function Regions() {
  const whyItems = [
    { icon: Scale, title: "Boutique Attention", desc: "Every client receives direct partner-level attention — no file gets lost in a large firm structure." },
    { icon: Shield, title: "Ethical Practice", desc: "Strict confidentiality, transparent communication, and unwavering integrity in every matter." },
    { icon: Clock, title: "Timely Resolution", desc: "Structured case management designed to achieve efficient, timely outcomes without unnecessary delays." },
    { icon: Award, title: "Proven Advocacy", desc: "12+ years of courtroom experience across criminal, civil, constitutional, and commercial matters." },
  ];
  return (
    <section id="why-me" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          <div className="text-center mb-[clamp(2.5rem,4vw,4rem)]">
            <SectionLabel dark>Why Choose Us</SectionLabel>
            <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2.2rem,3.5vw,3.6rem)] text-white tracking-[-0.015em] mt-[14px]">
              Why <em className="text-[#c5dfc0] italic">AGD</em> Law Associates
            </h2>
            <p className="text-[0.9rem] text-white/45 mt-3">A trusted boutique firm serving clients across Tamil Nadu and beyond</p>
          </div>

          {/* Why cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {whyItems.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="bg-white/[0.04] backdrop-blur-xl border border-[rgba(197,223,192,0.12)] rounded-2xl p-[28px_24px] flex flex-col gap-4 transition-all duration-300 hover:border-[rgba(197,223,192,0.25)] hover:bg-white/[0.06]">
                  <div className="w-10 h-10 rounded-[10px] bg-[rgba(197,223,192,0.1)] border border-[rgba(197,223,192,0.2)] text-[#c5dfc0] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div className="font-[Cormorant_Garamond,Georgia,serif] text-[1.2rem] text-white">{w.title}</div>
                  <div className="text-[0.82rem] text-white/45 leading-[1.72]">{w.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Regions */}
          <div className="border border-[rgba(197,223,192,0.12)] rounded-2xl overflow-hidden">
            <div className="text-[0.65rem] uppercase tracking-[0.14em] font-semibold px-6 py-4 text-[rgba(197,223,192,0.4)] bg-[rgba(197,223,192,0.04)] border-b border-[rgba(197,223,192,0.1)]">
              Our Practice Presence
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Chennai & Suburbs", cities: "Chennai · Tambaram · Avadi" },
                { name: "Western Tamil Nadu", cities: "Coimbatore · Tiruppur" },
                { name: "Greater Karnataka", cities: "Bangalore & surrounding districts" },
                { name: "Chengalpattu", cities: "Chengalpattu · Kancheepuram" },
                { name: "Tiruvallur", cities: "Tiruvallur · Ponneri · Gummidipoondi" },
                { name: "Dindigul", cities: "Dindigul · Natham · Palani" },
              ].map((r, i, arr) => {
                const isRightEdge = (i + 1) % 3 === 0;
                const isBottom = i >= 3;
                return (
                  <div
                    key={r.name}
                    className={`p-[20px_24px] ${!isRightEdge ? "border-r border-r-[rgba(197,223,192,0.08)]" : ""} ${!isBottom ? "border-b border-b-[rgba(197,223,192,0.08)]" : ""}`}
                  >
                    <div className="font-[Cormorant_Garamond,Georgia,serif] text-[1.1rem] text-white mb-1">{r.name}</div>
                    <div className="text-[0.77rem] text-white/35">{r.cities}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial / Leadership ──────────────────────────────────────────────────

function Testimonial() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 7000);
    return () => clearInterval(t);
  }, [isPaused, total]);

  const t = testimonials[current];
  return (
    <section id="testimonial" className="[scroll-margin-top:96px]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[60px] items-start">
            {/* Sidebar */}
            <div className="lg:sticky lg:top-[100px] flex flex-col gap-5">
              <SectionLabel>Leadership</SectionLabel>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2rem,3.2vw,3.2rem)] text-white leading-[1.08] mt-3">
                Courtroom <em className="text-[#c5dfc0] italic">precision</em><br />at every level
              </h2>
              <p className="text-[0.9rem] leading-[1.8] text-white/50">
                AGD Bala Kumar leads the firm with over 12 years of practice, combining litigation strength with strategic advisory for complex matters.
              </p>
              {/* Nav */}
              <div className="flex items-center gap-[10px]">
                <button type="button" onClick={prev} aria-label="Previous" className="w-[38px] h-[38px] rounded-full border border-[rgba(197,223,192,0.2)] text-white/70 flex items-center justify-center transition-all duration-200 hover:bg-[#c5dfc0] hover:text-[#0b0b0b] hover:border-[#c5dfc0]">
                  <ArrowLeft size={15} />
                </button>
                <button type="button" onClick={next} aria-label="Next" className="w-[38px] h-[38px] rounded-full border border-[rgba(197,223,192,0.2)] text-white/70 flex items-center justify-center transition-all duration-200 hover:bg-[#c5dfc0] hover:text-[#0b0b0b] hover:border-[#c5dfc0]">
                  <ArrowRight size={15} />
                </button>
                <div className="text-[0.78rem] text-white/35 tracking-[0.08em]">{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
              </div>
              {/* Progress */}
              <div className="h-[2px] bg-[rgba(197,223,192,0.15)] rounded-full overflow-hidden">
                <div className="h-full bg-[#c5dfc0] rounded-full transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
              </div>
              {/* Dots */}
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
                    className="h-1.5 rounded-full bg-[#c5dfc0] border-none transition-all duration-300"
                    style={{ width: i === current ? "28px" : "8px", opacity: i === current ? 1 : 0.35 }}
                  />
                ))}
              </div>
            </div>

            {/* Card */}
            <div>
              <article key={`${t.name}-${current}`} className="bg-white/7 backdrop-blur-xl border border-white/12 rounded-[24px] p-[36px_32px] animate-[fadeSlide_0.45s_cubic-bezier(0.22,1,0.36,1)_both]">
                <div className="text-[#c5dfc0] text-[0.9rem] tracking-[2px] mb-5">★★★★★</div>
                <blockquote className="font-[Cormorant_Garamond,Georgia,serif] text-[1.35rem] leading-[1.55] text-white italic mb-6">"{t.feedback}"</blockquote>
                <div className="flex items-center gap-[14px]">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover object-top" loading="lazy" />
                  <div>
                    <div className="font-semibold text-[0.88rem] text-white">{t.name}</div>
                    <div className="text-[0.75rem] text-white/40 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function Blog() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);
  return (
    <section id="blog" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          <div className="flex justify-between items-end mb-[clamp(2rem,4vw,3.5rem)] gap-6 flex-wrap">
            <div>
              <SectionLabel dark>Legal Insights</SectionLabel>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2.2rem,3.5vw,3.6rem)] text-white tracking-[-0.015em] mt-[14px]">
                From our <em className="text-[#c5dfc0] italic">desk</em>
              </h2>
            </div>
            <BtnGhost href="/blog" className="shrink-0">All Articles <ArrowRight size={13} /></BtnGhost>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="rounded-[24px] overflow-hidden bg-white/[0.03] border border-[rgba(197,223,192,0.1)] flex flex-col transition-colors duration-300 no-underline hover:border-[rgba(197,223,192,0.3)]">
                <img src={featured.img} alt={featured.title} className="w-full aspect-video object-cover" loading="lazy" />
                <div className="p-[28px_26px] flex flex-col gap-3 flex-1">
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#c5dfc0]">{featured.category}</div>
                  <h3 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[1.6rem] text-white leading-[1.2]">{featured.title}</h3>
                  <p className="text-[0.83rem] text-white/45 leading-[1.7]">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-[0.72rem] text-white/30 mt-auto">
                    <span>{featured.author}</span>
                    <span className="opacity-40">·</span>
                    <span>{featured.date}</span>
                    <span className="opacity-40">·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </Link>
            )}
            <div className="flex flex-col gap-3">
              {rest.map((p) => (
                <Link href={`/blog/${p.slug}`} key={p.slug} className="rounded-[18px] overflow-hidden bg-white/[0.03] border border-[rgba(197,223,192,0.1)] flex transition-colors duration-300 no-underline hover:border-[rgba(197,223,192,0.25)]">
                  <img src={p.img} alt={p.title} className="w-[110px] h-[110px] max-sm:w-24 max-sm:h-24 shrink-0 object-cover" loading="lazy" />
                  <div className="p-[16px_18px] flex flex-col gap-1.5">
                    <div className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#c5dfc0]">{p.category}</div>
                    <div className="font-[Cormorant_Garamond,Georgia,serif] text-[1.08rem] text-white leading-[1.25]">{p.title}</div>
                    <div className="text-[0.68rem] text-white/30 mt-auto">{p.date} · {p.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));
  return (
    <section id="faq" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-[60px] items-start">
            {/* Sidebar */}
            <div className="lg:sticky lg:top-[100px] flex flex-col gap-5">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2rem,3.2vw,3.2rem)] text-white leading-[1.08] mt-3">
                Common <em className="text-[#c5dfc0] italic">questions</em>
              </h2>
              <p className="text-[0.9rem] text-white/50 leading-[1.8]">
                Everything you need to know about working with AGD Law Associates. Can't find what you're looking for? Contact us directly.
              </p>
              <BtnPrimary href="#contact" className="w-fit">Contact Us <ArrowRight size={13} /></BtnPrimary>
            </div>

            {/* List */}
            <div className="flex flex-col border border-[rgba(197,223,192,0.15)] rounded-[20px] overflow-hidden">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border-b border-b-[rgba(197,223,192,0.1)] last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="w-full flex justify-between items-center px-6 py-5 text-left gap-4 text-[0.93rem] font-medium text-white/85 bg-white/[0.04] transition-colors duration-200 hover:text-[#c5dfc0] hover:bg-[rgba(197,223,192,0.05)]"
                    >
                      <span>{faq.q}</span>
                      <span className={`w-7 h-7 rounded-full shrink-0 border border-[rgba(197,223,192,0.2)] flex items-center justify-center text-white/40 transition-all duration-300 ${isOpen ? "bg-[#c5dfc0] border-[#c5dfc0] text-[#0b0b0b] rotate-45" : ""}`}>
                        <X size={13} />
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out bg-white/[0.03] ${isOpen ? "max-h-[220px]" : "max-h-0"}`}>
                      <div className="px-6 pb-5">
                        <p className="text-[0.87rem] text-white/50 leading-[1.8]">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ your_name: "", your_email: "", service_type: "", budget: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "", message: "" });

  const selectPill = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.service_type || !form.budget) {
      setSubmitState({ type: "error", message: "Please select a service and preferred timeline." });
      return;
    }
    try {
      setIsSubmitting(true);
      setSubmitState({ type: "", message: "" });
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Failed to send message.");
      setSubmitState({ type: "success", message: "Thanks! Your message was sent. We'll be in touch shortly." });
      setForm({ your_name: "", your_email: "", service_type: "", budget: "", message: "" });
    } catch (error) {
      setSubmitState({ type: "error", message: error.message || "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "border border-[rgba(197,223,192,0.15)] rounded-xl px-[14px] py-[11px] text-[0.88rem] font-[inherit] text-white bg-white/[0.06] transition-all duration-200 resize-vertical placeholder:text-white/25 focus:outline-none focus:border-[#c5dfc0] focus:shadow-[0_0_0_3px_rgba(197,223,192,0.1)]";

  return (
    <section id="contact" className="[scroll-margin-top:96px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="py-[clamp(4rem,7vw,8rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-[60px] items-start">
            {/* Left */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-[100px]">
              <SectionLabel dark>Get In Touch</SectionLabel>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[clamp(2.4rem,4vw,4rem)] text-white tracking-[-0.015em] mt-[14px] leading-[1.05]">
                Need legal<br /><em className="text-[#c5dfc0] italic">support?</em><br />Let's connect.
              </h2>
              <p className="text-[0.9rem] text-white/45 leading-[1.8]">
                Reach out directly or fill the form — we respond during office hours. Every matter is handled with strict confidentiality.
              </p>

              {/* Contact details */}
              {[
                { icon: PhoneCall, label: "Phone", value: "+91 99943 88855", href: "tel:+919994388855" },
                { icon: Mail, label: "Email", value: "agdlawassociatesoffice@gmail.com", href: "mailto:agdlawassociatesoffice@gmail.com" },
                { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu", href: "#" },
              ].map((d) => {
                const Icon = d.icon;
                return (
                  <a key={d.label} href={d.href} className="flex items-start gap-[14px] p-4 rounded-[14px] border border-[rgba(197,223,192,0.12)] bg-white/[0.04] transition-all duration-200 no-underline hover:border-[rgba(197,223,192,0.3)] hover:bg-[rgba(197,223,192,0.06)]">
                    <div className="w-9 h-9 rounded-[10px] shrink-0 bg-[rgba(197,223,192,0.1)] text-[#c5dfc0] flex items-center justify-center">
                      <Icon size={15} />
                    </div>
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-[0.1em] text-white/35">{d.label}</div>
                      <div className="text-[0.88rem] text-white/80 mt-0.5 font-medium">{d.value}</div>
                    </div>
                  </a>
                );
              })}

              {/* Hours */}
              <div className="bg-[rgba(197,223,192,0.05)] border border-[rgba(197,223,192,0.1)] rounded-2xl p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[rgba(197,223,192,0.45)] font-semibold mb-[14px]">Office Hours</p>
                {[
                  { day: "Monday – Friday", time: "10:00 AM – 6:30 PM" },
                  { day: "Saturday", time: "11:00 AM – 5:00 PM" },
                  { day: "2nd & Last Saturday", time: "Closed" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-[0.82rem] py-[7px] border-b border-b-[rgba(197,223,192,0.08)] last:border-b-0">
                    <span className="text-white/45">{h.day}</span>
                    <span className="text-white/75 font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form panel */}
            <div className="bg-white/[0.08] backdrop-blur-[24px] border border-white/12 rounded-[28px] p-[36px_32px]">
              <h3 className="font-[Cormorant_Garamond,Georgia,serif] font-normal text-[1.8rem] text-white mb-1.5">Send a Message</h3>
              <p className="text-[0.82rem] text-white/40 mb-7">We typically respond within 1 business day.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
                {/* Service chips */}
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white/40 mb-2.5">Select Service Area</p>
                  <div className="flex flex-wrap gap-[7px]">
                    {serviceOptions.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        aria-pressed={form.service_type === s.value}
                        onClick={() => selectPill("service_type", s.value)}
                        className={`text-[0.77rem] px-[13px] py-[6px] rounded-full border transition-all duration-200 font-[inherit] ${form.service_type === s.value ? "bg-[#c5dfc0] border-[#c5dfc0] text-[#0b0b0b] font-semibold" : "border-[rgba(197,223,192,0.2)] bg-white/[0.05] text-white/60 hover:border-[#c5dfc0] hover:text-[#c5dfc0]"}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline chips */}
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white/40 mb-2.5">Preferred Timeline</p>
                  <div className="flex flex-wrap gap-[7px]">
                    {budgetOptions.map((b) => (
                      <button
                        key={b.value}
                        type="button"
                        aria-pressed={form.budget === b.value}
                        onClick={() => selectPill("budget", b.value)}
                        className={`text-[0.77rem] px-[13px] py-[6px] rounded-full border transition-all duration-200 font-[inherit] ${form.budget === b.value ? "bg-[#c5dfc0] border-[#c5dfc0] text-[#0b0b0b] font-semibold" : "border-[rgba(197,223,192,0.2)] bg-white/[0.05] text-white/60 hover:border-[#c5dfc0] hover:text-[#c5dfc0]"}`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  <div className="flex flex-col gap-[5px]">
                    <label htmlFor="your_name" className="text-[0.72rem] font-semibold text-white/45 uppercase tracking-[0.06em]">Your Name</label>
                    <input type="text" id="your_name" name="your_name" placeholder="John Doe" required value={form.your_name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <label htmlFor="your_email" className="text-[0.72rem] font-semibold text-white/45 uppercase tracking-[0.06em]">Email Address</label>
                    <input type="email" id="your_email" name="your_email" placeholder="john@email.com" required value={form.your_email} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-[5px] sm:col-span-2">
                    <label htmlFor="message" className="text-[0.72rem] font-semibold text-white/45 uppercase tracking-[0.06em]">Your Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="Briefly describe your legal matter..." value={form.message} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Feedback */}
                {submitState.message && (
                  <div className={`px-4 py-3 rounded-[10px] text-[0.85rem] font-medium ${submitState.type === "success" ? "bg-[rgba(197,223,192,0.15)] text-[#c5dfc0] border border-[rgba(197,223,192,0.25)]" : "bg-[rgba(255,100,100,0.1)] text-[#ff8080] border border-[rgba(255,100,100,0.2)]"}`}>
                    {submitState.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#c5dfc0] text-[#0b0b0b] text-[0.88rem] font-bold tracking-[0.05em] px-7 py-[14px] rounded-full w-full transition-all duration-200 hover:not-disabled:bg-white hover:not-disabled:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={15} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Our Team" },
    { href: "#cases", label: "Case Results" },
    { href: "#blog", label: "Legal Insights" },
    { href: "#contact", label: "Contact" },
  ];
  const serviceLinks = ["Criminal Law", "Civil Litigation", "Writs & Constitutional", "Consumer Protection", "Property Law", "Family Law"];

  return (
    <footer className="bg-[#0b0b0b] border-t border-[rgba(197,223,192,0.08)] pt-[clamp(3rem,5vw,5rem)]">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-[clamp(2.5rem,4vw,4rem)] border-b border-[rgba(197,223,192,0.1)]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-[10px] font-[Cormorant_Garamond,Georgia,serif] text-[1.35rem] font-medium text-white">
              <AGDLogoImg size={34} />
              AGD Law Associates
            </div>
            <p className="text-[0.84rem] text-white/40 leading-[1.7] max-w-[260px]">
              Precision-driven litigation and advisory services across Tamil Nadu and beyond. Established 2016.
            </p>
            <div className="flex gap-2.5">
              {[{ icon: <FacebookIcon />, label: "Facebook" }, { icon: <XIcon />, label: "X (Twitter)" }].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-[34px] h-[34px] rounded-[9px] border border-[rgba(197,223,192,0.18)] text-white/45 flex items-center justify-center transition-all duration-200 hover:bg-[rgba(197,223,192,0.1)] hover:text-[#c5dfc0] hover:border-[#c5dfc0]">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-[14px]">
            <div className="text-[0.66rem] uppercase tracking-[0.14em] text-[#c5dfc0] font-bold">Quick Links</div>
            <div className="flex flex-col gap-[9px]">
              {quickLinks.map((l) => (
                <a key={l.label} href={l.href} className="text-[0.83rem] text-white/40 transition-colors duration-200 no-underline hover:text-white/80">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Practice areas */}
          <div className="flex flex-col gap-[14px]">
            <div className="text-[0.66rem] uppercase tracking-[0.14em] text-[#c5dfc0] font-bold">Practice Areas</div>
            <div className="flex flex-col gap-[9px]">
              {serviceLinks.map((s) => (
                <span key={s} className="text-[0.83rem] text-white/40">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-[14px]">
            <div className="text-[0.66rem] uppercase tracking-[0.14em] text-[#c5dfc0] font-bold">Contact</div>
            <div className="flex flex-col gap-[14px]">
              {[
                { icon: <PhoneCall size={13} />, text: "+91 99943 88855", href: "tel:+919994388855" },
                { icon: <Mail size={13} />, text: "agdlawassociatesoffice@gmail.com", href: "mailto:agdlawassociatesoffice@gmail.com" },
                { icon: <MapPin size={13} />, text: "Chennai, Tamil Nadu, India", href: null },
              ].map((item) => (
                item.href ? (
                  <a key={item.text} href={item.href} className="flex items-start gap-[10px] no-underline group">
                    <span className="text-[#c5dfc0] shrink-0 mt-[1px]">{item.icon}</span>
                    <span className="text-[0.81rem] text-white/40 leading-[1.5] transition-colors duration-200 group-hover:text-white/70">{item.text}</span>
                  </a>
                ) : (
                  <div key={item.text} className="flex items-start gap-[10px]">
                    <span className="text-[#c5dfc0] shrink-0 mt-[1px]">{item.icon}</span>
                    <span className="text-[0.81rem] text-white/40 leading-[1.5]">{item.text}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center py-5 gap-4 flex-wrap">
          <p className="text-[0.76rem] text-white/25">© {new Date().getFullYear()} AGD Law Associates. All rights reserved.</p>
          <a href="https://www.agdlawassociates.in" target="_blank" rel="noopener noreferrer" className="text-[0.76rem] text-white/25 transition-colors duration-200 no-underline hover:text-[#c5dfc0]">
            www.agdlawassociates.in
          </a>
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
    "Hi, I need a legal consultation.",
    "I want to discuss a criminal law matter.",
    "I need support in a property dispute.",
    "Please schedule a consultation call.",
  ];

  const openWhatsApp = (textToSend) => {
    const finalMessage = (textToSend || message).trim();
    if (!finalMessage) return;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`, "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[980] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <div className={`w-[min(90vw,360px)] rounded-[20px] overflow-hidden bg-white border border-[rgba(197,223,192,0.35)] shadow-[0_24px_64px_rgba(11,11,11,0.18)] transition-all duration-[350ms] cubic-bezier-spring origin-bottom-right ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 translate-y-4 pointer-events-none"}`}>
        {/* Header */}
        <div className="bg-[#0b0b0b] px-4 py-[14px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-8 h-8 rounded-full bg-[#c5dfc0] text-[#0b0b0b] flex items-center justify-center shrink-0">
              <MessageCircle size={14} />
            </div>
            <div>
              <div className="text-[0.86rem] font-semibold text-white">AGD Legal Desk</div>
              <div className="text-[0.68rem] text-[#c5dfc0]">Replies during office hours</div>
            </div>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="w-7 h-7 rounded-full border border-white/15 text-white/55 flex items-center justify-center transition-all duration-200 hover:border-[#c5dfc0] hover:text-[#c5dfc0]">
            <X size={12} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 bg-[#f8fbf7] flex flex-col gap-3">
          <div className="bg-white border border-[rgba(197,223,192,0.35)] rounded-2xl rounded-tl-[4px] px-[14px] py-3 text-[0.84rem] leading-[1.6] text-[#0b0b0b] max-w-[90%] shadow-[0_2px_8px_rgba(11,11,11,0.05)]">
            Hi! Thanks for reaching out to AGD Law Associates. Select a quick message or type your query below.
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickMessages.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMessage(m)}
                className={`text-[0.74rem] px-[11px] py-[6px] rounded-full border text-left transition-all duration-200 ${message === m ? "bg-[#c5dfc0] border-[#c5dfc0]" : "border-[rgba(197,223,192,0.35)] bg-white text-[#0b0b0b] hover:bg-[#c5dfc0] hover:border-[#c5dfc0]"}`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-end">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); openWhatsApp(); } }}
              placeholder="Type your message..."
              aria-label="WhatsApp message"
              className="flex-1 resize-none border border-[rgba(197,223,192,0.35)] rounded-xl px-[13px] py-[9px] text-[0.84rem] font-[inherit] text-[#0b0b0b] bg-white transition-colors duration-200 focus:outline-none focus:border-[#c5dfc0]"
            />
            <button
              type="button"
              onClick={() => openWhatsApp()}
              aria-label="Send"
              className="w-[38px] h-[38px] rounded-full shrink-0 bg-[#c5dfc0] text-[#0b0b0b] flex items-center justify-center transition-all duration-200 hover:bg-[#0b0b0b] hover:text-[#c5dfc0]"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Label */}
      {!open && (
        <div className="bg-[#0b0b0b] text-[#c5dfc0] text-[0.66rem] uppercase tracking-[0.1em] px-[13px] py-[5px] rounded-full font-bold">
          Chat with AGD
        </div>
      )}

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-[0_12px_32px_rgba(11,11,11,0.3)] transition-all duration-300 border-none ${open ? "bg-[#0b0b0b] text-[#c5dfc0]" : "bg-[#c5dfc0] text-[#0b0b0b] hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_18px_40px_rgba(197,223,192,0.4)]"}`}
      >
        {open ? <X size={19} /> : <MessageCircle size={21} />}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  useEffect(() => {
    const getHeaderOffset = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--header-offset").trim();
      const parsed = Number.parseFloat(value);
      return Number.isNaN(parsed) ? 96 : parsed;
    };

    const scrollToHash = (hash, updateHistory = false) => {
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      if (updateHistory && window.location.hash !== hash) window.history.pushState(null, "", hash);
    };

    const handleDocumentClick = (event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      if (!document.querySelector(href)) return;
      event.preventDefault();
      scrollToHash(href, true);
    };

    const handleHashChange = () => scrollToHash(window.location.hash, false);

    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("hashchange", handleHashChange);
    if (window.location.hash) requestAnimationFrame(() => scrollToHash(window.location.hash, false));

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      {/* Keyframe animations injected once — minimal global style */}
      <style>{`
        @keyframes tickerMove { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollHint { 0%, 100% { opacity: 0.4; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.2); } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-padding-top: 96px; }
      `}</style>

      <FixedBackground />
      <div className="relative z-10">
        <Header />
        <main className="pb-[clamp(120px,18vh,220px)]">
          <Hero />
          <Ticker />
          <About />
          <Services />
          <Team />
          <CaseResults />
          <Regions />
          <Testimonial />
          <Blog />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
      <WhatsAppFloatingChat />
    </>
  );
}