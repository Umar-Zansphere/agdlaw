"use client";

import { useEffect, useState } from "react";
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
  BookOpen,
  ChevronRight,
} from "lucide-react";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/data/blog-posts";

const XBrandIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.9L5.9 22H2.8l7.3-8.3L1 2h6.3l4.4 6.3L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

function slugifyText(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function BlogStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', system-ui, sans-serif;
        background-color: #0b0b0b;
        color: #ffffff;
        -webkit-font-smoothing: antialiased;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Playfair Display', Georgia, serif;
        font-weight: 400;
      }
      img { max-width: 100%; height: auto; display: block; }
      a[class] { text-decoration: none; }
      button { cursor: pointer; font-family: inherit; }
      :focus-visible { outline: 2px solid #c5dfc0; outline-offset: 2px; }

      .fixed-bg {
        position: fixed;
        inset: 0;
        z-index: 0;
        background: #0b0b0b;
        overflow: hidden;
      }
      .fixed-bg-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 900px;
        height: 900px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(197,223,192,0.12) 0%, transparent 70%);
        pointer-events: none;
      }
      .fixed-bg-vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.72) 100%);
      }
      .scroll-layer {
        position: relative;
        z-index: 10;
      }

      @keyframes headerSlideDown {
        from { opacity: 0; transform: translateY(-16px); }
        to { opacity: 1; transform: translateY(0); }
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

      .article-body h2 { margin-top: 2.5rem; margin-bottom: 1rem; }
      .article-body p { margin-bottom: 1.25rem; }

      @keyframes heroIn {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hero-in { animation: heroIn 0.75s cubic-bezier(0.22,1,0.36,1) 0.15s both; }

      .blog-category-pill {
        display: inline-flex;
        align-items: center;
        background: rgba(197,223,192,0.1);
        border: 1px solid rgba(197,223,192,0.24);
        border-radius: 50px;
        padding: 4px 12px;
        font-size: 0.65rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        font-weight: 600;
        color: #c5dfc0;
        width: fit-content;
      }

      .surface-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(197,223,192,0.14);
        backdrop-filter: blur(16px);
      }
      .surface-card:hover {
        border-color: rgba(197,223,192,0.28);
      }

      .related-card {
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(197,223,192,0.14);
        border-radius: 20px;
        overflow: hidden;
        color: inherit;
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(16px);
        transition: border-color 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
      }
      .related-card:hover {
        border-color: rgba(197,223,192,0.28);
        box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        transform: translateY(-4px);
      }
      .related-card-img {
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
        transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
      }
      .related-card:hover .related-card-img { transform: scale(1.05); }
      .related-card-img-wrap { overflow: hidden; }

      .index-featured-card {
        transition: border-color 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
      }
      .index-featured-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 48px rgba(0,0,0,0.18);
      }
      .index-featured-img,
      .index-grid-img {
        transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
      }
      .index-featured-card:hover .index-featured-img,
      .related-card:hover .index-grid-img {
        transform: scale(1.05);
      }

      .consult-strip {
        background: #0b0b0b;
        border: 1px solid rgba(197,223,192,0.14);
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

      .toc-sticky {
        position: sticky;
        top: 96px;
      }
    `}</style>
  );
}

function FixedBackground() {
  return (
    <div className="fixed-bg" aria-hidden="true">
      <img
        src="https://images.pexels.com/photos/9685285/pexels-photo-9685285.jpeg"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.68)",
          zIndex: 2,
        }}
      />
      <div className="fixed-bg-glow" style={{ zIndex: 3 }} />
      <div className="fixed-bg-vignette" style={{ zIndex: 4 }} />
    </div>
  );
}

function BlogHeader({ backHref = "/blog", backLabel = "All Articles" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header className="blog-header fixed top-0 left-0 right-0 z-[900] transition-all duration-500">
        <div className={`transition-all duration-500 ${scrolled ? "scrolled-blog-header" : ""}`}>
          <div className="max-w-[1200px] mx-auto px-6">
            <nav className="flex items-center justify-between h-[72px] gap-4">
              <Link
                href="/"
                className="flex flex-col no-underline group"
                aria-label="AGD Law Associates - Home"
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
                <span className="logo-badge">Boutique Law Firm - Est. 2016</span>
              </Link>

              <div className="flex items-center gap-3 sm:gap-5">
                <Link
                  href={backHref}
                  className="hidden sm:inline-flex items-center gap-1.5 text-[0.75rem] uppercase tracking-[0.1em] font-medium text-white/70 hover:text-[#c5dfc0] transition-colors"
                >
                  <ArrowLeft size={13} strokeWidth={2.5} />
                  {backLabel}
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.09em] text-[#0b0b0b] bg-[#c5dfc0] px-4 py-2 rounded-full hover:bg-white transition-colors"
                >
                  Consult Us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className="h-[72px]" />
    </>
  );
}

function ArticleContent({ blocks }) {
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p
                key={i}
                className="text-[1.18rem] leading-[1.85] text-white/88 font-normal mb-7"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {block.text}
              </p>
            );
          case "h2": {
            const sectionId = `section-${slugifyText(block.text)}`;

            return (
              <h2
                id={sectionId}
                key={i}
                className="scroll-mt-28 text-[clamp(1.4rem,1.1rem+1.2vw,1.85rem)] font-normal text-white mt-10 mb-4 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {block.text}
              </h2>
            );
          }
          case "p":
            return (
              <p key={i} className="text-[1rem] leading-[1.85] text-white/60 mb-5">
                {block.text}
              </p>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="relative my-8 rounded-2xl border border-[rgba(197,223,192,0.18)] bg-[rgba(255,255,255,0.04)] p-6 pl-7 backdrop-blur-xl"
              >
                <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl bg-[#c5dfc0]" />
                <p className="text-[0.7rem] uppercase tracking-[0.14em] font-semibold text-[#c5dfc0] mb-2">
                  {block.title}
                </p>
                <p className="text-[0.95rem] leading-[1.75] text-white/68 italic">
                  {block.text}
                </p>
              </aside>
            );
          case "highlight-list":
            return (
              <ul key={i} className="my-6 flex flex-col gap-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[0.95rem] text-white/62 leading-[1.7]">
                    <span className="mt-[5px] w-5 h-5 flex-shrink-0 rounded-full bg-[#c5dfc0] inline-flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#0b0b0b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
                  <li key={j} className="flex items-start gap-4 text-[0.95rem] text-white/62 leading-[1.7]">
                    <span
                      className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full border border-[rgba(197,223,192,0.3)] inline-flex items-center justify-center text-[0.72rem] font-semibold text-[#c5dfc0]"
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
      <span className="text-[0.72rem] uppercase tracking-[0.12em] font-semibold text-white/40">
        Share
      </span>
      {shareLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="w-9 h-9 rounded-full border border-[rgba(197,223,192,0.25)] inline-flex items-center justify-center text-[#c5dfc0] hover:bg-[#c5dfc0] hover:border-[#c5dfc0] hover:text-[#0b0b0b] transition-colors"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

function TableOfContents({ blocks }) {
  const headings = blocks.filter((block) => block.type === "h2");
  const [active, setActive] = useState(0);

  const handleSelect = (index, text) => {
    setActive(index);

    if (typeof document === "undefined") return;

    const target = document.getElementById(`section-${slugifyText(text)}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="flex flex-col gap-1">
      <p className="text-[0.68rem] uppercase tracking-[0.15em] font-semibold text-white/35 mb-2">
        Contents
      </p>
      {headings.map((heading, index) => (
        <button
          key={heading.text}
          type="button"
          onClick={() => handleSelect(index, heading.text)}
          className={`text-left text-[0.82rem] leading-[1.5] py-1.5 px-3 rounded-lg transition-all ${active === index
              ? "bg-[rgba(197,223,192,0.12)] text-[#c5dfc0] font-medium"
              : "text-white/50 hover:text-white hover:bg-[rgba(197,223,192,0.08)]"
            }`}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );
}

function BlogFooter() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-[rgba(197,223,192,0.08)] py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span
            className="text-white text-lg"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}
          >
            AGD LAW ASSOCIATES
          </span>
          <span className="text-[#c5dfc0]/60 text-[0.65rem] uppercase tracking-[0.16em]">
            Boutique Law Firm - Est. 2016
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/blog"
            className="text-white/60 hover:text-[#c5dfc0] transition-colors text-[0.82rem]"
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            className="text-white/60 hover:text-[#c5dfc0] transition-colors text-[0.82rem]"
          >
            Contact
          </Link>
          <a
            href="mailto:agdlawassociatesoffice@gmail.com"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#c5dfc0] transition-colors text-[0.82rem]"
          >
            <Mail size={14} />
            agdlawassociatesoffice@gmail.com
          </a>
          <a
            href="tel:+918939588855"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#c5dfc0] transition-colors text-[0.82rem]"
          >
            <PhoneCall size={14} />
            +91 89395 88855
          </a>
        </div>
        <p className="text-white/35 text-[0.72rem]">
          &copy; {new Date().getFullYear()} AGD Law Associates
        </p>
      </div>
    </footer>
  );
}

function WhatsAppFloatingChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "918939588855";

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
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  openWhatsApp();
                }
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
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close" : "Open WhatsApp chat"}
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

function IndexFeaturedPost({ post }) {
  if (!post) return null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="index-featured-card surface-card grid overflow-hidden rounded-[28px] lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="overflow-hidden">
        <img
          src={post.heroImg}
          alt={post.title}
          className="index-featured-img h-full min-h-[280px] w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-7 md:p-8">
        <span className="blog-category-pill">{post.category}</span>
        <h2
          className="text-[clamp(1.5rem,1.2rem+1.5vw,2.25rem)] leading-tight text-white"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {post.title}
        </h2>
        <p className="text-[0.95rem] leading-7 text-white/56">
          {post.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3 text-[0.74rem] text-white/38">
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>{post.date}</span>
          <span>&middot;</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

function BlogGridCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="related-card h-full">
      <div className="related-card-img-wrap">
        <img src={post.img} alt={post.title} className="index-grid-img related-card-img" loading="lazy" />
      </div>
      <div className="flex h-full flex-col gap-3 p-5">
        <span className="blog-category-pill">{post.category}</span>
        <h3
          className="text-[1.05rem] font-normal leading-snug text-white"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {post.title}
        </h3>
        <p className="text-[0.84rem] leading-6 text-white/50">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-2 text-[0.72rem] text-white/38">
          <Clock size={11} />
          {post.readTime}
        </div>
      </div>
    </Link>
  );
}

export function BlogIndexPageContent() {
  const featured = blogPosts.find((post) => post.featured) || blogPosts[0];
  const remainingPosts = blogPosts.filter((post) => post.slug !== featured.slug);

  return (
    <>
      <BlogStyles />
      <FixedBackground />
      <div className="scroll-layer">
        <BlogHeader backHref="/" backLabel="Home" />

        <main>
          <section className="bg-transparent">
            <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-10 hero-in">
              <div className="max-w-[760px]">
                <span className="blog-category-pill">Legal Insights</span>
                <h1
                  className="mt-5 text-[clamp(2.4rem,1.5rem+3vw,4.4rem)] leading-[1.04] text-white"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  From our <em className="text-[#c5dfc0] italic">desk</em>
                </h1>
                <p className="mt-5 max-w-[640px] text-[1.02rem] leading-8 text-white/56">
                  Practical writing on criminal defense, property diligence, family disputes, consumer remedies, and constitutional relief. Every article is written to help clients understand what matters before they act.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-transparent pb-10">
            <div className="max-w-[1200px] mx-auto px-6">
              <IndexFeaturedPost post={featured} />
            </div>
          </section>

          <section className="bg-transparent pt-6 pb-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <span className="blog-category-pill">Latest Articles</span>
                  <h2
                    className="mt-4 text-[clamp(1.7rem,1.2rem+1.8vw,2.5rem)] leading-tight text-white"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Explore every published <em className="text-[#c5dfc0] italic">title</em>
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {remainingPosts.map((post) => (
                  <BlogGridCard key={post.slug} post={post} />
                ))}
              </div>

              {/* <div className="consult-strip mt-14">
                <div className="flex flex-col gap-2">
                  <span className="text-[0.68rem] uppercase tracking-[0.16em] text-[#c5dfc0]/70 font-semibold">
                    Need Legal Help?
                  </span>
                  <p
                    className="text-white text-[clamp(1.2rem,1rem+1vw,1.55rem)] font-normal leading-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Speak with AGD Law Associates about your matter
                  </p>
                  <p className="text-white/50 text-[0.85rem] mt-1 max-w-[420px]">
                    If one of these articles sounds close to your situation, we can assess the facts directly and advise on the next step.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#c5dfc0] text-[#0b0b0b] text-[0.82rem] font-semibold uppercase tracking-[0.1em] hover:bg-white transition-colors"
                >
                  Schedule Consultation
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div> */}
            </div>
          </section>
        </main>

        <BlogFooter />
        <WhatsAppFloatingChat />
      </div>
    </>
  );
}

export function BlogArticlePageContent({ slug }) {
  const post = getBlogPostBySlug(slug);
  const relatedPosts = getRelatedBlogPosts(slug, 3);

  if (!post) return null;

  return (
    <>
      <BlogStyles />
      <FixedBackground />
      <div className="scroll-layer">
        <BlogHeader backHref="/blog" backLabel="All Articles" />

        <main>
          <section className="bg-transparent pb-0">
            <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-8 hero-in">
              <nav
                className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.1em] text-white/40 mb-6"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-[#c5dfc0] transition-colors">Home</Link>
                <ChevronRight size={12} className="opacity-40" />
                <Link href="/blog" className="hover:text-[#c5dfc0] transition-colors">Blog</Link>
                <ChevronRight size={12} className="opacity-40" />
                <span className="text-white/65 truncate max-w-[220px]">{post.category}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="blog-category-pill">{post.category}</span>
                <span className="flex items-center gap-1.5 text-white/40 text-[0.75rem]">
                  <Calendar size={12} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-white/40 text-[0.75rem]">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>

              <h1
                className="text-[clamp(2rem,1.3rem+3vw,3.4rem)] font-normal leading-[118%] text-white max-w-[900px] mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {post.title}
              </h1>

              <p className="text-[1.05rem] text-white/58 leading-[1.75] max-w-[780px] mb-8">
                {post.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-[rgba(197,223,192,0.1)]">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorImg}
                    alt={post.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#c5dfc0]"
                  />
                  <div>
                    <p
                      className="text-[0.92rem] font-normal text-white"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {post.author}
                    </p>
                    <p className="text-[0.7rem] uppercase tracking-[0.1em] text-white/42">
                      {post.authorRole}
                    </p>
                  </div>
                </div>
                <ShareBar title={post.title} />
              </div>
            </div>

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

          <section className="bg-transparent pt-14 pb-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="grid lg:grid-cols-[1fr_280px] gap-14 items-start">
                <article>
                  <ArticleContent blocks={post.content} />

                  <div className="mt-12 pt-8 border-t border-[rgba(197,223,192,0.1)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorImg}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#c5dfc0]"
                      />
                      <div>
                        <p
                          className="text-[0.95rem] font-normal text-white"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {post.author}
                        </p>
                        <p className="text-[0.7rem] uppercase tracking-[0.1em] text-white/42">
                          {post.authorRole}
                        </p>
                      </div>
                    </div>
                    <ShareBar title={post.title} />
                  </div>

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
                    <Link
                      href="/#contact"
                      className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#c5dfc0] text-[#0b0b0b] text-[0.82rem] font-semibold uppercase tracking-[0.1em] hover:bg-white transition-colors"
                    >
                      Schedule Consultation
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </Link>
                  </div>
                </article>

                <aside className="toc-sticky hidden lg:flex flex-col gap-6">
                  <div className="rounded-2xl border border-[rgba(197,223,192,0.14)] bg-[rgba(255,255,255,0.04)] p-5 backdrop-blur-xl">
                    <TableOfContents blocks={post.content} />
                  </div>

                  <div className="rounded-2xl border border-[rgba(197,223,192,0.18)] bg-[rgba(255,255,255,0.04)] p-5 flex flex-col gap-3 backdrop-blur-xl">
                    <p
                      className="text-[1rem] font-normal text-white leading-snug"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Have a question about this topic?
                    </p>
                    <p className="text-[0.8rem] text-white/52 leading-relaxed">
                      Our team is available Monday-Friday 10am-6:30pm and Saturday 11am-5pm.
                    </p>
                    <a
                      href="tel:+918939588855"
                      className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-[#c5dfc0] hover:text-white transition-colors"
                    >
                      <PhoneCall size={14} />
                      +91 89395 88855
                    </a>
                    <Link
                      href="/#contact"
                      className="mt-1 w-full text-center py-2.5 rounded-full bg-[#c5dfc0] text-[#0b0b0b] text-[0.78rem] font-semibold uppercase tracking-[0.09em] hover:bg-white transition-colors"
                    >
                      Free Consultation
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-[rgba(197,223,192,0.14)] bg-[rgba(255,255,255,0.04)] p-5 flex flex-col gap-3 backdrop-blur-xl">
                    <p className="text-[0.68rem] uppercase tracking-[0.14em] text-white/35 font-semibold mb-1">
                      Article Details
                    </p>
                    <div className="flex items-center gap-2 text-[0.82rem] text-white/52">
                      <Calendar size={13} className="text-[#c5dfc0]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[0.82rem] text-white/52">
                      <Clock size={13} className="text-[#c5dfc0]" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[0.82rem] text-white/52">
                      <BookOpen size={13} className="text-[#c5dfc0]" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <section className="border-t border-[rgba(197,223,192,0.08)] bg-transparent pt-[clamp(2.5rem,1.5rem+3vw,4rem)] pb-[clamp(2.5rem,1.5rem+3vw,4rem)]">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex items-end justify-between gap-5 mb-8">
                <h2
                  className="text-[clamp(1.5rem,1.2rem+1.5vw,2rem)] font-normal text-white leading-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Continue reading
                </h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-[0.78rem] uppercase tracking-[0.1em] font-semibold text-[#c5dfc0] hover:text-white transition-colors"
                >
                  All articles
                  <ArrowRight size={13} strokeWidth={2.5} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {relatedPosts.map((relatedPost) => (
                  <BlogGridCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        </main>

        <BlogFooter />
        <WhatsAppFloatingChat />
      </div>
    </>
  );
}
