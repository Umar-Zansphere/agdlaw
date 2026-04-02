"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin, PhoneCall, Send, X, MessageCircle, ChevronRight, Scale, Gavel, FileText, BookOpen, Stamp } from "lucide-react";

// ─── Global Styles ─────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --void:     #0a0906;
    --chamber:  #121009;
    --bench:    #1a1610;
    --mahogany: #1f1a13;
    --parch:    #c8b89a;
    --parch2:   #b8a585;
    --vellum:   #e8dcc8;
    --ivory:    #f2ead8;
    --ink:      #f2ead8;
    --ink-dim:  #9a8e78;
    --ink-fade: #6a5e4a;
    --crimson:  #8b1a1a;
    --crimson2: #b82222;
    --gold:     #c49a3c;
    --gold-lt:  #e8c86a;
    --gold-dim: #6a5020;
    --sage:     #4a6855;
    --rule:     rgba(196,154,60,0.15);
    --rule-med: rgba(196,154,60,0.25);
    --rule-str: rgba(196,154,60,0.4);
    --stamp-r:  rgba(139,26,26,0.85);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    background: var(--void);
    color: var(--ink);
    font-family: 'DM Mono', 'Courier New', monospace;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--chamber); }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 0; }

  h1, h2, h3, h4 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: -0.015em;
  }

  .mono {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .case-ref {
    font-family: 'DM Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    color: var(--ink-dim);
    text-transform: uppercase;
  }

  .rule-h { width: 100%; height: 0.5px; background: var(--rule-med); }
  .rule-h-gold { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0.4; }
  .rule-v { width: 0.5px; background: var(--rule-med); }

  /* Stamped SEAL effect */
  .stamp {
    display: inline-block;
    border: 2px solid var(--crimson);
    color: var(--crimson2);
    font-family: 'DM Mono', monospace;
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 4px 10px;
    transform: rotate(-2deg);
    opacity: 0.88;
    position: relative;
  }
  .stamp::before {
    content: '';
    position: absolute; inset: 2px;
    border: 0.5px solid var(--crimson);
    opacity: 0.4;
  }

  .stamp-green {
    border-color: var(--sage);
    color: #6a9978;
  }
  .stamp-green::before { border-color: var(--sage); }

  /* Fade-in animation */
  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .fade-up.delay-1 { transition-delay: 100ms; }
  .fade-up.delay-2 { transition-delay: 200ms; }
  .fade-up.delay-3 { transition-delay: 320ms; }
  .fade-up.delay-4 { transition-delay: 440ms; }

  /* Paper texture overlay on sections */
  .paper-bg {
    position: relative;
    background: var(--chamber);
  }
  .paper-bg::before {
    content: '';
    position: absolute; inset: 0;
    background-image: 
      repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(196,154,60,0.03) 27px, rgba(196,154,60,0.03) 28px);
    pointer-events: none; z-index: 0;
  }

  /* Red margin line */
  .margin-line {
    position: absolute; top: 0; left: 72px; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--crimson) 0%, rgba(139,26,26,0.2) 100%);
    opacity: 0.3;
    pointer-events: none;
  }

  /* ── HEADER ── */
  .hdr {
    position: fixed; top: 0; left: 0; right: 0; z-index: 900;
    background: var(--void);
    border-bottom: 0.5px solid var(--rule-med);
    transition: box-shadow 0.3s;
  }
  .hdr.shadow { box-shadow: 0 2px 40px rgba(0,0,0,0.6); }
  .hdr-inner {
    max-width: 1440px; margin: 0 auto;
    padding: 0 48px;
    height: 60px;
    display: flex; align-items: center; justify-content: space-between; gap: 40px;
  }
  .hdr-left {
    display: flex; align-items: center; gap: 24px;
  }
  .hdr-emblem {
    width: 32px; height: 32px;
    border: 1px solid var(--rule-str);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold);
  }
  .logo-wordmark {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem; font-weight: 600;
    color: var(--ivory);
    text-decoration: none; flex-shrink: 0;
    letter-spacing: 0.02em;
  }
  .logo-sub {
    font-family: 'DM Mono', monospace;
    font-size: 0.48rem; font-weight: 400;
    letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold-dim); margin-top: 2px;
  }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-a {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem; font-weight: 400; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--ink-dim);
    text-decoration: none; transition: color 0.2s;
    position: relative; padding-bottom: 2px;
  }
  .nav-a::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 0.5px; background: var(--gold);
    transition: width 0.3s ease;
  }
  .nav-a:hover { color: var(--ivory); }
  .nav-a:hover::after { width: 100%; }
  .nav-cta {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem; font-weight: 500; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--void);
    background: var(--gold); padding: 9px 20px;
    text-decoration: none;
    transition: background 0.25s, color 0.25s;
    border: 1px solid var(--gold);
  }
  .nav-cta:hover { background: transparent; color: var(--gold); }

  /* ─── LEGAL NOTICE STRIP ─── */
  .notice-strip {
    overflow: hidden;
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--crimson);
    padding: 10px 0;
    position: relative;
  }
  .notice-strip::before {
    content: 'LEGAL NOTICE';
    position: absolute; left: 0; top: 0; bottom: 0;
    background: var(--void);
    color: var(--gold);
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem; font-weight: 500; letter-spacing: 0.3em;
    display: flex; align-items: center; padding: 0 20px;
    z-index: 2; border-right: 1px solid var(--crimson);
    white-space: nowrap;
  }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .notice-track {
    display: flex; white-space: nowrap; width: max-content;
    animation: marquee 35s linear infinite;
    padding-left: 200px;
  }
  .notice-item {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(242,234,216,0.9); padding: 0 40px;
    display: inline-flex; align-items: center; gap: 40px;
  }
  .notice-sep {
    width: 4px; height: 4px;
    background: rgba(242,234,216,0.4);
    display: inline-block; transform: rotate(45deg);
  }

  /* ── HERO / OPENING STATEMENT ── */
  .hero-wrap {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    border-bottom: 0.5px solid var(--rule-med);
    padding-top: 60px;
    position: relative;
    background: var(--void);
  }

  /* Decorative large case number watermark */
  .hero-watermark {
    position: absolute;
    bottom: -60px; right: -40px;
    font-family: 'Playfair Display', serif;
    font-size: clamp(14rem, 26vw, 24rem);
    font-weight: 700; line-height: 1;
    color: transparent;
    -webkit-text-stroke: 0.5px rgba(196,154,60,0.07);
    user-select: none; pointer-events: none;
    white-space: nowrap; letter-spacing: -0.05em;
  }

  .hero-left {
    border-right: 0.5px solid var(--rule-med);
    display: flex; flex-direction: column;
    padding: 72px 44px 60px;
    justify-content: space-between;
    background: var(--chamber);
    position: relative;
    overflow: hidden;
  }

  /* Case file tab at top of left panel */
  .case-file-tab {
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--crimson), var(--gold), var(--crimson));
    opacity: 0.8;
  }

  .hero-right {
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 72px 80px 60px;
    position: relative; overflow: hidden;
  }

  /* Horizontal ruling lines on hero right */
  .hero-right::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 35px,
      rgba(196,154,60,0.04) 35px, rgba(196,154,60,0.04) 36px
    );
    pointer-events: none;
  }

  /* Red margin line */
  .hero-right-margin {
    position: absolute; left: 44px; top: 60px; bottom: 60px;
    width: 1px; background: var(--crimson); opacity: 0.2;
  }

  .hero-h1 {
    font-size: clamp(3.4rem, 6.5vw, 6.5rem);
    line-height: 1.0; color: var(--ivory);
    margin-bottom: 32px;
    font-family: 'Playfair Display', serif;
  }
  .hero-h1 em {
    font-style: italic; color: var(--gold);
  }
  .hero-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 300; line-height: 1.8;
    color: var(--parch); max-width: 520px;
    font-style: italic;
  }

  /* Animated case-file opening effect */
  @keyframes fileUnfold {
    0% { clip-path: inset(0 0 100% 0); opacity: 0; }
    100% { clip-path: inset(0 0 0% 0); opacity: 1; }
  }
  .case-file-reveal {
    animation: fileUnfold 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both;
  }

  /* ── DOSSIER / ABOUT ── */
  .dossier-section {
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--chamber);
    position: relative;
  }

  .dossier-tabs {
    display: flex; border-bottom: 0.5px solid var(--rule-med);
    overflow: hidden;
  }
  .dossier-tab {
    flex: 1; padding: 20px 32px;
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem; font-weight: 400; letter-spacing: 0.2em;
    text-transform: uppercase; background: none; border: none;
    border-right: 0.5px solid var(--rule-med);
    color: var(--ink-dim); cursor: pointer;
    transition: all 0.3s; position: relative;
    text-align: left;
  }
  .dossier-tab:last-child { border-right: none; }
  .dossier-tab::after {
    content: '';
    position: absolute; bottom: -0.5px; left: 0; right: 0;
    height: 2px; background: var(--gold);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .dossier-tab.active { color: var(--ivory); background: var(--bench); }
  .dossier-tab.active::after { transform: scaleX(1); }

  .tab-num {
    display: block;
    font-size: 0.45rem; letter-spacing: 0.3em;
    color: var(--gold-dim); margin-bottom: 4px;
  }

  .dossier-body {
    display: grid; grid-template-columns: 240px 1fr 1fr;
    min-height: 70vh;
  }
  .dossier-index {
    border-right: 0.5px solid var(--rule-med);
    padding: 60px 32px;
    background: var(--bench);
    display: flex; flex-direction: column; gap: 32px;
    position: relative; overflow: hidden;
  }
  .dossier-index::before {
    content: attr(data-label);
    position: absolute; bottom: 40px; right: -20px;
    font-family: 'Playfair Display', serif;
    font-size: 7rem; font-weight: 700;
    color: rgba(196,154,60,0.05);
    transform: rotate(90deg); transform-origin: bottom right;
    white-space: nowrap; pointer-events: none;
  }

  .dossier-col {
    padding: 60px 52px;
    border-right: 0.5px solid var(--rule-med);
    display: flex; flex-direction: column;
    position: relative;
  }
  .dossier-col-last { border-right: none; }

  .portrait-frame {
    width: 100%; aspect-ratio: 3/4; overflow: hidden;
    position: relative;
    border: 1px solid var(--rule-med);
    background: var(--bench);
  }
  .portrait-frame img {
    width: 100%; height: 100%; object-fit: cover;
    filter: sepia(40%) contrast(1.1) brightness(0.85) saturate(0.8);
    transition: transform 0.7s ease;
    mix-blend-mode: luminosity;
  }
  .portrait-frame:hover img { transform: scale(1.03); }
  .portrait-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 24px 20px;
    background: linear-gradient(transparent, rgba(0,0,0,0.85));
    border-top: 1px solid var(--rule-med);
  }

  /* ── STATS BAND ── */
  .stats-band {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--bench);
  }
  .stat-cell {
    padding: 48px 40px;
    border-right: 0.5px solid var(--rule-med);
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .stat-cell:last-child { border-right: none; }
  .stat-cell:hover { background: var(--mahogany); }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 5vw, 4.2rem);
    font-weight: 400; line-height: 1; color: var(--gold);
    letter-spacing: -0.03em;
  }
  .stat-num sup {
    font-size: 0.38em; vertical-align: super;
    color: var(--gold-dim);
  }
  .stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem; font-weight: 400; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ink-dim); margin-top: 10px;
  }
  .stat-line {
    position: absolute; bottom: 0; left: 0;
    height: 1px; background: var(--gold); width: 0;
    transition: width 0.6s ease;
  }
  .stat-cell:hover .stat-line { width: 100%; }

  /* ── TRIAL TIMELINE / PROCESS ── */
  .timeline-section {
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--void);
  }
  .timeline-header {
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 0.5px solid var(--rule-med);
  }
  .timeline-header-left {
    padding: 60px 72px;
    border-right: 0.5px solid var(--rule-med);
    background: var(--chamber);
  }
  .timeline-header-right { padding: 60px 72px; }

  /* Scrubber */
  .timeline-scrubber {
    display: flex; align-items: center; gap: 0;
    border-bottom: 0.5px solid var(--rule-med);
    overflow-x: auto;
    background: var(--bench);
  }
  .timeline-scrubber::-webkit-scrollbar { display: none; }
  .scrubber-step {
    flex: 1; min-width: 180px; padding: 20px 28px;
    border-right: 0.5px solid var(--rule-med);
    cursor: pointer; transition: all 0.3s;
    position: relative;
  }
  .scrubber-step:last-child { border-right: none; }
  .scrubber-step.active { background: var(--mahogany); }
  .scrubber-step::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--gold);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s;
  }
  .scrubber-step.active::after { transform: scaleX(1); }
  .scrubber-num {
    font-family: 'DM Mono', monospace; font-size: 0.5rem;
    letter-spacing: 0.25em; color: var(--gold-dim);
    text-transform: uppercase; margin-bottom: 6px;
  }
  .scrubber-label {
    font-family: 'DM Mono', monospace; font-size: 0.65rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink-dim); transition: color 0.3s;
  }
  .scrubber-step.active .scrubber-label { color: var(--ivory); }

  .timeline-panel {
    min-height: 360px;
    display: flex;
  }
  .timeline-panel-num {
    width: 120px; flex-shrink: 0;
    border-right: 0.5px solid var(--rule-med);
    display: flex; align-items: flex-start; justify-content: center;
    padding-top: 60px; background: var(--bench);
  }
  .timeline-big-num {
    font-family: 'Playfair Display', serif;
    font-size: 8rem; font-weight: 700; line-height: 1;
    color: rgba(196,154,60,0.12); letter-spacing: -0.05em;
    writing-mode: vertical-rl; transform: rotate(180deg);
  }
  .timeline-content {
    flex: 1; padding: 64px 72px;
    animation: fadeSlide 0.5s cubic-bezier(0.16,1,0.3,1);
    position: relative;
  }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .timeline-notes-bar {
    width: 280px; flex-shrink: 0;
    border-left: 0.5px solid var(--rule-med);
    padding: 40px 32px;
    background: var(--chamber);
  }

  /* ── PRACTICE AREAS REGISTER ── */
  .register-section {
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--void);
  }
  .register-header {
    padding: 64px 72px 52px;
    border-bottom: 0.5px solid var(--rule-med);
    display: flex; align-items: flex-end; justify-content: space-between; gap: 40px;
    background: var(--chamber);
    position: relative;
  }
  /* Ledger lines in register header */
  .register-header::after {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 31px,
      rgba(196,154,60,0.03) 31px, rgba(196,154,60,0.03) 32px
    );
    pointer-events: none;
  }

  .register-ledger {
    display: grid;
    grid-template-columns: 64px 1fr 1fr 1fr;
  }
  .register-ledger-head {
    display: contents;
  }
  .register-col-head {
    font-family: 'DM Mono', monospace;
    font-size: 0.52rem; font-weight: 500; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--gold-dim);
    padding: 16px 28px;
    border-right: 0.5px solid var(--rule-med);
    border-bottom: 0.5px solid var(--rule-str);
    background: var(--bench);
  }
  .register-col-head:last-child { border-right: none; }
  .register-col-head:first-child { padding-left: 20px; text-align: center; }

  .register-row {
    display: contents;
  }
  .register-cell {
    padding: 28px 28px;
    border-right: 0.5px solid var(--rule-med);
    border-bottom: 0.5px solid var(--rule-med);
    transition: background 0.2s;
    position: relative; overflow: hidden;
  }
  .register-cell:last-child { border-right: none; }
  .register-row-num {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem; color: var(--gold-dim);
    text-align: center; letter-spacing: 0.1em;
  }

  /* Ink underline hover effect */
  .register-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; color: var(--ivory); margin-bottom: 8px;
    position: relative; display: inline-block;
  }
  .register-title::after {
    content: '';
    position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: var(--gold);
    transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .register-cell:hover .register-title::after { width: 100%; }
  .register-cell:hover { background: var(--bench); }

  /* Urgent matters highlight */
  .register-urgent {
    background: rgba(139,26,26,0.12) !important;
    border-left: 2px solid var(--crimson) !important;
  }
  .register-urgent:hover { background: rgba(139,26,26,0.2) !important; }

  /* ── JUDGMENT ARCHIVE / RESULTS ── */
  .archive-section {
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--chamber);
  }
  .archive-grid {
    display: grid; grid-template-columns: 300px 1fr;
  }
  .archive-sidebar {
    border-right: 0.5px solid var(--rule-med);
    padding: 72px 44px;
    background: var(--bench);
    display: flex; flex-direction: column;
    position: sticky; top: 60px; align-self: start;
  }
  .archive-filter-head {
    font-family: 'DM Mono', monospace;
    font-size: 0.54rem; font-weight: 500; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--gold-dim);
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 0.5px solid var(--rule-med);
  }
  .archive-filter-btn {
    display: block; width: 100%;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ink-dim);
    background: none; border: none; cursor: pointer;
    text-align: left; padding: 10px 0;
    border-bottom: 0.5px solid rgba(196,154,60,0.08);
    transition: color 0.2s;
  }
  .archive-filter-btn:hover, .archive-filter-btn.active { color: var(--gold); }
  .archive-filter-btn.active { padding-left: 12px; border-left: 1px solid var(--gold); }

  .archive-list { flex: 1; }
  .archive-row {
    border-bottom: 0.5px solid var(--rule-med);
    padding: 36px 52px;
    display: grid; grid-template-columns: 1fr auto;
    gap: 24px; align-items: start;
    transition: background 0.25s; cursor: pointer;
    position: relative;
  }
  .archive-row::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 2px; background: var(--gold);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .archive-row:hover { background: var(--bench); }
  .archive-row:hover::before { transform: scaleY(1); }

  /* Simulated PDF scan effect on hover */
  .archive-preview {
    display: none; position: absolute;
    right: 100px; top: 50%; transform: translateY(-50%);
    width: 120px; height: 160px;
    background: var(--chamber);
    border: 1px solid var(--rule-str);
    z-index: 10; pointer-events: none;
    overflow: hidden;
  }
  .archive-row:hover .archive-preview { display: block; }
  .archive-preview-inner {
    padding: 10px 8px;
    height: 100%;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 11px,
      rgba(196,154,60,0.06) 11px, rgba(196,154,60,0.06) 12px
    );
  }
  .archive-preview-line {
    height: 5px; margin-bottom: 7px;
    background: rgba(196,154,60,0.15); border-radius: 1px;
  }
  .archive-preview-line:first-child { width: 80%; background: rgba(196,154,60,0.3); }
  .archive-preview-line:nth-child(2) { width: 60%; }
  .archive-preview-line:nth-child(3) { width: 90%; }
  .archive-preview-line:nth-child(4) { width: 70%; }
  .archive-preview-line:nth-child(5) { width: 85%; }
  .archive-preview-line:nth-child(6) { width: 55%; }

  .archive-cat {
    font-family: 'DM Mono', monospace;
    font-size: 0.54rem; font-weight: 400; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold-dim); margin-bottom: 8px;
  }
  .archive-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem; color: var(--ivory); margin-bottom: 8px; line-height: 1.25;
  }
  .archive-court {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem; color: var(--ink-dim); font-weight: 300;
    letter-spacing: 0.08em;
  }
  .archive-badge {
    background: rgba(74,104,85,0.2); color: #6a9978;
    font-family: 'DM Mono', monospace;
    font-size: 0.56rem; font-weight: 400; letter-spacing: 0.14em;
    text-transform: uppercase; padding: 7px 14px;
    white-space: nowrap;
    border: 0.5px solid rgba(74,104,85,0.3);
  }

  /* ── FAQ ── */
  .faq-section {
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--void);
  }
  .faq-grid { display: grid; grid-template-columns: 1fr 1.4fr; min-height: 60vh; }
  .faq-left {
    border-right: 0.5px solid var(--rule-med);
    padding: 80px 72px;
    background: var(--chamber);
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .faq-right { padding: 0; background: var(--bench); }
  .faq-item { border-bottom: 0.5px solid var(--rule-med); }
  .faq-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    gap: 32px; padding: 28px 48px;
    background: none; border: none; cursor: pointer; text-align: left;
    transition: background 0.2s;
  }
  .faq-trigger:hover { background: var(--mahogany); }
  .faq-q {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-weight: 400; color: var(--ivory); line-height: 1.35;
    font-style: italic;
  }
  .faq-icon {
    width: 28px; height: 28px; flex-shrink: 0;
    border: 0.5px solid var(--rule-str); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); transition: transform 0.35s, border-color 0.25s;
  }
  .faq-icon.open { transform: rotate(45deg); border-color: var(--gold); }
  .faq-body {
    padding: 0 48px 28px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem; line-height: 1.85; color: var(--parch);
    font-weight: 300; max-height: 0; overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), padding 0.3s;
  }
  .faq-body.open { max-height: 400px; }

  /* ── CONTACT / PETITION FILING ── */
  .contact-section {
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--void);
  }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .contact-left {
    border-right: 0.5px solid var(--rule-med);
    padding: 80px 72px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: var(--chamber); color: var(--ivory);
    position: relative; overflow: hidden;
  }
  .contact-left::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 31px,
      rgba(196,154,60,0.04) 31px, rgba(196,154,60,0.04) 32px
    );
    pointer-events: none;
  }
  .contact-right { padding: 80px 72px; background: var(--bench); }
  .contact-info-row {
    padding: 20px 0; border-bottom: 0.5px solid var(--rule-med);
    display: flex; gap: 20px; align-items: flex-start;
    text-decoration: none; color: inherit;
    transition: opacity 0.2s; position: relative;
  }
  .contact-info-row:hover { opacity: 0.75; }
  .contact-info-icon {
    width: 30px; height: 30px; flex-shrink: 0;
    border: 0.5px solid var(--rule-str); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; color: var(--gold);
  }
  .field-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.52rem; font-weight: 500; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--gold-dim); margin-bottom: 8px; display: block;
  }
  .field-input {
    width: 100%; background: transparent;
    border: none; border-bottom: 0.5px solid var(--rule-str);
    padding: 10px 0; font-size: 0.92rem;
    font-family: 'Cormorant Garamond', sans-serif; color: var(--ivory);
    outline: none; transition: border-color 0.2s;
  }
  .field-input:focus { border-color: var(--gold); }
  .field-input::placeholder { color: var(--ink-fade); }
  .field-textarea {
    width: 100%; background: transparent;
    border: none; border-bottom: 0.5px solid var(--rule-str);
    padding: 10px 0; font-size: 0.92rem; resize: none;
    font-family: 'Cormorant Garamond', sans-serif; color: var(--ivory);
    outline: none; transition: border-color 0.2s;
  }
  .field-textarea:focus { border-color: var(--gold); }
  .field-textarea::placeholder { color: var(--ink-fade); }
  .submit-btn {
    display: inline-flex; align-items: center; gap: 12px;
    background: var(--gold); color: var(--void);
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 14px 28px;
    border: 1px solid var(--gold); cursor: pointer; transition: all 0.25s;
  }
  .submit-btn:hover { background: transparent; color: var(--gold); }

  /* ── FOOTER ── */
  .footer {
    padding: 64px 0 0;
    background: var(--bench);
    border-top: 0.5px solid var(--rule-med);
  }
  .footer-main {
    display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr;
    padding: 0 72px 64px;
    gap: 64px;
    border-bottom: 0.5px solid var(--rule-med);
  }
  .footer-nav-head {
    font-family: 'DM Mono', monospace;
    font-size: 0.52rem; font-weight: 500; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--gold-dim); margin-bottom: 20px;
  }
  .footer-nav-a {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem; color: var(--ink-dim);
    text-decoration: none; padding: 7px 0;
    letter-spacing: 0.06em;
    transition: color 0.2s;
  }
  .footer-nav-a:hover { color: var(--gold); }
  .footer-base {
    padding: 22px 72px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
  }

  /* ── WHATSAPP ── */
  .wa-bubble {
    position: fixed; bottom: 28px; right: 28px; z-index: 980;
    display: flex; flex-direction: column; align-items: flex-end;
  }
  .wa-panel {
    margin-bottom: 12px; width: min(92vw, 340px);
    background: var(--bench); border: 0.5px solid var(--rule-str);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    transition: opacity 0.3s, transform 0.3s; transform-origin: bottom right;
  }
  .wa-panel.closed { opacity: 0; transform: scale(0.92); pointer-events: none; }
  .wa-panel.open   { opacity: 1; transform: scale(1); }
  .wa-header {
    padding: 14px 18px; background: var(--mahogany);
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 0.5px solid var(--rule-str);
  }
  .wa-btn {
    width: 48px; height: 48px; border-radius: 0;
    background: var(--gold); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    transition: background 0.25s, transform 0.2s;
    color: var(--void);
  }
  .wa-btn:hover { background: var(--crimson); color: var(--ivory); transform: scale(1.05); }

  /* ── MOBILE ── */
  @media (max-width: 1100px) {
    .hero-wrap { grid-template-columns: 1fr; }
    .hero-left { border-right: none; border-bottom: 0.5px solid var(--rule-med); min-height: unset; padding: 60px 32px 40px; }
    .hero-right { padding: 48px 32px 60px; }
    .hero-watermark { display: none; }
    .dossier-body { grid-template-columns: 1fr; }
    .dossier-index { display: none; }
    .dossier-col { padding: 48px 32px; border-right: none; border-bottom: 0.5px solid var(--rule-med); }
    .stats-band { grid-template-columns: repeat(2, 1fr); }
    .stat-cell { border-bottom: 0.5px solid var(--rule-med); }
    .timeline-header { grid-template-columns: 1fr; }
    .timeline-header-left { border-right: none; border-bottom: 0.5px solid var(--rule-med); padding: 48px 32px; }
    .timeline-header-right { padding: 40px 32px; }
    .timeline-content { padding: 40px 32px; }
    .timeline-notes-bar { display: none; }
    .register-ledger { grid-template-columns: 32px 1fr; }
    .register-cell:nth-child(4n), .register-cell:nth-child(4n-1) { display: none; }
    .register-col-head:nth-child(3), .register-col-head:nth-child(4) { display: none; }
    .archive-grid { grid-template-columns: 1fr; }
    .archive-sidebar { position: static; border-right: none; border-bottom: 0.5px solid var(--rule-med); }
    .archive-row { padding: 28px 28px; }
    .archive-preview { display: none !important; }
    .faq-grid { grid-template-columns: 1fr; }
    .faq-left { border-right: none; border-bottom: 0.5px solid var(--rule-med); padding: 48px 32px; }
    .faq-trigger { padding: 24px 28px; }
    .faq-body { padding: 0 28px 24px; }
    .contact-grid { grid-template-columns: 1fr; }
    .contact-left { border-right: none; border-bottom: 0.5px solid var(--rule-med); padding: 60px 32px; }
    .contact-right { padding: 60px 32px; }
    .footer-main { grid-template-columns: 1fr 1fr; padding: 0 32px 48px; gap: 40px; }
    .footer-base { padding: 24px 32px; }
    .nav-links { display: none; }
    .hdr-inner { padding: 0 24px; }
    .register-header { padding: 48px 32px; flex-direction: column; align-items: flex-start; }
    .dossier-tabs { overflow-x: auto; }
  }

  @media (max-width: 640px) {
    .stats-band { grid-template-columns: 1fr 1fr; }
    .footer-main { grid-template-columns: 1fr; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: "§", num: "001", title: "Criminal Law", desc: "Bail, FIR quashing, white-collar crime defense, cybercrime & financial fraud litigation before High Court and Sessions Courts.", urgent: false },
  { icon: "⚖", num: "002", title: "Civil Litigation", desc: "Property disputes, injunction suits, partition matters, contractual recovery & civil appeals.", urgent: false },
  { icon: "📜", num: "003", title: "Writs & Constitutional", desc: "PIL matters, writ petitions, and challenges to governmental or statutory actions before constitutional courts.", urgent: true },
  { icon: "🏠", num: "004", title: "Property & Real Estate", desc: "Title verification, due diligence, sale drafting & real estate dispute resolution.", urgent: false },
  { icon: "⚖", num: "005", title: "Family & Matrimonial", desc: "Divorce, child custody, guardianship, maintenance & domestic violence proceedings.", urgent: false },
  { icon: "§", num: "006", title: "Arbitration & ADR", desc: "Arbitration, mediation, commercial settlement & enforcement of arbitral awards.", urgent: false },
  { icon: "🏛", num: "007", title: "Corporate Advisory", desc: "Contract drafting, compliance advisory, shareholder agreements & legal due diligence.", urgent: false },
  { icon: "⚖", num: "008", title: "Consumer Protection", desc: "Consumer complaints, deficiency claims, product liability disputes and compensation recovery.", urgent: false },
  { icon: "§", num: "009", title: "MCOP & Rent Control", desc: "Motor accident compensation claims, insurance disputes, eviction & fair rent proceedings.", urgent: false },
];

const RESULTS = [
  { cat: "Criminal Law", title: "Anticipatory Bail Granted in 72 Hours", court: "Madras High Court", year: "2024", outcome: "Bail Granted", type: "Criminal" },
  { cat: "Property Dispute", title: "Multi-Acre Title Dispute — Clear Decree", court: "District Court, Coimbatore", year: "2023", outcome: "Decree in Favour", type: "Civil" },
  { cat: "Consumer Protection", title: "₹18 Lakh Builder Compensation", court: "State Consumer Commission", year: "2024", outcome: "₹18L Awarded", type: "Consumer" },
  { cat: "Family Law", title: "Full Child Custody Secured", court: "Family Court, Chennai", year: "2023", outcome: "Custody Secured", type: "Family" },
  { cat: "Writ Petition", title: "Reinstatement of Wrongfully Terminated Employee", court: "Madras High Court", year: "2024", outcome: "Reinstatement", type: "Writ" },
  { cat: "MCOP", title: "₹42 Lakh Motor Accident Compensation", court: "Motor Accidents Tribunal", year: "2023", outcome: "₹42L Awarded", type: "MCOP" },
];

const PROCESS_STEPS = [
  { num: "01", stage: "Filing", title: "Case Filing & Initial Intake", body: "Every matter begins with an undivided consultation. We map the full legal landscape, document the facts, and establish the grounds before forming any position — no assumptions, no templates." },
  { num: "02", stage: "Review", title: "Legal Opinion & Case Review", body: "A clear written legal opinion. Every option laid out with its risks, timeline, and cost. Documentary review, precedent analysis, and strategic assessment. You decide — fully informed." },
  { num: "03", stage: "Argument", title: "Drafting & Court Preparation", body: "Precision drafting of every petition, brief and supporting document. Structured for the forum, argued from day one. Every argument considered, every contingency prepared." },
  { num: "04", stage: "Judgment", title: "Advocacy & Oral Arguments", body: "Focused courtroom advocacy before the bench. Cross-examination, witness handling, and oral argument — your case receives our full and undivided attention through every hearing." },
  { num: "05", stage: "Execution", title: "Resolution & Execution", body: "Timely, decisive outcomes. Whether a verdict, settlement or injunction — we close every matter clearly, execute decrees where required, and keep you informed to the last step." },
];

const FAQS = [
  { q: "What forums do you appear before?", a: "We regularly appear before the Madras High Court, District Courts, Metropolitan Courts, Tribunals, and Consumer Disputes Redressal Commissions across Tamil Nadu." },
  { q: "Why choose AGD Law Associates?", a: "We are a boutique firm — which means personalized attention, direct access to counsel, and no file being handed to a junior without your knowledge. Ethical, transparent, and efficient." },
  { q: "What is your approach to a new matter?", a: "Every matter begins with a detailed consultation. We provide a written legal opinion, a proposed timeline, and an honest assessment of outcomes before filing anything." },
  { q: "What are your office hours?", a: "Monday to Friday: 10:00 AM – 6:30 PM. Saturday: 11:00 AM – 5:00 PM. Second and last Saturdays are holidays." },
  { q: "Where do you have active presence?", a: "Chennai, Tambaram, Avadi, Coimbatore, Tiruppur, Bangalore, and districts including Chengalpattu, Tiruvallur, Kancheepuram, and Dindigul." },
];

const NOTICE_ITEMS = [
  "Recent Judgment — Anticipatory Bail Granted · Madras HC · Jan 2024",
  "Filing Deadline — Consumer Commission · 30 Apr 2024",
  "Court Update — Madras High Court resumes vacation bench · May 2024",
  "Recent Judgment — Decree in Title Dispute · Coimbatore District Court",
  "Filing Deadline — Writ Petition Window Open · HC Registry",
  "Court Update — E-filing mandatory for High Court matters from June 2024",
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────

function useFade(threshold = 0.08) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Fade({ children, className = "", delay = 0, style = {} }) {
  const [ref, vis] = useFade(0.06);
  return (
    <div ref={ref} className={`fade-up${vis ? " visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobOpen]);

  const links = [
    { href: "#about", label: "Counsel Profile" },
    { href: "#process", label: "Trial Timeline" },
    { href: "#practice", label: "Practice Register" },
    { href: "#results", label: "Judgment Archive" },
    { href: "#contact", label: "File a Petition" },
  ];

  return (
    <>
      <header className={`hdr${scrolled ? " shadow" : ""}`}>
        <div className="hdr-inner">
          <div className="hdr-left">
            <div className="hdr-emblem">
              <Scale size={14} />
            </div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div className="logo-wordmark">
                AGD Law Associates
                <div className="logo-sub">Advocates & Legal Consultants · Est. 2012</div>
              </div>
            </Link>
          </div>
          <nav className="nav-links">
            {links.map(l => <a key={l.href} href={l.href} className="nav-a">{l.label}</a>)}
            <a href="tel:+919994388855" className="nav-cta">+91 99943 88855</a>
          </nav>
          <button onClick={() => setMobOpen(v => !v)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6 }}
            className="mob-hdr-btn">
            <style>{`.mob-hdr-btn { display: flex !important; flex-direction: column; gap: 5px; } @media(min-width:1100px){.mob-hdr-btn{display:none !important;}}`}</style>
            {mobOpen ? <X size={20} color="var(--gold)" /> : <>
              <span style={{ width: 22, height: 1, background: "var(--gold)", display: "block" }} />
              <span style={{ width: 14, height: 1, background: "var(--crimson)", display: "block" }} />
              <span style={{ width: 22, height: 1, background: "var(--gold)", display: "block" }} />
            </>}
          </button>
        </div>
      </header>

      <div style={{
        position: "fixed", inset: 0, zIndex: 850, background: "var(--void)",
        paddingTop: 100, padding: "100px 36px 40px",
        display: "flex", flexDirection: "column",
        opacity: mobOpen ? 1 : 0, pointerEvents: mobOpen ? "auto" : "none",
        transform: mobOpen ? "translateX(0)" : "translateX(100%)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        borderLeft: "1px solid var(--rule-str)",
      }}>
        {/* Red margin line */}
        <div style={{ position: "absolute", left: 80, top: 0, bottom: 0, width: 1, background: "var(--crimson)", opacity: 0.25 }} />
        {links.map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setMobOpen(false)} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontWeight: 400,
            color: "var(--ivory)", textDecoration: "none",
            padding: "18px 0", borderBottom: "0.5px solid var(--rule-med)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            opacity: mobOpen ? 1 : 0,
            transform: mobOpen ? "translateX(0)" : "translateX(30px)",
            transition: `opacity 0.4s ${i * 60}ms, transform 0.4s ${i * 60}ms`,
          }}>
            {l.label}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.25em", color: "var(--gold-dim)" }}>0{i + 1}</span>
          </a>
        ))}
        <a href="tel:+919994388855" style={{ marginTop: 36, display: "inline-block", background: "var(--gold)", color: "var(--void)", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 28px", textDecoration: "none" }}>
          Call Chambers Now
        </a>
      </div>
    </>
  );
}

// ─── Hero / Opening Statement ──────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ paddingTop: 60 }}>
      <div className="hero-wrap">
        {/* Left column — advocate introduction */}
        <div className="hero-left">
          <div className="case-file-tab" />

          <div>
            <Fade>
              <div style={{ marginBottom: 32 }}>
                <div className="case-ref" style={{ marginBottom: 8 }}>Case No. AGD/2024/Chennai</div>
                <div style={{ height: "0.5px", background: "var(--rule-med)" }} />
              </div>
            </Fade>
            <Fade delay={80}>
              <p className="mono" style={{ marginBottom: 20, color: "var(--gold-dim)" }}>Appearing before</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
                {["Madras High Court", "District Courts", "Consumer Commissions", "Tribunals"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0", borderBottom: "0.5px solid var(--rule)" }}>
                    <div style={{ width: 1, height: 16, background: "var(--crimson)", opacity: 0.6, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--parch)", fontWeight: 400 }}>{f}</span>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          <Fade delay={200}>
            <div>
              <div style={{ width: 32, height: 1, background: "var(--gold)", marginBottom: 20, opacity: 0.6 }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: "var(--parch2)", lineHeight: 1.7, marginBottom: 28 }}>
                "Precision-driven advocacy,<br />transparent communication,<br />timely resolution."
              </div>
              <div className="case-ref">
                AGD Bala Kumar — Managing Counsel
              </div>
            </div>
          </Fade>

          <Fade delay={320}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 36 }}>
              <a href="#contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--gold)", color: "var(--void)", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px 22px", textDecoration: "none", border: "1px solid var(--gold)", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--void)"; }}>
                ⚖ Present Your Case
              </a>
              <a href="tel:+919994388855"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--ink-dim)", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", fontWeight: 400, letterSpacing: "0.1em", padding: "10px 0", textDecoration: "none", borderBottom: "0.5px solid var(--rule)", width: "fit-content", transition: "color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderBottomColor = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-dim)"; e.currentTarget.style.borderBottomColor = "var(--rule)"; }}>
                <Phone size={12} /> +91 99943 88855
              </a>
            </div>
          </Fade>
        </div>

        {/* Right column — opening statement */}
        <div className="hero-right">
          <div className="hero-watermark" aria-hidden>LAW</div>
          <div className="hero-right-margin" />

          <div style={{ position: "relative", zIndex: 2 }}>
            <Fade delay={100}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 36 }}>
                <span className="mono" style={{ color: "var(--gold-dim)" }}>Opening Statement</span>
                <div style={{ flex: 1, maxWidth: 60, height: "0.5px", background: "var(--gold)", opacity: 0.4 }} />
                <span className="case-ref">Boutique Litigation Practice · 12+ Yrs</span>
              </div>
            </Fade>

            <div className="hero-h1">
              <Fade delay={160} className="case-file-reveal">Your rights.</Fade>
              <Fade delay={240}><em>Our fight.</em></Fade>
              <Fade delay={320}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", fontStyle: "normal", color: "var(--ink-dim)", marginTop: 16, display: "block", letterSpacing: "0.06em", lineHeight: 1.5, fontWeight: 400 }}>
                  Precision law across Tamil Nadu.
                </div>
              </Fade>
            </div>

            <Fade delay={440}>
              <p className="hero-body" style={{ marginTop: 36, paddingTop: 36, borderTop: "0.5px solid var(--rule-med)" }}>
                AGD Law Associates is a focused litigation and advisory practice led by Advocate AGD Bala Kumar — delivering rigorous legal representation across 9 practice areas with 12+ years of dedicated courtroom experience.
              </p>
            </Fade>
          </div>

          <Fade delay={560}>
            <div style={{ display: "flex", gap: "clamp(24px,4vw,56px)", marginTop: 60, paddingTop: 28, borderTop: "0.5px solid var(--rule-med)" }}>
              {[["12+", "Years"], ["500+", "Matters"], ["9", "Practice Areas"], ["6", "Cities"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 400, lineHeight: 1, color: "var(--gold)", letterSpacing: "-0.02em" }}>{v}</div>
                  <div className="case-ref" style={{ marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ─── Legal Notice Strip ────────────────────────────────────────────────────────

function NoticeStrip() {
  const items = [...NOTICE_ITEMS, ...NOTICE_ITEMS];
  return (
    <div className="notice-strip">
      <div className="notice-track">
        {items.map((t, i) => (
          <span key={i} className="notice-item">
            {t} <span className="notice-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── About / Counsel Dossier ──────────────────────────────────────────────────

function About() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Profile", sub: "01" },
    { label: "Experience", sub: "02" },
    { label: "Jurisdiction", sub: "03" },
  ];

  const tabContent = [
    <div key="profile" style={{ display: "contents" }}>
      <div className="dossier-col">
        <Fade>
          <div className="portrait-frame">
            <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=700&h=950&fit=crop&crop=faces" alt="AGD Bala Kumar" />
            <div className="portrait-caption">
              <div className="case-ref" style={{ color: "var(--gold)", marginBottom: 4 }}>Managing Counsel</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 400, color: "#fff" }}>AGD Bala Kumar</div>
            </div>
          </div>
        </Fade>
        <Fade delay={100} style={{ marginTop: 36 }}>
          <div style={{ padding: "18px 20px", background: "rgba(196,154,60,0.06)", borderLeft: "1px solid var(--gold)", position: "relative" }}>
            <div className="stamp" style={{ position: "absolute", top: 12, right: 12, fontSize: "0.42rem" }}>Verified</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: "var(--parch2)", lineHeight: 1.75 }}>
              "We are a boutique firm with personalized attention and no-file-left-with-junior guarantee."
            </p>
          </div>
        </Fade>
      </div>
      <div className="dossier-col dossier-col-last">
        <div>
          <Fade>
            <p className="mono" style={{ marginBottom: 16, color: "var(--gold-dim)" }}>The Firm</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--ivory)", marginBottom: 28, lineHeight: 1.1, maxWidth: 420 }}>
              A practice built on <em style={{ color: "var(--gold)", fontStyle: "italic" }}>precision</em> and integrity.
            </h2>
          </Fade>
          <Fade delay={100}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.85, color: "var(--parch2)", marginBottom: 20, fontWeight: 300, maxWidth: 440 }}>
              AGD Law Associates is a focused litigation and advisory practice based in Tamil Nadu, led by Advocate AGD Bala Kumar with over 12 years of courtroom experience spanning criminal, civil, constitutional, and corporate matters.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.85, color: "var(--parch2)", fontWeight: 300, maxWidth: 440 }}>
              Our vision: to become a trusted boutique law firm recognized for excellence, integrity, and client satisfaction — through transparent communication and timely resolution.
            </p>
          </Fade>
        </div>
        <Fade delay={200} style={{ marginTop: 52, paddingTop: 36, borderTop: "0.5px solid var(--rule-med)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Pan-Tamil Nadu + Inter-State Presence", "Direct Counsel Accessibility — Always", "Written Legal Opinions as Standard", "Transparent Fee Communication"].map((f, i) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "0.5px solid var(--rule)" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "var(--gold-dim)", letterSpacing: "0.2em", flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "var(--parch)", fontWeight: 300, letterSpacing: "0.06em" }}>{f}</span>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </div>,

    <div key="exp" style={{ display: "contents" }}>
      <div className="dossier-col" style={{ gridColumn: "span 2" }}>
        <Fade>
          <p className="mono" style={{ marginBottom: 28, color: "var(--gold-dim)" }}>Professional Record</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { year: "2012–Present", role: "Managing Partner, AGD Law Associates", detail: "Pan-Tamil Nadu litigation across criminal, civil, constitutional and consumer matters." },
              { year: "2009–2012", role: "Associate Counsel, Chambers of Sr. Advocate", detail: "Assisted in High Court matters — criminal appeals, writ petitions, and civil disputes." },
              { year: "2008", role: "Enrolled — Bar Council of Tamil Nadu", detail: "Advocate on Record, Madras High Court." },
            ].map((e, i) => (
              <Fade key={e.year} delay={i * 80}>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 32, padding: "28px 0", borderBottom: "0.5px solid var(--rule-med)" }}>
                  <div className="case-ref" style={{ paddingTop: 4 }}>{e.year}</div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--ivory)", marginBottom: 8 }}>{e.role}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "var(--parch2)", lineHeight: 1.7, fontStyle: "italic" }}>{e.detail}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </div>
    </div>,

    <div key="juris" style={{ display: "contents" }}>
      <div className="dossier-col" style={{ gridColumn: "span 2" }}>
        <Fade>
          <p className="mono" style={{ marginBottom: 28, color: "var(--gold-dim)" }}>Active Jurisdictions</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 1, background: "var(--rule-med)" }}>
            {["Madras High Court", "District Court Chennai", "District Court Coimbatore", "District Court Tiruppur", "Family Courts, TN", "Consumer Commission, TN", "Motor Accidents Tribunal", "Labour Courts", "Arbitration Centers"].map((c, i) => (
              <Fade key={c} delay={i * 40}>
                <div style={{ padding: "24px 28px", background: "var(--bench)", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--mahogany)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bench)"}>
                  <div className="case-ref" style={{ marginBottom: 8 }}>Court 0{i + 1}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "var(--ivory)" }}>{c}</div>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </div>
    </div>,
  ];

  return (
    <section id="about" className="dossier-section">
      {/* Stamped header */}
      <div style={{ padding: "36px 52px 0", borderBottom: "0.5px solid var(--rule-med)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", background: "var(--bench)" }}>
        <Fade>
          <div>
            <div className="case-ref" style={{ marginBottom: 6 }}>01 — Counsel Profile</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,2.5vw,2.2rem)", color: "var(--ivory)", lineHeight: 1.1 }}>Case Dossier</h2>
          </div>
        </Fade>
        <div className="stamp">Confidential</div>
      </div>

      {/* Tab dividers — like real file dividers */}
      <div className="dossier-tabs">
        {tabs.map((t, i) => (
          <button key={t.label} className={`dossier-tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>
            <span className="tab-num">Section {t.sub}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="dossier-body">
        <div className="dossier-index" data-label={tabs[activeTab].label}>
          <Fade>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "6rem", fontWeight: 400, lineHeight: 1, color: "rgba(196,154,60,0.15)", letterSpacing: "-0.04em" }}>
                {tabs[activeTab].sub}
              </div>
              <div style={{ marginTop: 12, height: "0.5px", background: "var(--rule-med)" }} />
            </div>
          </Fade>
          <Fade delay={100}>
            <div>
              <p className="mono" style={{ fontSize: "0.54rem", color: "var(--gold-dim)" }}>{tabs[activeTab].label}</p>
              <div style={{ marginTop: 12, width: 1, height: 60, background: "var(--rule-med)" }} />
            </div>
          </Fade>
        </div>
        {tabContent[activeTab]}
      </div>
    </section>
  );
}

// ─── Stats Band ────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <div className="stats-band">
      {[["12+", "Years of Active Practice"], ["500+", "Matters Handled"], ["9", "Practice Areas"], ["6", "Cities of Presence"]].map(([v, l], i) => (
        <Fade key={l} delay={i * 80}>
          <div className="stat-cell">
            <div className="stat-num">{v}</div>
            <div className="stat-label">{l}</div>
            <div className="stat-line" />
          </div>
        </Fade>
      ))}
    </div>
  );
}

// ─── Trial Timeline / Process ──────────────────────────────────────────────────

function Process() {
  const [active, setActive] = useState(0);
  const step = PROCESS_STEPS[active];

  return (
    <section id="process" className="timeline-section">
      <div className="timeline-header">
        <div className="timeline-header-left">
          <Fade>
            <div className="case-ref" style={{ marginBottom: 12 }}>02 — Our Approach</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: "var(--ivory)", lineHeight: 1.1, maxWidth: 380 }}>
              Trial Timeline
            </h2>
          </Fade>
        </div>
        <div className="timeline-header-right">
          <Fade>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.85, color: "var(--parch2)", fontWeight: 300, maxWidth: 400, fontStyle: "italic" }}>
              Every matter follows a disciplined, transparent process — five distinct stages from first filing to final execution of judgment.
            </p>
          </Fade>
        </div>
      </div>

      {/* Scrubber — like video editing timeline */}
      <div className="timeline-scrubber">
        {PROCESS_STEPS.map((s, i) => (
          <div key={s.num} className={`scrubber-step${active === i ? " active" : ""}`} onClick={() => setActive(i)}>
            <div className="scrubber-num">Stage {s.num} · {s.stage}</div>
            <div className="scrubber-label">{s.title.split("&")[0].trim()}</div>
          </div>
        ))}
      </div>

      {/* Expanded panel */}
      <div className="timeline-panel" key={active}>
        <div className="timeline-panel-num">
          <div className="timeline-big-num">{step.num}</div>
        </div>
        <div className="timeline-content">
          <div className="case-ref" style={{ marginBottom: 12 }}>{step.stage} · Stage {step.num} of 05</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--ivory)", marginBottom: 28, lineHeight: 1.1 }}>
            {step.title}
          </h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", lineHeight: 1.9, color: "var(--parch2)", fontWeight: 300, maxWidth: 560, fontStyle: "italic" }}>
            {step.body}
          </p>
          <div style={{ marginTop: 48, display: "flex", gap: 16 }}>
            {PROCESS_STEPS.map((_, i) => (
              <div key={i}
                style={{ width: i === active ? 32 : 8, height: 2, background: i === active ? "var(--gold)" : "var(--rule-str)", transition: "all 0.4s", cursor: "pointer", borderRadius: 0 }}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
        <div className="timeline-notes-bar">
          <div className="archive-filter-head" style={{ marginBottom: 20 }}>Courtroom Notes</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", lineHeight: 2, color: "var(--ink-fade)", letterSpacing: "0.08em" }}>
            {["Client briefed", "Documents filed", "Counter affidavit", "Arguments scheduled", "Judgment reserved"].map((n, i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "0.5px solid var(--rule)", opacity: i <= active ? 1 : 0.3, transition: "opacity 0.4s" }}>
                <div style={{ width: 6, height: 6, border: "0.5px solid var(--gold)", flexShrink: 0, background: i < active ? "var(--gold)" : "transparent", transition: "background 0.4s" }} />
                {n}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--gold)", fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", paddingBottom: 6, borderBottom: "0.5px solid var(--gold)", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Begin Matter <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Practice Areas Register / Services ───────────────────────────────────────

function Services() {
  return (
    <section id="practice" className="register-section">
      <div className="register-header">
        <Fade>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="case-ref" style={{ marginBottom: 12 }}>03 — Practice Register</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--ivory)", lineHeight: 1.1, maxWidth: 440 }}>
              Court Registry Ledger
            </h2>
          </div>
        </Fade>
        <Fade delay={80}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.02rem", lineHeight: 1.85, color: "var(--parch2)", fontWeight: 300, maxWidth: 360, fontStyle: "italic", marginBottom: 16 }}>
              Nine disciplines across the full spectrum — from constitutional courts to consumer tribunals.
            </p>
            <div className="stamp stamp-green" style={{ transform: "rotate(1deg)" }}>9 Active Practices</div>
          </div>
        </Fade>
      </div>

      {/* Ledger table */}
      <div className="register-ledger" style={{ background: "var(--void)" }}>
        {/* Column headers */}
        <div className="register-col-head">#</div>
        <div className="register-col-head">Practice Area</div>
        <div className="register-col-head">Scope of Representation</div>
        <div className="register-col-head">Status</div>

        {SERVICES.map((s, i) => (
          <Fade key={s.title} delay={i * 30} style={{ display: "contents" }}>
            <div className={`register-cell${s.urgent ? " register-urgent" : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 20px" }}>
              <div className="register-row-num">{s.num}</div>
            </div>
            <div className={`register-cell${s.urgent ? " register-urgent" : ""}`}>
              <div className="register-title">{s.title}</div>
              {s.urgent && <div className="stamp" style={{ marginTop: 8, display: "inline-block", fontSize: "0.44rem" }}>Urgent Matter</div>}
            </div>
            <div className={`register-cell${s.urgent ? " register-urgent" : ""}`}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--parch2)", fontWeight: 300 }}>{s.desc}</p>
            </div>
            <div className={`register-cell${s.urgent ? " register-urgent" : ""}`}>
              <div className="stamp-green stamp" style={{ transform: "rotate(-1.5deg)" }}>Active</div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ─── Judgment Archive / Results ────────────────────────────────────────────────

function Results() {
  const [yearFilter, setYearFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const years = ["All", "2024", "2023"];
  const types = ["All", "Criminal", "Civil", "Consumer", "Family", "Writ", "MCOP"];

  const filtered = RESULTS.filter(r =>
    (yearFilter === "All" || r.year === yearFilter) &&
    (typeFilter === "All" || r.type === typeFilter)
  );

  return (
    <section id="results" className="archive-section">
      <div className="archive-grid">
        <div className="archive-sidebar">
          <Fade>
            <div>
              <div className="case-ref" style={{ marginBottom: 12 }}>04 — Judgment Archive</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: 20 }}>
                Case Records
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--parch2)", fontWeight: 300, fontStyle: "italic" }}>
                A selection of representative judgments from our litigation practice across Tamil Nadu.
              </p>
            </div>
          </Fade>

          <Fade delay={80}>
            <div style={{ marginTop: 40 }}>
              <div className="archive-filter-head">Filter by Year</div>
              {years.map(y => (
                <button key={y} className={`archive-filter-btn${yearFilter === y ? " active" : ""}`} onClick={() => setYearFilter(y)}>{y}</button>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <div className="archive-filter-head">Filter by Court</div>
              {types.map(t => (
                <button key={t} className={`archive-filter-btn${typeFilter === t ? " active" : ""}`} onClick={() => setTypeFilter(t)}>{t}</button>
              ))}
            </div>
          </Fade>

          <Fade delay={160}>
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: "0.5px solid var(--rule-med)" }}>
              <div style={{ width: 32, height: 1, background: "var(--gold)", marginBottom: 14, opacity: 0.5 }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", lineHeight: 1.8, color: "var(--ink-fade)", fontStyle: "italic" }}>
                Each matter is handled with the same rigour — whether a ₹500 complaint or a High Court writ.
              </p>
            </div>
          </Fade>
        </div>

        <div className="archive-list">
          {filtered.map((r, i) => (
            <Fade key={r.title} delay={i * 60}>
              <div className="archive-row">
                <div style={{ position: "relative" }}>
                  <div className="archive-cat">{r.cat} · {r.year}</div>
                  <h3 className="archive-title">{r.title}</h3>
                  <div className="archive-court">{r.court}</div>
                  {/* Simulated PDF preview on hover */}
                  <div className="archive-preview">
                    <div className="archive-preview-inner">
                      {[...Array(12)].map((_, j) => <div key={j} className="archive-preview-line" style={{ width: `${60 + Math.random() * 35}%` }} />)}
                      <div style={{ position: "absolute", bottom: 12, right: 12 }}><div className="stamp" style={{ fontSize: "0.4rem", transform: "rotate(-3deg)" }}>Judgment</div></div>
                    </div>
                  </div>
                </div>
                <span className="archive-badge">{r.outcome}</span>
              </div>
            </Fade>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "64px 52px", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "var(--ink-fade)", letterSpacing: "0.12em" }}>
              No records match the current filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-section">
      <div className="faq-grid">
        <div className="faq-left">
          <Fade>
            <div>
              <div className="case-ref" style={{ marginBottom: 12 }}>05 — Frequently Asked</div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: 20 }}>
                Common questions,<br />clear answers.
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.98rem", lineHeight: 1.85, color: "var(--parch2)", fontWeight: 300, fontStyle: "italic" }}>
                Still have questions? Write to us or call directly — we respond within one business day.
              </p>
            </div>
          </Fade>
          <Fade delay={100} style={{ marginTop: 48 }}>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--gold)", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", paddingBottom: 6, borderBottom: "0.5px solid var(--gold)", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Ask Your Question <ArrowUpRight size={13} />
            </a>
          </Fade>
        </div>
        <div className="faq-right">
          {FAQS.map((f, i) => (
            <Fade key={f.q} delay={i * 50}>
              <div className="faq-item">
                <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q">{f.q}</span>
                  <span className={`faq-icon${open === i ? " open" : ""}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </span>
                </button>
                <div className={`faq-body${open === i ? " open" : ""}`}>{f.a}</div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact / Petition Filing ─────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", matter: "", message: "" });
  const chg = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const send = () => {
    const t = `Hi AGD Law Associates,\nName: ${form.name}\nPhone: ${form.phone}\nMatter: ${form.matter}\n\n${form.message}`;
    window.open(`https://wa.me/919994388855?text=${encodeURIComponent(t)}`, "_blank", "noopener");
  };

  return (
    <section id="contact" className="contact-section">
      <div style={{ padding: "40px 52px 0", borderBottom: "0.5px solid var(--rule-med)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", background: "var(--chamber)" }}>
        <Fade>
          <div>
            <div className="case-ref" style={{ marginBottom: 6 }}>06 — Petition Filing</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,2.2vw,1.9rem)", color: "var(--ivory)", lineHeight: 1.1 }}>Present Your Case</h2>
          </div>
        </Fade>
        <div className="stamp stamp-green" style={{ marginBottom: 8 }}>Open for Intake</div>
      </div>
      <div className="contact-grid">
        <div className="contact-left">
          <div style={{ position: "relative", zIndex: 1 }}>
            <Fade>
              <div style={{ fontSize: "0.0rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: 20 }}></div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: 28, fontFamily: "'Playfair Display', serif" }}>
                Your first consultation<br />starts here.
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", lineHeight: 1.85, color: "var(--parch2)", fontWeight: 300, maxWidth: 380, fontStyle: "italic" }}>
                Reach out via phone, email, or WhatsApp. We respond within one business day and schedule consultations at your convenience.
              </p>
            </Fade>
          </div>
          <Fade delay={100}>
            <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
              {[
                { Icon: PhoneCall, label: "Phone", val: "+91 99943 88855", href: "tel:+919994388855" },
                { Icon: Mail, label: "Email", val: "agdlawassociatesoffice@gmail.com", href: "mailto:agdlawassociatesoffice@gmail.com" },
                { Icon: MapPin, label: "Chambers", val: "Chennai, Tamil Nadu — Pan-TN Presence", href: "#" },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href} className="contact-info-row">
                  <div className="contact-info-icon"><Icon size={13} /></div>
                  <div>
                    <div className="case-ref" style={{ marginBottom: 3 }}>{label}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "var(--parch)", fontWeight: 300, letterSpacing: "0.04em" }}>{val}</div>
                  </div>
                </a>
              ))}
              <div style={{ marginTop: 32, fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "var(--ink-fade)", letterSpacing: "0.1em", lineHeight: 1.8 }}>
                Mon–Fri 10AM–6:30PM · Sat 11AM–5PM<br />
                2nd & Last Saturdays: Closed
              </div>
            </div>
          </Fade>
        </div>

        <div className="contact-right">
          <Fade>
            <div className="case-ref" style={{ marginBottom: 40 }}>File a Query</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { n: "name", l: "Petitioner Name", p: "Your full name" },
                { n: "phone", l: "Contact Number", p: "+91 XXXXX XXXXX" },
                { n: "matter", l: "Nature of Matter", p: "e.g. Criminal, Property, Family…" },
              ].map(f => (
                <div key={f.n}>
                  <label className="field-label">{f.l}</label>
                  <input name={f.n} value={form[f.n]} onChange={chg} placeholder={f.p} className="field-input" />
                </div>
              ))}
              <div>
                <label className="field-label">Brief Statement of Facts</label>
                <textarea name="message" value={form.message} onChange={chg} placeholder="Describe your situation briefly…" rows={4} className="field-textarea" />
              </div>
              <div>
                <button onClick={send} className="submit-btn">
                  Submit via WhatsApp <Send size={12} />
                </button>
                <p style={{ marginTop: 16, fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "var(--ink-fade)", lineHeight: 1.8, letterSpacing: "0.06em" }}>
                  Your query will open in WhatsApp for a direct conversation with our chambers.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 600, color: "var(--ivory)", marginBottom: 4 }}>AGD Law Associates</div>
          <div className="case-ref" style={{ color: "var(--gold-dim)", marginBottom: 20 }}>Advocates & Legal Consultants</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--parch2)", fontWeight: 300, maxWidth: 280, fontStyle: "italic" }}>
            A boutique litigation and advisory practice serving clients across Tamil Nadu with precision, transparency, and integrity.
          </p>
          <div style={{ marginTop: 28 }}>
            <a href="https://www.agdlawassociates.in" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "var(--gold)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, letterSpacing: "0.1em" }}>
              www.agdlawassociates.in <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
        {[
          { head: "Navigate", links: [["Counsel Profile", "#about"], ["Trial Timeline", "#process"], ["Practice Register", "#practice"], ["Judgment Archive", "#results"], ["File a Petition", "#contact"]] },
          { head: "Practice", links: [["Criminal Law", "#practice"], ["Civil Litigation", "#practice"], ["Property Law", "#practice"], ["Family Law", "#practice"], ["Arbitration", "#practice"]] },
          { head: "Contact", links: [["+91 99943 88855", "tel:+919994388855"], ["agdlawassociatesoffice@gmail.com", "mailto:agdlawassociatesoffice@gmail.com"], ["Chennai, Tamil Nadu", "#"]] },
        ].map(col => (
          <div key={col.head}>
            <div className="footer-nav-head">{col.head}</div>
            {col.links.map(([l, h]) => <a key={l} href={h} className="footer-nav-a">{l}</a>)}
          </div>
        ))}
      </div>
      <div className="footer-base">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "var(--ink-fade)", letterSpacing: "0.1em" }}>© {new Date().getFullYear()} AGD Law Associates. All rights reserved.</p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "var(--ink-fade)", letterSpacing: "0.1em" }}>Mon–Fri 10AM–6:30PM · Sat 11AM–5PM</p>
      </div>
    </footer>
  );
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

function WhatsApp() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const QUICK = ["Hi, I need a legal consultation.", "I want to discuss a criminal matter.", "I need help with a property dispute.", "Please schedule a consultation."];
  const send = (t) => {
    const text = (t || msg).trim(); if (!text) return;
    window.open(`https://wa.me/919994388855?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setMsg(""); setOpen(false);
  };

  return (
    <div className="wa-bubble">
      <div className={`wa-panel${open ? " open" : " closed"}`}>
        <div className="wa-header">
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", color: "var(--ivory)" }}>AGD Legal Desk</div>
            <div className="case-ref" style={{ color: "var(--gold-dim)", marginTop: 2 }}>Replies during office hours</div>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-dim)" }}><X size={14} /></button>
        </div>
        <div style={{ padding: 18 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem", lineHeight: 1.7, color: "var(--parch2)", marginBottom: 14, fontWeight: 300, fontStyle: "italic" }}>
            Select a quick message or type your query below.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {QUICK.map(q => (
              <button key={q} onClick={() => setMsg(q)} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", padding: "6px 10px", background: "var(--mahogany)", border: "0.5px solid var(--rule-med)", color: "var(--ink-dim)", cursor: "pointer", textAlign: "left", transition: "all 0.2s", letterSpacing: "0.04em" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--rule-med)"; e.currentTarget.style.color = "var(--ink-dim)"; }}>
                {q}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={2} placeholder="Type your message…"
              style={{ flex: 1, resize: "none", background: "transparent", border: "0.5px solid var(--rule-str)", padding: "8px 10px", color: "var(--ivory)", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "var(--gold)"}
              onBlur={e => e.target.style.borderColor = "var(--rule-str)"}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
            <button onClick={() => send()} style={{ width: 36, background: "var(--gold)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--void)", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--crimson)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}>
              <Send size={12} />
            </button>
          </div>
        </div>
      </div>
      <button className="wa-btn" onClick={() => setOpen(v => !v)}>
        {open ? <X size={17} /> : <MessageCircle size={19} />}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Header />
      <main>
        <Hero />
        <NoticeStrip />
        <About />
        <Stats />
        <Process />
        <Services />
        <Results />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}