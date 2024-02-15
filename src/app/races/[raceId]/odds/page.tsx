import { Section } from "../../../../client/components/layouts/Section/Section";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { TabNav } from "../../../../client/components/navs/TabNav/TabNav";
import RaceData from "../../../../client/data/races.json";

import OddsClient from "./client";

export async function generateStaticParams() {
  return RaceData.races.map((race) => race.id);
}

export default async function Odds({ params }: { params: { raceId: string } }) {
  const { raceId } = params;
  const { default: data } = (await import(
    `../../../../client/data/races/${raceId}.json`,
    { assert: { type: "json" } }
  )) as { default: Model.Race };

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

      <OddsClient data={data} raceId={raceId} />
    </Section>
  );
}
