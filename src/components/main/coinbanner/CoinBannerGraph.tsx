import { CoininfoType, TimeType } from "@/common/types/data.type";
import { bannerMenuList, koreanCoinName } from "../coinchart/CoinChart.data";
import { useCoinOHLCV } from "@/common/apis/api";
import { useEffect, useRef, useState } from "react";
import drawLineGraph from "./drawLineGraph";

type Props = {
  displayCoin: CoininfoType;
};

function CoinBannerGraph({ displayCoin }: Props) {
  const [selectedMenuType, setSelectedMenuType] = useState<TimeType>("hour");
  const { data, isLoading, error } = useCoinOHLCV(
    selectedMenuType,
    displayCoin.Internal
  );
  const svgRef = useRef(null);

  const menuClickHandler = (timeType: TimeType) => {
    if (selectedMenuType === timeType) return;
    setSelectedMenuType(timeType);
  };

  useEffect(() => {
    if (!data) return;

    const filteredData = data.Data.Data.map((item) => {
      const { close, time } = item;
      return { close, time };
    });

    if (svgRef.current) {
      drawLineGraph(selectedMenuType, svgRef.current, 780, 220, filteredData);
    }
  }, [data]);

  return (
    <>
      <div className="w-[780px] h-full mx-auto pl-4">
        <div className="flex items-center mb-3">
          <div className="flex overflow-hidden w-8 h-8 mr-[10px]  rounded-full">
            <img
              className="w-full h-full scale-125"
              src={import.meta.env.VITE_BASE_URL + displayCoin.ImageUrl}
            />
          </div>
          <h2 className="mr-2 text-xl font-bold text-gray-100">
            {koreanCoinName[displayCoin.Internal] || displayCoin.FullName}
          </h2>
          <p className="text-lg text-gray-200">{displayCoin.Internal}</p>
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
        {error && <p>An unexpected error occurred. Please try again later.</p>}
        {isLoading && <p>isLoading...</p>}
        {data && <svg ref={svgRef} width={780} height={220}></svg>}
      </div>
    </>
  );
}

export default CoinBannerGraph;
