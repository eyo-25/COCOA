import { motion } from "framer-motion";

const overlayVariants = {
  animate: {
    left: [-100, 350],
    transition: { duration: 0.9, repeat: Infinity, type: "linear" },
  },
};

function NewsCardListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8 mb-8 rounded-sm opacity-60">
      {Array.from({ length: 20 }, (_, index) => (
        <div
          key={index}
          className="relative overflow-hidden flex flex-col w-[300px] mb-2"
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
