import { useResponsive } from "@/common/hooks/useResonsive";
import { motion } from "framer-motion";
import { newsGridOffset } from "../main/coinchart/CoinChart.data";

const overlayVariants = {
  animate: {
    left: [-100, 350],
    transition: { duration: 0.9, repeat: Infinity, type: "linear" },
  },
};

function NewsCardListSkeleton() {
  const { screenSize } = useResponsive();

  return (
    <div
      className="grid mb-8 rounded-sm gap-y-6 gap-x-6 tablet:gap-x-4 mini:gap-x-3 mobile:gap-x-1 opacity-60"
      style={{
        gridTemplateColumns: `repeat(${newsGridOffset[screenSize]}, 1fr)`,
      }}
    >
      {Array.from({ length: 20 }, (_, index) => (
        <div
          key={index}
          className="relative flex flex-col w-full mb-2 overflow-hidden"
        >
          <motion.div
            variants={overlayVariants}
            animate="animate"
            className="absolute top-[-10px] blur-[20px] z-10 w-[35px] h-[500px] rotate-12 bg-gray-650"
          ></motion.div>
          <div className="relative h-[200px] rounded-md mb-4 overflow-hidden bg-gray-700"></div>
          <div className="flex flex-col overflow-hidden">
            <div className="h-8 mb-3 bg-gray-700"></div>
            <div className="h-5 mb-2 bg-gray-700"></div>
            <div className="h-5 bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsCardListSkeleton;
