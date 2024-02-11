export const priceFormatter = (price: number) => {
  const [essencePart, decimalPart = ""] = price.toString().split(".");
  const arr = [];
  let cnt = 0;

  for (let i = essencePart.length - 1; i >= 0; i--) {
    cnt++;
    arr.push(essencePart[i]);

    if (cnt >= 3) {
      arr.push(",");
      cnt = 0;
    }
  }

  if (arr[arr.length - 1] === ",") {
    arr.pop();
  }

  let res = arr.reverse().join("");

  if (arr.length <= 1) {
    res = "$ " + res + "." + decimalPart.split("").slice(0, 5).join("");
  } else {
    res = "$ " + res + "." + decimalPart.split("").slice(0, 2).join("");
  }

  if (res.endsWith(".")) {
    res = res.slice(0, -1);
  }

  return res;
};
