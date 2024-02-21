import { OHLCVDataType, TimeType } from "@/common/types/data.type";
import { useEffect, useRef } from "react";
import drawLineGraph from "./drawLineGraph";

type Props = {
  data: OHLCVDataType;
  selectedMenuType: TimeType;
};

function CoinGraph({ data, selectedMenuType }: Props) {
  const svgRef = useRef(null);

  useEffect(() => {
    console.log("데이터 변경");

    const filteredData = data.Data.Data.map((item) => {
      const { close, time } = item;
      return { close, time };
    });

    if (svgRef.current) {
      drawLineGraph(selectedMenuType, svgRef.current, 780, 220, filteredData);
    }
  }, [data]);

  return <svg ref={svgRef} viewBox={`0 0 ${780} ${220}`}></svg>;
}

export default CoinGraph;
