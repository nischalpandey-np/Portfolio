import Title from "./Title";
import { motion } from "motion/react";

// Marquee helper component
const MarqueeRow = ({ items, reverse = false }) => (
  <div className="relative flex overflow-hidden w-full group py-4 border-b border-gray-200 dark:border-gray-800">
    <div className={`flex whitespace-nowrap animate-marquee ${reverse ? 'reverse' : ''} group-hover:[animation-play-state:paused]`}>
      {/* Render items 3 times for seamless infinite scroll */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-6 md:gap-8 px-2 md:px-4 items-center">
          {items.map((skill, index) => (
            <span
              key={index}
              className="text-[12vw] sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-200 dark:text-gray-800 hover:gradient-text transition-colors duration-300 cursor-default"
              style={{ WebkitTextFillColor: "inherit" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #5044e5, #7c3aed)";
                e.currentTarget.style.webkitBackgroundClip = "text";
                e.currentTarget.style.webkitTextFillColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.webkitBackgroundClip = "";
                e.currentTarget.style.webkitTextFillColor = "inherit";
              }}
            >
              {skill}
              <span className="text-gray-300 dark:text-gray-700 ml-6 md:ml-8 text-[10vw] sm:text-4xl md:text-5xl align-middle" style={{ WebkitTextFillColor: "inherit" }}>•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const techStack = [
  { name: "JavaScript", color: "#F7DF1E", bg: "#F7DF1E15", border: "#F7DF1E30", emoji: "JS" },
  { name: "TypeScript", color: "#3178C6", bg: "#3178C615", border: "#3178C630", emoji: "TS" },
  { name: "React", color: "#61DAFB", bg: "#61DAFB15", border: "#61DAFB30", emoji: "⚛" },
  { name: "Node.js", color: "#68A063", bg: "#68A06315", border: "#68A06330", emoji: "⬢" },
  { name: "MongoDB", color: "#47A248", bg: "#47A24815", border: "#47A24830", emoji: "🍃" },
  { name: "Next.js", color: "#888888", bg: "#88888815", border: "#88888830", emoji: "▲" },
  { name: "Tailwind", color: "#38BDF8", bg: "#38BDF815", border: "#38BDF830", emoji: "💨" },
  { name: "Express", color: "#888888", bg: "#88888815", border: "#88888830", emoji: "⚡" },
];

/**
 * Skills Section Component
 * 
 * Displays technical skills in an infinite scrolling marquee layout.
 * Features two rows moving in opposite directions with interactive gradient hover states.
 * 
 * @returns {JSX.Element} The infinite marquee skills section
 */
const Skills = () => {
  const coreSkills = [
    "JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Tailwind CSS", "Next.js", "Express"
  ];
  const designSkills = [
    "Figma", "UI/UX", "Wireframing", "Prototyping", "Framer Motion", "Design Systems"
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="skills"
      className="flex flex-col items-center w-full pt-32 pb-16 text-gray-900 dark:text-white overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 mb-12">
        <Title
          title="Toolkit"
          desc="Technologies, frameworks, and methodologies I use to build exceptional products."
        />
      </div>

      {/* Marquee Strip */}
      <div className="w-full flex flex-col border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#09090b]">
        <MarqueeRow items={coreSkills} />
        <MarqueeRow items={designSkills} reverse={true} />
      </div>

      {/* Core Stack Icon Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 mt-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 mb-6"
        >
          Core Stack
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 cursor-default"
              style={{
                background: tech.bg,
                borderColor: tech.border,
              }}
            >
              <span
                className="text-2xl font-black"
                style={{ color: tech.color }}
              >
                {tech.emoji}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full px-5 py-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
            Currently exploring:{" "}
            <span className="gradient-text">Docker · AWS · Redis</span>
          </span>
        </motion.div>
      </div>

      {/* Marquee keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee.reverse {
          animation-direction: reverse;
        }
      `}} />
    </motion.div>
  );
};

export default Skills;
