"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin, PhoneCall, Send, X, MessageCircle, ChevronRight } from "lucide-react";

// ─── Global Styles ─────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Instrument+Sans:wght@300;400;500;600&display=swap');

  :root {
    --linen:    #f6f1e9;
    --parch:    #ede6d6;
    --parch2:   #e4dccb;
    --ink:      #1c1712;
    --ink-mid:  #4a4035;
    --ink-dim:  #8a7d6b;
    --sage:     #7a9478;
    --sage-lt:  #d6e5d4;
    --gold:     #b07d3a;
    --gold-lt:  #e8d5b0;
    --rule:     rgba(28,23,18,0.12);
    --rule-med: rgba(28,23,18,0.22);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    background: var(--linen);
    color: var(--ink);
    font-family: 'Instrument Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--parch); }
  ::-webkit-scrollbar-thumb { background: var(--ink-dim); border-radius: 2px; }

  h1, h2, h3, h4 {
    font-family: 'Libre Baskerville', Georgia, serif;
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.02em;
  }

  /* Utility classes */
  .label {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
  }
  .rule-h { width: 100%; height: 0.5px; background: var(--rule-med); }
  .rule-v { width: 0.5px; background: var(--rule-med); }

  /* Fade-in animation */
  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .fade-up.delay-1 { transition-delay: 100ms; }
  .fade-up.delay-2 { transition-delay: 200ms; }
  .fade-up.delay-3 { transition-delay: 320ms; }
  .fade-up.delay-4 { transition-delay: 440ms; }

  /* ── HEADER ── */
  .hdr {
    position: fixed; top: 0; left: 0; right: 0; z-index: 900;
    background: var(--linen);
    border-bottom: 0.5px solid var(--rule-med);
    transition: box-shadow 0.3s;
  }
  .hdr.shadow { box-shadow: 0 2px 32px rgba(28,23,18,0.08); }
  .hdr-inner {
    max-width: 1380px; margin: 0 auto;
    padding: 0 40px;
    height: 68px;
    display: flex; align-items: center; justify-content: space-between; gap: 40px;
  }
  .logo-wordmark {
    font-family: 'Libre Baskerville', serif;
    font-size: 1rem; font-weight: 700;
    color: var(--ink); letter-spacing: 0.01em;
    text-decoration: none; flex-shrink: 0;
  }
  .logo-sub {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.55rem; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ink-dim); margin-top: 2px;
  }
  .nav-links { display: flex; gap: 36px; align-items: center; }
  .nav-a {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--ink-mid);
    text-decoration: none; transition: color 0.2s;
    position: relative; padding-bottom: 2px;
  }
  .nav-a::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 0.5px; background: var(--gold);
    transition: width 0.3s ease;
  }
  .nav-a:hover { color: var(--ink); }
  .nav-a:hover::after { width: 100%; }
  .nav-cta {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--linen);
    background: var(--ink); padding: 10px 22px;
    text-decoration: none; border-radius: 1px;
    transition: background 0.25s, color 0.25s;
  }
  .nav-cta:hover { background: var(--gold); }

  /* ── HERO ── */
  .hero-wrap {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 2.2fr;
    border-bottom: 0.5px solid var(--rule-med);
    padding-top: 68px;
  }
  .hero-left {
    border-right: 0.5px solid var(--rule-med);
    display: flex; flex-direction: column;
    padding: 80px 48px 60px;
    justify-content: space-between;
    background: var(--parch);
  }
  .hero-right {
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 80px 72px 60px;
    position: relative; overflow: hidden;
  }
  .hero-bg-text {
    position: absolute; top: 40px; right: -20px;
    font-family: 'Libre Baskerville', serif;
    font-size: clamp(10rem, 20vw, 18rem);
    font-weight: 700; line-height: 1;
    color: transparent;
    -webkit-text-stroke: 0.5px var(--rule);
    user-select: none; pointer-events: none;
    white-space: nowrap; letter-spacing: -0.04em;
  }
  .hero-number {
    font-family: 'Libre Baskerville', serif;
    font-size: 0.72rem; font-weight: 400;
    color: var(--ink-dim); letter-spacing: 0.1em;
  }
  .hero-h1 {
    font-size: clamp(3.2rem, 6vw, 6rem);
    line-height: 1.0; color: var(--ink);
    margin-bottom: 32px;
  }
  .hero-h1 em {
    font-style: italic; color: var(--gold);
  }
  .hero-body {
    font-size: 1rem; font-weight: 300; line-height: 1.75;
    color: var(--ink-mid); max-width: 520px;
  }

  /* ── MARQUEE ── */
  .marquee-wrap {
    overflow: hidden;
    border-bottom: 0.5px solid var(--rule-med);
    background: var(--ink);
    padding: 16px 0;
  }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-track {
    display: flex; white-space: nowrap; width: max-content;
    animation: marquee 28s linear infinite;
  }
  .marquee-item {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold-lt); padding: 0 48px;
    display: inline-flex; align-items: center; gap: 48px;
  }
  .marquee-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
  }

  /* ── ABOUT / EDITORIAL ── */
  .editorial-grid {
    display: grid;
    grid-template-columns: 160px 1fr 1fr;
    min-height: 80vh;
    border-bottom: 0.5px solid var(--rule-med);
  }
  .ed-index {
    border-right: 0.5px solid var(--rule-med);
    padding: 80px 32px;
    display: flex; flex-direction: column; gap: 48px;
    background: var(--parch);
  }
  .ed-index-num {
    font-family: 'Libre Baskerville', serif;
    font-size: 5rem; font-weight: 400; line-height: 1;
    color: var(--rule); letter-spacing: -0.04em;
  }
  .ed-col {
    padding: 80px 56px;
    border-right: 0.5px solid var(--rule-med);
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .ed-col-last { border-right: none; }
  .portrait-frame {
    width: 100%; aspect-ratio: 3/4; overflow: hidden;
    position: relative; background: var(--parch2);
  }
  .portrait-frame img {
    width: 100%; height: 100%; object-fit: cover;
    filter: sepia(15%) contrast(1.05);
    transition: transform 0.7s ease;
  }
  .portrait-frame:hover img { transform: scale(1.03); }
  .portrait-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 20px;
    background: linear-gradient(transparent, rgba(28,23,18,0.7));
  }

  /* ── STATS BAND ── */
  .stats-band {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-bottom: 0.5px solid var(--rule-med);
  }
  .stat-cell {
    padding: 52px 40px;
    border-right: 0.5px solid var(--rule-med);
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .stat-cell:last-child { border-right: none; }
  .stat-cell:hover { background: var(--parch); }
  .stat-num {
    font-family: 'Libre Baskerville', serif;
    font-size: clamp(3rem, 5vw, 4.5rem);
    font-weight: 400; line-height: 1; color: var(--ink);
    letter-spacing: -0.03em;
  }
  .stat-num sup {
    font-size: 0.4em; vertical-align: super;
    color: var(--gold);
  }
  .stat-label {
    font-size: 0.72rem; font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--ink-dim); margin-top: 10px;
  }
  .stat-line {
    position: absolute; bottom: 0; left: 0;
    height: 2px; background: var(--gold); width: 0;
    transition: width 0.5s ease;
  }
  .stat-cell:hover .stat-line { width: 100%; }

  /* ── PROCESS HORIZONTAL ── */
  .process-section { border-bottom: 0.5px solid var(--rule-med); }
  .process-header {
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 0.5px solid var(--rule-med);
  }
  .process-header-left {
    padding: 64px 72px;
    border-right: 0.5px solid var(--rule-med);
    background: var(--parch);
  }
  .process-header-right { padding: 64px 72px; }
  .h-scroll-wrap { overflow-x: auto; display: flex; }
  .h-scroll-wrap::-webkit-scrollbar { height: 2px; }
  .h-scroll-wrap::-webkit-scrollbar-track { background: var(--parch); }
  .h-scroll-wrap::-webkit-scrollbar-thumb { background: var(--gold); }
  .process-track { display: flex; min-width: max-content; }
  .process-card {
    width: 340px; flex-shrink: 0;
    border-right: 0.5px solid var(--rule-med);
    padding: 56px 48px;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 420px;
    transition: background 0.3s;
    cursor: default;
    position: relative; overflow: hidden;
  }
  .process-card:hover { background: var(--parch); }
  .process-card-num {
    font-family: 'Libre Baskerville', serif;
    font-size: 6rem; font-weight: 400; line-height: 1;
    color: var(--rule); letter-spacing: -0.04em;
    transition: color 0.3s;
  }
  .process-card:hover .process-card-num { color: var(--gold-lt); }
  .process-card-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 1.6rem; color: var(--ink); margin-bottom: 16px;
  }
  .process-card-body {
    font-size: 0.88rem; line-height: 1.75; color: var(--ink-mid);
    font-weight: 300;
  }
  .process-corner {
    position: absolute; bottom: 24px; right: 24px;
    width: 28px; height: 28px;
    border-right: 1px solid var(--gold);
    border-bottom: 1px solid var(--gold);
    opacity: 0; transition: opacity 0.3s;
  }
  .process-card:hover .process-corner { opacity: 1; }

  /* ── SERVICES BENTO ── */
  .services-section { border-bottom: 0.5px solid var(--rule-med); }
  .services-header {
    padding: 72px 72px 56px;
    border-bottom: 0.5px solid var(--rule-med);
    display: flex; align-items: flex-end; justify-content: space-between; gap: 40px;
  }
  .bento-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto;
  }
  .bento-cell {
    padding: 44px 44px;
    border-right: 0.5px solid var(--rule-med);
    border-bottom: 0.5px solid var(--rule-med);
    transition: background 0.25s;
    cursor: default; position: relative;
  }
  .bento-cell:hover { background: var(--parch); }
  .bento-cell.wide { grid-column: span 1; }
  .bento-cell.featured {
    background: var(--ink); color: var(--linen);
    border-color: var(--ink);
  }
  .bento-cell.featured:hover { background: #2a2218; }
  .bento-cell.no-right { border-right: none; }
  .bento-cell.no-bottom { border-bottom: none; }
  .bento-icon {
    width: 36px; height: 36px;
    border: 0.5px solid var(--rule-med);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px; font-size: 1rem; color: var(--gold);
    flex-shrink: 0;
  }
  .bento-cell.featured .bento-icon { border-color: rgba(255,255,255,0.15); color: var(--gold-lt); }
  .bento-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 1.2rem; color: var(--ink); margin-bottom: 10px;
  }
  .bento-cell.featured .bento-title { color: var(--linen); }
  .bento-body { font-size: 0.82rem; line-height: 1.7; color: var(--ink-mid); font-weight: 300; }
  .bento-cell.featured .bento-body { color: rgba(246,241,233,0.65); }
  .bento-arrow {
    position: absolute; top: 24px; right: 24px;
    opacity: 0; transform: translate(-4px, 4px);
    transition: opacity 0.25s, transform 0.25s;
    color: var(--gold);
  }
  .bento-cell:hover .bento-arrow { opacity: 1; transform: translate(0,0); }
  .bento-cell.featured .bento-arrow { color: var(--gold-lt); }

  /* ── RESULTS ── */
  .results-section { border-bottom: 0.5px solid var(--rule-med); }
  .results-grid {
    display: grid; grid-template-columns: 280px 1fr;
  }
  .results-sidebar {
    border-right: 0.5px solid var(--rule-med);
    padding: 80px 48px;
    background: var(--parch);
    display: flex; flex-direction: column; justify-content: space-between;
    position: sticky; top: 68px; align-self: start;
  }
  .results-list { flex: 1; }
  .result-row {
    border-bottom: 0.5px solid var(--rule-med);
    padding: 36px 48px;
    display: grid; grid-template-columns: 1fr auto;
    gap: 24px; align-items: start;
    transition: background 0.25s;
  }
  .result-row:hover { background: var(--parch); }
  .result-cat {
    font-size: 0.6rem; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--sage); margin-bottom: 8px;
  }
  .result-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 1.3rem; color: var(--ink); margin-bottom: 8px;
  }
  .result-court { font-size: 0.78rem; color: var(--ink-dim); font-weight: 300; }
  .result-badge {
    background: var(--sage-lt); color: var(--sage);
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 6px 14px;
    border-radius: 1px; white-space: nowrap;
    border: 0.5px solid rgba(122,148,120,0.3);
  }

  /* ── FAQ ── */
  .faq-section { border-bottom: 0.5px solid var(--rule-med); }
  .faq-grid { display: grid; grid-template-columns: 1fr 1.4fr; min-height: 60vh; }
  .faq-left {
    border-right: 0.5px solid var(--rule-med);
    padding: 80px 72px;
    background: var(--parch);
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .faq-right { padding: 0; }
  .faq-item { border-bottom: 0.5px solid var(--rule-med); }
  .faq-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    gap: 32px; padding: 32px 56px;
    background: none; border: none; cursor: pointer; text-align: left;
    transition: background 0.2s;
  }
  .faq-trigger:hover { background: var(--parch); }
  .faq-q {
    font-family: 'Libre Baskerville', serif;
    font-size: 1.1rem; font-weight: 400; color: var(--ink); line-height: 1.35;
  }
  .faq-icon {
    width: 30px; height: 30px; flex-shrink: 0;
    border: 0.5px solid var(--rule-med); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); transition: transform 0.35s, border-color 0.25s;
  }
  .faq-icon.open { transform: rotate(45deg); border-color: var(--gold); }
  .faq-body {
    padding: 0 56px 32px;
    font-size: 0.92rem; line-height: 1.8; color: var(--ink-mid);
    font-weight: 300; max-height: 0; overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), padding 0.3s;
  }
  .faq-body.open { max-height: 400px; }

  /* ── CONTACT ── */
  .contact-section { border-bottom: 0.5px solid var(--rule-med); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .contact-left {
    border-right: 0.5px solid var(--rule-med);
    padding: 80px 72px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: var(--ink); color: var(--linen);
  }
  .contact-right { padding: 80px 72px; }
  .contact-info-row {
    padding: 24px 0; border-bottom: 0.5px solid rgba(246,241,233,0.1);
    display: flex; gap: 20px; align-items: flex-start;
    text-decoration: none; color: inherit;
    transition: opacity 0.2s;
  }
  .contact-info-row:hover { opacity: 0.7; }
  .contact-info-icon {
    width: 32px; height: 32px; flex-shrink: 0;
    border: 0.5px solid rgba(246,241,233,0.15); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; color: var(--gold-lt);
  }
  .field-label {
    font-size: 0.58rem; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 6px; display: block;
  }
  .field-input {
    width: 100%; background: transparent;
    border: none; border-bottom: 0.5px solid var(--rule-med);
    padding: 10px 0; font-size: 0.95rem;
    font-family: 'Instrument Sans', sans-serif; color: var(--ink);
    outline: none; transition: border-color 0.2s;
  }
  .field-input:focus { border-color: var(--gold); }
  .field-input::placeholder { color: var(--ink-dim); }
  .field-textarea {
    width: 100%; background: transparent;
    border: none; border-bottom: 0.5px solid var(--rule-med);
    padding: 10px 0; font-size: 0.95rem; resize: none;
    font-family: 'Instrument Sans', sans-serif; color: var(--ink);
    outline: none; transition: border-color 0.2s;
  }
  .field-textarea:focus { border-color: var(--gold); }
  .field-textarea::placeholder { color: var(--ink-dim); }
  .submit-btn {
    display: inline-flex; align-items: center; gap: 12px;
    background: var(--ink); color: var(--linen);
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; padding: 14px 28px;
    border: none; cursor: pointer; transition: background 0.25s, color 0.25s;
    border-radius: 1px;
  }
  .submit-btn:hover { background: var(--gold); }

  /* ── FOOTER ── */
  .footer {
    padding: 64px 0 0;
    background: var(--parch);
  }
  .footer-main {
    display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr;
    padding: 0 72px 64px;
    gap: 64px;
    border-bottom: 0.5px solid var(--rule-med);
  }
  .footer-nav-head {
    font-size: 0.6rem; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
  }
  .footer-nav-a {
    display: block; font-size: 0.85rem; color: var(--ink-mid);
    text-decoration: none; padding: 6px 0;
    transition: color 0.2s;
  }
  .footer-nav-a:hover { color: var(--ink); }
  .footer-base {
    padding: 24px 72px;
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
    background: var(--linen); border: 0.5px solid var(--rule-med);
    box-shadow: 0 20px 60px rgba(28,23,18,0.15);
    transition: opacity 0.3s, transform 0.3s; transform-origin: bottom right;
  }
  .wa-panel.closed { opacity: 0; transform: scale(0.92); pointer-events: none; }
  .wa-panel.open   { opacity: 1; transform: scale(1); }
  .wa-header {
    padding: 14px 18px; background: var(--ink);
    display: flex; align-items: center; justify-content: space-between;
  }
  .wa-btn {
    width: 50px; height: 50px; border-radius: 50%;
    background: var(--ink); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 32px rgba(28,23,18,0.25);
    transition: background 0.25s, transform 0.2s;
    color: var(--linen);
  }
  .wa-btn:hover { background: var(--gold); transform: scale(1.05); }

  /* ── MOBILE ── */
  @media (max-width: 1100px) {
    .hero-wrap { grid-template-columns: 1fr; }
    .hero-left { border-right: none; border-bottom: 0.5px solid var(--rule-med); min-height: unset; padding: 60px 32px 40px; }
    .hero-right { padding: 48px 32px 60px; }
    .hero-bg-text { display: none; }
    .editorial-grid { grid-template-columns: 1fr; }
    .ed-index { display: none; }
    .ed-col { padding: 48px 32px; border-right: none; border-bottom: 0.5px solid var(--rule-med); }
    .stats-band { grid-template-columns: repeat(2, 1fr); }
    .stat-cell { border-bottom: 0.5px solid var(--rule-med); }
    .process-header { grid-template-columns: 1fr; }
    .process-header-left { border-right: none; border-bottom: 0.5px solid var(--rule-med); padding: 48px 32px; }
    .process-header-right { padding: 40px 32px; }
    .process-card { width: 280px; padding: 40px 32px; }
    .services-header { padding: 48px 32px 40px; flex-direction: column; align-items: flex-start; }
    .bento-grid { grid-template-columns: 1fr; }
    .bento-cell { border-right: none !important; }
    .results-grid { grid-template-columns: 1fr; }
    .results-sidebar { position: static; border-right: none; border-bottom: 0.5px solid var(--rule-med); }
    .result-row { padding: 28px 28px; }
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
  }

  @media (max-width: 640px) {
    .stats-band { grid-template-columns: 1fr 1fr; }
    .footer-main { grid-template-columns: 1fr; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: "⚖", title: "Criminal Law", desc: "Bail, FIR quashing, white-collar crime defense, cybercrime & financial fraud litigation before High Court and Sessions Courts.", featured: false },
  { icon: "🏛", title: "Civil Litigation", desc: "Property disputes, injunction suits, partition matters, contractual recovery & civil appeals.", featured: false },
  { icon: "📜", title: "Writs & Constitutional", desc: "PIL matters, writ petitions, and challenges to governmental or statutory actions before constitutional courts.", featured: true },
  { icon: "🏠", title: "Property & Real Estate", desc: "Title verification, due diligence, sale drafting & real estate dispute resolution.", featured: false },
  { icon: "👨‍👩‍👧", title: "Family & Matrimonial", desc: "Divorce, child custody, guardianship, maintenance & domestic violence proceedings.", featured: false },
  { icon: "📊", title: "Arbitration & ADR", desc: "Arbitration, mediation, commercial settlement & enforcement of arbitral awards.", featured: false },
  { icon: "🏢", title: "Corporate Advisory", desc: "Contract drafting, compliance advisory, shareholder agreements & legal due diligence.", featured: false },
  { icon: "🛡", title: "Consumer Protection", desc: "Consumer complaints, deficiency claims, product liability disputes and compensation recovery.", featured: false },
  { icon: "🚗", title: "MCOP & Rent Control", desc: "Motor accident compensation claims, insurance disputes, eviction & fair rent proceedings.", featured: false },
];

const RESULTS = [
  { cat: "Criminal Law", title: "Anticipatory Bail Granted in 72 Hours", court: "Madras High Court · 2024", badge: "Bail Granted" },
  { cat: "Property Dispute", title: "Multi-Acre Title Dispute — Clear Decree", court: "District Court, Coimbatore · 2023", badge: "Decree in Favour" },
  { cat: "Consumer Protection", title: "₹18 Lakh Builder Compensation", court: "State Consumer Commission · 2024", badge: "₹18L Awarded" },
  { cat: "Family Law", title: "Full Child Custody Secured", court: "Family Court, Chennai · 2023", badge: "Custody Secured" },
  { cat: "Writ Petition", title: "Reinstatement of Wrongfully Terminated Employee", court: "Madras High Court · 2024", badge: "Reinstatement" },
  { cat: "MCOP", title: "₹42 Lakh Motor Accident Compensation", court: "Motor Accidents Tribunal · 2023", badge: "₹42L Awarded" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Listen & Analyse", body: "Every matter begins with an undivided consultation. We map the full legal landscape before forming any opinion — no assumptions, no templates." },
  { num: "02", title: "Advise & Plan", body: "A clear written legal opinion. Every option laid out with its risks, timeline, and cost. You decide — informed." },
  { num: "03", title: "Prepare & File", body: "Precision drafting of every petition, brief and supporting document. Filed correctly, structured for the forum, argued from day one." },
  { num: "04", title: "Advocate", body: "Focused courtroom advocacy. Every argument considered, every contingency prepared. Your case, our full attention." },
  { num: "05", title: "Resolve & Report", body: "Timely, decisive outcomes. Whether a verdict, settlement or injunction — we close every matter clearly and keep you informed to the last step." },
];

const FAQS = [
  { q: "What forums do you appear before?", a: "We regularly appear before the Madras High Court, District Courts, Metropolitan Courts, Tribunals, and Consumer Disputes Redressal Commissions across Tamil Nadu." },
  { q: "Why choose AGD Law Associates?", a: "We are a boutique firm — which means personalized attention, direct access to counsel, and no file being handed to a junior without your knowledge. Ethical, transparent, and efficient." },
  { q: "What is your approach to a new matter?", a: "Every matter begins with a detailed consultation. We provide a written legal opinion, a proposed timeline, and an honest assessment of outcomes before filing anything." },
  { q: "What are your office hours?", a: "Monday to Friday: 10:00 AM – 6:30 PM. Saturday: 11:00 AM – 5:00 PM. Second and last Saturdays are holidays." },
  { q: "Where do you have active presence?", a: "Chennai, Tambaram, Avadi, Coimbatore, Tiruppur, Bangalore, and districts including Chengalpattu, Tiruvallur, Kancheepuram, and Dindigul." },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────

function useFade(threshold = 0.1) {
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
  const [ref, vis] = useFade(0.08);
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
    { href: "#about", label: "About" },
    { href: "#process", label: "Approach" },
    { href: "#practice", label: "Practice" },
    { href: "#results", label: "Results" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`hdr${scrolled ? " shadow" : ""}`}>
        <div className="hdr-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <div className="logo-wordmark">AGD Law Associates<br /><span className="logo-sub">Advocates & Legal Consultants</span></div>
          </Link>
          <nav className="nav-links">
            {links.map(l => <a key={l.href} href={l.href} className="nav-a">{l.label}</a>)}
            <a href="tel:+919994388855" className="nav-cta">+91 99943 88855</a>
          </nav>
          {/* Mobile toggle */}
          <button onClick={() => setMobOpen(v => !v)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6 }}
            className="mob-hdr-btn">
            <style>{`.mob-hdr-btn { display: flex !important; flex-direction: column; gap: 5px; } @media(min-width:1100px){.mob-hdr-btn{display:none !important;}}`}</style>
            {mobOpen ? <X size={20} color="var(--ink)" /> : <>
              <span style={{ width: 22, height: 1.5, background: "var(--ink)", display: "block" }} />
              <span style={{ width: 14, height: 1.5, background: "var(--gold)", display: "block" }} />
              <span style={{ width: 22, height: 1.5, background: "var(--ink)", display: "block" }} />
            </>}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 850, background: "var(--linen)",
        paddingTop: 100, padding: "100px 32px 40px",
        display: "flex", flexDirection: "column",
        opacity: mobOpen ? 1 : 0, pointerEvents: mobOpen ? "auto" : "none",
        transform: mobOpen ? "translateX(0)" : "translateX(100%)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>
        {links.map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setMobOpen(false)} style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(1.8rem, 6vw, 2.8rem)", fontWeight: 400,
            color: "var(--ink)", textDecoration: "none",
            padding: "18px 0", borderBottom: "0.5px solid var(--rule-med)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            opacity: mobOpen ? 1 : 0,
            transform: mobOpen ? "translateX(0)" : "translateX(30px)",
            transition: `opacity 0.4s ${i * 60}ms, transform 0.4s ${i * 60}ms`,
          }}>
            {l.label}
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", fontFamily: "'Instrument Sans', sans-serif" }}>0{i + 1}</span>
          </a>
        ))}
        <a href="tel:+919994388855" style={{ marginTop: 36, display: "inline-block", background: "var(--ink)", color: "var(--linen)", fontFamily: "'Instrument Sans',sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 28px", textDecoration: "none", borderRadius: 1 }}>
          Call Now
        </a>
      </div>
    </>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ paddingTop: 68 }}>
      <div className="hero-wrap">
        {/* Left column — identity panel */}
        <div className="hero-left">
          <div>
            <Fade>
              <p className="label" style={{ marginBottom: 28 }}>Chennai · Tamil Nadu</p>
            </Fade>
            <Fade delay={80}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 48 }}>
                {["Madras High Court", "District Courts", "Consumer Commissions", "Tribunals"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.78rem", letterSpacing: "0.08em", color: "var(--ink-mid)", fontWeight: 400 }}>{f}</span>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          <Fade delay={200}>
            <div>
              <div style={{ width: 48, height: 0.5, background: "var(--gold)", marginBottom: 24, opacity: 0.7 }} />
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.85rem", fontStyle: "italic", color: "var(--ink-mid)", lineHeight: 1.6, marginBottom: 32 }}>
                "Precision-driven advocacy,<br />transparent communication,<br />timely resolution."
              </div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
                AGD Bala Kumar — Managing Counsel
              </div>
            </div>
          </Fade>

          <Fade delay={320}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 40 }}>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--ink)", color: "var(--linen)", fontFamily: "'Instrument Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "13px 24px", textDecoration: "none", borderRadius: 1, transition: "background 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--gold)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--ink)"}>
                Book Consultation <ArrowUpRight size={14} />
              </a>
              <a href="tel:+919994388855" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--ink-mid)", fontFamily: "'Instrument Sans',sans-serif", fontSize: "0.78rem", fontWeight: 400, letterSpacing: "0.06em", padding: "12px 0", textDecoration: "none", borderBottom: "0.5px solid var(--rule)", width: "fit-content", transition: "color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderBottomColor = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-mid)"; e.currentTarget.style.borderBottomColor = "var(--rule)"; }}>
                <Phone size={13} /> +91 99943 88855
              </a>
            </div>
          </Fade>
        </div>

        {/* Right column — hero statement */}
        <div className="hero-right">
          <div className="hero-bg-text" aria-hidden>LAW</div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <Fade delay={100}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
                <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>Boutique Litigation Practice</span>
                <div style={{ flex: 1, maxWidth: 60, height: 0.5, background: "var(--gold)", opacity: 0.5 }} />
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-dim)" }}>Est. 12+ Years</span>
              </div>
            </Fade>

            <h1 className="hero-h1">
              <Fade delay={160}>Your rights.</Fade>
              <Fade delay={240}><em>Our fight.</em></Fade>
              <Fade delay={320} style={{ fontSize: "0.5em", fontStyle: "normal", color: "var(--ink-dim)", marginTop: 8, display: "block", letterSpacing: "-0.01em" }}>
                Precision law across Tamil Nadu.
              </Fade>
            </h1>

            <Fade delay={440}>
              <p className="hero-body" style={{ marginTop: 40, paddingTop: 40, borderTop: "0.5px solid var(--rule-med)" }}>
                AGD Law Associates is a focused litigation and advisory practice led by Advocate AGD Bala Kumar — delivering rigorous legal representation across 9 practice areas with 12+ years of dedicated courtroom experience.
              </p>
            </Fade>
          </div>

          {/* Bottom stat row — pinned to bottom */}
          <Fade delay={560}>
            <div style={{ display: "flex", gap: "clamp(24px,4vw,64px)", marginTop: 64, paddingTop: 32, borderTop: "0.5px solid var(--rule)" }}>
              {[["12+", "Years"], ["500+", "Matters"], ["9", "Practice Areas"], ["6", "Cities"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 400, lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.02em" }}>{v}</div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-dim)", marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = ["Criminal Law", "Civil Litigation", "Property Disputes", "Family Law", "Writ Petitions", "Arbitration", "Corporate Advisory", "Consumer Protection", "Motor Accidents", "High Court Advocacy", "Pan-Tamil Nadu"];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} className="marquee-item">
            {t} <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about">
      <div className="editorial-grid">
        {/* Index column */}
        <div className="ed-index">
          <Fade>
            <div>
              <div className="ed-index-num">01</div>
              <div style={{ marginTop: 16, height: 0.5, background: "var(--rule-med)" }} />
            </div>
          </Fade>
          <Fade delay={100}>
            <div>
              <p className="label">About</p>
              <div style={{ marginTop: 16, width: 1, height: 80, background: "var(--rule-med)", marginLeft: 0 }} />
            </div>
          </Fade>
        </div>

        {/* Portrait column */}
        <div className="ed-col">
          <Fade>
            <div className="portrait-frame">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=700&h=950&fit=crop&crop=faces"
                alt="AGD Bala Kumar — Managing Counsel"
              />
              <div className="portrait-caption">
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-lt)", marginBottom: 4 }}>Managing Counsel</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", fontWeight: 400, color: "#fff" }}>AGD Bala Kumar</div>
              </div>
            </div>
          </Fade>
          <Fade delay={100} style={{ marginTop: 40 }}>
            <div style={{ padding: "20px", background: "var(--parch2)", borderLeft: "2px solid var(--gold)" }}>
              <p style={{ fontSize: "0.82rem", fontStyle: "italic", fontFamily: "'Libre Baskerville', serif", color: "var(--ink-mid)", lineHeight: 1.7 }}>
                "We are a boutique firm with personalized attention and no-file-left-with-junior guarantee."
              </p>
            </div>
          </Fade>
        </div>

        {/* Text column */}
        <div className="ed-col ed-col-last">
          <div>
            <Fade>
              <p className="label" style={{ marginBottom: 20 }}>The Firm</p>
              <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)", color: "var(--ink)", marginBottom: 32, lineHeight: 1.1, maxWidth: 420 }}>
                A practice built on <em style={{ color: "var(--gold)", fontStyle: "italic" }}>precision</em> and integrity.
              </h2>
            </Fade>
            <Fade delay={100}>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--ink-mid)", marginBottom: 24, fontWeight: 300, maxWidth: 440 }}>
                AGD Law Associates is a focused litigation and advisory practice based in Tamil Nadu, led by Advocate AGD Bala Kumar with over 12 years of courtroom experience spanning criminal, civil, constitutional, and corporate matters.
              </p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--ink-mid)", fontWeight: 300, maxWidth: 440 }}>
                Our vision: to become a trusted boutique law firm recognized for excellence, integrity, and client satisfaction — through transparent communication and timely resolution.
              </p>
            </Fade>
          </div>
          <Fade delay={200} style={{ marginTop: 56, paddingTop: 40, borderTop: "0.5px solid var(--rule-med)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Pan-Tamil Nadu + Inter-State Presence", "Direct Counsel Accessibility — Always", "Written Legal Opinions as Standard", "Transparent Fee Communication"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 16, height: 0.5, background: "var(--gold)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", color: "var(--ink-mid)", fontWeight: 300 }}>{f}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Band ────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <div className="stats-band">
      {[["12+", "Years of Active Practice"],["500+","Matters Handled"],["9","Practice Areas"],["6","Cities of Presence"]].map(([v, l], i) => (
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

// ─── Process ──────────────────────────────────────────────────────────────────

function Process() {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const t = trackRef.current; if (!t) return;
    setCanLeft(t.scrollLeft > 10);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 10);
  };

  const scroll = (dir) => {
    const t = trackRef.current; if (!t) return;
    t.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="process" className="process-section">
      <div className="process-header">
        <div className="process-header-left">
          <Fade>
            <p className="label" style={{ marginBottom: 16 }}>02 — Our Approach</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--ink)", lineHeight: 1.1, maxWidth: 380 }}>
              How we take a matter from first call to final resolution.
            </h2>
          </Fade>
        </div>
        <div className="process-header-right">
          <Fade>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--ink-mid)", fontWeight: 300, maxWidth: 400, marginBottom: 32 }}>
              Every case follows a disciplined, transparent process. No surprises. No gaps in communication. Five clear stages — every time.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ dir: -1, label: "←", active: canLeft }, { dir: 1, label: "→", active: canRight }].map(({ dir, label, active }) => (
                <button key={label} onClick={() => scroll(dir)} style={{
                  width: 40, height: 40, border: "0.5px solid var(--rule-med)", borderRadius: 1,
                  background: active ? "var(--ink)" : "transparent",
                  color: active ? "var(--linen)" : "var(--ink-dim)",
                  cursor: active ? "pointer" : "default", fontSize: "1rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}>{label}</button>
              ))}
            </div>
          </Fade>
        </div>
      </div>

      <div className="h-scroll-wrap" ref={trackRef} onScroll={checkScroll}>
        <div className="process-track">
          {PROCESS_STEPS.map((s, i) => (
            <Fade key={s.num} delay={i * 60}>
              <div className="process-card">
                <div className="process-card-num">{s.num}</div>
                <div>
                  <p className="label" style={{ marginBottom: 12 }}>Stage {s.num}</p>
                  <h3 className="process-card-title">{s.title}</h3>
                  <p className="process-card-body">{s.body}</p>
                </div>
                <div className="process-corner" />
              </div>
            </Fade>
          ))}
          {/* End cap */}
          <div style={{ width: 340, flexShrink: 0, borderRight: "0.5px solid var(--rule-med)", background: "var(--parch)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 420 }}>
            <a href="#contact" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 16, textDecoration: "none" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", border: "0.5px solid var(--rule-med)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", transition: "all 0.25s" }}>
                <ArrowUpRight size={20} />
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-mid)" }}>Begin Your Matter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Bento ───────────────────────────────────────────────────────────

function Services() {
  const bentoLayout = [
    // row 1: featured (wide), normal, normal
    { ...SERVICES[2], span: 1, noRight: false, noBottom: false, featuredOverride: true },  // Writs — featured
    { ...SERVICES[0], span: 1, noRight: false, noBottom: false },
    { ...SERVICES[1], span: 1, noRight: true, noBottom: false },
    // row 2
    { ...SERVICES[3], span: 1, noRight: false, noBottom: true },
    { ...SERVICES[4], span: 1, noRight: false, noBottom: true },
    { ...SERVICES[5], span: 1, noRight: true, noBottom: true },
    // row 3
    { ...SERVICES[6], span: 1, noRight: false, noBottom: true },
    { ...SERVICES[7], span: 1, noRight: false, noBottom: true },
    { ...SERVICES[8], span: 1, noRight: true, noBottom: true },
  ];

  return (
    <section id="practice" className="services-section">
      <div className="services-header">
        <Fade>
          <div>
            <p className="label" style={{ marginBottom: 16 }}>03 — Practice Areas</p>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "var(--ink)", lineHeight: 1.1, maxWidth: 440 }}>
              Nine disciplines.<br />One trusted firm.
            </h2>
          </div>
        </Fade>
        <Fade delay={80}>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--ink-mid)", fontWeight: 300, maxWidth: 380 }}>
            Deep expertise across the full spectrum of legal practice — from constitutional courts to consumer tribunals.
          </p>
        </Fade>
      </div>
      <div className="bento-grid">
        {bentoLayout.map((s, i) => (
          <Fade key={s.title} delay={i * 40}>
            <div className={`bento-cell${s.featuredOverride ? " featured" : ""}${s.noRight ? " no-right" : ""}${s.noBottom ? " no-bottom" : ""}`}>
              <div className="bento-icon">{s.icon}</div>
              <h3 className="bento-title">{s.title}</h3>
              <p className="bento-body">{s.desc}</p>
              <div className="bento-arrow"><ArrowUpRight size={16} /></div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────

function Results() {
  return (
    <section id="results" className="results-section">
      <div className="results-grid">
        <div className="results-sidebar">
          <Fade>
            <div>
              <p className="label" style={{ marginBottom: 20 }}>04 — Case Results</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1, marginBottom: 24 }}>
                Outcomes that speak.
              </h2>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--ink-mid)", fontWeight: 300 }}>
                A selection of representative outcomes from our litigation practice across Tamil Nadu.
              </p>
            </div>
          </Fade>
          <Fade delay={120}>
            <div style={{ marginTop: 40 }}>
              <div style={{ width: 48, height: 0.5, background: "var(--gold)", marginBottom: 16 }} />
              <p style={{ fontSize: "0.72rem", lineHeight: 1.7, color: "var(--ink-dim)", fontStyle: "italic", fontFamily: "'Libre Baskerville', serif" }}>
                Each matter is handled with the same rigour — whether a ₹500 complaint or a High Court writ.
              </p>
            </div>
          </Fade>
        </div>

        <div className="results-list">
          {RESULTS.map((r, i) => (
            <Fade key={r.title} delay={i * 60}>
              <div className="result-row">
                <div>
                  <div className="result-cat">{r.cat}</div>
                  <h3 className="result-title">{r.title}</h3>
                  <div className="result-court">{r.court}</div>
                </div>
                <span className="result-badge">{r.badge}</span>
              </div>
            </Fade>
          ))}
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
              <p className="label" style={{ marginBottom: 20 }}>05 — FAQ</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--ink)", lineHeight: 1.1, marginBottom: 24 }}>
                Common questions, clear answers.
              </h2>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--ink-mid)", fontWeight: 300 }}>
                Still have questions? Write to us or call directly — we respond within one business day.
              </p>
            </div>
          </Fade>
          <Fade delay={100} style={{ marginTop: 48 }}>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--ink)", fontFamily: "'Instrument Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", paddingBottom: 6, borderBottom: "0.5px solid var(--rule-med)", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "var(--rule-med)"; e.currentTarget.style.color = "var(--ink)"; }}>
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
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" />
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

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", matter: "", message: "" });
  const chg = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const send = () => {
    const t = `Hi AGD Law Associates,\nName: ${form.name}\nPhone: ${form.phone}\nMatter: ${form.matter}\n\n${form.message}`;
    window.open(`https://wa.me/919994388855?text=${encodeURIComponent(t)}`, "_blank", "noopener");
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-grid">
        <div className="contact-left">
          <div>
            <Fade>
              <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold-lt)", marginBottom: 20 }}>06 — Contact</p>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "var(--linen)", lineHeight: 1.1, marginBottom: 32 }}>
                Your first consultation starts here.
              </h2>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(246,241,233,0.6)", fontWeight: 300, maxWidth: 380 }}>
                Reach out via phone, email, or WhatsApp. We respond within one business day and schedule consultations at your convenience.
              </p>
            </Fade>
          </div>
          <Fade delay={100}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { Icon: PhoneCall, label: "Phone", val: "+91 99943 88855", href: "tel:+919994388855" },
                { Icon: Mail, label: "Email", val: "agdlawassociatesoffice@gmail.com", href: "mailto:agdlawassociatesoffice@gmail.com" },
                { Icon: MapPin, label: "Base", val: "Chennai, Tamil Nadu — Pan-TN Presence", href: "#" },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href} className="contact-info-row">
                  <div className="contact-info-icon"><Icon size={14} /></div>
                  <div>
                    <div style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-lt)", opacity: 0.7, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: "0.88rem", color: "var(--linen)", fontWeight: 300 }}>{val}</div>
                  </div>
                </a>
              ))}
              <div style={{ marginTop: 36, fontSize: "0.72rem", color: "rgba(246,241,233,0.4)", letterSpacing: "0.08em", lineHeight: 1.7 }}>
                Mon–Fri 10AM–6:30PM · Sat 11AM–5PM<br />
                2nd & Last Saturdays: Closed
              </div>
            </div>
          </Fade>
        </div>

        <div className="contact-right">
          <Fade>
            <p className="label" style={{ marginBottom: 40 }}>Send a Query</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {[
                { n: "name", l: "Full Name", p: "Your name" },
                { n: "phone", l: "Phone Number", p: "+91 XXXXX XXXXX" },
                { n: "matter", l: "Matter Type", p: "e.g. Criminal, Property, Family…" },
              ].map(f => (
                <div key={f.n}>
                  <label className="field-label">{f.l}</label>
                  <input name={f.n} value={form[f.n]} onChange={chg} placeholder={f.p} className="field-input" />
                </div>
              ))}
              <div>
                <label className="field-label">Brief Description</label>
                <textarea name="message" value={form.message} onChange={chg} placeholder="Describe your situation briefly…" rows={4} className="field-textarea" />
              </div>
              <div>
                <button onClick={send} className="submit-btn">
                  Send via WhatsApp <Send size={13} />
                </button>
                <p style={{ marginTop: 16, fontSize: "0.72rem", color: "var(--ink-dim)", lineHeight: 1.6 }}>
                  Your query will open in WhatsApp for a direct conversation with our team.
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
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>AGD Law Associates</div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>Advocates & Legal Consultants</div>
          <p style={{ fontSize: "0.83rem", lineHeight: 1.75, color: "var(--ink-mid)", fontWeight: 300, maxWidth: 280 }}>
            A boutique litigation and advisory practice serving clients across Tamil Nadu with precision, transparency, and integrity.
          </p>
          <div style={{ marginTop: 28 }}>
            <a href="https://www.agdlawassociates.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "var(--gold)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, letterSpacing: "0.06em" }}>
              www.agdlawassociates.in <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        {[
          { head: "Navigate", links: [["About", "#about"], ["Approach", "#process"], ["Practice Areas", "#practice"], ["Results", "#results"], ["Contact", "#contact"]] },
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
        <p style={{ fontSize: "0.72rem", color: "var(--ink-dim)" }}>© {new Date().getFullYear()} AGD Law Associates. All rights reserved.</p>
        <p style={{ fontSize: "0.72rem", color: "var(--ink-dim)" }}>Mon–Fri 10AM–6:30PM · Sat 11AM–5PM</p>
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
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--linen)" }}>AGD Legal Desk</div>
            <div style={{ fontSize: "0.62rem", color: "var(--gold-lt)", marginTop: 2 }}>Replies during office hours</div>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-dim)" }}><X size={15} /></button>
        </div>
        <div style={{ padding: 18 }}>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--ink-mid)", marginBottom: 14, fontWeight: 300 }}>
            Select a quick message or type your query below.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {QUICK.map(q => (
              <button key={q} onClick={() => setMsg(q)} style={{ fontSize: "0.7rem", padding: "6px 12px", background: "var(--parch)", border: "0.5px solid var(--rule-med)", color: "var(--ink-mid)", borderRadius: 1, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--ink)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--rule-med)"; e.currentTarget.style.color = "var(--ink-mid)"; }}>
                {q}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={2} placeholder="Type your message…"
              style={{ flex: 1, resize: "none", background: "transparent", border: "0.5px solid var(--rule-med)", padding: "8px 10px", color: "var(--ink)", fontSize: "0.85rem", fontFamily: "'Instrument Sans', sans-serif", outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "var(--gold)"}
              onBlur={e => e.target.style.borderColor = "var(--rule-med)"}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
            <button onClick={() => send()} style={{ width: 38, background: "var(--ink)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--linen)", borderRadius: 1, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--ink)"}>
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>
      <button className="wa-btn" onClick={() => setOpen(v => !v)}>
        {open ? <X size={18} /> : <MessageCircle size={20} />}
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
        <Marquee />
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