import { OHLCVType, TimeType } from "@/common/types/data.type";
import { select } from "d3";
import { useEffect, useRef, useState } from "react";
import drawLineGraph from "../../main/coinbanner/drawLineGraph";
import CoinGraphMenu from "../../main/coinbanner/CoinGraphMenu";
import Loading from "@/components/ui/Loading";
import { fetchOHLCVData } from "@/common/apis/fetchOHLCVData";
import Error from "@/components/ui/Error";
import { useResponsive } from "@/common/hooks/useResonsive";

type Props = {
  coinSymbol: string;
};

function DetailContentChart({ coinSymbol }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<OHLCVType[]>([]);
  const [selectedMenuType, setSelectedMenuType] = useState<TimeType>("day");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { screenSizeWidth, screenSize } = useResponsive();
  const isSmallerThanBase = screenSize === "xs" || screenSize === "sm";

  const getChartWidth = (width: number) => {
    if (width < 1024) {
      if (width < 450) {
        return width - (16 * 2 + 20 * 2);
      } else if (width < 768) {
        return width - (16 * 2 + 24 * 2);
      } else {
        return width - (24 * 2 + 32 * 2);
      }
    } else {
      return 872;
    }
  };

  const getOHLCVDData = async () => {
    setIsLoading(true);

    try {
      const data = await fetchOHLCVData(selectedMenuType, String(coinSymbol));
      setData(data);

      if (svgRef.current) {
        drawLineGraph(
          selectedMenuType,
          svgRef.current,
          getChartWidth(screenSizeWidth),
          230,
          data,
          isSmallerThanBase ? 2 : 7
        );
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

  useEffect(() => {
    if (0 >= data.length) return;
    if (svgRef.current) {
      drawLineGraph(
        selectedMenuType,
        svgRef.current,
        getChartWidth(screenSizeWidth),
        230,
        data,
        isSmallerThanBase ? 2 : 7
      );
    }
  }, [screenSizeWidth]);

  return (
    <div className="relative w-full py-10 overflow-hidden bg-gray-700 rounded-md tablet:py-8 mini:py-6 mobile:py-5 px-11 tablet:px-8 mini:px-6 mobile:px-5">
      <h2 className="mb-5 text-xl font-bold text-gray-100">시세차트</h2>
      <CoinGraphMenu
        isLoading={isLoading}
        selectedMenuType={selectedMenuType}
        menuClickHandler={graphMenuClickHandler}
      />
      {isError && <Error style="pt-[80px]" />}
      {isLoading && <Loading />}
      <svg
        ref={svgRef}
        height={230}
        width={getChartWidth(screenSizeWidth)}
      ></svg>
    </div>
  );
}

export default DetailContentChart;
