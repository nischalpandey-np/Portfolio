import Title from "./Title";
import { motion } from "motion/react";

const Projects = () => {
  const workData = [
    {
      title: "Himalayan Bellevue Resort",
      year: "2026",
      category: "Full-Stack Platform",
      company: "Rahu Doom Pvt Ltd",
      role: "Full-Stack Developer",
      description:
        "A complete hotel booking platform with a guest-facing website, admin dashboard, and RESTful Express API. Features include room management, online reservations, JWT authentication, Cloudinary-powered image uploads, and automated email communications via Brevo SMTP.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Brevo", "Vite", "Tailwind CSS"],
      image: "/hotel_project.jpg",
      demo: "#",
      github: "#",
    },
    {
      title: "Aarogya Sewa Hospital",
      year: "2026",
      category: "Healthcare Web Platform",
      company: "Rahu Doom Pvt Ltd",
      role: "Frontend Developer",
      description:
        "A professional hospital web platform built with React and TanStack Query for efficient data fetching. Includes an appointment booking system, animated statistics counters, service showcase, and doctor profile pages — all with a clean, trust-building medical UI.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "React Query", "React Hook Form", "Zod", "Swiper"],
      image: "/hospital_project.jpg",
      demo: "#",
      github: "#",
    },
    {
      title: "FusionDot",
      year: "2026",
      category: "Consultancy Portal",
      company: "Rahu Doom Pvt Ltd",
      role: "Frontend Developer",
      description:
        "A modern consultancy web app featuring an interactive Leaflet map, country flag integration, Swiper-powered carousels, and multi-page routing with React Router. Delivers a premium, SaaS-quality experience with smooth Framer Motion animations throughout.",
      tech: ["React", "Tailwind CSS", "Leaflet", "React Router", "Framer Motion", "Swiper", "Vite"],
      image: "/fusiondot_project.jpg",
      demo: "#",
      github: "#",
    },
    {
      title: "HiHi Consultancy",
      year: "2026",
      category: "Corporate Website",
      company: "Rahu Doom Pvt Ltd",
      role: "Frontend Developer",
      description:
        "A multi-page corporate consultancy website with an interactive world map, service listings, team profiles, and a responsive contact form. Built with React and Tailwind CSS, featuring smooth page transitions and a polished, professional corporate design.",
      tech: ["React", "Tailwind CSS", "Leaflet", "Swiper", "Framer Motion", "React Router", "Vite"],
      image: "/hihiconsult_project.jpg",
      demo: "#",
      github: "#",
    },
    {
      title: "MRDS NGO",
      year: "2026",
      category: "Non-Profit Website",
      company: "Rahu Doom Pvt Ltd",
      role: "Frontend Developer",
      description:
        "A compassionate and accessible non-profit website for MRDS featuring a mission-driven hero section, program and initiative cards, animated impact statistics, and a donation CTA. Built with React, Tailwind CSS, and Framer Motion for smooth storytelling.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "React Router", "Lucide React", "Vite"],
      image: "/mrds_project.jpg",
      demo: "#",
      github: "#",
    },
    {
      title: "Srisha Marbel",
      year: "2025",
      category: "Business Website",
      company: "Rahu Doom Pvt Ltd",
      role: "Web Developer",
      description:
        "A premium marble and tiles business website showcasing Italian marble, floor tiles, wall tiles, and custom bathroom/kitchen applications. Developed with PHP featuring a rich product gallery, multi-page architecture, and an elegant gold-and-stone aesthetic.",
      tech: ["PHP", "HTML", "CSS", "JavaScript", "Responsive Design"],
      image: "/srisha_project.jpg",
      demo: "#",
      github: "#",
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
        desc="Selected projects built under Rahu Doom Pvt Ltd — spanning full-stack platforms, hospital portals, consultancy sites, NGO websites, and more."
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
              <div className="flex flex-col">
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-500">
                  {work.title}
                </h3>
                {/* Company badge */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {work.company}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    · {work.role}
                  </span>
                </div>
              </div>
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

            {/* Description, Tech Stack & Mobile Links */}
            <div className="flex flex-col gap-4">
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
                {work.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {work.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

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
