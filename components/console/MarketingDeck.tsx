"use client";
import { useEffect, useRef, useState } from "react";
import { GROWTH_CURVE, MARKET_PLAYS, METRICS } from "./consoleData";

const useCountUp = (target: number, run: boolean, decimals: number) => {
const [val, setVal] = useState<number>(0);
useEffect(() => {
  if (!run) return;
  let raf = 0; const start = performance.now(); const dur = 1100;
  const tick = (t: number) => {
    const p = Math.min((t - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    setVal(Number((target * eased).toFixed(decimals)));
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}, [target, run, decimals]);
return val;
};

const MarketingDeck = () => {
const [live, setLive] = useState<boolean>(false);
const ref = useRef<HTMLDivElement>(null);
useEffect(() => {
  const el = ref.current; if (!el) return;
  const obs = new IntersectionObserver(([e]) => e.isIntersecting && setLive(true), { threshold: 0.25 });
  obs.observe(el); return () => obs.disconnect();
}, []);

const max = Math.max(...GROWTH_CURVE);
const points = GROWTH_CURVE.map((v, i) => {
  const x = (i / (GROWTH_CURVE.length - 1)) * 100;
  const y = 100 - (v / max) * 92 - 4;
  return [x, y] as const;
});
const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
const areaPath = `${linePath} L 100 100 L 0 100 Z`;

return (
  <div ref={ref} className="flex h-full flex-col overflow-y-auto p-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <span className="text-technical-console">Campaign · LIVE</span>
        <h3 className="text-editorial-console mt-1 text-2xl text-white">growth, not vanity.</h3>
      </div>
      <span className="flex items-center gap-2 rounded-full border px-3 py-1 font-mono-az text-[11px]"
        style={{ borderColor: "color-mix(in srgb, var(--az-green) 40%, transparent)", color: "var(--az-green)" }}>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--az-green)" }} />tracking
      </span>
    </div>
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      {METRICS.map((m) => <MetricCard key={m.id} metric={m} live={live} />)}
    </div>
    <div className="mt-3 flex-1 rounded-xl border border-[var(--az-border-console)] bg-white/[0.012] p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono-az text-[11px] tracking-wider text-[var(--az-muted-console)]">FOLLOWER VELOCITY · 12 WK</span>
        <span className="font-mono-az text-[11px]" style={{ color: "var(--az-gold)" }}>▲ compounding</span>
      </div>
      <div className="relative h-32 w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="azFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--az-gold)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--az-gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[25, 50, 75].map((y) => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" />)}
          <path d={areaPath} fill="url(#azFill)" style={{ opacity: live ? 1 : 0, transition: "opacity 1s ease 0.4s" }} />
          <path d={linePath} fill="none" stroke="var(--az-gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: live ? 0 : 1, transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)", filter: "drop-shadow(0 0 4px rgba(200,169,126,0.4))" }} />
          {live && (
            <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="1.6" fill="var(--az-gold)">
              <animate attributeName="r" values="1.6;2.6;1.6" dur="1.8s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </div>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {MARKET_PLAYS.map((p, i) => (
        <div key={p.tag} className="rounded-lg border border-[var(--az-border-console)] bg-white/[0.012] p-3 transition-colors hover:border-[var(--az-border-bright-console)]"
          style={{ animation: live ? `az-rise 0.7s ease ${0.2 + i * 0.08}s both` : undefined }}>
          <span className="font-mono-az text-[9px] tracking-[0.3em]" style={{ color: "var(--az-gold)" }}>{p.tag}</span>
          <p className="mt-1 text-[13px] leading-snug text-[var(--az-text)]">{p.line}</p>
        </div>
      ))}
    </div>
  </div>
);
};

const MetricCard = ({ metric, live }: { metric: (typeof METRICS)[number]; live: boolean; }) => {
const decimals = metric.value % 1 !== 0 ? (metric.value < 1 ? 2 : 1) : 0;
const val = useCountUp(metric.value, live, decimals);
const isPrefix = metric.suffix === "$";
return (
  <div className="rounded-xl border border-[var(--az-border-console)] bg-white/[0.012] p-3">
    <span className="font-mono-az text-[9px] tracking-[0.2em] text-[var(--az-muted-console)]">{metric.label}</span>
    <div className="mt-1 text-editorial-console text-3xl" style={{ color: metric.tint }}>
      {isPrefix && metric.suffix}{val}{!isPrefix && <span className="text-xl">{metric.suffix}</span>}
    </div>
    <span className="font-mono-az text-[11px]" style={{ color: metric.delta.startsWith("-") ? "var(--az-green)" : "var(--az-blue)" }}>{metric.delta}</span>
  </div>
);
};
export default MarketingDeck;
