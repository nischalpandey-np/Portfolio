import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from "motion/react";
import { useState, useRef } from "react";
import Title from "./Title";

/* ─── Data ──────────────────────────────────────────────────────── */
const workData = [
  {
    title: "Himalayan Bellevue Resort",
    year: "2026",
    category: "Full-Stack Platform",
    company: "Rahu Doom Pvt Ltd",
    role: "Full-Stack Developer",
    description:
      "Complete hotel booking platform with admin dashboard and RESTful Express API. Features JWT auth, Cloudinary image uploads, room management, and automated Brevo email.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    image: "/hotel_project.jpg",
    demo: "#",
    github: "#",
    featured: true,
    color: "#5044e5",
  },
  {
    title: "Aarogya Sewa Hospital",
    year: "2026",
    category: "Healthcare Platform",
    company: "Rahu Doom Pvt Ltd",
    role: "Frontend Developer",
    description:
      "Hospital platform with appointment booking, animated statistics, service showcase and doctor profiles. Built with TanStack Query for optimized data fetching.",
    tech: ["React", "TanStack Query", "Framer Motion", "Zod", "Swiper"],
    image: "/hospital_project.jpg",
    demo: "#",
    github: "#",
    color: "#0ea5e9",
  },
  {
    title: "FusionDot",
    year: "2026",
    category: "Consultancy Portal",
    company: "Rahu Doom Pvt Ltd",
    role: "Frontend Developer",
    description:
      "Modern consultancy web app with Leaflet map integration, country flags, Swiper carousels, and multi-page React Router navigation with premium animations.",
    tech: ["React", "Leaflet", "React Router", "Framer Motion", "Swiper"],
    image: "/fusiondot_project.jpg",
    demo: "#",
    github: "#",
    color: "#f59e0b",
  },
  {
    title: "HiHi Consultancy",
    year: "2026",
    category: "Corporate Website",
    company: "Rahu Doom Pvt Ltd",
    role: "Frontend Developer",
    description:
      "Multi-page corporate site with interactive world map, service listings, team profiles, and smooth page transitions with a polished professional design.",
    tech: ["React", "Tailwind CSS", "Leaflet", "Swiper", "Vite"],
    image: "/hihiconsult_project.jpg",
    demo: "#",
    github: "#",
    color: "#10b981",
  },
  {
    title: "MRDS NGO",
    year: "2026",
    category: "Non-Profit Website",
    company: "Rahu Doom Pvt Ltd",
    role: "Frontend Developer",
    description:
      "Non-profit website with mission-driven hero, program cards, animated impact statistics, and a donation CTA — built for compelling visual storytelling.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Lucide React"],
    image: "/mrds_project.jpg",
    demo: "#",
    github: "#",
    color: "#ec4899",
  },
  {
    title: "Srisha Marbel",
    year: "2025",
    category: "Business Website",
    company: "Rahu Doom Pvt Ltd",
    role: "Web Developer",
    description:
      "Premium marble & tiles business site with rich product gallery, multi-page PHP architecture, and an elegant gold-and-stone aesthetic.",
    tech: ["PHP", "HTML", "CSS", "JavaScript"],
    image: "/srisha_project.jpg",
    demo: "#",
    github: "#",
    color: "#d97706",
  },
];

/* ─── Project Row (list item) ────────────────────────────────────── */
const ProjectRow = ({ work, index, isActive, onHover, onLeave }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative flex items-center gap-6 py-6 border-b border-gray-100 dark:border-gray-900 cursor-default transition-all duration-300 ${
        isActive ? "pl-4" : "pl-0 hover:pl-4"
      }`}
    >
      {/* Active accent bar */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-400 ${
          isActive ? "h-12 opacity-100" : "h-0 opacity-0"
        }`}
        style={{ background: `linear-gradient(to bottom, ${work.color}, ${work.color}80)` }}
      />

      {/* Index */}
      <span
        className={`text-xs font-black tabular-nums tracking-widest transition-colors duration-300 min-w-[2rem] ${
          isActive ? "text-gray-400" : "text-gray-200 dark:text-gray-800 group-hover:text-gray-400"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Thumbnail (visible on hover) */}
      <div
        className={`relative overflow-hidden rounded-xl flex-shrink-0 transition-all duration-500 ${
          isActive ? "w-20 h-14 opacity-100" : "w-0 h-14 opacity-0"
        }`}
      >
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          {work.featured && (
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 px-2 py-0.5 rounded-full flex-shrink-0">
              ★ Featured
            </span>
          )}
          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight truncate transition-colors duration-300 ${
              isActive ? "" : "text-gray-900 dark:text-white"
            }`}
            style={isActive ? { color: work.color } : {}}
          >
            {work.title}
          </h3>
        </div>
        <p className={`text-xs font-bold uppercase tracking-widest mt-1 transition-colors duration-300 ${
          isActive ? "text-gray-500" : "text-gray-400 dark:text-gray-600"
        }`}>
          {work.category} · {work.year}
        </p>
      </div>

      {/* Arrow indicator */}
      <div
        className={`flex-shrink-0 transition-all duration-300 ${
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
        }`}
        style={{ color: work.color }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
};

/* ─── Preview Panel ──────────────────────────────────────────────── */
const PreviewPanel = ({ work }) => {
  const cardRef = useRef(null);
  
  // Motion values for smooth 60fps performance without React re-renders
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${work.color}25 0%, transparent 55%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={work.title}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col gap-5"
      >
        {/* Image card with 3D tilt */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-default group"
          style={{
            perspective: 900,
            rotateX,
            rotateY,
            boxShadow: `0 30px 80px -10px ${work.color}40`,
          }}
        >
          {/* Image */}
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700"
          />

          {/* Persistent bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Mouse follow glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: glowBackground,
            }}
          />

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: `${work.color}cc` }}>
                {work.category}
              </p>
              <h4 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight leading-tight">
                {work.title}
              </h4>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <a
                href={work.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-200"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href={work.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${work.color}, ${work.color}99)` }}
              >
                Live ↗
              </a>
            </div>
          </div>
        </motion.div>

        {/* Info below card */}
        <div className="flex flex-col gap-4 px-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            {work.description}
          </p>

          {/* Tech + meta row */}
          <div className="flex flex-wrap items-center gap-2">
            {work.tech.map((t, i) => (
              <span
                key={i}
                className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-200"
                style={{
                  color: work.color,
                  background: `${work.color}12`,
                  borderColor: `${work.color}30`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
            <span>{work.role}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span>{work.company}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span>{work.year}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Mobile Card ────────────────────────────────────────────────── */
const MobileCard = ({ work, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ boxShadow: `0 8px 40px -8px ${work.color}30` }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Index */}
        <span className="absolute top-4 left-4 text-xs font-black tabular-nums tracking-widest text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Featured */}
        {work.featured && (
          <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-700/40 px-2 py-1 rounded-full backdrop-blur-sm">
            ★ Featured
          </span>
        )}

        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: work.color }}>
            {work.category} · {work.year}
          </p>
          <h3 className="text-xl font-black uppercase text-white tracking-tight leading-tight">
            {work.title}
          </h3>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            {expanded ? "Less" : "Details"}
            <span
              className={`inline-block transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-white dark:bg-[#18181b] border-t"
            style={{ borderColor: `${work.color}30` }}
          >
            <div className="p-5 flex flex-col gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {work.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {work.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border"
                    style={{
                      color: work.color,
                      background: `${work.color}10`,
                      borderColor: `${work.color}25`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={work.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-3 rounded-xl font-bold text-xs tracking-widest uppercase border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
                >
                  GitHub ↗
                </a>
                <a
                  href={work.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-3 rounded-xl font-bold text-xs tracking-widest uppercase text-white"
                  style={{ background: `linear-gradient(135deg, ${work.color}, ${work.color}bb)` }}
                >
                  Live Demo ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────── */
const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="projects"
      className="w-full pt-32 pb-16 text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24">
        <Title
          title="Featured Work"
          desc="Selected projects built under Rahu Doom Pvt Ltd — spanning full-stack platforms, hospital portals, consultancy sites, NGO websites, and more."
        />
      </div>

      {/* ── Desktop: Split-Panel Layout ────────────────────────────── */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 mt-8">
        <div className="grid grid-cols-[1fr_420px] lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 lg:gap-16 items-start">

          {/* Left: Scrollable project list */}
          <div className="flex flex-col">
            {/* Counter */}
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black tabular-nums"
                style={{ color: workData[activeIndex].color }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
              <span className="text-2xl font-black text-gray-200 dark:text-gray-800">
                / {String(workData.length).padStart(2, "0")}
              </span>
            </div>

            {workData.map((work, index) => (
              <ProjectRow
                key={index}
                work={work}
                index={index}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                onLeave={() => {}}
              />
            ))}

            {/* Footer note */}
            <p className="mt-8 text-xs font-bold uppercase tracking-widest text-gray-300 dark:text-gray-700">
              All projects — Rahu Doom Pvt Ltd · 2025–2026
            </p>
          </div>

          {/* Right: Sticky preview panel */}
          <div className="sticky top-24 self-start">
            <PreviewPanel work={workData[activeIndex]} />
          </div>
        </div>
      </div>

      {/* ── Mobile: Expandable Image Cards ─────────────────────────── */}
      <div className="md:hidden max-w-7xl mx-auto px-4 mt-8 flex flex-col gap-4">
        {workData.map((work, index) => (
          <MobileCard key={index} work={work} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
