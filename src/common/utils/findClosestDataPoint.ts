import { OHLCVType } from "../types/data.type";

export function findClosestDataPoint(x: Date, data: OHLCVType[]): OHLCVType {
  let closestDataPoint = data[0];
  let closestDistance = Number.MAX_VALUE;

  for (const dataPoint of data) {
    const distance = Math.abs(
      x.getTime() - new Date(dataPoint.time * 1000).getTime()
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestDataPoint = dataPoint;
    }
  }

  return closestDataPoint;
}
