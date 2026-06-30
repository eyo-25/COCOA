import { useEffect, useState } from "react";

import CoinChartBoard from "./CoinChartBoard";
import CoinChartMenu from "../../ui/CoinChartMenu";
import {
  chartMenuList,
  chartWidthList,
  menuList,
  screenGridOffset,
} from "./CoinChart.data";
import { CoinChartDataType } from "@/common/types/data.type";
import { getChartData } from "@/common/utils/getChartData";
import { useCoinTrends } from "@/common/apis/useCoinTrends";
import CoinChartSkeleton from "./CoinChartSkeleton";
import Error from "@/components/ui/Error";
import { useResponsive } from "@/common/hooks/useResonsive";

function CoinChartSection() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const [chartData, setChartData] = useState<CoinChartDataType[]>([]);
  const { screenSize } = useResponsive();
  const { data, isLoading, error } = useCoinTrends(
    menuList[selectedMenuId].url
  );

  const menuClickHandler = (id: number) => {
    if (selectedMenuId === id) return;
    setSelectedMenuId(id);
  };

  useEffect(() => {
    if (!data) return;

    const chatDataRes = getChartData(data);

    setChartData(chatDataRes);
  }, [data]);

  return (
    <section className="mb-4">
      <CoinChartMenu
        menuList={menuList}
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      <div className="relative flex flex-col w-full h-full min-h-[1200px] mini:min-h-[1000px] mobile:min-h-[1000px] bg-gray-700 rounded-md py-5 mobile:py-4 px-7 tablet:px-5 mini:px-4 mobile:px-3">
        {error && <Error style="pt-[80px]" />}
        {data && chartData.length <= 0 && (
          <Error style="pt-[80px]" text="데이터가 존재하지 않습니다." />
        )}
        <table className="flex flex-col w-full h-full">
          <thead>
            <tr className="flex w-full mb-3">
              {chartMenuList
                .slice(0, screenGridOffset[screenSize])
                .map(({ label }, i) => (
                  <th
                    className="font-[500]"
                    key={label}
                    style={{
                      width: `${chartWidthList[screenSize][i]}%`,
                    }}
                  >
                    {label}
                  </th>
                ))}
            </tr>
          </thead>
          {isLoading && <CoinChartSkeleton screenSize={screenSize} />}
          {data && (
            <CoinChartBoard chartData={chartData} screenSize={screenSize} />
          )}
        </table>
      </div>
    </section>
  );
}

export default CoinChartSection;
