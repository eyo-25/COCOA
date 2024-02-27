export const priceFormatter = (price: number) => {
  // 숫자가 지수 표기법으로 표현 되는것을 막기위해 미리 소수점 6자리까지 자릅니다.
  const toFixedPrice = price.toFixed(6);
  const [essencePart, decimalPart] = toFixedPrice.toString().split(".");

  // 뒤에서부터 3자리 단위로 "," 부착
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

  // 포맷팅한 글자를 다시 뒤집어서 합쳐줍니다.
  const response = "$ " + formattedEssence.split("").reverse().join("");

  // 정수파트가 0보다 크면 2째자리까지 return
  if (0 < Number(essencePart)) {
    return response + "." + decimalPart.slice(0, 2);
  }

  let formattedDecimal = decimalPart;

  // 소수점 둘째 자리까지 끝자리가 0이면 제거
  while (formattedDecimal.endsWith("0")) {
    if (formattedDecimal.length === 2) break;
    formattedDecimal = formattedDecimal.slice(0, -1);
  }

  if (formattedDecimal === "00") return "-";

  return response + "." + formattedDecimal;
};
