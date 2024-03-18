import { useEffect, useRef, useState } from "react";
import { select } from "d3";

import { CoininfoType, TimeType } from "@/common/types/data.type";
import drawLineGraph from "./drawLineGraph";
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
  timerReset,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const svgRef = useRef(null);

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
        drawLineGraph(selectedMenuType, svgRef.current, 765, 220, data);
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
      <CoinGraphMenu
        selectedMenuType={selectedMenuType}
        menuClickHandler={menuClickHandler}
        isLoading={isLoading}
      />
      {isError && <Error style="pt-[80px]" />}
      {isLoading && <Loading />}
      <svg
        data-testid="coin-banner-graph"
        ref={svgRef}
        viewBox={`0 0 ${765} ${220}`}
      ></svg>
    </>
  );
}

export default CoinBannerGraph;
