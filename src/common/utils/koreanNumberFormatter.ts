export const koreanNumberFormatter = (num: number): string => {
  const units = ["", "만", "억", "조", "경", "해"];
  let unitIndex = 0;
  let formattedNumber = Math.round(num * 1e6) / 1e6;

  if (formattedNumber === 0) return "정보 없음";
  if (formattedNumber < 10000) return formattedNumber.toString();

  while (formattedNumber >= 10000 && unitIndex < units.length - 1) {
    formattedNumber /= 10000;
    unitIndex++;
  }

  return formattedNumber.toFixed(2) + units[unitIndex];
};
