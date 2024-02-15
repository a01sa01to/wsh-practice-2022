"use server";

import Image from "next/image";

import dayjs from "dayjs";

import HeroImg from "../../client/assets/hero.jpg";
import { Container } from "../../client/components/layouts/Container/Container";
import { Spacer } from "../../client/components/layouts/Spacer/Spacer";
import { Heading } from "../../client/components/typographies/Heading/Heading";
import { isSameDay } from "../../client/utils/DateUtils";

import { RecentRaceList } from "./RecentRaceList";
import style from "./style.module.css";
import { Charger } from "./top-client-components";

export default async function DatePage({
  params,
}: {
  params: { date: string };
}) {
  const { date } = params;
  const raceData = (await fetch(
    "https://wsh2022-practice-j5kcv767ma-an.a.run.app/api/races",
    { next: { revalidate: 30 } },
  ).then((res) => res.json())) as {
    races: Model.Race[];
  };

  const todayRaces =
    raceData != null
      ? [...raceData.races]
          .sort((a, b) => dayjs(a.startAt).unix() - dayjs(b.startAt).unix())
          .filter((race) => isSameDay(race.startAt, date))
      : [];

  return (
    <Container>
      <Image
        src={HeroImg}
        alt="Hero Image"
        sizes="100vw"
        className={style.hero}
      />
      <Spacer mt2 />
      <Charger />
      <Spacer mt2 />
      <section>
        <Heading as="h1">本日のレース</Heading>
        {todayRaces.length > 0 && (
          <div>
            <RecentRaceList>
              {todayRaces.map((race, idx) => (
                <RecentRaceList.Item
                  key={race.id}
                  race={race}
                  style={{ animationDelay: `${idx * 100}ms` }}
                />
              ))}
            </RecentRaceList>
          </div>
        )}
      </section>
    </Container>
  );
}
