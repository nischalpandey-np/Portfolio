import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

/**
 * Custom Cursor Component
 * 
 * Replaces the default browser cursor with a custom animated dot and ring.
 * Features a trailing spring animation and hover state changes for interactive elements.
 * 
 * @returns {JSX.Element | null} The animated cursor, or null on touch devices
 */
const CustomCursor = () => {
  const [hoverState, setHoverState] = useState(null); // 'link', 'project', 'send', null
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run custom cursor logic on desktop
    if (window.innerWidth < 640) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    let timeout;
    const handleMouseOver = (e) => {
      if (timeout) clearTimeout(timeout);
      
      // Debounce the state update slightly to avoid rapid re-renders
      timeout = setTimeout(() => {
        const target = e.target;
        let newState = null;
        
        if (target.closest('.card-3d')) {
          newState = 'project';
        } else if (target.closest('#contact-submit-btn')) {
          newState = 'send';
        } else if (target.closest('a') || target.tagName === 'A' || target.closest('button')) {
          newState = 'link';
        }

        setHoverState((prev) => prev !== newState ? newState : prev);
      }, 10);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Labels for specific states
  const getLabel = () => {
    switch (hoverState) {
      case 'project': return 'VIEW';
      case 'send': return 'SEND';
      case 'link': return ''; // Using small dot for normal links
      default: return '';
    }
  };

  const label = getLabel();

  // Dynamic styles based on state
  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "transparent",
      border: "1.5px solid #5044E5",
      opacity: 0.5
    },
    link: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(80, 68, 229, 0.1)",
      border: "1.5px solid #5044E5",
      opacity: 1
    },
    project: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(80, 68, 229, 0.9)",
      border: "0px solid transparent",
      opacity: 1
    },
    send: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(124, 58, 237, 0.9)",
      border: "0px solid transparent",
      opacity: 1
    }
  };

  return (
    <>
      {/* ── Outer Ring / Shape ── */}
      <motion.div
        className="hidden sm:flex fixed top-0 left-0 pointer-events-none z-[100] items-center justify-center rounded-full overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={variants}
        animate={hoverState || "default"}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.span
          className="text-[9px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.5 }}
        >
          {label}
        </motion.span>
      </motion.div>

      {/* ── Inner Dot (Hide when interacting with labeled items) ── */}
      <motion.div
        className="hidden sm:block fixed top-0 left-0 pointer-events-none z-[100] rounded-full bg-primary"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
        }}
        animate={{
          opacity: (hoverState === 'project' || hoverState === 'send') ? 0 : 1,
          scale: hoverState === 'link' ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
