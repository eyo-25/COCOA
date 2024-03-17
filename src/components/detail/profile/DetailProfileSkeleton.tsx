import { motion } from "framer-motion";

const overlayVariants = {
  animate: {
    left: [-100, 280],
    transition: { duration: 1, repeat: Infinity, type: "linear" },
  },
};

function DetailProfileSkeleton() {
  return (
    <div className="flex flex-col w-full opacity-50 flex-center">
      <div className="mb-[25px]">
        <div className="relative overflow-hidden h-[35px] w-36 bg-gray-600 rounded-md">
          <motion.div
            variants={overlayVariants}
            animate="animate"
            className="absolute blur-[15px] z-10 w-[20px] h-[40px] rotate-[30deg] bg-gray-500"
          ></motion.div>
        </div>
      </div>
      <ul className="grid grid-cols-3 mb-8 tablet:mb-6 w-[65%] tablet:w-[80%] mini:w-[90%]">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="relative flex flex-col items-center w-full"
          >
            <div className="relative overflow-hidden h-[21px] w-[50%] mb-2 bg-gray-600 rounded-sm">
              <motion.div
                variants={overlayVariants}
                animate="animate"
                className="absolute blur-[15px] z-10 w-[20px] h-[25px] rotate-[30deg] bg-gray-500"
              ></motion.div>
            </div>
            <div className="relative overflow-hidden w-[60%] h-[21px] bg-gray-600 rounded-sm">
              <motion.div
                variants={overlayVariants}
                animate="animate"
                className="absolute blur-[15px] z-10 w-[20px] h-[25px] rotate-[30deg] bg-gray-500"
              ></motion.div>
            </div>
            <div className="absolute w-full h-[25px] inset-y-0 my-auto border-l border-gray-500 last:border-r"></div>
          </li>
        ))}
      </ul>
      <ul className="grid grid-cols-4 gap-5 w-[80%] mini:w-[90%] mini:gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            className="flex relative min-w-[120px] h-[36px] tablet:h-[60px] items-center justify-between w-full px-5 overflow-hidden bg-gray-600 rounded-sm py-[6px] tablet:flex-col"
          >
            <motion.div
              variants={overlayVariants}
              animate="animate"
              className="absolute blur-[15px] top-[-5px] z-10 w-[20px] h-[40px] tablet:h-[70px] rotate-[30deg] bg-gray-500"
            ></motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailProfileSkeleton;
