import { useState } from "react";

import CoinChartMenu from "../ui/CoinChartMenu";
import NewsBoard from "./NewsBoard";
import { newsFeedList } from "./News.data";

function NewsSection() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);

  const menuClickHandler = (id: number) => {
    if (selectedMenuId === id) return;
    setSelectedMenuId(id);
  };

  return (
    <section>
      <CoinChartMenu
        menuList={newsFeedList}
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      <NewsBoard feed={newsFeedList[selectedMenuId].url} />
    </section>
  );
}

export default NewsSection;
