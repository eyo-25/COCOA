import { expect, test } from "vitest";
import { getCoinCategoriesNewsUrl, getCoinFeedsNewsUrl } from "../api";

test("latest news는 CryptoCompare news lang 쿼리를 사용한다", () => {
  const url = new URL(getCoinFeedsNewsUrl("latestnews"));

  expect(url.origin).toBe("https://min-api.cryptocompare.com");
  expect(url.pathname).toBe("/data/v2/news/");
  expect(url.searchParams.get("lang")).toBe("EN");
});

test("feed news는 CryptoCompare news feeds 쿼리를 사용한다", () => {
  const url = new URL(getCoinFeedsNewsUrl("coindesk"));

  expect(url.origin).toBe("https://min-api.cryptocompare.com");
  expect(url.pathname).toBe("/data/v2/news/");
  expect(url.searchParams.get("feeds")).toBe("coindesk");
});

test("category news는 CryptoCompare news categories 쿼리를 사용한다", () => {
  const url = new URL(getCoinCategoriesNewsUrl("BTC"));

  expect(url.origin).toBe("https://min-api.cryptocompare.com");
  expect(url.pathname).toBe("/data/v2/news/");
  expect(url.searchParams.get("categories")).toBe("BTC");
});
