import { useEffect, useRef, useState } from "react";
import { Roll } from "./Text";
import { profile } from "../data/profile";
import { formatTime, useActiveSection, useMinuteClock } from "../lib/hooks";
import { scrollToId, useScrollLock } from "../lib/motion";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "playground", label: "Playground" },
  { id: "contact", label: "Contact" },
];

const Menu = ({ onClose }) => {
  const ref = useRef(null);
  const active = useActiveSection(LINKS.map((l) => l.id));
  const now = useMinuteClock();
  useScrollLock();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    onClose();
    // Wait for the scroll lock to release before scrolling.
    setTimeout(() => scrollToId(id), 0);
  };

  return (
    <dialog
      ref={ref}
      className="menu"
      aria-label="Menu"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className="menu__close" onClick={onClose} aria-label="Close menu">
        ✕
      </button>
      <div className="menu__inner">
        <p className="menu__label eyebrow">Navigation</p>
        <nav className="menu__links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} aria-current={active === l.id ? "true" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <p className="eyebrow">
            {profile.location} · {formatTime(now, profile.timeZone)}
          </p>
          <div className="menu__socials">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                <Roll>{l.label}</Roll>
              </a>
            ))}
            <a href={`mailto:${profile.email}`}>
              <Roll>Email</Roll>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
};

const Header = () => {
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fabRef = useRef(null);

  // The floating menu button appears once the top bar has scrolled away.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    fabRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="wrap header__inner">
          <a className="brand" href="#top" aria-label="Nischal Pandey — back to top">
            <span className="brand__mark" aria-hidden="true">©</span>
            <Roll>Nischal Pandey</Roll>
          </a>
          <nav className="nav" aria-label="Sections">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                <Roll>{l.label}</Roll>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <button
        ref={fabRef}
        type="button"
        className="menu-fab"
        data-visible={scrolled}
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <span className="menu-fab__bars" aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      {menuOpen && <Menu onClose={closeMenu} />}
    </>
  );
};

export default Header;
