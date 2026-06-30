import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CoininfoType, TimeType } from "@/common/types/data.type";
import CoinBannerGraph from "./CoinBannerGraph";
import { randomNumberGenerator } from "@/common/utils/randomNumberGenerator";
import { useCoinTrends } from "@/common/apis/useCoinTrends";
import { Link } from "react-router-dom";
import CoinTitle from "@/components/ui/CoinTitle";
import { PlayIcon, StopIcon } from "@/common/assets";
import CoinBannerSkeleton from "./CoinBannerSkeleton";
import Button from "@/components/ui/Button";

function CoinBannerSection() {
  const [isBannerStop, setIsBannerStop] = useState<boolean>(false);
  const [coinList, setCoinList] = useState<CoininfoType[]>([]);
  const [coinIndex, setCoinIndex] = useState<number>(0);
  const [selectedMenuType, setSelectedMenuType] = useState<TimeType>("day");
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
  const { data } = useCoinTrends("/mktcapfull", 50);

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

    if (!Array.isArray(data)) {
      setCoinIndex(0);
      setCoinList([]);
      return;
    }

    const res = data.map((coinData) => {
      const { id, image, symbol, name } = coinData;
      return {
        Id: id,
        ImageUrl: image,
        Internal: symbol.toUpperCase(),
        FullName: name,
      };
    });

    if (res.length <= 0) {
      setCoinIndex(0);
      setCoinList([]);
      return;
    }

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
    <section className="flex overflow-hidden justify-between items-center px-7 py-7 mt-2 mb-1 w-full bg-gray-700 rounded-md mini:mt-1 tablet:px-5 mini:px-4 mobile:px-3 mini:py-6">
      <Button
        onClick={onLeftButtonClick}
        className="w-10 h-10 tablet:w-9 tablet:h-9 mini:w-6 mini:h-6 pr-[2px] mini:bg-inherit bg-gray-800 rounded-md flex-center"
      >
        <IoChevronBack className="mx-auto w-6 h-6" />
      </Button>
      <div className="flex flex-col relative w-[780px] mx-auto pl-4">
        {0 < coinList.length ? (
          <>
            <div className="flex relative justify-between items-center mb-5">
              <Link
                className="z-10 pr-3 rounded-md hover:bg-gray-500/30"
                to={`/assets/${coinList[coinIndex].Internal}`}
              >
                <CoinTitle displayCoin={coinList[coinIndex]} />
              </Link>
              <div className="flex z-10 gap-2">
                <Button
                  onClick={timerStop}
                  className="flex-center pb-[0.5px] w-[29px] h-[29px] mini:w-[26px] mini:h-[26px] bg-gray-800 rounded-full"
                >
                  <StopIcon fill={isBannerStop ? "#E9E9E9" : "#757575"} />
                </Button>
                <Button
                  onClick={onBannerStart}
                  className="flex-center pl-1 w-[29px] h-[29px] mini:w-[26px] mini:h-[26px] bg-gray-800 rounded-full"
                >
                  <PlayIcon fill={isBannerStop ? "#757575" : "#E9E9E9"} />
                </Button>
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
          </>
        ) : (
          <CoinBannerSkeleton />
        )}
      </div>
      <Button
        onClick={onRightButtonClick}
        className="w-10 h-10 tablet:w-9 tablet:h-9 mini:w-6 mini:h-6 pr-[2px] mini:bg-inherit bg-gray-800 rounded-md flex-center pl-[2px]"
      >
        <IoChevronForward className="mx-auto w-6 h-6" />
      </Button>
    </section>
  );
}

export default CoinBannerSection;
