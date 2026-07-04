import { motion } from "motion/react";

const Hero = () => {
  return (
    <div
      id="hero"
      className="relative flex flex-col justify-start sm:justify-center min-h-[100svh] sm:min-h-[90vh] px-4 sm:px-12 lg:px-24 xl:px-40 pt-24 sm:pt-0 pb-24 sm:pb-0 overflow-hidden"
    >
      {/* ── Background Elements ─────────────────────────────────── */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-8">
        {/* ── Top Bar / Availability ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800 shadow-lg">
            <img
              src="/1778232119049.jpg"
              alt="Nischal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-widest uppercase">
              Nischal Pandey
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Available for new opportunities
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Brutalist Typography ──────────────────────────────── */}
        <div className="flex flex-col mt-4">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13vw] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] font-black uppercase tracking-tighter"
          >
            FRONTEND
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13vw] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] font-black uppercase tracking-tighter text-outline text-outline-hover cursor-default text-right sm:text-left"
          >
            DEVELOPER
          </motion.h1>
        </div>

        {/* ── Bottom Info ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-12 border-t border-gray-200 dark:border-gray-800 pt-8"
        >
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed font-medium">
            Crafting cinematic interfaces, scalable architecture, and bold
            digital experiences from Kathmandu, Nepal.
          </p>

          <a
            href="#projects"
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            View Work
            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              ↓
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;