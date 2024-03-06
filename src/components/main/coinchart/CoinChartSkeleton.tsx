import { motion } from "framer-motion";

const overlayVariants = {
  animate: {
    left: [-100, 280],
    transition: { duration: 1, repeat: Infinity, type: "linear" },
  },
};

const overlayVariants2 = {
  animate: {
    left: [-100, 700],
    transition: { duration: 1, repeat: Infinity, type: "linear" },
  },
};

function CoinChartSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 25 }, (_, index) => (
        <tr key={index} className="relative flex h-[45px] py-2">
          <td className="relative overflow-hidden w-[25%] rounded-sm mr-3 h-full bg-gray-650/70">
            <motion.div
              variants={overlayVariants}
              animate="animate"
              className="absolute top-[-10px] blur-[20px] z-10 w-[20px] h-[30px] rotate-[-30deg] bg-gray-600"
            ></motion.div>
          </td>
          <td className="relative overflow-hidden w-[75%] rounded-sm h-full bg-gray-650/70">
            <motion.div
              variants={overlayVariants2}
              animate="animate"
              className="absolute top-[-10px] blur-[20px] z-10 w-[20px] h-[30px] rotate-[-30deg] bg-gray-600"
            ></motion.div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default CoinChartSkeleton;
