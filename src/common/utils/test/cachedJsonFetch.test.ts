import { beforeEach, expect, test, vi } from "vitest";
import { cachedJsonFetch } from "../cachedJsonFetch";

const cacheKey = "coin-list";
const url = "https://api.coingecko.com/api/v3/coins/markets";

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

test("캐시가 없으면 요청 결과를 저장한다", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ id: "bitcoin" }]),
  });

  const data = await cachedJsonFetch(url, {
    cacheKey,
    ttlMs: 1000,
    fetcher: fetchMock,
  });

  expect(data).toEqual([{ id: "bitcoin" }]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(JSON.parse(localStorage.getItem(cacheKey) ?? "{}").data).toEqual([
    { id: "bitcoin" },
  ]);
});

test("캐시가 유효하면 네트워크 요청 없이 캐시 데이터를 반환한다", async () => {
  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      expiresAt: Date.now() + 1000,
      data: [{ id: "ethereum" }],
    })
  );
  const fetchMock = vi.fn();

  const data = await cachedJsonFetch(url, {
    cacheKey,
    ttlMs: 1000,
    fetcher: fetchMock,
  });

  expect(data).toEqual([{ id: "ethereum" }]);
  expect(fetchMock).not.toHaveBeenCalled();
});

test("캐시가 만료되면 다시 요청한다", async () => {
  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      expiresAt: Date.now() - 1,
      data: [{ id: "stale" }],
    })
  );
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ id: "fresh" }]),
  });

  const data = await cachedJsonFetch(url, {
    cacheKey,
    ttlMs: 1000,
    fetcher: fetchMock,
  });

  expect(data).toEqual([{ id: "fresh" }]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

test("같은 cacheKey의 동시 요청은 하나의 네트워크 요청으로 합친다", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ id: "bitcoin" }]),
  });

  const [first, second] = await Promise.all([
    cachedJsonFetch(url, {
      cacheKey,
      ttlMs: 1000,
      fetcher: fetchMock,
    }),
    cachedJsonFetch(url, {
      cacheKey,
      ttlMs: 1000,
      fetcher: fetchMock,
    }),
  ]);

  expect(first).toEqual([{ id: "bitcoin" }]);
  expect(second).toEqual([{ id: "bitcoin" }]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});
