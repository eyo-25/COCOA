import { motion } from "framer-motion";
import { chartSkeletonWidthList, chartWidthList } from "./CoinChart.data";
import { ResponsiveType } from "@/common/types/data.type";

type Props = {
  screenSize: ResponsiveType;
};

function CoinChartSkeleton({ screenSize }: Props) {
  const overlayVariants = {
    animate: {
      left: [-100, chartSkeletonWidthList[screenSize]],
      transition: { duration: 1, repeat: Infinity, type: "linear" },
    },
  };

  return (
    <tbody>
      {Array.from({ length: 25 }, (_, index) => (
        <tr key={index} className="relative overflow-hidden flex h-[34px] my-2">
          <motion.td
            variants={overlayVariants}
            animate="animate"
            className="absolute top-[-5px] z-10 w-[10px] h-[45px] blur-[10px] rotate-[30deg] bg-gray-600"
          ></motion.td>
          <td
            style={{
              width: `${chartWidthList[screenSize][0]}%`,
            }}
            className="relative h-full mr-3 rounded-sm bg-gray-650/70"
          ></td>
          <td
            className="relative h-full rounded-sm bg-gray-650/70"
            style={{
              width: `${100 - chartWidthList[screenSize][0]}%`,
            }}
          ></td>
        </tr>
      ))}
    </tbody>
  );
}

export default CoinChartSkeleton;
