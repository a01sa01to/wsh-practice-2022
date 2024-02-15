import dayjs from "dayjs";

import DatePage from "./[date]/page";

export default async function Page() {
  const elem = await DatePage({
    params: { date: dayjs().format("YYYY-MM-DD") },
  });
  return elem;
}
