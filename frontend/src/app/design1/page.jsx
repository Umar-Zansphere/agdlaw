"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Gavel,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#team", label: "Team" },
  { href: "#practice", label: "Practice Areas" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

const trustPoints = [
  "Madras High Court representation",
  "District courts and tribunals",
  "Consumer and commercial litigation",
  "Pan-Tamil Nadu matter handling",
];

const heroStats = [
  { value: "2016", label: "Established" },
  { value: "12+", label: "Years of founder practice" },
  { value: "500+", label: "Matters handled" },
];

const practiceAreas = [
  {
    icon: "shield",
    title: "Criminal Defence & Bail",
    summary:
      "Urgent representation across anticipatory bail, regular bail, trial strategy, FIR issues, and white-collar allegations.",
    matters: [
      "Anticipatory and regular bail",
      "FIR quashing and trial defence",
      "Cybercrime and financial fraud matters",
    ],
  },
  {
    icon: "landmark",
    title: "Civil & Property Disputes",
    summary:
      "Structured litigation and advisory support for ownership, possession, inheritance, recovery, and title-related disputes.",
    matters: [
      "Partition and inheritance disputes",
      "Title due diligence and injunctions",
      "Contractual and recovery suits",
    ],
  },
  {
    icon: "scale",
    title: "Writ & Constitutional Remedies",
    summary:
      "Focused action on judicial review, public law remedies, and challenges to statutory or governmental action.",
    matters: [
      "Writ petitions and service matters",
      "Public interest litigation support",
      "Challenges to arbitrary state action",
    ],
  },
  {
    icon: "gavel",
    title: "Family & Matrimonial Matters",
    summary:
      "Careful, confidential handling of family disputes where legal precision and humane pacing both matter.",
    matters: [
      "Mutual and contested divorce",
      "Custody, guardianship, maintenance",
      "Domestic violence proceedings",
    ],
  },
  {
    icon: "check",
    title: "Consumer, Accident & Rent Control",
    summary:
      "Relief-oriented representation for compensation, service deficiency, builder delay, insurance, and tenancy matters.",
    matters: [
      "Consumer complaints and compensation",
      "Motor accident claims",
      "Eviction and fair rent proceedings",
    ],
  },
  {
    icon: "brief",
    title: "Commercial Advisory & ADR",
    summary:
      "Practical legal support for businesses, founders, and stakeholders needing documents, negotiation, and dispute strategy.",
    matters: [
      "Contracts and compliance advisory",
      "Shareholder and partnership arrangements",
      "Arbitration, mediation, and award enforcement",
    ],
  },
];

const methodSteps = [
  {
    step: "01",
    title: "Initial Legal Assessment",
    body:
      "We review the facts, documents, urgency, and forum position before suggesting a practical course of action.",
  },
  {
    step: "02",
    title: "Strategy & Risk Mapping",
    body:
      "You get a clear roadmap covering immediate next steps, procedural risks, and the likely legal timeline.",
  },
  {
    step: "03",
    title: "Drafting & Representation",
    body:
      "Our team prepares filings, appearances, and communication with a strong focus on precision and responsiveness.",
  },
  {
    step: "04",
    title: "Progress Visibility",
    body:
      "We stay transparent through the matter so clients understand status, decisions, and upcoming milestones.",
  },
];

const results = [
  {
    category: "Criminal Law",
    title: "Anticipatory Bail Granted",
    description:
      "Urgent relief secured in a financial fraud matter before the Madras High Court within 72 hours of filing.",
    outcome: "Bail Granted",
    meta: "Madras High Court · 2024",
  },
  {
    category: "Property Dispute",
    title: "Title Decree in Favour",
    description:
      "Multi-generation agricultural property dispute resolved with a decree affirming clear ownership rights.",
    outcome: "Decree in Favour",
    meta: "District Court, Coimbatore · 2023",
  },
  {
    category: "Consumer Protection",
    title: "Builder Delay Compensation",
    description:
      "Compensation awarded against a leading builder for deficiency in service and delayed possession.",
    outcome: "₹18L Awarded",
    meta: "State Consumer Commission · 2024",
  },
  {
    category: "Family Law",
    title: "Custody Relief Secured",
    description:
      "Full child custody obtained for a parent in a contested family matter with structured visitation rights.",
    outcome: "Custody Secured",
    meta: "Family Court, Chennai · 2023",
  },
];

const articles = [
  {
    slug: "anticipatory-bail-guide-india",
    category: "Criminal Law",
    title: "Anticipatory Bail in India: What It Is and When You Need It",
    excerpt:
      "A practical guide to Section 438 CrPC, when urgent protection is available, and how timing affects outcomes.",
  },
  {
    slug: "property-due-diligence-checklist",
    category: "Property Law",
    title: "The Essential Due Diligence Checklist Before Buying Property in Tamil Nadu",
    excerpt:
      "A tighter checklist for title verification, encumbrance review, and pre-sale document scrutiny.",
  },
  {
    slug: "consumer-court-how-to-file",
    category: "Consumer Protection",
    title: "How to File a Consumer Complaint: A Step-by-Step Guide",
    excerpt:
      "Forum selection, complaint structure, and the documentation that makes a consumer matter stronger.",
  },
];

const faqs = [
  {
    q: "What forums do you represent clients before?",
    a: "We regularly appear before the Madras High Court, District Courts, Metropolitan Courts, Tribunals, and Consumer Disputes Redressal Commissions.",
  },
  {
    q: "Why choose AGD Law Associates?",
    a: "Clients come to us for direct involvement, clear communication, careful scrutiny of documents, and litigation strategy that stays practical as well as aggressive where needed.",
  },
  {
    q: "What types of legal matters do you handle?",
    a: "Our work spans criminal defence, civil disputes, writs, consumer matters, property, family law, arbitration, commercial advisory, MCOP, and RCOP matters.",
  },
  {
    q: "What are your office hours?",
    a: "Monday to Friday: 10:00 AM to 6:30 PM. Saturday: 11:00 AM to 5:00 PM. Second and last Saturdays are holidays.",
  },
  {
    q: "Where do you have active practice presence?",
    a: "We actively handle matters in Chennai, Tambaram, Avadi, Coimbatore, Tiruppur, Bangalore, and nearby districts including Chengalpattu, Tiruvallur, Kancheepuram, and Dindigul.",
  },
];

const officeRegions = [
  "Chennai, Tambaram, and Avadi",
  "Coimbatore, Tiruppur, and Bangalore",
  "Chengalpattu, Tiruvallur, Kancheepuram, and Dindigul",
];

const teamMembers = [
  {
    initials: "AB",
    name: "AGD Bala Kumar",
    role: "Managing Counsel",
    focus: "Criminal defence, civil disputes, constitutional remedies",
    experience: "12+ years",
  },
  {
    initials: "PS",
    name: "Priya Sundaram",
    role: "Senior Associate",
    focus: "Family and matrimonial law, custody, maintenance",
    experience: "8 years",
  },
  {
    initials: "KR",
    name: "Karthik Raj",
    role: "Associate Counsel",
    focus: "Commercial advisory, contract strategy, arbitration",
    experience: "5 years",
  },
  {
    initials: "ML",
    name: "Meena Lakshmi",
    role: "Associate Advocate",
    focus: "Property due diligence, title disputes, real estate matters",
    experience: "4 years",
  },
];

const serviceOptions = [
  { value: "criminal_defence", label: "Criminal defence & bail" },
  { value: "civil_property", label: "Civil & property disputes" },
  { value: "writ_constitutional", label: "Writ & constitutional remedies" },
  { value: "family_matrimonial", label: "Family & matrimonial matters" },
  { value: "consumer_accident", label: "Consumer, accident & rent control" },
  { value: "commercial_adr", label: "Commercial advisory & ADR" },
];

const timelineOptions = [
  { value: "immediate", label: "Immediate assistance" },
  { value: "within_week", label: "Within this week" },
  { value: "scheduled", label: "Scheduled consultation" },
];

function PracticeIcon({ icon }) {
  const className = "h-5 w-5";

  if (icon === "shield") return <ShieldCheck className={className} />;
  if (icon === "landmark") return <Landmark className={className} />;
  if (icon === "scale") return <Scale className={className} />;
  if (icon === "gavel") return <Gavel className={className} />;
  if (icon === "check") return <CheckCircle2 className={className} />;
  if (icon === "brief") return <BriefcaseBusiness className={className} />;

  return <ArrowUpRight className={className} />;
}

function SectionEyebrow({ children, invert = false }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${invert
          ? "border-white/15 bg-white/5 text-[#c5dfc0]"
          : "border-[#c5dfc0] bg-[#eef5ec] text-[#35513a]"
        }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function PrimaryButton({ href, children, className = "", ...props }) {
  return (
    <a
      href={href}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#c5dfc0] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0b0b0b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SecondaryButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-[#c5dfc0] hover:bg-[#c5dfc0] hover:text-[#0b0b0b] ${className}`}
    >
      {children}
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-[#0b0b0b]/92 shadow-2xl backdrop-blur-xl" : ""
          }`}
      >
        <div className="border-b border-white/10 bg-[#0b0b0b] text-white/75">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-2 text-[0.72rem] uppercase tracking-[0.18em]">
            <p className="hidden sm:block">Boutique law firm · Chennai · Established 2016</p>
            <div className="ml-auto flex items-center gap-4 text-white/70">
              <a href="tel:+919994388855" className="hover:text-[#c5dfc0]">
                +91 99943 88855
              </a>
              <a
                href="mailto:agdlawassociatesoffice@gmail.com"
                className="hidden hover:text-[#c5dfc0] md:block"
              >
                agdlawassociatesoffice@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 text-white">
          <Link href="/" className="min-w-0 no-underline">
            <div className="agd-display text-[1.65rem] leading-none tracking-[0.08em]">
              AGD LAW ASSOCIATES
            </div>
            <div className="mt-1 text-[0.65rem] uppercase tracking-[0.26em] text-[#c5dfc0]/70">
              Precision. Strategy. Results.
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-[#c5dfc0]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <PrimaryButton href="#contact">Schedule consultation</PrimaryButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5 -rotate-90" />}
          </button>
        </div>
      </header>

      <div className="h-[114px] sm:h-[116px]" />

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0b0b0b]/98 px-6 pt-36 text-white lg:hidden">
          <div className="mx-auto flex max-w-[520px] flex-col gap-6">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-4 text-[1.35rem]"
              >
                <span className="agd-display">{link.label}</span>
                <span className="text-[0.75rem] uppercase tracking-[0.22em] text-[#c5dfc0]">
                  0{index + 1}
                </span>
              </a>
            ))}
            <PrimaryButton href="#contact" className="mt-4 w-full" onClick={() => setMenuOpen(false)}>
              Schedule consultation
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] pb-16 pt-10 text-white sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,223,192,0.28),transparent_33%),radial-gradient(circle_at_bottom_right,rgba(197,223,192,0.14),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-y-16 right-[8%] hidden w-px bg-white/8 lg:block" />

      <div className="relative mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="max-w-[720px]">
          <SectionEyebrow invert>Litigation & advisory support across key practice areas</SectionEyebrow>
          <h1 className="agd-display mt-6 text-[clamp(3.3rem,7vw,6.6rem)] leading-[0.92] text-white">
            Legal counsel built for decisive moments.
          </h1>
          <p className="mt-6 max-w-[640px] text-[1.02rem] leading-8 text-white/72 sm:text-[1.1rem]">
            AGD Law Associates is a Chennai-based boutique law firm focused on
            litigation strength, practical legal strategy, and clear client
            communication across criminal, civil, constitutional, family, and
            commercial matters.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="#contact">Request consultation</PrimaryButton>
            <SecondaryButton href="tel:+919994388855">
              Call now
              <Phone className="h-4 w-4" />
            </SecondaryButton>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-white/12 bg-white/5 px-5 py-5 backdrop-blur-sm"
              >
                <div className="agd-display text-4xl text-[#c5dfc0]">{item.value}</div>
                <p className="mt-2 text-[0.78rem] uppercase tracking-[0.18em] text-white/65">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="relative overflow-hidden rounded-[28px]">
              <Image
                src="/image.webp"
                loading="eager"
                alt="AGD Law Associates team"
                width={1200}
                height={1400}
                className="h-[520px] w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.04),rgba(11,11,11,0.58))]" />
              {/* <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-[24px] border border-white/12 bg-[#0b0b0b]/72 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#c5dfc0]">
                        Court-facing legal team
                      </p>
                      <p className="mt-2 agd-display text-[1.9rem] leading-none">
                        Chennai office. Regional reach.
                      </p>
                    </div>
                    <div className="rounded-full border border-white/15 bg-white/5 p-3">
                      <ArrowUpRight className="h-5 w-5 text-[#c5dfc0]" />
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                        Forums
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/80">
                        High Court, District Courts, Tribunals, and Consumer Commissions.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                        Approach
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/80">
                        Direct involvement, transparent updates, and precision in filings.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[#c5dfc0]/25 bg-[#c5dfc0]/10 p-5 text-white">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#c5dfc0]">
                Coverage
              </p>
              <p className="mt-2 text-sm leading-7 text-white/76">
                Active matter handling across Chennai, Coimbatore, Tiruppur, Bangalore, and nearby districts.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-white">
              <p className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#c5dfc0]">
                <Clock3 className="h-4 w-4" />
                Consultation desk
              </p>
              <p className="mt-2 text-sm leading-7 text-white/76">
                Monday to Friday: 10:00 AM to 6:30 PM
                <br />
                Saturday: 11:00 AM to 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-[#dce8d9] bg-white py-5">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#537258]">
          Built for high-stakes matters and practical outcomes
        </p>
        <div className="flex flex-wrap gap-3">
          {trustPoints.map((item) => (
            <div
              key={item}
              className="rounded-full border border-[#d9e7d6] bg-[#f7fbf6] px-4 py-2 text-[0.78rem] font-medium text-[#35513a]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section id="overview" className="bg-white py-[4.5rem] sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionEyebrow>Firm overview</SectionEyebrow>
          <h2 className="agd-display mt-5 text-[clamp(2.7rem,5vw,4.5rem)] leading-[0.96] text-[#111]">
            A cleaner legal experience for complicated cases.
          </h2>
          <p className="mt-5 max-w-[430px] text-[1rem] leading-8 text-[#475447]">
            The redesigned homepage now puts decision-making first: what the
            firm does, how it works, where it appears, and how a client can move
            forward without having to scan through repetitive sections.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#35513a]">
            <span className="rounded-full border border-[#c5dfc0] bg-[#eef5ec] px-4 py-2">
              Direct lawyer access
            </span>
            <span className="rounded-full border border-[#c5dfc0] bg-[#eef5ec] px-4 py-2">
              Court-ready strategy
            </span>
            <span className="rounded-full border border-[#c5dfc0] bg-[#eef5ec] px-4 py-2">
              Transparent communication
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <article className="grid gap-6 rounded-[34px] bg-[#0b0b0b] p-6 text-white sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src="/hero_bg.webp"
                alt="AGD Law Associates office interior"
                width={1600}
                height={1067}
                className="h-full min-h-[300px] w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#c5dfc0]">
                  Founder note
                </p>
                <h3 className="agd-display mt-4 text-[2.2rem] leading-none">
                  Litigation discipline with a boutique-firm pace.
                </h3>
                <p className="mt-5 text-[0.98rem] leading-8 text-white/72">
                  AGD Bala Kumar leads the firm with over 12 years of practice,
                  combining courtroom advocacy with advisory support that stays
                  practical, responsive, and sharply documented.
                </p>
              </div>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/55">
                  Active practice presence
                </p>
                <div className="mt-3 grid gap-3">
                  {officeRegions.map((region) => (
                    <div key={region} className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#c5dfc0]" />
                      <p className="text-sm leading-6 text-white/80">{region}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[34px] border border-[#dbe8d8] bg-[#f7fbf6] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#537258]">
                  Working method
                </p>
                <h3 className="agd-display mt-3 text-[2.35rem] leading-none text-[#111]">
                  Clear steps. Fewer blind spots.
                </h3>
              </div>
              <p className="max-w-[340px] text-sm leading-7 text-[#516050]">
                The page now explains the firm process directly so potential
                clients understand what happens after they make contact.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {methodSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-[26px] border border-[#dbe8d8] bg-white p-5 shadow-[0_16px_32px_rgba(11,11,11,0.04)]"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#537258]">
                    Step {item.step}
                  </p>
                  <h4 className="mt-3 text-[1.25rem] font-semibold text-[#111]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-[#526052]">{item.body}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="bg-[#f7fbf6] py-[4.5rem] sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[700px]">
            <SectionEyebrow>Our team</SectionEyebrow>
            <h2 className="agd-display mt-5 text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95] text-[#111]">
              The people behind the firm&apos;s courtroom discipline.
            </h2>
          </div>
          <p className="max-w-[420px] text-[0.98rem] leading-8 text-[#4f5d4e]">
            This brings the team back into the homepage in a cleaner format,
            with stronger hierarchy and without breaking the new layout rhythm.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group rounded-[30px] border border-[#dbe8d8] bg-white p-6 shadow-[0_18px_36px_rgba(11,11,11,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c5dfc0] hover:shadow-[0_24px_48px_rgba(11,11,11,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#0b0b0b] text-[1.05rem] font-semibold uppercase tracking-[0.12em] text-[#c5dfc0]">
                  {member.initials}
                </div>
                <span className="rounded-full border border-[#dbe8d8] bg-[#f7fbf6] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#537258]">
                  {member.experience}
                </span>
              </div>

              <h3 className="mt-6 agd-display text-[2rem] leading-none text-[#111]">
                {member.name}
              </h3>
              <p className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#537258]">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-7 text-[#526052]">{member.focus}</p>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[#35513a] transition-colors hover:text-[#111]"
              >
                Consult with the team
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticeSection() {
  return (
    <section id="practice" className="bg-[#0b0b0b] py-[4.5rem] text-white sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[700px]">
            <SectionEyebrow invert>Practice areas</SectionEyebrow>
            <h2 className="agd-display mt-5 text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.95]">
              Consolidated services, better hierarchy, stronger readability.
            </h2>
          </div>
          <p className="max-w-[420px] text-[0.98rem] leading-8 text-white/66">
            Instead of a long hover-driven list, the homepage now uses grouped
            service cards so visitors can scan practice coverage quickly on both
            desktop and mobile.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {practiceAreas.map((area) => (
            <article
              key={area.title}
              className="group rounded-[30px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c5dfc0]/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5dfc0]/25 bg-[#c5dfc0]/12 text-[#c5dfc0]">
                  <PracticeIcon icon={area.icon} />
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                  Advisory + litigation
                </span>
              </div>
              <h3 className="mt-5 agd-display text-[2rem] leading-none text-white">
                {area.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/68">{area.summary}</p>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                {area.matters.map((matter) => (
                  <div key={matter} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c5dfc0]" />
                    <p className="text-sm leading-6 text-white/84">{matter}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="results" className="bg-white py-[4.5rem] sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <SectionEyebrow>Results & insights</SectionEyebrow>
            <h2 className="agd-display mt-5 text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95] text-[#111]">
              A homepage that proves credibility before asking for action.
            </h2>
          </div>
          <p className="max-w-[420px] text-[0.98rem] leading-8 text-[#4f5d4e]">
            The case result section now carries more weight, and the insight
            links sit beside it instead of feeling like a separate mini-site.
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="rounded-[34px] bg-[#0b0b0b] p-6 text-white sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[26px] border border-white/10 bg-white/5 p-5"
                >
                  <span className="inline-flex rounded-full border border-[#c5dfc0]/20 bg-[#c5dfc0]/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#c5dfc0]">
                    {item.category}
                  </span>
                  <h3 className="mt-4 agd-display text-[1.8rem] leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">{item.description}</p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="inline-flex rounded-full bg-[#c5dfc0] px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#0b0b0b]">
                      {item.outcome}
                    </div>
                    <p className="mt-3 text-[0.76rem] uppercase tracking-[0.18em] text-white/45">
                      {item.meta}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-[#dbe8d8] bg-[#f7fbf6] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#537258]">
                  Legal insights
                </p>
                <h3 className="agd-display mt-3 text-[2.2rem] leading-none text-[#111]">
                  Read before you act.
                </h3>
              </div>
              <Link
                href="/blog"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#c5dfc0] bg-white text-[#111] transition-colors hover:bg-[#c5dfc0]"
                aria-label="View all articles"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block rounded-[26px] border border-[#dbe8d8] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c5dfc0] hover:shadow-[0_18px_36px_rgba(11,11,11,0.06)]"
                >
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#537258]">
                    {article.category}
                  </span>
                  <h4 className="mt-3 text-[1.12rem] font-semibold leading-7 text-[#111]">
                    {article.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-[#526052]">{article.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[#35513a]">
                    Read article
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-[#0b0b0b] py-[4.5rem] text-white sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionEyebrow invert>FAQs</SectionEyebrow>
          <h2 className="agd-display mt-5 text-[clamp(2.8rem,5vw,4.4rem)] leading-[0.95]">
            Fewer generic claims. More client clarity.
          </h2>
          <p className="mt-5 max-w-[420px] text-[1rem] leading-8 text-white/68">
            The FAQ area is now positioned as a decision aid, with cleaner
            spacing, stronger contrast, and a shorter path from question to
            contact.
          </p>
          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#c5dfc0]">
              Need a direct answer?
            </p>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Use the consultation form or call during office hours if your
              matter needs immediate assessment.
            </p>
            <PrimaryButton href="#contact" className="mt-5">
              Speak with the firm
            </PrimaryButton>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.q}
                className={`rounded-[28px] border px-5 py-5 transition-all sm:px-6 ${isOpen
                    ? "border-[#c5dfc0]/30 bg-[#c5dfc0]/10"
                    : "border-white/10 bg-white/5"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-[1.08rem] font-semibold leading-7 text-white">
                    {faq.q}
                  </span>
                  <span
                    className={`mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${isOpen
                        ? "rotate-180 border-[#c5dfc0] bg-[#c5dfc0] text-[#0b0b0b]"
                        : "border-white/15 bg-white/5 text-white"
                      }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-4 max-w-[760px] pr-12 text-sm leading-7 text-white/72">
                    {faq.a}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
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

  const selectPill = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.service_type || !form.budget) {
      setSubmitState({
        type: "error",
        message: "Please select a service area and preferred timeline.",
      });
      return;
    }

    const serviceLabel =
      serviceOptions.find((item) => item.value === form.service_type)?.label ||
      form.service_type;
    const budgetLabel =
      timelineOptions.find((item) => item.value === form.budget)?.label ||
      form.budget;

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
        message: "Thanks, your message was sent successfully. We will contact you soon.",
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

  const chipClass = (active) =>
    `rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-300 ${active
      ? "border-[#c5dfc0] bg-[#c5dfc0] text-[#0b0b0b] shadow-[0_14px_28px_rgba(197,223,192,0.35)]"
      : "border-[#dbe8d8] bg-white text-[#2f3c30] hover:border-[#c5dfc0] hover:bg-[#f7fbf6]"
    }`;

  return (
    <section id="contact" className="bg-white py-[4.5rem] sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-6 lg:grid-cols-[0.88fr_1.12fr]">
        <aside className="overflow-hidden rounded-[36px] bg-[#0b0b0b] text-white">
          <div className="border-b border-white/10 p-7 sm:p-8">
            <SectionEyebrow invert>Contact</SectionEyebrow>
            <h2 className="agd-display mt-5 text-[clamp(2.7rem,5vw,4.2rem)] leading-[0.95]">
              Start with the right conversation.
            </h2>
            <p className="mt-5 max-w-[430px] text-[0.98rem] leading-8 text-white/68">
              This redesigned contact block separates firm information from the
              action form, making the conversion path much easier to scan.
            </p>
          </div>

          <div className="space-y-6 p-7 sm:p-8">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-[#c5dfc0]" />
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                    Office
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/78">
                    No.5c, 5th Floor, Sri Venkatesh Bhavan,
                    <br />
                    No.75/31, Armenian Street,
                    <br />
                    Chennai - 600001
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <Phone className="h-5 w-5 text-[#c5dfc0]" />
                <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                  Call us
                </p>
                <a
                  href="tel:+919994388855"
                  className="mt-2 block text-[1rem] font-semibold leading-7 text-white hover:text-[#c5dfc0]"
                >
                  99943 88855 / 89395 88855
                </a>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <Mail className="h-5 w-5 text-[#c5dfc0]" />
                <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                  Email
                </p>
                <a
                  href="mailto:agdlawassociatesoffice@gmail.com"
                  className="mt-2 block break-all text-[1rem] font-semibold leading-7 text-white hover:text-[#c5dfc0]"
                >
                  agdlawassociatesoffice@gmail.com
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                Office hours
              </p>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Monday to Friday: 10:00 AM to 6:30 PM
                <br />
                Saturday: 11:00 AM to 5:00 PM
                <br />
                Second and last Saturdays are holidays.
              </p>
            </div>
          </div>
        </aside>

        <div className="rounded-[36px] border border-[#dbe8d8] bg-[#f7fbf6] p-7 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#537258]">
                Consultation request
              </p>
              <h3 className="agd-display mt-3 text-[2.5rem] leading-none text-[#111]">
                Tell us what you need.
              </h3>
            </div>
            <p className="max-w-[320px] text-sm leading-7 text-[#526052]">
              Service and timeline chips stay, but they now sit in a cleaner,
              better-balanced form layout.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#35513a]">
                Select service area
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
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

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#35513a]">
                Preferred timeline
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {timelineOptions.map((timeline) => (
                  <button
                    key={timeline.value}
                    type="button"
                    onClick={() => selectPill("budget", timeline.value)}
                    className={chipClass(form.budget === timeline.value)}
                    aria-pressed={form.budget === timeline.value}
                  >
                    {timeline.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#35513a]">
                  Your name
                </span>
                <input
                  type="text"
                  name="your_name"
                  value={form.your_name}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full rounded-[22px] border border-[#dbe8d8] bg-white px-4 py-4 text-[1rem] text-[#111] outline-none transition-colors focus:border-[#c5dfc0]"
                  placeholder="John Doe"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#35513a]">
                  Your email
                </span>
                <input
                  type="email"
                  name="your_email"
                  value={form.your_email}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full rounded-[22px] border border-[#dbe8d8] bg-white px-4 py-4 text-[1rem] text-[#111] outline-none transition-colors focus:border-[#c5dfc0]"
                  placeholder="john@example.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#35513a]">
                Details
              </span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="mt-3 w-full rounded-[24px] border border-[#dbe8d8] bg-white px-4 py-4 text-[1rem] text-[#111] outline-none transition-colors focus:border-[#c5dfc0]"
                placeholder="Share brief details about the matter, urgency, or documents involved."
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b0b0b] px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send message"}
                <ArrowRight className="h-4 w-4" />
              </button>
              {submitState.message && (
                <p
                  className={`text-sm ${submitState.type === "success" ? "text-[#35513a]" : "text-[#8d2e2e]"
                    }`}
                >
                  {submitState.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b] py-10 text-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-6 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <div className="agd-display text-[2rem] leading-none tracking-[0.08em]">
            AGD LAW ASSOCIATES
          </div>
          <p className="mt-4 max-w-[360px] text-sm leading-7 text-white/68">
            Boutique law firm serving clients across litigation and advisory
            matters with a focused black, white, and sage visual identity that
            now feels more premium and structured.
          </p>
        </div>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#c5dfc0]">
            Navigation
          </p>
          <div className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-white/72 transition-colors hover:text-[#c5dfc0]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#c5dfc0]">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/72">
            <a href="tel:+919994388855" className="block hover:text-[#c5dfc0]">
              +91 99943 88855
            </a>
            <a
              href="mailto:agdlawassociatesoffice@gmail.com"
              className="block break-all hover:text-[#c5dfc0]"
            >
              agdlawassociatesoffice@gmail.com
            </a>
            <a
              href="https://www.agdlawassociates.in"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#c5dfc0]"
            >
              www.agdlawassociates.in
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1280px] border-t border-white/10 px-6 pt-6 text-sm text-white/50">
        © {new Date().getFullYear()} AGD Law Associates. All rights reserved.
      </div>
    </footer>
  );
}

function WhatsAppFloatingChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "919994388855";

  const quickMessages = [
    "Hi, I need a legal consultation with AGD Law Associates.",
    "I want to discuss a criminal matter.",
    "Please schedule a consultation call.",
  ];

  const openWhatsApp = (textToSend) => {
    const finalMessage = (textToSend || message).trim();
    if (!finalMessage) return;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      <div
        className={`mb-3 w-[min(92vw,340px)] overflow-hidden rounded-[24px] border border-[#c5dfc0] bg-white shadow-[0_24px_60px_rgba(11,11,11,0.24)] transition-all duration-300 ${open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
          }`}
      >
        <div className="flex items-center justify-between bg-[#0b0b0b] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#c5dfc0] text-[#0b0b0b]">
              <MessageCircle className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">AGD Legal Desk</p>
              <p className="text-[0.72rem] text-[#c5dfc0]">Replies during office hours</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15"
            aria-label="Close WhatsApp chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <p className="rounded-[20px] border border-[#dbe8d8] bg-[#f7fbf6] px-4 py-3 text-sm leading-6 text-[#2f3c30]">
            Select a prompt or type a message and continue on WhatsApp.
          </p>

          <div className="flex flex-wrap gap-2">
            {quickMessages.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMessage(item)}
                className="rounded-full border border-[#dbe8d8] px-3 py-2 text-left text-[0.8rem] text-[#2f3c30] transition-colors hover:border-[#c5dfc0] hover:bg-[#f7fbf6]"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <textarea
              rows={2}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  openWhatsApp();
                }
              }}
              className="w-full resize-none rounded-[20px] border border-[#dbe8d8] px-4 py-3 text-sm text-[#111] outline-none focus:border-[#c5dfc0]"
              placeholder="Type your message..."
            />
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#c5dfc0] text-[#0b0b0b] transition-colors hover:bg-[#0b0b0b] hover:text-white"
              aria-label="Send to WhatsApp"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {!open && (
        <p className="mb-2 rounded-full bg-[#0b0b0b] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#c5dfc0]">
          Chat with AGD
        </p>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`inline-flex h-14 w-14 items-center justify-center rounded-full shadow-[0_16px_34px_rgba(11,11,11,0.28)] transition-all duration-300 ${open ? "bg-[#0b0b0b] text-[#c5dfc0]" : "bg-[#c5dfc0] text-[#0b0b0b]"
          }`}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        :root {
          --agd-display: 'Cormorant Garamond', Georgia, serif;
          --agd-body: 'Manrope', system-ui, sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: var(--agd-body);
          background: #ffffff;
          color: #111111;
          -webkit-font-smoothing: antialiased;
        }

        .agd-display {
          font-family: var(--agd-display);
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        ::selection {
          background: rgba(197, 223, 192, 0.7);
          color: #0b0b0b;
        }
      `}</style>

      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <OverviewSection />
        <TeamSection />
        <PracticeSection />
        <ResultsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatingChat />
    </>
  );
}
