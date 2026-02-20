'use client';
import { motion } from 'framer-motion';

export default function Ticker() {
    return (
        <section className="py-12 bg-zinc-950 overflow-hidden relative z-20 border-t border-white/5 -mt-[10vh]">
            <div className="flex whitespace-nowrap">
                <TickerLine />
                <TickerLine />
            </div>
        </section>
    );
}

function TickerLine() {
    return (
        <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
            className="flex gap-8 md:gap-16 pr-8 md:pr-16 items-center"
        >
            {['Digital Excellence', '•', 'AceZen Agency', '•', 'Future Ready', '•', 'Concept to Creation', '•'].map((text, i) => (
                <span
                    key={i}
                    className="text-8xl md:text-[10rem] font-bold text-transparent tracking-tighter"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                >
                    {text}
                </span>
            ))}
        </motion.div>
    );
}
