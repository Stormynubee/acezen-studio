"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Scissors, SkipBack, SkipForward } from "lucide-react";
import { EDIT_NOTES, TIMELINE_CLIPS, TIMELINE_TRACKS } from "./consoleData";

const DURATION = 12;

const EditTimeline = () => {
const [playing, setPlaying] = useState<boolean>(true);
const [playhead, setPlayhead] = useState<number>(8);
const rafRef = useRef<number | null>(null);
const lastRef = useRef<number>(0);
const rootRef = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState<boolean>(true);

// Pause the playhead rAF when the timeline is scrolled off-screen so it isn't
// re-rendering at 60fps in the background (matters most on mobile).
useEffect(() => {
  const el = rootRef.current;
  if (!el) return;
  const io = new IntersectionObserver(
    ([entry]) => setVisible(entry.isIntersecting),
    { threshold: 0.01 }
  );
  io.observe(el);
  return () => io.disconnect();
}, []);

useEffect(() => {
  if (!playing || !visible) return;
  const step = (t: number) => {
    if (!lastRef.current) lastRef.current = t;
    const dt = (t - lastRef.current) / 1000;
    lastRef.current = t;
    setPlayhead((p) => { const next = p + (dt / DURATION) * 100; return next >= 100 ? 0 : next; });
    rafRef.current = requestAnimationFrame(step);
  };
  rafRef.current = requestAnimationFrame(step);
  return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastRef.current = 0; };
}, [playing, visible]);

const tc = (() => {
  const totalFrames = Math.floor((playhead / 100) * DURATION * 24);
  const s = Math.floor(totalFrames / 24); const f = totalFrames % 24;
  return `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
})();

return (
  <div ref={rootRef} className="flex h-full flex-col">
    <div className="relative flex-1 overflow-hidden border-b border-[var(--az-border-console)]">
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(74,127,212,0.16), transparent 60%), radial-gradient(80% 60% at 70% 100%, rgba(200,169,126,0.12), transparent 60%)" }} />
      <div className="az-scanlines absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-6 rounded-md border border-[var(--az-border-console)]" />
      <div className="pointer-events-none absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 border-l border-[var(--az-border-console)]" />
      <div className="pointer-events-none absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 border-t border-[var(--az-border-console)]" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="text-technical-console mb-3">Now rendering · sakura_promo_v7</span>
        <h3 className="text-editorial-console text-[clamp(1.8rem,5vw,3.4rem)] text-white">cut to the&nbsp;feeling.</h3>
        <p className="mt-3 max-w-md text-sm text-[var(--az-muted-console)]">We don't add transitions because the software has them. Every cut earns its keep.</p>
      </div>
      <div className="absolute left-5 top-5 flex items-center gap-2 font-mono-az text-xs text-[var(--az-blue)]">
        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "var(--az-pink)" }} />{tc}
      </div>
      <div className="absolute right-5 top-5 font-mono-az text-[11px] tracking-widest text-[var(--az-muted-console)]">4K · 24FPS · REC.709</div>
    </div>

    <div className="flex items-center gap-4 border-b border-[var(--az-border-console)] px-5 py-2.5">
      <div className="flex items-center gap-1.5">
        <TransportBtn onClick={() => setPlayhead(0)} label="to start"><SkipBack size={14} /></TransportBtn>
        <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "pause" : "play"}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--az-void)] transition-transform hover:scale-105" style={{ background: "var(--az-blue)" }}>
          {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="ml-0.5" />}
        </button>
        <TransportBtn onClick={() => setPlayhead(100)} label="to end"><SkipForward size={14} /></TransportBtn>
        <TransportBtn onClick={() => setPlaying(false)} label="razor"><Scissors size={14} /></TransportBtn>
      </div>
      <div className="ml-auto font-mono-az text-xs text-[var(--az-muted-console)]">{tc} <span className="opacity-40">/ 00:00:12:00</span></div>
    </div>

    <div className="relative bg-[var(--az-deep)] px-5 py-3">
      <div className="relative mb-2 ml-[112px] h-4 select-none">
        {Array.from({ length: DURATION + 1 }).map((_, i) => (
          <span key={i} className="absolute top-0 -translate-x-1/2 font-mono-az text-[9px] text-[var(--az-muted-console)]" style={{ left: `${(i / DURATION) * 100}%` }}>{i}s</span>
        ))}
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute -top-2 bottom-0 z-20" style={{ left: `calc(112px + ${playhead}% * ((100% - 112px) / 100))` }}>
          <div className="relative h-full">
            <div className="absolute -left-[5px] -top-1 h-2.5 w-2.5 rotate-45" style={{ background: "var(--az-pink)" }} />
            <div className="h-full w-px" style={{ background: "var(--az-pink)", boxShadow: "0 0 8px var(--az-pink)" }} />
          </div>
        </div>
        <div className="space-y-1.5">
          {TIMELINE_TRACKS.map((track) => (
            <div key={track.id} className="flex items-center">
              <div className="w-[112px] shrink-0 pr-3 font-mono-az text-[9px] tracking-wider text-[var(--az-muted-console)]">{track.name}</div>
              <div className="relative h-9 flex-1 rounded-md border border-[var(--az-border-console)] bg-white/[0.015]">
                {TIMELINE_CLIPS.filter((c) => c.track === track.id).map((clip) => (
                  <div key={clip.id} className="group absolute top-1 bottom-1 overflow-hidden rounded-[5px] px-2 text-[10px]"
                    style={{ left: `${clip.start}%`, width: `${clip.width}%`, background: `color-mix(in srgb, ${clip.color} 22%, transparent)`, borderLeft: `2px solid ${clip.color}` }}>
                    {clip.type === "audio" ? (
                      <div className="flex h-full items-center gap-[2px]">
                        {Array.from({ length: 28 }).map((_, i) => (
                          <span key={i} className="w-[2px] origin-center rounded-full"
                            style={{ height: "70%", background: clip.color, animation: `az-wave ${0.7 + (i % 5) * 0.12}s ease-in-out ${i * 0.04}s infinite`, opacity: 0.7 }} />
                        ))}
                      </div>
                    ) : (
                      <span className="flex h-full items-center truncate font-mono-az tracking-tight" style={{ color: clip.color }}>{clip.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--az-border-console)] pt-3">
        {EDIT_NOTES.map((n, i) => (
          <span key={i} className="text-[11px] text-[var(--az-muted-console)]"><span style={{ color: "var(--az-blue)" }}>—</span> {n}</span>
        ))}
      </div>
    </div>
  </div>
);
};

const TransportBtn = ({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string; }) => (
<button onClick={onClick} aria-label={label}
  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--az-border-console)] text-[var(--az-muted-console)] transition-colors hover:border-[var(--az-border-bright-console)] hover:text-white">
  {children}
</button>
);
export default EditTimeline;
