import dayjs from "dayjs";

export function formatTime(value: number, format: string): string {
  return dayjs(value).format(format);
}
