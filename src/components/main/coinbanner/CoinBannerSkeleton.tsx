import { motion } from "framer-motion";

const overlayVariants = {
  animate: {
    left: [-100, 320],
    transition: { duration: 1, repeat: Infinity, type: "linear" },
  },
};

function CoinBannerSkeleton() {
  return (
    <div className="relative flex flex-col w-full">
      <div className="relative overflow-hidden h-[35px] tablet:h-[32px] mb-5 w-[175px] bg-gray-650/70 rounded-sm">
        <motion.div
          variants={overlayVariants}
          animate="animate"
          className="absolute top-[-10px] blur-[20px] z-10 w-[20px] h-[40px] rotate-[30deg] bg-gray-500/60"
        ></motion.div>
      </div>
      <div className="relative overflow-hidden h-[16px] mb-[15px] w-[320px] bg-gray-650/70 rounded-sm">
        <motion.div
          variants={overlayVariants}
          animate="animate"
          className="absolute top-[-10px] blur-[20px] z-10 w-[20px] h-[20px] rotate-[30deg] bg-gray-500/60"
        ></motion.div>
      </div>
      <svg
        className="rounded-md bg-gray-650/50"
        viewBox={`0 0 ${765} ${220}`}
      ></svg>
    </div>
  );
}

export default CoinBannerSkeleton;
