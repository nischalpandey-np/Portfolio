import Title from "./Title";
import { motion } from "motion/react";

const coreSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Next.js",
  "Express",
];

const designSkills = [
  "Figma",
  "UI/UX",
  "Wireframing",
  "Prototyping",
  "Framer Motion",
  "Design Systems",
];

const MarqueeRow = ({ items, reverse = false }) => (
  <div className="relative flex overflow-hidden w-full group py-4 border-b border-gray-200 dark:border-gray-800">
    <div
      className={`flex whitespace-nowrap animate-marquee ${
        reverse ? "reverse" : ""
      } group-hover:[animation-play-state:paused]`}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex gap-6 md:gap-8 px-2 md:px-4 items-center"
        >
          {items.map((skill) => (
            <span
              key={skill}
              className="text-[12vw] sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-200 dark:text-gray-800 hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-default"
            >
              {skill}
              <span className="text-gray-300 dark:text-gray-700 ml-6 md:ml-8 text-[10vw] sm:text-4xl md:text-5xl align-middle">
                •
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
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
          desc="Technologies, frameworks, and methodologies."
        />
      </div>

      <div className="w-full flex flex-col mt-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#09090b]">
        <MarqueeRow items={coreSkills} />
        <MarqueeRow items={designSkills} reverse={true} />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />
    </motion.div>
  );
};

export default Skills;
