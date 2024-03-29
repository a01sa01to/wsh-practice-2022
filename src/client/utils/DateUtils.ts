import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const isSameDay = (dateLeft: string, dateRight: string) => {
  return dayjs(dateLeft).tz().isSame(dayjs(dateRight).tz(), "day");
};

export const formatTime = (ts: string) => {
  return dayjs(ts).format("H:mm");
};

export const formatCloseAt = (
  closeAt: string,
  now: number | Date = new Date(),
) => {
  if (dayjs(closeAt).isBefore(now)) {
    return "投票締切";
  }

  if (dayjs(closeAt).isAfter(dayjs(now).add(2, "hours"))) {
    return "投票受付中";
  }

  return `締切${dayjs(closeAt).diff(now, "minutes")}分前`;
};
