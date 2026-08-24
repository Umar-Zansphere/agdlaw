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
  FileCheck,
  Search,
  FileText,
  Users,
  Landmark,
  ClipboardCheck,
  Building2,
  MapPinned,
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

const dueDiligenceItems = [
  { icon: Search, label: "Property Due Diligence" },
  { icon: FileCheck, label: "Complete Title Investigation" },
  { icon: FileText, label: "Parent Document Verification" },
  { icon: Users, label: "Ownership Analysis" },
  { icon: ClipboardCheck, label: "Encumbrance Verification" },
  { icon: Scale, label: "Litigation Search" },
  { icon: Landmark, label: "Revenue Record Verification" },
  { icon: Building2, label: "Approval Verification" },
  { icon: MapPinned, label: "Land Use Verification" },
  { icon: FileCheck, label: "Legal Due Diligence Report" },
];

const registrationItems = [
  "Sale Registration",
  "Gift Registration",
  "Settlement Registration",
  "Release Registration",
  "Partition Registration",
  "Lease Registration",
  "Mortgage Registration",
  "MODT Registration",
  "POA Registration",
];

const verificationItems = [
  "Patta Verification",
  "Chitta Verification",
  "Adangal Verification",
  "FMB Verification",
  "A-Register Verification",
  "TSLR Verification",
  "CMDA Verification",
  "DTCP Verification",
  "RERA Verification",
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

const trustPoints = [
  {
    icon: Shield,
    title: "Legally Backed",
    text: "Every verification supervised by qualified advocates from AGD Law Associates.",
  },
  {
    icon: CheckCircle,
    title: "End-to-End",
    text: "From initial title search to final registration — one team handles it all.",
  },
  {
    icon: BookOpen,
    title: "Detailed Reports",
    text: "Clear findings, risk flags, and actionable recommendations in every report.",
  },
  {
    icon: Scale,
    title: "Trusted Division",
    text: "Serving property buyers, sellers, families, and businesses since 2016.",
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
      position: absolute; top: 10%; right: -12%;
      width: 800px; height: 800px;
      background: radial-gradient(circle, rgba(197,223,192,0.08) 0%, transparent 65%);
      border-radius: 50%;
    }
    .vfixed-bg-glow2 {
      position: absolute; bottom: 5%; left: -8%;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(197,223,192,0.05) 0%, transparent 65%);
      border-radius: 50%;
    }
    .vfixed-bg-vignette {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.6) 100%);
    }

    /* ── Core Layout ── */
    .vscroll-layer { position: relative; z-index: 10; }
    section[id] { scroll-margin-top: var(--header-offset); }
    .vcontainer { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }
    .vnarrow { max-width: 1080px; margin: 0 auto; }

    /* ── Section Labels ── */
    .vsection-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.66rem; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--sage);
      background: rgba(197,223,192,0.08); border: 1px solid rgba(197,223,192,0.18);
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
    .vheader.scrolled { background: rgba(11,11,11,0.92); backdrop-filter: blur(24px); }
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
      font-size: 0.56rem; font-weight: 600; text-transform: uppercase;
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

    /* ── Panel Surfaces ── */
    .vpanel { background: linear-gradient(180deg, rgba(7,9,8,0.5) 0%, rgba(7,9,8,0.58) 100%); }
    .vpanel-dark { background: linear-gradient(180deg, rgba(4,6,5,0.66) 0%, rgba(4,6,5,0.74) 100%); }

    /* ── Hero ── */
    .vhero {
      min-height: 100svh;
      display: flex; align-items: center;
      padding: clamp(120px, 16vh, 160px) 0 clamp(60px, 8vh, 80px);
      position: relative; overflow: hidden;
    }
    .vhero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: clamp(32px, 4vw, 56px);
      align-items: center;
    }
    .vhero-left {
      display: flex; flex-direction: column;
      gap: 0;
    }
    .vhero-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 0.64rem; font-weight: 600; letter-spacing: 0.22em;
      text-transform: uppercase; color: var(--sage);
      border: 1px solid rgba(197,223,192,0.2);
      background: rgba(12,16,14,0.5);
      border-radius: 100px; padding: 7px 16px; margin-bottom: 20px;
      width: fit-content;
    }
    .vhero-title {
      font-size: clamp(3.2rem, 5.5vw, 5.8rem);
      color: #fff; line-height: 0.92;
      letter-spacing: -0.03em; margin-bottom: 8px;
    }
    .vhero-title em { color: var(--sage); font-style: italic; }
    .vhero-sub {
      font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.24em; color: rgba(255,255,255,0.35); margin-bottom: 22px;
    }
    .vhero-desc {
      font-size: 1rem; line-height: 1.85; color: var(--text-body);
      max-width: 540px; margin-bottom: 28px;
    }
    .vhero-actions {
      display: flex; gap: 12px; flex-wrap: wrap;
    }

    /* Hero Contact Card */
    .vhero-contact {
      padding: 28px;
      border-radius: 16px;
      border: 1px solid rgba(197,223,192,0.18);
      background: linear-gradient(145deg, rgba(197,223,192,0.07) 0%, rgba(12,16,14,0.7) 70%);
      backdrop-filter: blur(12px);
      display: flex; flex-direction: column; gap: 18px;
    }
    .vhero-contact-head {
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(197,223,192,0.12);
      display: flex; flex-direction: column; gap: 4px;
    }
    .vhero-contact-kicker {
      font-size: 0.58rem; text-transform: uppercase;
      letter-spacing: 0.16em; color: rgba(197,223,192,0.55);
    }
    .vhero-contact-title {
      font-family: var(--font-cormorant), serif;
      font-size: 1.6rem; line-height: 1.05; color: #fff;
    }
    .vhero-contact-row {
      display: grid; grid-template-columns: auto minmax(0, 1fr);
      gap: 12px; align-items: start;
    }
    .vhero-contact-icon {
      width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: var(--sage); background: rgba(197,223,192,0.08);
      border: 1px solid rgba(197,223,192,0.14);
    }
    .vhero-contact-label {
      font-size: 0.56rem; text-transform: uppercase;
      letter-spacing: 0.14em; color: rgba(197,223,192,0.5); margin-bottom: 3px;
    }
    .vhero-contact-value {
      font-size: 0.86rem; line-height: 1.65; color: var(--text-body);
    }
    .vhero-contact-link {
      font-size: 0.86rem; line-height: 1.65; color: var(--text-body);
      transition: color 0.2s; display: block;
    }
    .vhero-contact-link:hover { color: var(--sage); }
    .vhero-contact-backed {
      display: flex; align-items: center; gap: 8px;
      padding-top: 14px;
      border-top: 1px solid rgba(197,223,192,0.1);
      font-size: 0.74rem; color: rgba(255,255,255,0.45);
    }
    .vhero-contact-backed a {
      color: var(--sage); font-weight: 600; transition: color 0.2s;
    }
    .vhero-contact-backed a:hover { color: #fff; }

    /* ── Ticker ── */
    .vticker-wrap { background: var(--sage); overflow: hidden; height: 36px; display: flex; align-items: center; }
    .vticker-track { display: flex; gap: 0; white-space: nowrap; animation: vtickMove 28s linear infinite; }
    @keyframes vtickMove { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .vticker-item {
      display: inline-flex; align-items: center; gap: 16px;
      font-size: 0.66rem; font-weight: 700; color: var(--ink);
      text-transform: uppercase; letter-spacing: 0.14em; padding: 0 28px;
    }
    .vticker-sep { opacity: 0.3; }

    /* ── Trust Strip ── */
    .vtrust {
      padding: clamp(3.5rem, 5vw, 5rem) 0;
    }
    .vtrust-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    .vtrust-card {
      padding: 22px 18px;
      border-radius: 12px;
      border: 1px solid rgba(197,223,192,0.12);
      background: rgba(12,16,14,0.5);
      display: flex; flex-direction: column; gap: 12px;
      transition: border-color 0.25s, transform 0.25s;
    }
    .vtrust-card:hover {
      border-color: rgba(197,223,192,0.28);
      transform: translateY(-2px);
    }
    .vtrust-icon {
      width: 40px; height: 40px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(197,223,192,0.08); color: var(--sage);
      border: 1px solid rgba(197,223,192,0.16);
    }
    .vtrust-title {
      font-family: var(--font-cormorant), serif;
      font-size: 1.15rem; line-height: 1.15; color: #fff;
    }
    .vtrust-text {
      font-size: 0.8rem; line-height: 1.7; color: var(--text-muted);
    }

    /* ── Services Section ── */
    .vservices {
      padding: clamp(3.5rem, 6vw, 6rem) 0;
    }
    .vservices-header {
      display: flex; align-items: flex-end; justify-content: space-between;
      gap: 20px; margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
      padding-bottom: clamp(1.5rem, 2vw, 2rem);
      border-bottom: 1px solid rgba(197,223,192,0.14);
      flex-wrap: wrap;
    }
    .vservices-title {
      font-size: clamp(2.2rem, 3.5vw, 3.4rem);
      color: #fff; letter-spacing: -0.01em; margin-top: 12px;
    }
    .vservices-title em { color: var(--sage); font-style: italic; }

    /* Service Block 1: Due Diligence */
    .vservice-block {
      margin-bottom: clamp(2rem, 3vw, 3rem);
      padding: clamp(24px, 3vw, 32px);
      border-radius: 16px;
      border: 1px solid rgba(197,223,192,0.14);
      background: rgba(12,16,14,0.5);
    }
    .vservice-block-head {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 10px;
    }
    .vservice-block-icon {
      width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: var(--sage); background: rgba(197,223,192,0.09);
      border: 1px solid rgba(197,223,192,0.18);
    }
    .vservice-block-title {
      font-family: var(--font-cormorant), serif;
      font-size: clamp(1.5rem, 2vw, 1.8rem); line-height: 1.15; color: #fff;
    }
    .vservice-block-desc {
      font-size: 0.88rem; line-height: 1.8; color: var(--text-muted);
      max-width: 700px; margin-bottom: clamp(16px, 2vw, 24px);
    }

    /* Due Diligence: icon + label grid */
    .vdd-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
    }
    .vdd-item {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      padding: 16px 10px;
      border-radius: 10px;
      border: 1px solid rgba(197,223,192,0.1);
      background: rgba(255,255,255,0.02);
      transition: border-color 0.25s, background 0.25s, transform 0.25s;
      text-align: center;
    }
    .vdd-item:hover {
      border-color: rgba(197,223,192,0.24);
      background: rgba(197,223,192,0.04);
      transform: translateY(-2px);
    }
    .vdd-icon {
      width: 34px; height: 34px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: var(--sage); background: rgba(197,223,192,0.07);
    }
    .vdd-label {
      font-size: 0.76rem; line-height: 1.45; color: var(--text-muted);
      font-weight: 500;
    }

    /* Registration + Verification: tag grids */
    .vreg-group {
      margin-bottom: 20px;
    }
    .vreg-group:last-child { margin-bottom: 0; }
    .vreg-group-label {
      font-size: 0.62rem; text-transform: uppercase;
      letter-spacing: 0.15em; color: rgba(197,223,192,0.55);
      margin-bottom: 10px; font-weight: 600;
    }
    .vreg-tags {
      display: flex; flex-wrap: wrap; gap: 8px;
    }
    .vreg-tag {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 0.8rem; color: var(--text-muted);
      padding: 8px 14px; border-radius: 8px;
      border: 1px solid rgba(197,223,192,0.1);
      background: rgba(255,255,255,0.02);
      transition: border-color 0.2s, color 0.2s;
    }
    .vreg-tag:hover {
      border-color: rgba(197,223,192,0.22);
      color: var(--sage);
    }
    .vreg-tag-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--sage); opacity: 0.7; flex-shrink: 0;
    }

    /* ── Team Section ── */
    .vteam-section {
      padding: clamp(3.5rem, 6vw, 6rem) 0;
    }
    .vteam-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: clamp(24px, 3vw, 40px);
      align-items: start;
    }
    .vteam-left {
      display: flex; flex-direction: column; gap: 20px;
    }
    .vteam-heading {
      font-size: clamp(2rem, 3vw, 3rem);
      color: #fff; letter-spacing: -0.01em; margin-top: 12px;
    }
    .vteam-heading em { color: var(--sage); font-style: italic; }
    .vteam-lead {
      font-size: 0.94rem; line-height: 1.85; color: var(--text-body);
      position: relative; padding-left: 18px;
    }
    .vteam-lead::before {
      content: ''; position: absolute; left: 0; top: 5px; bottom: 5px;
      width: 2px; border-radius: 2px;
      background: linear-gradient(180deg, var(--sage), rgba(197,223,192,0.15));
    }

    /* Vision + Commitment cards inside team left column */
    .vteam-cards {
      display: flex; flex-direction: column; gap: 12px;
      margin-top: 8px;
    }
    .vvc-card {
      padding: 22px;
      border-radius: 12px;
      border: 1px solid rgba(197,223,192,0.12);
      background: rgba(255,255,255,0.02);
    }
    .vvc-label {
      font-size: 0.6rem; text-transform: uppercase;
      letter-spacing: 0.16em; color: rgba(197,223,192,0.6);
      margin-bottom: 8px;
    }
    .vvc-text {
      font-size: 0.88rem; line-height: 1.85; color: var(--text-body);
    }
    .vvc-quote {
      font-family: var(--font-cormorant), serif;
      font-size: 1.35rem; line-height: 1.3; color: #fff;
      font-style: italic;
    }

    /* Team right column: member cards */
    .vteam-right-card {
      padding: 28px;
      border-radius: 16px;
      border: 1px solid rgba(197,223,192,0.14);
      background: rgba(12,16,14,0.55);
      display: flex; flex-direction: column; gap: 18px;
    }
    .vteam-right-head {
      display: flex; flex-direction: column; gap: 4px;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(197,223,192,0.1);
    }
    .vteam-right-title {
      font-family: var(--font-cormorant), serif;
      font-size: 1.6rem; line-height: 1.1; color: #fff;
    }
    .vteam-right-sub {
      font-size: 0.68rem; text-transform: uppercase;
      letter-spacing: 0.12em; color: rgba(197,223,192,0.55);
    }
    .vteam-members {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px 14px;
    }
    .vteam-member {
      padding: 12px 0;
      border-bottom: 1px solid rgba(197,223,192,0.07);
      display: flex; flex-direction: column; gap: 2px;
    }
    .vteam-member-name {
      font-size: 0.92rem; line-height: 1.45; color: #fff; font-weight: 500;
    }
    .vteam-member-role {
      font-size: 0.68rem; text-transform: uppercase;
      letter-spacing: 0.1em; color: rgba(197,223,192,0.58);
    }

    /* ── CTA Banner ── */
    .vcta-banner {
      background: var(--sage);
      padding: clamp(40px, 5vw, 56px) 0;
    }
    .vcta-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
    }
    .vcta-text {
      display: flex; flex-direction: column; gap: 4px;
    }
    .vcta-heading {
      font-family: var(--font-cormorant), serif;
      font-size: clamp(1.8rem, 2.8vw, 2.6rem);
      line-height: 1.08; color: var(--ink);
    }
    .vcta-sub {
      font-size: 0.82rem; color: rgba(11,11,11,0.6);
    }
    .vcta-actions {
      display: flex; gap: 12px; flex-wrap: wrap;
    }
    .vcta-btn-dark {
      display: inline-flex; align-items: center; gap: 9px;
      background: var(--ink); color: var(--sage);
      font-size: 0.85rem; font-weight: 700;
      padding: 14px 26px; border-radius: 100px;
      transition: all 0.25s; letter-spacing: 0.03em; white-space: nowrap;
    }
    .vcta-btn-dark:hover { background: #222; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
    .vcta-btn-outline {
      display: inline-flex; align-items: center; gap: 9px;
      color: var(--ink); font-size: 0.85rem; font-weight: 600;
      padding: 14px 26px; border-radius: 100px;
      border: 2px solid rgba(11,11,11,0.25);
      transition: all 0.25s; white-space: nowrap;
    }
    .vcta-btn-outline:hover { border-color: var(--ink); }

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
      .vhero-grid { grid-template-columns: 1fr; gap: 32px; }
      .vtrust-grid { grid-template-columns: repeat(2, 1fr); }
      .vteam-grid { grid-template-columns: 1fr; }
      .vmenu-btn { display: inline-flex !important; }
      .vnav-desktop { display: none !important; }
      .vheader-cta-desktop { display: none !important; }
    }
    @media (max-width: 768px) {
      .vdd-grid { grid-template-columns: repeat(2, 1fr); }
      .vteam-members { grid-template-columns: 1fr; }
      .vcta-inner { flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 640px) {
      .vhero-title { font-size: clamp(2.8rem, 12vw, 3.8rem); }
      .vtrust-grid { grid-template-columns: 1fr; }
      .vdd-grid { grid-template-columns: 1fr; }
      .vcta-actions { flex-direction: column; width: 100%; }
      .vcta-btn-dark, .vcta-btn-outline { justify-content: center; width: 100%; }
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
    "RERA Verification", "Patta & Chitta Verification", "Ownership Analysis",
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function VHero() {
  return (
    <section className="vhero" id="hero">
      <div className="vcontainer">
        <div className="vnarrow">
          <div className="vhero-grid">
            {/* Left: Copy */}
            <div className="vhero-left">
              <div className="vhero-eyebrow">
                <Shield size={11} />
                Paralegal Division of AGD Law Associates
              </div>
              <h1 className="vhero-title">
                AGD Law<br /><em>Ventures</em>
              </h1>
              <div className="vhero-sub">Chennai · Established 2016</div>
              <p className="vhero-desc">
                Professional property due diligence, title scrutiny, registration,
                and legal verification services — every step supervised by qualified
                advocates from AGD Law Associates.
              </p>
              <div className="vhero-actions">
                <a href="#contact" className="vbtn-primary">
                  Get Property Verified <ArrowRight size={14} />
                </a>
                <a href={`tel:${venturesPhoneNumbers[0].tel}`} className="vbtn-ghost">
                  <Phone size={14} /> {venturesPhoneNumbers[0].display}
                </a>
              </div>
            </div>

            {/* Right: Contact Card */}
            <div className="vhero-contact" id="contact">
              <div className="vhero-contact-head">
                <div className="vhero-contact-kicker">Get In Touch</div>
                <div className="vhero-contact-title">AGD Law Ventures</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="vhero-contact-row">
                  <div className="vhero-contact-icon"><MapPin size={15} /></div>
                  <div>
                    <div className="vhero-contact-label">Office</div>
                    <div className="vhero-contact-value">
                      New No.258/193/11/1, 2nd Floor,<br />
                      Linghi Chetty Street, George Town,<br />
                      Chennai - 600001
                    </div>
                  </div>
                </div>
                <div className="vhero-contact-row">
                  <div className="vhero-contact-icon"><PhoneCall size={15} /></div>
                  <div>
                    <div className="vhero-contact-label">Mobile</div>
                    {venturesPhoneNumbers.map((phone) => (
                      <a className="vhero-contact-link" href={`tel:${phone.tel}`} key={phone.tel}>
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="vhero-contact-row">
                  <div className="vhero-contact-icon"><Mail size={15} /></div>
                  <div>
                    <div className="vhero-contact-label">Email</div>
                    <a className="vhero-contact-link" href="mailto:bala@agdlawventures.com">
                      bala@agdlawventures.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="vhero-contact-backed">
                <Shield size={12} style={{ color: "var(--sage)", flexShrink: 0 }} />
                <span>Backed by <Link href="/">AGD Law Associates</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────────

function VTrustStrip() {
  return (
    <section className="vpanel">
      <div className="vcontainer">
        <div className="vnarrow vtrust">
          <div style={{ marginBottom: "20px" }}>
            <span className="vsection-label">Why AGD Law Ventures</span>
          </div>
          <div className="vtrust-grid">
            {trustPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div className="vtrust-card" key={item.title}>
                  <div className="vtrust-icon"><Icon size={17} /></div>
                  <div className="vtrust-title">{item.title}</div>
                  <div className="vtrust-text">{item.text}</div>
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
        <div className="vnarrow vservices">
          <div className="vservices-header">
            <div>
              <span className="vsection-label" style={{ background: "rgba(197,223,192,0.06)" }}>
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

          {/* Service 1: Due Diligence & Title Scrutiny */}
          <div className="vservice-block">
            <div className="vservice-block-head">
              <div className="vservice-block-icon"><Shield size={20} /></div>
              <div className="vservice-block-title">Due Diligence & Title Scrutiny</div>
            </div>
            <p className="vservice-block-desc">
              Comprehensive property investigation covering ownership history,
              encumbrances, litigation status, revenue records, and land use —
              culminating in a detailed legal due diligence report.
            </p>
            <div className="vdd-grid">
              {dueDiligenceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="vdd-item" key={item.label}>
                    <div className="vdd-icon"><Icon size={15} /></div>
                    <div className="vdd-label">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service 2: Registrations & Record Verification */}
          <div className="vservice-block">
            <div className="vservice-block-head">
              <div className="vservice-block-icon"><BookOpen size={20} /></div>
              <div className="vservice-block-title">Registrations & Record Verification</div>
            </div>
            <p className="vservice-block-desc">
              End-to-end document registration services and comprehensive record
              verification across all major government databases and regulatory bodies.
            </p>
            <div className="vreg-group">
              <div className="vreg-group-label">Property Registrations</div>
              <div className="vreg-tags">
                {registrationItems.map((item) => (
                  <span className="vreg-tag" key={item}>
                    <span className="vreg-tag-dot" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="vreg-group">
              <div className="vreg-group-label">Record & Approval Verification</div>
              <div className="vreg-tags">
                {verificationItems.map((item) => (
                  <span className="vreg-tag" key={item}>
                    <span className="vreg-tag-dot" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────

function VTeam() {
  return (
    <section className="vpanel" id="team">
      <div className="vcontainer">
        <div className="vnarrow vteam-section">
          <div className="vteam-grid">
            {/* Left: heading + vision/commitment */}
            <div className="vteam-left">
              <div>
                <span className="vsection-label">Our People</span>
                <h2 className="vteam-heading">
                  Led by advocates with<br /><em>12+ years</em> of practice
                </h2>
              </div>
              <p className="vteam-lead">
                AGD Law Ventures is structured as a specialised paralegal division to support
                property buyers, sellers, families, and businesses with dependable verification
                before a transaction moves forward — helping clients act with confidence and
                legal clarity.
              </p>
              <div className="vteam-cards">
                <div className="vvc-card">
                  <div className="vvc-label">Vision</div>
                  <p className="vvc-text">
                    To become one of Tamil Nadu&apos;s most trusted and professionally managed
                    paralegal organisations delivering dependable, transparent, and legally
                    compliant property solutions.
                  </p>
                </div>
                <div className="vvc-card">
                  <div className="vvc-label">Our Commitment</div>
                  <div className="vvc-quote">
                    Every Property Verified. Every Title Examined. Every Transaction Protected.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: team card */}
            <div className="vteam-right-card">
              <div className="vteam-right-head">
                <div className="vteam-right-title">Ventures Team</div>
                <div className="vteam-right-sub">
                  Exclusive for Due Diligence, Title Scrutiny & Registrations
                </div>
              </div>
              <div className="vteam-members">
                {venturesTeam.map((member) => (
                  <div className="vteam-member" key={member.name}>
                    <div className="vteam-member-name">{member.name}</div>
                    <div className="vteam-member-role">{member.role}</div>
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

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function VCTABanner() {
  return (
    <section className="vcta-banner">
      <div className="vcontainer">
        <div className="vnarrow">
          <div className="vcta-inner">
            <div className="vcta-text">
              <div className="vcta-heading">Get your property verified today</div>
              <div className="vcta-sub">
                Backed by the full legal strength of AGD Law Associates.
              </div>
            </div>
            <div className="vcta-actions">
              <a href={`tel:${venturesPhoneNumbers[0].tel}`} className="vcta-btn-dark">
                <Phone size={14} /> Call Now
              </a>
              <Link href="/" className="vcta-btn-outline">
                <ArrowLeft size={14} /> Visit Law Firm
              </Link>
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
          <VTrustStrip />
          <VServices />
          <VTeam />
        </main>
        <VCTABanner />
        <VFooter />
      </div>
      <VWhatsApp />
    </div>
  );
}
