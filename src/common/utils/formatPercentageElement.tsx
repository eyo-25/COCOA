export const formatPercentageElement = (num: number) => {
  const fixedNum = num.toFixed(2);

  if (fixedNum === "0.00" || fixedNum === "-0.00") {
    return <p className="text-gray-200">{fixedNum.replace("-", "")}%</p>;
  }

  const sign = num >= 0 ? "+" : "";
  const textColor = num >= 0 ? "text-green" : "text-red";

  return <p className={textColor}>{sign + fixedNum}%</p>;
};
