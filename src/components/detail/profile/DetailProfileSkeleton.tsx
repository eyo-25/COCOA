import { motion } from "framer-motion";

const overlayVariants = {
  animate: {
    left: [-100, 280],
    transition: { duration: 1, repeat: Infinity, type: "linear" },
  },
};

function DetailProfileSkeleton() {
  return (
    <div className="flex-col flex-center opacity-60">
      <div className="mb-[25px]">
        <div className="relative overflow-hidden h-[35px] w-36 bg-gray-600 rounded-md">
          <motion.div
            variants={overlayVariants}
            animate="animate"
            className="absolute blur-[15px] z-10 w-[20px] h-[40px] rotate-[30deg] bg-gray-500"
          ></motion.div>
        </div>
      </div>
      <ul className="flex mb-8">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="relative flex flex-col items-center w-[200px]"
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
      <ul className="flex gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            className="relative overflow-hidden flex justify-between items-center rounded-sm px-5 h-[35px] w-[190px] bg-gray-600"
          >
            <motion.div
              variants={overlayVariants}
              animate="animate"
              className="absolute blur-[15px] z-10 w-[20px] h-[40px] rotate-[30deg] bg-gray-500"
            ></motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailProfileSkeleton;
