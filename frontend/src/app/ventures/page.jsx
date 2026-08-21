"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { AGDLogoImg } from "@/components/AGDLogoImg";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  Shield,
  BookOpen,
  Scale,
  Menu,
  X,
  CheckCircle,
  Send,
  MessageCircle,
} from "lucide-react";

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const venturesPhoneNumbers = [
  { display: "+91 99943 88855", tel: "+919994388855" },
  { display: "+91 79049 37891", tel: "+917904937891" },
  { display: "+91 74492 66124", tel: "+917449266124" },
];

const venturesServiceGroups = [
  {
    icon: Shield,
    title: "Due Diligence & Title Scrutiny",
    items: [
      "Property Due Diligence",
      "Complete Title Investigation",
      "Parent Document Verification",
      "Ownership Analysis",
      "Encumbrance Verification",
      "Litigation Search",
      "Revenue Record Verification",
      "Approval Verification",
      "Land Use Verification",
      "Legal Due Diligence Report",
    ],
  },
  {
    icon: BookOpen,
    title: "Registrations & Record Verification",
    items: [
      "Sale, Gift, Settlement, Release, Partition, Lease, Mortgage, MODT, and POA Registrations",
      "Patta, Chitta, Adangal, FMB, A-Register, TSLR, and CMDA, DTCP, RERA Verification",
    ],
  },
];

const venturesTeam = [
  { name: "AGD Bala Kumar", role: "Founder / Lead Advocate" },
  { name: "A. Prabhakaran", role: "Legal Head" },
  { name: "M. Ravi Kumar", role: "Asst. Legal Head" },
  { name: "A. Yokesh Kumar", role: "Associate Advocate" },
  { name: "K. Raj Kumar", role: "Associate Advocate" },
  { name: "D. Pradeep Kumar", role: "Associate Advocate" },
  { name: "S. Sivadharshini", role: "Associate Advocate" },
  { name: "V. Latha", role: "Non Legal / Accountant" },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Legally Backed",
    text: "Every verification is performed under the supervision of qualified advocates from AGD Law Associates.",
  },
  {
    icon: CheckCircle,
    title: "End-to-End Service",
    text: "From initial title search to final registration, we handle the entire property transaction lifecycle.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Reports",
    text: "Detailed legal due diligence reports with clear findings, risk flags, and actionable recommendations.",
  },
  {
    icon: Scale,
    title: "Trusted Division",
    text: "A dedicated paralegal arm of AGD Law Associates, serving buyers, sellers, families, and businesses.",
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const VenturesStyles = () => (
  <style>{`
    :root {
      --ink: #0b0b0b;
      --paper: #ffffff;
      --sage: #c5dfc0;
      --sage-dark: #3a5c3d;
      --sage-pale: #f0f7ee;
      --muted: #6b7280;
      --border: rgba(197,223,192,0.35);
      --surface-border: rgba(197,223,192,0.28);
      --text-body: rgba(255,255,255,0.84);
      --text-muted: rgba(255,255,255,0.72);
      --text-subtle: rgba(255,255,255,0.62);
      --header-offset: 90px;
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
    .vfixed-bg {
      position: fixed; inset: 0; z-index: 0;
      background: #0b0b0b; overflow: hidden; pointer-events: none;
    }
    .vfixed-bg-glow {
      position: absolute; top: 15%; right: -8%;
      width: 700px; height: 700px;
      background: radial-gradient(circle, rgba(197,223,192,0.09) 0%, transparent 70%);
      border-radius: 50%;
    }
    .vfixed-bg-glow2 {
      position: absolute; bottom: 10%; left: -5%;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(197,223,192,0.06) 0%, transparent 70%);
      border-radius: 50%;
    }
    .vfixed-bg-vignette {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.6) 100%);
    }

    /* ── Scroll Layer ── */
    .vscroll-layer { position: relative; z-index: 10; }
    section[id] { scroll-margin-top: var(--header-offset); }
    main { padding-bottom: clamp(80px, 12vh, 160px); }

    /* ── Container ── */
    .vcontainer { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

    /* ── Labels ── */
    .vsection-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--sage);
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 5px 14px;
    }
    .vsection-label::before {
      content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--sage);
    }

    /* ── Buttons ── */
    .vbtn-primary {
      display: inline-flex; align-items: center; gap: 9px;
      background: var(--sage); color: var(--ink);
      font-size: 0.85rem; font-weight: 700;
      padding: 13px 24px; border-radius: 100px;
      transition: all 0.25s; letter-spacing: 0.03em; white-space: nowrap;
    }
    .vbtn-primary:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(197,223,192,0.3); }
    .vbtn-ghost {
      display: inline-flex; align-items: center; gap: 9px;
      color: rgba(255,255,255,0.6); font-size: 0.85rem; font-weight: 500;
      padding: 13px 24px; border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.15);
      transition: all 0.25s; white-space: nowrap;
    }
    .vbtn-ghost:hover { border-color: var(--sage); color: var(--sage); }
    .vbtn-back {
      display: inline-flex; align-items: center; gap: 8px;
      color: rgba(255,255,255,0.5); font-size: 0.78rem; font-weight: 500;
      padding: 7px 14px; border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.25s; white-space: nowrap;
    }
    .vbtn-back:hover { border-color: var(--sage); color: var(--sage); }

    /* ── Header ── */
    .vheader {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      transition: background 0.4s, backdrop-filter 0.4s;
    }
    .vheader.scrolled { background: rgba(11,11,11,0.9); backdrop-filter: blur(20px); }
    .vheader-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 90px; gap: 16px; position: relative;
    }
    .vlogo-mark {
      font-family: var(--font-cormorant), Georgia, serif;
      font-size: 1.1rem; font-weight: 500; color: #fff;
      display: flex; align-items: center; gap: 10px;
    }
    .vlogo-sub {
      font-size: 0.58rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.18em; color: var(--sage);
      background: rgba(197,223,192,0.1); border: 1px solid rgba(197,223,192,0.2);
      border-radius: 100px; padding: 3px 10px;
    }
    .vheader-right { display: flex; align-items: center; gap: 12px; }
    .vmenu-btn {
      display: none; align-items: center; justify-content: center;
      width: 38px; height: 38px; border-radius: 9px;
      border: 1px solid rgba(197,223,192,0.2); background: transparent;
      color: #fff; cursor: pointer;
    }

    /* ── Mobile Panel ── */
    .vmobile-panel {
      position: fixed; inset: 0; z-index: 800;
      background: var(--ink); display: flex; flex-direction: column; overflow-y: auto;
    }
    .vmobile-nav-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 0; border-bottom: 1px solid rgba(197,223,192,0.08);
      font-family: var(--font-cormorant), serif; font-size: 2rem;
      color: rgba(255,255,255,0.75); transition: color 0.2s; text-decoration: none;
      animation: vmobileNavIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
    }
    .vmobile-nav-item:hover { color: var(--sage); }
    @keyframes vmobileNavIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .vmobile-num { font-family: var(--font-dm), sans-serif; font-size: 0.68rem; color: rgba(197,223,192,0.35); letter-spacing: 0.1em; }

    /* ── Ticker ── */
    .vticker-wrap { background: var(--sage); overflow: hidden; height: 36px; display: flex; align-items: center; }
    .vticker-track { display: flex; gap: 0; white-space: nowrap; animation: vtickMove 24s linear infinite; }
    @keyframes vtickMove { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .vticker-item {
      display: inline-flex; align-items: center; gap: 16px;
      font-size: 0.68rem; font-weight: 700; color: var(--ink);
      text-transform: uppercase; letter-spacing: 0.14em; padding: 0 28px;
    }
    .vticker-sep { opacity: 0.35; }

    /* ── Panel Surfaces ── */
    .vpanel { background: linear-gradient(180deg, rgba(7,9,8,0.5) 0%, rgba(7,9,8,0.58) 100%); }
    .vpanel-dark { background: linear-gradient(180deg, rgba(4,6,5,0.66) 0%, rgba(4,6,5,0.74) 100%); }

    /* ── Hero ── */
    .vhero {
      min-height: 100svh;
      display: flex; align-items: center;
      padding: clamp(110px, 16vh, 150px) 0 80px;
      position: relative; overflow: hidden;
    }
    .vhero-ornament {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 700px; height: 700px;
      border: 1px solid rgba(197,223,192,0.05);
      border-radius: 50%; pointer-events: none;
    }
    .vhero-ornament::after {
      content: ''; position: absolute; inset: 60px;
      border: 1px solid rgba(197,223,192,0.03);
      border-radius: 50%;
    }
    .vhero-content {
      text-align: center; max-width: 920px; margin: 0 auto;
      display: flex; flex-direction: column; align-items: center; gap: 0;
    }
    .vhero-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 0.66rem; font-weight: 600; letter-spacing: 0.22em;
      text-transform: uppercase; color: var(--sage);
      border: 1px solid rgba(197,223,192,0.22);
      background: rgba(12,16,14,0.5);
      border-radius: 100px; padding: 7px 16px; margin-bottom: 24px;
    }
    .vhero-title {
      font-size: clamp(3rem, 6vw, 6.2rem);
      color: #fff; line-height: 0.92;
      letter-spacing: -0.03em; margin-bottom: 10px;
    }
    .vhero-title em { color: var(--sage); font-style: italic; }
    .vhero-sub {
      font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.26em; color: rgba(255,255,255,0.38); margin-bottom: 24px;
    }
    .vhero-tagline {
      font-size: clamp(1rem, 1.1vw, 1.1rem); color: var(--text-body);
      line-height: 1.85; max-width: 600px; margin: 0 auto 32px;
      font-family: var(--font-dm), sans-serif;
    }
    .vhero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .vhero-stats-row {
      display: flex; justify-content: center; margin-top: 52px;
      border: 1px solid var(--surface-border);
      background: linear-gradient(180deg, rgba(9,12,11,0.7) 0%, rgba(9,12,11,0.5) 100%);
      backdrop-filter: blur(14px);
      border-radius: 24px; overflow: hidden; width: fit-content;
      margin-left: auto; margin-right: auto;
    }
    .vhero-stat {
      min-width: 140px; padding: 20px 26px; border-right: 1px solid var(--surface-border);
    }
    .vhero-stat:last-child { border-right: none; }
    .vhero-stat-num { font-family: var(--font-cormorant), serif; font-size: 2rem; color: var(--sage); line-height: 0.95; }
    .vhero-stat-lbl { font-size: 0.64rem; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.13em; margin-top: 8px; }

    /* ── Bridge Banner ── */
    .vbridge {
      background: linear-gradient(90deg, rgba(197,223,192,0.08) 0%, rgba(197,223,192,0.04) 100%);
      border-top: 1px solid rgba(197,223,192,0.14);
      border-bottom: 1px solid rgba(197,223,192,0.14);
      padding: 14px 0;
    }
    .vbridge-inner { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
    .vbridge-text { font-size: 0.8rem; color: rgba(255,255,255,0.55); }
    .vbridge-link {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 0.8rem; font-weight: 600; color: var(--sage); transition: color 0.2s;
    }
    .vbridge-link:hover { color: #fff; }
    .vbridge-sep { width: 4px; height: 4px; border-radius: 50%; background: rgba(197,223,192,0.25); }

    /* ── About ── */
    .vabout-inner {
      padding: clamp(4rem, 7vw, 8rem) 0;
      display: grid; grid-template-columns: 1.2fr 0.8fr;
      gap: 48px; align-items: start;
      max-width: 1080px; margin: 0 auto;
    }
    .vabout-eyebrow-row { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
    .vabout-eyebrow-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(197,223,192,0.5), transparent); }
    .vabout-title {
      font-size: clamp(2.4rem, 3.8vw, 4.2rem);
      line-height: 1.02; letter-spacing: -0.015em; color: #fff; margin-bottom: 20px;
    }
    .vabout-title em { color: var(--sage); font-style: italic; }
    .vabout-lead {
      font-size: 1rem; line-height: 1.9; color: var(--text-body);
      position: relative; padding-left: 20px; margin-bottom: 16px;
    }
    .vabout-lead::before {
      content: ''; position: absolute; left: 0; top: 6px; bottom: 6px;
      width: 2px; border-radius: 2px;
      background: linear-gradient(180deg, var(--sage), rgba(197,223,192,0.2));
    }
    .vabout-body { font-size: 0.9rem; line-height: 1.9; color: var(--text-muted); margin-bottom: 28px; }
    .vabout-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
    .vabout-sidebar { display: flex; flex-direction: column; gap: 14px; }

    /* ── Why Cards ── */
    .vwhy-card {
      padding: 20px; border: 1px solid rgba(197,223,192,0.14);
      background: rgba(12,16,14,0.55); border-radius: 12px;
      display: flex; gap: 14px; align-items: flex-start;
      transition: background 0.25s, border-color 0.25s, transform 0.25s;
    }
    .vwhy-card:hover { background: rgba(18,24,21,0.8); border-color: rgba(197,223,192,0.26); transform: translateY(-2px); }
    .vwhy-icon {
      width: 38px; height: 38px; border-radius: 9px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(197,223,192,0.09); color: var(--sage);
      border: 1px solid rgba(197,223,192,0.18);
    }
    .vwhy-title { font-family: var(--font-cormorant), serif; font-size: 1.15rem; color: #fff; margin-bottom: 4px; }
    .vwhy-text { font-size: 0.82rem; line-height: 1.7; color: var(--text-muted); }

    /* ── Services ── */
    .vservices-inner { padding: clamp(4rem, 6vw, 7rem) 0; max-width: 1080px; margin: 0 auto; }
    .vservices-head {
      display: flex; align-items: flex-end; justify-content: space-between;
      gap: 24px; margin-bottom: clamp(2rem, 4vw, 3.5rem);
      padding-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
      border-bottom: 1px solid rgba(197,223,192,0.16); flex-wrap: wrap;
    }
    .vservices-title { font-size: clamp(2.2rem, 3.5vw, 3.6rem); color: #fff; letter-spacing: -0.01em; margin-top: 14px; }
    .vservices-title em { color: var(--sage); font-style: italic; }
    .vservices-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .vservice-card {
      display: flex; flex-direction: column; gap: 18px;
      padding: 26px 24px 22px; border-radius: 12px;
      border: 1px solid rgba(197,223,192,0.14);
      background: rgba(12,16,14,0.58);
      transition: background 0.25s, border-color 0.25s, transform 0.25s;
    }
    .vservice-card:hover { background: rgba(18,24,21,0.78); border-color: rgba(197,223,192,0.28); transform: translateY(-3px); }
    .vservice-head { display: flex; align-items: center; gap: 14px; }
    .vservice-icon {
      width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: var(--sage); background: rgba(197,223,192,0.09);
      border: 1px solid rgba(197,223,192,0.18);
    }
    .vservice-title { font-family: var(--font-cormorant), Georgia, serif; font-size: 1.4rem; line-height: 1.15; color: #fff; }
    .vservice-list { display: flex; flex-direction: column; gap: 10px; }
    .vservice-item {
      display: grid; grid-template-columns: auto minmax(0, 1fr);
      gap: 10px; align-items: start;
      font-size: 0.86rem; line-height: 1.7; color: var(--text-muted);
    }
    .vservice-bullet { width: 6px; height: 6px; margin-top: 0.5rem; border-radius: 50%; background: var(--sage); opacity: 0.9; flex-shrink: 0; }

    /* ── Contact + Team ── */
    .vcontact-team-inner {
      padding: clamp(4rem, 6vw, 7rem) 0;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 24px; align-items: start;
      max-width: 1080px; margin: 0 auto;
    }
    .vcontact-card {
      display: flex; flex-direction: column; gap: 20px;
      padding: 28px; border-radius: 14px;
      border: 1px solid rgba(197,223,192,0.2);
      background: linear-gradient(135deg, rgba(197,223,192,0.08) 0%, rgba(12,16,14,0.72) 72%);
    }
    .vcontact-head { display: flex; flex-direction: column; gap: 6px; }
    .vcontact-kicker { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(197,223,192,0.6); }
    .vcontact-title { font-family: var(--font-cormorant), Georgia, serif; font-size: 2rem; line-height: 1; color: #fff; }
    .vcontact-subtitle { font-size: 0.7rem; line-height: 1.8; text-transform: uppercase; letter-spacing: 0.13em; color: rgba(197,223,192,0.6); }
    .vcontact-list { display: flex; flex-direction: column; gap: 16px; }
    .vcontact-row { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 12px; align-items: start; }
    .vcontact-icon {
      width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: var(--sage); background: rgba(197,223,192,0.09);
      border: 1px solid rgba(197,223,192,0.16);
    }
    .vcontact-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(197,223,192,0.55); margin-bottom: 5px; }
    .vcontact-text, .vcontact-link { font-size: 0.88rem; line-height: 1.75; color: var(--text-body); }
    .vcontact-link { transition: color 0.2s; }
    .vcontact-link:hover { color: var(--sage); }
    .vcontact-links { display: flex; flex-direction: column; gap: 3px; }

    /* ── Team Card ── */
    .vteam-card {
      display: flex; flex-direction: column; gap: 18px;
      padding: 28px; border-radius: 14px;
      border: 1px solid rgba(197,223,192,0.14);
      background: rgba(12,16,14,0.55);
    }
    .vteam-head {
      display: flex; flex-direction: column; gap: 6px;
      padding-bottom: 16px; border-bottom: 1px solid rgba(197,223,192,0.12);
    }
    .vteam-title { font-family: var(--font-cormorant), Georgia, serif; font-size: 1.7rem; line-height: 1.1; color: #fff; }
    .vteam-subtitle { font-size: 0.7rem; line-height: 1.7; text-transform: uppercase; letter-spacing: 0.13em; color: rgba(197,223,192,0.6); }
    .vteam-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 16px; }
    .vteam-row { display: flex; flex-direction: column; gap: 3px; padding: 12px 0; border-bottom: 1px solid rgba(197,223,192,0.08); }
    .vteam-name { font-size: 0.94rem; line-height: 1.45; color: #fff; }
    .vteam-role { font-size: 0.7rem; line-height: 1.6; text-transform: uppercase; letter-spacing: 0.11em; color: rgba(197,223,192,0.62); }

    /* ── Bottom / Vision ── */
    .vbottom-inner {
      padding: 0 0 clamp(4rem, 6vw, 7rem);
      max-width: 1080px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;
    }
    .vnote-card {
      display: flex; flex-direction: column; gap: 14px;
      padding: 26px; border-radius: 12px;
      border: 1px solid rgba(197,223,192,0.14);
      background: rgba(255,255,255,0.025);
    }
    .vnote-label { font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(197,223,192,0.65); }
    .vnote-text { font-size: 0.9rem; line-height: 1.85; color: var(--text-body); }
    .vnote-commitment { font-family: var(--font-cormorant), Georgia, serif; font-size: 1.45rem; line-height: 1.25; color: #fff; }

    /* ── Footer ── */
    .vfooter { border-top: 1px solid rgba(197,223,192,0.1); padding: 32px 0; }
    .vfooter-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
    .vfooter-brand { display: flex; flex-direction: column; gap: 6px; }
    .vfooter-name { font-family: var(--font-cormorant), serif; font-size: 1.2rem; color: #fff; }
    .vfooter-note { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
    .vfooter-note a { color: var(--sage); transition: color 0.2s; }
    .vfooter-note a:hover { color: #fff; }
    .vfooter-copy { font-size: 0.74rem; color: rgba(255,255,255,0.22); }

    /* ── WhatsApp Float ── */
    .vwa-fab { position: fixed; bottom: 24px; right: 24px; z-index: 980; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; pointer-events: none; }
    .vwa-panel { width: min(90vw, 360px); border-radius: 20px; overflow: hidden; background: #fff; border: 1px solid var(--border); box-shadow: 0 24px 64px rgba(11,11,11,0.18); transition: all 0.35s cubic-bezier(0.22,1,0.36,1); transform-origin: bottom right; }
    .vwa-panel.closed { opacity: 0; transform: scale(0.9) translateY(16px); pointer-events: none; }
    .vwa-panel.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
    .vwa-header { background: var(--ink); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
    .vwa-header-info { display: flex; align-items: center; gap: 10px; }
    .vwa-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--sage); color: var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .vwa-name { font-size: 0.86rem; font-weight: 600; color: #fff; }
    .vwa-status { font-size: 0.68rem; color: var(--sage); }
    .vwa-close { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.55); display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer; background: none; }
    .vwa-close:hover { border-color: var(--sage); color: var(--sage); }
    .vwa-body { padding: 16px; background: #f8fbf7; display: flex; flex-direction: column; gap: 12px; }
    .vwa-bubble { background: #fff; border: 1px solid var(--border); border-radius: 16px; border-top-left-radius: 4px; padding: 12px 14px; font-size: 0.84rem; line-height: 1.6; color: var(--ink); max-width: 90%; }
    .vwa-quick { display: flex; flex-wrap: wrap; gap: 6px; }
    .vwa-quick-btn { font-size: 0.74rem; padding: 6px 11px; border-radius: 100px; border: 1px solid var(--border); background: #fff; color: var(--ink); transition: all 0.2s; text-align: left; cursor: pointer; }
    .vwa-quick-btn:hover, .vwa-quick-btn.selected { background: var(--sage); border-color: var(--sage); }
    .vwa-input-row { display: flex; gap: 8px; align-items: flex-end; }
    .vwa-textarea { flex: 1; resize: none; border: 1px solid var(--border); border-radius: 12px; padding: 9px 13px; font-size: 0.84rem; font-family: inherit; color: var(--ink); background: #fff; transition: border-color 0.2s; }
    .vwa-textarea:focus { outline: none; border-color: var(--sage); }
    .vwa-send { width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0; background: var(--sage); color: var(--ink); display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer; border: none; }
    .vwa-send:hover { background: var(--ink); color: var(--sage); }
    .vwa-label { background: var(--ink); color: var(--sage); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 5px 13px; border-radius: 100px; font-weight: 700; pointer-events: auto; }
    .vwa-toggle { width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(11,11,11,0.3); transition: all 0.3s; border: none; pointer-events: auto; cursor: pointer; }
    .vwa-toggle.closed { background: var(--sage); color: var(--ink); }
    .vwa-toggle.closed:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 18px 40px rgba(197,223,192,0.4); }
    .vwa-toggle.open-state { background: var(--ink); color: var(--sage); }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .vabout-inner { grid-template-columns: 1fr; }
      .vcontact-team-inner { grid-template-columns: 1fr; }
      .vmenu-btn { display: inline-flex !important; }
      .vnav-desktop { display: none !important; }
      .vheader-cta-desktop { display: none !important; }
    }
    @media (max-width: 768px) {
      .vservices-grid { grid-template-columns: 1fr; }
      .vteam-list { grid-template-columns: 1fr; }
      .vbottom-inner { grid-template-columns: 1fr; }
      .vhero-stats-row { flex-wrap: wrap; }
    }
    @media (max-width: 640px) {
      .vhero-title { font-size: clamp(2.8rem, 13vw, 4rem); }
      .vhero-stat { flex: 1 1 50%; text-align: center; min-width: 0; }
      .vhero-stats-row { width: 100%; }
      .vabout-ctas { flex-direction: column; }
      .vservices-head { flex-direction: column; align-items: flex-start; }
    }
    @media (min-width: 1025px) {
      .vmobile-panel { display: none; }
    }
  `}</style>
);

// ─── Fixed Background ─────────────────────────────────────────────────────────

function VFixedBackground() {
  return (
    <div className="vfixed-bg" aria-hidden="true">
      <div className="vfixed-bg-glow" />
      <div className="vfixed-bg-glow2" />
      <div className="vfixed-bg-vignette" />
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function VHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Our Team" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`vheader ${scrolled ? "scrolled" : ""}`}
        style={{ display: menuOpen ? "none" : "block" }}
      >
        <div className="vcontainer">
          <div className="vheader-inner">
            <Link href="/" className="vbtn-back" aria-label="Back to AGD Law Associates">
              <ArrowLeft size={13} /> AGD Law Associates
            </Link>

            <div
              className="vlogo-mark"
              style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
            >
              <AGDLogoImg size={52} />
              <div>
                <div style={{ lineHeight: 1.1 }}>AGD Law Ventures</div>
                <div className="vlogo-sub">Paralegal Division</div>
              </div>
            </div>

            <div className="vheader-right">
              <nav
                className="vnav-desktop"
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
                aria-label="Ventures navigation"
              >
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    style={{
                      fontSize: "0.8rem", fontWeight: 500,
                      color: "rgba(255,255,255,0.72)",
                      padding: "8px 13px", borderRadius: "8px",
                      transition: "color 0.2s, background 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "var(--sage)";
                      e.currentTarget.style.background = "rgba(197,223,192,0.07)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.72)";
                      e.currentTarget.style.background = "";
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <a
                href={`tel:${venturesPhoneNumbers[0].tel}`}
                className="vbtn-primary vheader-cta-desktop"
                style={{ display: "inline-flex" }}
              >
                <Phone size={13} /> Call Now
              </a>
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="vmenu-btn"
              >
                {menuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="vmobile-panel">
          <div
            className="vcontainer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "90px" }}
          >
            <span className="vlogo-mark">
              <AGDLogoImg size={48} />
              AGD Law Ventures
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{
                width: "38px", height: "38px", border: "1px solid rgba(197,223,192,0.2)",
                borderRadius: "9px", background: "transparent", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <X size={17} />
            </button>
          </div>
          <nav className="vcontainer" style={{ flex: 1, paddingTop: "16px" }}>
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="vmobile-nav-item"
                style={{ animationDelay: `${0.06 + i * 0.06}s` }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{l.label}</span>
                <span className="vmobile-num">0{i + 1}</span>
              </a>
            ))}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                marginTop: "24px", padding: "14px", borderRadius: "12px",
                border: "1px solid rgba(197,223,192,0.18)", color: "var(--sage)",
                fontWeight: "600", fontSize: "0.84rem",
              }}
            >
              <ArrowLeft size={14} /> Back to AGD Law Associates
            </Link>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                marginTop: "12px", padding: "16px", borderRadius: "14px",
                background: "#c5dfc0", color: "#0b0b0b",
                fontWeight: "700", fontSize: "0.88rem", letterSpacing: "0.06em",
                textDecoration: "none", textTransform: "uppercase",
              }}
            >
              Call Now <Phone size={14} />
            </a>
          </nav>
          <div
            className="vcontainer"
            style={{ paddingBottom: "24px", paddingTop: "24px", borderTop: "1px solid rgba(197,223,192,0.08)" }}
          >
            <p style={{ fontSize: "0.7rem", color: "rgba(197,223,192,0.3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              A Paralegal Division of AGD Law Associates
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function VTicker() {
  const items = [
    "Property Due Diligence", "Title Scrutiny", "Registration Services",
    "Document Verification", "Encumbrance Check", "Legal Due Diligence Report",
    "RERA Verification", "Patta & Chitta Verification",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="vticker-wrap">
      <div className="vticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="vticker-item">
            {item}<span className="vticker-sep"> ◆ </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Bridge Banner ────────────────────────────────────────────────────────────

function VBridge() {
  return (
    <div className="vbridge">
      <div className="vcontainer">
        <div className="vbridge-inner">
          <span className="vbridge-text">A dedicated paralegal division of AGD Law Associates</span>
          <span className="vbridge-sep" />
          <Link href="/" className="vbridge-link">
            Visit the Law Firm <ArrowRight size={12} />
          </Link>
          <span className="vbridge-sep" />
          <span className="vbridge-text">Full legal muscle, behind every property deal</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function VHero() {
  return (
    <section className="vhero" id="hero">
      <div className="vhero-ornament" aria-hidden="true" />
      <div className="vcontainer">
        <div className="vhero-content">
          <div className="vhero-eyebrow">
            <Shield size={11} />
            Property Due Diligence · Title Scrutiny · Registration
          </div>
          <h1 className="vhero-title">
            AGD Law <em>Ventures</em>
          </h1>
          <div className="vhero-sub">Paralegal Division · Chennai · Est. 2016</div>
          <p className="vhero-tagline">
            Professional property due diligence, title scrutiny, registration, documentation,
            and legal verification services — backed by the full legal strength of AGD Law Associates.
          </p>
          <div className="vhero-actions">
            <a href="#contact" className="vbtn-primary">
              Get Property Verified <ArrowRight size={14} />
            </a>
            <a href={`tel:${venturesPhoneNumbers[0].tel}`} className="vbtn-ghost">
              <Phone size={14} /> {venturesPhoneNumbers[0].display}
            </a>
          </div>
          <div className="vhero-stats-row">
            {[
              { num: "2016", lbl: "Established" },
              { num: "2", lbl: "Core Services" },
              { num: "12+", lbl: "Service Types" },
              { num: "100%", lbl: "Legally Verified" },
            ].map((s) => (
              <div key={s.lbl} className="vhero-stat">
                <div className="vhero-stat-num">{s.num}</div>
                <div className="vhero-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function VAbout() {
  return (
    <section className="vpanel" id="about">
      <div className="vcontainer">
        <div className="vabout-inner">
          <div>
            <div className="vabout-eyebrow-row">
              <span className="vsection-label">About AGD Law Ventures</span>
              <div className="vabout-eyebrow-line" />
            </div>
            <h2 className="vabout-title">
              Property transactions deserve{" "}
              <em>verified clarity</em>
            </h2>
            <p className="vabout-lead">
              AGD Law Ventures is the dedicated paralegal division of AGD Law Associates,
              providing professional property due diligence, title scrutiny, registration,
              documentation, and legal verification services.
            </p>
            <p className="vabout-body">
              As a specialised paralegal division, it is structured to support property
              buyers, sellers, families, and businesses with dependable verification before
              a transaction moves forward — helping clients act with confidence and legal
              clarity. Every service we offer is supervised by qualified advocates from
              AGD Law Associates, ensuring legal precision at every step.
            </p>
            <div className="vabout-ctas">
              <a href="#contact" className="vbtn-primary">
                Contact Our Team <ArrowRight size={14} />
              </a>
              <Link href="/" className="vbtn-ghost">
                <ArrowLeft size={14} /> AGD Law Associates
              </Link>
            </div>
          </div>

          <div className="vabout-sidebar">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div className="vwhy-card" key={item.title}>
                  <div className="vwhy-icon"><Icon size={16} /></div>
                  <div>
                    <div className="vwhy-title">{item.title}</div>
                    <div className="vwhy-text">{item.text}</div>
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

// ─── Services ─────────────────────────────────────────────────────────────────

function VServices() {
  return (
    <section className="vpanel-dark" id="services">
      <div className="vcontainer">
        <div className="vservices-inner">
          <div className="vservices-head">
            <div>
              <span className="vsection-label" style={{ background: "rgba(197,223,192,0.08)" }}>
                Core Services
              </span>
              <h2 className="vservices-title">
                Areas of <em>expertise</em>
              </h2>
            </div>
            <a href="#contact" className="vbtn-primary" style={{ flexShrink: 0 }}>
              Enquire Now <ArrowRight size={13} />
            </a>
          </div>
          <div className="vservices-grid">
            {venturesServiceGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div className="vservice-card" key={group.title}>
                  <div className="vservice-head">
                    <div className="vservice-icon"><Icon size={18} /></div>
                    <div className="vservice-title">{group.title}</div>
                  </div>
                  <div className="vservice-list">
                    {group.items.map((item) => (
                      <div className="vservice-item" key={item}>
                        <span className="vservice-bullet" />
                        <span>{item}</span>
                      </div>
                    ))}
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

// ─── Contact & Team ───────────────────────────────────────────────────────────

function VContactTeam() {
  return (
    <section className="vpanel" id="contact">
      <div className="vcontainer">
        <div style={{ maxWidth: "1080px", margin: "0 auto", paddingTop: "clamp(4rem, 6vw, 7rem)" }}>
          <div className="vabout-eyebrow-row" style={{ marginBottom: "32px" }}>
            <span className="vsection-label">Contact & Team</span>
            <div className="vabout-eyebrow-line" />
          </div>
        </div>
        <div className="vcontact-team-inner" style={{ paddingTop: 0 }}>
          <div className="vcontact-card">
            <div className="vcontact-head">
              <div className="vcontact-kicker">Get In Touch</div>
              <div className="vcontact-title">AGD LAW VENTURES</div>
              <div className="vcontact-subtitle">Property verification and registration support</div>
            </div>
            <div className="vcontact-list">
              <div className="vcontact-row">
                <div className="vcontact-icon"><MapPin size={16} /></div>
                <div>
                  <div className="vcontact-label">Office</div>
                  <div className="vcontact-text">
                    New No.258/193/11/1, 2nd Floor, Linghi Chetty Street,
                    George Town, Chennai - 600001
                  </div>
                </div>
              </div>
              <div className="vcontact-row">
                <div className="vcontact-icon"><PhoneCall size={16} /></div>
                <div>
                  <div className="vcontact-label">Mobile</div>
                  <div className="vcontact-links">
                    {venturesPhoneNumbers.map((phone) => (
                      <a className="vcontact-link" href={`tel:${phone.tel}`} key={phone.tel}>
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="vcontact-row">
                <div className="vcontact-icon"><Mail size={16} /></div>
                <div>
                  <div className="vcontact-label">Email</div>
                  <a className="vcontact-link" href="mailto:bala@agdlawventures.com">
                    bala@agdlawventures.com
                  </a>
                </div>
              </div>
              <div className="vcontact-row">
                <div className="vcontact-icon"><ArrowRight size={16} /></div>
                <div>
                  <div className="vcontact-label">Parent Firm</div>
                  <Link className="vcontact-link" href="/">agdlawassociates.in</Link>
                </div>
              </div>
            </div>
            <a
              href={`tel:${venturesPhoneNumbers[0].tel}`}
              className="vbtn-primary"
              style={{ justifyContent: "center" }}
            >
              <Phone size={14} /> Call Now
            </a>
          </div>

          <div id="team">
            <div className="vteam-card">
              <div className="vteam-head">
                <div className="vteam-title">Ventures Team</div>
                <div className="vteam-subtitle">
                  Exclusive for Due Diligence, Title Scrutiny & Registrations
                </div>
              </div>
              <div className="vteam-list">
                {venturesTeam.map((member) => (
                  <div className="vteam-row" key={member.name}>
                    <div className="vteam-name">{member.name}</div>
                    <div className="vteam-role">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Vision / Commitment ──────────────────────────────────────────────────────

function VBottom() {
  return (
    <section className="vpanel-dark">
      <div className="vcontainer">
        <div className="vbottom-inner">
          <div className="vnote-card">
            <div className="vnote-label">Vision</div>
            <p className="vnote-text">
              To become one of Tamil Nadu&apos;s most trusted and professionally managed
              paralegal organisations delivering dependable, transparent, and legally
              compliant property solutions.
            </p>
          </div>
          <div className="vnote-card">
            <div className="vnote-label">Our Commitment</div>
            <div className="vnote-commitment">
              Every Property Verified. Every Title Examined. Every Transaction Protected.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function VFooter() {
  return (
    <footer className="vfooter">
      <div className="vcontainer">
        <div className="vfooter-inner">
          <div className="vfooter-brand">
            <div className="vfooter-name">AGD Law Ventures</div>
            <div className="vfooter-note">
              A paralegal division of{" "}
              <Link href="/">AGD Law Associates</Link>
            </div>
          </div>
          <div className="vfooter-copy">
            © {new Date().getFullYear()} AGD Law Ventures · Chennai, Tamil Nadu
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Float ───────────────────────────────────────────────────────────

function VWhatsApp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = venturesPhoneNumbers[0].tel.replace("+", "");

  const quickMessages = [
    "Hi, I need property due diligence.",
    "I want a title scrutiny for my property.",
    "I need help with property registration.",
    "Please contact me for verification services.",
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
    <div className="vwa-fab">
      <div className={`vwa-panel ${open ? "open" : "closed"}`}>
        <div className="vwa-header">
          <div className="vwa-header-info">
            <div className="vwa-avatar"><MessageCircle size={14} /></div>
            <div>
              <div className="vwa-name">AGD Law Ventures</div>
              <div className="vwa-status">Replies during office hours</div>
            </div>
          </div>
          <button type="button" className="vwa-close" onClick={() => setOpen(false)} aria-label="Close">
            <X size={12} />
          </button>
        </div>
        <div className="vwa-body">
          <div className="vwa-bubble">
            Hi! Thanks for reaching out to AGD Law Ventures. Select a quick message or type your query below.
          </div>
          <div className="vwa-quick">
            {quickMessages.map((m) => (
              <button
                key={m}
                type="button"
                className={`vwa-quick-btn${message === m ? " selected" : ""}`}
                onClick={() => setMessage(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="vwa-input-row">
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
              className="vwa-textarea"
              aria-label="WhatsApp message"
            />
            <button type="button" className="vwa-send" onClick={() => openWhatsApp()} aria-label="Send">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
      {!open && <div className="vwa-label">Chat with Ventures</div>}
      <button
        type="button"
        className={`vwa-toggle ${open ? "open-state" : "closed"}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={19} /> : <MessageCircle size={21} />}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VenturesPage() {
  return (
    <div className={`${dmSans.variable} ${cormorant.variable}`}>
      <VenturesStyles />
      <VFixedBackground />
      <div className="vscroll-layer">
        <VHeader />
        <main>
          <VHero />
          <VTicker />
          <VBridge />
          <VAbout />
          <VServices />
          <VContactTeam />
          <VBottom />
        </main>
        <VFooter />
      </div>
      <VWhatsApp />
    </div>
  );
}
