import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

/* Eased counter from 0 → target over `ms` */
const useCounter = (target, ms, start) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / ms, 1);
      // ease-out cubic
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, start]);
  return val;
};

const FIRST = "NISCHAL";
const LAST = "PANDEY";
const ROLE = "Full Stack Developer";

/**
 * Loader Component
 *
 * A full-screen cinematic loading sequence displayed when the app first mounts.
 * Features animated typography and progress bar simulating initialization.
 *
 * @returns {JSX.Element} The animated loading overlay
 */
const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState("enter"); // enter → count → exit
  const [exiting, setExiting] = useState(false);
  const count = useCounter(100, 1400, phase === "count");

  /* Phase sequencer */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("count"), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (count === 100 && phase === "count") {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 900);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [count, phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#09090b] flex flex-col items-center justify-center select-none overflow-hidden ${
        exiting ? "loader-exit" : ""
      }`}
    >
      {/* Background ambient */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="48" height="48" viewBox="0 0 26 26" fill="none">
            <path
              d="M2 24V2H7L18 18.5V2H23V24H18L7 7.5V24H2Z"
              fill="url(#lg)"
            />
            <defs>
              <linearGradient
                id="lg"
                x1="2"
                y1="2"
                x2="23"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5044E5" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Name — first name reveal in gradient, last name as white */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-[0.06em] overflow-hidden">
            {FIRST.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl sm:text-7xl font-black uppercase tracking-[0.12em] gradient-text leading-none"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-black uppercase tracking-[0.12em] text-white leading-none"
          >
            {LAST}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-white/30"
          >
            {ROLE}
          </motion.p>
        </div>

        {/* Progress section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col items-center gap-3 w-48 sm:w-64"
        >
          {/* Track */}
          <div className="w-full h-[2px] bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #5044e5, #7c3aed, #a855f7)",
                width: `${count}%`,
              }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Counter */}
          <span className="text-[11px] font-black tabular-nums tracking-[0.25em] text-white/25">
            {String(count).padStart(3, "0")}
          </span>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/15">
          Kathmandu, Nepal
        </span>
      </motion.div>
    </div>
  );
};

export default Loader;
