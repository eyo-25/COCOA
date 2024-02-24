import { fetchOHLCVData } from "@/common/apis/api";
import { TimeType } from "@/common/types/data.type";
import { select } from "d3";
import { useEffect, useRef, useState } from "react";
import drawLineGraph from "../main/coinbanner/drawLineGraph";
import CoinGraphMenu from "../main/coinbanner/CoinGraphMenu";

type Props = {
  coinSymbol: string;
};

function DetailContentChart({ coinSymbol }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMenuType, setSelectedMenuType] = useState<TimeType>("day");
  const svgRef = useRef(null);

  const getOHLCVDData = async () => {
    setIsLoading(true);

    try {
      const data = await fetchOHLCVData(selectedMenuType, String(coinSymbol));

      if (svgRef.current) {
        drawLineGraph(selectedMenuType, svgRef.current, 780, 220, data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const graphMenuClickHandler = async (timeType: TimeType) => {
    if (selectedMenuType === timeType || isLoading) return;
    setSelectedMenuType(timeType);
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    getOHLCVDData();
  }, [selectedMenuType]);

  return (
    <div className="w-full h-[400px] bg-gray-700 rounded-md px-11 pt-10 pb-11">
      <h2 className="mb-6 text-xl font-bold text-gray-100">시세차트</h2>
      <CoinGraphMenu
        selectedMenuType={selectedMenuType}
        menuClickHandler={graphMenuClickHandler}
      />
      {isLoading && <p className="mt-2 mb-6">Loading...</p>}
      <svg ref={svgRef} viewBox={`0 0 ${780} ${220}`}></svg>
    </div>
  );
}

export default DetailContentChart;
