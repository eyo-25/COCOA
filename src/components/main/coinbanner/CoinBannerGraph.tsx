import { useEffect, useRef, useState } from "react";
import { select } from "d3";
import { CoininfoType, TimeType } from "@/common/types/data.type";
import { bannerMenuList, koreanCoinName } from "../coinchart/CoinChart.data";
import drawLineGraph from "./drawLineGraph";
import { fetchOHLCVData } from "@/common/apis/api";
import { PlayIcon, StopIcon } from "@/common/assets";
import { LoadingSpinner } from "@/common/gif";

type Props = {
  isBannerStop: boolean;
  displayCoin: CoininfoType;
  selectedMenuType: TimeType;
  setSelectedMenuType: React.Dispatch<React.SetStateAction<TimeType>>;
  timerStop: () => void;
  timerStart: () => void;
};

function CoinBannerGraph({
  isBannerStop,
  displayCoin,
  selectedMenuType,
  setSelectedMenuType,
  timerStop,
  timerStart,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const svgRef = useRef(null);

  const onBannerStop = () => {
    console.log("멈춰!");
    timerStop();
  };
  const onBannerStart = () => {
    if (!isBannerStop) return;
    console.log("시작!");
    timerStart();
  };

  const menuClickHandler = async (timeType: TimeType) => {
    if (selectedMenuType === timeType) return;
    setSelectedMenuType(timeType);
    timerStop();
    if (!isBannerStop) {
      timerStart();
    }
  };

  const getOHLCVDData = async () => {
    setIsLoading(true);

    try {
      const filteredData = await fetchOHLCVData(
        selectedMenuType,
        displayCoin.Internal
      );

      if (svgRef.current) {
        drawLineGraph(selectedMenuType, svgRef.current, 780, 220, filteredData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    getOHLCVDData();
  }, [selectedMenuType, displayCoin]);

  return (
    <>
      <div className="relative w-[780px] h-full max-h-[350px] mx-auto pl-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex overflow-hidden w-8 h-8 mr-[10px]  rounded-full">
              <img
                className="w-full h-full scale-110"
                src={import.meta.env.VITE_BASE_URL + displayCoin.ImageUrl}
              />
            </div>
            <h2 className="mr-2 text-xl font-bold text-gray-100">
              {koreanCoinName[displayCoin.Internal] || displayCoin.FullName}
            </h2>
            <p className="text-gray-200 ">{displayCoin.Internal}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-center pb-[0.5px] w-[29px] h-[29px] bg-gray-800 rounded-full">
              <StopIcon
                onClick={onBannerStop}
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
        <ul className="flex mb-[14px] mt-4 text-sm text-gray-300">
          {bannerMenuList.map(({ title, timeType }, i) => (
            <li
              className="w-20 h-4 border-l border-gray-300 flex-center last:border-r"
              key={i}
            >
              <button
                className={`${
                  selectedMenuType === timeType && "font-bold text-green"
                }`}
                onClick={() => menuClickHandler(timeType)}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
        {isLoading && (
          <div className="absolute flex-center flex-col w-full h-[220px] text-gray-100">
            <img className="w-10 h-10" src={LoadingSpinner} />
            <p className="mt-2 mb-6">Loading...</p>
          </div>
        )}
        <svg ref={svgRef} viewBox={`0 0 ${780} ${220}`}></svg>
      </div>
    </>
  );
}

export default CoinBannerGraph;
