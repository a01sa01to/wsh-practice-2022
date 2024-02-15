import { Container } from "../../../../client/components/layouts/Container/Container";
import { Section } from "../../../../client/components/layouts/Section/Section";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { TrimmedImage } from "../../../../client/components/media/TrimmedImage/TrimmedImage";
import { TabNav } from "../../../../client/components/navs/TabNav/TabNav";
import { Heading } from "../../../../client/components/typographies/Heading/Heading";
import { formatTime } from "../../../../client/utils/DateUtils";
import img2staticImport from "../../../../client/utils/img2staticImport";

import { EntryTable } from "./EntryTable";
import { PlayerPictureList } from "./PlayerPictureList";
import style from "./style.module.css";

export default async function RaceCard({
  params,
}: {
  params: { raceId: string };
}) {
  const { raceId } = params;
  const data = (await fetch(
    `https://wsh2022-practice-j5kcv767ma-an.a.run.app/api/races/${raceId}`,
    { next: { revalidate: 30 } },
  ).then((res) => res.json())) as Model.Race;

  return (
    <Container>
      <Spacer mt2 />
      <Heading as="h1">{data.name}</Heading>
      <p>
        開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
      </p>

      <Spacer mt2 />

      <Section dark shrink>
        <span className={style.livebadge}>Live</span>
        <Spacer mt2 />
        <TrimmedImage
          height={225}
          src={img2staticImport(data.image)}
          width={400}
        />
      </Section>

      <Spacer mt2 />

      <Section>
        <TabNav>
          <TabNav.Item aria-current to={`/races/${raceId}/race-card`}>
            出走表
          </TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
        </TabNav>

        <Spacer mt2 />
        <PlayerPictureList>
          {data.entries.map((entry) => (
            <PlayerPictureList.Item
              key={entry.id}
              image={entry.player.image}
              name={entry.player.name}
              number={entry.number}
            />
          ))}
        </PlayerPictureList>

        <Spacer mt4 />
        <EntryTable entries={data.entries} />
      </Section>
    </Container>
  );
}
