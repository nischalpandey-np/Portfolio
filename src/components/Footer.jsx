import { motion } from "motion/react";
import { useState, useEffect } from "react";

/* ── Inline logo ─────────────────────────────────────────────── */
const Logo = () => (
  <div className="flex items-center gap-3">
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 24V2H7L18 18.5V2H23V24H18L7 7.5V24H2Z"
        fill="url(#logo-grad)"
      />
      <defs>
        <linearGradient
          id="logo-grad"
          x1="2"
          y1="2"
          x2="23"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5044E5" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-black capitalize tracking-widest leading-none gradient-text">
        Nischal
      </span>
      <span className="text-sm font-semibold text-white/80">Pandey</span>
    </div>
  </div>
);

/* ── Live Nepal Clock ────────────────────────────────────────── */
const NepalClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const nepalTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(nepalTime);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="font-bold uppercase tracking-widest tabular-nums">
        🇳🇵 NPT {time}
      </span>
    </div>
  );
};

/* ── Social Icon SVGs ────────────────────────────────────────── */
const socialLinks = [
  {
    alt: "GitHub",
    href: "https://github.com/nischalpandey-np",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    alt: "LinkedIn",
    href: "https://linkedin.com/in/nischal-pandey",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    alt: "Twitter / X",
    href: "https://twitter.com/nischalpandey",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.257 5.622 5.907-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    alt: "Instagram",
    href: "https://instagram.com/nischal_pandey",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

/**
 * Footer Component
 *
 * Displays the page footer including copyright information, quick links, and social links.
 * Includes a real-time clock component (NepalClock) and smooth scroll-to-top functionality.
 *
 * @returns {JSX.Element} The rendered footer section
 */
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Gradient divider */}
      <div className="gradient-divider mx-4 sm:mx-12 lg:mx-24 opacity-40" />

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-gray-50 dark:bg-black/50 border-t border-gray-100 dark:border-gray-900 pb-32 sm:pb-10 pt-12 px-4 sm:px-12 lg:px-24"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Brand + tagline */}
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="max-w-xs text-sm text-gray-500 dark:text-gray-500 font-medium leading-relaxed">
                Building digital products that are fast, reliable, and
                thoughtfully designed. From Kathmandu to the world.
              </p>
              <NepalClock />
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-300 dark:text-gray-700 mb-1">
                Navigation
              </p>
              {[
                { label: "Home", href: "#hero" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Experience", href: "#experience" },
                { label: "Contact", href: "#contact-us" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-bold text-gray-500 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-300 dark:text-gray-700 mb-1">
                Connect
              </p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((s) => (
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.alt}
                    className="flex items-center gap-3 text-gray-500 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors duration-200 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {s.icon}
                    </span>
                    <span className="text-sm font-bold">{s.alt}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-900">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-700 tracking-wider uppercase">
              © {new Date().getFullYear()} Nischal Pandey. All rights reserved.
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 hover:text-primary dark:hover:text-primary transition-colors group border border-gray-200 dark:border-gray-800 hover:border-primary/30 px-4 py-2 rounded-full"
            >
              Back to top
              <span className="group-hover:-translate-y-1 transition-transform duration-200 inline-block">
                ↑
              </span>
            </motion.button>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
