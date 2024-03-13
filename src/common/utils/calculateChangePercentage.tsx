export const calculateChangePercentage = (
  openPrice: number,
  currentPrice: number
) => {
  if (openPrice === 0) return 0;

  const formattedOpenPrice = Math.round(openPrice * 1e8) / 1e8;
  const formattedCurrentPrice = Math.round(currentPrice * 1e8) / 1e8;

  const changePrice = formattedCurrentPrice - formattedOpenPrice;
  const percentage = (changePrice / formattedOpenPrice) * 100;

  return Math.round(percentage * 1e2) / 1e2;
};
