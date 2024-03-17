import { koreanNumberFormatter } from "./koreanNumberFormatter";
import { motion } from "framer-motion";

const sildeUpVariants = {
  normal: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export const formatPercentageElement = (num: number) => {
  const fixedNum = 10000 < num ? koreanNumberFormatter(num) : num.toFixed(2);

  if (fixedNum === "0.00" || fixedNum === "-0.00") {
    return (
      <motion.p
        variants={sildeUpVariants}
        initial="normal"
        animate="animate"
        className="text-gray-200"
      >
        {fixedNum.replace("-", "")}%
      </motion.p>
    );
  }

  const sign = num >= 0 ? "+" : "";
  const textColor = num >= 0 ? "text-green" : "text-red";

  return (
    <motion.p
      variants={sildeUpVariants}
      initial="normal"
      animate="animate"
      className={textColor}
    >
      {sign + fixedNum}%
    </motion.p>
  );
};
