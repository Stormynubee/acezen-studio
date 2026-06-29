"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BOOT_LINES, TERMINAL_COMMANDS } from "./consoleData";

interface Line { kind: "boot" | "prompt" | "out" | "err"; text: string; }
const PROMPT = "az@studio";

const CodeTerminal = () => {
const [lines, setLines] = useState<Line[]>([]);
const [input, setInput] = useState<string>("");
const [booted, setBooted] = useState<boolean>(false);
const scrollRef = useRef<HTMLDivElement>(null);
const inputRef = useRef<HTMLInputElement>(null);

const commandMap = useMemo(() => new Map(TERMINAL_COMMANDS.map((c) => [c.cmd, c.output])), []);

useEffect(() => {
  let i = 0;
  const id = setInterval(() => {
    if (i < BOOT_LINES.length) { const text = BOOT_LINES[i]; setLines((p) => [...p, { kind: "boot", text }]); i++; }
    else { clearInterval(id); setBooted(true); }
  }, 420);
  return () => clearInterval(id);
}, []);

useEffect(() => {
  scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
}, [lines]);

const run = useCallback((raw: string) => {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  setLines((p) => [...p, { kind: "prompt", text: cmd }]);
  if (cmd === "clear" || cmd === "cls") { setLines([]); return; }
  const out = commandMap.get(cmd);
  if (out) setLines((p) => [...p, ...out.map((text) => ({ kind: "out" as const, text }))]);
  else setLines((p) => [...p, { kind: "err", text: `command not found: ${cmd}` }, { kind: "out", text: "try 'help' — we promise it's short." }]);
}, [commandMap]);

const onSubmit = (e: React.FormEvent) => { e.preventDefault(); run(input); setInput(""); };

return (
  <div className="flex h-full flex-col font-mono-az text-[13px] leading-relaxed" onClick={() => inputRef.current?.focus()}>
    <div ref={scrollRef} className="az-scanlines flex-1 overflow-y-auto px-5 py-4" style={{ textShadow: "0 0 6px rgba(110,231,168,0.25)" }}>
      {lines.map((line, i) => {
        if (line.kind === "prompt") {
          return (
            <div key={i} className="flex gap-2 pt-1">
              <span style={{ color: "var(--az-blue)" }}>{PROMPT}</span>
              <span style={{ color: "var(--az-muted-console)" }}>$</span>
              <span style={{ color: "var(--az-text)" }}>{line.text}</span>
            </div>
          );
        }
        const color = line.kind === "err" ? "var(--az-pink)" : line.kind === "boot" ? "var(--az-muted-console)" : "var(--az-green)";
        return <div key={i} className="whitespace-pre-wrap break-words" style={{ color }}>{line.text}</div>;
      })}
      {booted && (
        <form onSubmit={onSubmit} className="flex items-center gap-2 pt-1">
          <span style={{ color: "var(--az-blue)" }}>{PROMPT}</span>
          <span style={{ color: "var(--az-muted-console)" }}>$</span>
          <input ref={inputRef} value={input} spellCheck={false} onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-[var(--az-text)] caret-transparent outline-none" aria-label="terminal input" />
          {input.length === 0 && <span className="az-caret -ml-1" />}
        </form>
      )}
    </div>
    <div className="flex flex-wrap gap-2 border-t border-[var(--az-border-console)] px-5 py-3">
      {TERMINAL_COMMANDS.slice(0, 6).map((c) => (
        <button key={c.cmd} onClick={() => run(c.cmd)} title={c.hint}
          className="rounded-md border border-[var(--az-border-console)] bg-white/[0.02] px-2.5 py-1 text-[11px] text-[var(--az-muted-console)] transition-colors hover:border-[var(--az-border-bright-console)] hover:text-[var(--az-green)]">
          {c.cmd}
        </button>
      ))}
    </div>
  </div>
);
};
export default CodeTerminal;
