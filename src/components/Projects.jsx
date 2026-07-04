import Title from "./Title";
import { motion } from "motion/react";

const Projects = () => {
  const workData = [
    {
      title: "Watchlist",
      year: "2026",
      category: "Frontend Application",
      description:
        "React application with TMDB API integration, reusable UI components, loading/error states, and persistent watchlist via localStorage.",
      image: '/movie.png',
      demo: "https://searchmoviesbynischal.netlify.app",
      github: "https://github.com/nischalpandey-np/movieWatchlist",
    },
    {
      title: "Flowpad",
      year: "2025",
      category: "Productivity Dashboard",
      description:
        "Kanban-style task manager with drag-and-drop interactions, persistent storage, and responsive interface built with HTML, CSS, and JavaScript.",
      image: '/kanban.png',
      demo: "https://todobynischal.netlify.app/",
      github: "https://github.com/nischalpandey-np/flowpad",
    },
    {
      title: "Pixel Painter",
      year: "2026",
      category: "Utility",
      description:
        "PixelPainter — interactive pixel canvas with brush tools, color picker, export, and touch support for mobile devices.",
      image: '/pixel.png',
      demo: "https://pixelpainterbynischal.netlify.app/",
      github: "https://github.com/nischalpandey-np/pixel-painter",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.15 }}
      id="projects"
      className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 pt-32 text-gray-900 dark:text-white"
    >
      <Title
        title="Featured Work"
        desc="Selected projects focusing on product quality, frontend architecture, and bold UI design."
      />

      <div className="w-full flex flex-col gap-16 md:gap-32 mt-8">
        {workData.map((work, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            key={index}
            className="group relative flex flex-col gap-6"
          >
            {/* Meta Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full border-b border-gray-200 dark:border-gray-800 pb-4 mb-2">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-500">
                {work.title}
              </h3>
              <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mt-4 md:mt-0 uppercase tracking-widest">
                <span>{work.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary hidden md:block"></span>
                <span>{work.year}</span>
              </div>
            </div>

            {/* Massive Edge-to-edge Card */}
            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-gray-100 dark:bg-[#18181b] rounded-2xl md:rounded-[2rem] group-hover:shadow-2xl transition-shadow duration-500 border border-transparent group-hover:border-primary/20">
              <img
                src={work.image}
                className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
                alt={work.title}
              />

              {/* Glassmorphic hover overlay (Desktop Only) */}
              <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-6">
                <a
                  href={work.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel text-white border-white/20 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0"
                >
                  GitHub
                </a>
                <a
                  href={work.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white border border-primary px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-primary-dark transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* Description & Mobile Links */}
            <div className="flex flex-col gap-4">
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
                {work.description}
              </p>

              {/* Mobile Action Buttons */}
              <div className="flex md:hidden items-center gap-3 mt-2">
                <a
                  href={work.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-full font-bold text-xs tracking-widest uppercase"
                >
                  GitHub
                </a>
                <a
                  href={work.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-primary text-white px-4 py-3 rounded-full font-bold text-xs tracking-widest uppercase"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
