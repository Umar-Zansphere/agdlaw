"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Mail,
  PhoneCall,
  Send,
  X,
  Clock,
  Calendar,
  Share2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const XBrandIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.9L5.9 22H2.8l7.3-8.3L1 2h6.3l4.4 6.3L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const WhatsAppIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

// ─── Blog Data ────────────────────────────────────────────────────────────────
// In production this would come from params/CMS. This file represents the
// template for /blog/[slug]/page.jsx — swap `POST` with your data-fetching.

const POST = {
  slug: "anticipatory-bail-guide-india",
  category: "Criminal Law",
  title: "Anticipatory Bail in India: What It Is and When You Need It",
  subtitle:
    "A pre-arrest bail can be the difference between freedom and custody. We break down Section 438 CrPC, who qualifies, and how the process works at the High Court.",
  author: "AGD Bala Kumar",
  authorRole: "Managing Counsel, AGD Law Associates",
  authorImg: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop",
  date: "March 18, 2025",
  readTime: "6 min read",
  heroImg: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1400&h=700&fit=crop",
  content: [
    {
      type: "lead",
      text: "Few situations are more distressing than facing the possibility of arrest — particularly when you believe the accusation is unjust or exaggerated. Indian law provides a powerful pre-emptive remedy: anticipatory bail under Section 438 of the Code of Criminal Procedure, 1973.",
    },
    {
      type: "h2",
      text: "What Is Anticipatory Bail?",
    },
    {
      type: "p",
      text: "Anticipatory bail is a direction by a Sessions Court or High Court that, in the event of an arrest, the applicant shall be released on bail. It does not prevent the police from making an arrest — but it ensures that any arrest is immediately followed by release.",
    },
    {
      type: "p",
      text: "The term 'anticipatory' reflects its prospective nature: you apply before any arrest is made. Once granted, the protection typically continues until the conclusion of the trial, unless specifically limited in duration by the court.",
    },
    {
      type: "callout",
      title: "Key Statutory Provision",
      text: "Section 438 CrPC: 'When any person has reason to believe that he may be arrested on an accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section that in the event of such arrest he shall be released on bail.'",
    },
    {
      type: "h2",
      text: "When Should You Apply?",
    },
    {
      type: "p",
      text: "You should consider filing for anticipatory bail as soon as you have a reasonable apprehension of arrest. Common triggers include receiving a notice or summons from police, being named in an FIR, knowledge that a complaint has been filed against you, statements by police or complainant indicating imminent action, or where a civil dispute is being converted into a criminal case.",
    },
    {
      type: "p",
      text: "Time is critical. Courts are more receptive to anticipatory bail applications filed before arrest. Once custody is taken, you are limited to regular bail applications — a longer and more uncertain route.",
    },
    {
      type: "h2",
      text: "Factors Courts Consider",
    },
    {
      type: "p",
      text: "Section 438(1) directs courts to consider: (a) the nature and gravity of the accusation; (b) the antecedents of the applicant; (c) the possibility of the applicant fleeing from justice; and (d) whether the accusation appears to be made with a view to humiliate or injure the applicant.",
    },
    {
      type: "highlight-list",
      items: [
        "Your prior criminal record (if any)",
        "Whether you are a flight risk or likely to abscond",
        "Whether you will tamper with evidence or influence witnesses",
        "The seriousness of the offence — courts are cautious with heinous crimes",
        "Whether the FIR appears to be a counter-blast in a civil dispute",
      ],
    },
    {
      type: "h2",
      text: "The Application Process at Madras High Court",
    },
    {
      type: "p",
      text: "Anticipatory bail applications may be filed before the Sessions Court (for serious cases, before the High Court directly). At the Madras High Court, the application is taken up in the Criminal Original jurisdiction. The typical flow is as follows:",
    },
    {
      type: "numbered-list",
      items: [
        "Brief the advocate and disclose all facts honestly, including the FIR number and case background.",
        "Counsel drafts and files the Criminal Original Petition under Section 438 CrPC.",
        "The matter is listed before a single judge in the Criminal Original jurisdiction.",
        "On the first date, an interim anticipatory bail order is sought. Courts often grant interim protection pending final hearing.",
        "Police and the state are heard. Affidavit-in-opposition is filed.",
        "Final arguments are heard and the order is passed — bail granted or rejected.",
      ],
    },
    {
      type: "h2",
      text: "Conditions Typically Imposed",
    },
    {
      type: "p",
      text: "Anticipatory bail is seldom unconditional. Common conditions include: availability for interrogation as and when required, surrender of passport, not tampering with evidence or influencing witnesses, and execution of a personal bond with sureties. Courts may also restrict travel outside the jurisdiction.",
    },
    {
      type: "callout",
      title: "Practical Tip",
      text: "Even if anticipatory bail is denied at the Sessions Court level, you retain the right to approach the High Court. Do not delay — file a fresh application immediately.",
    },
    {
      type: "h2",
      text: "What Happens If Bail Is Rejected?",
    },
    {
      type: "p",
      text: "If the High Court rejects anticipatory bail, you may approach the Supreme Court under Article 136 of the Constitution. In the meantime, if arrested, you must apply for regular bail before the Magistrate or Sessions Court depending on the offence category.",
    },
    {
      type: "h2",
      text: "How We Can Help",
    },
    {
      type: "p",
      text: "AGD Law Associates has an active criminal litigation practice before the Madras High Court and Sessions Courts across Tamil Nadu. We have successfully secured anticipatory bail in a wide range of matters including financial fraud, property disputes turned criminal, matrimonial offences, and cheque dishonour cases.",
    },
    {
      type: "p",
      text: "If you or someone you know faces the threat of arrest, act immediately. Delay can cost you your liberty. Contact us for a confidential consultation — we can assess your situation and advise on the best course of action within hours.",
    },
  ],
  relatedPosts: [
    {
      slug: "writ-petition-high-court-guide",
      category: "Constitutional Law",
      title: "When and How to File a Writ Petition at the Madras High Court",
      img: "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=400&h=260&fit=crop",
      readTime: "9 min read",
    },
    {
      slug: "consumer-court-how-to-file",
      category: "Consumer Protection",
      title: "How to File a Consumer Complaint: A Step-by-Step Guide",
      img: "https://plus.unsplash.com/premium_photo-1661720120987-9723da4de350?w=400&h=260&fit=crop",
      readTime: "5 min read",
    },
    {
      slug: "property-due-diligence-checklist",
      category: "Property Law",
      title: "The Essential Due Diligence Checklist Before Buying Property in Tamil Nadu",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=260&fit=crop",
      readTime: "8 min read",
    },
  ],
};

// ─── Header (minimal blog variant) ───────────────────────────────────────────

function BlogHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @keyframes headerSlideDown {
          from { opacity:0; transform:translateY(-16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .blog-header {
          animation: headerSlideDown 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        .scrolled-blog-header {
          background: rgba(11,11,11,0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
          border-bottom: 1px solid rgba(197,223,192,0.12);
        }
        .logo-badge {
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c5dfc0;
          opacity: 0.7;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          padding-top: 2px;
        }
      `}</style>
      <header className={`blog-header fixed top-0 left-0 right-0 z-[900] transition-all duration-500`}>
        <div className={`transition-all duration-500 ${scrolled ? "scrolled-blog-header" : ""}`}>
          <div className="max-w-[1200px] mx-auto px-6">
            <nav className="flex items-center justify-between h-[72px] gap-4">
              <Link
                href="/"
                className="flex flex-col no-underline group"
                aria-label="AGD Law Associates — Home"
              >
                <span
                  className="text-white leading-none transition-opacity group-hover:opacity-80"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1rem,4vw,1.45rem)",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  AGD LAW ASSOCIATES
                </span>
                <span className="logo-badge">Boutique Law Firm · Est. 2016</span>
              </Link>

              <div className="flex items-center gap-3 sm:gap-5">
                <Link
                  href="/#blog"
                  className="hidden sm:inline-flex items-center gap-1.5 text-[0.75rem] uppercase tracking-[0.1em] font-medium text-white/70 hover:text-[#c5dfc0] transition-colors"
                >
                  <ArrowLeft size={13} strokeWidth={2.5} />
                  All Articles
                </Link>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.09em] text-[#0b0b0b] bg-[#c5dfc0] px-4 py-2 rounded-full hover:bg-white transition-colors"
                >
                  Consult Us
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className="h-[72px]" />
    </>
  );
}

// ─── Article Content Renderer ─────────────────────────────────────────────────

function ArticleContent({ blocks }) {
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p
                key={i}
                className="text-[1.18rem] leading-[1.85] text-[#0b0b0b] font-normal mb-7"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="text-[clamp(1.4rem,1.1rem+1.2vw,1.85rem)] font-normal text-[#0b0b0b] mt-10 mb-4 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-[1rem] leading-[1.85] text-[#0b0b0b]/80 mb-5">
                {block.text}
              </p>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="relative my-8 rounded-2xl border border-[#c5dfc0] bg-[rgba(197,223,192,0.08)] p-6 pl-7"
              >
                <div
                  className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl bg-[#c5dfc0]"
                />
                <p
                  className="text-[0.7rem] uppercase tracking-[0.14em] font-semibold text-[#3a5c3d] mb-2"
                >
                  {block.title}
                </p>
                <p className="text-[0.95rem] leading-[1.75] text-[#0b0b0b]/75 italic">
                  {block.text}
                </p>
              </aside>
            );
          case "highlight-list":
            return (
              <ul key={i} className="my-6 flex flex-col gap-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[0.95rem] text-[#0b0b0b]/80 leading-[1.7]">
                    <span className="mt-[5px] w-5 h-5 flex-shrink-0 rounded-full bg-[#c5dfc0] inline-flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#0b0b0b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "numbered-list":
            return (
              <ol key={i} className="my-6 flex flex-col gap-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-[0.95rem] text-[#0b0b0b]/80 leading-[1.7]">
                    <span
                      className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full border border-[#c5dfc0] inline-flex items-center justify-center text-[0.72rem] font-semibold text-[#3a5c3d]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {j + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// ─── Share Bar ────────────────────────────────────────────────────────────────

function ShareBar({ title }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <XBrandIcon size={15} />,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon size={15} />,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon size={15} />,
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[0.72rem] uppercase tracking-[0.12em] font-semibold text-[#0b0b0b]/50">
        Share
      </span>
      {shareLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="w-9 h-9 rounded-full border border-[#c5dfc0] inline-flex items-center justify-center text-[#0b0b0b] hover:bg-[#c5dfc0] hover:border-[#c5dfc0] transition-colors"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

// ─── TOC ──────────────────────────────────────────────────────────────────────

function TableOfContents({ blocks }) {
  const headings = blocks.filter((b) => b.type === "h2");
  const [active, setActive] = useState(0);
  return (
    <nav className="flex flex-col gap-1">
      <p className="text-[0.68rem] uppercase tracking-[0.15em] font-semibold text-[#0b0b0b]/40 mb-2">
        Contents
      </p>
      {headings.map((h, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          className={`text-left text-[0.82rem] leading-[1.5] py-1.5 px-3 rounded-lg transition-all ${
            active === i
              ? "bg-[rgba(197,223,192,0.2)] text-[#3a5c3d] font-medium"
              : "text-[#0b0b0b]/60 hover:text-[#0b0b0b] hover:bg-[rgba(197,223,192,0.1)]"
          }`}
        >
          {h.text}
        </button>
      ))}
    </nav>
  );
}

// ─── Footer (blog variant) ────────────────────────────────────────────────────

function BlogFooter() {
  return (
    <footer className="bg-[#0b0b0b] py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span
            className="text-white text-lg"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}
          >
            AGD LAW ASSOCIATES
          </span>
          <span className="text-[#c5dfc0]/60 text-[0.65rem] uppercase tracking-[0.16em]">
            Boutique Law Firm · Est. 2016
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a
            href="mailto:agdlawassociatesoffice@gmail.com"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#c5dfc0] transition-colors text-[0.82rem]"
          >
            <Mail size={14} />
            agdlawassociatesoffice@gmail.com
          </a>
          <a
            href="tel:+919994388855"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#c5dfc0] transition-colors text-[0.82rem]"
          >
            <PhoneCall size={14} />
            +91 99943 88855
          </a>
        </div>
        <p className="text-white/35 text-[0.72rem]">
          © {new Date().getFullYear()} AGD Law Associates
        </p>
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
        className={`mb-3 w-[min(92vw,360px)] rounded-[22px] overflow-hidden border border-[#c5dfc0] bg-white shadow-[0_22px_60px_rgba(11,11,11,0.2)] transition-all duration-300 origin-bottom-right ${
          open
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
            aria-label="Close"
            className="w-8 h-8 rounded-full border border-white/20 inline-flex items-center justify-center hover:border-[#c5dfc0] hover:text-[#c5dfc0] transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <div className="p-4 bg-white space-y-3">
          <div className="max-w-[90%] bg-white border border-[#c5dfc0] text-[#0b0b0b] rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm leading-6">
            Hi, thanks for contacting AGD Law Associates. Select a message or type your query and continue on WhatsApp.
          </div>
          <div className="flex flex-wrap gap-2">
            {quickMessages.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMessage(item)}
                className="text-left text-[0.8rem] px-3 py-2 rounded-full border border-[#c5dfc0] text-[#0b0b0b] bg-white hover:bg-[#c5dfc0] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2 pt-1">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); openWhatsApp(); }
              }}
              placeholder="Type your message..."
              className="w-full resize-none rounded-2xl border border-[#c5dfc0] bg-white px-3 py-2.5 text-sm text-[#0b0b0b] placeholder:text-[#0b0b0b]/40 focus:outline-none focus:border-[#c5dfc0]"
            />
            <button
              type="button"
              onClick={() => openWhatsApp()}
              aria-label="Send"
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
        aria-label={open ? "Close" : "Open WhatsApp chat"}
        className={`group w-14 h-14 rounded-full shadow-[0_14px_35px_rgba(11,11,11,0.35)] inline-flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-[#0b0b0b] text-[#c5dfc0]"
            : "bg-[#c5dfc0] text-[#0b0b0b] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(197,223,192,0.45)]"
        }`}
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

// ─── Blog Article Page ────────────────────────────────────────────────────────

export default function BlogArticlePage() {
  const post = POST; // swap with data fetching from params in production

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

        :root {
          --theme-paper: #ffffff;
          --theme-ink: #0b0b0b;
          --theme-accent: #c5dfc0;
        }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0; padding: 0;
          font-family: 'Inter', system-ui, sans-serif;
          background-color: #fff;
          color: #0b0b0b;
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 400;
        }
        img { max-width: 100%; height: auto; }
        a[class] { text-decoration: none; }
        button { cursor: pointer; font-family: inherit; }
        :focus-visible { outline: 2px solid #c5dfc0; outline-offset: 2px; }

        .article-body h2 { margin-top: 2.5rem; margin-bottom: 1rem; }
        .article-body p { margin-bottom: 1.25rem; }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-in { animation: heroIn 0.75s cubic-bezier(0.22,1,0.36,1) 0.15s both; }

        .related-card {
          display: flex;
          flex-direction: column;
          border: 1px solid #e8f0e7;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
        }
        .related-card:hover {
          border-color: #c5dfc0;
          box-shadow: 0 16px 40px rgba(11,11,11,0.09);
          transform: translateY(-4px);
        }
        .related-card-img {
          width: 100%; aspect-ratio: 16/9; object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .related-card:hover .related-card-img { transform: scale(1.05); }
        .related-card-img-wrap { overflow: hidden; }

        .consult-strip {
          background: #0b0b0b;
          border-radius: 24px;
          padding: clamp(2rem,1.5rem+2vw,3rem);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
        }
        @media (min-width: 640px) {
          .consult-strip {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .blog-category-pill {
          display: inline-flex;
          align-items: center;
          background: rgba(197,223,192,0.15);
          border: 1px solid rgba(197,223,192,0.4);
          border-radius: 50px;
          padding: 4px 12px;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          color: #3a5c3d;
          width: fit-content;
        }

        .toc-sticky {
          position: sticky;
          top: 96px;
        }
      `}</style>

      <BlogHeader />

      <main>
        {/* ── Hero ── */}
        <section className="bg-white pb-0">
          <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-8 hero-in">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.1em] text-[#0b0b0b]/45 mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-[#3a5c3d] transition-colors">Home</Link>
              <ChevronRight size={12} className="opacity-40" />
              <Link href="/blog" className="hover:text-[#3a5c3d] transition-colors">Blog</Link>
              <ChevronRight size={12} className="opacity-40" />
              <span className="text-[#0b0b0b]/70 truncate max-w-[200px]">{post.category}</span>
            </nav>

            {/* Category + meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="blog-category-pill">{post.category}</span>
              <span className="flex items-center gap-1.5 text-[#0b0b0b]/45 text-[0.75rem]">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-[#0b0b0b]/45 text-[0.75rem]">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[clamp(2rem,1.3rem+3vw,3.4rem)] font-normal leading-[118%] text-[#0b0b0b] max-w-[900px] mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {post.title}
            </h1>

            {/* Subtitle */}
            <p className="text-[1.05rem] text-[#0b0b0b]/65 leading-[1.75] max-w-[780px] mb-8">
              {post.subtitle}
            </p>

            {/* Author + share row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-[#e8f0e7]">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorImg}
                  alt={post.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#c5dfc0]"
                />
                <div>
                  <p
                    className="text-[0.92rem] font-normal text-[#0b0b0b]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {post.author}
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.1em] text-[#0b0b0b]/50">
                    {post.authorRole}
                  </p>
                </div>
              </div>
              <ShareBar title={post.title} />
            </div>
          </div>

          {/* Hero image */}
          <div className="max-w-[1200px] mx-auto px-6 pb-0">
            <div className="overflow-hidden rounded-[28px]" style={{ maxHeight: "520px" }}>
              <img
                src={post.heroImg}
                alt={post.title}
                className="w-full object-cover"
                style={{ maxHeight: "520px" }}
              />
            </div>
          </div>
        </section>

        {/* ── Article body + sidebar ── */}
        <section className="bg-white pt-14 pb-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_280px] gap-14 items-start">
              {/* Article body */}
              <article>
                <ArticleContent blocks={post.content} />

                {/* Bottom share */}
                <div className="mt-12 pt-8 border-t border-[#e8f0e7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorImg}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#c5dfc0]"
                    />
                    <div>
                      <p
                        className="text-[0.95rem] font-normal text-[#0b0b0b]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {post.author}
                      </p>
                      <p className="text-[0.7rem] uppercase tracking-[0.1em] text-[#0b0b0b]/50">
                        {post.authorRole}
                      </p>
                    </div>
                  </div>
                  <ShareBar title={post.title} />
                </div>

                {/* Consult CTA strip */}
                <div className="consult-strip mt-14">
                  <div className="flex flex-col gap-2">
                    <span className="text-[0.68rem] uppercase tracking-[0.16em] text-[#c5dfc0]/70 font-semibold">
                      Need Legal Help?
                    </span>
                    <p
                      className="text-white text-[clamp(1.2rem,1rem+1vw,1.55rem)] font-normal leading-tight"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Talk to AGD Law Associates about your situation
                    </p>
                    <p className="text-white/50 text-[0.85rem] mt-1 max-w-[420px]">
                      Confidential consultation. No obligation. We handle criminal, civil, property, family, and corporate matters across Tamil Nadu.
                    </p>
                  </div>
                  <a
                    href="/#contact"
                    className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#c5dfc0] text-[#0b0b0b] text-[0.82rem] font-semibold uppercase tracking-[0.1em] hover:bg-white transition-colors"
                  >
                    Schedule Consultation
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                </div>
              </article>

              {/* Sticky Sidebar */}
              <aside className="toc-sticky hidden lg:flex flex-col gap-6">
                {/* TOC */}
                <div className="rounded-2xl border border-[#e8f0e7] p-5">
                  <TableOfContents blocks={post.content} />
                </div>

                {/* Quick contact */}
                <div className="rounded-2xl border border-[#c5dfc0] bg-[rgba(197,223,192,0.06)] p-5 flex flex-col gap-3">
                  <p
                    className="text-[1rem] font-normal text-[#0b0b0b] leading-snug"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Have a question about this topic?
                  </p>
                  <p className="text-[0.8rem] text-[#0b0b0b]/60 leading-relaxed">
                    Our team is available Monday–Friday 10am–6:30pm and Saturday 11am–5pm.
                  </p>
                  <a
                    href="tel:+919994388855"
                    className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-[#3a5c3d] hover:text-[#0b0b0b] transition-colors"
                  >
                    <PhoneCall size={14} />
                    +91 99943 88855
                  </a>
                  <a
                    href="/#contact"
                    className="mt-1 w-full text-center py-2.5 rounded-full bg-[#c5dfc0] text-[#0b0b0b] text-[0.78rem] font-semibold uppercase tracking-[0.09em] hover:bg-[#0b0b0b] hover:text-white transition-colors"
                  >
                    Free Consultation
                  </a>
                </div>

                {/* Article meta */}
                <div className="rounded-2xl border border-[#e8f0e7] p-5 flex flex-col gap-3">
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-[#0b0b0b]/40 font-semibold mb-1">
                    Article Details
                  </p>
                  <div className="flex items-center gap-2 text-[0.82rem] text-[#0b0b0b]/60">
                    <Calendar size={13} className="text-[#c5dfc0]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[0.82rem] text-[#0b0b0b]/60">
                    <Clock size={13} className="text-[#c5dfc0]" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[0.82rem] text-[#0b0b0b]/60">
                    <BookOpen size={13} className="text-[#c5dfc0]" />
                    <span>{post.category}</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Related Posts ── */}
        <section className="bg-[#f7fbf6] rounded-[40px_40px_0_0] pt-[clamp(2.5rem,1.5rem+3vw,4rem)] pb-[clamp(2.5rem,1.5rem+3vw,4rem)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-end justify-between gap-5 mb-8">
              <h2
                className="text-[clamp(1.5rem,1.2rem+1.5vw,2rem)] font-normal text-[#0b0b0b] leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Continue reading
              </h2>
              <a
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[0.78rem] uppercase tracking-[0.1em] font-semibold text-[#0b0b0b] hover:text-[#3a5c3d] transition-colors"
              >
                All articles
                <ArrowRight size={13} strokeWidth={2.5} />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {post.relatedPosts.map((r) => (
                <a key={r.slug} href={`/blog/${r.slug}`} className="related-card">
                  <div className="related-card-img-wrap">
                    <img src={r.img} alt={r.title} className="related-card-img" loading="lazy" />
                  </div>
                  <div className="flex flex-col gap-2.5 p-5">
                    <span className="blog-category-pill">{r.category}</span>
                    <h3
                      className="text-[0.98rem] font-normal leading-snug text-[#0b0b0b]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {r.title}
                    </h3>
                    <span className="flex items-center gap-1.5 text-[0.72rem] text-[#0b0b0b]/45 mt-auto">
                      <Clock size={11} />
                      {r.readTime}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
      <WhatsAppFloatingChat />
    </>
  );
}