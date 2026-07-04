import Title from "./Title";
import { motion } from "motion/react";

const Experience = () => {
  const experienceData = [
    {
      role: " Frontend Developer",
      company: "Rahu Doom Pvt Ltd",
      period: "May 2026 - Present",
      type: "work",
      description:
        "Built and deployed production-ready web applications, configured custom domains, and contributed to open-source projects.",
    },
    {
      role: "B.Sc. CSIT",
      company: "Metropolitan College, Kathmandu",
      period: "2025 - Present",
      type: "edu",
      description:
        "Relevant coursework: Data Structures, Database Systems, Web Technologies, Operating Systems, Frontend Development.",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="experience"
      className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 pt-32 text-gray-900 dark:text-white"
    >
      <Title
        title="Background"
        desc="Professional experience and academic foundation."
      />

      <div className="w-full flex flex-col mt-8 border-t border-gray-200 dark:border-gray-800">
        {experienceData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, margin: "-50px" }}
            key={index}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-12 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#121214] transition-colors duration-300 px-4 -mx-4 rounded-xl"
          >
            {/* Left: Role and Company */}
            <div className="flex flex-col flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                {item.type === "work" ? "Experience" : "Education"}
              </span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                {item.role}
              </h3>
              <p className="text-lg md:text-xl font-semibold text-gray-500 dark:text-gray-400 mt-2">
                {item.company}
              </p>
            </div>

            {/* Right: Period and Description */}
            <div className="flex flex-col md:items-end mt-6 md:mt-0 max-w-md w-full md:text-right">
              <span className="text-sm md:text-base font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full self-start md:self-end mb-4">
                {item.period}
              </span>
              <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
