import { CoinDetailInfoType } from "@/common/types/data.type";
import CoinTitle from "../../ui/CoinTitle";
import { detailChartInfoList, detailChartMenuList } from "../Detail.data";
import { formatPercentageElement } from "@/common/utils/formatPercentageElement";
import { motion } from "framer-motion";

const fadeInVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

type Props = {
  profileData: CoinDetailInfoType;
};

function DetailProfileChange({ profileData }: Props) {
  return (
    <>
      <div className="mb-[25px]">
        <CoinTitle displayCoin={profileData.coinInfo} />
      </div>
      <ul className="grid grid-cols-3 mb-8 tablet:mb-6 w-[65%] tablet:w-[80%] mini:w-[90%]">
        {detailChartMenuList.map(({ title, info }) => (
          <li
            key={title}
            className="relative flex flex-col items-center w-full"
          >
            <h4 className="text-gray-200">{title}</h4>
            <p className="text-gray-100">{profileData.coinDetail[info]}</p>
            <div className="absolute w-full h-[25px] inset-y-0 my-auto border-l border-gray-500 last:border-r"></div>
          </li>
        ))}
      </ul>
      <ul className="grid grid-cols-4 gap-5 w-[80%] mini:w-[90%] mini:gap-3">
        {detailChartInfoList.map(({ title, info }) => (
          <motion.li
            variants={fadeInVariants}
            initial="normal"
            animate="animate"
            key={title}
            className="flex min-w-[120px] items-center justify-between w-full px-5 overflow-hidden bg-gray-600 rounded-sm py-[6px] tablet:flex-col"
          >
            <p>{title}:</p>
            {formatPercentageElement(profileData.coinDetail[info])}
          </motion.li>
        ))}
      </ul>
    </>
  );
}
export default DetailProfileChange;
