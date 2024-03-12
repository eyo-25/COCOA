import { expect, test } from "vitest";
import { render, screen } from "@/common/test-utils/testing-utils";
import CoinChartSection from "../CoinChartSection";

test("비동기 요청 테스트", async () => {
  render(<CoinChartSection />);

  // 데이터가 잘들어 왔는지 확인하기 위해 이미지를 찾습니다.
  const coinImage: HTMLImageElement[] = await screen.findAllByTestId(
    "coin-icon"
  );
  screen.debug();
  expect(coinImage).toHaveLength(2);

  // 이미지 대체 텍스트 확인
  const altTexts = coinImage.map((item) => item.alt);
  expect(altTexts).toEqual(["Bitcoin", "Etherium"]);
});
