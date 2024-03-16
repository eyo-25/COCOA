import { CoininfoType } from "@/common/types/data.type";
import { koreanCoinName } from "../main/coinchart/CoinChart.data";

type Props = {
  displayCoin: CoininfoType;
};

export default function CoinTitle({ displayCoin }: Props) {
  return (
    <div className="flex items-center">
      <div
        className={`flex overflow-hidden w-[35px] h-[35px] tablet:w-8 tablet:h-8 mr-[10px] rounded-full`}
      >
        <img
          data-testid="coin-icon"
          alt={displayCoin.FullName}
          className="w-full h-full scale-110"
          src={`${import.meta.env.VITE_BASE_URL}${displayCoin.ImageUrl}`}
        />
      </div>
      <h2 className="mr-2 text-xl font-bold text-gray-100 tablet:text-lg">
        {koreanCoinName[displayCoin.Internal] || displayCoin.FullName}
      </h2>
      <p className="text-gray-200 mt-[1px] tablet:mt-[3px] tablet:text-xs">
        {displayCoin.Internal}
      </p>
    </div>
  );
}
