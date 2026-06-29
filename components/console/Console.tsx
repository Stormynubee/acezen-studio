"use client";
import { useState } from "react";
import { MODES, type ConsoleMode } from "./consoleData";
import CodeTerminal from "./CodeTerminal";
import EditTimeline from "./EditTimeline";
import MarketingDeck from "./MarketingDeck";

const Console = () => {
const [mode, setMode] = useState<ConsoleMode>("code");
const active = MODES.find((m) => m.id === mode)!;
return (
  <div
    className="relative w-full overflow-hidden rounded-2xl border border-[var(--az-border-bright-console)]"
    style={{
      background: "linear-gradient(180deg, #07070c 0%, var(--az-void) 100%)",
      boxShadow: "0 60px 140px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)",
    }}
  >
    <div className="flex items-center gap-3 border-b border-[var(--az-border-console)] bg-white/[0.015] px-4 py-2.5">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="ml-2 flex items-center gap-2 font-mono-az text-[11px] text-[var(--az-muted-console)]">
        <span className="hidden sm:inline">~/acezen/</span>
        <span style={{ color: active.tint }}>{active.tagline}</span>
      </div>
      <div className="ml-auto flex items-center gap-1 rounded-lg border border-[var(--az-border-console)] bg-black/40 p-1">
        {MODES.map((m) => {
          const isActive = m.id === mode;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className="relative flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono-az text-[11px] transition-colors sm:px-3"
              style={{ color: isActive ? "var(--az-void)" : "var(--az-muted-console)", background: isActive ? m.tint : "transparent", fontWeight: isActive ? 600 : 400 }}
            >
              <span aria-hidden>{m.glyph}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
    <div className="h-[clamp(440px,62vh,620px)]">
      {mode === "code" && <CodeTerminal />}
      {mode === "edit" && <EditTimeline />}
      {mode === "market" && <MarketingDeck />}
    </div>
    <div className="flex items-center gap-4 border-t border-[var(--az-border-console)] bg-white/[0.015] px-4 py-1.5 font-mono-az text-[10px] text-[var(--az-muted-console)]">
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: active.tint }} />
        {active.label} engine online
      </span>
      <span className="ml-auto hidden sm:inline">utf-8</span>
      <span className="hidden sm:inline">·</span>
      <span>acezen.in</span>
    </div>
  </div>
);
};
export default Console;
