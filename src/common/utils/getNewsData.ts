import { NewsDataType, NewsListType } from "../types/data.type";

export const getNewsData = (data: NewsDataType): NewsListType[] => {
  if (data.Data.length <= 0) return [];

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

  return formattedData;
};
