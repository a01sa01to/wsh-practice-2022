import dayjs from "dayjs";

import DatePage from "./[date]/page";

export default function Page() {
  return <DatePage params={{ date: dayjs().format("YYYY-MM-DD") }} />;
}
