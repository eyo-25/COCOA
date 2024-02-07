import { useEffect, useState } from "react";
import CoinChartBoard from "./CoinChartBoard";
import CoinChartMenu from "./CoinChartMenu";
import { useCoinTrends } from "@/common/apis/api";
import { menuList } from "./CoinChart.data";
import { CoinChartDataType } from "@/common/types/data.type";
import { getChartData } from "@/common/utils/getChartData";

function CoinChartSection() {
  const [chartData, setChartData] = useState<CoinChartDataType[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const { data, isLoading } = useCoinTrends(menuList[selectedMenuId].url);

  const menuClickHandler = (id: number) => {
    setSelectedMenuId(id);
  };

  useEffect(() => {
    if (!data) return;
    setChartData(getChartData(data));
  }, [data]);

  return (
    <section className="flex flex-col max-w-6xl px-8 mx-auto mt-10 mb-4">
      <CoinChartMenu
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      <div className="w-full h-full bg-gray-700 rounded-md px-7">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CoinChartBoard chartData={chartData} />
        )}
      </div>
    </section>
  );
}

export default CoinChartSection;
