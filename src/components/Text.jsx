import { useEffect, useRef } from "react";
import { useMagnetic } from "../lib/motion";

/** Words rise from behind a mask when the parent [data-reveal] scrolls in. */
export const Split = ({ text, offset = 0 }) =>
  text.split(" ").map((word, i) => (
    <span key={i} className="split__mask">
      <span className="split__word" style={{ "--i": i + offset }}>
        {word}
        {" "}
      </span>
    </span>
  ));

/** Hover label that rolls up to reveal a copy of itself. */
export const Roll = ({ children }) => (
  <span className="roll">
    <span className="roll__a">{children}</span>
    <span className="roll__b" aria-hidden="true">
      {children}
    </span>
  </span>
);

/**
 * Paragraph whose words brighten one by one as it scrolls through the
 * viewport. Progress is written to a CSS variable per word — no re-renders.
 */
export const ScrollWords = ({ text, as: Tag = "p", className = "" }) => {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    const spans = el.querySelectorAll(".w");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s.style.setProperty("--on", 1));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top of the block is at 85% of the viewport, 1 when its bottom reaches 45%.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const lit = progress * spans.length;
      spans.forEach((s, i) => s.style.setProperty("--on", Math.min(1, Math.max(0, lit - i))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Tag ref={ref} className={`scroll-words ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="w">
          {w}{" "}
        </span>
      ))}
    </Tag>
  );
};

/** Large round button that is pulled toward the cursor. */
export const Orb = ({ href, onClick, children, ghost = false, className = "" }) => {
  const ref = useMagnetic(0.4);
  const cls = `orb ${ghost ? "orb--ghost" : ""} ${className}`;
  const label = (
    <span className="orb__label" data-magnetic-label>
      {children}
    </span>
  );
  return href ? (
    <a ref={ref} className={cls} href={href} onClick={onClick}>
      {label}
    </a>
  ) : (
    <button ref={ref} type="button" className={cls} onClick={onClick}>
      {label}
    </button>
  );
};
