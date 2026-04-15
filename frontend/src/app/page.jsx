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
  Plus,
  Shield,
  Clock,
  Award,
  Users,
  BookOpen,
  Menu,
  Scale,
  User,
  Briefcase,
  CheckCircle,
} from "lucide-react";

const SITE_URL = "https://www.agdlawassociates.in";
const SITE_NAME = "AGD Law Associates";
const SITE_DESCRIPTION =
  "AGD Law Associates is a boutique law firm in Chennai delivering precision-driven litigation and advisory across criminal, civil, constitutional, consumer, property, family, arbitration, and corporate matters.";

const contactNumbers = [
  { display: "+91 89395 88855", tel: "+918939588855" },
  { display: "+91 99943 88855", tel: "+919994388855" },
  { display: "+91 89396 88855", tel: "+918939688855" },
];
const primaryContactNumber = contactNumbers[0];


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
      --surface-base: rgba(15,19,17,0.8);
      --surface-elevated: rgba(20,25,22,0.86);
      --surface-elevated-strong: rgba(24,31,27,0.92);
      --surface-tint: rgba(31,42,35,0.88);
      --surface-border: rgba(197,223,192,0.28);
      --surface-border-strong: rgba(197,223,192,0.42);
      --surface-shadow: 0 16px 44px rgba(0,0,0,0.3);
      --text-strong: rgba(255,255,255,0.96);
      --text-body: rgba(255,255,255,0.84);
      --text-muted: rgba(255,255,255,0.72);
      --text-subtle: rgba(255,255,255,0.62);
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
      // box-shadow: 0 1px 0 rgba(197,223,192,0.1), 0 8px 32px rgba(0,0,0,0.3);
    }
    .header-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 90px; gap: 24px;
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
      font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.78);
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
      display: flex; align-items: center; 
      padding: clamp(112px, 16vh, 156px) 0 88px;
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
      max-width: 920px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
    .hero-copy-block {
      max-width: 760px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 0.68rem; font-weight: 600; letter-spacing: 0.22em;
      text-transform: uppercase; color: var(--sage);
      border: 1px solid rgba(197,223,192,0.25);
      background: rgba(12,16,14,0.46);
      border-radius: 100px; padding: 7px 16px; margin-bottom: 20px;
    }
    .hero-firm-name {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.52);
      letter-spacing: 0.34em; text-transform: uppercase;
      font-family: var(--font-dm), sans-serif; font-weight: 500;
      margin-bottom: 18px;
    }
    .hero-title {
      font-size: clamp(3.2rem, 6.4vw, 6.6rem);
      color: #fff; line-height: 0.92;
      letter-spacing: -0.03em; margin-bottom: 22px;
    }
    .hero-title em { color: var(--sage); font-style: italic; }
    .hero-tagline {
      font-size: clamp(1rem, 1.1vw, 1.12rem); color: var(--text-body);
      line-height: 1.82; max-width: 620px; margin: 0 auto 0;
      font-family: var(--font-dm), sans-serif;
    }
    .hero-actions {
      display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
      margin-top: 34px;
    }
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
      margin-top: 52px;
      border: 1px solid var(--surface-border);
      background: linear-gradient(180deg, rgba(9,12,11,0.7) 0%, rgba(9,12,11,0.52) 100%);
      backdrop-filter: blur(14px);
      box-shadow: 0 24px 60px rgba(0,0,0,0.2);
      border-radius: 24px; overflow: hidden; width: fit-content;
      margin-left: auto; margin-right: auto;
    }
    .hero-stat {
      min-width: 152px;
      padding: 20px 28px; border-right: 1px solid var(--surface-border);
    }
    .hero-stat:last-child { border-right: none; }
    .hero-stat-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2.2rem; color: var(--sage); line-height: 0.95;
    }
    .hero-stat-lbl {
      font-size: 0.66rem; color: var(--text-subtle);
      text-transform: uppercase; letter-spacing: 0.14em; margin-top: 8px;
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

    /* ── Section Surfaces ── */
    .panel, .panel-dark, .panel-tinted { position: relative; }
    .panel {
      background: linear-gradient(180deg, rgba(7,9,8,0.5) 0%, rgba(7,9,8,0.58) 100%);
    }
    .panel-dark {
      background: linear-gradient(180deg, rgba(4,6,5,0.66) 0%, rgba(4,6,5,0.74) 100%);
    }
    .panel-tinted {
      background: linear-gradient(180deg, rgba(15,20,17,0.62) 0%, rgba(6,8,7,0.72) 100%);
    }

    /* ── About ── */
    .about-inner {
      position: relative;
      display: flex; flex-direction: column;
      gap: clamp(2rem, 4vw, 3.75rem);
      padding: clamp(5rem, 8vw, 9rem) 0;
      max-width: 980px; margin: 0 auto;
    }
    .about-content {
      display: flex; flex-direction: column; gap: 28px;
    }
    .about-eyebrow-row {
      display: flex; align-items: center; gap: 14px;
    }
    .about-eyebrow-line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, rgba(197,223,192,0.5), transparent);
    }
    .about-pretitle {
      font-size: clamp(2.8rem, 4.2vw, 4.8rem);
      line-height: 1.02; letter-spacing: -0.015em; color: #fff;
      max-width: 760px;
    }
    .about-pretitle em { color: var(--sage); font-style: italic; }
    .about-copy {
      display: flex; flex-direction: column; gap: 18px;
      max-width: 820px;
    }
    .about-lead {
      font-size: 1.05rem; line-height: 1.85; color: var(--text-body);
      position: relative; padding-left: 20px;
    }
    .about-lead::before {
      content: '';
      position: absolute; left: 0; top: 6px; bottom: 6px;
      width: 2px;
      background: linear-gradient(180deg, var(--sage), rgba(197,223,192,0.2));
      border-radius: 2px;
    }
    .about-body {
      font-size: 0.93rem; line-height: 1.9; color: var(--text-muted);
    }
    .about-proof-strip {
      display: grid; grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center; gap: 18px;
      padding: 22px;
      background: linear-gradient(135deg, rgba(197,223,192,0.08) 0%, rgba(12,16,14,0.72) 62%);
      border: 1px solid rgba(197,223,192,0.22);
      border-radius: 8px;
    }
    .about-founder-avatar {
      width: 52px; height: 52px; border-radius: 8px; flex-shrink: 0;
      background: rgba(197,223,192,0.13);
      border: 1px solid rgba(197,223,192,0.3);
      display: flex; align-items: center; justify-content: center;
      color: var(--sage);
    }
    .about-founder-name {
      font-family: var(--font-cormorant), serif;
      font-size: 1.35rem; color: #fff; line-height: 1.15;
    }
    .about-founder-role {
      font-size: 0.68rem; color: var(--sage); text-transform: uppercase;
      letter-spacing: 0.12em; margin-top: 4px;
    }
    .about-founder-exp {
      text-align: right; flex-shrink: 0;
      padding-left: 18px;
      border-left: 1px solid rgba(197,223,192,0.18);
    }
    .about-founder-exp-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2.05rem; color: var(--sage); line-height: 1;
    }
    .about-founder-exp-lbl {
      font-size: 0.6rem; color: var(--text-subtle); text-transform: uppercase;
      letter-spacing: 0.1em; margin-top: 2px;
    }
    .about-stats-row {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .about-stat-box {
      background: rgba(12,16,14,0.6);
      border: 1px solid rgba(197,223,192,0.16);
      padding: 20px 18px; border-radius: 8px;
      display: flex; flex-direction: column; gap: 6px;
      transition: background 0.25s, border-color 0.25s, transform 0.25s;
    }
    .about-stat-box:hover {
      background: rgba(20,28,24,0.85);
      border-color: rgba(197,223,192,0.3);
      transform: translateY(-2px);
    }
    .about-stat-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2.6rem; color: var(--sage); line-height: 1;
    }
    .about-stat-lbl {
      font-size: 0.62rem; color: var(--text-subtle);
      text-transform: uppercase; letter-spacing: 0.13em;
    }
    .about-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
    .about-values-block {
      display: flex; flex-direction: column; gap: 14px;
    }
    .about-values-header {
      display: flex; align-items: center; gap: 12px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(197,223,192,0.18);
    }
    .about-values-header-line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, rgba(197,223,192,0.4), transparent);
    }
    .about-values-kicker {
      font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.16em; color: rgba(197,223,192,0.6);
    }
    .about-values-list {
      display: flex; flex-direction: column; gap: 10px;
    }
    .about-value-card {
      background: rgba(12,16,14,0.55);
      border: 1px solid rgba(197,223,192,0.13);
      border-radius: 8px; padding: 18px;
      display: grid; grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: start; gap: 16px;
      transition: background 0.25s, border-color 0.25s, transform 0.25s;
      cursor: default;
    }
    .about-value-card:hover {
      background: rgba(20,28,24,0.8);
      border-color: rgba(197,223,192,0.28);
      transform: translateY(-3px);
    }
    .about-value-icon {
      width: 42px; height: 42px; border-radius: 8px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(197,223,192,0.09); color: var(--sage);
      border: 1px solid rgba(197,223,192,0.18);
      transition: background 0.25s, border-color 0.25s;
    }
    .about-value-card:hover .about-value-icon {
      background: rgba(197,223,192,0.16);
      border-color: rgba(197,223,192,0.35);
    }
    .about-value-num {
      font-family: var(--font-cormorant), serif;
      font-size: 0.75rem; color: rgba(197,223,192,0.38);
      letter-spacing: 0.08em;
    }
    .about-value-title {
      font-family: var(--font-cormorant), serif;
      font-size: 1.22rem; color: #fff; line-height: 1.15; margin-bottom: 5px;
    }
    .about-value-text {
      font-size: 0.8rem; color: var(--text-muted); line-height: 1.7;
    }
    .about-creds { display: flex; flex-wrap: wrap; gap: 7px; }
    .cred-tag {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 0.76rem; color: var(--sage); font-weight: 500;
      background: rgba(197,223,192,0.08); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 5px 12px;
      transition: background 0.2s;
    }
    .cred-tag:hover { background: rgba(197,223,192,0.15); }
    .cred-tag svg { color: var(--sage); flex-shrink: 0; }
    .about-note {
      display: flex; align-items: flex-start; gap: 13px;
      padding: 16px 18px; border-radius: 8px;
      border: 1px solid rgba(197,223,192,0.2);
      background: rgba(197,223,192,0.04);
      color: var(--text-body); font-size: 0.85rem; line-height: 1.7;
      margin-top: 2px;
    }
    .about-note svg { color: var(--sage); flex-shrink: 0; margin-top: 3px; }

    /* ── Services ── */
    .services-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .services-head {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2.5rem, 4vw, 4rem); gap: 24px; flex-wrap: wrap;
      padding-bottom: clamp(2rem, 3vw, 3rem);
      border-bottom: 1px solid rgba(197,223,192,0.18);
    }
    .services-title {
      font-size: clamp(2.2rem, 3.5vw, 3.6rem);
      color: #fff; letter-spacing: -0.01em; margin-top: 14px;
    }
    .services-title em { color: var(--sage); font-style: italic; }
    .services-intro-row {
      display: flex; align-items: flex-start; gap: 32px;
      margin-bottom: clamp(2rem, 3.5vw, 3.5rem); flex-wrap: wrap;
    }
    .services-intro-text {
      flex: 1 1 ; max-width: 500px;
      font-size: 0.94rem; line-height: 1.85; color: var(--text-muted);
    }
    .services-intro-stats {
      display: flex; gap: 24px; flex-wrap: wrap;
    }
    .services-intro-stat {
      display: flex; flex-direction: column; gap: 4px;
    }
    .services-intro-stat-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2rem; color: var(--sage); line-height: 1;
    }
    .services-intro-stat-lbl {
      font-size: 0.6rem; color: var(--text-subtle);
      text-transform: uppercase; letter-spacing: 0.12em;
    }
    /* Featured service card */
    .service-featured-card {
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, rgba(197,223,192,0.1) 0%, rgba(12,16,14,0.7) 55%, rgba(4,6,5,0.85) 100%);
      border: 1px solid rgba(197,223,192,0.25);
      border-radius: 24px; padding: 36px 32px;
      display: grid; grid-template-columns: auto 1fr auto;
      align-items: center; gap: 24px;
      margin-bottom: 16px;
      transition: border-color 0.3s, transform 0.3s, background 0.3s;
      text-decoration: none; color: inherit;
    }
    .service-featured-card::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at top left, rgba(197,223,192,0.07) 0%, transparent 65%);
      pointer-events: none;
    }
    .service-featured-card:hover {
      border-color: rgba(197,223,192,0.42);
      transform: translateY(-3px);
      background: linear-gradient(135deg, rgba(197,223,192,0.14) 0%, rgba(16,22,18,0.78) 55%, rgba(6,9,7,0.9) 100%);
    }
    .service-featured-badge {
      position: absolute; top: 20px; right: 20px;
      font-size: 0.6rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.16em; color: var(--sage);
      background: rgba(197,223,192,0.12); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 4px 10px;
    }
    .service-featured-icon-wrap {
      width: 56px; height: 56px; border-radius: 14px; flex-shrink: 0;
      background: rgba(197,223,192,0.12); color: var(--sage);
      border: 1px solid rgba(197,223,192,0.25);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.3s, border-color 0.3s;
    }
    .service-featured-card:hover .service-featured-icon-wrap {
      background: rgba(197,223,192,0.2); border-color: rgba(197,223,192,0.4);
    }
    .service-featured-num {
      position: absolute; top: 22px; left: 22px;
      font-family: var(--font-cormorant), serif;
      font-size: 0.78rem; color: rgba(197,223,192,0.3);
      letter-spacing: 0.06em;
    }
    .service-featured-name {
      font-family: var(--font-cormorant), serif;
      font-size: clamp(1.7rem, 2.5vw, 2.4rem); color: #fff;
      line-height: 1.1; margin-bottom: 10px;
    }
    .service-featured-desc {
      font-size: 0.88rem; color: var(--text-muted); line-height: 1.75;
      max-width: 560px;
    }
    .service-featured-arrow {
      width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
      border: 1px solid rgba(197,223,192,0.25); color: rgba(197,223,192,0.6);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.25s;
    }
    .service-featured-card:hover .service-featured-arrow {
      background: var(--sage); color: var(--ink);
      border-color: var(--sage); transform: translateX(4px);
    }
    /* Services grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .service-grid-card {
      position: relative; overflow: hidden;
      background: rgba(13,17,15,0.6);
      border: 1px solid rgba(197,223,192,0.13);
      border-radius: 18px; padding: 22px 20px;
      display: flex; flex-direction: column; gap: 14px;
      transition: background 0.3s, border-color 0.3s, transform 0.3s;
      text-decoration: none; color: inherit;
    }
    .service-grid-card::after {
      content: '';
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--sage), transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .service-grid-card:hover {
      background: rgba(20,28,24,0.8);
      border-color: rgba(197,223,192,0.28);
      transform: translateY(-4px);
    }
    .service-grid-card:hover::after { opacity: 1; }
    .service-grid-num {
      font-family: var(--font-cormorant), serif;
      font-size: 0.72rem; color: rgba(197,223,192,0.35);
      letter-spacing: 0.08em;
    }
    .service-grid-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: rgba(197,223,192,0.08); color: var(--sage);
      border: 1px solid rgba(197,223,192,0.15);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.3s, border-color 0.3s;
    }
    .service-grid-card:hover .service-grid-icon {
      background: rgba(197,223,192,0.15);
      border-color: rgba(197,223,192,0.3);
    }
    .service-grid-name {
      font-family: var(--font-cormorant), serif;
      font-size: 1.18rem; color: #fff; line-height: 1.2;
      flex: 1;
    }
    .service-grid-desc {
      font-size: 0.78rem; color: var(--text-muted); line-height: 1.72;
    }
    .service-grid-footer {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: auto; padding-top: 12px;
      border-top: 1px solid rgba(197,223,192,0.1);
    }
    .service-grid-arrow {
      width: 28px; height: 28px; border-radius: 50%;
      border: 1px solid rgba(197,223,192,0.2); color: rgba(197,223,192,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.25s;
    }
    .service-grid-card:hover .service-grid-arrow {
      background: var(--sage); color: var(--ink);
      border-color: var(--sage); transform: translateX(2px);
    }
    .service-grid-tag {
      font-size: 0.6rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: rgba(197,223,192,0.45);
    }
    /* Services CTA bar */
    .services-cta-bar {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 20px;
      margin-top: 28px; padding: 24px 28px;
      background: rgba(12,16,14,0.55);
      border: 1px solid rgba(197,223,192,0.16);
      border-radius: 18px;
    }
    .services-cta-bar-text {
      font-size: 0.9rem; color: var(--text-muted);
    }
    .services-cta-bar-text strong { color: var(--text-body); font-weight: 500; }

    /* ── Team ── */
    .team-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .team-head {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: clamp(2.5rem, 4vw, 4rem); gap: 24px; flex-wrap: wrap;
    }
    .team-title {
      font-size: clamp(2.2rem, 3.5vw, 3.6rem);
      color: #fff; letter-spacing: 0; margin-top: 14px;
    }
    .team-title em { color: var(--sage); font-style: italic; }
    .team-streams {
      display: flex; flex-direction: column; gap: 14px;
      overflow: hidden;
      padding: 12px 0;
      border-block: 1px solid rgba(197,223,192,0.22);
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }
    .team-stream {
      overflow: hidden;
    }
    .team-track {
      display: flex; width: max-content; gap: 12px;
      animation: teamDrift 34s linear infinite;
    }
    .team-stream:nth-child(2) .team-track {
      animation-direction: reverse;
      animation-duration: 38s;
    }
    @keyframes teamDrift {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .team-card {
      position: relative;
      min-height: 74px; padding: 14px 18px;
      border: 1px solid var(--surface-border);
      border-radius: 8px; background: rgba(20,25,22,0.72);
      box-shadow: none;
      display: grid; grid-template-columns: auto minmax(220px, 1fr); align-items: center; gap: 14px;
      transition: transform 0.25s, border-color 0.25s, background 0.25s;
    }
    .team-card:hover {
      transform: translateY(-2px);
      border-color: var(--surface-border-strong);
      background: var(--surface-tint);
    }
    .team-index {
      width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
      border: 1px solid rgba(197,223,192,0.22);
      background: rgba(197,223,192,0.09);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--sage); font-size: 0.7rem; font-weight: 700;
      letter-spacing: 0.08em;
    }
    .team-card:hover .team-icon {
      transform: scale(1.1);
      background: rgba(255,255,255,0.15);
    }
    .team-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.08);
      color: #fff;
      flex-shrink: 0;
    }
    .team-body {
      min-width: 0;
    }
    .team-name {
      font-family: var(--font-cormorant), serif;
      font-size: clamp(1.2rem, 2vw, 1.5rem); color: #fff; line-height: 1.15;
      overflow-wrap: anywhere;
    }
    .team-role {
      margin-top: 4px;
      font-size: 0.68rem;
      color: var(--text-subtle);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

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
      background: var(--surface-base); backdrop-filter: blur(14px);
      border: 1px solid var(--surface-border);
      border-radius: 18px; padding: 22px 20px;
      box-shadow: var(--surface-shadow);
      text-align: center;
    }
    .cstat-num {
      font-family: var(--font-cormorant), serif;
      font-size: 2.4rem; color: var(--sage); line-height: 1;
    }
    .cstat-lbl { font-size: 0.67rem; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 5px; }
    .cases-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    }
    .case-card {
      background: var(--surface-elevated); backdrop-filter: blur(16px);
      border: 1px solid var(--surface-border);
      border-radius: 20px; padding: 26px 24px;
      display: flex; flex-direction: column; gap: 10px;
      transition: transform 0.3s, border-color 0.3s, background 0.3s;
      box-shadow: var(--surface-shadow);
    }
    .case-card:hover { transform: translateY(-4px); border-color: var(--surface-border-strong); background: var(--surface-tint); }
    .case-card.highlight {
      background: var(--surface-tint); border-color: var(--surface-border-strong);
    }
    .case-category {
      font-size: 0.63rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.12em; color: var(--sage);
    }
    .case-card.highlight .case-category { color: var(--sage); }
    .case-title { font-family: var(--font-cormorant), serif; font-size: 1.25rem; color: #fff; }
    .case-card.highlight .case-title { color: #fff; }
    .case-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.7; flex: 1; }
    .case-card.highlight .case-desc { color: var(--text-body); }
    .case-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; padding-top: 14px; border-top: 1px solid var(--surface-border); }
    .case-card.highlight .case-footer { border-top-color: var(--surface-border-strong); }
    .case-court { font-size: 0.72rem; color: var(--text-subtle); }
    .case-card.highlight .case-court { color: var(--text-muted); }
    .case-year { font-size: 0.7rem; color: rgba(255,255,255,0.52); margin-top: 2px; }
    .case-card.highlight .case-year { color: var(--text-subtle); }
    .case-outcome {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 0.7rem; font-weight: 700; color: var(--sage);
      background: rgba(197,223,192,0.2); border-radius: 100px;
      padding: 4px 10px;
    }
    .case-card.highlight .case-outcome { background: rgba(197,223,192,0.24); color: var(--sage); }

    /* ── Why / Regions ── */
    .regions-inner-content { padding: clamp(4rem, 7vw, 8rem) 0; }
    .regions-head {
      display: flex; justify-content: space-between; align-items: flex-end;
      gap: 24px; flex-wrap: wrap;
      margin-bottom: clamp(2.5rem, 4vw, 4rem);
    }
    .regions-title {
      font-size: clamp(2.4rem, 4vw, 4rem);
      color: #fff; letter-spacing: 0; margin: 14px 0 12px;
    }
    .regions-title em { color: var(--sage); font-style: italic; }
    .regions-sub { font-size: 0.95rem; color: rgba(255,255,255,0.55); line-height: 1.75; max-width: 560px; }
    .why-cards {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
      margin-bottom: 48px;
    }
    .why-card {
      background: var(--surface-base); border: 1px solid var(--surface-border);
      border-radius: 20px; padding: 28px 22px;
      display: flex; flex-direction: column; gap: 12px;
      transition: background 0.3s, border-color 0.3s;
      box-shadow: var(--surface-shadow);
    }
    .why-card:hover { background: var(--surface-tint); border-color: var(--surface-border-strong); }
    .why-icon {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(197,223,192,0.1); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
    }
    .why-title { font-family: var(--font-cormorant), serif; font-size: 1.25rem; color: #fff; }
    .why-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.68; }
    .regions-presence {
      position: relative;
      border-block: 1px solid var(--surface-border); border-radius: 0; overflow: hidden;
      background: linear-gradient(180deg, rgba(15,19,17,0.5), rgba(8,11,10,0.28));
      box-shadow: none;
    }
    .regions-presence::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), rgba(197,223,192,0.08) calc(100% - 1px)),
        linear-gradient(180deg, rgba(197,223,192,0.05), transparent 38%);
      background-size: 88px 88px, 100% 100%;
      opacity: 0.28;
      pointer-events: none;
    }
    .regions-presence-header {
      position: relative;
      padding: 18px 0;
      display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap;
      background: transparent;
      border-bottom: 1px solid var(--surface-border);
    }
    .regions-presence-kicker {
      font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.16em;
      color: rgba(197,223,192,0.78);
      font-weight: 700;
    }
    .regions-presence-note {
      font-size: 0.8rem; color: var(--text-muted);
    }
    .regions-grid {
      position: relative;
      display: flex; flex-direction: column; gap: 12px;
      padding: 24px 0;
    }
    .region-item {
      position: relative;
      padding: 0;
      border: none;
      border-radius: 0;
      background: transparent;
      overflow: visible;
      display: grid; grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
      transition: background 0.25s, border-color 0.25s, transform 0.25s;
    }
    .region-item::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 22px;
      bottom: -34px;
      width: 1px;
      background: linear-gradient(180deg, rgba(197,223,192,0.55), rgba(197,223,192,0.08));
    }
    .region-item:last-child::before { bottom: 22px; }
    .region-item:hover {
      background: rgba(197,223,192,0.04);
      border-color: transparent;
      transform: translateX(6px);
    }
    .region-heading {
      position: relative;
      padding: 18px 24px 18px 38px;
      border-right: none;
      background: transparent;
      display: flex; flex-direction: column; justify-content: space-between; gap: 22px;
    }
    .region-heading::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 26px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--sage);
      box-shadow: 0 0 0 8px rgba(197,223,192,0.07), 0 0 18px rgba(197,223,192,0.22);
    }
    .region-name { font-family: var(--font-cormorant), serif; font-size: 1.42rem; color: #fff; }
    .region-count {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: rgba(197,223,192,0.74);
      font-weight: 700;
    }
    .court-list {
      padding: 18px 0 18px 24px;
      display: flex; flex-wrap: wrap; gap: 8px;
      align-content: center;
      border-bottom: 1px solid var(--surface-border);
    }
    .region-item:last-child .court-list { border-bottom: none; }
    .court-chip {
      display: inline-flex; align-items: center;
      min-height: 32px; padding: 7px 11px; border-radius: 8px;
      border: 1px solid rgba(197,223,192,0.18);
      background: rgba(9,12,11,0.48);
      color: var(--text-body); font-size: 0.78rem; line-height: 1.35;
    }
    .additional-courts {
      position: relative;
      display: flex; flex-wrap: wrap; gap: 10px;
      padding: 0 0 24px;
      border-top: 1px solid var(--surface-border);
      background: transparent;
    }
    .additional-court {
      flex: 1 1 240px;
      display: flex; align-items: flex-start; gap: 11px;
      padding: 16px 18px;
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      background: rgba(9,12,11,0.46);
      color: var(--text-body); font-size: 0.86rem; line-height: 1.55;
    }
    .additional-court svg { color: var(--sage); flex-shrink: 0; margin-top: 3px; }

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
    .testi-sidebar-body { font-size: 0.9rem; line-height: 1.8; color: var(--text-muted); }
    .testi-nav { display: flex; align-items: center; gap: 10px; }
    .testi-nav-btn {
      width: 38px; height: 38px; border-radius: 50%;
      border: 1px solid var(--surface-border); color: var(--text-muted);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .testi-nav-btn:hover { background: var(--sage); color: var(--ink); border-color: var(--sage); }
    .testi-counter { font-size: 0.78rem; color: var(--text-subtle); letter-spacing: 0.08em; }
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
      background: var(--surface-elevated); backdrop-filter: blur(20px);
      border: 1px solid var(--surface-border);
      border-radius: 24px; padding: 36px 32px;
      animation: fadeSlide 0.45s cubic-bezier(0.22,1,0.36,1) both;
      box-shadow: var(--surface-shadow);
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
    .testi-role { font-size: 0.75rem; color: var(--text-subtle); margin-top: 2px; }

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
      border-radius: 24px; overflow: hidden; background: var(--surface-base);
      border: 1px solid var(--surface-border);
      display: flex; flex-direction: column;
      transition: border-color 0.3s;
      box-shadow: var(--surface-shadow);
    }
    .blog-featured:hover { border-color: var(--surface-border-strong); }
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
    .blog-excerpt { font-size: 0.83rem; color: var(--text-muted); line-height: 1.7; }
    .blog-meta { display: flex; align-items: center; gap: 12px; font-size: 0.72rem; color: var(--text-subtle); margin-top: auto; }
    .blog-meta-sep { opacity: 0.4; }
    .blog-list { display: flex; flex-direction: column; gap: 12px; }
    .blog-item {
      border-radius: 18px; overflow: hidden; background: var(--surface-base);
      border: 1px solid var(--surface-border);
      display: flex; transition: border-color 0.3s;
      box-shadow: var(--surface-shadow);
    }
    .blog-item:hover { border-color: var(--surface-border-strong); }
    .blog-item-img { width: 110px; height: 110px; flex-shrink: 0; object-fit: cover; }
    .blog-item-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 6px; }
    .blog-item-cat { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sage); }
    .blog-item-title { font-family: var(--font-cormorant), serif; font-size: 1.08rem; color: #fff; line-height: 1.25; }
    .blog-item-meta { font-size: 0.68rem; color: var(--text-subtle); margin-top: auto; }

    /* ── FAQ ── */
    .faq-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .faq-layout { display: grid; grid-template-columns: 1fr 1.6fr; gap: 60px; align-items: start; }
    .faq-sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 20px; }
    .faq-sidebar-title {
      font-size: clamp(2rem, 3.2vw, 3.2rem); color: #fff;
      line-height: 1.08; margin-top: 12px;
    }
    .faq-sidebar-title em { color: var(--sage); font-style: italic; }
    .faq-sidebar-body { font-size: 0.9rem; color: var(--text-muted); line-height: 1.8; }
    .faq-cta { width: fit-content; }
    .faq-list {
      display: flex; flex-direction: column; gap: 0;
      border: 1px solid var(--surface-border); border-radius: 20px;
      overflow: hidden; background: var(--surface-base); box-shadow: var(--surface-shadow);
    }
    .faq-item { border-bottom: 1px solid var(--surface-border); }
    .faq-item:last-child { border-bottom: none; }
    .faq-question {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; text-align: left; gap: 16px;
      font-size: 0.93rem; font-weight: 500; color: var(--text-body);
      transition: color 0.2s; background: var(--surface-elevated);
    }
    .faq-question:hover { color: var(--sage); background: var(--surface-tint); }
    .faq-toggle {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      border: 1px solid var(--surface-border);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-subtle); transition: all 0.3s;
    }
    .faq-toggle.open { background: var(--sage); border-color: var(--sage); color: var(--ink); transform: rotate(45deg); }
    .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1); background: rgba(9,12,11,0.72); }
    .faq-answer.open { max-height: 260px; }
    .faq-answer-inner { padding: 4px 24px 22px; }
    .faq-answer-text { font-size: 0.87rem; color: var(--text-muted); line-height: 1.85; }

    /* ── Contact ── */
    .contact-inner { padding: clamp(4rem, 7vw, 8rem) 0; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1.35fr; gap: 60px; align-items: start; }
    .contact-left { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 100px; }
    .contact-title {
      font-size: clamp(2.4rem, 4vw, 4rem);
      color: #fff; letter-spacing: -0.015em; margin-top: 14px; line-height: 1.05;
    }
    .contact-title em { color: var(--sage); font-style: italic; }
    .contact-sub { font-size: 0.9rem; color: var(--text-muted); line-height: 1.8; }
    .contact-detail {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 16px; border-radius: 14px;
      border: 1px solid var(--surface-border);
      background: var(--surface-base);
      transition: border-color 0.2s, background 0.2s;
      box-shadow: var(--surface-shadow);
    }
    .contact-detail:hover { border-color: var(--surface-border-strong); background: var(--surface-tint); }
    .contact-detail-icon {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      background: rgba(197,223,192,0.1); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
    }
    .contact-detail-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-subtle); }
    .contact-detail-value { font-size: 0.88rem; color: var(--text-body); margin-top: 2px; font-weight: 500; }
    .contact-number-list { display: flex; flex-direction: column; gap: 5px; margin-top: 4px; }
    .contact-number-link {
      font-size: 0.88rem; color: var(--text-body); font-weight: 500;
      transition: color 0.2s;
    }
    .contact-number-link:hover { color: var(--sage); }
    .contact-hours {
      background: var(--surface-base); border: 1px solid var(--surface-border);
      border-radius: 16px; padding: 20px;
      box-shadow: var(--surface-shadow);
    }
    .contact-hours-title {
      font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.14em;
      color: rgba(197,223,192,0.78); font-weight: 600; margin-bottom: 14px;
    }
    .hours-row { display: flex; justify-content: space-between; font-size: 0.82rem; padding: 7px 0; border-bottom: 1px solid var(--surface-border); }
    .hours-row:last-child { border-bottom: none; }
    .hours-day { color: var(--text-subtle); }
    .hours-time { color: var(--text-body); font-weight: 500; }

    /* ── Form ── */
    .contact-form-panel {
      background: var(--surface-elevated-strong); backdrop-filter: blur(24px);
      border: 1px solid var(--surface-border-strong);
      border-radius: 28px; padding: 36px 32px;
      box-shadow: var(--surface-shadow);
    }
    .form-panel-title { font-family: var(--font-cormorant), serif; font-size: 1.8rem; color: #fff; margin-bottom: 6px; }
    .form-panel-sub { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 28px; }
    .form-section-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-subtle); margin-bottom: 10px; }
    .chip-group { display: flex; flex-wrap: wrap; gap: 7px; }
    .chip {
      font-size: 0.77rem; padding: 6px 13px; border-radius: 100px;
      border: 1px solid var(--surface-border); background: var(--surface-base);
      color: var(--text-muted); transition: all 0.2s; font-family: inherit;
    }
    .chip:hover { border-color: var(--sage); color: var(--sage); }
    .chip.active { background: var(--sage); border-color: var(--sage); color: var(--ink); font-weight: 600; }
    .form-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .form-field { display: flex; flex-direction: column; gap: 5px; }
    .form-field.full { grid-column: 1 / -1; }
    .form-label { font-size: 0.72rem; font-weight: 600; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.06em; }
    .form-input {
      border: 1px solid var(--surface-border); border-radius: 12px;
      padding: 11px 14px; font-size: 0.88rem; font-family: inherit;
      color: #fff; background: var(--surface-base);
      transition: border-color 0.2s, box-shadow 0.2s; resize: vertical;
    }
    .form-input::placeholder { color: var(--text-subtle); }
    .form-input:focus { outline: none; border-color: var(--sage); box-shadow: 0 0 0 3px rgba(197,223,192,0.2); }
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
    @media (max-width: 1200px) {
      .services-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 1024px) {
      .hero-stats-row { flex-wrap: wrap; }
      .cases-stats { grid-template-columns: repeat(2, 1fr); }
      .cases-grid { grid-template-columns: repeat(2, 1fr); }
      .why-cards { grid-template-columns: repeat(2, 1fr); }
      .region-item { grid-template-columns: 1fr; }
      .region-heading { border-right: none; border-bottom: 1px solid var(--surface-border); }
      .additional-courts { flex-direction: column; }
      .additional-court { flex-basis: auto; }
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
      .services-grid { grid-template-columns: repeat(2, 1fr); }
      .service-featured-card { grid-template-columns: auto 1fr; }
      .service-featured-arrow { display: none; }
    }
    @media (max-width: 768px) {
      .about-proof-strip { grid-template-columns: auto minmax(0, 1fr); }
      .about-founder-exp {
        grid-column: 1 / -1; text-align: left;
        padding-left: 0; padding-top: 14px;
        border-left: none; border-top: 1px solid rgba(197,223,192,0.18);
      }
      .services-intro-row { flex-direction: column; }
      .service-featured-card { grid-template-columns: 1fr; }
      .service-featured-icon-wrap { display: none; }
    }
    @media (max-width: 640px) {
      .about-stats-row { grid-template-columns: 1fr; }
      .about-value-card { grid-template-columns: auto minmax(0, 1fr); }
      .about-value-num { grid-column: 2; }
      .about-ctas { flex-direction: column; }
      .services-grid { grid-template-columns: 1fr; }
      .services-intro-stats { gap: 20px; }
      .team-card { grid-template-columns: auto minmax(0, 1fr); }
      .cases-grid { grid-template-columns: 1fr; }
      .cases-stats { grid-template-columns: repeat(2, 1fr); }
      .why-cards { grid-template-columns: 1fr; }
      .regions-grid { padding: 14px; }
      .region-item { transform: none; }
      .region-item:hover { transform: none; }
      .region-heading,
      .court-list { padding: 18px; }
      .additional-courts { padding: 0 14px 14px; }
      .form-fields { grid-template-columns: 1fr; }
      .footer-top { grid-template-columns: 1fr; }
      .hero-title { font-size: clamp(3rem, 14vw, 4.8rem); }
      .hero { padding: 120px 0 64px; }
      .hero-eyebrow { margin-bottom: 18px; }
      .hero-firm-name { margin-bottom: 14px; letter-spacing: 0.28em; }
      .hero-stats-row { width: 100%; }
      .hero-stat { flex: 1 1 50%; text-align: center; min-width: 0; }
      .hero-stat-num { font-size: 1.7rem; }
      .hero-actions { margin-top: 28px; }
      .blog-item-img { width: 96px; height: 96px; }
      .services-cta-bar { flex-direction: column; align-items: flex-start; }
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
          background: "rgba(0,0,0,0.76)",
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
  { name: "AGD Bala kumar", role: "Lead Advocate" },
  { name: "V. Velukumaran", role: "Sentinel Law Associate" },
  { name: "A. Yokesh Kumar", role: "Advocate" },
  { name: "M.R. Vinoth Prabhu", role: "Advocate" },
  { name: "A. Prabhakaran", role: "Advocate" },
  { name: "D. Pradeep Kumar", role: "Advocate" },
  { name: "K. Rajkumar", role: "Advocate" },
  { name: "T. Ravi shankar", role: "Advocate" },
  { name: "S. Sivadharshini", role: "Advocate" },
  { name: "P. Srikanth subash", role: "Advocate" },
  { name: "S. Faiz Hameed Raja", role: "Advocate" },
  { name: "Oviya N", role: "Advocate" },
  { name: "G. Gana Rajan", role: "Advocate" },
  { name: "V. Prabhakaran", role: "Intern" },
];

const courtRegions = [
  {
    name: "Chennai District",
    courts: [
      "High Court Madras",
      "City Civil Court Chennai",
      "Court of Small Causes",
      "George Town (GT) Court",
      "Egmore and Allikulam Court",
      "Saidapet Court",
    ],
  },
  {
    name: "Chengalpattu District",
    courts: [
      "Chengalpattu",
      "Maduranthakam",
      "Thiruporur",
      "Pallavaram",
      "Tambaram",
      "Alandur",
      "Sholinganallur",
    ],
  },
  {
    name: "Tiruvallur District",
    courts: [
      "Tiruvallur",
      "Poonamallee",
      "Madhavaram",
      "Ambattur",
      "Thiruvottiyur",
    ],
  },
];

const additionalCourts = [
  "Paramakudi Sub Court, Coimbatore, Thiruppur, Dindigul, Vedasandur Sub Court and Madurai District Courts",
  "City Civil Courts – Bengaluru & Mumbai",
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
  { q: "Where do you have active practice presence?", a: "Our active litigation presence includes the Madras High Court, Chennai City Civil Court, George Town, Egmore and Allikulam, Saidapet, Court of Small Causes, Chengalpattu, Tiruvallur, Dindigul, Vedasandur, Paramakudi, Madurai, Bangalore City Civil Court, and Mumbai City Civil Court." },
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

const getIcon = (role) => {
  if (role.toLowerCase().includes("intern")) return <User size={16} />;
  if (role.toLowerCase().includes("lead")) return <Briefcase size={16} />;
  return <Scale size={16} />;
};

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#legal-service`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/hero.png`,
  logo: `${SITE_URL}/logo1.png`,
  description: SITE_DESCRIPTION,
  telephone: contactNumbers.map((number) => number.display),
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
    { "@type": "City", name: "Chengalpattu" },
    { "@type": "City", name: "Tiruvallur" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "AdministrativeArea", name: "Tamil Nadu" },
  ],
  contactPoint: contactNumbers.map((number) => ({
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: number.display,
    email: "agdlawassociatesoffice@gmail.com",
    url: `${SITE_URL}/#contact`,
    areaServed: "IN",
  })),
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
              <AGDLogoImg size={72} />
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
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "90px" }}>
            <span className="logo-mark">
              <AGDLogoImg size={72} />
              AGD Law Associates
            </span>
            <button type="button" onClick={() => setMenuOpen(false)} style={{ width: "38px", height: "38px", border: "1px solid rgba(197,223,192,0.2)", borderRadius: "9px", background: "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={17} />
            </button>
          </div>
          <nav className="container" style={{ flex: 1, paddingTop: "16px", }}>
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

// // ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-ornament" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-copy-block">
            <div className="hero-eyebrow">
              <Scale size={11} />
              Boutique Law Firm · Chennai · Est. 2016
            </div>
            {/* <div className="hero-firm-name">Strategic Counsel for Complex Disputes</div> */}
            <h1 className="hero-title">
              AGD <em>Law</em> Associates
            </h1>
            <p className="hero-tagline">
              Precision-driven litigation and advisory across criminal, civil, consumer,
              constitutional, and commercial matters for clients in Tamil Nadu and beyond.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Request Consultation <ArrowRight size={14} />
              </a>
              <a href={`tel:${primaryContactNumber.tel}`} className="btn-ghost">
                <Phone size={14} /> {primaryContactNumber.display}
              </a>
            </div>
          </div>
          <div className="hero-stats-row">
            <div className="hero-stat">
              <div className="hero-stat-num">2016</div>
              <div className="hero-stat-lbl">Established</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">10+</div>
              <div className="hero-stat-lbl">Years Practice</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">1000+</div>
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
  const values = [
    { num: "01", icon: Shield, title: "Integrity First", text: "Every mandate is handled with full transparency, honest counsel, and unwavering ethical standards." },
    { num: "02", icon: Users, title: "Client-Centred", text: "Personalised attention to every matter — no cookie-cutter solutions, only tailored strategies." },
    { num: "03", icon: Scale, title: "Precision in Advocacy", text: "Meticulous research and sharp courtroom arguments built on deep legal knowledge." },
    { num: "04", icon: Clock, title: "Timely Resolution", text: "Efficient case management that respects your time while never compromising thoroughness." },
    { num: "05", icon: Award, title: "Proven Track Record", text: "500+ matters handled across criminal, civil, constitutional, and commercial forums since 2016." },
  ];

  return (
    <section className="panel" id="about">
      <div className="container">
        <div className="about-inner">

          <div className="about-content">
            <div className="about-eyebrow-row">
              <span className="section-label">About Us</span>
              <div className="about-eyebrow-line" />
            </div>
            <h2 className="about-pretitle">
              Your legal matter<br />deserves <em>precision</em>
            </h2>
            <div className="about-copy">
              <p className="about-lead">
                Founded in 2016, AGD Law Associates is a boutique law firm delivering
                precision-driven litigation and advisory across Tamil Nadu and beyond.
                Led by AGD Bala Kumar with over 12 years of practice, we pair courtroom
                strength with strategic advisory for complex, high-impact matters.
              </p>
              <p className="about-body">
                Every client deserves personalised attention, honest communication, and a
                legal team genuinely invested in their outcome — from first consultation
                to final resolution. We believe the best legal service is measured not just
                in outcomes, but in the trust built along the way.
              </p>
            </div>

            <div className="about-proof-strip">
              <div className="about-founder-avatar">
                <Scale size={20} />
              </div>
              <div>
                <div className="about-founder-name">AGD Bala Kumar</div>
                <div className="about-founder-role">Founder &amp; Lead Advocate</div>
              </div>
              <div className="about-founder-exp">
                <div className="about-founder-exp-num">12+</div>
                <div className="about-founder-exp-lbl">Yrs Practice</div>
              </div>
            </div>

            <div className="about-ctas">
              <a href="#contact" className="btn-primary">
                Schedule a Consultation <ArrowRight size={14} />
              </a>
              <a href="#services" className="btn-ghost">
                Our Services <ArrowRight size={14} />
              </a>
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
  const [featuredService, ...restServices] = services;
  const FeaturedIcon = featuredService.icon;

  return (
    <section className="panel-dark" id="services">
      <div className="container">
        <div className="services-inner">

          {/* Header */}
          <div className="services-head">
            <div>
              <span className="section-label-dark">Practice Areas</span>
              <h2 className="services-title">Areas of <em>expertise</em></h2>
            </div>
            <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
              Discuss Your Case <ArrowRight size={13} />
            </a>
          </div>

          {/* Intro row */}
          <div className="services-intro-row">
            <p className="services-intro-text">
              Nine focused practice areas — each handled with the depth, rigour, and
              personalised attention your matter deserves. From bail applications to
              corporate advisory, we handle the full spectrum of legal needs.
            </p>
            <div className="services-intro-stats">
              {[
                { num: "9", lbl: "Practice Areas" },
                { num: "1000+", lbl: "Cases Handled" },
                { num: "10+", lbl: "Courts Active" },
              ].map((s) => (
                <div className="services-intro-stat" key={s.lbl}>
                  <span className="services-intro-stat-num">{s.num}</span>
                  <span className="services-intro-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured card */}
          <Link
            href={`/services/${serviceTitleToSlug[featuredService.title]}`}
            className="service-featured-card"
          >
            <span className="service-featured-num">01</span>
            <span className="service-featured-badge">Featured Practice</span>
            <div className="service-featured-icon-wrap">
              <FeaturedIcon size={22} />
            </div>
            <div>
              <h3 className="service-featured-name">{featuredService.title}</h3>
              <p className="service-featured-desc">{featuredService.description}</p>
            </div>
            <div className="service-featured-arrow"><ArrowRight size={16} /></div>
          </Link>

          {/* Grid of remaining services */}
          <div className="services-grid">
            {restServices.map((s, i) => {
              const Icon = s.icon;
              const slug = serviceTitleToSlug[s.title];
              return (
                <Link
                  key={s.title}
                  href={slug ? `/services/${slug}` : "#"}
                  className="service-grid-card"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="service-grid-icon"><Icon size={16} /></div>
                    <span className="service-grid-num">0{i + 2}</span>
                  </div>
                  <h3 className="service-grid-name">{s.title}</h3>
                  <p className="service-grid-desc">{s.description}</p>
                  <div className="service-grid-footer">
                    <span className="service-grid-tag">Learn more</span>
                    <div className="service-grid-arrow"><ArrowRight size={12} /></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA bar */}
          <div className="services-cta-bar">
            <p className="services-cta-bar-text">
              <strong>Not sure which area applies to your matter?</strong>{" "}
              Our team will help you identify the right course of action in a free initial call.
            </p>
            <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
              Get Free Advice <ArrowRight size={13} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function Team() {
  const midpoint = Math.ceil(teamMembers.length / 2);

  const rosterRows = [
    teamMembers.slice(0, midpoint),
    teamMembers.slice(midpoint),
  ];

  return (
    <section className="panel" id="team">
      <div className="container">
        <div className="team-inner">
          <div className="team-head">
            <div>
              <span className="section-label">Our Team</span>
              <h2 className="team-title">
                Advocates in <em>practice</em>
              </h2>
            </div>
          </div>

          <div className="team-streams">
            {rosterRows.map((row, rowIndex) => (
              <div className="team-stream" key={rowIndex}>
                <div className="team-track">
                  {[...row, ...row].map((member, duplicatedIndex) => {
                    const sourceIndex =
                      rowIndex * midpoint +
                      (duplicatedIndex % row.length);

                    return (
                      <div
                        className="team-card"
                        key={`${member.name}-${duplicatedIndex}`}
                      >
                        <div className="team-icon">
                          {getIcon(member.role)}
                        </div>

                        <div className="team-body">
                          <div className="team-name">
                            {member.name}
                          </div>

                          <div className="team-role">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── Why / Regions ────────────────────────────────────────────────────────────

function Regions() {
  return (
    <section className="panel-dark" id="why-me">
      <div className="container">
        <div className="regions-inner-content">
          <div className="regions-head">
            <div>
              <span className="section-label-dark">Court Presence</span>
              <h2 className="regions-title">Area of practice in <em>specific courts</em></h2>
            </div>
            <p className="regions-sub">
              Focused litigation support across Chennai, Chengalpattu, Tiruvallur,
              key Tamil Nadu courts, and selected city civil courts outside the state.
            </p>
          </div>
          <div className="regions-presence">
            <div className="regions-presence-header">
              <span className="regions-presence-kicker">Courts and districts</span>
              {/* <span className="regions-presence-note">Select the nearest forum for consultation and filing support.</span> */}
            </div>
            <div className="regions-grid">
              {courtRegions.map((r) => (
                <div className="region-item" key={r.name}>
                  <div className="region-heading">
                    <div className="region-name">{r.name}</div>
                    <div className="region-count">{r.courts.length} forums</div>
                  </div>
                  <div className="court-list">
                    {r.courts.map((court) => (
                      <span className="court-chip" key={court}>{court}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="additional-courts">
              {additionalCourts.map((court) => (
                <div className="additional-court" key={court}>
                  <MapPin size={14} />
                  <span>{court}</span>
                </div>
              ))}
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
                      <span className={`faq-toggle${isOpen ? " open" : ""}`}><Plus size={13} /></span>
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
              <div className="contact-detail">
                <div className="contact-detail-icon"><PhoneCall size={15} /></div>
                <div>
                  <div className="contact-detail-label">Contact Numbers</div>
                  <div className="contact-number-list">
                    {contactNumbers.map((number) => (
                      <a key={number.tel} href={`tel:${number.tel}`} className="contact-number-link">
                        {number.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {[
                { icon: Mail, label: "Email", value: "agdlawassociatesoffice@gmail.com", href: "mailto:agdlawassociatesoffice@gmail.com" },
                { icon: MapPin, label: "Location", value: "No. 5c, 5th floor, Sri Venkatesh bhavan, No. 71/35, Armenian street, Chennai, Tamil Nadu, India, 600001", href: "#" },
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
              <AGDLogoImg size={72} />
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
              {contactNumbers.map((number) => (
                <a key={number.tel} href={`tel:${number.tel}`} className="footer-contact-item" style={{ textDecoration: "none" }}>
                  <PhoneCall size={13} className="footer-contact-icon" />
                  <span className="footer-contact-text">{number.display}</span>
                </a>
              ))}
              <a href="mailto:agdlawassociatesoffice@gmail.com" className="footer-contact-item" style={{ textDecoration: "none" }}>
                <Mail size={13} className="footer-contact-icon" />
                <span className="footer-contact-text">agdlawassociatesoffice@gmail.com</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={13} className="footer-contact-icon" />
                <span className="footer-contact-text">No. 5c, 5th floor, Sri Venkatesh bhavan, No. 71/35, Armenian street, Chennai, Tamil Nadu, India, 600001</span>
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
  const phoneNumber = primaryContactNumber.tel.replace("+", "");

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
          <Regions />
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
