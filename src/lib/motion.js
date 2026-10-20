import Lenis from "lenis";
import { useEffect, useRef } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;

/** Smooth, inertial scrolling. Skipped entirely when reduced motion is requested. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
      prevent: (node) => Boolean(node.closest?.("dialog")),
    });
    return () => {
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

let locks = 0;

/** Freeze page scroll while a modal (menu, project, window) is open. */
export function useScrollLock(active = true) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      locks -= 1;
      if (locks === 0) {
        lenis?.start();
        document.documentElement.style.overflow = "";
      }
    };
  }, [active]);
}

export function scrollToId(id) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;
  if (lenis) lenis.scrollTo(target, { force: true, duration: 1.4 });
  else if (target === 0) window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
  else target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
}

/**
 * Adds `is-in` to every [data-reveal] element the first time it scrolls
 * into view. Call once, after the page has rendered.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** Element drifts toward the pointer while hovered; its label drifts a little further. */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const label = el.querySelector("[data-magnetic-label]");
    const ease = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transition = "transform 0.25s ease-out";
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      if (label) {
        label.style.transition = "transform 0.25s ease-out";
        label.style.transform = `translate(${x * strength * 0.5}px, ${y * strength * 0.5}px)`;
      }
    };
    const leave = () => {
      el.style.transition = ease;
      el.style.transform = "";
      if (label) {
        label.style.transition = ease;
        label.style.transform = "";
      }
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return ref;
}
