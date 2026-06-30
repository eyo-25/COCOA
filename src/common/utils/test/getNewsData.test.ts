import { expect, test } from "vitest";
import { getNewsData } from "../getNewsData";
import { NewsDataType } from "@/common/types/data.type";

test("뉴스 Data가 배열이면 태그를 분리해 뉴스 목록으로 변환한다", () => {
  const data: NewsDataType = {
    Data: [
      {
        id: "1",
        imageurl: "https://example.com/news.png",
        title: "Bitcoin News",
        url: "https://example.com/news",
        body: "body",
        tags: "BTC|Market",
        categories: "BTC",
        source: "cryptocompare",
      },
    ],
  };

  expect(getNewsData(data)).toEqual([
    {
      id: "1",
      imageurl: "https://example.com/news.png",
      title: "Bitcoin News",
      url: "https://example.com/news",
      body: "body",
      tags: ["BTC", "Market"],
      categories: "BTC",
      source: "cryptocompare",
    },
  ]);
});

test("뉴스 Data가 배열이 아니면 빈 배열을 반환한다", () => {
  const data = {
    Response: "Error",
    Message: "You are over your rate limit please upgrade your account!",
    Data: {},
  };

  expect(getNewsData(data as unknown as NewsDataType)).toEqual([]);
});
