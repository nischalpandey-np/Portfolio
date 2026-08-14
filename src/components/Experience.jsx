import Title from "./Title";
import { motion } from "motion/react";
import { useState } from "react";

const experienceData = [
  {
    role: "Frontend Developer",
    company: "Rahu Doom Pvt Ltd",
    period: "May 2026 – Present",
    type: "work",
    current: true,
    description:
      "Spearheading the development of production-ready web applications and enterprise platforms. Architecting scalable frontend solutions using modern web technologies, optimizing performance, and collaborating closely with cross-functional teams to deliver exceptional user experiences.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  },
  {
    role: "B.Sc. CSIT",
    company: "Metropolitan College, Kathmandu",
    period: "2025 – Present",
    type: "edu",
    current: true,
    description:
      "Pursuing a Bachelor's in Computer Science & Information Technology. Relevant coursework: Data Structures, Database Systems, Web Technologies, Operating Systems, Frontend Development.",
    tags: ["Algorithms", "DBMS", "Web Dev", "OS"],
  },
];

const typeConfig = {
  work: {
    label: "Experience",
    dotColor: "bg-gradient-to-br from-primary to-primary-dark",
    badgeClass: "text-primary bg-primary/10 border border-primary/20",
    icon: "💼",
  },
  edu: {
    label: "Education",
    dotColor: "bg-gradient-to-br from-accent to-purple-500",
    badgeClass: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800",
    icon: "🎓",
  },
};

/**
 * Experience & Education Section Component
 * 
 * Displays a vertical timeline of professional experience and education history.
 * Includes interactive hover effects, gradient text animations, and animated entry via framer-motion.
 * 
 * @returns {JSX.Element} The experience timeline section
 */
const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="experience"
      className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 pt-32 pb-8 text-gray-900 dark:text-white"
    >
      <Title
        title="Background"
        desc="Professional experience and academic foundation."
      />

      {/* Timeline container */}
      <div className="relative w-full pl-12 md:pl-16 mt-4">
        {/* Vertical timeline line */}
        <div className="absolute left-4 md:left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

        <div className="flex flex-col gap-0">
          {experienceData.map((item, index) => {
            const config = typeConfig[item.type];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative group pb-12 last:pb-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[2.2rem] md:-left-[2.75rem] top-1.5 flex items-center justify-center">
                  <div className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full ${config.dotColor} flex items-center justify-center shadow-lg`}>
                    <span className="text-sm md:text-base">{config.icon}</span>
                    {item.current && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-[#09090b]"></span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div className="group/card p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#18181b]/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0 justify-between">
                    <div className="flex flex-col gap-2 flex-1">
                      {/* Type badge */}
                      <span className={`self-start text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${config.badgeClass}`}>
                        {config.label}
                      </span>

                      {/* Role */}
                      <h3
                        className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight transition-all duration-300"
                        style={hoveredIndex === index ? {
                          background: "linear-gradient(135deg, #5044e5 0%, #7c3aed 55%, #a855f7 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        } : { color: "inherit" }}
                      >
                        {item.role}
                      </h3>

                      {/* Company */}
                      <p className="text-base md:text-lg font-bold text-gray-500 dark:text-gray-400">
                        {item.company}
                      </p>
                    </div>

                    {/* Period badge */}
                    <div className="flex flex-col items-start md:items-end gap-3">
                      <span className="text-sm font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full whitespace-nowrap">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Currently Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
