import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { IoChevronBack } from "react-icons/io5";

const overlayVariants = {
  animate: {
    left: [-100, 280],
    transition: { duration: 1, repeat: Infinity, type: "linear" },
  },
};

function DetailProfileSkeletonSm() {
  return (
    <div className="opacity-60">
      <div className="flex justify-between w-full mt-1 mb-[20px] mobile:mb-[15px] items-center">
        <div className="relative overflow-hidden h-[32px] w-[150px] bg-gray-600 rounded-sm">
          <motion.div
            variants={overlayVariants}
            animate="animate"
            className="absolute blur-[15px] z-10 w-[20px] h-[40px] rotate-[30deg] bg-gray-500"
          ></motion.div>
        </div>
        <Button className="w-9 h-9 tablet:w-8 tablet:h-8 mini:w-7 mini:h-7 mini:bg-inherit pr-[2px] rounded-md flex-center border-2 border-gray-500">
          <IoChevronBack className="w-6 h-6 mx-auto" />
        </Button>
      </div>
      <ul className="flex flex-col border-y py-[20px] mobile:py-[16px] border-gray-400">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="relative w-[220px] overflow-hidden flex mb-3 last:mb-0 h-[24px] mobile:h-[20px]"
          >
            <motion.div
              variants={overlayVariants}
              animate="animate"
              className="absolute blur-[15px] z-10 w-[20px] h-[40px] rotate-[30deg] bg-gray-500"
            ></motion.div>
            <h4 className="w-[80px] mr-5 bg-gray-600 rounded-sm"></h4>
            <p className="bg-gray-600 rounded-sm w-[120px]"></p>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col py-[20px] mb-[6px] mobile:py-[16px] border-b border-gray-400">
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            className="relative w-[220px] overflow-hidden flex mb-3 last:mb-0 h-[24px] mobile:h-[20px]"
          >
            <motion.div
              variants={overlayVariants}
              animate="animate"
              className="absolute blur-[15px] z-10 w-[20px] h-[40px] rotate-[30deg] bg-gray-500"
            ></motion.div>
            <h4 className="w-[80px] mr-5 bg-gray-600 rounded-sm"></h4>
            <p className="bg-gray-600 rounded-sm w-[120px]"></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailProfileSkeletonSm;
