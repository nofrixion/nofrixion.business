import * as React from "react";
import { motion } from "framer-motion";

interface AnimateHeightWrapperProps {
  children: React.ReactNode;
  layoutId: string;
}

const AnimateHeightWrapper: React.FC<AnimateHeightWrapperProps> = ({ children, layoutId }) => {
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
        transitionEnd: {
          overflow: "inherit",
        },
      }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateHeightWrapper;
