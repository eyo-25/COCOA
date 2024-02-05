import { render } from "@/common/test-utils/testing-utils";
import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import Header from "../Header";
import userEvent from "@testing-library/user-event";

test("헬스 테스트", () => {
  render(<Header />);

  // header태그가 있는지 확인
  const headerTag = screen.getByRole("banner");
  expect(headerTag).toBeInTheDocument();
});

test("네비게이션 메뉴 테스트", async () => {
  const user = userEvent.setup();
  render(<Header />);

  const marketPageLink = screen.getByRole("link", { name: /시장동향/i });
  const newPageLink = screen.getByRole("link", { name: /뉴스/i });
  const logoImg = screen.getByTestId("logo");

  // 기본 위치 테스트
  expect(window.location.pathname).toBe("/");

  // 뉴스 페이지 클릭시 뉴스 페이지로 이동
  await user.click(newPageLink);
  expect(window.location.pathname).toBe("/news");

  // 시장동향 페이지 클릭시 홈으로 이동
  await user.click(marketPageLink);
  expect(window.location.pathname).toBe("/");

  // 로고 이미지 클릭시 홈으로 이동
  await user.click(newPageLink);
  await user.click(logoImg);
  expect(window.location.pathname).toBe("/");
});
