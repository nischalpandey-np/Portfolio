import { useScroll, useSpring, motion } from "motion/react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #5044e5, #7c3aed, #a855f7)",
      }}
    />
  );
};

export default ScrollProgress;
