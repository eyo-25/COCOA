import { useCoinFeedsNews } from "@/common/apis/api";
import { NewsListType } from "@/common/types/data.type";
import { getNewsData } from "@/common/utils/getNewsData";
import { useEffect, useState } from "react";
import NewsCardList from "../ui/NewsCardList";
import NewsListSkeleton from "../ui/NewsCardListSkeleton";

type Props = {
  feed: string;
};

function NewsBoard({ feed }: Props) {
  const [newsList, setNewsList] = useState<NewsListType[]>([]);

  const { data, isLoading } = useCoinFeedsNews(feed);

  useEffect(() => {
    if (!data) return;
    setNewsList(getNewsData(data));
  }, [data]);

  return (
    <>
      {isLoading && <NewsListSkeleton />}
      {!isLoading && 0 < newsList.length && (
        <NewsCardList newsList={newsList} />
      )}
    </>
  );
}

export default NewsBoard;
