import { useEffect, useRef, useState } from "react";
import { select } from "d3";
import { CoininfoType, TimeType } from "@/common/types/data.type";
import drawLineGraph from "./drawLineGraph";
import { fetchOHLCVData } from "@/common/apis/api";
import { PlayIcon, StopIcon } from "@/common/assets";
import { LoadingSpinner } from "@/common/gif";
import CoinTitle from "@/components/ui/CoinTitle";
import CoinGraphMenu from "./CoinGraphMenu";

type Props = {
  isBannerStop: boolean;
  displayCoin: CoininfoType;
  selectedMenuType: TimeType;
  setSelectedMenuType: React.Dispatch<React.SetStateAction<TimeType>>;
  timerStop: () => void;
  timerReset: () => void;
};

function CoinBannerGraph({
  isBannerStop,
  displayCoin,
  selectedMenuType,
  setSelectedMenuType,
  timerStop,
  timerReset,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const svgRef = useRef(null);

  const onBannerStart = () => {
    if (!isBannerStop) return;
    timerReset();
  };

  const menuClickHandler = async (timeType: TimeType) => {
    if (selectedMenuType === timeType || isLoading) return;
    setSelectedMenuType(timeType);
    if (!isBannerStop) {
      timerReset();
    }
  };

  const getOHLCVDData = async () => {
    setIsLoading(true);

    try {
      const data = await fetchOHLCVData(selectedMenuType, displayCoin.Internal);

      if (svgRef.current) {
        drawLineGraph(selectedMenuType, svgRef.current, 780, 220, data);
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
          <CoinTitle displayCoin={displayCoin} />
          <div className="flex gap-2">
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
        <CoinGraphMenu
          selectedMenuType={selectedMenuType}
          menuClickHandler={menuClickHandler}
        />
        {isLoading && (
          <div className="absolute flex-center flex-col w-full h-[220px] text-gray-100">
            <img className="w-10 h-10" alt="로딩 스피너" src={LoadingSpinner} />
            <p className="mt-2 mb-6">Loading...</p>
          </div>
        )}
        <svg ref={svgRef} viewBox={`0 0 ${780} ${220}`}></svg>
      </div>
    </>
  );
}

export default CoinBannerGraph;
