import { CoininfoType } from "@/common/types/data.type";
import { koreanCoinName } from "../main/coinchart/CoinChart.data";

type Props = {
  displayCoin: CoininfoType;
};

export default function CoinTitle({ displayCoin }: Props) {
  return (
    <div className="flex items-center">
      <div
        className={`flex overflow-hidden w-[35px] h-[35px] mr-[10px] rounded-full`}
      >
        <img
          className="w-full h-full scale-110"
          src={import.meta.env.VITE_BASE_URL + displayCoin.ImageUrl}
        />
      </div>
      <h2 className="mr-2 text-xl font-bold text-gray-100">
        {koreanCoinName[displayCoin.Internal] || displayCoin.FullName}
      </h2>
      <p className="text-gray-200 mt-[1px]">{displayCoin.Internal}</p>
    </div>
  );
}
