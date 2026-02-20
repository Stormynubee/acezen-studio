'use client';
import { motion } from 'framer-motion';

const steps = [
    {
        num: '01',
        title: 'Strategy',
        desc: 'Backed by 4 years of shipping products. We dig deep into your business to find the most effective path forward.'
    },
    {
        num: '02',
        title: 'Execution',
        desc: 'A team of 20 designers, devs, and editors. We don\'t outsource. We build custom platforms, stunning visuals, and video content under one roof.'
    },
    {
        num: '03',
        title: 'Delivery',
        desc: 'We launch fast and flawless. Your project goes live optimized for speed, SEO, and user experience on every device.'
    },
];

export default function Process() {
    return (
        <section className="py-32 px-5 md:px-12 bg-zinc-950 relative z-10 text-white overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex justify-between items-end mb-16 md:mb-32">
                    <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none">
                        Process<span className="text-zinc-800">.</span>
                    </h2>
                    <p className="hidden md:block text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-mono pb-4">
                        Systematic Excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12 lg:gap-x-24 border-t border-white/5 pt-16">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group flex flex-col"
                        >
                            <span className="text-[6rem] md:text-[10rem] font-bold text-zinc-900 leading-none absolute -top-12 md:-top-16 -left-4 md:-left-12 -z-10 group-hover:text-zinc-800 transition-colors duration-700 select-none">
                                {step.num}
                            </span>

                            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-white group-hover:text-blue-400 transition-colors duration-500">
                                {step.title}
                            </h3>

                            <p className="text-zinc-500 leading-relaxed text-sm lg:text-base max-w-sm group-hover:text-zinc-300 transition-colors duration-500">
                                {step.desc}
                            </p>

                            <div className="mt-8 overflow-hidden h-10 flex items-center">
                                <motion.div
                                    className="w-full h-[1px] bg-white/10 relative"
                                >
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-white w-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
