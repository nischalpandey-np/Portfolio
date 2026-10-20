import { useLayoutEffect, useRef, useState } from "react";

/**
 * Scales fixed-size content (the retro games) uniformly to fit its
 * container, so the same component works on the TV screen and in a window.
 */
const ScaleToFit = ({ children, max = 1.6 }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const update = () => {
      const w = inner.offsetWidth;
      const h = inner.offsetHeight;
      if (!w || !h) return;
      setScale(Math.min(outer.clientWidth / w, outer.clientHeight / h, max));
    };
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    observer.observe(inner);
    update();
    return () => observer.disconnect();
  }, [max]);

  return (
    <div className="fit" ref={outerRef}>
      <div
        className="fit__inner"
        ref={innerRef}
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaleToFit;
