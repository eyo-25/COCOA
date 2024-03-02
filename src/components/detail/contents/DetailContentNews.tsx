import { useCoinCategoriesNews } from "@/common/apis/api";
import { useEffect, useState } from "react";
import { NewsListType } from "@/common/types/data.type";
import { useParams } from "react-router-dom";
import NewsCardList from "./NewsCardList";
import { getNewsData } from "@/common/utils/getNewsData";

function DetailContentNews() {
  const { coinSymbol } = useParams();
  const { data, isLoading } = useCoinCategoriesNews(String(coinSymbol));
  const [newsList, setNewsList] = useState<NewsListType[]>([]);

  useEffect(() => {
    if (!data) return;
    setNewsList(getNewsData(data));
  }, [data]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {0 < newsList.length && <NewsCardList newsList={newsList} />}
    </>
  );
}

export default DetailContentNews;
