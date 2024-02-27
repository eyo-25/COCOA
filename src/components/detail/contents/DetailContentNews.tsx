import { useCoinNews } from "@/common/apis/api";
import { useEffect, useState } from "react";
import { NewsListType } from "@/common/types/data.type";
import { useParams } from "react-router-dom";
import NewsCardList from "./NewsCardList";

function DetailContentNews() {
  const { coinSymbol } = useParams();
  const { data, isLoading } = useCoinNews(String(coinSymbol));
  const [newsList, setNewsList] = useState<NewsListType[]>([]);

  useEffect(() => {
    if (!data) return;

    const formattedData = data.Data.map((item) => {
      const { id, imageurl, title, url, body, tags, categories, source } = item;
      const tagArr = [];
      if (tags !== "") {
        tagArr.push(...tags.split("|"));
      }

      return {
        id,
        imageurl,
        title,
        url,
        body,
        tags: tagArr,
        categories,
        source,
      };
    });

    setNewsList(formattedData);
  }, [data]);

  return (
    <div className="grid grid-cols-3 mb-8">
      {isLoading && <p>Loading...</p>}
      {0 < newsList.length && <NewsCardList newsList={newsList} />}
    </div>
  );
}

export default DetailContentNews;