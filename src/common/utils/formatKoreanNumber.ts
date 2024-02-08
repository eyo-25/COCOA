export const formatKoreanNumber = (num: number): string => {
  if (num === 0) return "정보 없음";

  const units = ["", "만", "억", "조", "경", "해"];
  let unitIndex = 0;
  let formattedNumber = num;

  while (formattedNumber >= 10000 && unitIndex < units.length - 1) {
    formattedNumber /= 10000;
    unitIndex++;
  }

  return formattedNumber.toFixed(2) + units[unitIndex];
};
