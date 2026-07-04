import { useEffect, useState } from "react";
import { motion } from "motion/react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Dot — tight follow */}
      <motion.div
        className="cursor-dot hidden sm:block fixed top-0 left-0 pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.05 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#5044E5",
        }}
      />
      {/* Ring — laggy spring follow */}
      <motion.div
        className="cursor-ring hidden sm:block fixed top-0 left-0 pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 14),
          y: mousePosition.y - (isHovering ? 20 : 14),
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.5 }}
        style={{
          width: isHovering ? 40 : 28,
          height: isHovering ? 40 : 28,
          borderRadius: "50%",
          border: "1.5px solid #5044E5",
        }}
      />
    </>
  );
};

export default CustomCursor;
