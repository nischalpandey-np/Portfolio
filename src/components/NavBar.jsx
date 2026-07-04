import { useState, useEffect } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion, AnimatePresence } from "motion/react";

const NavBar = ({ theme, setTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
  ];

  return (
    <>
      {/* Floating Bottom Dock */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-fit"
      >
        <div className="glass-panel rounded-full px-4 sm:px-6 py-3 flex items-center justify-between sm:justify-center shadow-2xl gap-2 sm:gap-6">
          
          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <img src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon} alt="Menu" className="w-5 h-5" />
          </button>

          {/* Action Area (Theme + CTA) */}
          <div className="flex items-center gap-3 sm:border-l sm:border-gray-300 dark:sm:border-gray-700 sm:pl-6">
            <ThemeToggleBtn theme={theme} setTheme={setTheme} />
            <a
              href="#contact-us"
              className="bg-primary text-white text-xs sm:text-sm px-5 py-2.5 rounded-full font-bold uppercase tracking-widest hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/30"
            >
              Let's Talk
            </a>
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
            <button
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src={assets.close_icon} alt="Close" className="w-4 h-4 dark:invert" />
            </button>

            <nav className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ease: "easeOut" }}
                href="#contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 text-xl font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1"
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
