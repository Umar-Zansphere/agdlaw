"use client";

import { useState, useEffect, useRef } from "react";

// ─── DATA ENGINE ─────────────────────────────────────────────────────────────

const SITUATIONS = [
  {
    id: "criminal",
    icon: "⚖",
    label: "Criminal Matter",
    sub: "FIR, arrest, bail, trial defence",
    hint: "We handle cases from station-level to High Court",
  },
  {
    id: "property",
    icon: "⬡",
    label: "Property Dispute",
    sub: "Title, encroachment, partition, registration",
    hint: "Most property disputes resolve through negotiation — we try that first",
  },
  {
    id: "family",
    icon: "◈",
    label: "Family & Matrimonial",
    sub: "Divorce, custody, maintenance, DV Act",
    hint: "Sensitive matters handled with strict confidentiality",
  },
  {
    id: "civil",
    icon: "◻",
    label: "Civil Recovery",
    sub: "Money dues, cheque bounce, injunction",
    hint: "Cheque bounce cases: 94% settlement rate before trial",
  },
  {
    id: "employment",
    icon: "◇",
    label: "Employment & Labour",
    sub: "Wrongful termination, PF/ESI, service matters",
    hint: "Government employees: special tribunals available",
  },
  {
    id: "consumer",
    icon: "△",
    label: "Consumer & RERA",
    sub: "Deficiency of service, builder disputes, refunds",
    hint: "RERA complaints: mandatory 60-day builder response window",
  },
  {
    id: "writ",
    icon: "☰",
    label: "Constitutional / Writ",
    sub: "HC petition, service writ, fundamental rights",
    hint: "High Court admits writs on urgency — we can file within 48 hours",
  },
];

const STAGES = [
  { id: "explore", label: "Just exploring", sub: "I want to understand my options" },
  { id: "urgent", label: "Urgent — need action now", sub: "Arrest, notice, or deadline imminent" },
  { id: "stuck", label: "Case already filed", sub: "I have a lawyer but things aren't moving" },
  { id: "appeal", label: "Lost at lower court", sub: "Looking to challenge or appeal" },
];

const PATHS = {
  criminal: {
    explore: {
      confidence: 81,
      caseCount: 340,
      timeline: "4–18 months depending on severity",
      outcomes: ["Quash FIR at High Court", "Secure anticipatory bail", "Negotiate compounding of offence"],
      trust: ["17 FIRs quashed in 2023–24", "Available 24/7 for arrest situations", "Maintains confidentiality under Bar Council rules"],
      risks: ["Delay in approaching court weakens anticipatory bail plea", "Statements already given to police cannot be retracted", "Cognisable offences require immediate strategy"],
      waMsg: "Hello AGD Law. I have a criminal matter and want to understand my options. I haven't taken any steps yet. Could you guide me on the process?",
    },
    urgent: {
      confidence: 88,
      caseCount: 212,
      timeline: "48 hrs for bail · 2–6 weeks for quash",
      outcomes: ["File anticipatory bail today", "Quash FIR via HC", "Section 482 CrPC relief"],
      trust: ["24/7 emergency response for arrests", "Bail secured same-day in 68% of urgent cases", "Direct line to HC filing team"],
      risks: ["Delay beyond 24 hours reduces bail success rate", "Self-incriminating statements made before counsel engagement are on record", "Police can invoke NDPS / POCSO to resist bail — counter-strategy needed immediately"],
      waMsg: "URGENT: I need immediate legal help for a criminal matter — arrest or FIR is imminent. Please contact me right away. I need anticipatory bail or FIR quashing.",
    },
    stuck: {
      confidence: 74,
      caseCount: 98,
      timeline: "Fresh strategy assessment: 1 week · Course correction: 4–12 weeks",
      outcomes: ["Transfer petition to HC", "Discharge application", "Revision petition against lower court orders"],
      trust: ["We review case files before committing", "No fee for first file-review consultation", "Managed 41 mid-case takeovers in 3 years"],
      risks: ["Prior counsel's strategy may have foreclosed some arguments", "Late filing of revision has strict limitation periods", "Client must be candid about what previous counsel filed"],
      waMsg: "My criminal case is already filed but not progressing. My current situation feels stuck. I'd like a second opinion from AGD Law Associates.",
    },
    appeal: {
      confidence: 67,
      caseCount: 54,
      timeline: "Appeal filing: 2–4 weeks · HC hearing: 6–24 months",
      outcomes: ["File criminal appeal at Sessions/HC", "Apply for bail pending appeal", "Challenge conviction on grounds of error"],
      trust: ["Conviction reversed in 31% of our criminal appeals", "We identify grounds others miss", "Bail pending appeal granted in 79% of our applications"],
      risks: ["Limitation: 30 days from conviction date for Sessions appeal", "Appellate courts rarely re-examine facts — legal errors are primary ground", "Sentence may run during appeal if bail denied"],
      waMsg: "I've lost at a lower court in a criminal matter and want to appeal. I need to understand my grounds and next steps. Please advise.",
    },
  },
  property: {
    explore: {
      confidence: 76,
      caseCount: 287,
      timeline: "Negotiated settlement: 2–6 months · Litigation: 2–5 years",
      outcomes: ["Title declaration suit", "Injunction to stop sale", "Partition of joint property"],
      trust: ["62% of property disputes settled before trial", "Title search & document audit at intake", "Registered with Sub-Registrar offices across TN"],
      risks: ["Limitation period: 12 years for title suits — act before it lapses", "Oral agreements are very hard to prove in court", "Joint heirs must be impleaded or decree is incomplete"],
      waMsg: "Hello AGD Law. I have a property matter I'd like to understand better — no immediate urgency, just want to know my options.",
    },
    urgent: {
      confidence: 83,
      caseCount: 119,
      timeline: "Interim injunction: 24–72 hours · Full suit: 12–36 months",
      outcomes: ["Emergency injunction to stop sale/construction", "Attachment before judgement", "Caveat filing at Sub-Registrar"],
      trust: ["Interim injunctions granted in 77% of our urgent property applications", "Can file and appear same day in Chennai HC", "Caveats lodged within hours"],
      risks: ["Injunctions require clear prima facie title — documents must be in order", "Court will demand undertaking to indemnify if wrong", "Notice to opposite party can accelerate their actions — timing is critical"],
      waMsg: "URGENT: I need to stop a property transaction or construction immediately. Please help me with an emergency injunction or caveat. AGD Law — please call back.",
    },
    stuck: {
      confidence: 70,
      caseCount: 76,
      timeline: "Case review: 1 week · Amended pleadings or interlocutory: 3–8 weeks",
      outcomes: ["Amend plaint to strengthen case", "File interlocutory application", "Mediation referral to accelerate"],
      trust: ["Document audit identifies gaps current counsel missed", "Property cases often stall due to incomplete impleadment — we fix that", "Mediation success rate: 58% in stalled property suits"],
      risks: ["Amendment of plaint becomes harder as case progresses", "Key witnesses may turn hostile over time", "Court may dismiss if summons not served — monitor closely"],
      waMsg: "My property case is filed but has been stalled. I'd like AGD Law Associates to review and suggest how to move it forward.",
    },
    appeal: {
      confidence: 63,
      caseCount: 41,
      timeline: "Appeal filing: 1–2 weeks · HC disposal: 1–4 years",
      outcomes: ["Regular first appeal before HC", "Second appeal on substantial question of law", "Revision against interlocutory orders"],
      trust: ["Property appeals require meticulous record compilation — our strength", "We frame questions of law that courts accept", "Stayed execution of decree in 84% of our appeals"],
      risks: ["Limitation: 90 days for HC first appeal from decree date", "Lower court findings of fact rarely disturbed", "Costs may be heavy if appeal is dismissed"],
      waMsg: "I've lost a property case and want to appeal. Please review my options for an appeal or revision at the High Court.",
    },
  },
  family: {
    explore: {
      confidence: 79,
      caseCount: 203,
      timeline: "Mutual divorce: 6–18 months · Contested: 2–4 years",
      outcomes: ["Mutual consent divorce", "Judicial separation", "Custody arrangement", "Maintenance order"],
      trust: ["All family matters handled with absolute confidentiality", "Female counsel available on request", "Mediation-first approach saves time and trauma"],
      risks: ["Rushed petitions without documentation weaken custody claims", "Social investigation reports heavily influence custody orders", "Maintenance applications take time — interim maintenance must be sought separately"],
      waMsg: "Hello AGD Law. I have a family law matter I'd like to discuss privately. Could we schedule a confidential consultation?",
    },
    urgent: {
      confidence: 85,
      caseCount: 94,
      timeline: "Protection order: 24–48 hours · Custody: 1–4 weeks",
      outcomes: ["Emergency DV Act protection order", "Ex-parte custody interim order", "Habeas corpus for child recovery"],
      trust: ["DV Act protection orders obtained within 48 hours", "Habeas corpus for child filed same day", "Women's safety is non-negotiable — we act immediately"],
      risks: ["Physical safety must be the first priority — police complaint may be needed alongside legal action", "Ex-parte orders require strong affidavit — evidence is critical", "Child recovery orders involve welfare assessment — prepare documentation"],
      waMsg: "URGENT: I need immediate protection under the DV Act or help with an urgent custody situation. Please contact me right away.",
    },
    stuck: {
      confidence: 72,
      caseCount: 67,
      timeline: "Strategy reset: 1–2 weeks · Amended petition or fresh relief: 3–6 weeks",
      outcomes: ["Amend petition for additional reliefs", "Apply for interim maintenance", "Mediation referral at Family Court"],
      trust: ["Family Court mediators often respond better to fresh counsel", "We identify missed reliefs that can be added", "Interim maintenance can be filed even after main petition"],
      risks: ["Prolonged litigation harms children — court takes note of who delays", "Conciliation at Family Court is mandatory — prepare for it", "Evidence must be preserved now if case is ongoing"],
      waMsg: "My family law case is ongoing but not moving. I'd like AGD Law Associates to review and advise on how to progress.",
    },
    appeal: {
      confidence: 61,
      caseCount: 38,
      timeline: "HC Family Court appeal: 6–18 months",
      outcomes: ["Appeal custody or maintenance order", "Challenge divorce decree", "Enforce or modify existing order"],
      trust: ["We handle sensitive HC family appeals with discretion", "Maintenance enhancement: 71% success in our appeals", "Enforcement petitions moved urgently when needed"],
      risks: ["Custody appeals are decided on child welfare — facts must show change in circumstances", "HC rarely reverses Family Court on facts alone", "Modification of order is easier than reversal — frame it correctly"],
      waMsg: "I have an adverse family court order I want to appeal or challenge at the High Court. Please advise on next steps.",
    },
  },
  civil: {
    explore: {
      confidence: 82,
      caseCount: 318,
      timeline: "Summary suit: 4–12 months · Cheque bounce: 6–18 months",
      outcomes: ["Money recovery suit", "Cheque bounce prosecution", "Injunction against disposal of assets"],
      trust: ["94% settlement rate on cheque bounce matters", "Legal notice alone resolves 48% of civil dues", "Execution of decree: we pursue until money is recovered"],
      risks: ["Limitation: 3 years from date of default — do not delay", "Partial payment resets limitation — document all receipts", "Judgment debtor may transfer assets — attachment before judgment is available"],
      waMsg: "Hello AGD Law. I have a civil recovery matter — unpaid dues or cheque bounce. I'd like to understand my options.",
    },
    urgent: {
      confidence: 87,
      caseCount: 141,
      timeline: "Attachment before judgment: 48 hours · Legal notice: same day",
      outcomes: ["Attachment before judgment", "Injunction against asset disposal", "Emergency decree on summary suit"],
      trust: ["Attachment before judgment granted in 81% of our applications", "Legal notices sent same day with read receipts", "We trace assets through official searches"],
      risks: ["Court requires prima facie proof of debt and evasion risk", "Attachment does not transfer ownership — execution still needed", "Opposite party will get notice — they may file a counter-claim"],
      waMsg: "URGENT: I need to freeze assets or get an emergency attachment before a debtor moves funds. Please contact me immediately — AGD Law.",
    },
    stuck: {
      confidence: 75,
      caseCount: 89,
      timeline: "Execution revival or amendment: 2–4 weeks",
      outcomes: ["Execution petition to recover decree amount", "Amend plaint to add defendants", "Contempt for non-compliance of court order"],
      trust: ["We revive stalled execution petitions", "Contempt is a powerful tool — we use it when needed", "Garnishee orders: we attach salary or bank accounts"],
      risks: ["Decree must be executed within 12 years — check limitation", "Judgment debtor may have become insolvent — investigate first", "Multiple execution tools may be needed simultaneously"],
      waMsg: "My civil recovery case or decree is stuck. I'd like AGD Law to review and suggest execution or enforcement options.",
    },
    appeal: {
      confidence: 69,
      caseCount: 52,
      timeline: "Appellate court: 6 months to 2 years",
      outcomes: ["Regular first appeal", "Second appeal on question of law", "Revision against procedural orders"],
      trust: ["Decree reversed or enhanced in 44% of our civil appeals", "Interest on decree amount continues to run during appeal", "We draft compelling memoranda of appeal"],
      risks: ["Costs awarded against unsuccessful appellant", "Stay of decree requires deposit or security", "Limitation: 30–90 days depending on court — act quickly"],
      waMsg: "I've lost a civil recovery case and want to explore an appeal. Please advise on my chances and the process.",
    },
  },
  employment: {
    explore: {
      confidence: 73,
      caseCount: 164,
      timeline: "Labour court: 6 months–2 years · Service tribunal: 1–3 years",
      outcomes: ["Reinstatement with back wages", "Compensation for wrongful termination", "PF/ESI recovery", "Government service writ"],
      trust: ["Government employees: direct HC writ bypasses lengthy tribunals", "PF defaults: we file with EPFO enforcement simultaneously", "Private sector: Industrial Disputes Act and Model Standing Orders both applicable"],
      risks: ["Limitation: 3 years from termination for ID Act claims", "Contractual employees have weaker protection than permanent", "Domestic enquiry must be challenged on procedural grounds — get records immediately"],
      waMsg: "Hello AGD Law. I have an employment matter — wrongful termination or PF issue. I'd like to know my legal options.",
    },
    urgent: {
      confidence: 78,
      caseCount: 61,
      timeline: "Interim stay of termination: 1–2 weeks · Writ: 2–4 weeks",
      outcomes: ["Stay of termination order via HC writ", "Immediate reinstatement application", "Ex-parte injunction against illegal lockout"],
      trust: ["HC writ for government employees filed within 48 hours", "Interim stay obtained in 72% of our urgent employment matters", "Union coordination available for mass termination cases"],
      risks: ["Domestic enquiry completion removes most interim relief options", "Notice of termination must be challenged quickly — limitation is strict", "Evidence of victimization must be documented now"],
      waMsg: "URGENT: I've been illegally terminated or suspended and need immediate legal action. Please help me with an emergency stay. AGD Law.",
    },
    stuck: {
      confidence: 66,
      caseCount: 43,
      timeline: "Rejoinder or fresh application: 2–3 weeks",
      outcomes: ["Amend claim to add new grounds", "File contempt for non-implementation of order", "Transfer case to appropriate forum"],
      trust: ["Forum selection errors are common — we correct them", "Contempt for non-payment of ordered wages: effective tool", "We manage multiple parallel proceedings simultaneously"],
      risks: ["Labour courts move slowly — witness management is critical", "Interim orders may lapse if not renewed", "Settlement offers should be evaluated carefully before rejecting"],
      waMsg: "My employment case is already filed but has stalled. I'd like AGD Law to review and suggest how to accelerate or strengthen it.",
    },
    appeal: {
      confidence: 59,
      caseCount: 29,
      timeline: "HC writ or appeal: 1–3 years",
      outcomes: ["Writ against tribunal or labour court order", "Contempt of HC direction", "Restoration of service with full benefits"],
      trust: ["Service matters: HC is sympathetic to government employees", "Back wages with interest claimed in all appeals", "Constitutional arguments prepared when warranted"],
      risks: ["HC does not re-examine facts — legal error must be shown", "Limitation for writ against labour court: 90 days", "Employer may have complied partially — full relief may not be available"],
      waMsg: "I've lost an employment case and want to challenge the order. Please advise on my options for an appeal or HC writ.",
    },
  },
  consumer: {
    explore: {
      confidence: 77,
      caseCount: 229,
      timeline: "Consumer forum: 3–12 months · RERA: 2–6 months",
      outcomes: ["Compensation for deficiency of service", "Refund with interest from builder", "RERA complaint for possession delay"],
      trust: ["RERA complaints: mandatory 60-day builder response", "Consumer forums: no lengthy trial process", "Builder refund orders enforced with attachment"],
      risks: ["Pecuniary jurisdiction: DCDRC up to ₹50L, SCDRC up to ₹2Cr", "Limitation: 2 years from cause of action — do not delay", "Arbitration clause in builder agreement may restrict forum — we assess"],
      waMsg: "Hello AGD Law. I have a consumer or RERA matter — builder dispute or service deficiency. Please guide me on my options.",
    },
    urgent: {
      confidence: 84,
      caseCount: 87,
      timeline: "RERA injunction: 1–2 weeks · Emergency consumer relief: 3–4 weeks",
      outcomes: ["RERA injunction to stop project cancellation", "Emergency attachment of builder's escrow", "Interim relief against ongoing deficiency"],
      trust: ["RERA Authority grants interim stay within 2 weeks", "We have filed and obtained relief in 91% of urgent RERA applications", "Escrow attachment prevents fund diversion"],
      risks: ["RERA interim relief requires strong prima facie case with documents", "Builder may invoke force majeure — we have counter-arguments ready", "Allotment letter and payment receipts are essential — gather them now"],
      waMsg: "URGENT: I need immediate action on a RERA or consumer matter — builder is cancelling or a dispute is escalating. Please contact me now.",
    },
    stuck: {
      confidence: 71,
      caseCount: 58,
      timeline: "Amended complaint or enforcement petition: 2–3 weeks",
      outcomes: ["Execution of consumer forum order", "Appeal to SCDRC if DCDRC order inadequate", "Contempt against builder for non-compliance"],
      trust: ["Consumer forum decrees are enforceable through civil courts", "We file contempt without hesitation for non-compliance", "Interest on award accrues daily — enforcement is profitable"],
      risks: ["Consumer forums are often underfunded — follow up is critical", "Builder may file appeal to stay execution — we oppose immediately", "Attachment of builder's registered assets may be needed"],
      waMsg: "My consumer or RERA case is pending but not moving. I'd like AGD Law to review the file and suggest enforcement or next steps.",
    },
    appeal: {
      confidence: 65,
      caseCount: 34,
      timeline: "SCDRC / NCDRC appeal: 6–18 months",
      outcomes: ["Appeal to State Commission", "Revision to National Commission", "Contempt of appellate order"],
      trust: ["Consumer appeal fee is nominal — low barrier to challenge", "Enhanced compensation: obtained in 53% of our consumer appeals", "NCDRC revision: we appear in Delhi cases too"],
      risks: ["Appeal does not automatically stay the order — apply separately", "New evidence rarely admitted at appellate stage", "Limitation for SCDRC appeal: 30 days from forum order"],
      waMsg: "I've received an inadequate consumer forum order and want to appeal for better compensation. Please advise on the next steps.",
    },
  },
  writ: {
    explore: {
      confidence: 71,
      caseCount: 176,
      timeline: "Writ admission: 2–8 weeks · Final disposal: 6 months–3 years",
      outcomes: ["Mandamus against government inaction", "Certiorari to quash illegal order", "Quo warranto on appointments", "Habeas corpus for detention"],
      trust: ["Direct HC access bypasses lengthy tribunal delays", "Emergency writs filed same day with production affidavit", "Constitutional rights arguments: our core strength"],
      risks: ["HC examines legality, not facts — distinguish your case from others", "Alternative remedy must be exhausted first in most cases", "Laches: delay weakens writ — file within reasonable time"],
      waMsg: "Hello AGD Law. I have a matter that may require a High Court writ petition. I'd like to explore whether this is the right approach.",
    },
    urgent: {
      confidence: 86,
      caseCount: 89,
      timeline: "Habeas corpus: 24 hours · Stay of order: 24–48 hours",
      outcomes: ["Habeas corpus for illegal detention", "Emergency stay of government order", "Mandamus with interim relief"],
      trust: ["Habeas corpus production before HC: filed within 24 hours of instruction", "Emergency mention before vacation bench if needed", "3 AM calls accepted for arrest situations"],
      risks: ["HC requires detailed affidavit even for urgent hearings", "Government notices may trigger counter-affidavit that delays final relief", "Detention under NSA or UAPA: specific HC bench — we know the procedure"],
      waMsg: "URGENT: I need immediate High Court relief — illegal detention, arrest, or an order that must be stayed today. Please contact me NOW. AGD Law.",
    },
    stuck: {
      confidence: 68,
      caseCount: 52,
      timeline: "Interlocutory application or transfer: 1–3 weeks",
      outcomes: ["Contempt of HC direction", "Supplementary affidavit with new material", "Transfer to appropriate bench"],
      trust: ["HC contempt is our most effective tool against government inaction", "We monitor writ case status and follow up proactively", "Supplementary pleadings admitted when circumstances change"],
      risks: ["Counter-affidavit may introduce new facts — be prepared to respond", "HC may suggest mediation — be open, it can accelerate relief", "Bench composition changes affect strategy — monitor closely"],
      waMsg: "My High Court writ petition is pending but not progressing. I'd like AGD Law to review and advise on how to move things forward.",
    },
    appeal: {
      confidence: 57,
      caseCount: 27,
      timeline: "Division Bench appeal: 6 months–2 years · Supreme Court SLP: 1–4 years",
      outcomes: ["Appeal to Division Bench of HC", "Special Leave Petition to Supreme Court", "Review petition of HC judgment"],
      trust: ["Division Bench appeals: we argue constitutional questions effectively", "SLP filed in Delhi — we coordinate with Supreme Court counsel", "Review petitions: admitted in 31% of our applications"],
      risks: ["Division Bench is reluctant to disturb Single Judge findings of fact", "SLP: Supreme Court admits only if substantial question of law", "Limitation for Division Bench appeal: 30 days from Single Judge order"],
      waMsg: "I've received an adverse HC writ order and want to appeal to the Division Bench or Supreme Court. Please advise on next steps and SLP prospects.",
    },
  },
};

// ─── FONTS & CSS ──────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Syne:wght@400;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --void: #080808;
  --surface: #0d0d0d;
  --panel: #111111;
  --border: rgba(255,255,255,0.06);
  --border-gold: rgba(194,156,76,0.3);
  --text: #f0ede8;
  --text-dim: rgba(240,237,232,0.45);
  --text-muted: rgba(240,237,232,0.22);
  --gold: #c29c4c;
  --gold-lt: #e8c97a;
  --gold-glow: rgba(194,156,76,0.12);
  --syne: 'Syne', sans-serif;
  --serif: 'Instrument Serif', Georgia, serif;
  --sans: 'DM Sans', system-ui, sans-serif;
}

html, body {
  height: 100%;
  overflow: hidden;
  background: var(--void);
  color: var(--text);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: default;
  user-select: none;
}

#root { height: 100%; }

/* Screen swap transitions */
.screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  transition: opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1);
}
.screen.enter { opacity: 0; transform: translateY(18px); }
.screen.visible { opacity: 1; transform: translateY(0); }
.screen.exit { opacity: 0; transform: translateY(-14px); }

/* Gold bar animation */
@keyframes barFill {
  from { width: 0%; }
}
.confidence-bar-fill {
  animation: barFill 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s both;
}

/* Pulse on companion */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.pulse { animation: pulse 2s ease-in-out infinite; }

/* Number count-up feel */
@keyframes countUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.count-up { animation: countUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

/* Hover states */
.card-btn {
  background: transparent;
  border: 0.5px solid var(--border);
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
  text-align: left;
  font-family: var(--sans);
}
.card-btn:hover {
  border-color: var(--gold);
  background: var(--gold-glow);
  transform: translateY(-1px);
}
.card-btn:active { transform: translateY(0); }
.card-btn.selected {
  border-color: var(--gold);
  background: var(--gold-glow);
}

/* Stage pill button */
.stage-btn {
  background: transparent;
  border: 0.5px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--sans);
  text-align: left;
  width: 100%;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stage-btn:hover {
  border-color: rgba(194,156,76,0.5);
  color: var(--text);
  background: var(--gold-glow);
}

/* Result risk tag */
.risk-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: rgba(240,237,232,0.04);
  border: 0.5px solid rgba(240,237,232,0.1);
  font-family: var(--sans);
  font-size: 11px;
  color: var(--text-dim);
  line-height: 1.4;
}

/* Scrollable result pane */
.result-scroll {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(194,156,76,0.2) transparent;
}
.result-scroll::-webkit-scrollbar { width: 2px; }
.result-scroll::-webkit-scrollbar-thumb { background: rgba(194,156,76,0.3); border-radius: 0; }

/* Back button */
.back-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  transition: color 0.2s;
}
.back-btn:hover { color: var(--text-dim); }

/* WA button */
.wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--gold);
  color: #080808;
  border: none;
  cursor: pointer;
  font-family: var(--syne);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 14px 28px;
  transition: background 0.2s, transform 0.15s;
}
.wa-btn:hover { background: var(--gold-lt); transform: translateY(-1px); }

/* Companion */
.companion {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  pointer-events: none;
}

/* Grid overlay (decorative) */
.grid-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 80px 80px;
}
`;

// ─── COMPANION ────────────────────────────────────────────────────────────────

function Companion({ step, situation, stage }) {
  const hints = {
    0: "Select the type of matter that fits your situation.",
    1: situation ? `${SITUATIONS.find(s => s.id === situation)?.hint}` : "Choose a category.",
    2: "Where are you in the process?",
    3: "Your personalised result is ready.",
  };

  return (
    <div className="companion">
      <div style={{
        background: "var(--panel)",
        border: "0.5px solid var(--border-gold)",
        padding: "10px 14px",
        maxWidth: 200,
        pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "var(--sans)",
          fontSize: 11,
          color: "var(--text-dim)",
          lineHeight: 1.55,
          marginBottom: 8,
        }}>
          {hints[step] || hints[0]}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div className="pulse" style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--gold)",
          }} />
          <a
            href="tel:+919994388855"
            style={{
              fontFamily: "var(--syne)",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--gold)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              pointerEvents: "all",
            }}
          >
            +91 99943 88855
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 1 — SITUATION ─────────────────────────────────────────────────────

function SituationScreen({ onSelect, phase }) {
  return (
    <div className={`screen ${phase}`} style={{ background: "var(--void)", zIndex: 10 }}>
      <div className="grid-overlay" />

      {/* Header */}
      <div style={{
        padding: "28px 40px",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <div>
          <div style={{
            fontFamily: "var(--syne)",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--gold)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}>AGD Law Associates</div>
          <div style={{
            fontFamily: "var(--sans)",
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>Chennai · Tamil Nadu</div>
        </div>
        <div style={{
          fontFamily: "var(--syne)",
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>Step 1 of 2</div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: "var(--syne)",
            fontSize: 10,
            color: "var(--gold)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>Situation</div>
          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--text)",
            letterSpacing: "-0.01em",
          }}>
            What is your<br />
            <em style={{ fontStyle: "italic", color: "rgba(240,237,232,0.65)" }}>legal situation?</em>
          </h1>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 10,
        }}>
          {SITUATIONS.map((s, i) => (
            <button
              key={s.id}
              className="card-btn"
              onClick={() => onSelect(s.id)}
              style={{
                padding: "20px 22px",
                animationDelay: `${i * 40}ms`,
              }}
            >
              <div style={{
                fontFamily: "var(--syne)",
                fontSize: 20,
                color: "var(--gold)",
                marginBottom: 10,
                lineHeight: 1,
              }}>{s.icon}</div>
              <div style={{
                fontFamily: "var(--serif)",
                fontSize: 16,
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: 5,
                lineHeight: 1.2,
              }}>{s.label}</div>
              <div style={{
                fontFamily: "var(--sans)",
                fontSize: 11,
                color: "var(--text-dim)",
                lineHeight: 1.5,
              }}>{s.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer rule */}
      <div style={{
        padding: "16px 40px",
        borderTop: "0.5px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          fontFamily: "var(--sans)",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
        }}>7 practice areas · 28 case paths</div>
        <div style={{
          fontFamily: "var(--sans)",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
        }}>Mon–Fri 10AM–6:30PM · +91 99943 88855</div>
      </div>
    </div>
  );
}

// ─── SCREEN 2 — STAGE ────────────────────────────────────────────────────────

function StageScreen({ situation, onSelect, onBack, phase }) {
  const sit = SITUATIONS.find(s => s.id === situation);
  return (
    <div className={`screen ${phase}`} style={{ background: "var(--void)", zIndex: 10 }}>
      <div className="grid-overlay" />

      {/* Header */}
      <div style={{
        padding: "28px 40px",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--panel)",
          border: "0.5px solid var(--border-gold)",
          padding: "8px 14px",
        }}>
          <span style={{ fontFamily: "var(--syne)", fontSize: 14, color: "var(--gold)" }}>{sit?.icon}</span>
          <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text-dim)" }}>{sit?.label}</span>
        </div>
        <div style={{
          fontFamily: "var(--syne)",
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>Step 2 of 2</div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        position: "relative",
        zIndex: 1,
        maxWidth: 800,
        margin: "0 auto",
        width: "100%",
      }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: "var(--syne)",
            fontSize: 10,
            color: "var(--gold)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>Stage</div>
          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--text)",
          }}>
            Where are you<br />
            <em style={{ fontStyle: "italic", color: "rgba(240,237,232,0.65)" }}>in the process?</em>
          </h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {STAGES.map((stage, i) => (
            <button
              key={stage.id}
              className="stage-btn"
              onClick={() => onSelect(stage.id)}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div style={{
                fontFamily: "var(--serif)",
                fontSize: 18,
                color: "var(--text)",
                lineHeight: 1.2,
              }}>{stage.label}</div>
              <div style={{
                fontFamily: "var(--sans)",
                fontSize: 12,
                color: "var(--text-muted)",
              }}>{stage.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        padding: "16px 40px",
        borderTop: "0.5px solid var(--border)",
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          fontFamily: "var(--sans)",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
        }}>Your answer generates a personalised assessment from our case database</div>
      </div>
    </div>
  );
}

// ─── SCREEN 3 — RESULT ───────────────────────────────────────────────────────

function ResultScreen({ situation, stage, onReset, phase }) {
  const sit = SITUATIONS.find(s => s.id === situation);
  const stageData = STAGES.find(s => s.id === stage);
  const result = PATHS[situation]?.[stage];
  const [barReady, setBarReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!result) return null;

  const openWA = () => {
    window.open(
      `https://wa.me/919994388855?text=${encodeURIComponent(result.waMsg)}`,
      "_blank", "noopener"
    );
  };

  return (
    <div className={`screen ${phase}`} style={{ background: "var(--void)", zIndex: 10, overflow: "hidden" }}>
      <div className="grid-overlay" />

      {/* Header */}
      <div style={{
        padding: "20px 40px",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <button className="back-btn" onClick={onReset}>
          ← Start over
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            background: "var(--panel)",
            border: "0.5px solid var(--border-gold)",
            padding: "6px 12px",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}>
            <span style={{ fontFamily: "var(--syne)", fontSize: 12, color: "var(--gold)" }}>{sit?.icon}</span>
            <span style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--text-dim)" }}>{sit?.label}</span>
          </div>
          <div style={{
            background: "var(--panel)",
            border: "0.5px solid var(--border)",
            padding: "6px 12px",
            fontFamily: "var(--sans)",
            fontSize: 11,
            color: "var(--text-muted)",
          }}>{stageData?.label}</div>
        </div>
        <div style={{
          fontFamily: "var(--syne)",
          fontSize: 10,
          color: "var(--gold)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>Assessment</div>
      </div>

      {/* Two-column layout */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}>

        {/* LEFT — Confidence + Outcomes */}
        <div className="result-scroll" style={{
          borderRight: "0.5px solid var(--border)",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}>

          {/* Confidence */}
          <div>
            <div style={{
              fontFamily: "var(--syne)",
              fontSize: 10,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}>Success Likelihood</div>
            <div style={{
              fontFamily: "var(--syne)",
              fontSize: "clamp(3rem, 7vw, 5rem)",
              fontWeight: 800,
              color: "var(--gold)",
              lineHeight: 0.9,
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }} className="count-up">
              {result.confidence}<span style={{ fontSize: "0.4em", color: "var(--text-dim)", fontWeight: 400 }}>%</span>
            </div>
            <div style={{
              fontFamily: "var(--sans)",
              fontSize: 12,
              color: "var(--text-muted)",
              marginBottom: 14,
              lineHeight: 1.5,
            }}>
              of cases matching your profile achieve favourable outcome
            </div>
            <div style={{
              height: 3,
              background: "rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
            }}>
              {barReady && (
                <div
                  className="confidence-bar-fill"
                  style={{
                    height: "100%",
                    width: `${result.confidence}%`,
                    background: `linear-gradient(90deg, var(--gold), var(--gold-lt))`,
                  }}
                />
              )}
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontFamily: "var(--sans)",
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
            }}>
              <span>Based on {result.caseCount} similar cases</span>
              <span>{result.confidence}%</span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div style={{
              fontFamily: "var(--syne)",
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}>Realistic Timeline</div>
            <div style={{
              fontFamily: "var(--serif)",
              fontSize: 18,
              color: "var(--text)",
              lineHeight: 1.4,
              fontStyle: "italic",
            }}>{result.timeline}</div>
          </div>

          {/* What we can do */}
          <div>
            <div style={{
              fontFamily: "var(--syne)",
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}>What We Can Do</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {result.outcomes.map((o, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "12px 14px",
                  background: "var(--panel)",
                  border: "0.5px solid var(--border)",
                }}>
                  <div style={{
                    fontFamily: "var(--syne)",
                    fontSize: 10,
                    color: "var(--gold)",
                    flexShrink: 0,
                    marginTop: 1,
                    fontWeight: 700,
                  }}>→</div>
                  <div style={{
                    fontFamily: "var(--sans)",
                    fontSize: 13,
                    color: "var(--text)",
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}>{o}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ paddingTop: 4 }}>
            <button className="wa-btn" onClick={openWA}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Connect on WhatsApp
            </button>
            <div style={{
              fontFamily: "var(--sans)",
              fontSize: 10,
              color: "var(--text-muted)",
              marginTop: 10,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
            }}>Message pre-filled with your case details · Responds within 1 business day</div>
          </div>
        </div>

        {/* RIGHT — Trust + Risk */}
        <div className="result-scroll" style={{
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}>

          {/* Contextual Trust */}
          <div>
            <div style={{
              fontFamily: "var(--syne)",
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}>Why Trust Us on This</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {result.trust.map((t, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "12px 14px",
                  border: "0.5px solid var(--border-gold)",
                  background: "var(--gold-glow)",
                }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--gold)",
                    flexShrink: 0,
                    marginTop: 5,
                  }} />
                  <div style={{
                    fontFamily: "var(--sans)",
                    fontSize: 12,
                    color: "var(--text)",
                    lineHeight: 1.55,
                  }}>{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div>
            <div style={{
              fontFamily: "var(--syne)",
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}>Risk Factors</div>
            <div style={{
              fontFamily: "var(--sans)",
              fontSize: 11,
              color: "var(--text-muted)",
              marginBottom: 14,
              lineHeight: 1.5,
            }}>Honest factors that could affect your case — most can be managed if raised early.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {result.risks.map((r, i) => (
                <div key={i} className="risk-tag">
                  <span style={{ color: "rgba(240,237,232,0.3)", fontSize: 10, flexShrink: 0 }}>!</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Firm tagline */}
          <div style={{
            borderTop: "0.5px solid var(--border)",
            paddingTop: 24,
            marginTop: "auto",
          }}>
            <div style={{
              fontFamily: "var(--syne)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--gold)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}>AGD Law Associates</div>
            <div style={{
              fontFamily: "var(--serif)",
              fontSize: 14,
              color: "var(--text-dim)",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}>
              Precision, transparency, and integrity — <br />
              across Tamil Nadu's courts since inception.
            </div>
            <div style={{
              marginTop: 16,
              fontFamily: "var(--sans)",
              fontSize: 11,
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}>
              Chennai · Pan-TN Presence<br />
              Mon–Fri 10AM–6:30PM · Sat 11AM–5PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [screen, setScreen] = useState("situation"); // situation | stage | result
  const [situation, setSituation] = useState(null);
  const [stage, setStage] = useState(null);
  const [phase, setPhase] = useState("visible"); // enter | visible | exit
  const transitioning = useRef(false);

  const transition = (fn) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setPhase("exit");
    setTimeout(() => {
      fn();
      setPhase("enter");
      requestAnimationFrame(() => {
        setTimeout(() => {
          setPhase("visible");
          transitioning.current = false;
        }, 30);
      });
    }, 380);
  };

  const selectSituation = (id) => {
    transition(() => {
      setSituation(id);
      setScreen("stage");
    });
  };

  const selectStage = (id) => {
    transition(() => {
      setStage(id);
      setScreen("result");
    });
  };

  const goBack = () => {
    transition(() => {
      if (screen === "stage") {
        setScreen("situation");
        setSituation(null);
      } else if (screen === "result") {
        setScreen("stage");
        setStage(null);
      }
    });
  };

  const reset = () => {
    transition(() => {
      setScreen("situation");
      setSituation(null);
      setStage(null);
    });
  };

  const stepNum = screen === "situation" ? 0 : screen === "stage" ? 2 : 3;

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {screen === "situation" && (
        <SituationScreen onSelect={selectSituation} phase={phase} />
      )}
      {screen === "stage" && (
        <StageScreen situation={situation} onSelect={selectStage} onBack={goBack} phase={phase} />
      )}
      {screen === "result" && (
        <ResultScreen situation={situation} stage={stage} onReset={reset} phase={phase} />
      )}

      <Companion step={stepNum} situation={situation} stage={stage} />
    </>
  );
}