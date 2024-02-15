import { Section } from "../../../../client/components/layouts/Section/Section";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { TabNav } from "../../../../client/components/navs/TabNav/TabNav";

import { EntryTable } from "./EntryTable";
import { PlayerPictureList } from "./PlayerPictureList";

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
  );
}
