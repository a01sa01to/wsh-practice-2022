import { Section } from "../../../../client/components/layouts/Section/Section";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { TabNav } from "../../../../client/components/navs/TabNav/TabNav";
import { Heading } from "../../../../client/components/typographies/Heading/Heading";

import { BettingTicketList } from "./BettingTicket";
import { RaceResultSection } from "./ResultSection";

export default async function RaceCard({
  params,
}: {
  params: { raceId: string };
}) {
  const { raceId } = params;

  return (
    <Section>
      <TabNav>
        <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
        <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
        <TabNav.Item aria-current to={`/races/${raceId}/result`}>
          結果
        </TabNav.Item>
      </TabNav>

      <Spacer mt4 />
      <Heading as="h2">購入した買い目</Heading>

      <Spacer mt2 />
      <BettingTicketList raceId={raceId} />

      <Spacer mt4 />
      <Heading as="h2">勝負結果</Heading>

      <Spacer mt2 />
      <RaceResultSection />
    </Section>
  );
}
