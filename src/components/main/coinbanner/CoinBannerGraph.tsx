import { useEffect, useRef, useState } from "react";
import { select } from "d3";
import { Link } from "react-router-dom";

import { CoininfoType, TimeType } from "@/common/types/data.type";
import drawLineGraph from "./drawLineGraph";
import { PlayIcon, StopIcon } from "@/common/assets";
import CoinTitle from "@/components/ui/CoinTitle";
import CoinGraphMenu from "./CoinGraphMenu";
import Loading from "@/components/ui/Loading";
import { fetchOHLCVData } from "@/common/apis/fetchOHLCVData";
import Error from "@/components/ui/Error";

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
  const [isError, setIsError] = useState(false);
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
      setIsError(true);
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
          <Link
            className="pr-3 rounded-md hover:bg-gray-500/30"
            to={`/assets/${displayCoin.Internal}`}
          >
            <CoinTitle displayCoin={displayCoin} />
          </Link>
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
        {isError && <Error />}
        {isLoading && <Loading />}
        <svg
          data-testid="coin-banner-graph"
          ref={svgRef}
          viewBox={`0 0 ${780} ${220}`}
        ></svg>
      </div>
    </>
  );
}

export default CoinBannerGraph;
