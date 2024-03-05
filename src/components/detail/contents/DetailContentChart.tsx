import { TimeType } from "@/common/types/data.type";
import { select } from "d3";
import { useEffect, useRef, useState } from "react";
import drawLineGraph from "../../main/coinbanner/drawLineGraph";
import CoinGraphMenu from "../../main/coinbanner/CoinGraphMenu";
import Loading from "@/components/ui/Loading";
import { fetchOHLCVData } from "@/common/apis/fetchOHLCVData";
import Error from "@/components/ui/Error";

type Props = {
  coinSymbol: string;
};

function DetailContentChart({ coinSymbol }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMenuType, setSelectedMenuType] = useState<TimeType>("day");
  const svgRef = useRef(null);

  const getOHLCVDData = async () => {
    setIsLoading(true);

    try {
      const data = await fetchOHLCVData(selectedMenuType, String(coinSymbol));

      if (svgRef.current) {
        drawLineGraph(selectedMenuType, svgRef.current, 800, 230, data);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const graphMenuClickHandler = async (timeType: TimeType) => {
    if (selectedMenuType === timeType || isLoading) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    setSelectedMenuType(timeType);
  };

  useEffect(() => {
    getOHLCVDData();
  }, [selectedMenuType]);

  return (
    <div className="w-full h-[400px] overflow-hidden bg-gray-700 rounded-md px-11 pt-10 pb-11">
      <h2 className="text-xl font-bold text-gray-100">시세차트</h2>
      <CoinGraphMenu
        selectedMenuType={selectedMenuType}
        menuClickHandler={graphMenuClickHandler}
      />
      {isError && <Error />}
      {isLoading && <Loading />}
      <svg ref={svgRef} viewBox={`0 0 ${800} ${230}`}></svg>
    </div>
  );
}

export default DetailContentChart;
