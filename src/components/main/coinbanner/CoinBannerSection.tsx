import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CoininfoType } from "@/common/types/data.type";
import CoinBannerGraph from "./CoinBannerGraph";
import { randomNumberGenerator } from "@/common/utils/randomNumberGenerator";
import { useCoinTrends } from "@/common/apis/api";

function CoinBannerSection() {
  const [coinList, setCoinList] = useState<CoininfoType[]>([]);
  const [coinIndex, setCoinIndex] = useState<number>(0);
  const { data } = useCoinTrends("/totalvolfull", 15);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    const res = data.Data.map((coinData) => {
      const { Id, ImageUrl, Internal, FullName } = coinData.CoinInfo;
      return { Id, ImageUrl, Internal, FullName };
    });

    const randomNumber = randomNumberGenerator(0, res.length - 1);
    setCoinIndex(randomNumber);
    setCoinList(res);
  }, [data]);

  const onLeftButtonClick = () => {
    if (coinIndex - 1 < 0) {
      setCoinIndex(coinList.length - 1);
    } else {
      setCoinIndex((prev) => prev - 1);
    }
  };
  const onRightButtonClick = () => {
    if (coinIndex + 1 >= coinList.length) {
      setCoinIndex(0);
    } else {
      setCoinIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col max-w-5xl px-8 mx-auto my-3">
      <section className="flex justify-between items-center w-full bg-gray-700 h-[345px] px-5 py-7 rounded-md">
        <button
          onClick={onLeftButtonClick}
          ref={prevButtonRef}
          className="w-10 h-10 pr-[2px] bg-gray-800 rounded-md flex-center"
        >
          <IoChevronBack className="w-6 h-6 mx-auto" />
        </button>
        {coinList.length && (
          <CoinBannerGraph displayCoin={coinList[coinIndex]} />
        )}
        <button
          onClick={onRightButtonClick}
          ref={nextButtonRef}
          className="w-10 h-10 bg-gray-800 rounded-md flex-center pl-[2px]"
        >
          <IoChevronForward className="w-6 h-6 mx-auto" />
        </button>
      </section>
    </div>
  );
}

export default CoinBannerSection;
