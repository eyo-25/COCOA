export const priceFormatter = (price: number): string => {
  const formattedNumber = Math.round(price * 1e6) / 1e6;
  const fractionDigits = formattedNumber > 10 ? 2 : 6;

  if (formattedNumber === 0 || formattedNumber < 0) return "-";

  return (
    "$ " +
    formattedNumber.toLocaleString("en-US", {
      style: "decimal",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: fractionDigits,
    })
  );
};
