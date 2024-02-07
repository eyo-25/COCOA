export const calculateChangePercentage = (
  openPrice: number,
  currentPrice: number
): string => {
  // 변동량
  const change = currentPrice - openPrice;
  // 백분률
  const percentage = (change / openPrice) * 100;
  // 양수 처리
  if (0 <= percentage) {
    return "+" + percentage.toFixed(2) + "%";
  } else {
    return percentage.toFixed(2) + "%";
  }
};
