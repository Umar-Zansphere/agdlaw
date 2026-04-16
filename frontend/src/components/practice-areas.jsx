"use client";
/**
 * AGD Law Associates — Practice Area Detail Pages
 * Usage (Next.js App Router): app/services/[slug]/page.jsx
 * Exports: PracticeAreaPage (default), practiceAreas (data)
 */

import { useState, useEffect, useRef } from "react";
import { AGDLogoImg } from "@/components/AGDLogoImg";
import {
  ArrowRight, ArrowLeft, Phone, Mail, MessageCircle,
  ChevronDown, CheckCircle, Scale, Shield, Clock,
  Award, Users, BookOpen, MapPin, X, Send,
  FileText, Gavel, Home, Building, Heart, Briefcase,
  Car, ShieldCheck, AlertCircle, Plus
} from "lucide-react";

// ─── Global Styles ─────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --ink: #0b0b0b;
      --paper: #ffffff;
      --sage: #c5dfc0;
      --sage-dark: #3a5c3d;
      --sage-pale: #f0f7ee;
      --muted: #6b7280;
      --border: rgba(197,223,192,0.35);
      --border-hard: rgba(197,223,192,0.55);
      --radius-sm: 12px;
      --radius-md: 20px;
      --radius-lg: 32px;
      --radius-xl: 48px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: var(--ink); color: var(--ink);
      -webkit-font-smoothing: antialiased; overflow-x: hidden;
    }
    h1,h2,h3,h4 { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; line-height: 1.1; }
    a { text-decoration: none; color: inherit; }
    button { cursor: pointer; font-family: inherit; border: none; background: none; }
    img { max-width: 100%; display: block; }
    :focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
    ul { list-style: none; padding: 0; }

    .fixed-bg {
      position: fixed; inset: 0; z-index: 0;
      background: var(--ink); overflow: hidden;
    }
    .fixed-bg-glow {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 900px; height: 900px; border-radius: 50%;
      background: radial-gradient(circle, rgba(197,223,192,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .fixed-bg-vignette {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.72) 100%);
    }
    .scroll-layer { position: relative; z-index: 10; }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

    /* ── Section label ── */
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--sage);
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 5px 14px;
    }
    .section-label::before {
      content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--sage);
    }

    /* ── Header ── */
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      transition: background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s;
    }
    .header.scrolled {
      background: rgba(11,11,11,0.88); backdrop-filter: blur(20px);
      box-shadow: 0 1px 0 rgba(197,223,192,0.1), 0 8px 32px rgba(0,0,0,0.3);
    }
    .header-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 90px; gap: 24px;
    }
    .logo-mark {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.3rem; font-weight: 500; color: #fff;
      display: flex; align-items: center; gap: 10px;
    }
    .logo-glyph {
      width: 34px; height: 34px; border-radius: 9px;
      background: var(--sage); color: var(--ink);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.95rem; font-weight: 600; flex-shrink: 0;
      font-family: 'Cormorant Garamond', serif;
    }
    .nav-links { display: flex; align-items: center; gap: 2px; }
    .nav-link {
      font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.65);
      padding: 8px 12px; border-radius: 8px; transition: background 0.2s, color 0.2s;
    }
    .nav-link:hover, .nav-link.active { background: rgba(197,223,192,0.07); color: var(--sage); }
    .header-cta {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: var(--ink);
      font-size: 0.8rem; font-weight: 600; padding: 10px 20px;
      border-radius: 100px; transition: background 0.25s, transform 0.2s;
      letter-spacing: 0.03em; white-space: nowrap;
    }
    .header-cta:hover { background: #fff; transform: translateY(-1px); }

    /* ── Hero (practice area specific) ── */
    .pa-hero {
      min-height: 88vh; display: flex; align-items: flex-end;
      position: relative; overflow: hidden; padding-top: 72px;
    }
    .pa-hero-bg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; transition: transform 8s ease;
    }
    .pa-hero:hover .pa-hero-bg { transform: scale(1.04); }
    .pa-hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(11,11,11,0.96) 0%, rgba(11,11,11,0.6) 50%, rgba(11,11,11,0.2) 100%);
    }
    .pa-hero-content {
      position: relative; z-index: 2; padding: 64px 0 72px; width: 100%;
    }
    .pa-hero-grid { display: grid; grid-template-columns: 1fr 340px; gap: 48px; align-items: end; }
    .pa-hero-area-tag {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.68rem; font-weight: 700; letter-spacing: 0.16em;
      text-transform: uppercase; color: var(--sage);
      border: 1px solid rgba(197,223,192,0.3); border-radius: 100px;
      padding: 6px 14px; margin-bottom: 24px; width: fit-content;
    }
    .pa-hero-title {
      font-size: clamp(3rem, 5.5vw, 6rem); color: #fff; line-height: 1.0;
      letter-spacing: -0.02em; margin-bottom: 20px;
    }
    .pa-hero-title em { color: var(--sage); font-style: italic; }
    .pa-hero-subtitle {
      font-size: 1.05rem; color: rgba(255,255,255,0.6); line-height: 1.8;
      max-width: 580px; margin-bottom: 36px;
    }
    .pa-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: var(--ink);
      font-size: 0.88rem; font-weight: 600; padding: 13px 24px;
      border-radius: 100px; transition: all 0.25s; white-space: nowrap;
    }
    .btn-sage:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(197,223,192,0.4); }
    .btn-outline-white {
      display: inline-flex; align-items: center; gap: 8px;
      color: rgba(255,255,255,0.75); font-size: 0.88rem; font-weight: 500;
      padding: 13px 24px; border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.2); transition: all 0.25s; white-space: nowrap;
    }
    .btn-outline-white:hover { border-color: var(--sage); color: var(--sage); }
    .pa-hero-card {
      background: rgba(255,255,255,0.07); backdrop-filter: blur(20px);
      border: 1px solid rgba(197,223,192,0.2); border-radius: var(--radius-lg);
      padding: 28px; display: flex; flex-direction: column; gap: 20px;
    }
    .pa-hero-card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.8rem; font-weight: 500; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--sage);
    }
    .pa-hero-stat { display: flex; flex-direction: column; gap: 3px; }
    .pa-hero-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem; color: #fff; line-height: 1;
    }
    .pa-hero-stat-lbl { font-size: 0.72rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; }
    .pa-hero-divider { height: 1px; background: rgba(197,223,192,0.15); }
    .pa-hero-contact {
      display: flex; align-items: center; gap: 10px;
      font-size: 0.8rem; color: rgba(255,255,255,0.6);
    }
    .pa-hero-contact svg { color: var(--sage); flex-shrink: 0; }

    /* ── Breadcrumb ── */
    .breadcrumb {
      display: flex; align-items: center; gap: 8px;
      font-size: 0.78rem; color: rgba(255,255,255,0.4);
      margin-bottom: 24px;
    }
    .breadcrumb a { color: rgba(255,255,255,0.4); transition: color 0.2s; }
    .breadcrumb a:hover { color: var(--sage); }
    .breadcrumb-sep { font-size: 0.6rem; opacity: 0.4; }

    /* ── Overview ── */
    .overview-section {
      padding: clamp(4rem, 7vw, 8rem) 0;
      background: transparent;
      border-top: 1px solid rgba(197,223,192,0.08);
    }
    .overview-grid { display: grid; grid-template-columns: 1fr 380px; gap: 64px; align-items: start; }
    .overview-content { display: flex; flex-direction: column; gap: 24px; }
    .overview-title { font-size: clamp(2rem, 3vw, 3rem); line-height: 1.1; color: #fff; }
    .overview-title em { color: var(--sage); font-style: italic; }
    .overview-body { font-size: 1rem; line-height: 1.85; color: rgba(255,255,255,0.58); }
    .overview-lead {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.2rem, 2vw, 1.55rem); color: #fff;
      line-height: 1.65; border-left: 3px solid var(--sage);
      padding-left: 24px; font-style: italic;
    }

    /* ── Sidebar card ── */
    .sidebar-card {
      background: var(--ink); border-radius: var(--radius-lg);
      padding: 32px; display: flex; flex-direction: column; gap: 20px;
      position: sticky; top: 88px;
    }
    .sidebar-card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; color: #fff; line-height: 1.2;
    }
    .sidebar-card-body { font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.7; }
    .sidebar-cta {
      display: flex; flex-direction: column; gap: 10px;
    }
    .sidebar-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 13px 20px; border-radius: 12px;
      font-size: 0.85rem; font-weight: 600; transition: all 0.25s;
      width: 100%;
    }
    .sidebar-btn.primary { background: var(--sage); color: var(--ink); }
    .sidebar-btn.primary:hover { background: #fff; }
    .sidebar-btn.secondary {
      background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.75);
      border: 1px solid rgba(255,255,255,0.12);
    }
    .sidebar-btn.secondary:hover { background: rgba(255,255,255,0.1); border-color: var(--sage); color: var(--sage); }
    .sidebar-hours { display: flex; flex-direction: column; gap: 8px; padding-top: 4px; border-top: 1px solid rgba(197,223,192,0.12); }
    .sidebar-hours-title { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sage); font-weight: 600; }
    .sidebar-hour-row { display: flex; justify-content: space-between; font-size: 0.78rem; }
    .sidebar-hour-day { color: rgba(255,255,255,0.4); }
    .sidebar-hour-time { color: rgba(255,255,255,0.75); font-weight: 500; }
    .sidebar-related { display: flex; flex-direction: column; gap: 8px; padding-top: 4px; border-top: 1px solid rgba(197,223,192,0.12); }
    .sidebar-related-title { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sage); font-weight: 600; }
    .sidebar-related-link {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 0.82rem; color: rgba(255,255,255,0.5); padding: 8px 0;
      border-bottom: 1px solid rgba(197,223,192,0.08); transition: color 0.2s;
      cursor: pointer;
    }
    .sidebar-related-link:hover { color: var(--sage); }
    .sidebar-related-link svg { opacity: 0.4; }
    .sidebar-related-link:hover svg { opacity: 1; }

    /* ── Services Grid ── */
    .services-section {
      padding: clamp(3rem, 5vw, 6rem) 0;
      background: transparent;
    }
    .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: clamp(2rem, 4vw, 3.5rem); }
    .service-item {
      background: rgba(255,255,255,0.04); backdrop-filter: blur(16px);
      border: 1px solid rgba(197,223,192,0.14);
      border-radius: var(--radius-md); padding: 28px 24px;
      display: flex; flex-direction: column; gap: 12px;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .service-item:hover {
      border-color: rgba(197,223,192,0.3); transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.18);
    }
    .service-item-icon {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(197,223,192,0.12); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.3s, color 0.3s;
    }
    .service-item:hover .service-item-icon { background: var(--sage); color: var(--ink); }
    .service-item-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; color: #fff; line-height: 1.25; }
    .service-item-desc { font-size: 0.83rem; color: rgba(255,255,255,0.48); line-height: 1.72; flex: 1; }
    .service-item-check {
      display: flex; align-items: center; gap: 6px;
      font-size: 0.78rem; color: var(--sage); font-weight: 500;
    }

    /* ── Process ── */
    .process-section { padding: clamp(3rem, 6vw, 7rem) 0; background: var(--ink); }
    .process-title { font-size: clamp(2rem, 3vw, 3rem); color: #fff; margin-bottom: clamp(2.5rem, 4vw, 4rem); }
    .process-title em { color: var(--sage); font-style: italic; }
    .process-steps { display: flex; flex-direction: column; gap: 0; }
    .process-step {
      display: grid; grid-template-columns: 80px 1fr;
      gap: 0; border-bottom: 1px solid rgba(197,223,192,0.1);
      padding: 28px 0; transition: background 0.3s;
      position: relative;
    }
    .process-step:last-child { border-bottom: none; }
    .process-step-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.5rem; color: rgba(197,223,192,0.15);
      line-height: 1; align-self: start; padding-top: 4px;
      transition: color 0.3s;
    }
    .process-step:hover .process-step-num { color: rgba(197,223,192,0.35); }
    .process-step-body { display: flex; flex-direction: column; gap: 8px; }
    .process-step-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; color: #fff; line-height: 1.2;
    }
    .process-step-desc { font-size: 0.88rem; color: rgba(255,255,255,0.5); line-height: 1.75; max-width: 640px; }
    .process-step-tag {
      display: inline-flex; width: fit-content; align-items: center; gap: 6px;
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 4px 12px;
      font-size: 0.68rem; color: var(--sage); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;
    }

    /* ── Case Highlights ── */
    .cases-section { padding: clamp(3rem, 5vw, 6rem) 0; background: transparent; }
    .cases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: clamp(2rem, 3vw, 3rem); }
    .case-card {
      background: rgba(255,255,255,0.05); backdrop-filter: blur(16px);
      border: 1px solid rgba(197,223,192,0.14); border-radius: var(--radius-md); padding: 28px;
      display: flex; flex-direction: column; gap: 12px;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .case-card:hover { border-color: rgba(197,223,192,0.3); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.2); }
    .case-outcome-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(197,223,192,0.12); color: var(--sage);
      font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em;
      border-radius: 100px; padding: 5px 12px; width: fit-content;
    }
    .case-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: #fff; line-height: 1.3; }
    .case-desc { font-size: 0.83rem; color: rgba(255,255,255,0.5); line-height: 1.72; flex: 1; }
    .case-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(197,223,192,0.1); }
    .case-court { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.38); }
    .case-year { font-size: 0.68rem; color: rgba(255,255,255,0.28); }

    /* ── FAQs ── */
    .faq-section { padding: clamp(3rem, 5vw, 6rem) 0; background: transparent; }
    .faq-grid { display: grid; grid-template-columns: 360px 1fr; gap: 56px; align-items: start; }
    .faq-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 88px; }
    .faq-sidebar-title { font-size: clamp(1.8rem, 2.5vw, 2.6rem); color: #fff; }
    .faq-sidebar-title em { color: var(--sage); font-style: italic; }
    .faq-list { display: flex; flex-direction: column; }
    .faq-item { border-bottom: 1px solid rgba(197,223,192,0.12); }
    .faq-question {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      padding: 20px 0; gap: 16px; text-align: left; background: none; border: none;
      cursor: pointer; font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.05rem, 1.6vw, 1.3rem); color: #fff; transition: color 0.2s;
    }
    .faq-question:hover { color: var(--sage); }
    .faq-toggle {
      width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
      border: 1.5px solid rgba(197,223,192,0.22); color: var(--sage);
      display: flex; align-items: center; justify-content: center; transition: all 0.3s;
    }
    .faq-toggle.open {  border-color: var(--sage); transform: rotate(45deg); }
    .faq-answer {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s ease, opacity 0.3s; opacity: 0;
    }
    .faq-answer.open { grid-template-rows: 1fr; opacity: 1; }
    .faq-answer-inner { overflow: hidden; }
    .faq-answer-text { padding-bottom: 20px; font-size: 0.9rem; line-height: 1.8; color: rgba(255,255,255,0.55); }

    /* ── CTA Banner ── */
    .cta-banner {
      background: var(--ink); padding: clamp(4rem, 6vw, 7rem) 0;
      position: relative; overflow: hidden;
    }
    .cta-banner-bg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; opacity: 0.08; pointer-events: none;
    }
    .cta-banner-inner {
      position: relative; z-index: 2;
      display: flex; justify-content: space-between; align-items: center; gap: 40px; flex-wrap: wrap;
    }
    .cta-banner-title { font-size: clamp(2rem, 3.5vw, 3.5rem); color: #fff; max-width: 580px; }
    .cta-banner-title em { color: var(--sage); font-style: italic; }
    .cta-banner-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }

    /* ── Related Areas ── */
    .related-section { padding: clamp(3rem, 5vw, 6rem) 0; background: transparent; border-top: 1px solid rgba(197,223,192,0.08); }
    .related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: clamp(1.5rem, 3vw, 2.5rem); }
    .related-card {
      background: rgba(255,255,255,0.04); backdrop-filter: blur(16px);
      border: 1px solid rgba(197,223,192,0.14); border-radius: var(--radius-md); padding: 24px 20px;
      display: flex; flex-direction: column; gap: 12px;
      transition: all 0.3s; cursor: pointer;
    }
    .related-card:hover { border-color: rgba(197,223,192,0.3); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
    .related-icon { color: var(--sage); }
    .related-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: #fff; }
    .related-desc { font-size: 0.78rem; color: rgba(255,255,255,0.48); line-height: 1.65; }
    .related-link {
      display: flex; align-items: center; gap: 5px; margin-top: auto;
      font-size: 0.75rem; font-weight: 600; color: var(--sage);
      text-transform: uppercase; letter-spacing: 0.06em;
    }

    /* ── Footer ── */
    .footer { background: var(--ink); padding: 40px 0; }
    .footer-inner {
      display: flex; justify-content: space-between; align-items: center;
      gap: 20px; flex-wrap: wrap;
    }
    .footer-brand-mini { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: #fff; display: flex; align-items: center; gap: 10px; }
    .footer-copy { font-size: 0.78rem; color: rgba(255,255,255,0.3); }
    .footer-links-mini { display: flex; gap: 20px; }
    .footer-link-mini { font-size: 0.78rem; color: rgba(255,255,255,0.35); transition: color 0.2s; }
    .footer-link-mini:hover { color: var(--sage); }

    /* ── WhatsApp ── */
    .wa-fab { position: fixed; bottom: 24px; right: 24px; z-index: 980; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
    .wa-panel {
      width: min(90vw, 340px); border-radius: 20px; overflow: hidden;
      background: #fff; border: 1px solid var(--border);
      box-shadow: 0 20px 60px rgba(11,11,11,0.18);
      transition: all 0.35s cubic-bezier(0.22,1,0.36,1); transform-origin: bottom right;
    }
    .wa-panel.closed { opacity: 0; transform: scale(0.92) translateY(14px); pointer-events: none; }
    .wa-header { background: var(--ink); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
    .wa-info { display: flex; align-items: center; gap: 10px; }
    .wa-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--sage); color: var(--ink); display: flex; align-items: center; justify-content: center; }
    .wa-name { font-size: 0.85rem; font-weight: 600; color: #fff; }
    .wa-status { font-size: 0.68rem; color: var(--sage); }
    .wa-close { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .wa-close:hover { border-color: var(--sage); color: var(--sage); }
    .wa-body { padding: 14px; background: #f9fbf8; display: flex; flex-direction: column; gap: 10px; }
    .wa-bubble { background: #fff; border: 1px solid var(--border); border-radius: 14px; border-top-left-radius: 3px; padding: 10px 13px; font-size: 0.82rem; line-height: 1.6; color: var(--ink); max-width: 90%; }
    .wa-quick { display: flex; flex-wrap: wrap; gap: 5px; }
    .wa-qbtn { font-size: 0.73rem; padding: 6px 11px; border-radius: 100px; border: 1px solid var(--border); background: #fff; color: var(--ink); transition: all 0.2s; }
    .wa-qbtn:hover, .wa-qbtn.sel { background: var(--sage); border-color: var(--sage); }
    .wa-row { display: flex; gap: 7px; align-items: flex-end; }
    .wa-ta { flex: 1; resize: none; border: 1px solid var(--border); border-radius: 12px; padding: 8px 12px; font-size: 0.82rem; font-family: inherit; color: var(--ink); background: #fff; }
    .wa-ta:focus { outline: none; border-color: var(--sage); }
    .wa-send { width: 36px; height: 36px; border-radius: 50%; background: var(--sage); color: var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
    .wa-send:hover { background: var(--ink); color: var(--sage); }
    .wa-label { background: var(--ink); color: var(--sage); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 5px 12px; border-radius: 100px; font-weight: 600; }
    .wa-toggle { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 28px rgba(11,11,11,0.28); transition: all 0.3s; border: none; }
    .wa-toggle.closed { background: var(--sage); color: var(--ink); }
    .wa-toggle.closed:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(197,223,192,0.45); }
    .wa-toggle.open-st { background: var(--ink); color: var(--sage); }

    /* ── Utility ── */
    .divider { height: 1px; background: linear-gradient(to right, transparent, var(--sage), transparent); margin: 0; }

    /* ── Animations ── */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
    .fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-up.d1 { animation-delay: 0.1s; }
    .fade-up.d2 { animation-delay: 0.2s; }
    .fade-up.d3 { animation-delay: 0.3s; }
    .fade-up.d4 { animation-delay: 0.4s; }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .pa-hero-grid { grid-template-columns: 1fr; }
      .pa-hero-card { display: none; }
      .overview-grid { grid-template-columns: 1fr; }
      .sidebar-card { position: static; }
      .services-grid { grid-template-columns: repeat(2, 1fr); }
      .cases-grid { grid-template-columns: repeat(2, 1fr); }
      .faq-grid { grid-template-columns: 1fr; }
      .faq-sidebar { position: static; }
      .related-grid { grid-template-columns: repeat(2, 1fr); }
      .nav-links { display: none; }
      .header-cta-desktop { display: none; }
    }
    @media (max-width: 640px) {
      .services-grid { grid-template-columns: 1fr; }
      .cases-grid { grid-template-columns: 1fr; }
      .related-grid { grid-template-columns: 1fr 1fr; }
    }
  `}</style>
);

// ─── Practice Area Data ────────────────────────────────────────────────────────

export const practiceAreas = [
  {
    slug: "criminal-law",
    title: "Criminal Law Practice",
    titleItalic: "Practice",
    icon: Scale,
    color: "#1a2f1b",
    heroImg: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&h=900&fit=crop",
    tagline: "Vigorous defense. Strategic advocacy. Your freedom matters.",
    overview: `Criminal proceedings carry the highest personal stakes — your liberty, your reputation, and your future. At AGD Law Associates, we approach every criminal matter with the seriousness it demands. Whether you face an imminent arrest, an ongoing investigation, or a full criminal trial, our team provides robust, strategic defense tailored to the facts of your specific case.

With over 12 years of practice in criminal courts across Tamil Nadu, our managing counsel AGD Bala Kumar has successfully handled everything from routine bail applications to complex white-collar crime prosecutions. We understand the pressure, the fear, and the urgency that criminal matters bring — and we are with you every step of the way.`,
    leadQuote: "In criminal proceedings, delay is damage. We act fast, we act decisively, and we always put your interests first.",
    services: [
      { icon: Shield, title: "Bail Applications", desc: "Regular and anticipatory bail applications filed before Sessions Courts and the Madras High Court. We analyze the FIR, assess risk, and act within hours when urgency demands.", check: "Section 437 & 438 CrPC" },
      { icon: FileText, title: "Criminal Trials", desc: "Full-trial representation from charge framing through arguments and final orders. We build evidence-based defense strategies aimed at acquittal or reduction in charges.", check: "Sessions & Magistrate Courts" },
      { icon: X, title: "FIR Quashing", desc: "Writ petitions before the Madras High Court under Section 482 CrPC to quash malicious, false, or legally infirm FIRs before they escalate.", check: "Madras High Court" },
      { icon: AlertCircle, title: "Cheque Dishonour Matters", desc: "Comprehensive representation in Section 138 NI Act cases — both complainant and accused — including pre-litigation settlement strategies.", check: "Section 138 NI Act" },
      { icon: Briefcase, title: "White-Collar Crime Defense", desc: "Defense in economic offences including bank fraud, money laundering, tax evasion, and corporate misappropriation before specialized courts.", check: "PMLA, IPC Economic Offences" },
      { icon: ShieldCheck, title: "Cybercrime & Financial Fraud", desc: "Legal representation in online fraud, cyber harassment, digital evidence matters, and IT Act offences before specialized cyber courts.", check: "IT Act 2000 & Amendments" },
    ],
    process: [
      { num: "01", title: "Emergency Consultation", desc: "When an arrest is imminent or has occurred, we begin with an immediate consultation to understand the FIR, the allegations, and the risk level.", tag: "Within 2 Hours" },
      { num: "02", title: "Case Analysis & Strategy", desc: "We review all documents — FIR, charge sheet, witness statements, and evidence — to build a defense theory and identify legal vulnerabilities in the prosecution's case.", tag: "Legal Assessment" },
      { num: "03", title: "Bail & Interim Relief", desc: "Where needed, we move swiftly for anticipatory or regular bail, arguing before the appropriate court with a well-prepared bail application supported by precedents.", tag: "Urgent Filing" },
      { num: "04", title: "Trial Preparation", desc: "Cross-examination strategy, witness preparation, document management, and building a cohesive defense narrative for trial proceedings.", tag: "Trial Stage" },
      { num: "05", title: "Arguments & Final Order", desc: "Strong courtroom advocacy during final arguments, presenting a clear, legally sound defense aimed at acquittal, discharge, or best possible outcome.", tag: "Courtroom Advocacy" },
      { num: "06", title: "Appeals & Revisions", desc: "If the trial court order is adverse, we advise on appeal prospects and file Criminal Appeals, Revisions, or Writ Petitions before the High Court.", tag: "Post-Trial" },
    ],
    cases: [
      { outcome: "Bail Granted", title: "Anticipatory Bail in Financial Fraud", desc: "Secured anticipatory bail for a businessman accused of ₹2.5 crore bank fraud at Madras High Court within 72 hours of approaching us.", court: "Madras High Court", year: "2024" },
      { outcome: "FIR Quashed", title: "Domestic Dispute FIR Quashed", desc: "Successfully quashed a false FIR filed in a matrimonial dispute, establishing that allegations were fabricated and used as coercive leverage.", court: "Madras High Court", year: "2023" },
      { outcome: "Acquittal", title: "Full Acquittal in SC/ST Case", desc: "Secured full acquittal for a client falsely accused under the SC/ST Prevention of Atrocities Act after demonstrating absence of intent and fabrication of evidence.", court: "Sessions Court, Chennai", year: "2023" },
    ],
    faqs: [
      { q: "What should I do if I receive an anticipatory bail notice?", a: "Contact us immediately. Anticipatory bail applications under Section 438 CrPC must be filed before arrest occurs. The sooner we act, the better your protection." },
      { q: "Can an FIR be cancelled once filed?", a: "An FIR cannot be cancelled by the police unilaterally. However, it can be quashed by the High Court under Section 482 CrPC if it is false, malicious, or legally untenable. We assess your FIR and advise on prospects." },
      { q: "How long does a criminal trial take?", a: "Trial timelines vary widely — from a few months for cheque dishonour matters to several years for complex Sessions Court trials. We work to expedite proceedings wherever possible." },
      { q: "What happens at a bail hearing?", a: "At a bail hearing, we present arguments on the nature of the offence, the accused's background, risk of absconding, and the need for custodial interrogation. Courts weigh these factors in deciding bail." },
      { q: "Is everything I tell my lawyer confidential?", a: "Yes. Attorney-client privilege is absolute. Everything you share with us remains strictly confidential and cannot be disclosed to any third party, including courts or police." },
    ],
    stats: [{ num: "200+", lbl: "Criminal Cases" }, { num: "72hrs", lbl: "Avg Bail Timeline" }, { num: "High Court", lbl: "Regular Practice" }],
    relatedAreas: ["civil-litigation", "writs-constitutional", "family-matrimonial", "corporate-advisory"],
  },

  {
    slug: "civil-litigation",
    title: "Civil Litigation",
    titleItalic: "Litigation",
    icon: BookOpen,
    color: "#1a2830",
    heroImg: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=900&fit=crop",
    tagline: "Protecting your rights. Resolving disputes. Delivering results.",
    overview: `Civil disputes — whether over property, money, contracts, or rights — can drain years of your life and resources if not handled with precision. At AGD Law Associates, our civil litigation practice is built on meticulous case preparation, sharp legal argumentation, and a commitment to achieving the best possible outcome for our clients.

We represent clients at every stage of civil proceedings — from filing original suits and interlocutory applications to appeals before the Madras High Court. Our team has handled property suits, partition matters, contractual disputes, and complex injunction applications across Tamil Nadu, and we know how to navigate the civil courts effectively.`,
    leadQuote: "Civil litigation is a marathon, not a sprint. We prepare your case as thoroughly as we argue it — because preparation wins more cases than courtroom dramatics.",
    services: [
      { icon: Home, title: "Property Disputes", desc: "Title suits, boundary disputes, encroachment matters, and property ownership litigation before Civil Courts and the High Court.", check: "CPC Suits" },
      { icon: Users, title: "Partition & Inheritance", desc: "Partition suits for family property, Hindu joint family disputes, testamentary matters, intestate succession, and probate proceedings.", check: "Succession Act" },
      { icon: Shield, title: "Injunctions & Declarations", desc: "Emergency injunction applications (mandatory and prohibitory), declaratory suits, and permanent injunction relief with immediate interim orders.", check: "Order 39 CPC" },
      { icon: Briefcase, title: "Contractual Disputes", desc: "Recovery suits, specific performance claims, breach of contract litigation, and enforcement of contractual rights.", check: "Indian Contract Act" },
      { icon: FileText, title: "Execution Proceedings", desc: "Executing court decrees against judgment debtors — attachment of property, arrest of judgment debtor, and decree satisfaction.", check: "Order 21 CPC" },
      { icon: ArrowRight, title: "Civil Appeals", desc: "First appeals, second appeals, and Letters Patent Appeals against adverse civil court decrees before Appellate Courts and the Madras High Court.", check: "Appeal & Revision" },
    ],
    process: [
      { num: "01", title: "Case Intake & Document Review", desc: "Gathering all relevant documents — sale deeds, agreements, correspondence, prior orders — and conducting a thorough legal analysis of your position.", tag: "Initial Analysis" },
      { num: "02", title: "Legal Opinion & Strategy", desc: "Providing a frank assessment of strengths, weaknesses, and likely outcomes. Choosing the right forum, the right relief, and the right time to file.", tag: "Strategy" },
      { num: "03", title: "Drafting & Filing", desc: "Precision-drafted plaints, written statements, affidavits, and applications that anticipate defenses and lay the strongest possible foundation for your case.", tag: "Court Filing" },
      { num: "04", title: "Interlocutory Applications", desc: "Filing urgent interim applications — injunctions, attachment before judgment — to protect your interests while the main suit proceeds.", tag: "Interim Relief" },
      { num: "05", title: "Evidence & Trial", desc: "Meticulous evidence collection, witness preparation, document admission, and cross-examination strategies during the trial stage.", tag: "Trial" },
      { num: "06", title: "Decree & Execution", desc: "Pursuing the final decree vigorously and, once obtained, executing it swiftly against the judgment debtor to ensure real relief.", tag: "Enforcement" },
    ],
    cases: [
      { outcome: "Injunction Granted", title: "Emergency Property Injunction", desc: "Secured an ex-parte interim injunction stopping illegal construction on a disputed property within 48 hours of filing.", court: "District Court, Chennai", year: "2024" },
      { outcome: "Decree in Favour", title: "Partition Suit — Agricultural Land", desc: "Successfully partitioned a 14-acre agricultural holding between 5 legal heirs after a 4-year suit, obtaining a clear partition decree.", court: "District Court, Coimbatore", year: "2023" },
      { outcome: "₹38L Recovery", title: "Recovery Suit — Construction Contract", desc: "Obtained a decree for ₹38 lakh against a contractor who abandoned a commercial construction project mid-way.", court: "City Civil Court, Chennai", year: "2023" },
    ],
    faqs: [
      { q: "What is the difference between a civil suit and a criminal complaint?", a: "A civil suit seeks a legal remedy — money, injunction, declaration — for a private wrong. A criminal complaint involves the state prosecuting an offence. Many disputes (like cheque dishonour or property fraud) have both civil and criminal remedies." },
      { q: "How quickly can I get an injunction?", a: "In urgent cases, we can obtain an ex-parte interim injunction the same day or next day of filing, if the case demonstrates prima facie strength and urgency. This prevents the other party from acting until the court hears both sides." },
      { q: "What evidence do I need for a property suit?", a: "Title documents, sale deeds, encumbrance certificates, tax receipts, patta/chitta documents, survey records, and possession evidence form the core. We conduct a full document audit before filing." },
      { q: "What is attachment before judgment?", a: "An attachment before judgment (Order 38 CPC) is a pre-decree remedy that freezes the defendant's property to prevent dissipation of assets before a decree is obtained against them." },
    ],
    stats: [{ num: "150+", lbl: "Civil Suits Filed" }, { num: "High Court", lbl: "Appellate Practice" }, { num: "14+", lbl: "Districts" }],
    relatedAreas: ["property-real-estate", "arbitration-adr", "family-matrimonial", "writs-constitutional"],
  },

  {
    slug: "writs-constitutional",
    title: "Writs & Constitutional Remedies",
    titleItalic: "Remedies",
    icon: Shield,
    color: "#1f1a30",
    heroImg: "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=1600&h=900&fit=crop",
    tagline: "When institutions fail you, the Constitution stands behind you.",
    overview: `The Constitution of India guarantees every citizen fundamental rights — and when those rights are violated by State action, constitutional remedies provide the most powerful tool available. At AGD Law Associates, we have extensive experience filing and arguing writ petitions before the Madras High Court on behalf of individuals, companies, and groups whose legal or fundamental rights have been infringed.

From habeas corpus petitions for unlawful detention to mandamus petitions compelling government action, from service matter writs to PIL filings, we approach constitutional litigation with the precision and gravitas it demands. Our practice in constitutional courts is built on sound legal research, clear drafting, and the ability to argue complex constitutional questions before Division Benches.`,
    leadQuote: "Constitutional remedies are extraordinary — and we treat them as such. Every writ petition we file is researched, crafted, and argued with the care your fundamental rights deserve.",
    services: [
      { icon: Scale, title: "Habeas Corpus", desc: "Emergency petitions for release of persons detained unlawfully by State or private parties. Fastest constitutional remedy — returnable within hours.", check: "Article 226/32" },
      { icon: ShieldCheck, title: "Mandamus Petitions", desc: "Compelling government authorities to perform mandatory statutory duties — from issuing certificates to processing applications and implementing orders.", check: "Compel State Action" },
      { icon: X, title: "Certiorari & Prohibition", desc: "Quashing orders passed without jurisdiction or in violation of natural justice, and prohibiting authorities from exceeding their jurisdiction.", check: "Quash Illegal Orders" },
      { icon: Users, title: "Quo Warranto", desc: "Challenging the legal authority of a person to hold a public office when they are not legally entitled to do so.", check: "Public Office Disputes" },
      { icon: FileText, title: "Service Matter Writs", desc: "Writs challenging arbitrary termination, wrongful suspension, non-promotion, departmental enquiry violations, and service rule breaches.", check: "Government Employees" },
      { icon: Award, title: "PIL Matters", desc: "Public Interest Litigation before the Madras High Court and Supreme Court on environmental, social, governance, and rights-based issues.", check: "Public Interest" },
    ],
    process: [
      { num: "01", title: "Legal Feasibility Assessment", desc: "Analyzing whether the facts disclose a violation of a fundamental or legal right, whether a statutory remedy exists, and whether writ jurisdiction is appropriate.", tag: "Writ Eligibility" },
      { num: "02", title: "Research & Grounds", desc: "Deep legal research into applicable constitutional provisions, precedents from the Madras High Court and Supreme Court, and formulation of grounds for the writ.", tag: "Legal Research" },
      { num: "03", title: "Petition Drafting", desc: "Precisely drafted writ petition with a clear statement of facts, grounds, prayers, and supported affidavits — anticipating the counter-affidavit.", tag: "Drafting" },
      { num: "04", title: "Urgent Mentioning", desc: "In time-sensitive matters, urgent mentioning before the Chief Justice's Court for out-of-turn listing and interim stay or direction.", tag: "Urgent Relief" },
      { num: "05", title: "Counter Affidavit & Rejoinder", desc: "Filing rejoinder affidavits responding to the State's counter, addressing each ground with precision to strengthen the petitioner's case.", tag: "Interlocutory Stage" },
      { num: "06", title: "Final Hearing & Judgment", desc: "Oral submissions at final hearing with written arguments, case compilation, and follow-up to ensure the order is implemented.", tag: "Final Stage" },
    ],
    cases: [
      { outcome: "Reinstatement Ordered", title: "Government Employee Service Matter", desc: "Successfully challenged the arbitrary termination of a class I government employee, securing reinstatement with full back wages through a mandamus writ.", court: "Madras High Court", year: "2024" },
      { outcome: "Stay Granted", title: "Stay on Demolition Order", desc: "Obtained an urgent stay of a municipal demolition order passed without notice, allowing the petitioner to regularize the construction.", court: "Madras High Court", year: "2023" },
      { outcome: "Order Quashed", title: "Tender Rejection Quashed", desc: "Filed a writ of certiorari quashing the arbitrary rejection of a client's tender bid by a public sector undertaking without valid reasons.", court: "Madras High Court", year: "2024" },
    ],
    faqs: [
      { q: "When should I file a writ petition instead of a regular civil suit?", a: "A writ petition is appropriate when your fundamental rights under Part III of the Constitution are violated, or when a government authority has acted illegally, arbitrarily, or without jurisdiction. Ordinary contractual or private disputes are typically handled through civil suits." },
      { q: "How fast can I get relief in a writ petition?", a: "In urgent cases — unlawful detention, demolitions, immediate deprivation of rights — we can obtain an ex-parte interim stay or direction on the day of filing by urgent mentioning before the court." },
      { q: "Can private parties be made respondents in a writ?", a: "Generally, writs lie against the State and public authorities. Private parties can be added as respondents if they are performing public duties or are backed by State action. Habeas corpus can be filed even against private persons for unlawful detention." },
      { q: "What is the difference between a writ and an appeal?", a: "An appeal challenges the correctness of a decision by a lower court on facts and law. A writ challenges the jurisdiction, legality, or constitutional validity of an authority's action — it is not a substitute for an appeal where a statutory appeal remedy is available." },
    ],
    stats: [{ num: "High Court", lbl: "Primary Forum" }, { num: "PIL", lbl: "Public Interest" }, { num: "48hrs", lbl: "Urgent Relief" }],
    relatedAreas: ["criminal-law", "civil-litigation", "corporate-advisory", "consumer-protection"],
  },

  {
    slug: "consumer-protection",
    title: "Consumer Protection",
    titleItalic: "Protection",
    icon: ShieldCheck,
    color: "#1a2520",
    heroImg: "https://plus.unsplash.com/premium_photo-1661720120987-9723da4de350?w=1600&h=900&fit=crop",
    tagline: "You paid for quality. When that promise is broken, we fight to make it right.",
    overview: `The Consumer Protection Act 2019 gives Indian consumers one of the most powerful frameworks in the world to seek redress against defective products, deficient services, unfair trade practices, and misleading advertisements. At AGD Law Associates, we help consumers across Tamil Nadu exercise these rights effectively — from drafting the initial complaint to arguing before the State Consumer Disputes Redressal Commission.

Whether you've been let down by a builder, a hospital, an insurance company, an e-commerce platform, or any service provider, we assess your matter, advise on the right forum, and pursue compensation, replacement, or service correction with dedicated focus.`,
    leadQuote: "Consumer courts were designed to give the ordinary citizen a powerful, accessible remedy. We ensure you use that power effectively.",
    services: [
      { icon: FileText, title: "Consumer Complaints", desc: "Drafting and filing consumer complaints before District, State, and National Consumer Disputes Redressal Commissions based on pecuniary jurisdiction.", check: "All Three Tiers" },
      { icon: Home, title: "Builder & Real Estate Disputes", desc: "Complaints against builders for delayed possession, construction defects, false promises, RERA violations, and unfair builder-buyer agreements.", check: "RERA & CPA 2019" },
      { icon: ShieldCheck, title: "Insurance Claim Disputes", desc: "Disputes against insurance companies for repudiation of health, vehicle, life, or property insurance claims on flimsy or unjustified grounds.", check: "Insurance Ombudsman & Court" },
      { icon: AlertCircle, title: "Medical Negligence", desc: "Consumer complaints and civil suits against hospitals, doctors, and medical facilities for negligent treatment, misdiagnosis, and surgical errors.", check: "Medical Deficiency" },
      { icon: Briefcase, title: "E-Commerce & Product Defects", desc: "Complaints against online platforms and manufacturers for defective products, fake goods, non-delivery, and misleading product descriptions.", check: "Product Liability" },
      { icon: Award, title: "Compensation Claims", desc: "Claiming maximum compensation including return of money paid, replacement, repair, consequential loss, and mental agony compensation.", check: "Full Compensation" },
    ],
    process: [
      { num: "01", title: "Complaint Assessment", desc: "Reviewing your transaction, the deficiency, the quantum of loss, and identifying the right forum (District/State/National) based on claim value and location.", tag: "Forum Selection" },
      { num: "02", title: "Evidence Compilation", desc: "Gathering purchase documents, bills, communications, service records, expert opinions, and photographic evidence to substantiate the complaint.", tag: "Evidence" },
      { num: "03", title: "Complaint Drafting", desc: "Precisely drafted consumer complaint with clear grounds, relief sought, legal provisions, and annexures — designed to secure admission swiftly.", tag: "Drafting" },
      { num: "04", title: "Filing & Admission", desc: "Filing before the appropriate commission and pursuing early admission and notice issuance to the opposite party.", tag: "Filing" },
      { num: "05", title: "Arguments & Mediation", desc: "Presenting arguments on deficiency, unfair trade practice, and quantum of compensation. Exploring mediation where quick settlement is possible.", tag: "Hearing" },
      { num: "06", title: "Order & Enforcement", desc: "Obtaining the order and ensuring compliance — pursuing execution proceedings if the opposite party fails to comply with the consumer commission order.", tag: "Execution" },
    ],
    cases: [
      { outcome: "₹18L Awarded", title: "Builder Deficiency — Delayed Possession", desc: "Obtained ₹18 lakh compensation against a leading Chennai builder for 4-year delay in possession and construction quality defects.", court: "State Consumer Commission", year: "2024" },
      { outcome: "Full Refund", title: "Insurance Claim — Wrongful Repudiation", desc: "Succeeded against an insurance company that wrongfully repudiated a ₹6.5 lakh health claim, securing full payment plus interest and costs.", court: "District Consumer Forum", year: "2023" },
      { outcome: "₹3.2L + Costs", title: "Hospital Medical Negligence", desc: "Filed a consumer complaint against a private hospital for post-surgical negligence, securing ₹3.2 lakh compensation and written apology.", court: "District Consumer Forum", year: "2023" },
    ],
    faqs: [
      { q: "What is the pecuniary limit for each consumer forum?", a: "District Commission handles claims up to ₹50 lakh. State Commission handles claims between ₹50 lakh and ₹2 crore. National Commission handles claims above ₹2 crore. These limits were revised under the Consumer Protection Act 2019." },
      { q: "Can I file a consumer complaint against a hospital?", a: "Yes. Medical services are covered under the Consumer Protection Act. You can file a complaint for medical negligence, misdiagnosis, or deficiency in service against hospitals and doctors." },
      { q: "How long does a consumer complaint take?", a: "Consumer commissions are designed for speedy disposal — ideally within 3-5 months. However, actual timelines vary by forum and caseload. District forums tend to be faster than State commissions." },
      { q: "Can I get compensation for mental agony in a consumer complaint?", a: "Yes. Consumer commissions regularly award compensation for mental agony, harassment, and loss of time in addition to the actual loss suffered. The quantum depends on the facts and the forum." },
    ],
    stats: [{ num: "₹18L+", lbl: "Max Award Secured" }, { num: "All Tiers", lbl: "District/State/National" }, { num: "High Rate", lbl: "Complaint Success" }],
    relatedAreas: ["civil-litigation", "property-real-estate", "corporate-advisory", "criminal-law"],
  },

  {
    slug: "property-real-estate",
    title: "Property & Real Estate Law",
    titleItalic: "Law",
    icon: Home,
    color: "#2a1a10",
    heroImg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop",
    tagline: "Your property is your most significant asset. Protect it with precision.",
    overview: `Property transactions and disputes in Tamil Nadu involve a complex web of revenue laws, registration requirements, local body regulations, and civil court proceedings. One wrong step in a property purchase — or one delayed response in a property dispute — can cost you enormously. AGD Law Associates provides end-to-end property legal services covering both transactional advisory and contentious litigation.

Our managing counsel has deep experience in Tamil Nadu's unique property law landscape — including patta transfers, guideline value assessments, encumbrance certificate verification, and DTCP/CMDA regulation — ensuring your property matters are handled by someone who knows the jurisdiction inside out.`,
    leadQuote: "In property matters, due diligence before the transaction is worth ten times the litigation after. We help you do both right.",
    services: [
      { icon: FileText, title: "Title Verification & Due Diligence", desc: "30-year title search, EC verification, patta/chitta inspection, survey record review, and legal opinion on clear and marketable title.", check: "Pre-Purchase" },
      { icon: Home, title: "Sale & Purchase Documentation", desc: "Drafting sale agreements, absolute sale deeds, GPA/SPA documents, and representing clients in the registration process.", check: "Document Drafting" },
      { icon: Building, title: "Lease & Rental Agreements", desc: "Commercial and residential lease deeds, license agreements, leave and license documentation, and notice procedures for tenant eviction.", check: "Lease Drafting" },
      { icon: Scale, title: "Property Dispute Litigation", desc: "Title suits, boundary disputes, illegal encroachment, wrongful possession, and declaratory suits to establish ownership before civil courts.", check: "Court Litigation" },
      { icon: Shield, title: "RERA Compliance & Disputes", desc: "Advisory on TNRERA compliance for builders, buyer complaints against builders for delays and defects, and RERA tribunal proceedings.", check: "TNRERA" },
      { icon: Briefcase, title: "Joint Development & Builder Agreements", desc: "Reviewing and negotiating joint development agreements, construction agreements, undivided share calculations, and builder-buyer contracts.", check: "JDA Advisory" },
    ],
    process: [
      { num: "01", title: "Initial Consultation & Scope", desc: "Understanding the property, the transaction or dispute, the parties involved, and the specific relief or advisory needed.", tag: "Scoping" },
      { num: "02", title: "Document Collection", desc: "Gathering parent documents, EC (15-30 years), patta/chitta, tax receipts, survey sketch, building approval plans, and any prior dispute records.", tag: "Documents" },
      { num: "03", title: "Title Search & Legal Opinion", desc: "Conducting a thorough title search, identifying encumbrances, defects, and litigation, and delivering a clear written legal opinion on the title.", tag: "Due Diligence" },
      { num: "04", title: "Document Drafting & Negotiation", desc: "Preparing transaction documents — sale agreement, deed of sale, lease deed — with protective clauses, representations, and warranties for the client.", tag: "Drafting" },
      { num: "05", title: "Registration Support", desc: "Attending the Sub-Registrar's office with the client, ensuring correct stamp duty payment, and witnessing registration of documents.", tag: "Registration" },
      { num: "06", title: "Post-Transaction & Dispute Handling", desc: "Handling post-transaction issues including title disputes, builder defaults, partition suits, and property injunction applications.", tag: "Dispute Resolution" },
    ],
    cases: [
      { outcome: "Decree in Favour", title: "3-Generation Title Dispute", desc: "Defended a multi-acre agricultural property title dispute spanning three generations of family conflict, resulting in a clear title decree for our client.", court: "District Court, Coimbatore", year: "2023" },
      { outcome: "Encroachment Removed", title: "Commercial Property Encroachment", desc: "Obtained an injunction and mandatory court order for removal of illegal construction encroaching on client's commercial plot.", court: "City Civil Court, Chennai", year: "2024" },
      { outcome: "JDA Renegotiated", title: "Joint Development Agreement Dispute", desc: "Resolved a disputed JDA between landowner and builder by negotiating revised terms and undivided share allocation through legal intervention.", court: "Mediation & Settlement", year: "2023" },
    ],
    faqs: [
      { q: "What documents should I check before buying property in Tamil Nadu?", a: "At minimum: EC for 30 years, parent documents (chain of title), patta/chitta, survey field measurement sketch, building approval (if constructed), tax receipts, and check for any court cases in the district court records." },
      { q: "What is an encumbrance certificate and why is it important?", a: "An EC (Encumbrance Certificate) from the Sub-Registrar shows all registered transactions on a property — mortgages, sale, lease — for a specified period. It confirms whether the property is free of liabilities. A clean EC is essential for purchase and for obtaining loans." },
      { q: "What is the difference between sale agreement and sale deed?", a: "A sale agreement (agreement to sell) is a preliminary contract that sets out the terms of the future sale. The sale deed is the final, registered document that transfers ownership. The sale deed is what confers title — the agreement alone does not transfer property." },
      { q: "Can a property be bought from someone with only a Power of Attorney?", a: "A GPA holder can execute a sale on behalf of the original owner only if the GPA specifically authorizes sale. We strongly recommend verifying the GPA's validity, whether the original owner is alive, and that it is properly registered and notarized." },
    ],
    stats: [{ num: "30yr", lbl: "Title Searches" }, { num: "TNRERA", lbl: "Registered" }, { num: "All Districts", lbl: "TN Coverage" }],
    relatedAreas: ["civil-litigation", "consumer-protection", "family-matrimonial", "arbitration-adr"],
  },

  {
    slug: "family-matrimonial",
    title: "Family & Matrimonial Law",
    titleItalic: "Law",
    icon: Heart,
    color: "#2a1a20",
    heroImg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop",
    tagline: "Family law is deeply personal. We handle it with expertise and compassion.",
    overview: `Family and matrimonial disputes are among the most emotionally charged legal matters anyone can face. Whether navigating a divorce, fighting for custody of a child, or securing maintenance, you need a lawyer who combines sharp legal expertise with genuine sensitivity to the human dimensions of the case.

At AGD Law Associates, our family law practice is built on two pillars: complete legal competence and human understanding. We represent clients across all family law matters — divorce (mutual and contested), child custody, domestic violence proceedings, maintenance disputes, and guardianship — before Family Courts, District Courts, and the Madras High Court.`,
    leadQuote: "In family matters, we are your advocates first and counsellors second. We fight for you in court, and we advise you with honesty about what serves your long-term interests.",
    services: [
      { icon: Heart, title: "Mutual Consent Divorce", desc: "Guiding couples through the Hindu Marriage Act Section 13-B (or relevant personal law) divorce by mutual consent, including first and second motions and cooling-off waivers.", check: "HMA Section 13-B" },
      { icon: Scale, title: "Contested Divorce", desc: "Representing petitioners and respondents in full contested divorce proceedings on grounds of cruelty, adultery, desertion, and other grounds under Hindu, Christian, Muslim, and Special Marriage Acts.", check: "Contested Proceedings" },
      { icon: Users, title: "Child Custody & Visitation", desc: "Custody petitions (interim and final), parental abduction situations, international custody matters, and structured visitation order drafting.", check: "Guardians & Wards Act" },
      { icon: Shield, title: "Domestic Violence", desc: "Applications under the Protection of Women from Domestic Violence Act 2005 — protection orders, residence orders, monetary relief, and custody orders.", check: "DV Act 2005" },
      { icon: FileText, title: "Maintenance & Alimony", desc: "Maintenance applications under Section 125 CrPC, Section 24 HMA, and personal laws — both for petitioner and respondent — with interim relief applications.", check: "Section 125 CrPC" },
      { icon: Award, title: "Guardianship", desc: "Guardianship petitions under the Guardians and Wards Act for minors and persons of unsound mind, including inter-country guardianship matters.", check: "Guardians & Wards Act" },
    ],
    process: [
      { num: "01", title: "Confidential Consultation", desc: "A private, non-judgmental consultation to understand the full family situation, what you hope to achieve, and what legal remedies are available to you.", tag: "Private & Confidential" },
      { num: "02", title: "Strategy & Realistic Advice", desc: "An honest assessment of likely outcomes, the time and cost involved, and whether negotiation, mediation, or full litigation best serves your interests.", tag: "Honest Advisory" },
      { num: "03", title: "Interim Relief Applications", desc: "Where needed — interim maintenance, interim custody, protection orders — we move swiftly before the appropriate court to secure immediate relief.", tag: "Urgent Relief" },
      { num: "04", title: "Mediation & Settlement Exploration", desc: "For matters where settlement is possible and beneficial, we guide structured mediation to reach agreements on maintenance, custody, and asset division.", tag: "Mediation" },
      { num: "05", title: "Trial & Evidence", desc: "In contested matters, rigorous preparation of evidence, cross-examination of witnesses, and legal arguments before the Family Court or District Court.", tag: "Trial" },
      { num: "06", title: "Final Order & Implementation", desc: "Obtaining the final order — divorce decree, custody order, maintenance order — and ensuring it is fully implemented, including execution if needed.", tag: "Implementation" },
    ],
    cases: [
      { outcome: "Custody Secured", title: "Contested Child Custody", desc: "Represented a mother in a bitter contested custody matter, securing primary custody of two children with defined supervised visitation for the opposing party.", court: "Family Court, Chennai", year: "2023" },
      { outcome: "Maintenance Granted", title: "Interim Maintenance — Domestic Violence", desc: "Secured ₹15,000/month interim maintenance and a residence order within 3 weeks of filing a DV Act application on behalf of a client.", court: "Judicial Magistrate Court", year: "2024" },
      { outcome: "Decree Granted", title: "Contested Divorce — Mental Cruelty", desc: "Successfully obtained a divorce decree on grounds of mental cruelty after a contested proceeding spanning 18 months, securing reasonable alimony.", court: "Family Court, Chennai", year: "2023" },
    ],
    faqs: [
      { q: "What is the minimum waiting period for mutual consent divorce?", a: "Under Section 13-B of the Hindu Marriage Act, there is a mandatory 6-month cooling-off period between the first and second motion. However, the Supreme Court has held that courts can waive this period if the marriage has irretrievably broken down. We can assess your eligibility for a waiver." },
      { q: "Who gets custody of children after divorce?", a: "Courts decide custody based on the 'best interests of the child' principle — not based on gender. Factors include the child's age, the emotional bond with each parent, stability, financial capacity, and the child's own preference (if old enough). We present a comprehensive picture of your parenting ability to the court." },
      { q: "Can I get maintenance before the divorce is finalized?", a: "Yes. You can apply for interim maintenance under Section 24 of the Hindu Marriage Act or Section 125 CrPC during the pendency of proceedings. Courts often grant this within a few months of filing." },
      { q: "What protection does the DV Act offer?", a: "The DV Act 2005 provides protection orders (preventing the respondent from approaching you), residence orders (right to stay in the shared household), monetary relief, and custody orders — all through a Magistrate Court, which is faster than Civil Courts." },
    ],
    stats: [{ num: "Family Court", lbl: "Primary Forum" }, { num: "DV Act", lbl: "Emergency Relief" }, { num: "Child-First", lbl: "Custody Approach" }],
    relatedAreas: ["civil-litigation", "consumer-protection", "writs-constitutional", "criminal-law"],
  },

  {
    slug: "arbitration-adr",
    title: "Arbitration & ADR",
    titleItalic: "& ADR",
    icon: Award,
    color: "#1a1f30",
    heroImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop",
    tagline: "Faster resolution. Confidential proceedings. Commercially sound outcomes.",
    overview: `For commercial disputes, arbitration and alternative dispute resolution often deliver better outcomes than traditional litigation — faster timelines, confidential proceedings, commercially sophisticated arbitrators, and awards that are enforceable across borders. At AGD Law Associates, we advise and represent clients in all aspects of domestic arbitration under the Arbitration and Conciliation Act 1996 (as amended).

Our ADR practice covers pre-arbitration strategy, drafting arbitration clauses, representing parties before arbitral tribunals, challenging awards before the High Court under Section 34, and enforcing domestic and foreign arbitral awards. We also facilitate structured mediation and conciliation for parties seeking consensual resolution.`,
    leadQuote: "Arbitration is not a softer form of litigation — it demands the same strategic preparation and legal rigor. We bring both.",
    services: [
      { icon: Scale, title: "Arbitration Representation", desc: "Full representation before sole arbitrators and three-member tribunals — from filing statements of claim to oral hearings, evidence, and final awards.", check: "Domestic Arbitration" },
      { icon: FileText, title: "Arbitration Clause Drafting", desc: "Drafting clear, enforceable arbitration clauses for commercial contracts — specifying seat, institution, governing law, number of arbitrators, and timeline.", check: "Contract Advisory" },
      { icon: Shield, title: "Section 9 Interim Relief", desc: "Applying to court for urgent interim measures before or during arbitration — attachment of assets, injunctions, appointment of receivers.", check: "Courts & Tribunals" },
      { icon: Award, title: "Award Enforcement", desc: "Execution of domestic arbitral awards as court decrees. Recognition and enforcement of foreign arbitral awards under the New York Convention.", check: "Section 36 Enforcement" },
      { icon: X, title: "Section 34 Challenges", desc: "Challenging arbitral awards before the High Court on grounds of patent illegality, public policy, procedural irregularity, and arbitrability.", check: "Award Challenges" },
      { icon: Users, title: "Mediation & Conciliation", desc: "Facilitated mediation and conciliation for commercial, property, and employment disputes — structured settlement through professional neutrals.", check: "ADR Settlement" },
    ],
    process: [
      { num: "01", title: "Contract & Clause Analysis", desc: "Reviewing the arbitration agreement or clause for validity, seat of arbitration, governing rules, and institutional vs. ad-hoc arbitration.", tag: "Agreement Review" },
      { num: "02", title: "Arbitrator Appointment", desc: "Advising on and facilitating arbitrator appointment — single arbitrator or three-member tribunal — through party agreement or court application under Section 11.", tag: "Appointment" },
      { num: "03", title: "Statement of Claim / Defense", desc: "Drafting precise statements of claim and defense with supporting documents, legal arguments, and relief sought — establishing the factual and legal framework early.", tag: "Pleadings" },
      { num: "04", title: "Evidence & Hearing", desc: "Managing document production, witness statements, cross-examination, and expert evidence during arbitral hearings — maintaining a clear evidentiary record.", tag: "Hearing Stage" },
      { num: "05", title: "Final Award", desc: "Post-hearing written submissions, closing arguments, and engaging with the arbitrator's questions before the final award is rendered.", tag: "Award" },
      { num: "06", title: "Enforcement or Challenge", desc: "After the award, executing it under Section 36 if in your favour — or filing a challenge under Section 34 within 90 days if the award is adverse.", tag: "Post-Award" },
    ],
    cases: [
      { outcome: "Award Enforced", title: "Construction Contract — ₹1.2 Cr Award", desc: "Enforced a ₹1.2 crore arbitral award against a real estate developer who defaulted on a construction milestone agreement.", court: "City Civil Court, Chennai", year: "2024" },
      { outcome: "Award Set Aside", title: "Procedurally Defective Award", desc: "Successfully challenged and set aside an arbitral award under Section 34 where the arbitrator had not disclosed prior relationship with the opposing party.", court: "Madras High Court", year: "2023" },
      { outcome: "Settlement Reached", title: "Commercial Dispute — Mediated Settlement", desc: "Facilitated mediation in a ₹85 lakh distribution agreement dispute, achieving a structured settlement in 3 sessions without proceeding to arbitration.", court: "Mediation Centre", year: "2023" },
    ],
    faqs: [
      { q: "Is arbitration faster than going to court?", a: "Generally yes. Arbitration offers party autonomy in scheduling hearings, and a focused tribunal avoids the docket pressures of regular courts. Complex commercial arbitrations may take 12-24 months, compared to potentially years in civil courts." },
      { q: "Can I challenge an arbitral award if I lose?", a: "Yes, but the grounds are narrow. Under Section 34 of the Arbitration Act, awards can be challenged for patent illegality, public policy violations, exceeding the scope of submission, or procedural irregularity. Courts do not re-examine the merits of the dispute." },
      { q: "What is the difference between mediation and arbitration?", a: "Arbitration results in a binding award like a court judgment. Mediation is a facilitated negotiation where a neutral mediator helps the parties reach a voluntary settlement — the mediator does not decide anything. Mediation outcomes are binding only if the parties agree and sign a settlement agreement." },
      { q: "Is my arbitration proceeding confidential?", a: "Yes. Unlike court proceedings (which are public), arbitration hearings and awards are confidential between the parties unless disclosure is required for enforcement. This is a key advantage for commercial disputes involving sensitive business information." },
    ],
    stats: [{ num: "A&C Act", lbl: "1996 & Amendments" }, { num: "NY Conv.", lbl: "Foreign Awards" }, { num: "Fast", lbl: "Commercial Focus" }],
    relatedAreas: ["civil-litigation", "corporate-advisory", "property-real-estate", "consumer-protection"],
  },

  {
    slug: "corporate-advisory",
    title: "Corporate & Commercial Advisory",
    titleItalic: "Advisory",
    icon: Briefcase,
    color: "#1a201a",
    heroImg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",
    tagline: "Legal certainty for business decisions. Advisory that drives growth.",
    overview: `Running a business in India means navigating an evolving regulatory landscape — contracts, partnerships, compliance, employment, intellectual property, and commercial disputes — often simultaneously. AGD Law Associates provides practical, commercially oriented legal advisory to businesses, startups, and entrepreneurs across Tamil Nadu and beyond.

Our corporate advisory practice focuses on giving businesses clear, actionable legal advice — not just theoretical analysis. From reviewing your first vendor contract to advising on a complex shareholder dispute, we are your legal partner at every stage of business growth.`,
    leadQuote: "Good legal advice for a business is not just about avoiding risk — it's about creating structures that allow you to grow confidently.",
    services: [
      { icon: FileText, title: "Contract Drafting & Vetting", desc: "Drafting and reviewing vendor agreements, service contracts, distribution agreements, NDAs, employment contracts, and SLAs to protect your commercial interests.", check: "All Contract Types" },
      { icon: Briefcase, title: "Business Dispute Resolution", desc: "Managing commercial disputes through negotiation, legal notices, arbitration, or litigation — with a focus on efficient resolution and relationship preservation where possible.", check: "Commercial Disputes" },
      { icon: Users, title: "Partnership & Shareholder Agreements", desc: "Drafting and reviewing partnership deeds, LLP agreements, shareholders' agreements, founder agreements, and buy-sell provisions.", check: "Business Structures" },
      { icon: ShieldCheck, title: "Compliance Advisory", desc: "Advising on Companies Act, MSME regulations, labour law compliance, GST implications on contracts, and sector-specific regulatory requirements.", check: "Regulatory" },
      { icon: Scale, title: "Legal Due Diligence", desc: "Pre-investment, pre-acquisition, and pre-lending due diligence — reviewing contracts, licenses, litigation exposure, IP, and compliance status.", check: "M&A / Investment" },
      { icon: Award, title: "IP & Confidentiality", desc: "Trademark filing advisory, NDA drafting, trade secret protection strategies, and IP licensing agreement reviews for technology and content businesses.", check: "IP Protection" },
    ],
    process: [
      { num: "01", title: "Business Understanding", desc: "Understanding your business model, the industry, your key contracts, and where the legal risks and opportunities lie in your specific context.", tag: "Business Intake" },
      { num: "02", title: "Risk Assessment", desc: "Identifying legal vulnerabilities — in existing contracts, compliance gaps, partnership structures, or pending disputes — and prioritizing them by impact.", tag: "Risk Review" },
      { num: "03", title: "Contract & Document Review", desc: "Reviewing all key commercial documents with track-change comments and a clear summary of negotiable and non-negotiable clauses with recommended positions.", tag: "Review" },
      { num: "04", title: "Drafting & Negotiation Support", desc: "Drafting your preferred contract positions and providing negotiation support — both in writing and (where needed) at negotiation tables with counterparties.", tag: "Drafting" },
      { num: "05", title: "Execution & Implementation", desc: "Guiding the execution of agreements, ensuring proper stamping, notarization, and registration where legally required.", tag: "Execution" },
      { num: "06", title: "Ongoing Advisory", desc: "Serving as your on-call legal advisor for new contracts, disputes, regulatory queries, and emerging legal issues as your business grows.", tag: "Retainer Advisory" },
    ],
    cases: [
      { outcome: "Dispute Resolved", title: "Franchise Agreement Dispute", desc: "Advised a franchisor client in a complex franchise termination dispute, negotiating a structured settlement that included brand protection and territory reversion.", court: "Negotiation & Legal Notice", year: "2024" },
      { outcome: "Contract Renegotiated", title: "Vendor Contract — IT Company", desc: "Reviewed and renegotiated a ₹4 crore IT services contract for a manufacturing company, adding SLA protections, limitation of liability caps, and exit clauses.", court: "Contract Advisory", year: "2023" },
      { outcome: "Due Diligence Completed", title: "Pre-Investment Legal Due Diligence", desc: "Conducted comprehensive legal due diligence for a private equity investor before a ₹10 crore investment in a mid-size logistics firm, identifying and resolving title and compliance issues.", court: "M&A Advisory", year: "2024" },
    ],
    faqs: [
      { q: "Does my business need a formal shareholders' agreement even if we are just two co-founders?", a: "Absolutely. A shareholders' agreement (or founder agreement) specifies each founder's equity, roles, decision-making authority, vesting schedule, what happens if one founder leaves, and dispute resolution mechanisms. Without one, disputes can be both legally complex and personally damaging." },
      { q: "What is legal due diligence and when do I need it?", a: "Legal due diligence is a systematic review of a target company's legal health — its contracts, litigation exposure, IP, regulatory compliance, and corporate structure. You need it before investing in, acquiring, or lending money to another business." },
      { q: "Do I need a lawyer to review a standard commercial contract?", a: "Yes — 'standard' contracts are often standard for the other party's benefit, not yours. Key issues like indemnity clauses, limitation of liability, IP ownership, jurisdiction, and termination rights are often buried in standard templates. A 30-minute review can prevent years of litigation." },
      { q: "What is a legal retainer and how does it work?", a: "A legal retainer is a fixed monthly arrangement where we provide agreed advisory services — contract reviews, compliance queries, legal opinions — for a set fee. It gives you predictable legal costs and immediate access to advice when you need it." },
    ],
    stats: [{ num: "Contracts", lbl: "Core Specialty" }, { num: "Startup", lbl: "Friendly Advice" }, { num: "Pan-TN", lbl: "Business Coverage" }],
    relatedAreas: ["arbitration-adr", "civil-litigation", "writs-constitutional", "consumer-protection"],
  },

  {
    slug: "mcop-rent-control",
    title: "Motor Accident & Rent Control",
    titleItalic: "Matters",
    icon: Car,
    color: "#1f1a10",
    heroImg: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1600&h=900&fit=crop",
    tagline: "Fair compensation for accident victims. Firm legal ground for landlords and tenants.",
    overview: `Motor Accidents Claims Petitions (MCOP) and Rent Control Original Petitions (RCOP) are two of the most common legal proceedings in Tamil Nadu's subordinate courts. Both require specialists who understand the specific procedural and evidentiary requirements of these forums — and who can maximize outcomes for their clients in each.

At AGD Law Associates, our MCOP practice focuses on securing maximum compensation for accident victims and their families — by meticulously calculating and arguing loss of income, future earnings, medical expenses, and non-pecuniary damages. Our rent control practice covers eviction proceedings, fair rent fixation, and tenant-landlord disputes across Tamil Nadu's Rent Control Act framework.`,
    leadQuote: "An accident victim or a wronged landlord deserves every rupee the law entitles them to. We make sure the law delivers.",
    services: [
      { icon: Car, title: "MCOP Claims — Claimant", desc: "Filing and arguing accident compensation claims on behalf of injured victims and families of deceased — calculating loss of income, medical costs, and non-pecuniary heads.", check: "MV Act 1988" },
      { icon: Shield, title: "MCOP — Insurance Defense", desc: "Representing insurance companies and vehicle owners in contested MCOP claims — examining quantum, contributory negligence, and accident circumstances.", check: "Third Party Claims" },
      { icon: Award, title: "High-Value Accident Claims", desc: "Specialized handling of fatal accident claims, permanent disability claims, and claims involving commercial vehicles or multiple vehicles.", check: "Fatal & Disability" },
      { icon: Home, title: "Eviction Petitions (RCOP)", desc: "Filing and defending eviction petitions on grounds of personal occupation, non-payment of rent, subletting, misuse, and expiry of lease.", check: "TN Rent Control Act" },
      { icon: Scale, title: "Fair Rent Fixation", desc: "Applications for determination of fair rent before the Rent Controller, challenging excessive rent demands and protecting tenants from arbitrary increases.", check: "Rent Fixation" },
      { icon: FileText, title: "Rent Control Appeals", desc: "Appeals before the Appellate Authority and the Madras High Court against adverse Rent Controller orders in both eviction and fair rent matters.", check: "Appellate Stage" },
    ],
    process: [
      { num: "01", title: "Accident / Tenancy Assessment", desc: "For MCOP: reviewing accident facts, medical records, disability assessment, and insurance policy. For RCOP: reviewing tenancy agreement, rent history, and ground for eviction.", tag: "Case Assessment" },
      { num: "02", title: "Compensation Calculation (MCOP)", desc: "Calculating compensation across all heads — loss of income (multiplier method), medical expenses, pain and suffering, future medical care, and special damages.", tag: "Quantum" },
      { num: "03", title: "Petition Filing", desc: "Filing MCOP or RCOP before the Motor Accidents Claims Tribunal or Rent Controller with all supporting documents and evidence.", tag: "Filing" },
      { num: "04", title: "Evidence & Examination", desc: "MCOP: examining doctors, eyewitnesses, and accident reconstruction evidence. RCOP: presenting rental agreements, notice history, and occupation evidence.", tag: "Evidence" },
      { num: "05", title: "Arguments on Quantum/Grounds", desc: "Arguing the legal and factual grounds for compensation or eviction, anticipating defenses, and citing relevant Madras High Court and Supreme Court judgments.", tag: "Arguments" },
      { num: "06", title: "Award & Appeal", desc: "Pursuing the award or order — and filing an appeal if the first forum's decision is inadequate or adverse.", tag: "Post-Order" },
    ],
    cases: [
      { outcome: "₹42L Awarded", title: "Fatal Accident — Family Compensation", desc: "Secured ₹42 lakh compensation for a family of four who lost their sole breadwinner in a lorry accident, using the multiplier method based on proven income.", court: "MACT, Coimbatore", year: "2023" },
      { outcome: "₹18L Disability Claim", title: "Permanent Disability — Road Accident", desc: "Obtained ₹18 lakh for a client with 65% permanent disability from a two-vehicle collision, claiming loss of future earning capacity.", court: "MACT, Chennai", year: "2024" },
      { outcome: "Eviction Granted", title: "Owner Occupation Eviction", desc: "Successfully evicted a commercial tenant after establishing bona fide need for personal occupation, obtaining possession within 14 months of filing.", court: "Rent Controller, Chennai", year: "2023" },
    ],
    faqs: [
      { q: "How is motor accident compensation calculated?", a: "Compensation is calculated under several heads: loss of income (annual income × multiplier based on age), medical expenses, pain and suffering, loss of consortium (for family members), funeral expenses, and loss of estate. The multiplier method is used for fatal and permanent disability claims." },
      { q: "What is the time limit to file a MCOP claim?", a: "Under the Motor Vehicles Act 1988, the claim petition must be filed within 6 months of the date of accident. However, courts can condone delay on showing sufficient cause. Contact us immediately after an accident to preserve your rights." },
      { q: "On what grounds can a landlord evict a tenant under the Tamil Nadu Rent Control Act?", a: "Grounds include: wilful default in rent payment, sub-letting without permission, misuse of premises, causing nuisance, structural damage, and bona fide personal need of the owner. Each ground requires specific proof before the Rent Controller." },
      { q: "Can a tenant refuse to vacate even after losing the RCOP case?", a: "Tenants have the right to appeal the Rent Controller's order before the Appellate Authority and then the Madras High Court. However, once all appeals are exhausted, the court can order forcible possession through execution proceedings." },
    ],
    stats: [{ num: "₹42L+", lbl: "Max MCOP Award" }, { num: "MACT", lbl: "Tribunal Practice" }, { num: "Fast Track", lbl: "Eviction Matters" }],
    relatedAreas: ["civil-litigation", "consumer-protection", "criminal-law", "arbitration-adr"],
  },
];

// ─── Area Icon Map ─────────────────────────────────────────────────────────────

const areaIconMap = {
  "criminal-law": Scale,
  "civil-litigation": BookOpen,
  "writs-constitutional": Shield,
  "consumer-protection": ShieldCheck,
  "property-real-estate": Home,
  "family-matrimonial": Heart,
  "arbitration-adr": Award,
  "corporate-advisory": Briefcase,
  "mcop-rent-control": Car,
};

const areaTitleMap = {
  "criminal-law": "Criminal Law",
  "civil-litigation": "Civil Litigation",
  "writs-constitutional": "Writs & Constitutional",
  "consumer-protection": "Consumer Protection",
  "property-real-estate": "Property & Real Estate",
  "family-matrimonial": "Family & Matrimonial",
  "arbitration-adr": "Arbitration & ADR",
  "corporate-advisory": "Corporate Advisory",
  "mcop-rent-control": "MCOP & Rent Control",
};

// ─── Shared Components ────────────────────────────────────────────────────────

function SiteHeader({ currentSlug }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#team", label: "Team" },
    { href: "/#blog", label: "Insights" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="header-inner">
            <a href="/" className="logo-mark">
              <AGDLogoImg size={72} />
              AGD Law Associates
            </a>
            <nav className="nav-links" aria-label="Main navigation">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/#contact" className="header-cta header-cta-desktop">
                Consultation <ArrowRight size={13} />
              </a>
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
                style={{ display: "none", width: "38px", height: "38px", border: "1px solid rgba(197,223,192,0.2)", borderRadius: "8px", background: "transparent", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "#c5dfc0" }}
                className="mob-menu-btn"
              >
                {menuOpen ? <X size={17} /> : <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect width="17" height="2" rx="1" fill="#c5dfc0" /><rect y="5" width="11" height="2" rx="1" fill="#c5dfc0" /><rect y="10" width="17" height="2" rx="1" fill="#c5dfc0" /></svg>}
              </button>
            </div>
          </div>
        </div>
      </header>
      <style>{`@media(max-width:1024px){.mob-menu-btn{display:inline-flex!important}}`}</style>
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, background: "#0b0b0b", display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
          <nav style={{ flex: 1 }}>
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0",marginTop: "80px", borderBottom: "1px solid rgba(197,223,192,0.1)", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: "rgba(255,255,255,0.8)", textDecoration: "none", animation: `fadeUp 0.4s ${0.05 + i * 0.06}s both` }}>
                {l.label}
                <span style={{ fontSize: "0.65rem", color: "rgba(197,223,192,0.4)", letterSpacing: "0.1em" }}>0{i + 1}</span>
              </a>
            ))}
            <a href="/#contact" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "28px", padding: "15px", borderRadius: "12px", background: "#c5dfc0", color: "#0b0b0b", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" }}>
              Book Consultation <ArrowRight size={14} />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand-mini">
            <AGDLogoImg size={30} />
            AGD Law Associates
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} AGD Law Associates. All rights reserved.</p>
          <div className="footer-links-mini">
            <a href="/" className="footer-link-mini">Home</a>
            <a href="/#services" className="footer-link-mini">Services</a>
            <a href="/#contact" className="footer-link-mini">Contact</a>
            <a href="tel:+918939688855" className="footer-link-mini">+91 89396 88855</a>
          </div>
        </div>
      </div>
    </footer>
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

function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "918939688855";

  const quickMessages = [
    "I need legal consultation.",
    "I have a criminal law matter.",
    "I need property dispute help.",
    "Schedule a consultation call.",
  ];

  const openWA = (msg) => {
    const m = (msg || message).trim();
    if (!m) return;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(m)}`, "_blank", "noopener,noreferrer");
    setMessage(""); setOpen(false);
  };

  return (
    <div className="wa-fab">
      {open && (
        <div className="wa-panel">
          <div className="wa-header">
            <div className="wa-info">
              <div className="wa-avatar"><MessageCircle size={14} /></div>
              <div>
                <div className="wa-name">AGD Legal Desk</div>
                <div className="wa-status">Replies during office hours</div>
              </div>
            </div>
            <button type="button" className="wa-close" onClick={() => setOpen(false)} aria-label="Close"><X size={12} /></button>
          </div>
          <div className="wa-body">
            <div className="wa-bubble">Hi! Select a message or type your query to continue on WhatsApp.</div>
            <div className="wa-quick">
              {quickMessages.map((m) => (
                <button key={m} type="button" className={`wa-qbtn${message === m ? " sel" : ""}`} onClick={() => setMessage(m)}>{m}</button>
              ))}
            </div>
            <div className="wa-row">
              <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); openWA(); } }} placeholder="Type here..." className="wa-ta" />
              <button type="button" className="wa-send" onClick={() => openWA()} aria-label="Send"><Send size={14} /></button>
            </div>
          </div>
        </div>
      )}
      {!open && <div className="wa-label">Chat with AGD</div>}
      <button type="button" className={`wa-toggle ${open ? "open-st" : "closed"}`} onClick={() => setOpen((v) => !v)} aria-label="WhatsApp chat">
        {open ? <X size={18} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}

// ─── Practice Area Page Component ─────────────────────────────────────────────

function PracticeAreaHero({ area }) {
  const Icon = area.icon;
  return (
    <section className="pa-hero">
      <img src={area.heroImg} alt="" aria-hidden="true" className="pa-hero-bg" loading="eager" />
      <div className="pa-hero-overlay" />
      <div className="pa-hero-content">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-sep">›</span>
            <a href="/#services">Services</a>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{area.title}</span>
          </nav>
          <div className="pa-hero-grid">
            <div>
              <div className="pa-hero-area-tag">
                <Icon size={12} />
                Practice Area
              </div>
              <h1 className="pa-hero-title fade-up">
                {area.title.replace(area.titleItalic, "")}<em>{area.titleItalic}</em>
              </h1>
              <p className="pa-hero-subtitle fade-up d1">{area.tagline}</p>
              <div className="pa-hero-actions fade-up d2">
                <a href="/#contact" className="btn-sage">
                  Free Consultation <ArrowRight size={14} />
                </a>
                <a href="tel:+918939688855" className="btn-outline-white">
                  <Phone size={14} /> Call Now
                </a>
              </div>
            </div>
            <div className="pa-hero-card fade-up d3">
              <div className="pa-hero-card-title">Quick Facts</div>
              {area.stats.map((s) => (
                <div className="pa-hero-stat" key={s.lbl}>
                  <div className="pa-hero-stat-num">{s.num}</div>
                  <div className="pa-hero-stat-lbl">{s.lbl}</div>
                </div>
              ))}
              <div className="pa-hero-divider" />
              <div className="pa-hero-contact">
                <Phone size={13} />
                <span>+91 89396 88855</span>
              </div>
              <div className="pa-hero-contact">
                <Mail size={13} />
                <span>agdlawassociatesoffice@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewSection({ area }) {
  const relatedTitles = area.relatedAreas.map((slug) => areaTitleMap[slug]).filter(Boolean);

  return (
    <section className="overview-section">
      <div className="container">
        <div className="overview-grid">
          <div className="overview-content">
            <span className="section-label">Overview</span>
            <h2 className="overview-title">
              About our <em>{area.title.toLowerCase()}</em> practice
            </h2>
            <p className="overview-lead">{area.leadQuote}</p>
            {area.overview.split("\n\n").map((para, i) => (
              <p className="overview-body" key={i}>{para.trim()}</p>
            ))}
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card-title">Ready to discuss your matter?</div>
            <div className="sidebar-card-body">
              Our team is available during office hours for consultations. Every matter is handled with full confidentiality.
            </div>
            <div className="sidebar-cta">
              <a href="/#contact" className="sidebar-btn primary">
                <Mail size={14} /> Schedule Consultation
              </a>
              <a href="tel:+918939688855" className="sidebar-btn secondary">
                <Phone size={14} /> +91 89396 88855
              </a>
              <a
                href={`https://wa.me/918939688855?text=${encodeURIComponent(`Hi, I need help with a ${area.title} matter.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-btn secondary"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
            </div>

            <div className="sidebar-hours">
              <div className="sidebar-hours-title">Office Hours</div>
              {[
                { day: "Mon – Fri", time: "10:00 AM – 6:30 PM" },
                { day: "Saturday", time: "11:00 AM – 5:00 PM" },
                { day: "2nd & Last Sat", time: "Closed" },
              ].map((h) => (
                <div className="sidebar-hour-row" key={h.day}>
                  <span className="sidebar-hour-day">{h.day}</span>
                  <span className="sidebar-hour-time">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="sidebar-related">
              <div className="sidebar-related-title">Related Practice Areas</div>
              {area.relatedAreas.map((slug) => (
                <a key={slug} href={`/services/${slug}`} className="sidebar-related-link">
                  <span>{areaTitleMap[slug]}</span>
                  <ArrowRight size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ area }) {
  return (
    <section className="services-section">
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span className="section-label">What We Handle</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: "1.1", color: "#fff" }}>
            Our {area.title.toLowerCase()} <em style={{ color: "#c5dfc0", fontStyle: "italic" }}>services</em>
          </h2>
        </div>
        <div className="services-grid">
          {area.services.map((s) => {
            const Icon = s.icon;
            return (
              <div className="service-item" key={s.title}>
                <div className="service-item-icon"><Icon size={18} /></div>
                <h3 className="service-item-title">{s.title}</h3>
                <p className="service-item-desc">{s.desc}</p>
                <div className="service-item-check">
                  <CheckCircle size={12} style={{ color: "#c5dfc0" }} />
                  {s.check}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ area }) {
  return (
    <section className="process-section">
      <div className="container">
        <h2 className="process-title">
          Our <em>process</em> — step by step
        </h2>
        <div className="process-steps">
          {area.process.map((step) => (
            <div className="process-step" key={step.num}>
              <div className="process-step-num">{step.num}</div>
              <div className="process-step-body">
                <div className="process-step-tag">{step.tag}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesSection({ area }) {
  return (
    <section className="cases-section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="section-label">Case Highlights</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: "1.1", color: "#fff" }}>
              Results that <em style={{ color: "#c5dfc0", fontStyle: "italic" }}>matter</em>
            </h2>
          </div>
        </div>
        <div className="cases-grid">
          {area.cases.map((c, i) => (
            <article className="case-card" key={i}>
              <div className="case-outcome-badge">
                <CheckCircle size={11} /> {c.outcome}
              </div>
              <h3 className="case-title">{c.title}</h3>
              <p className="case-desc">{c.desc}</p>
              <div className="case-meta">
                <span className="case-court">{c.court}</span>
                <span className="case-year">{c.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ area }) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-sidebar">
            <span className="section-label">FAQ</span>
            <h2 className="faq-sidebar-title">
              Common<br /><em>questions</em><br />answered
            </h2>
            <p style={{ fontSize: "0.88rem", lineHeight: "1.8", color: "rgba(255,255,255,0.5)" }}>
              Have more specific questions about your situation? Contact us for a confidential consultation.
            </p>
            <a href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#c5dfc0", color: "#0b0b0b", fontSize: "0.82rem", fontWeight: 600, padding: "12px 20px", borderRadius: "100px", width: "fit-content", transition: "background 0.2s" }}>
              Ask Us Directly <ArrowRight size={13} />
            </a>
          </div>
          <div className="faq-list">
            {area.faqs.map((faq, i) => {
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
    </section>
  );
}

function CTABanner({ area }) {
  return (
    <section className="cta-banner">
      <img
        src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=1600&h=600&fit=crop"
        alt=""
        aria-hidden="true"
        className="cta-banner-bg"
      />
      <div className="container">
        <div className="cta-banner-inner">
          <h2 className="cta-banner-title">
            Ready to move forward<br />on your <em>{area.title.toLowerCase()}</em> matter?
          </h2>
          <div className="cta-banner-actions">
            <a href="/#contact" className="btn-sage">
              Book a Consultation <ArrowRight size={14} />
            </a>
            <a href="tel:+918939688855" className="btn-outline-white">
              <Phone size={14} /> Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedAreas({ area }) {
  const related = area.relatedAreas
    .map((slug) => practiceAreas.find((a) => a.slug === slug))
    .filter(Boolean);

  return (
    <section className="related-section">
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span className="section-label">Explore Further</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 2.5vw, 2.6rem)", color: "#fff" }}>
            Related practice <em style={{ color: "#c5dfc0", fontStyle: "italic" }}>areas</em>
          </h2>
        </div>
        <div className="related-grid">
          {related.map((r) => {
            const Icon = r.icon;
            return (
              <a href={`/services/${r.slug}`} className="related-card" key={r.slug}>
                <div className="related-icon"><Icon size={20} /></div>
                <div className="related-title">{r.title}</div>
                <div className="related-desc">{r.tagline}</div>
                <div className="related-link">
                  Explore <ArrowRight size={12} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PracticeAreaPageContent({ area, slug }) {
  const resolvedArea = area || practiceAreas.find((item) => item.slug === slug);

  if (!resolvedArea) return null;

  return (
    <>
      <GlobalStyles />
      <FixedBackground />
      <div className="scroll-layer">
        <SiteHeader currentSlug={resolvedArea.slug} />
        <PracticeAreaHero area={resolvedArea} />
        <OverviewSection area={resolvedArea} />
        <ServicesSection area={resolvedArea} />
        <ProcessSection area={resolvedArea} />
        <CasesSection area={resolvedArea} />
        <FAQSection area={resolvedArea} />
        <CTABanner area={resolvedArea} />
        <RelatedAreas area={resolvedArea} />
        <SiteFooter />
        <WhatsAppChat />
      </div>
    </>
  );
}

// ─── All Areas Index Page ─────────────────────────────────────────────────────

function AllAreasIndex({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Hero */}
      <section style={{ background: "#0b0b0b", padding: "120px 0 72px", position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=1600&h=700&fit=crop" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.12, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <nav className="breadcrumb"><a href="/">Home</a><span className="breadcrumb-sep">›</span><span style={{ color: "rgba(255,255,255,0.7)" }}>Services</span></nav>
          <div style={{ maxWidth: "680px" }}>
            <span className="section-label" style={{ color: "#c5dfc0", background: "rgba(197,223,192,0.08)", borderColor: "rgba(197,223,192,0.2)", marginBottom: "24px", display: "inline-flex" }}>Practice Areas</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3rem, 5vw, 5.5rem)", color: "#fff", lineHeight: "1.0", letterSpacing: "-0.02em", marginBottom: "20px" }}>
              Areas of <em style={{ color: "#c5dfc0", fontStyle: "italic" }}>Expertise</em>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: "1.8", maxWidth: "560px" }}>
              AGD Law Associates handles 9 distinct practice areas across Tamil Nadu. Select an area below to learn about our services, process, and case highlights.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "clamp(4rem, 7vw, 8rem) 0", background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {practiceAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <a
                  key={area.slug}
                  href={`/services/${area.slug}`}
                  onClick={(e) => { if (onSelect) { e.preventDefault(); onSelect(area.slug); } }}
                  style={{
                    display: "flex", flexDirection: "column", gap: "16px",
                    border: "1px solid #e8f2e6", borderRadius: "24px",
                    padding: "28px 24px", textDecoration: "none", color: "inherit",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#c5dfc0";
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 20px 48px rgba(197,223,192,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8f2e6";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#f0f7ee", color: "#3a5c3d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} />
                    </div>
                    <span style={{ fontSize: "0.68rem", color: "#aaa", fontWeight: 600, letterSpacing: "0.1em" }}>
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", color: "#0b0b0b", marginBottom: "8px", lineHeight: "1.2" }}>
                      {area.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: "1.72" }}>{area.tagline}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "auto", fontSize: "0.78rem", fontWeight: 700, color: "#3a5c3d", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Learn More <ArrowRight size={13} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0b0b0b", padding: "clamp(3rem, 5vw, 5rem) 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#fff", marginBottom: "8px" }}>
              Not sure which area applies to your matter?
            </h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>
              Tell us about your situation and we'll point you in the right direction — free of charge.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flexShrink: 0 }}>
            <a href="/#contact" className="btn-sage">Book a Consultation <ArrowRight size={14} /></a>
            <a href="tel:+918939688855" className="btn-outline-white"><Phone size={14} /> Call Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Demo / Preview Shell ─────────────────────────────────────────────────────
// This shell lets you preview all pages without needing a router.
// In production, replace this with your Next.js routing (see comments below).

export default function PracticeAreaDemo() {
  const [activeSlug, setActiveSlug] = useState(null); // null = index page

  const area = activeSlug ? practiceAreas.find((a) => a.slug === activeSlug) : null;

  return (
    <>
      <GlobalStyles />

      {/* Demo Nav Bar */}
      <div style={{ position: "fixed", bottom: "0", left: "0", right: "0", zIndex: 9999, background: "rgba(11,11,11,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(197,223,192,0.15)", padding: "10px 16px", display: "flex", gap: "8px", overflowX: "auto", alignItems: "center" }}>
        <span style={{ fontSize: "0.6rem", color: "rgba(197,223,192,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", fontWeight: 700 }}>Preview:</span>
        <button
          type="button"
          onClick={() => setActiveSlug(null)}
          style={{ padding: "5px 12px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, border: "1px solid", whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0, background: !activeSlug ? "#c5dfc0" : "transparent", color: !activeSlug ? "#0b0b0b" : "rgba(255,255,255,0.5)", borderColor: !activeSlug ? "#c5dfc0" : "rgba(197,223,192,0.2)" }}
        >
          All Areas
        </button>
        {practiceAreas.map((a) => (
          <button
            key={a.slug}
            type="button"
            onClick={() => setActiveSlug(a.slug)}
            style={{ padding: "5px 12px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, border: "1px solid", whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0, background: activeSlug === a.slug ? "#c5dfc0" : "transparent", color: activeSlug === a.slug ? "#0b0b0b" : "rgba(255,255,255,0.5)", borderColor: activeSlug === a.slug ? "#c5dfc0" : "rgba(197,223,192,0.2)" }}
          >
            {areaTitleMap[a.slug]}
          </button>
        ))}
      </div>

      <div style={{ paddingBottom: "52px" }}>
        {area ? (
          <PracticeAreaPageContent area={area} />
        ) : (
          <>
            <SiteHeader />
            <AllAreasIndex onSelect={setActiveSlug} />
            <SiteFooter />
            <WhatsAppChat />
          </>
        )}
      </div>
    </>
  );
}

/**
 * ─── NEXT.JS INTEGRATION GUIDE ────────────────────────────────────────────────
 *
 * For Next.js App Router, create: app/services/[slug]/page.jsx
 *
 * import { practiceAreas } from "@/components/practice-areas";
 * import { PracticeAreaPageContent } from "@/components/practice-areas";
 *
 * export async function generateStaticParams() {
 *   return practiceAreas.map((a) => ({ slug: a.slug }));
 * }
 *
 * export default function Page({ params }) {
 *   const area = practiceAreas.find((a) => a.slug === params.slug);
 *   if (!area) notFound();
 *   return <PracticeAreaPageContent area={area} />;
 * }
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */
