export const calculateChangePercentage = (
  openPrice: number,
  currentPrice: number
) => {
  const change = currentPrice - openPrice;
  const percentage = (change / openPrice) * 100;

  return percentage;
};
