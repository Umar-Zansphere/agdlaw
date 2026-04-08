"use client";

import { useState, useEffect } from "react";
import { AGDLogoImg } from "@/components/AGDLogoImg";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { blogPosts } from "@/data/blog-posts";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});
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

const SITE_URL = "https://www.agdlawassociates.in";
const SITE_NAME = "AGD Law Associates";
const SITE_DESCRIPTION =
  "AGD Law Associates is a boutique law firm in Chennai delivering precision-driven litigation and advisory across criminal, civil, constitutional, consumer, property, family, arbitration, and corporate matters.";


// ─── Global Styles ─────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
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
      --header-offset: 96px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; scroll-padding-top: var(--header-offset); }
    body {
      font-family: var(--font-dm), system-ui, sans-serif;
      background: var(--ink);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: var(--font-cormorant), Georgia, serif;
      font-weight: 400;
      line-height: 1.1;
    }
    img { max-width: 100%; display: block; }
    a { text-decoration: none; color: inherit; }
    button { cursor: pointer; font-family: inherit; border: none; background: none; }
    :focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
    ul { list-style: none; }

    /* ── Fixed Background ── */
    .fixed-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      background: var(--ink);
      overflow: hidden;
      pointer-events: none;
    }
    .fixed-bg-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0.07;
    }
    .fixed-bg-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 900px;
      height: 900px;
      background: radial-gradient(circle, rgba(197,223,192,0.12) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }
    .fixed-bg-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.7) 100%);
    }

    /* ── Scrollable Layer ── */
    .scroll-layer {
      position: relative;
      z-index: 10;
    }
    section[id] { scroll-margin-top: var(--header-offset); }
    main { padding-bottom: clamp(120px, 18vh, 220px); }

    /* ── Container ── */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--sage);
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 5px 14px;
    }
    .section-label::before {
      content: ''; width: 5px; height: 5px; border-radius: 50%;
      background: var(--sage);
    }
    .section-label-dark {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--sage);
      background: rgba(197,223,192,0.08); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 5px 14px;
    }
    .section-label-dark::before {
      content: ''; width: 5px; height: 5px; border-radius: 50%;
      background: var(--sage);
    }

    /* ── Header ── */
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      transition: background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s;
    }
    .header.scrolled {
      background: rgba(11,11,11,0.88);
      backdrop-filter: blur(20px);
      box-shadow: 0 1px 0 rgba(197,223,192,0.1), 0 8px 32px rgba(0,0,0,0.3);
    }
    .header-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 70px; gap: 24px;
    }
    .logo-mark {
      font-family: var(--font-cormorant), Georgia, serif;
      font-size: 1.35rem; font-weight: 500; color: #fff;
      display: flex; align-items: center; gap: 10px;
    }
    .logo-glyph {
      width: 34px; height: 34px; border-radius: 9px;
      background: var(--sage); color: var(--ink);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1rem; font-weight: 700; flex-shrink: 0;
      font-family: var(--font-cormorant), serif;
    }
    .nav-links { display: flex; align-items: center; gap: 2px; }
    .nav-link {
      font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.65);
      padding: 8px 13px; border-radius: 8px;
      transition: color 0.2s, background 0.2s;
    }
    .nav-link:hover { color: var(--sage); background: rgba(197,223,192,0.07); }
    .header-cta {
      display: inline-flex; align-items: center; gap: 7px;
      background: var(--sage); color: var(--ink);
      font-size: 0.78rem; font-weight: 700;
      padding: 9px 18px; border-radius: 100px;
      transition: background 0.25s, transform 0.2s;
      letter-spacing: 0.04em; white-space: nowrap;
    }
    .header-cta:hover { background: #fff; transform: translateY(-1px); }

    /* ── Hero ── */
    .hero {
      min-height: 100svh;
      display: flex; align-items: flex-end;
      padding: 0 0 80px;
      position: relative;
    }
    .hero-ornament {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      border: 1px solid rgba(197,223,192,0.06);
      border-radius: 50%;
      pointer-events: none;
    }
    .hero-ornament::after {
      content: '';
      position: absolute;
      inset: 40px;
      border: 1px solid rgba(197,223,192,0.04);
      border-radius: 50%;
    }
    .hero-content {
      text-align: center;
      max-width: 820px;
      margin: 0 auto;
    }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 0.68rem; font-weight: 600; letter-spacing: 0.22em;
      text-transform: uppercase; color: var(--sage);
      border: 1px solid rgba(197,223,192,0.25);
      border-radius: 100px; padding: 6px 16px; margin-bottom: 32px;
      margin-top: 80px;
    }
    .hero-title {
      font-size: clamp(4rem, 9vw, 9rem);
      color: #fff; line-height: 0.92;
      letter-spacing: -0.025em; margin-bottom: 12px;
    }
    .hero-title em { color: var(--sage); font-style: italic; }
    .hero-firm-name {
      font-size: clamp(1rem, 2vw, 1.5rem);
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.3em; text-transform: uppercase;
      font-family: var(--font-dm), sans-serif; font-weight: 300;
      margin-bottom: 36px;
    }
    .hero-tagline {
      font-size: 1.05rem; color: rgba(255,255,255,0.5);
      line-height: 1.75; max-width: 520px; margin: 0 auto 44px;
      font-family: var(--font-dm), sans-serif;
    }
    .hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 9px;
      background: var(--sage); color: var(--ink);
      font-size: 0.85rem; font-weight: 700;
      padding: 13px 24px; border-radius: 100px;
      transition: all 0.25s; letter-spacing: 0.03em; white-space: nowrap;
    }
    .btn-primary:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(197,223,192,0.3); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 9px;
      color: rgba(255,255,255,0.6);
      font-size: 0.85rem; font-weight: 500;
      padding: 13px 24px; border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.15);
      transition: all 0.25s; white-space: nowrap;
    }
    .btn-ghost:hover { border-color: var(--sage); color: var(--sage); }
    .hero-stats-row {
      display: flex; justify-content: center; gap: 0;
      margin-top: 56px;
      border: 1px solid rgba(197,223,192,0.12);
      border-radius: 20px; overflow: hidden; width: fit-content;
      margin-left: auto; margin-right: auto;
    }
    .hero-stat {
      padding: 18px 32px; border-right: 1px solid rgba(197,223,192,0.12);
    }
    .hero-stat:last-child { border-right: none; }
    .hero-stat-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2rem; color: var(--sage); line-height: 1;
    }
    .hero-stat-lbl {
      font-size: 0.65rem; color: rgba(255,255,255,0.35);
      text-transform: uppercase; letter-spacing: 0.12em; margin-top: 4px;
    }
    .hero-scroll-hint {
      position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      pointer-events: none;
    }
    .hero-scroll-line {
      width: 1px; height: 40px;
      background: linear-gradient(to bottom, rgba(197,223,192,0.5), transparent);
      animation: scrollHint 2s ease-in-out infinite;
    }
    @keyframes scrollHint {
      0%, 100% { opacity: 0.4; transform: scaleY(1); }
      50% { opacity: 1; transform: scaleY(1.2); }
    }
    .hero-scroll-lbl {
      font-size: 0.6rem; color: rgba(197,223,192,0.35);
      text-transform: uppercase; letter-spacing: 0.2em;
    }

    /* ── Ticker ── */
    .ticker-wrap {
      background: var(--sage); overflow: hidden; height: 38px;
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
      font-size: 0.7rem; font-weight: 700; color: var(--ink);
      text-transform: uppercase; letter-spacing: 0.14em;
      padding: 0 28px;
    }
    .ticker-sep { opacity: 0.35; }

    /* ── All sections are transparent — fixed bg always shows through ── */
    .panel, .panel-dark, .panel-tinted {
      background: transparent;
      position: relative;
    }

    /* ── About ── */
    .about-inner {
      display: grid; grid-template-columns: 1fr 1.1fr;
      gap: clamp(3rem, 5vw, 6rem); align-items: center;
      padding: clamp(5rem, 8vw, 9rem) 0;
    }
    .about-left { display: flex; flex-direction: column; gap: 28px; }
    .about-pretitle {
      font-size: clamp(2.6rem, 4vw, 4.2rem);
      line-height: 1.05; letter-spacing: -0.015em; color: #fff;
    }
    .about-pretitle em { color: var(--sage); font-style: italic; }
    .about-body { font-size: 0.97rem; line-height: 1.85; color: rgba(255,255,255,0.6); }
    .about-stats {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
    }
    .about-stat-box {
      background: rgba(255,255,255,0.07); backdrop-filter: blur(12px);
      border: 1px solid rgba(197,223,192,0.15); border-radius: 16px; padding: 20px 18px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .about-stat-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2.2rem; color: var(--sage); line-height: 1;
    }
    .about-stat-lbl {
      font-size: 0.65rem; color: rgba(255,255,255,0.4);
      text-transform: uppercase; letter-spacing: 0.1em;
    }
    .about-creds { display: flex; flex-wrap: wrap; gap: 8px; }
    .cred-tag {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 0.77rem; color: var(--sage); font-weight: 500;
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 5px 12px;
    }
    .cred-tag svg { color: var(--sage); flex-shrink: 0; }
    .about-right { position: relative; }
    .about-img-wrap {
      border-radius: 28px; overflow: hidden;
      box-shadow: 0 40px 100px rgba(11,11,11,0.15);
      aspect-ratio: 4/5;
    }
    .about-img-wrap img {
      width: 100%; height: 100%; object-fit: cover; object-position: top;
    }
    .about-img-badge {
      position: absolute; bottom: -20px; left: -20px;
      background: var(--ink); border-radius: 20px;
      padding: 20px 24px; color: #fff;
      box-shadow: 0 20px 56px rgba(11,11,11,0.3);
    }
    .about-badge-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2.6rem; color: var(--sage); line-height: 1;
    }
    .about-badge-lbl {
      font-size: 0.62rem; text-transform: uppercase;
      letter-spacing: 0.1em; color: rgba(197,223,192,0.55); margin-top: 4px;
    }
    .about-img-accent {
      position: absolute; top: -20px; right: -20px;
      width: 48%; aspect-ratio: 1; border-radius: 20px;
      overflow: hidden; border: 3px solid #fff;
      box-shadow: 0 16px 48px rgba(11,11,11,0.15);
    }
    .about-img-accent img { width: 100%; height: 100%; object-fit: cover; }

    /* ── Services ── */
    .services-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .services-head {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2.5rem, 4vw, 4rem); gap: 24px; flex-wrap: wrap;
    }
    .services-title {
      font-size: clamp(2.2rem, 3.5vw, 3.6rem);
      color: #fff; letter-spacing: -0.015em; margin-top: 14px;
    }
    .services-title em { color: var(--sage); font-style: italic; }
    .services-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      border: 1px solid rgba(197,223,192,0.1); border-radius: 28px;
      overflow: hidden;
    }
    .service-card {
      padding: 30px 26px; position: relative; overflow: hidden;
      display: flex; flex-direction: column; gap: 12px;
      border-right: 1px solid rgba(197,223,192,0.08);
      border-bottom: 1px solid rgba(197,223,192,0.08);
      transition: background 0.3s;
      background: rgba(255,255,255,0.02);
    }
    .service-card:hover { background: rgba(197,223,192,0.05); }
    .service-card:nth-child(3n) { border-right: none; }
    .service-card:nth-child(7), .service-card:nth-child(8), .service-card:nth-child(9) { border-bottom: none; }
    .service-num {
      font-family: var(--font-cormorant), serif;
      font-size: 0.85rem; color: rgba(197,223,192,0.3);
      letter-spacing: 0.08em;
    }
    .service-icon-wrap {
      width: 42px; height: 42px; border-radius: 11px;
      border: 1px solid rgba(197,223,192,0.18); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.3s, border-color 0.3s;
    }
    .service-card:hover .service-icon-wrap {
      background: rgba(197,223,192,0.1); border-color: var(--sage);
    }
    .service-name {
      font-family: var(--font-cormorant), serif;
      font-size: 1.28rem; color: #fff; line-height: 1.2;
    }
    .service-desc { font-size: 0.81rem; color: rgba(255,255,255,0.42); line-height: 1.72; }
    .service-arrow {
      margin-top: auto; width: 30px; height: 30px; border-radius: 50%;
      border: 1px solid rgba(197,223,192,0.18); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.25s;
    }
    .service-card:hover .service-arrow {
      background: var(--sage); color: var(--ink); border-color: var(--sage);
    }

    /* ── Team ── */
    .team-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .team-head {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2.5rem, 4vw, 4rem); gap: 24px; flex-wrap: wrap;
    }
    .team-title {
      font-size: clamp(2.2rem, 3.5vw, 3.6rem);
      color: #fff; letter-spacing: -0.015em; margin-top: 14px;
    }
    .team-title em { color: var(--sage); font-style: italic; }
    .team-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
    }
    .team-card {
      border-radius: 28px; overflow: hidden; position: relative;
      aspect-ratio: 3/4; background: var(--ink);
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
    }
    .team-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px rgba(11,11,11,0.18); }
    .team-photo {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; object-position: top;
      transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s;
    }
    .team-card:hover .team-photo { transform: scale(1.05); filter: brightness(0.65); }
    .team-gradient {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(11,11,11,0.95) 0%, rgba(11,11,11,0.45) 45%, transparent 70%);
    }
    .team-exp {
      position: absolute; top: 16px; right: 16px;
      font-size: 0.65rem; font-weight: 700; color: var(--ink);
      background: var(--sage); border-radius: 100px;
      padding: 4px 10px; text-transform: uppercase; letter-spacing: 0.08em;
    }
    .team-body {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 22px 18px; display: flex; flex-direction: column; gap: 3px;
    }
    .team-spec { font-size: 0.63rem; color: var(--sage); text-transform: uppercase; letter-spacing: 0.1em; }
    .team-name { font-family: var(--font-cormorant), serif; font-size: 1.2rem; color: #fff; line-height: 1.1; }
    .team-role { font-size: 0.72rem; color: rgba(255,255,255,0.45); }
    .team-social { margin-top: 8px; }
    .team-social-btn {
      width: 28px; height: 28px; border-radius: 8px;
      border: 1px solid rgba(197,223,192,0.25); color: var(--sage);
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .team-social-btn:hover { background: var(--sage); color: var(--ink); }

    /* ── Cases ── */
    .cases-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .cases-head {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2rem, 4vw, 3.5rem); gap: 24px; flex-wrap: wrap;
    }
    .cases-title {
      font-size: clamp(2.2rem, 3.5vw, 3.6rem);
      color: #fff; letter-spacing: -0.015em; margin-top: 14px;
    }
    .cases-title em { color: var(--sage); font-style: italic; }
    .cases-stats {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 12px; margin-bottom: 32px;
    }
    .cstat-box {
      background: rgba(255,255,255,0.06); backdrop-filter: blur(12px);
      border: 1px solid rgba(197,223,192,0.15);
      border-radius: 18px; padding: 22px 20px;
      text-align: center;
    }
    .cstat-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2.4rem; color: var(--sage); line-height: 1;
    }
    .cstat-lbl { font-size: 0.67rem; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 5px; }
    .cases-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    }
    .case-card {
      background: rgba(255,255,255,0.07); backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 20px; padding: 26px 24px;
      display: flex; flex-direction: column; gap: 10px;
      transition: transform 0.3s, border-color 0.3s;
    }
    .case-card:hover { transform: translateY(-4px); border-color: rgba(197,223,192,0.3); }
    .case-card.highlight {
      background: rgba(197,223,192,0.1); border-color: rgba(197,223,192,0.25);
    }
    .case-category {
      font-size: 0.63rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.12em; color: var(--sage);
    }
    .case-card.highlight .case-category { color: var(--sage); }
    .case-title { font-family: var(--font-cormorant), serif; font-size: 1.25rem; color: #fff; }
    .case-card.highlight .case-title { color: #fff; }
    .case-desc { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.7; flex: 1; }
    .case-card.highlight .case-desc { color: rgba(255,255,255,0.6); }
    .case-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08); }
    .case-card.highlight .case-footer { border-top-color: rgba(197,223,192,0.15); }
    .case-court { font-size: 0.72rem; color: rgba(255,255,255,0.35); }
    .case-card.highlight .case-court { color: rgba(255,255,255,0.45); }
    .case-year { font-size: 0.7rem; color: rgba(255,255,255,0.25); margin-top: 2px; }
    .case-card.highlight .case-year { color: rgba(255,255,255,0.35); }
    .case-outcome {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 0.7rem; font-weight: 700; color: var(--sage);
      background: rgba(197,223,192,0.12); border-radius: 100px;
      padding: 4px 10px;
    }
    .case-card.highlight .case-outcome { background: rgba(197,223,192,0.15); color: var(--sage); }

    /* ── Why / Regions ── */
    .regions-inner-content { padding: clamp(4rem, 7vw, 8rem) 0; }
    .regions-head { text-align: center; margin-bottom: clamp(2.5rem, 4vw, 4rem); }
    .regions-title {
      font-size: clamp(2.4rem, 4vw, 4rem);
      color: #fff; letter-spacing: -0.015em; margin: 14px 0 12px;
    }
    .regions-title em { color: var(--sage); font-style: italic; }
    .regions-sub { font-size: 0.95rem; color: rgba(255,255,255,0.45); }
    .why-cards {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
      margin-bottom: 48px;
    }
    .why-card {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(197,223,192,0.1);
      border-radius: 20px; padding: 28px 22px;
      display: flex; flex-direction: column; gap: 12px;
      transition: background 0.3s, border-color 0.3s;
    }
    .why-card:hover { background: rgba(197,223,192,0.06); border-color: rgba(197,223,192,0.25); }
    .why-icon {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(197,223,192,0.1); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
    }
    .why-title { font-family: var(--font-cormorant), serif; font-size: 1.25rem; color: #fff; }
    .why-desc { font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.68; }
    .regions-presence {
      border: 1px solid rgba(197,223,192,0.1); border-radius: 20px; overflow: hidden;
    }
    .regions-presence-header {
      padding: 14px 24px;
      font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.16em;
      color: rgba(197,223,192,0.4); background: rgba(197,223,192,0.04);
      border-bottom: 1px solid rgba(197,223,192,0.1);
    }
    .regions-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
    }
    .region-item {
      padding: 20px 24px;
      border-right: 1px solid rgba(197,223,192,0.08);
      border-bottom: 1px solid rgba(197,223,192,0.08);
    }
    .region-item:nth-child(3n) { border-right: none; }
    .region-item:nth-child(4), .region-item:nth-child(5), .region-item:nth-child(6) { border-bottom: none; }
    .region-name { font-family: var(--font-cormorant), serif; font-size: 1.1rem; color: #fff; margin-bottom: 4px; }
    .region-cities { font-size: 0.77rem; color: rgba(255,255,255,0.35); }

    /* ── Testimonial / Leadership ── */
    .testi-section { padding: clamp(4rem, 7vw, 8rem) 0; }
    .testi-inner {
      display: grid; grid-template-columns: 1fr 1.4fr; gap: 60px; align-items: start;
    }
    .testi-sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 20px; }
    .testi-sidebar-title {
      font-size: clamp(2rem, 3.2vw, 3.2rem); color: #fff;
      line-height: 1.08; margin-top: 12px;
    }
    .testi-sidebar-title em { color: var(--sage); font-style: italic; }
    .testi-sidebar-body { font-size: 0.9rem; line-height: 1.8; color: rgba(255,255,255,0.5); }
    .testi-nav { display: flex; align-items: center; gap: 10px; }
    .testi-nav-btn {
      width: 38px; height: 38px; border-radius: 50%;
      border: 1px solid rgba(197,223,192,0.2); color: rgba(255,255,255,0.7);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .testi-nav-btn:hover { background: var(--sage); color: var(--ink); border-color: var(--sage); }
    .testi-counter { font-size: 0.78rem; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; }
    .testi-progress {
      height: 2px; background: rgba(197,223,192,0.15); border-radius: 100px; overflow: hidden;
    }
    .testi-bar { height: 100%; background: var(--sage); border-radius: 100px; transition: width 0.5s; }
    .testi-dots { display: flex; gap: 6px; }
    .testi-dot {
      height: 6px; border-radius: 100px;
      background: var(--sage); border: none; transition: width 0.3s;
    }
    .testi-card {
      background: rgba(255,255,255,0.07); backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 24px; padding: 36px 32px;
      animation: fadeSlide 0.45s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .testi-stars { color: var(--sage); font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 20px; }
    .testi-quote {
      font-family: var(--font-cormorant), serif;
      font-size: 1.35rem; line-height: 1.55; color: #fff;
      font-style: italic; margin-bottom: 24px;
    }
    .testi-author { display: flex; align-items: center; gap: 14px; }
    .testi-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; object-position: top; }
    .testi-name { font-weight: 600; font-size: 0.88rem; color: #fff; }
    .testi-role { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 2px; }

    /* ── Blog ── */
    .blog-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .blog-head {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2rem, 4vw, 3.5rem); gap: 24px; flex-wrap: wrap;
    }
    .blog-title {
      font-size: clamp(2.2rem, 3.5vw, 3.6rem);
      color: #fff; letter-spacing: -0.015em; margin-top: 14px;
    }
    .blog-title em { color: var(--sage); font-style: italic; }
    .blog-layout {
      display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px;
    }
    .blog-featured {
      border-radius: 24px; overflow: hidden; background: rgba(255,255,255,0.03);
      border: 1px solid rgba(197,223,192,0.1);
      display: flex; flex-direction: column;
      transition: border-color 0.3s;
    }
    .blog-featured:hover { border-color: rgba(197,223,192,0.3); }
    .blog-featured-img {
      width: 100%; aspect-ratio: 16/9; object-fit: cover;
    }
    .blog-featured-body { padding: 28px 26px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
    .blog-cat {
      font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.14em; color: var(--sage);
    }
    .blog-title-main {
      font-family: var(--font-cormorant), serif;
      font-size: 1.6rem; color: #fff; line-height: 1.2;
    }
    .blog-excerpt { font-size: 0.83rem; color: rgba(255,255,255,0.45); line-height: 1.7; }
    .blog-meta { display: flex; align-items: center; gap: 12px; font-size: 0.72rem; color: rgba(255,255,255,0.3); margin-top: auto; }
    .blog-meta-sep { opacity: 0.4; }
    .blog-list { display: flex; flex-direction: column; gap: 12px; }
    .blog-item {
      border-radius: 18px; overflow: hidden; background: rgba(255,255,255,0.03);
      border: 1px solid rgba(197,223,192,0.1);
      display: flex; transition: border-color 0.3s;
    }
    .blog-item:hover { border-color: rgba(197,223,192,0.25); }
    .blog-item-img { width: 110px; height: 110px; flex-shrink: 0; object-fit: cover; }
    .blog-item-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 6px; }
    .blog-item-cat { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sage); }
    .blog-item-title { font-family: var(--font-cormorant), serif; font-size: 1.08rem; color: #fff; line-height: 1.25; }
    .blog-item-meta { font-size: 0.68rem; color: rgba(255,255,255,0.3); margin-top: auto; }

    /* ── FAQ ── */
    .faq-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .faq-layout { display: grid; grid-template-columns: 1fr 1.6fr; gap: 60px; align-items: start; }
    .faq-sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 20px; }
    .faq-sidebar-title {
      font-size: clamp(2rem, 3.2vw, 3.2rem); color: #fff;
      line-height: 1.08; margin-top: 12px;
    }
    .faq-sidebar-title em { color: var(--sage); font-style: italic; }
    .faq-sidebar-body { font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.8; }
    .faq-cta { width: fit-content; }
    .faq-list { display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(197,223,192,0.15); border-radius: 20px; overflow: hidden; }
    .faq-item { border-bottom: 1px solid rgba(197,223,192,0.1); }
    .faq-item:last-child { border-bottom: none; }
    .faq-question {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; text-align: left; gap: 16px;
      font-size: 0.93rem; font-weight: 500; color: rgba(255,255,255,0.85);
      transition: color 0.2s; background: rgba(255,255,255,0.04);
    }
    .faq-question:hover { color: var(--sage); background: rgba(197,223,192,0.05); }
    .faq-toggle {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      border: 1px solid rgba(197,223,192,0.2);
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.4); transition: all 0.3s;
    }
    .faq-toggle.open { background: var(--sage); border-color: var(--sage); color: var(--ink); transform: rotate(45deg); }
    .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; background: rgba(255,255,255,0.03); }
    .faq-answer.open { max-height: 220px; }
    .faq-answer-inner { padding: 0 24px 20px; }
    .faq-answer-text { font-size: 0.87rem; color: rgba(255,255,255,0.5); line-height: 1.8; }

    /* ── Contact ── */
    .contact-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1.35fr; gap: 60px; align-items: start; }
    .contact-left { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 100px; }
    .contact-title {
      font-size: clamp(2.4rem, 4vw, 4rem);
      color: #fff; letter-spacing: -0.015em; margin-top: 14px; line-height: 1.05;
    }
    .contact-title em { color: var(--sage); font-style: italic; }
    .contact-sub { font-size: 0.9rem; color: rgba(255,255,255,0.45); line-height: 1.8; }
    .contact-detail {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 16px; border-radius: 14px;
      border: 1px solid rgba(197,223,192,0.12);
      background: rgba(255,255,255,0.04);
      transition: border-color 0.2s, background 0.2s;
    }
    .contact-detail:hover { border-color: rgba(197,223,192,0.3); background: rgba(197,223,192,0.06); }
    .contact-detail-icon {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      background: rgba(197,223,192,0.1); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
    }
    .contact-detail-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); }
    .contact-detail-value { font-size: 0.88rem; color: rgba(255,255,255,0.8); margin-top: 2px; font-weight: 500; }
    .contact-hours {
      background: rgba(197,223,192,0.05); border: 1px solid rgba(197,223,192,0.1);
      border-radius: 16px; padding: 20px;
    }
    .contact-hours-title {
      font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.14em;
      color: rgba(197,223,192,0.45); font-weight: 600; margin-bottom: 14px;
    }
    .hours-row { display: flex; justify-content: space-between; font-size: 0.82rem; padding: 7px 0; border-bottom: 1px solid rgba(197,223,192,0.08); }
    .hours-row:last-child { border-bottom: none; }
    .hours-day { color: rgba(255,255,255,0.45); }
    .hours-time { color: rgba(255,255,255,0.75); font-weight: 500; }

    /* ── Form ── */
    .contact-form-panel {
      background: rgba(255,255,255,0.08); backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 28px; padding: 36px 32px;
    }
    .form-panel-title { font-family: var(--font-cormorant), serif; font-size: 1.8rem; color: #fff; margin-bottom: 6px; }
    .form-panel-sub { font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-bottom: 28px; }
    .form-section-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 10px; }
    .chip-group { display: flex; flex-wrap: wrap; gap: 7px; }
    .chip {
      font-size: 0.77rem; padding: 6px 13px; border-radius: 100px;
      border: 1px solid rgba(197,223,192,0.2); background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.6); transition: all 0.2s; font-family: inherit;
    }
    .chip:hover { border-color: var(--sage); color: var(--sage); }
    .chip.active { background: var(--sage); border-color: var(--sage); color: var(--ink); font-weight: 600; }
    .form-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .form-field { display: flex; flex-direction: column; gap: 5px; }
    .form-field.full { grid-column: 1 / -1; }
    .form-label { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.06em; }
    .form-input {
      border: 1px solid rgba(197,223,192,0.15); border-radius: 12px;
      padding: 11px 14px; font-size: 0.88rem; font-family: inherit;
      color: #fff; background: rgba(255,255,255,0.06);
      transition: border-color 0.2s, box-shadow 0.2s; resize: vertical;
    }
    .form-input::placeholder { color: rgba(255,255,255,0.25); }
    .form-input:focus { outline: none; border-color: var(--sage); box-shadow: 0 0 0 3px rgba(197,223,192,0.1); }
    .form-msg { padding: 12px 16px; border-radius: 10px; font-size: 0.85rem; font-weight: 500; }
    .form-msg.success { background: rgba(197,223,192,0.15); color: var(--sage); border: 1px solid rgba(197,223,192,0.25); }
    .form-msg.error { background: rgba(255,100,100,0.1); color: #ff8080; border: 1px solid rgba(255,100,100,0.2); }
    .form-submit {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      background: var(--sage); color: var(--ink);
      font-size: 0.88rem; font-weight: 700; letter-spacing: 0.05em;
      padding: 14px 28px; border-radius: 100px; width: 100%;
      transition: background 0.25s, transform 0.2s;
    }
    .form-submit:hover:not(:disabled) { background: #fff; transform: translateY(-1px); }
    .form-submit:disabled { opacity: 0.5; cursor: not-allowed; }

    /* ── Footer ── */
    .footer-section { background: var(--ink); border-top: 1px solid rgba(197,223,192,0.08); padding: clamp(3rem, 5vw, 5rem) 0 0; }
    .footer-top {
      display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px;
      padding-bottom: clamp(2.5rem, 4vw, 4rem);
      border-bottom: 1px solid rgba(197,223,192,0.1);
    }
    .footer-brand { display: flex; flex-direction: column; gap: 16px; }
    .footer-tagline { font-size: 0.84rem; color: rgba(255,255,255,0.4); line-height: 1.7; max-width: 260px; }
    .footer-socials { display: flex; gap: 10px; }
    .footer-social {
      width: 34px; height: 34px; border-radius: 9px;
      border: 1px solid rgba(197,223,192,0.18); color: rgba(255,255,255,0.45);
      display: flex; align-items: center; justify-content: center; transition: all 0.2s;
    }
    .footer-social:hover { background: rgba(197,223,192,0.1); color: var(--sage); border-color: var(--sage); }
    .footer-col { display: flex; flex-direction: column; gap: 14px; }
    .footer-col-title { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--sage); font-weight: 700; }
    .footer-links { display: flex; flex-direction: column; gap: 9px; }
    .footer-link { font-size: 0.83rem; color: rgba(255,255,255,0.4); transition: color 0.2s; }
    .footer-link:hover { color: rgba(255,255,255,0.8); }
    .footer-contact-item { display: flex; align-items: flex-start; gap: 10px; }
    .footer-contact-icon { color: var(--sage); flex-shrink: 0; margin-top: 1px; }
    .footer-contact-text { font-size: 0.81rem; color: rgba(255,255,255,0.4); line-height: 1.5; transition: color 0.2s; }
    .footer-contact-item:hover .footer-contact-text { color: rgba(255,255,255,0.7); }
    .footer-bottom {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 0; gap: 16px; flex-wrap: wrap;
    }
    .footer-copy { font-size: 0.76rem; color: rgba(255,255,255,0.25); }
    .footer-web { font-size: 0.76rem; color: rgba(255,255,255,0.25); transition: color 0.2s; }
    .footer-web:hover { color: var(--sage); }

    /* ── WhatsApp ── */
    .wa-fab { position: fixed; bottom: 24px; right: 24px; z-index: 980; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; pointer-events: none; }
    .wa-panel {
      width: min(90vw, 360px); border-radius: 20px; overflow: hidden;
      background: #fff; border: 1px solid var(--border);
      box-shadow: 0 24px 64px rgba(11,11,11,0.18);
      transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
      transform-origin: bottom right;
    }
    .wa-panel.closed { opacity: 0; transform: scale(0.9) translateY(16px); pointer-events: none; }
    .wa-panel.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
    .wa-header { background: var(--ink); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
    .wa-header-info { display: flex; align-items: center; gap: 10px; }
    .wa-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--sage); color: var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .wa-name { font-size: 0.86rem; font-weight: 600; color: #fff; }
    .wa-status { font-size: 0.68rem; color: var(--sage); }
    .wa-close { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.55); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .wa-close:hover { border-color: var(--sage); color: var(--sage); }
    .wa-body { padding: 16px; background: #f8fbf7; display: flex; flex-direction: column; gap: 12px; }
    .wa-bubble { background: #fff; border: 1px solid var(--border); border-radius: 16px; border-top-left-radius: 4px; padding: 12px 14px; font-size: 0.84rem; line-height: 1.6; color: var(--ink); max-width: 90%; box-shadow: 0 2px 8px rgba(11,11,11,0.05); }
    .wa-quick { display: flex; flex-wrap: wrap; gap: 6px; }
    .wa-quick-btn { font-size: 0.74rem; padding: 6px 11px; border-radius: 100px; border: 1px solid var(--border); background: #fff; color: var(--ink); transition: all 0.2s; text-align: left; }
    .wa-quick-btn:hover, .wa-quick-btn.selected { background: var(--sage); border-color: var(--sage); }
    .wa-input-row { display: flex; gap: 8px; align-items: flex-end; }
    .wa-textarea { flex: 1; resize: none; border: 1px solid var(--border); border-radius: 12px; padding: 9px 13px; font-size: 0.84rem; font-family: inherit; color: var(--ink); background: #fff; transition: border-color 0.2s; }
    .wa-textarea:focus { outline: none; border-color: var(--sage); }
    .wa-send { width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0; background: var(--sage); color: var(--ink); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .wa-send:hover { background: var(--ink); color: var(--sage); }
    .wa-label { background: var(--ink); color: var(--sage); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 5px 13px; border-radius: 100px; font-weight: 700; pointer-events: auto; }
    .wa-toggle { width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(11,11,11,0.3); transition: all 0.3s; border: none; pointer-events: auto; }
    .wa-toggle.closed { background: var(--sage); color: var(--ink); }
    .wa-toggle.closed:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 18px 40px rgba(197,223,192,0.4); }
    .wa-toggle.open-state { background: var(--ink); color: var(--sage); }

    /* ── Mobile ── */
    .mobile-panel { position: fixed; inset: 0; z-index: 800; background: var(--ink); display: flex; flex-direction: column; overflow-y: auto; }
    .mobile-nav-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 0; border-bottom: 1px solid rgba(197,223,192,0.08);
      font-family: var(--font-cormorant), serif; font-size: 2rem;
      color: rgba(255,255,255,0.75); transition: color 0.2s; text-decoration: none;
      animation: mobileNavIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
    }
    .mobile-nav-item:hover { color: var(--sage); }
    @keyframes mobileNavIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .mobile-num { font-family: var(--font-dm), sans-serif; font-size: 0.68rem; color: rgba(197,223,192,0.35); letter-spacing: 0.1em; }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .hero-stats-row { flex-wrap: wrap; }
      .about-inner { grid-template-columns: 1fr; }
      .about-right { display: none; }
      .services-grid { grid-template-columns: repeat(2, 1fr); }
      .team-grid { grid-template-columns: repeat(2, 1fr); }
      .cases-stats { grid-template-columns: repeat(2, 1fr); }
      .cases-grid { grid-template-columns: repeat(2, 1fr); }
      .why-cards { grid-template-columns: repeat(2, 1fr); }
      .regions-grid { grid-template-columns: repeat(2, 1fr); }
      .testi-inner { grid-template-columns: 1fr; }
      .testi-sidebar { position: static; }
      .blog-layout { grid-template-columns: 1fr; }
      .faq-layout { grid-template-columns: 1fr; }
      .faq-sidebar { position: static; }
      .contact-grid { grid-template-columns: 1fr; }
      .contact-left { position: static; }
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
      .hero-title { font-size: clamp(3rem, 14vw, 5rem); }
      .hero { padding-bottom: 64px; }
      .hero-stats-row { width: 100%; }
      .hero-stat { flex: 1 1 50%; text-align: center; }
      .hero-stat-num { font-size: 1.7rem; }
      .hero-tagline { margin-bottom: 32px; }
      .blog-item-img { width: 96px; height: 96px; }
    }
    @media (min-width: 1025px) {
      .mobile-panel { display: none; }
    }
  `}</style>
);

// ─── Fixed Background (Law-themed SVG) ────────────────────────────────────────

function FixedBackground() {
  return (
    <div className="fixed-bg" aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0b0b0b" }}>
      {/* Background image */}
      <Image
        src="https://images.pexels.com/photos/9685285/pexels-photo-9685285.jpeg"
        alt="bg"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: 1 }}
      />
      {/* Black overlay for readability */}
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

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#legal-service`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/hero.png`,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  telephone: "+91 99943 88855",
  email: "agdlawassociatesoffice@gmail.com",
  foundingDate: "2016",
  founder: {
    "@type": "Person",
    name: "AGD Bala Kumar",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Tambaram" },
    { "@type": "City", name: "Avadi" },
    { "@type": "City", name: "Coimbatore" },
    { "@type": "City", name: "Tiruppur" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "AdministrativeArea", name: "Tamil Nadu" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+91 99943 88855",
      email: "agdlawassociatesoffice@gmail.com",
      url: `${SITE_URL}/#contact`,
      areaServed: "IN",
    },
  ],
  knowsAbout: serviceOptions.map((service) => service.label),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
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
    const desktopQuery = window.matchMedia("(min-width: 1025px)");
    const handleDesktopChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => desktopQuery.removeEventListener("change", handleDesktopChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`} style={{ display: menuOpen ? "none" : "block" }}>
        <div className="container">
          <div className="header-inner">
            <a href="#" className="logo-mark">
              <AGDLogoImg size={48} />
              <span>AGD Law Associates</span>
            </a>
            <nav className="nav-links" aria-label="Main navigation">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="nav-link"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a
                href="#contact"
                className="header-cta header-cta-desktop"
              >
                Consultation <ArrowRight size={13} />
              </a>
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="mobile-menu-btn"
                style={{ display: "none", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "9px", border: "1px solid rgba(197,223,192,0.2)", background: "transparent", color: "#fff", cursor: "pointer" }}
              >
                {menuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <style>{`@media(max-width:1024px){.mobile-menu-btn{display:inline-flex!important;}}`}</style>
      {menuOpen && (
        <div className="mobile-panel">
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
            <span className="logo-mark">
              <AGDLogoImg size={48} />
              AGD Law Associates
            </span>
            <button type="button" onClick={() => setMenuOpen(false)} style={{ width: "38px", height: "38px", border: "1px solid rgba(197,223,192,0.2)", borderRadius: "9px", background: "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={17} />
            </button>
          </div>
          <nav className="container" style={{ flex: 1, paddingTop: "16px" }}>
            {navLinks.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="mobile-nav-item"
                style={{ animationDelay: `${0.06 + i * 0.06}s` }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{l.label}</span>
                <span className="mobile-num">0{i + 1}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "32px", padding: "16px", borderRadius: "14px", background: "#c5dfc0", color: "#0b0b0b", fontWeight: "700", fontSize: "0.88rem", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" }}
            >
              Schedule Consultation <ArrowRight size={14} />
            </a>
          </nav>
          <div className="container" style={{ paddingBottom: "24px", paddingTop: "24px", borderTop: "1px solid rgba(197,223,192,0.08)" }}>
            <p style={{ fontSize: "0.7rem", color: "rgba(197,223,192,0.3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>© {new Date().getFullYear()} AGD Law Associates</p>
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
      <div className="hero-ornament" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Scale size={11} />
            Boutique Law Firm · Chennai · Est. 2016
          </div>
          <h1 className="hero-title">
            AGD<br /><em>Law</em>
          </h1>
          <p className="hero-firm-name">Associates</p>
          <p className="hero-tagline">
            Precision-driven litigation and advisory across criminal, civil, consumer,
            constitutional, and commercial matters — Tamil Nadu &amp; beyond.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Request Consultation <ArrowRight size={14} />
            </a>
            <a href="tel:+919994388855" className="btn-ghost">
              <Phone size={14} /> +91 99943 88855
            </a>
          </div>
          <div className="hero-stats-row">
            <div className="hero-stat">
              <div className="hero-stat-num">2016</div>
              <div className="hero-stat-lbl">Established</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">12+</div>
              <div className="hero-stat-lbl">Years Practice</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-lbl">Cases Handled</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">9</div>
              <div className="hero-stat-lbl">Practice Areas</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-lbl">Scroll</span>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = ["Criminal Law", "Civil Litigation", "Constitutional Remedies", "Consumer Protection", "Property Law", "Family Law", "Arbitration & ADR", "Corporate Advisory", "MCOP & RCOP"];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}<span className="ticker-sep"> ◆ </span>
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
    <section className="panel" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-left">
            <span className="section-label">About Us</span>
            <h2 className="about-pretitle">
              Your legal matter<br />deserves <em>precision</em>
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
              and a legal team genuinely invested in their outcome. From first consultation
              to final resolution, we stand by you.
            </p>
            <div className="about-stats">
              {[{ num: "2016", lbl: "Established" }, { num: "10+", lbl: "Advocates" }, { num: "6", lbl: "Active Cities" }].map((s) => (
                <div className="about-stat-box" key={s.lbl}>
                  <div className="about-stat-num">{s.num}</div>
                  <div className="about-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
            <div className="about-creds">
              {credentials.map((c) => (
                <span className="cred-tag" key={c}><CheckCircle size={12} />{c}</span>
              ))}
            </div>
            <a href="#contact" className="btn-primary" style={{ width: "fit-content" }}>
              Schedule a Consultation <ArrowRight size={14} />
            </a>
          </div>
          <div className="about-right">
            <div style={{ position: "relative", paddingRight: "24px", paddingTop: "24px" }}>
              <div className="about-img-accent">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=600&fit=crop"
                  alt="Law office"
                  loading="lazy"
                />
              </div>
              <div className="about-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=1000&fit=crop&crop=faces"
                  alt="AGD Law Associates counsel"
                  loading="lazy"
                />
              </div>
              <div className="about-img-badge">
                <div className="about-badge-num">12+</div>
                <div className="about-badge-lbl">Years of<br />Practice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

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
    <section className="panel-dark" id="services">
      <div className="container">
        <div className="services-inner">
          <div className="services-head">
            <div>
              <span className="section-label-dark">Practice Areas</span>
              <h2 className="services-title">Areas of <em>expertise</em></h2>
            </div>
            <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
              Discuss Your Case <ArrowRight size={13} />
            </a>
          </div>
          <div className="services-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              const slug = serviceTitleToSlug[s.title];
              return (
                <Link href={slug ? `/services/${slug}` : "#"} className="service-card" key={s.title} style={{ textDecoration: "none", color: "inherit" }}>
                  <span className="service-num">0{i + 1}</span>
                  <div className="service-icon-wrap"><Icon size={17} /></div>
                  <h3 className="service-name">{s.title}</h3>
                  <p className="service-desc">{s.description}</p>
                  <div className="service-arrow"><ArrowRight size={13} /></div>
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
    <section className="panel" id="team">
      <div className="container">
        <div className="team-inner">
          <div className="team-head">
            <div>
              <span className="section-label">Our Team</span>
              <h2 className="team-title">The counsel behind<br />your <em>case</em></h2>
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
    <section className="panel-tinted" id="cases">
      <div className="container">
        <div className="cases-inner">
          <div className="cases-head">
            <div>
              <span className="section-label">Track Record</span>
              <h2 className="cases-title">Results that <em>speak</em></h2>
            </div>
            <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
              Discuss Your Case <ArrowRight size={13} />
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
                  <div>
                    <div className="case-court">{c.court}</div>
                    <div className="case-year">{c.year}</div>
                  </div>
                  <div className="case-outcome"><CheckCircle size={10} />{c.outcome}</div>
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
    <section className="panel-dark" id="why-me">
      <div className="container">
        <div className="regions-inner-content">
          <div className="regions-head">
            <span className="section-label-dark">Why Choose Us</span>
            <h2 className="regions-title">Why <em>AGD</em> Law Associates</h2>
            <p className="regions-sub">A trusted boutique firm serving clients across Tamil Nadu and beyond</p>
          </div>
          <div className="why-cards">
            {whyItems.map((w) => {
              const Icon = w.icon;
              return (
                <div className="why-card" key={w.title}>
                  <div className="why-icon"><Icon size={20} /></div>
                  <div className="why-title">{w.title}</div>
                  <div className="why-desc">{w.desc}</div>
                </div>
              );
            })}
          </div>
          <div className="regions-presence">
            <div className="regions-presence-header">Our Practice Presence</div>
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
      </div>
    </section>
  );
}

// ─── Testimonial / Leadership ──────────────────────────────────────────────────

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
    <section className="panel" id="testimonial" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="container">
        <div className="testi-section">
          <div className="testi-inner">
            <div className="testi-sidebar">
              <span className="section-label">Leadership</span>
              <h2 className="testi-sidebar-title">
                Courtroom <em>precision</em><br />at every level
              </h2>
              <p className="testi-sidebar-body">
                AGD Bala Kumar leads the firm with over 12 years of practice, combining
                litigation strength with strategic advisory for complex matters.
              </p>
              <div className="testi-nav">
                <button type="button" className="testi-nav-btn" onClick={prev} aria-label="Previous"><ArrowLeft size={15} /></button>
                <button type="button" className="testi-nav-btn" onClick={next} aria-label="Next"><ArrowRight size={15} /></button>
                <div className="testi-counter">{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
              </div>
              <div className="testi-progress">
                <div className="testi-bar" style={{ width: `${((current + 1) / total) * 100}%` }} />
              </div>
              <div className="testi-dots">
                {testimonials.map((_, i) => (
                  <button key={i} type="button" className="testi-dot" style={{ width: i === current ? "28px" : "8px", opacity: i === current ? 1 : 0.35 }} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
            </div>
            <div>
              <article key={`${t.name}-${current}`} className="testi-card">
                <div className="testi-stars">{Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}</div>
                <blockquote className="testi-quote">&ldquo;{t.feedback}&rdquo;</blockquote>
                <div className="testi-author">
                  <img src={t.img} alt={t.name} className="testi-avatar" loading="lazy" />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
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
    <section className="panel-dark" id="blog">
      <div className="container">
        <div className="blog-inner">
          <div className="blog-head">
            <div>
              <span className="section-label-dark">Legal Insights</span>
              <h2 className="blog-title">From our <em>desk</em></h2>
            </div>
            <Link href="/blog" className="btn-ghost" style={{ flexShrink: 0 }}>All Articles <ArrowRight size={13} /></Link>
          </div>
          <div className="blog-layout">
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="blog-featured" style={{ textDecoration: "none" }}>
                <img src={featured.img} alt={featured.title} className="blog-featured-img" loading="lazy" />
                <div className="blog-featured-body">
                  <div className="blog-cat">{featured.category}</div>
                  <h3 className="blog-title-main">{featured.title}</h3>
                  <p className="blog-excerpt">{featured.excerpt}</p>
                  <div className="blog-meta">
                    <span>{featured.author}</span>
                    <span className="blog-meta-sep">·</span>
                    <span>{featured.date}</span>
                    <span className="blog-meta-sep">·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </Link>
            )}
            <div className="blog-list">
              {rest.map((p) => (
                <Link href={`/blog/${p.slug}`} key={p.slug} className="blog-item" style={{ textDecoration: "none" }}>
                  <img src={p.img} alt={p.title} className="blog-item-img" loading="lazy" />
                  <div className="blog-item-body">
                    <div className="blog-item-cat">{p.category}</div>
                    <div className="blog-item-title">{p.title}</div>
                    <div className="blog-item-meta">{p.date} · {p.readTime}</div>
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
    <section className="panel" id="faq">
      <div className="container">
        <div className="faq-inner">
          <div className="faq-layout">
            <div className="faq-sidebar">
              <span className="section-label">FAQ</span>
              <h2 className="faq-sidebar-title">Common <em>questions</em></h2>
              <p className="faq-sidebar-body">
                Everything you need to know about working with AGD Law Associates.
                Can&apos;t find what you&apos;re looking for? Contact us directly.
              </p>
              <a href="#contact" className="btn-primary faq-cta">
                Contact Us <ArrowRight size={13} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div className="faq-item" key={i}>
                    <button type="button" className="faq-question" onClick={() => toggle(i)} aria-expanded={isOpen}>
                      <span>{faq.q}</span>
                      <span className={`faq-toggle${isOpen ? " open" : ""}`}><X size={13} /></span>
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
    <section className="panel-dark" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-grid">
            <div className="contact-left">
              <span className="section-label-dark">Get In Touch</span>
              <h2 className="contact-title">Need legal<br /><em>support?</em><br />Let&apos;s connect.</h2>
              <p className="contact-sub">Reach out directly or fill the form — we respond during office hours. Every matter is handled with strict confidentiality.</p>
              {[
                { icon: PhoneCall, label: "Phone", value: "+91 99943 88855", href: "tel:+919994388855" },
                { icon: Mail, label: "Email", value: "agdlawassociatesoffice@gmail.com", href: "mailto:agdlawassociatesoffice@gmail.com" },
                { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu", href: "#" },
              ].map((d) => {
                const Icon = d.icon;
                return (
                  <a key={d.label} href={d.href} className="contact-detail" style={{ textDecoration: "none" }}>
                    <div className="contact-detail-icon"><Icon size={15} /></div>
                    <div>
                      <div className="contact-detail-label">{d.label}</div>
                      <div className="contact-detail-value">{d.value}</div>
                    </div>
                  </a>
                );
              })}
              <div className="contact-hours">
                <p className="contact-hours-title">Office Hours</p>
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
            <div className="contact-form-panel">
              <h3 className="form-panel-title">Send a Message</h3>
              <p className="form-panel-sub">We typically respond within 1 business day.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                <div>
                  <p className="form-section-label">Select Service Area</p>
                  <div className="chip-group">
                    {serviceOptions.map((s) => (
                      <button key={s.value} type="button" className={`chip${form.service_type === s.value ? " active" : ""}`} onClick={() => selectPill("service_type", s.value)} aria-pressed={form.service_type === s.value}>{s.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="form-section-label">Preferred Timeline</p>
                  <div className="chip-group">
                    {budgetOptions.map((b) => (
                      <button key={b.value} type="button" className={`chip${form.budget === b.value ? " active" : ""}`} onClick={() => selectPill("budget", b.value)} aria-pressed={form.budget === b.value}>{b.label}</button>
                    ))}
                  </div>
                </div>
                <div className="form-fields">
                  <div className="form-field">
                    <label htmlFor="your_name" className="form-label">Your Name</label>
                    <input type="text" id="your_name" name="your_name" placeholder="John Doe" required value={form.your_name} onChange={handleChange} className="form-input" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="your_email" className="form-label">Email Address</label>
                    <input type="email" id="your_email" name="your_email" placeholder="john@email.com" required value={form.your_email} onChange={handleChange} className="form-input" />
                  </div>
                  <div className="form-field full">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="Briefly describe your legal matter..." value={form.message} onChange={handleChange} className="form-input" />
                  </div>
                </div>
                {submitState.message && (
                  <div className={`form-msg ${submitState.type}`}>{submitState.message}</div>
                )}
                <button type="submit" className="form-submit" disabled={isSubmitting}>
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
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-mark">
              <AGDLogoImg size={34} />
              AGD Law Associates
            </div>
            <p className="footer-tagline">Precision-driven litigation and advisory services across Tamil Nadu and beyond. Established 2016.</p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" className="footer-social" aria-label="X (Twitter)"><XIcon /></a>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Quick Links</div>
            <div className="footer-links">
              {quickLinks.map((l) => <a key={l.label} href={l.href} className="footer-link">{l.label}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Practice Areas</div>
            <div className="footer-links">
              {serviceLinks.map((s) => <span key={s} className="footer-link" style={{ cursor: "default" }}>{s}</span>)}
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <a href="tel:+919994388855" className="footer-contact-item" style={{ textDecoration: "none" }}>
                <PhoneCall size={13} className="footer-contact-icon" />
                <span className="footer-contact-text">+91 99943 88855</span>
              </a>
              <a href="mailto:agdlawassociatesoffice@gmail.com" className="footer-contact-item" style={{ textDecoration: "none" }}>
                <Mail size={13} className="footer-contact-icon" />
                <span className="footer-contact-text">agdlawassociatesoffice@gmail.com</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={13} className="footer-contact-icon" />
                <span className="footer-contact-text">Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} AGD Law Associates. All rights reserved.</p>
          <a href="https://www.agdlawassociates.in" target="_blank" rel="noopener noreferrer" className="footer-web">www.agdlawassociates.in</a>
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
            <div className="wa-avatar"><MessageCircle size={14} /></div>
            <div>
              <div className="wa-name">AGD Legal Desk</div>
              <div className="wa-status">Replies during office hours</div>
            </div>
          </div>
          <button type="button" className="wa-close" onClick={() => setOpen(false)} aria-label="Close"><X size={12} /></button>
        </div>
        <div className="wa-body">
          <div className="wa-bubble">Hi! Thanks for reaching out to AGD Law Associates. Select a quick message or type your query below.</div>
          <div className="wa-quick">
            {quickMessages.map((m) => (
              <button key={m} type="button" className={`wa-quick-btn${message === m ? " selected" : ""}`} onClick={() => setMessage(m)}>{m}</button>
            ))}
          </div>
          <div className="wa-input-row">
            <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); openWhatsApp(); } }} placeholder="Type your message..." className="wa-textarea" aria-label="WhatsApp message" />
            <button type="button" className="wa-send" onClick={() => openWhatsApp()} aria-label="Send"><Send size={14} /></button>
          </div>
        </div>
      </div>
      {!open && <div className="wa-label">Chat with AGD</div>}
      <button type="button" className={`wa-toggle ${open ? "open-state" : "closed"}`} onClick={() => setOpen((v) => !v)} aria-label={open ? "Close chat" : "Open chat"}>
        {open ? <X size={19} /> : <MessageCircle size={21} />}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  useEffect(() => {
    const getHeaderOffset = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-offset")
        .trim();
      const parsed = Number.parseFloat(value);
      return Number.isNaN(parsed) ? 96 : parsed;
    };

    const scrollToHash = (hash, updateHistory = false) => {
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

      if (updateHistory && window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }
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

    const handleHashChange = () => {
      scrollToHash(window.location.hash, false);
    };

    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, false));
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className={`${dmSans.variable} ${cormorant.variable}`}>
      <Script
        id="agd-law-legal-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <Script
        id="agd-law-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GlobalStyles />
      <FixedBackground />
      <div className="scroll-layer">
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
      </div>
      <WhatsAppFloatingChat />
    </div>
  );
}
