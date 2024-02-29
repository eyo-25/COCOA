export const priceFormatter = (price: number) => {
  const toFixedPrice = price.toFixed(6);
  const [essencePart, decimalPart] = toFixedPrice.toString().split(".");

  const formattedEssence = essencePart
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      if (index !== 0 && index % 3 === 0) {
        return acc + "," + digit;
      } else {
        return acc + digit;
      }
    }, "");

  const response = "$ " + formattedEssence.split("").reverse().join("");

  if (0 < Number(essencePart)) {
    return response + "." + decimalPart.slice(0, 2);
  }

  let formattedDecimal = decimalPart;

  while (formattedDecimal.endsWith("0")) {
    if (formattedDecimal.length === 2) break;
    formattedDecimal = formattedDecimal.slice(0, -1);
  }

  if (formattedDecimal === "00") return "-";

  return response + "." + formattedDecimal;
};
