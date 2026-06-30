import { expect, test } from "vitest";
import { render, screen } from "@/common/test-utils/testing-utils";
import CoinTitle from "../CoinTitle";

test("절대 URL 코인 이미지는 base URL을 붙이지 않고 그대로 사용한다", () => {
  render(
    <CoinTitle
      displayCoin={{
        Id: "bitcoin",
        FullName: "Bitcoin",
        Internal: "BTC",
        ImageUrl:
          "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
      }}
    />
  );

  expect(screen.getByTestId("coin-icon")).toHaveAttribute(
    "src",
    "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png"
  );
});
