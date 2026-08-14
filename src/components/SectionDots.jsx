import { useEffect, useState } from "react";
import { motion } from "motion/react";

const sections = [
  { id: "hero",       label: "Home" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact-us", label: "Contact" },
];

/**
 * Section Navigation Dots Component
 * 
 * Renders a fixed vertical navigation bar on the right side of the screen.
 * Automatically tracks which section is currently in view using IntersectionObserver
 * and allows clicking dots to smoothly scroll to specific sections.
 * 
 * @returns {JSX.Element} The interactive navigation dots
 */
const SectionDots = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label={`Go to ${label}`}
            className="section-dot-btn relative flex items-center justify-end group"
          >
            {/* Label */}
            <span className="section-dot-label text-gray-500 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-200">
              {label}
            </span>

            {/* Dot */}
            <motion.div
              animate={{
                width: isActive ? 28 : 6,
                height: isActive ? 6 : 6,
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full ml-2 flex-shrink-0"
              style={{
                background: isActive
                  ? "linear-gradient(90deg, #5044e5, #7c3aed)"
                  : "#a1a1aa",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SectionDots;
