import { useState } from "react";
import CoinChartMenu from "../../ui/CoinChartMenu";
import { detailMenuList } from "../../main/coinchart/CoinChart.data";
import { useParams } from "react-router-dom";
import DetailContentChart from "./DetailContentChart";
import DetailContentNews from "./DetailContentNews";

function DetailContentsSection() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const { coinSymbol } = useParams();

  const menuClickHandler = (id: number) => {
    if (selectedMenuId === id) return;
    setSelectedMenuId(id);
  };

  return (
    <section>
      <CoinChartMenu
        menuList={detailMenuList}
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      {selectedMenuId === 0 && (
        <DetailContentChart coinSymbol={String(coinSymbol)} />
      )}
      {selectedMenuId === 1 && <DetailContentNews />}
    </section>
  );
}

export default DetailContentsSection;
