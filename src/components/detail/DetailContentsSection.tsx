import { useEffect, useRef, useState } from "react";
import CoinChartMenu from "../ui/CoinChartMenu";
import { detailMenuList } from "../main/coinchart/CoinChart.data";
import { useParams } from "react-router-dom";
import { TimeType } from "@/common/types/data.type";
import { select } from "d3";
import { fetchOHLCVData } from "@/common/apis/api";
import drawLineGraph from "../main/coinbanner/drawLineGraph";
import CoinGraphMenu from "../main/coinbanner/CoinGraphMenu";

function DetailContentsSection() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const [selectedMenuType, setSelectedMenuType] = useState<TimeType>("day");
  const [isLoading, setIsLoading] = useState(false);
  const svgRef = useRef(null);
  const { coinSymbol } = useParams();

  const menuClickHandler = (id: number) => {
    if (selectedMenuId === id) return;
    setSelectedMenuId(id);
  };

  const graphMenuClickHandler = async (timeType: TimeType) => {
    if (selectedMenuType === timeType || isLoading) return;
    setSelectedMenuType(timeType);
  };

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

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    getOHLCVDData();
  }, [selectedMenuType]);

  return (
    <section className="">
      <CoinChartMenu
        menuList={detailMenuList}
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      <div className="w-full h-[400px] bg-gray-700 rounded-md px-11 py-10">
        <h2 className="mb-6 text-xl font-bold text-gray-100">시세차트</h2>
        <CoinGraphMenu
          selectedMenuType={selectedMenuType}
          menuClickHandler={graphMenuClickHandler}
        />
        {isLoading && <p className="mt-2 mb-6">Loading...</p>}
        <svg ref={svgRef} viewBox={`0 0 ${780} ${220}`}></svg>
      </div>
    </section>
  );
}

export default DetailContentsSection;
