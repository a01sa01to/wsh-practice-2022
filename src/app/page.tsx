import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import DatePage from "./[date]/page";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export default async function Page() {
  const elem = await DatePage({
    params: { date: dayjs().tz().format("YYYY-MM-DD") },
  });
  return elem;
}
