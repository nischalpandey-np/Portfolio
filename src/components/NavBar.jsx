import { useState, useEffect } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Home", href: "#hero", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Projects", href: "#projects", num: "03" },
  { label: "Experience", href: "#experience", num: "04" },
];

const NavBar = ({ theme, setTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <>
      {/* Floating Bottom Dock */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-fit"
      >
        <div className="glass-panel rounded-full px-4 sm:px-6 py-3 flex items-center justify-between sm:justify-center shadow-2xl gap-2 sm:gap-6 border border-gray-200/50 dark:border-white/10">

          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-300 uppercase tracking-widest group ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <span className={`text-[10px] font-black transition-colors duration-300 ${isActive ? "text-primary" : "text-gray-300 dark:text-gray-700 group-hover:text-primary/50"}`}>
                    {link.num}
                  </span>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <img src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon} alt="Menu" className="w-5 h-5" />
          </motion.button>

          {/* Action Area (Theme + CTA) */}
          <div className="flex items-center gap-3 sm:border-l sm:border-gray-300 dark:sm:border-gray-700 sm:pl-6">
            <ThemeToggleBtn theme={theme} setTheme={setTheme} />
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#contact-us"
              className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm px-5 py-2.5 rounded-full font-black uppercase tracking-widest hover:opacity-95 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/30"
            >
              Let's Talk
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#fafafa] dark:bg-[#09090b] flex flex-col items-center justify-center p-6 sm:hidden"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src={assets.close_icon} alt="Close" className="w-4 h-4 dark:invert" />
            </motion.button>

            <nav className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-4xl font-black uppercase tracking-tighter ${activeSection === link.href.replace('#','') ? 'gradient-text' : 'text-gray-900 dark:text-white'}`}
                >
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-600 mr-2">{link.num}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ease: "easeOut" }}
                href="#contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 bg-gradient-to-r from-primary to-accent text-white text-xl font-black uppercase tracking-widest px-8 py-4 rounded-full shadow-xl shadow-primary/30"
              >
                Let's Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
