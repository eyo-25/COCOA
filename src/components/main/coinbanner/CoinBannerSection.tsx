import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CoininfoType, TimeType } from "@/common/types/data.type";
import CoinBannerGraph from "./CoinBannerGraph";
import { randomNumberGenerator } from "@/common/utils/randomNumberGenerator";
import { useCoinTrends } from "@/common/apis/useCoinTrends";
import { Link } from "react-router-dom";
import CoinTitle from "@/components/ui/CoinTitle";
import { PlayIcon, StopIcon } from "@/common/assets";

function CoinBannerSection() {
  const [isBannerStop, setIsBannerStop] = useState<boolean>(false);
  const [coinList, setCoinList] = useState<CoininfoType[]>([]);
  const [coinIndex, setCoinIndex] = useState<number>(0);
  const [selectedMenuType, setSelectedMenuType] = useState<TimeType>("day");
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const { data } = useCoinTrends("/totalvolfull", 15);

  const timerStop = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      setIsBannerStop(true);
    }
  };
  const timerReset = () => {
    timerStop();
    const timer = setInterval(() => {
      onRightButtonClick();
    }, 10000);

    setIsBannerStop(false);
    timerId.current = timer;
  };
  const onBannerStart = () => {
    if (!isBannerStop) return;
    timerReset();
  };

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

  useEffect(() => {
    if (isBannerStop) return;
    timerReset();

    return () => timerStop();
  }, [coinIndex]);

  return (
    <section className="flex items-center justify-between w-full px-5 overflow-hidden bg-gray-700 rounded-md py-7">
      <button
        onClick={onLeftButtonClick}
        className="w-10 h-10 pr-[2px] bg-gray-800 rounded-md flex-center"
      >
        <IoChevronBack className="w-6 h-6 mx-auto" />
      </button>
      {0 < coinList.length ? (
        <div className="flex flex-col relative w-[780px] mx-auto pl-4">
          <div className="relative flex items-center justify-between mb-5">
            <Link
              className="z-10 pr-3 rounded-md hover:bg-gray-500/30"
              to={`/assets/${coinList[coinIndex].Internal}`}
            >
              <CoinTitle displayCoin={coinList[coinIndex]} />
            </Link>
            <div className="z-10 flex gap-2">
              <button className="flex-center pb-[0.5px] w-[29px] h-[29px] bg-gray-800 rounded-full">
                <StopIcon
                  onClick={timerStop}
                  fill={isBannerStop ? "#E9E9E9" : "#757575"}
                />
              </button>
              <button className="flex-center pl-1 w-[29px] h-[29px] bg-gray-800 rounded-full">
                <PlayIcon
                  onClick={onBannerStart}
                  fill={isBannerStop ? "#757575" : "#E9E9E9"}
                />
              </button>
            </div>
          </div>
          <CoinBannerGraph
            isBannerStop={isBannerStop}
            displayCoin={coinList[coinIndex]}
            selectedMenuType={selectedMenuType}
            setSelectedMenuType={setSelectedMenuType}
            timerStop={timerStop}
            timerReset={timerReset}
          />
        </div>
      ) : (
        <svg className="mt-[62px]" viewBox={`0 0 ${765} ${220}`}></svg>
      )}
      <button
        onClick={onRightButtonClick}
        className="w-10 h-10 bg-gray-800 rounded-md flex-center pl-[2px]"
      >
        <IoChevronForward className="w-6 h-6 mx-auto" />
      </button>
    </section>
  );
}

export default CoinBannerSection;
