import { test, expect, describe, vi } from "vitest";
import { debounce } from "../debounce";

describe("debounce함수 유닛 테스트", () => {
  test("지연 시간 내에 여러 호출이 있을 경우 디바운스가 잘 작동하는지 테스트", async () => {
    vi.useFakeTimers();
    let callCount = 0;

    const callback = () => {
      callCount++;
    };

    const debouncedFunction = debounce(callback, 200);

    // 여러 번 호출
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    vi.runAllTimers();
    expect(callCount).toBe(1);
  });

  test("마지막 호출 기준으로 딜레이 후에 두번째 호출이 잘 작동하는지 테스트", async () => {
    vi.useFakeTimers();
    let callCount = 0;

    const callback = () => {
      callCount++;
    };

    const debouncedFunction = debounce(callback, 200);

    debouncedFunction();

    // 300ms 후에 두 번째 호출
    setTimeout(() => {
      debouncedFunction();
    }, 300);

    vi.runAllTimers();
    expect(callCount).toBe(2);
  });
});
