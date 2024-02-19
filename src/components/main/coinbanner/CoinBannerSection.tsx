import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CoininfoType } from "@/common/types/data.type";
import CoinBannerGraph from "./CoinBannerGraph";
import { randomNumberGenerator } from "@/common/utils/randomNumberGenerator";

type Props = {
  coinList: CoininfoType[];
};

function CoinBannerSection({ coinList }: Props) {
  const [displayCoin, setDisplayCoin] = useState<CoininfoType | null>(null);

  useEffect(() => {
    if (!coinList.length) return;

    const randomNumber = randomNumberGenerator(0, coinList.length - 1);
    setDisplayCoin(coinList[randomNumber]);
  }, [coinList]);

  return (
    <div className="flex flex-col max-w-5xl px-8 mx-auto my-3">
      <section className="flex justify-between items-center w-full bg-gray-700 h-[345px] px-5 py-7 rounded-md">
        <button className="w-10 h-10 pr-[2px] bg-gray-800 rounded-md flex-center">
          <IoChevronBack className="w-6 h-6 mx-auto" />
        </button>
        {displayCoin && <CoinBannerGraph displayCoin={displayCoin} />}
        <button className="w-10 h-10 bg-gray-800 rounded-md flex-center pl-[2px]">
          <IoChevronForward className="w-6 h-6 mx-auto" />
        </button>
      </section>
    </div>
  );
}

export default CoinBannerSection;
