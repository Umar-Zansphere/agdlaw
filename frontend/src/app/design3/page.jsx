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
  ChevronDown,
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

// ─── Global Styles ─────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --ink: #0b0b0b;
      --paper: #ffffff;
      --sage: #c5dfc0;
      --sage-dark: #3a5c3d;
      --sage-pale: #f0f7ee;
      --muted: #6b7280;
      --border: rgba(197,223,192,0.35);
      --radius-sm: 12px;
      --radius-md: 20px;
      --radius-lg: 32px;
      --radius-xl: 48px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: var(--paper);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-weight: 400;
      line-height: 1.1;
    }
    img { max-width: 100%; display: block; }
    a { text-decoration: none; color: inherit; }
    button { cursor: pointer; font-family: inherit; border: none; background: none; }
    :focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
    ul { list-style: none; }

    /* ── Utility ── */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--sage-dark);
      background: var(--sage-pale); border: 1px solid var(--border);
      border-radius: 100px; padding: 6px 14px;
    }
    .section-label::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--sage);
    }

    /* ── Header ── */
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      transition: background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
    }
    .header.scrolled {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(16px);
      box-shadow: 0 1px 0 rgba(197,223,192,0.3), 0 4px 24px rgba(11,11,11,0.06);
    }
    .header-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 72px; gap: 24px;
    }
    .logo-mark {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.4rem; font-weight: 500; color: var(--ink);
      display: flex; align-items: center; gap: 10px;
    }
    .logo-glyph {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--ink); color: var(--sage);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1rem; font-weight: 600; flex-shrink: 0;
      font-family: 'Cormorant Garamond', serif;
    }
    .nav-links { display: flex; align-items: center; gap: 4px; }
    .nav-link {
      font-size: 0.82rem; font-weight: 500; color: var(--ink);
      padding: 8px 14px; border-radius: 8px;
      transition: background 0.2s, color 0.2s;
      letter-spacing: 0.01em;
    }
    .nav-link:hover { background: var(--sage-pale); color: var(--sage-dark); }
    .header-cta {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--ink); color: var(--paper);
      font-size: 0.8rem; font-weight: 600;
      padding: 10px 20px; border-radius: 100px;
      transition: background 0.25s, transform 0.2s;
      letter-spacing: 0.03em; white-space: nowrap;
    }
    .header-cta:hover { background: var(--sage-dark); transform: translateY(-1px); }

    /* ── Hero ── */
    .hero {
      min-height: 100vh; display: flex; align-items: center;
      position: relative; overflow: hidden;
      background: var(--ink);
      padding: 100px 0 60px;
    }
    .hero-bg-img {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; opacity: 0.18; pointer-events: none;
    }
    .hero-noise {
      position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .hero-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 60px; align-items: center; position: relative; z-index: 2;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--sage);
      border: 1px solid rgba(197,223,192,0.3);
      border-radius: 100px; padding: 6px 14px; margin-bottom: 28px;
      width: fit-content;
    }
    .hero-title {
      font-size: clamp(3rem, 5vw, 5.5rem);
      color: var(--paper); line-height: 1.0;
      margin-bottom: 24px; letter-spacing: -0.01em;
    }
    .hero-title em { color: var(--sage); font-style: italic; }
    .hero-subtitle {
      font-size: 1.05rem; color: rgba(255,255,255,0.6);
      line-height: 1.75; max-width: 480px; margin-bottom: 40px;
    }
    .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      background: var(--sage); color: var(--ink);
      font-size: 0.88rem; font-weight: 600;
      padding: 14px 26px; border-radius: 100px;
      transition: all 0.25s; letter-spacing: 0.02em; white-space: nowrap;
    }
    .btn-primary:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(197,223,192,0.4); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 10px;
      color: rgba(255,255,255,0.75);
      font-size: 0.88rem; font-weight: 500;
      padding: 14px 26px; border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.15);
      transition: all 0.25s; white-space: nowrap;
    }
    .btn-ghost:hover { border-color: var(--sage); color: var(--sage); }
    .hero-stats {
      display: flex; gap: 0;
      border: 1px solid rgba(197,223,192,0.2); border-radius: 20px;
      overflow: hidden; margin-top: 48px; width: fit-content;
    }
    .hero-stat {
      padding: 20px 28px; border-right: 1px solid rgba(197,223,192,0.2);
    }
    .hero-stat:last-child { border-right: none; }
    .hero-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem; color: var(--sage); line-height: 1;
    }
    .hero-stat-lbl {
      font-size: 0.7rem; color: rgba(255,255,255,0.45);
      text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;
    }
    .hero-visual {
      position: relative; display: flex; flex-direction: column; gap: 16px;
    }
    .hero-img-main {
      width: 100%; border-radius: 24px; aspect-ratio: 4/5;
      object-fit: cover; object-position: top;
      border: 1px solid rgba(197,223,192,0.15);
    }
    .hero-card-float {
      position: absolute; background: rgba(255,255,255,0.06);
      backdrop-filter: blur(16px); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 16px; padding: 14px 18px;
    }
    .hero-card-float.top-left { top: 24px; left: -20px; }
    .hero-card-float.bottom-right { bottom: 24px; right: -20px; }
    .hero-float-label { font-size: 0.65rem; color: var(--sage); text-transform: uppercase; letter-spacing: 0.1em; }
    .hero-float-value { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: #fff; line-height: 1.1; }
    .hero-float-sub { font-size: 0.7rem; color: rgba(255,255,255,0.45); margin-top: 2px; }

    /* ── Ticker ── */
    .ticker-wrap {
      background: var(--sage); overflow: hidden; height: 40px;
      display: flex; align-items: center;
    }
    .ticker-track {
      display: flex; gap: 0; white-space: nowrap;
      animation: tickerMove 30s linear infinite;
    }
    @keyframes tickerMove {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .ticker-item {
      display: inline-flex; align-items: center; gap: 16px;
      font-size: 0.72rem; font-weight: 600; color: var(--ink);
      text-transform: uppercase; letter-spacing: 0.12em;
      padding: 0 32px;
    }
    .ticker-sep { opacity: 0.4; font-size: 1.2rem; }

    /* ── About ── */
    .about-section {
      padding: clamp(5rem, 8vw, 9rem) 0;
      background: var(--paper);
    }
    .about-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: clamp(3rem, 5vw, 6rem); align-items: start;
    }
    .about-photo-stack {
      position: relative; padding-bottom: 40px;
    }
    .about-photo-main {
      width: 100%; aspect-ratio: 3/4; object-fit: cover;
      object-position: top; border-radius: var(--radius-lg);
      box-shadow: 0 32px 80px rgba(11,11,11,0.14);
    }
    .about-photo-accent {
      position: absolute; bottom: 0; right: -24px;
      width: 55%; aspect-ratio: 1;
      object-fit: cover; border-radius: var(--radius-md);
      border: 4px solid #fff;
      box-shadow: 0 16px 48px rgba(11,11,11,0.12);
    }
    .about-badge-float {
      position: absolute; top: 40px; left: -24px;
      background: var(--ink); border-radius: var(--radius-md);
      padding: 18px 22px; color: #fff;
      box-shadow: 0 16px 48px rgba(11,11,11,0.2);
      min-width: 140px;
    }
    .about-badge-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.4rem; color: var(--sage); line-height: 1;
    }
    .about-badge-lbl {
      font-size: 0.65rem; text-transform: uppercase;
      letter-spacing: 0.1em; color: rgba(197,223,192,0.6); margin-top: 4px;
    }
    .about-content { display: flex; flex-direction: column; gap: 28px; }
    .about-title {
      font-size: clamp(2.4rem, 3.5vw, 3.8rem);
      line-height: 1.08; letter-spacing: -0.01em;
    }
    .about-title em { color: var(--sage); font-style: italic; }
    .about-body { font-size: 1rem; line-height: 1.82; color: #3a3a3a; }
    .stats-row {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    }
    .stat-box {
      background: var(--sage-pale); border: 1px solid var(--border);
      border-radius: var(--radius-md); padding: 20px;
      position: relative; overflow: hidden;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .stat-box:hover {
      border-color: var(--sage); transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(197,223,192,0.2);
    }
    .stat-box::before {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 3px; background: var(--sage);
    }
    .stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.6rem; color: var(--ink); line-height: 1; margin-bottom: 6px;
    }
    .stat-lbl { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
    .credentials { display: flex; flex-wrap: wrap; gap: 8px; }
    .cred-tag {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 0.78rem; color: var(--sage-dark); font-weight: 500;
      background: var(--sage-pale); border: 1px solid var(--border);
      border-radius: 100px; padding: 5px 12px;
    }
    .cred-tag svg { color: var(--sage); flex-shrink: 0; }

    /* ── Services ── */
    .services-section {
      background: var(--ink); padding: clamp(4rem, 7vw, 8rem) 0;
    }
    .services-header {
      display: flex; justify-content: space-between;
      align-items: flex-end; margin-bottom: clamp(2rem, 4vw, 4rem);
      gap: 24px;
    }
    .services-title-block { display: flex; flex-direction: column; gap: 16px; }
    .services-title {
      font-size: clamp(2.2rem, 3.5vw, 3.6rem);
      color: #fff; letter-spacing: -0.01em;
    }
    .services-title em { color: var(--sage); font-style: italic; }
    .services-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.1);
      border-radius: var(--radius-lg); overflow: hidden;
    }
    .service-card {
      background: rgba(255,255,255,0.03);
      padding: 32px 28px; position: relative; overflow: hidden;
      transition: background 0.35s;
      display: flex; flex-direction: column; gap: 14px;
    }
    .service-card::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(197,223,192,0.08), transparent);
      opacity: 0; transition: opacity 0.35s;
    }
    .service-card:hover { background: rgba(197,223,192,0.06); }
    .service-card:hover::after { opacity: 1; }
    .service-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.9rem; color: rgba(197,223,192,0.4);
      letter-spacing: 0.08em;
    }
    .service-icon-wrap {
      width: 44px; height: 44px; border-radius: 12px;
      border: 1px solid rgba(197,223,192,0.2); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.3s, border-color 0.3s;
    }
    .service-card:hover .service-icon-wrap {
      background: rgba(197,223,192,0.12); border-color: var(--sage);
    }
    .service-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.3rem; color: #fff; line-height: 1.2;
    }
    .service-desc { font-size: 0.83rem; color: rgba(255,255,255,0.48); line-height: 1.72; }
    .service-arrow {
      margin-top: auto; width: 32px; height: 32px; border-radius: 50%;
      border: 1px solid rgba(197,223,192,0.2); color: var(--sage);
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.3s;
    }
    .service-card:hover .service-arrow { background: var(--sage); color: var(--ink); border-color: var(--sage); }

    /* ── Team ── */
    .team-section { padding: clamp(4rem, 7vw, 8rem) 0; background: var(--paper); }
    .team-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
      margin-top: clamp(2rem, 4vw, 4rem);
    }
    .team-card {
      border-radius: var(--radius-lg); overflow: hidden;
      position: relative; aspect-ratio: 3/4; background: var(--ink);
      transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
    }
    .team-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px rgba(11,11,11,0.2); }
    .team-photo {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; object-position: top;
      transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s;
    }
    .team-card:hover .team-photo { transform: scale(1.06); filter: brightness(0.7); }
    .team-gradient {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(11,11,11,0.95) 0%, rgba(11,11,11,0.5) 40%, transparent 70%);
    }
    .team-body {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 24px 20px; display: flex; flex-direction: column; gap: 4px;
    }
    .team-exp {
      position: absolute; top: 16px; right: 16px;
      background: rgba(11,11,11,0.7); backdrop-filter: blur(8px);
      border: 1px solid rgba(197,223,192,0.3); border-radius: 100px;
      padding: 5px 12px; font-size: 0.68rem; letter-spacing: 0.08em;
      color: var(--sage); text-transform: uppercase; font-weight: 500;
    }
    .team-spec {
      font-size: 0.65rem; color: var(--sage); text-transform: uppercase;
      letter-spacing: 0.1em; margin-bottom: 4px;
    }
    .team-name { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: #fff; }
    .team-role { font-size: 0.75rem; color: rgba(255,255,255,0.5); }
    .team-social {
      display: flex; gap: 8px; margin-top: 10px;
      max-height: 0; overflow: hidden; opacity: 0;
      transition: max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s;
    }
    .team-card:hover .team-social { max-height: 40px; opacity: 1; }
    .team-social-btn {
      width: 30px; height: 30px; border-radius: 8px;
      background: rgba(197,223,192,0.15); border: 1px solid rgba(197,223,192,0.25);
      color: var(--sage); display: inline-flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .team-social-btn:hover { background: rgba(197,223,192,0.3); }

    /* ── Case Results ── */
    .cases-section { background: var(--ink); padding: clamp(4rem, 7vw, 8rem) 0; }
    .cases-header {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2.5rem, 4vw, 4rem); gap: 24px;
    }
    .cases-title { font-size: clamp(2.2rem, 3.5vw, 3.6rem); color: #fff; }
    .cases-title em { color: var(--sage); font-style: italic; }
    .cases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .case-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(197,223,192,0.12);
      border-radius: var(--radius-md); padding: 28px;
      display: flex; flex-direction: column; gap: 12px;
      transition: border-color 0.3s, background 0.3s, transform 0.3s;
    }
    .case-card:hover {
      border-color: rgba(197,223,192,0.35); background: rgba(197,223,192,0.05);
      transform: translateY(-4px);
    }
    .case-card.highlight { border-color: rgba(197,223,192,0.3); background: rgba(197,223,192,0.06); }
    .case-category {
      font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--sage);
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 4px 12px; width: fit-content;
    }
    .case-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: #fff; line-height: 1.3; }
    .case-desc { font-size: 0.83rem; color: rgba(255,255,255,0.5); line-height: 1.7; flex: 1; }
    .case-footer {
      display: flex; justify-content: space-between; align-items: flex-end;
      border-top: 1px solid rgba(197,223,192,0.1); padding-top: 16px;
    }
    .case-meta { display: flex; flex-direction: column; gap: 2px; }
    .case-court { font-size: 0.68rem; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; }
    .case-year { font-size: 0.65rem; color: rgba(255,255,255,0.25); }
    .case-outcome {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--sage); color: var(--ink);
      font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em;
      border-radius: 100px; padding: 6px 12px;
    }
    .cases-stats {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 16px; margin-bottom: 36px;
    }
    .cstat-box {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(197,223,192,0.1);
      border-radius: var(--radius-sm); padding: 20px;
    }
    .cstat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; color: var(--sage); line-height: 1; }
    .cstat-lbl { font-size: 0.68rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }

    /* ── Why / Regions ── */
    .regions-section {
      position: relative; overflow: hidden;
      padding: clamp(4rem, 8vw, 9rem) 0;
      background: var(--ink);
    }
    .regions-bg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; opacity: 0.12; pointer-events: none;
    }
    .regions-inner { position: relative; z-index: 2; }
    .regions-title {
      font-size: clamp(2.4rem, 4vw, 4.5rem); color: #fff;
      text-align: center; margin-bottom: 20px;
    }
    .regions-title em { color: var(--sage); font-style: italic; }
    .regions-subtitle { text-align: center; color: rgba(255,255,255,0.5); font-size: 1rem; margin-bottom: 56px; }
    .regions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(197,223,192,0.12); border-radius: var(--radius-lg); overflow: hidden; border: 1px solid rgba(197,223,192,0.12); }
    .region-item {
      background: rgba(255,255,255,0.02); padding: 36px 32px;
      text-align: center; transition: background 0.3s;
    }
    .region-item:hover { background: rgba(197,223,192,0.07); }
    .region-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.4rem, 2vw, 1.8rem); color: #fff; margin-bottom: 8px; }
    .region-cities { font-size: 0.82rem; color: rgba(255,255,255,0.4); line-height: 1.8; }
    .why-cards {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
      margin-top: 56px;
    }
    .why-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(197,223,192,0.12);
      border-radius: var(--radius-md); padding: 24px;
      display: flex; flex-direction: column; gap: 12px;
      transition: border-color 0.3s, background 0.3s;
    }
    .why-card:hover { border-color: rgba(197,223,192,0.35); background: rgba(197,223,192,0.06); }
    .why-icon { color: var(--sage); }
    .why-card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: #fff; }
    .why-card-desc { font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.7; }

    /* ── Testimonial ── */
    .testimonial-section { background: var(--paper); padding: clamp(4rem, 7vw, 8rem) 0; }
    .testi-inner {
      display: grid; grid-template-columns: 380px 1fr; gap: 56px; align-items: start;
    }
    .testi-sidebar { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 88px; }
    .testi-sidebar-title { font-size: clamp(2rem, 2.8vw, 2.8rem); line-height: 1.1; }
    .testi-sidebar-title em { color: var(--sage-dark); font-style: italic; }
    .testi-nav { display: flex; align-items: center; gap: 10px; }
    .testi-nav-btn {
      width: 44px; height: 44px; border-radius: 50%;
      border: 1.5px solid var(--border); color: var(--ink);
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.25s;
    }
    .testi-nav-btn:hover { background: var(--sage); border-color: var(--sage); }
    .testi-counter {
      font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em;
      color: var(--ink); background: var(--sage-pale);
      border: 1px solid var(--border); border-radius: 100px; padding: 8px 16px;
    }
    .testi-progress { height: 2px; background: var(--sage-pale); border-radius: 2px; overflow: hidden; }
    .testi-bar { height: 100%; background: var(--sage-dark); border-radius: 2px; transition: width 0.5s ease; }
    .testi-dots { display: flex; gap: 6px; align-items: center; }
    .testi-dot {
      height: 6px; border-radius: 3px; transition: all 0.3s;
      background: var(--sage);
    }
    .testi-card {
      background: #fff; border: 1px solid #e8f2e6;
      border-radius: var(--radius-lg); padding: clamp(1.5rem, 3vw, 2.8rem);
      box-shadow: 0 20px 60px rgba(11,11,11,0.06);
      animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes cardIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .testi-quote {
      font-size: clamp(1.05rem, 1.5vw, 1.25rem); line-height: 1.85;
      color: #2a2a2a; margin-top: 16px;
    }
    .testi-author { display: flex; align-items: center; gap: 16px; margin-top: 28px; padding-top: 24px; border-top: 1px solid #e8f2e6; }
    .testi-avatar { width: 60px; height: 60px; border-radius: 16px; object-fit: cover; border: 3px solid var(--sage); }
    .testi-name { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; color: var(--ink); }
    .testi-role { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-top: 2px; }
    .testi-stars { display: flex; gap: 3px; color: var(--sage); margin-bottom: 4px; }

    /* ── Blog ── */
    .blog-section { background: var(--paper); padding: clamp(4rem, 7vw, 8rem) 0; border-top: 1px solid #f0f7ee; }
    .blog-header {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2rem, 4vw, 4rem); gap: 24px;
    }
    .blog-view-all {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 0.8rem; font-weight: 600; color: var(--ink);
      text-transform: uppercase; letter-spacing: 0.1em;
      transition: color 0.2s;
    }
    .blog-view-all:hover { color: var(--sage-dark); }
    .blog-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; }
    .blog-featured {
      border: 1px solid #e8f2e6; border-radius: var(--radius-lg);
      overflow: hidden; display: flex; flex-direction: column;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .blog-featured:hover { border-color: var(--sage); box-shadow: 0 24px 60px rgba(11,11,11,0.08); transform: translateY(-4px); }
    .blog-feat-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; transition: transform 0.5s; }
    .blog-featured:hover .blog-feat-img { transform: scale(1.03); }
    .blog-feat-img-wrap { overflow: hidden; }
    .blog-feat-body { padding: 28px; flex: 1; display: flex; flex-direction: column; gap: 12px; }
    .blog-right { display: flex; flex-direction: column; gap: 16px; }
    .blog-mini {
      display: flex; gap: 16px; border: 1px solid #e8f2e6; border-radius: var(--radius-md);
      overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s; text-decoration: none; color: inherit;
    }
    .blog-mini:hover { border-color: var(--sage); box-shadow: 0 8px 24px rgba(11,11,11,0.06); }
    .blog-mini-img { width: 100px; flex-shrink: 0; object-fit: cover; align-self: stretch; }
    .blog-mini-body { padding: 16px 16px 16px 0; display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0; justify-content: center; }
    .blog-cat {
      font-size: 0.63rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--sage-dark);
      background: var(--sage-pale); border: 1px solid var(--border);
      border-radius: 100px; padding: 3px 10px; width: fit-content;
    }
    .blog-title { font-family: 'Cormorant Garamond', serif; line-height: 1.3; color: var(--ink); }
    .blog-meta { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
    .blog-excerpt { font-size: 0.88rem; color: #555; line-height: 1.72; flex: 1; }
    .blog-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid #e8f2e6; }
    .blog-read-btn {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--sage); color: var(--ink);
      display: inline-flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.2s;
    }
    .blog-featured:hover .blog-read-btn, .blog-mini:hover .blog-read-btn { background: var(--ink); color: #fff; transform: translateX(2px); }

    /* ── FAQ ── */
    .faq-section { background: var(--sage-pale); padding: clamp(4rem, 7vw, 8rem) 0; }
    .faq-grid { display: grid; grid-template-columns: 360px 1fr; gap: 56px; align-items: start; }
    .faq-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 88px; }
    .faq-sidebar-title { font-size: clamp(2rem, 2.8vw, 2.8rem); }
    .faq-sidebar-title em { color: var(--sage-dark); font-style: italic; }
    .faq-cta-box {
      background: var(--ink); border-radius: var(--radius-md); padding: 24px;
      display: flex; flex-direction: column; gap: 14px;
    }
    .faq-cta-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: #fff; }
    .faq-cta-sub { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.6; }
    .faq-cta-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: var(--ink);
      font-size: 0.82rem; font-weight: 600; letter-spacing: 0.04em;
      padding: 12px 20px; border-radius: 100px;
      width: fit-content; transition: background 0.2s;
    }
    .faq-cta-btn:hover { background: #fff; }
    .faq-list { display: flex; flex-direction: column; }
    .faq-item { border-bottom: 1px solid rgba(197,223,192,0.5); }
    .faq-question {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      padding: 22px 0; gap: 20px; text-align: left; background: none; border: none;
      cursor: pointer; font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.1rem, 1.8vw, 1.35rem); color: var(--ink);
      transition: color 0.2s;
    }
    .faq-question:hover { color: var(--sage-dark); }
    .faq-toggle {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      border: 1.5px solid var(--border); color: var(--sage-dark);
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.3s;
    }
    .faq-toggle.open { background: var(--sage); border-color: var(--sage); transform: rotate(45deg); }
    .faq-answer {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s ease, opacity 0.3s;
      opacity: 0;
    }
    .faq-answer.open { grid-template-rows: 1fr; opacity: 1; }
    .faq-answer-inner { overflow: hidden; }
    .faq-answer-text { padding-bottom: 20px; font-size: 0.92rem; line-height: 1.8; color: #444; }

    /* ── Contact ── */
    .contact-section { background: var(--paper); padding: clamp(4rem, 7vw, 8rem) 0; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: start; }
    .contact-info { display: flex; flex-direction: column; gap: 28px; }
    .contact-title { font-size: clamp(2.4rem, 3.5vw, 3.8rem); line-height: 1.08; }
    .contact-title em { color: var(--sage-dark); font-style: italic; }
    .contact-detail {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 20px; background: var(--sage-pale);
      border: 1px solid var(--border); border-radius: var(--radius-md);
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .contact-detail:hover { border-color: var(--sage); box-shadow: 0 8px 24px rgba(197,223,192,0.2); }
    .contact-detail-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: var(--sage); color: var(--ink);
      display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .contact-detail-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 4px; }
    .contact-detail-value { font-size: 0.92rem; color: var(--ink); font-weight: 500; }
    .contact-form-panel {
      background: var(--ink); border-radius: var(--radius-xl);
      padding: clamp(2rem, 4vw, 3.5rem); display: flex; flex-direction: column; gap: 28px;
    }
    .form-section-label {
      font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--sage); margin-bottom: 12px;
    }
    .chip-group { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(197,223,192,0.25);
      background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6);
      font-size: 0.8rem; cursor: pointer; transition: all 0.2s;
    }
    .chip:hover { border-color: var(--sage); color: var(--sage); }
    .chip.active { background: var(--sage); color: var(--ink); border-color: var(--sage); font-weight: 600; }
    .form-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-field { display: flex; flex-direction: column; gap: 6px; }
    .form-field.full { grid-column: 1 / -1; }
    .form-label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
    .form-input {
      width: 100%; background: rgba(255,255,255,0.06);
      border: 1px solid rgba(197,223,192,0.2); border-radius: 12px;
      padding: 13px 16px; color: #fff; font-size: 0.9rem; font-family: inherit;
      transition: border-color 0.25s, background 0.25s;
      resize: none;
    }
    .form-input::placeholder { color: rgba(255,255,255,0.28); }
    .form-input:focus { outline: none; border-color: var(--sage); background: rgba(197,223,192,0.06); }
    .form-submit {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      width: 100%; background: var(--sage); color: var(--ink);
      font-size: 0.92rem; font-weight: 700; letter-spacing: 0.04em;
      padding: 16px; border-radius: 14px; border: none; cursor: pointer;
      transition: all 0.25s;
    }
    .form-submit:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(197,223,192,0.3); }
    .form-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .form-msg { padding: 12px 16px; border-radius: 10px; font-size: 0.85rem; font-weight: 500; }
    .form-msg.success { background: rgba(197,223,192,0.15); color: var(--sage); border: 1px solid rgba(197,223,192,0.3); }
    .form-msg.error { background: rgba(255,100,100,0.1); color: #ff8080; border: 1px solid rgba(255,100,100,0.2); }
    .hours-box {
      background: rgba(197,223,192,0.08); border: 1px solid rgba(197,223,192,0.15);
      border-radius: var(--radius-md); padding: 20px;
    }
    .hours-row { display: flex; justify-content: space-between; font-size: 0.82rem; padding: 6px 0; }
    .hours-row:not(:last-child) { border-bottom: 1px solid rgba(197,223,192,0.1); }
    .hours-day { color: rgba(255,255,255,0.5); }
    .hours-time { color: rgba(255,255,255,0.8); font-weight: 500; }

    /* ── Footer ── */
    .footer-section { background: var(--ink); padding: clamp(3rem, 5vw, 5rem) 0 0; }
    .footer-top {
      display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px;
      padding-bottom: clamp(2.5rem, 4vw, 4rem); border-bottom: 1px solid rgba(197,223,192,0.12);
    }
    .footer-brand { display: flex; flex-direction: column; gap: 16px; }
    .footer-tagline { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.7; max-width: 260px; }
    .footer-socials { display: flex; gap: 10px; }
    .footer-social {
      width: 36px; height: 36px; border-radius: 10px;
      border: 1px solid rgba(197,223,192,0.2); color: rgba(255,255,255,0.5);
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .footer-social:hover { background: rgba(197,223,192,0.12); color: var(--sage); border-color: var(--sage); }
    .footer-col { display: flex; flex-direction: column; gap: 16px; }
    .footer-col-title {
      font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.14em;
      color: var(--sage); font-weight: 600;
    }
    .footer-links { display: flex; flex-direction: column; gap: 10px; }
    .footer-link { font-size: 0.85rem; color: rgba(255,255,255,0.45); transition: color 0.2s; }
    .footer-link:hover { color: rgba(255,255,255,0.85); }
    .footer-contact-item { display: flex; align-items: flex-start; gap: 10px; }
    .footer-contact-icon { color: var(--sage); flex-shrink: 0; margin-top: 1px; }
    .footer-contact-text { font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.5; transition: color 0.2s; }
    .footer-contact-item:hover .footer-contact-text { color: rgba(255,255,255,0.75); }
    .footer-bottom {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 0; gap: 16px; flex-wrap: wrap;
    }
    .footer-copy { font-size: 0.78rem; color: rgba(255,255,255,0.3); }
    .footer-web { font-size: 0.78rem; color: rgba(255,255,255,0.3); transition: color 0.2s; }
    .footer-web:hover { color: var(--sage); }

    /* ── WhatsApp Float ── */
    .wa-fab {
      position: fixed; bottom: 24px; right: 24px; z-index: 980;
      display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
    }
    .wa-panel {
      width: min(90vw, 360px); border-radius: 22px; overflow: hidden;
      background: #fff; border: 1px solid var(--border);
      box-shadow: 0 24px 64px rgba(11,11,11,0.18);
      transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
      transform-origin: bottom right;
    }
    .wa-panel.closed { opacity: 0; transform: scale(0.92) translateY(16px); pointer-events: none; }
    .wa-panel.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
    .wa-header {
      background: var(--ink); padding: 14px 16px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .wa-header-info { display: flex; align-items: center; gap: 10px; }
    .wa-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: var(--sage); color: var(--ink);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .wa-name { font-size: 0.88rem; font-weight: 600; color: #fff; }
    .wa-status { font-size: 0.7rem; color: var(--sage); }
    .wa-close {
      width: 30px; height: 30px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.6);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .wa-close:hover { border-color: var(--sage); color: var(--sage); }
    .wa-body { padding: 16px; background: #f9fbf8; display: flex; flex-direction: column; gap: 12px; }
    .wa-bubble {
      background: #fff; border: 1px solid var(--border);
      border-radius: 16px; border-top-left-radius: 4px;
      padding: 12px 14px; font-size: 0.85rem; line-height: 1.6; color: var(--ink);
      max-width: 90%; box-shadow: 0 2px 8px rgba(11,11,11,0.05);
    }
    .wa-quick { display: flex; flex-wrap: wrap; gap: 6px; }
    .wa-quick-btn {
      font-size: 0.75rem; padding: 7px 12px; border-radius: 100px;
      border: 1px solid var(--border); background: #fff; color: var(--ink);
      transition: all 0.2s; text-align: left;
    }
    .wa-quick-btn:hover, .wa-quick-btn.selected { background: var(--sage); border-color: var(--sage); }
    .wa-input-row { display: flex; gap: 8px; align-items: flex-end; }
    .wa-textarea {
      flex: 1; resize: none; border: 1px solid var(--border);
      border-radius: 14px; padding: 10px 14px; font-size: 0.85rem;
      font-family: inherit; color: var(--ink); background: #fff;
      transition: border-color 0.2s;
    }
    .wa-textarea:focus { outline: none; border-color: var(--sage); }
    .wa-send {
      width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
      background: var(--sage); color: var(--ink);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .wa-send:hover { background: var(--ink); color: var(--sage); }
    .wa-label {
      background: var(--ink); color: var(--sage);
      font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em;
      padding: 6px 14px; border-radius: 100px; font-weight: 600;
    }
    .wa-toggle {
      width: 56px; height: 56px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 12px 32px rgba(11,11,11,0.3);
      transition: all 0.3s; border: none;
    }
    .wa-toggle.closed { background: var(--sage); color: var(--ink); }
    .wa-toggle.closed:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 18px 40px rgba(197,223,192,0.45); }
    .wa-toggle.open-state { background: var(--ink); color: var(--sage); }

    /* ── Mobile menu ── */
    .mobile-panel {
      position: fixed; inset: 0; z-index: 800; background: var(--ink);
      display: flex; flex-direction: column;
    }
    .mobile-nav-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 0; border-bottom: 1px solid rgba(197,223,192,0.1);
      font-family: 'Cormorant Garamond', serif; font-size: 2rem;
      color: rgba(255,255,255,0.8); transition: color 0.2s;
      animation: mobileNavIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
    }
    .mobile-nav-item:hover { color: var(--sage); }
    @keyframes mobileNavIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .mobile-num { font-family: 'DM Sans', sans-serif; font-size: 0.7rem; color: rgba(197,223,192,0.4); letter-spacing: 0.1em; }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .hero-grid { grid-template-columns: 1fr; }
      .hero-visual { display: none; }
      .about-grid { grid-template-columns: 1fr; }
      .about-photo-stack { display: none; }
      .services-grid { grid-template-columns: repeat(2, 1fr); }
      .team-grid { grid-template-columns: repeat(2, 1fr); }
      .cases-grid { grid-template-columns: repeat(2, 1fr); }
      .cases-stats { grid-template-columns: repeat(2, 1fr); }
      .why-cards { grid-template-columns: repeat(2, 1fr); }
      .regions-grid { grid-template-columns: 1fr 1fr; }
      .testi-inner { grid-template-columns: 1fr; }
      .testi-sidebar { position: static; }
      .blog-layout { grid-template-columns: 1fr; }
      .faq-grid { grid-template-columns: 1fr; }
      .faq-sidebar { position: static; }
      .contact-grid { grid-template-columns: 1fr; }
      .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
      .nav-links { display: none; }
      .header-cta-desktop { display: none; }
    }
    @media (max-width: 640px) {
      .services-grid { grid-template-columns: 1fr; }
      .team-grid { grid-template-columns: 1fr 1fr; }
      .cases-grid { grid-template-columns: 1fr; }
      .cases-stats { grid-template-columns: repeat(2, 1fr); }
      .why-cards { grid-template-columns: 1fr; }
      .regions-grid { grid-template-columns: 1fr; }
      .form-fields { grid-template-columns: 1fr; }
      .footer-top { grid-template-columns: 1fr; }
      .hero-stats { flex-wrap: wrap; }
    }
  `}</style>
);

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

const blogPosts = [
  { slug: "anticipatory-bail-guide-india", category: "Criminal Law", title: "Anticipatory Bail in India: What It Is and When You Need It", excerpt: "A pre-arrest bail can be the difference between freedom and custody. We break down Section 438 CrPC, who qualifies, and how the process works at the High Court.", author: "AGD Bala Kumar", date: "March 18, 2025", readTime: "6 min read", img: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=500&fit=crop", featured: true },
  { slug: "property-due-diligence-checklist", category: "Property Law", title: "The Essential Due Diligence Checklist Before Buying Property in Tamil Nadu", excerpt: "Title verification, encumbrance certificates, patta, and chitta — exactly what to check before signing any property sale agreement.", author: "Meena Lakshmi", date: "Feb 28, 2025", readTime: "8 min read", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop", featured: false },
  { slug: "divorce-mutual-consent-process", category: "Family Law", title: "Mutual Consent Divorce in India: Timeline, Process & What to Expect", excerpt: "From the first motion to the final decree, a full walkthrough of the uncontested divorce process and cooling-off period.", author: "Priya Sundaram", date: "Feb 10, 2025", readTime: "7 min read", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop", featured: false },
  { slug: "consumer-court-how-to-file", category: "Consumer Protection", title: "How to File a Consumer Complaint: A Step-by-Step Guide", excerpt: "Defective goods, service failures, builder delays — find out which forum to approach and how to build a winning complaint.", author: "Karthik Raj", date: "Jan 22, 2025", readTime: "5 min read", img: "https://plus.unsplash.com/premium_photo-1661720120987-9723da4de350?w=800&h=500&fit=crop", featured: false },
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

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#cases", label: "Case Results" },
    { href: "#blog", label: "Insights" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="header-inner">
            <a href="#" className="logo-mark">
              <span className="logo-glyph">A</span>
              <span>AGD Law Associates</span>
            </a>
            <nav className="nav-links" aria-label="Main navigation">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="#contact" className="header-cta header-cta-desktop">
                Consultation <ArrowRight size={14} />
              </a>
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                style={{ display: "none", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e8f2e6", background: "transparent", cursor: "pointer" }}
                className="mobile-menu-btn"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <style>{`
        @media (max-width: 1024px) {
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
      {menuOpen && (
        <div className="mobile-panel">
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
            <span className="logo-mark" style={{ color: "#fff" }}>
              <span className="logo-glyph">A</span>
              AGD Law Associates
            </span>
            <button type="button" onClick={() => setMenuOpen(false)} style={{ width: "40px", height: "40px", border: "1px solid rgba(197,223,192,0.2)", borderRadius: "10px", background: "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={18} />
            </button>
          </div>
          <nav className="container" style={{ flex: 1, paddingTop: "16px" }}>
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="mobile-nav-item"
                style={{ animationDelay: `${0.06 + i * 0.06}s`, display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{l.label}</span>
                <span className="mobile-num">0{i + 1}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "32px", padding: "16px", borderRadius: "14px", background: "#c5dfc0", color: "#0b0b0b", fontWeight: "700", fontSize: "0.9rem", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" }}
            >
              Schedule Consultation <ArrowRight size={15} />
            </a>
          </nav>
          <div className="container" style={{ paddingBottom: "24px", paddingTop: "24px", borderTop: "1px solid rgba(197,223,192,0.1)" }}>
            <p style={{ fontSize: "0.72rem", color: "rgba(197,223,192,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>© {new Date().getFullYear()} AGD Law Associates</p>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="hero">
      <img
        src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=1600&h=900&fit=crop"
        alt=""
        aria-hidden="true"
        className="hero-bg-img"
      />
      <div className="hero-noise" aria-hidden="true" />

      <div className="container">
        <div className="hero-grid">
          {/* Left */}
          <div>
            <div className="hero-badge">
              <Scale size={12} />
              Boutique Law Firm · Chennai · Est. 2016
            </div>
            <h1 className="hero-title">
              AGD Law<br />
              <em>Associates</em>
            </h1>
            <p className="hero-subtitle">
              Precision-driven litigation and advisory across criminal, civil, consumer,
              constitutional, and commercial matters — across Tamil Nadu and beyond.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Request Consultation <ArrowRight size={15} />
              </a>
              <a href="tel:+919994388855" className="btn-ghost">
                <Phone size={15} /> +91 99943 88855
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">2016</div>
                <div className="hero-stat-lbl">Established</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">12+</div>
                <div className="hero-stat-lbl">Years Practice</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">9</div>
                <div className="hero-stat-lbl">Practice Areas</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="hero-visual">
            <div className="hero-card-float top-left">
              <div className="hero-float-label">Established</div>
              <div className="hero-float-value">2016</div>
              <div className="hero-float-sub">Chennai, Tamil Nadu</div>
            </div>
            <img
              src="/image.webp"
              alt="AGD Bala Kumar, Managing Counsel"
              className="hero-img-main"
            />
            <div className="hero-card-float bottom-right">
              <div className="hero-float-label">Lead Counsel</div>
              <div className="hero-float-value">AGD</div>
              <div className="hero-float-sub">Bala Kumar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = [
    "Criminal Law", "Civil Litigation", "Constitutional Remedies", "Consumer Protection",
    "Property Law", "Family Law", "Arbitration & ADR", "Corporate Advisory", "MCOP & RCOP",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const credentials = [
    "Integrity & Professionalism",
    "Confidentiality & Trust",
    "Client-Focused Service",
    "Excellence in Advocacy",
    "Timely Legal Solutions",
  ];

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Photo Column */}
          <div className="about-photo-stack">
            <div className="about-badge-float">
              <div className="about-badge-num">12+</div>
              <div className="about-badge-lbl">Years of<br />Practice</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=1000&fit=crop&crop=faces"
              alt="AGD Law Associates counsel"
              className="about-photo-main"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=600&fit=crop"
              alt="Law office"
              className="about-photo-accent"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="about-content">
            <span className="section-label">About Us</span>
            <h2 className="about-title">
              Your legal matter<br />
              deserves <em>precision</em>
            </h2>
            <p className="about-body">
              Founded in 2016, AGD Law Associates is a boutique law firm delivering
              high-quality litigation and advisory services across Tamil Nadu and beyond.
              Led by AGD Bala Kumar with over 12 years of practice, our firm combines
              courtroom strength with strategic advisory for complex, sensitive, and
              high-impact legal matters.
            </p>
            <p className="about-body">
              We believe every client deserves personalized attention, clear communication,
              and a legal team that is genuinely invested in their outcome. From first
              consultation to final resolution, we stand by you.
            </p>

            <div className="stats-row">
              {[
                { num: "2016", lbl: "Established" },
                { num: "10+", lbl: "Advocates" },
                { num: "6", lbl: "Active Cities" },
              ].map((s) => (
                <div className="stat-box" key={s.lbl}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            <div className="credentials">
              {credentials.map((c) => (
                <span className="cred-tag" key={c}>
                  <CheckCircle size={12} />
                  {c}
                </span>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ background: "#0b0b0b", color: "#c5dfc0", width: "fit-content" }}>
              Schedule a Consultation <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────



// Map homepage service titles to slugs used in /services/[slug]
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

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-header">
          <div className="services-title-block">
            <span className="section-label" style={{ color: "#c5dfc0", background: "rgba(197,223,192,0.08)", borderColor: "rgba(197,223,192,0.2)" }}>Practice Areas</span>
            <h2 className="services-title">
              Areas of <em>expertise</em>
            </h2>
          </div>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
            Discuss Your Case <ArrowRight size={14} />
          </a>
        </div>
        <div className="services-grid">
          {services.map((s, i) => {
            const Icon = s.icon;
            const slug = serviceTitleToSlug[s.title];
            return (
              <Link
                href={slug ? `/services/${slug}` : "#"}
                className="service-card"
                key={s.title}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="service-num">0{i + 1}</span>
                <div className="service-icon-wrap">
                  <Icon size={18} />
                </div>
                <h3 className="service-name">{s.title}</h3>
                <p className="service-desc">{s.description}</p>
                <div className="service-arrow">
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section className="team-section" id="team">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="section-label">Our Team</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 3.5vw, 3.6rem)", lineHeight: "1.08" }}>
              The counsel<br />behind your <em style={{ color: "#3a5c3d", fontStyle: "italic" }}>case</em>
            </h2>
          </div>
        </div>
        <div className="team-grid">
          {teamMembers.map((m) => (
            <div className="team-card" key={m.name}>
              <img src={m.img} alt={m.name} className="team-photo" loading="lazy" />
              <div className="team-gradient" />
              <div className="team-exp">{m.experience}</div>
              <div className="team-body">
                <div className="team-spec">{m.specialization}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-social">
                  <a href="#" className="team-social-btn" aria-label={`${m.name} LinkedIn`}>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
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
    <section className="cases-section" id="cases">
      <div className="container">
        <div className="cases-header">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="section-label" style={{ color: "#c5dfc0", background: "rgba(197,223,192,0.08)", borderColor: "rgba(197,223,192,0.2)" }}>Track Record</span>
            <h2 className="cases-title">
              Results that<br /><em>speak</em>
            </h2>
          </div>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
            Discuss Your Case <ArrowRight size={14} />
          </a>
        </div>
        <div className="cases-stats">
          {stats.map((s) => (
            <div className="cstat-box" key={s.lbl}>
              <div className="cstat-num">{s.num}</div>
              <div className="cstat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
        <div className="cases-grid">
          {caseResults.map((c, i) => (
            <article className={`case-card${c.highlight ? " highlight" : ""}`} key={i}>
              <div className="case-category">{c.category}</div>
              <h3 className="case-title">{c.title}</h3>
              <p className="case-desc">{c.description}</p>
              <div className="case-footer">
                <div className="case-meta">
                  <div className="case-court">{c.court}</div>
                  <div className="case-year">{c.year}</div>
                </div>
                <div className="case-outcome">
                  <CheckCircle size={11} />
                  {c.outcome}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Regions / Why ────────────────────────────────────────────────────────────

function Regions() {
  const whyItems = [
    { icon: Scale, title: "Boutique Attention", desc: "Every client receives direct partner-level attention — no file gets lost in a large firm structure." },
    { icon: Shield, title: "Ethical Practice", desc: "Strict confidentiality, transparent communication, and unwavering integrity in every matter." },
    { icon: Clock, title: "Timely Resolution", desc: "Structured case management designed to achieve efficient, timely outcomes without unnecessary delays." },
    { icon: Award, title: "Proven Advocacy", desc: "12+ years of courtroom experience across criminal, civil, constitutional, and commercial matters." },
  ];

  return (
    <section className="regions-section" id="why-me">
      <img
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=900&fit=crop"
        alt=""
        aria-hidden="true"
        className="regions-bg"
      />
      <div className="container regions-inner">
        <span className="section-label" style={{ margin: "0 auto 16px", display: "flex", color: "#c5dfc0", background: "rgba(197,223,192,0.08)", borderColor: "rgba(197,223,192,0.2)", width: "fit-content" }}>Why Choose Us</span>
        <h2 className="regions-title">
          Why <em>AGD</em> Law Associates
        </h2>
        <p className="regions-subtitle">A trusted boutique firm serving clients across Tamil Nadu and beyond</p>

        <div className="why-cards">
          {whyItems.map((w) => {
            const Icon = w.icon;
            return (
              <div className="why-card" key={w.title}>
                <div className="why-icon"><Icon size={20} /></div>
                <div className="why-card-title">{w.title}</div>
                <div className="why-card-desc">{w.desc}</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "56px" }}>
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(197,223,192,0.5)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "20px" }}>Our Practice Presence</p>
          <div className="regions-grid">
            {[
              { name: "Chennai & Suburbs", cities: "Chennai · Tambaram · Avadi" },
              { name: "Western Tamil Nadu", cities: "Coimbatore · Tiruppur" },
              { name: "Greater Karnataka", cities: "Bangalore & surrounding districts" },
              { name: "Chengalpattu", cities: "Chengalpattu · Kancheepuram" },
              { name: "Tiruvallur", cities: "Tiruvallur · Ponneri · Gummidipoondi" },
              { name: "Dindigul", cities: "Dindigul · Natham · Palani" },
            ].map((r) => (
              <div className="region-item" key={r.name}>
                <div className="region-name">{r.name}</div>
                <div className="region-cities">{r.cities}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

const testimonials = [
  { name: "AGD Bala Kumar", role: "Advocate | Managing Counsel", feedback: "AGD Bala Kumar has over 12 years of experience in litigation and legal advisory, with focused practice across criminal law, civil disputes, constitutional remedies, consumer matters, property law, family law, arbitration, corporate advisory, MCOP, and RCOP matters.", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=450&h=300&fit=crop" },
  { name: "AGD Law Associates", role: "Our Vision", feedback: "To become a trusted and leading boutique law firm recognized for excellence, integrity, and client satisfaction through precision-driven advocacy, transparent communication, and timely legal solutions.", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=450&h=300&fit=crop" },
];

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
    <section className="testimonial-section" id="testimonial" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="container">
        <div className="testi-inner">
          <div className="testi-sidebar">
            <span className="section-label">Leadership</span>
            <h2 className="testi-sidebar-title">
              Courtroom<br /><em>precision</em> at<br />every level
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.8", color: "#555" }}>
              AGD Bala Kumar leads the firm with over 12 years of practice, combining
              litigation strength with strategic advisory for complex and high-impact matters.
            </p>
            <div className="testi-nav">
              <button type="button" className="testi-nav-btn" onClick={prev} aria-label="Previous">
                <ArrowLeft size={16} />
              </button>
              <button type="button" className="testi-nav-btn" onClick={next} aria-label="Next">
                <ArrowRight size={16} />
              </button>
              <div className="testi-counter">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </div>
            <div className="testi-progress">
              <div className="testi-bar" style={{ width: `${((current + 1) / total) * 100}%` }} />
            </div>
            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="testi-dot"
                  style={{ width: i === current ? "28px" : "8px", opacity: i === current ? 1 : 0.35 }}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <article key={`${t.name}-${current}`} className="testi-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="testi-stars">
                  {Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <span style={{ fontSize: "4rem", fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#c5dfc0", lineHeight: 0.8 }}>&ldquo;</span>
              </div>
              <blockquote className="testi-quote">{t.feedback}</blockquote>
              <div className="testi-author">
                <img src={t.img} alt={t.name} className="testi-avatar" loading="lazy" />
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
                <button type="button" onClick={next} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 600, color: "#3a5c3d", background: "none", border: "1px solid #c5dfc0", borderRadius: "100px", padding: "8px 16px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                  View next <ArrowRight size={13} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function Blog() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured).slice(0, 3);

  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="blog-header">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="section-label">Legal Insights</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 3.5vw, 3.6rem)", lineHeight: "1.08" }}>
              From our desk<br />to <em style={{ color: "#3a5c3d", fontStyle: "italic" }}>yours</em>
            </h2>
          </div>
          <a href="/blog" className="blog-view-all">
            All Articles <ArrowRight size={13} strokeWidth={2.5} />
          </a>
        </div>

        <div className="blog-layout">
          {featured && (
            <a href={`/blog/${featured.slug}`} className="blog-featured">
              <div className="blog-feat-img-wrap">
                <img src={featured.img} alt={featured.title} className="blog-feat-img" loading="lazy" />
              </div>
              <div className="blog-feat-body">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="blog-cat">{featured.category}</span>
                  <span style={{ fontSize: "0.65rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.08em" }}>Featured</span>
                </div>
                <h3 className="blog-title" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", lineHeight: "1.25" }}>{featured.title}</h3>
                <p className="blog-excerpt">{featured.excerpt}</p>
                <div className="blog-footer">
                  <div>
                    <div style={{ fontSize: "0.88rem", color: "#0b0b0b", fontWeight: 500 }}>{featured.author}</div>
                    <div className="blog-meta">{featured.date} · {featured.readTime}</div>
                  </div>
                  <span className="blog-read-btn"><ArrowRight size={14} /></span>
                </div>
              </div>
            </a>
          )}
          <div className="blog-right">
            {rest.map((p) => (
              <a key={p.slug} href={`/blog/${p.slug}`} className="blog-mini">
                <img src={p.img} alt={p.title} className="blog-mini-img" loading="lazy" />
                <div className="blog-mini-body">
                  <span className="blog-cat">{p.category}</span>
                  <div className="blog-title" style={{ fontSize: "0.92rem" }}>{p.title}</div>
                  <div className="blog-meta">{p.date} · {p.readTime}</div>
                </div>
              </a>
            ))}
          </div>
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
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-sidebar">
            <span className="section-label">FAQ</span>
            <h2 className="faq-sidebar-title">
              Common<br /><em>questions</em><br />answered
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.8", color: "#555" }}>
              Have more questions? We're happy to address any concern before your consultation.
            </p>
            <div className="faq-cta-box">
              <div className="faq-cta-title">Ready to get started?</div>
              <div className="faq-cta-sub">Schedule a consultation and let us assess your matter with the attention it deserves.</div>
              <a href="#contact" className="faq-cta-btn">
                Book Consultation <ArrowRight size={13} />
              </a>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div className="faq-item" key={i}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className={`faq-toggle${isOpen ? " open" : ""}`}>
                      <X size={14} />
                    </span>
                  </button>
                  <div className={`faq-answer${isOpen ? " open" : ""}`}>
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Info side */}
          <div className="contact-info">
            <span className="section-label">Get In Touch</span>
            <h2 className="contact-title">
              Need legal<br /><em>support?</em><br />Let's connect.
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#555" }}>
              Reach out to us directly or fill the form and we'll respond during office hours.
              Every matter is handled with strict confidentiality.
            </p>

            {[
              { icon: PhoneCall, label: "Phone", value: "+91 99943 88855", href: "tel:+919994388855" },
              { icon: Mail, label: "Email", value: "agdlawassociatesoffice@gmail.com", href: "mailto:agdlawassociatesoffice@gmail.com" },
              { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu", href: "#" },
            ].map((d) => {
              const Icon = d.icon;
              return (
                <a key={d.label} href={d.href} className="contact-detail" style={{ textDecoration: "none" }}>
                  <div className="contact-detail-icon"><Icon size={16} /></div>
                  <div>
                    <div className="contact-detail-label">{d.label}</div>
                    <div className="contact-detail-value">{d.value}</div>
                  </div>
                </a>
              );
            })}

            <div style={{ background: "#0b0b0b", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(197,223,192,0.5)", fontWeight: 600 }}>Office Hours</p>
              {[
                { day: "Monday – Friday", time: "10:00 AM – 6:30 PM" },
                { day: "Saturday", time: "11:00 AM – 5:00 PM" },
                { day: "2nd & Last Saturday", time: "Closed" },
              ].map((h) => (
                <div className="hours-row" key={h.day}>
                  <span className="hours-day">{h.day}</span>
                  <span className="hours-time">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <p className="form-section-label">Select Service Area</p>
                <div className="chip-group">
                  {serviceOptions.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      className={`chip${form.service_type === s.value ? " active" : ""}`}
                      onClick={() => selectPill("service_type", s.value)}
                      aria-pressed={form.service_type === s.value}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="form-section-label">Preferred Timeline</p>
                <div className="chip-group">
                  {budgetOptions.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      className={`chip${form.budget === b.value ? " active" : ""}`}
                      onClick={() => selectPill("budget", b.value)}
                      aria-pressed={form.budget === b.value}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="your_name" className="form-label">Your Name</label>
                  <input
                    type="text" id="your_name" name="your_name"
                    placeholder="John Doe" required value={form.your_name}
                    onChange={handleChange} className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="your_email" className="form-label">Email Address</label>
                  <input
                    type="email" id="your_email" name="your_email"
                    placeholder="john@email.com" required value={form.your_email}
                    onChange={handleChange} className="form-input"
                  />
                </div>
                <div className="form-field full">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    id="message" name="message" rows={4}
                    placeholder="Briefly describe your legal matter..."
                    value={form.message} onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {submitState.message && (
                <div className={`form-msg ${submitState.type}`}>{submitState.message}</div>
              )}

              <button type="submit" className="form-submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={16} />}
              </button>
            </form>
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

  const serviceLinks = [
    "Criminal Law", "Civil Litigation", "Writs & Constitutional",
    "Consumer Protection", "Property Law", "Family Law",
  ];

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-mark" style={{ color: "#fff" }}>
              <span className="logo-glyph">A</span>
              AGD Law Associates
            </div>
            <p className="footer-tagline">
              Precision-driven litigation and advisory services across Tamil Nadu and beyond.
              Established 2016.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" className="footer-social" aria-label="X (Twitter)"><XIcon /></a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Quick Links</div>
            <div className="footer-links">
              {quickLinks.map((l) => (
                <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Practice Areas</div>
            <div className="footer-links">
              {serviceLinks.map((s) => (
                <span key={s} className="footer-link" style={{ cursor: "default" }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <a href="tel:+919994388855" className="footer-contact-item" style={{ textDecoration: "none" }}>
                <PhoneCall size={14} className="footer-contact-icon" />
                <span className="footer-contact-text">+91 99943 88855</span>
              </a>
              <a href="mailto:agdlawassociatesoffice@gmail.com" className="footer-contact-item" style={{ textDecoration: "none" }}>
                <Mail size={14} className="footer-contact-icon" />
                <span className="footer-contact-text">agdlawassociatesoffice@gmail.com</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={14} className="footer-contact-icon" />
                <span className="footer-contact-text">Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} AGD Law Associates. All rights reserved.</p>
          <a href="https://www.agdlawassociates.in" target="_blank" rel="noopener noreferrer" className="footer-web">
            www.agdlawassociates.in
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Float ───────────────────────────────────────────────────────────

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
    <div className="wa-fab">
      <div className={`wa-panel ${open ? "open" : "closed"}`}>
        <div className="wa-header">
          <div className="wa-header-info">
            <div className="wa-avatar"><MessageCircle size={15} /></div>
            <div>
              <div className="wa-name">AGD Legal Desk</div>
              <div className="wa-status">Replies during office hours</div>
            </div>
          </div>
          <button type="button" className="wa-close" onClick={() => setOpen(false)} aria-label="Close">
            <X size={13} />
          </button>
        </div>
        <div className="wa-body">
          <div className="wa-bubble">
            Hi! Thanks for reaching out to AGD Law Associates. Select a quick message or type your query below.
          </div>
          <div className="wa-quick">
            {quickMessages.map((m) => (
              <button
                key={m}
                type="button"
                className={`wa-quick-btn${message === m ? " selected" : ""}`}
                onClick={() => setMessage(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="wa-input-row">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); openWhatsApp(); } }}
              placeholder="Type your message..."
              className="wa-textarea"
              aria-label="WhatsApp message"
            />
            <button type="button" className="wa-send" onClick={() => openWhatsApp()} aria-label="Send">
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {!open && (
        <div className="wa-label">Chat with AGD</div>
      )}

      <button
        type="button"
        className={`wa-toggle ${open ? "open-state" : "closed"}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
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
      <GlobalStyles />
      <Header />
      <main>
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
      <WhatsAppFloatingChat />
    </>
  );
}