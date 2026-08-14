import { motion } from "motion/react";

/**
 * Reusable Section Title Component
 * 
 * Standardized typography layout for section headers.
 * Includes a decorative accent dot and an optional description.
 * 
 * @param {Object} props
 * @param {string} props.title - The main large heading
 * @param {string} [props.desc] - Optional description text
 * @param {string} [props.description] - Optional description text (alternative prop)
 * @returns {JSX.Element} The rendered title block
 */
const Title = ({ title, desc, description }) => {
  const subtitle = desc || description;

  return (
    <div className="flex flex-col items-start w-full mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-end gap-4"
      >
        <h2 className="text-[11vw] sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
          {title}
        </h2>
        {/* Decorative accent dot */}
        <span className="mb-2 md:mb-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl text-left text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed mt-4 font-medium"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default Title;
