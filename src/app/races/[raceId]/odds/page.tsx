import clsx from "clsx";
import dayjs from "dayjs";

import { Section } from "../../../../client/components/layouts/Section/Section";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { TabNav } from "../../../../client/components/navs/TabNav/TabNav";
import { Heading } from "../../../../client/components/typographies/Heading/Heading";

import OddsClient from "./client";
import style from "./style.module.css";

export default async function Odds({ params }: { params: { raceId: string } }) {
  const { raceId } = params;
  const data = (await fetch(
    `https://wsh2022-practice-j5kcv767ma-an.a.run.app/api/races/${raceId}`,
    { next: { revalidate: 30 } },
  ).then((res) => res.json())) as Model.Race;

  const isRaceClosed = dayjs(data.closeAt).isBefore(new Date());

  return (
    <Section>
      <TabNav>
        <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
        <TabNav.Item aria-current to={`/races/${raceId}/odds`}>
          オッズ
        </TabNav.Item>
        <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
      </TabNav>

      <Spacer mt4 />

      <aside className={clsx(style.callout, isRaceClosed && style.closed)}>
        <svg
          aria-hidden="true"
          className={style.fainfocircle}
          focusable="false"
          role="img"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
            fill="currentColor"
          ></path>
        </svg>
        {isRaceClosed
          ? "このレースの投票は締め切られています"
          : "オッズをクリックすると拳券が購入できます"}
      </aside>

      <Spacer mt4 />
      <Heading as="h2">オッズ表</Heading>
      <OddsClient data={data} isRaceClosed={isRaceClosed} raceId={raceId} />
    </Section>
  );
}
