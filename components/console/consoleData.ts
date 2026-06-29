/**
 * Copy and config for the AceZen triple-mode console.
 * Voice: confident, dry, a little unhinged. Never corporate, never "AI slop".
 */
export type ConsoleMode = "code" | "edit" | "market";

export interface ModeMeta { id: ConsoleMode; label: string; glyph: string; tint: string; tagline: string; }

export const MODES: ModeMeta[] = [
  { id: "code", label: "code", glyph: "›_", tint: "var(--az-green)", tagline: "ship/main" },
  { id: "edit", label: "edit", glyph: "▶", tint: "var(--az-blue)", tagline: "timeline" },
  { id: "market", label: "market", glyph: "✦", tint: "var(--az-gold)", tagline: "campaign" },
];

export interface TerminalCommand { cmd: string; hint: string; output: string[]; }

export const BOOT_LINES: string[] = [
  "acezen-os 26.6 — kernel: reality.v4",
  "mounting /studio … ok",
  "loading personality module … (warning: high opinions detected)",
  "ready. type 'help' or just start poking around.",
];

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  { cmd: "help", hint: "what can this thing do", output: [
    "available commands:",
    "  whoami     — who is actually behind this",
    "  stack      — the tools we don't apologize for",
    "  ship       — how fast we move",
    "  pricing    — the honest version",
    "  hire       — open a line to a human",
    "  sudo vibe  — don't.",
  ]},
  { cmd: "whoami", hint: "the people, not the pitch", output: [
    "AceZen — a tiny studio that codes, cuts, and grows things.",
    "Founded 2022. Still answering our own emails.",
    "We build the product AND the reason people click it.",
  ]},
  { cmd: "stack", hint: "what we build on", output: [
    "next.js · react 19 · typescript (strict, no 'any' cowardice)",
    "framer-motion · tailwind · a frankly unhealthy amount of taste",
    "deploy: vercel · edge · 'it loads before you blink'",
  ]},
  { cmd: "ship", hint: "speed run", output: [
    "$ git commit -m 'make it gorgeous'",
    "building … ▓▓▓▓▓▓▓▓▓▓ 100%",
    "deployed to prod in 0.8s. no, we didn't break anything. probably.",
  ]},
  { cmd: "pricing", hint: "the awkward question", output: [
    "less than an in-house team, more than your cousin who 'does websites'.",
    "you pay for outcomes, not hours we pretend to work.",
    "run 'hire' and we'll talk real numbers.",
  ]},
  { cmd: "hire", hint: "talk to a human", output: [
    "opening secure channel …",
    "→ hello@acezen.in",
    "→ we reply in hours, not 'business days'.",
  ]},
  { cmd: "sudo vibe", hint: "do not run this", output: [
    "Permission denied: vibes cannot be sudo'd, only earned.",
    "nice try though.",
  ]},
];

export interface TimelineClip { id: string; track: string; label: string; start: number; width: number; color: string; type: "video" | "audio" | "fx" | "title"; }

export const TIMELINE_TRACKS: { id: string; name: string; kind: string }[] = [
  { id: "v2", name: "V2 · TITLES", kind: "title" },
  { id: "v1", name: "V1 · FOOTAGE", kind: "video" },
  { id: "fx", name: "FX · GRADE", kind: "fx" },
  { id: "a1", name: "A1 · SCORE", kind: "audio" },
];

export const TIMELINE_CLIPS: TimelineClip[] = [
  { id: "t1", track: "v2", label: "HOOK 0:00", start: 2, width: 18, color: "var(--az-gold)", type: "title" },
  { id: "t2", track: "v2", label: "LOWER THIRD", start: 46, width: 22, color: "var(--az-gold)", type: "title" },
  { id: "v1a", track: "v1", label: "drone_estab.mov", start: 2, width: 30, color: "var(--az-blue)", type: "video" },
  { id: "v1b", track: "v1", label: "product_macro.mov", start: 34, width: 26, color: "var(--az-blue)", type: "video" },
  { id: "v1c", track: "v1", label: "talent_cu.mov", start: 62, width: 34, color: "var(--az-blue)", type: "video" },
  { id: "fx1", track: "fx", label: "FILM_GRADE.cube", start: 2, width: 94, color: "var(--az-pink)", type: "fx" },
  { id: "a1a", track: "a1", label: "score_build.wav", start: 2, width: 58, color: "var(--az-green)", type: "audio" },
  { id: "a1b", track: "a1", label: "impact.wav", start: 62, width: 34, color: "var(--az-green)", type: "audio" },
];

export const EDIT_NOTES: string[] = [
  "color graded so it reads premium on a $200 phone and a $2k monitor.",
  "cuts land on the beat. always. we will die on this hill.",
  "1 reel → 9 platform-native crops. you only film once.",
];

export interface Metric { id: string; label: string; value: number; suffix: string; delta: string; tint: string; }

export const METRICS: Metric[] = [
  { id: "reach", label: "REACH", value: 4.2, suffix: "M", delta: "+318%", tint: "var(--az-gold)" },
  { id: "cac", label: "COST / ACQ", value: 0.61, suffix: "$", delta: "-44%", tint: "var(--az-green)" },
  { id: "ctr", label: "HOOK RATE", value: 71, suffix: "%", delta: "+12pt", tint: "var(--az-blue)" },
  { id: "roas", label: "ROAS", value: 6.8, suffix: "x", delta: "+2.1x", tint: "var(--az-pink)" },
];

export const GROWTH_CURVE: number[] = [12, 18, 16, 27, 34, 31, 48, 55, 51, 68, 79, 96];

export const MARKET_PLAYS: { tag: string; line: string }[] = [
  { tag: "POSITIONING", line: "we find the one sentence your competitors are too scared to say." },
  { tag: "CONTENT", line: "thumb-stopping creative, not 'engaging content'. words mean things." },
  { tag: "DISTRIBUTION", line: "right post, right feed, right second. organic + paid, no guessing." },
  { tag: "RETENTION", line: "we keep the customer you spent money to win. wild concept, we know." },
];
