import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

const roles = ["MERN STACK", "FULL STACK", "REACT"];

const StatItem = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = parseInt(value);
          let startTimestamp = null;
          const duration = 1500;
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuad
            const easeProgress = progress * (2 - progress);
            setCount(Math.floor(easeProgress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tabular-nums">
        {count}
        <span className="gradient-text">+</span>
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mt-1">
        {label}
      </span>
    </div>
  );
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero"
      className="relative flex flex-col justify-start sm:justify-center min-h-[100svh] sm:min-h-[90vh] px-4 sm:px-12 lg:px-24 xl:px-40 pt-24 sm:pt-0 pb-24 sm:pb-0 overflow-hidden"
    >
      {/* ── Background Elements (Optimized) ───────────────────── */}
      <div className="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" style={{ animation: "aurora-a 20s ease-in-out infinite alternate" }} />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: "aurora-b 25s ease-in-out infinite alternate" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" style={{ animation: "aurora-c 18s ease-in-out infinite alternate" }} />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-8">
        {/* ── Top Bar / Availability ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          {/* Floating Avatar with glow ring */}
          <div className="relative animate-float">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-md animate-pulse-glow" />
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/20">
              <img
                src="/1778232119049.jpg"
                alt="Nischal"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-[#09090b]"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-black tracking-widest uppercase text-gray-900 dark:text-white">
              Nischal Pandey
            </span>
            <span className="text-xs font-medium text-emerald-500 dark:text-emerald-400 tracking-wide">
              Available for opportunities
            </span>
          </div>

          {/* Location pill */}
          <div className="hidden sm:flex items-center gap-1.5 ml-auto bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full">
            <span className="text-base">🇳🇵</span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
              Kathmandu
            </span>
          </div>
        </motion.div>

        {/* ── Brutalist Typography with Cycling Role ────────────── */}
        <div className="flex flex-col mt-4">
          {/* Cycling role text */}
          <div
            className="overflow-hidden"
            style={{ height: "clamp(3rem, 13vw, 10rem)" }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={roleIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13vw] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] font-black uppercase tracking-tighter shimmer-text"
              >
                {roles[roleIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13vw] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] font-black uppercase tracking-tighter text-outline text-outline-hover cursor-default text-right sm:text-left"
          >
            DEVELOPER
          </motion.h1>
        </div>

        {/* ── Stats Row ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="flex items-center gap-8 sm:gap-12"
        >
          <StatItem value="6" label="Projects" />
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
          <StatItem value="1" label="Year Exp" />
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-col items-start">
            <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">🏔️</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mt-1">
              Nepal
            </span>
          </div>
        </motion.div>

        {/* ── Bottom Info ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-gray-200 dark:border-gray-800 pt-8"
        >
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed font-medium">
            Engineering high-performance web applications and enterprise
            platforms. Specialized in the MERN stack — building products
            that scale.
          </p>

          <div className="flex items-center gap-3">
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="magnetic-btn group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-primary/30 hover:scale-105"
              style={{ "--mouse-x": "50%", "--mouse-y": "50%" }}
            >
              View Work
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#contact-us"
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-primary transition-colors border border-gray-200 dark:border-gray-800 px-5 py-3 rounded-full hover:border-primary/40"
            >
              Hire me
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Hint ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 hidden sm:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600">
          Scroll
        </span>
        <div className="animate-bounce-soft text-gray-400 dark:text-gray-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;