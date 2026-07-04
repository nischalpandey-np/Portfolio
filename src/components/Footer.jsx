import assets from "../assets/assets";
import { motion } from "motion/react";

/* ── Inline logo (matches NavBar) ─────────────────────────────── */
const Logo = () => (
  <div className="flex items-center gap-3">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 24V2H7L18 18.5V2H23V24H18L7 7.5V24H2Z" fill="#5044E5"/>
    </svg>
    <span className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white leading-none">
      NISCHAL
    </span>
  </div>
);

const Footer = () => {
  const socialLinks = [
    {
      icon: assets.github_icon,
      alt: "GitHub",
      href: "https://github.com/nischalpandey-np",
    },
    {
      icon: assets.linkedin_icon,
      alt: "LinkedIn",
      href: "https://linkedin.com/in/nischal-pandey",
    },
    {
      icon: assets.twitter_icon,
      alt: "Twitter / X",
      href: "https://twitter.com/nischalpandey",
    },
    {
      icon: assets.instagram_icon,
      alt: "Instagram",
      href: "https://instagram.com/nischal_pandey",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-gray-800 pb-32 sm:pb-8 pt-16 px-4 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
        
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="max-w-xs text-sm text-gray-500 dark:text-gray-500 font-medium leading-relaxed">
            Building digital products that are fast, reliable, and brutalist. From Kathmandu to the world.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
          <div className="flex items-center gap-4 border-b md:border-b-0 border-gray-200 dark:border-gray-800 pb-6 md:pb-0 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 md:hidden">Socials</span>
            <div className="flex items-center gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.alt}
                  className="hover:scale-110 transition-transform duration-200 opacity-60 hover:opacity-100 dark:opacity-40 dark:hover:opacity-100 invert-0 dark:invert"
                >
                  <img src={s.icon} alt={s.alt} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-600 tracking-wider">
            © {new Date().getFullYear()} NISCHAL PANDEY. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
