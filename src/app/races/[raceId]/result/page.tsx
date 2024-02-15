import { Container } from "../../../../client/components/layouts/Container/Container";
import { Section } from "../../../../client/components/layouts/Section/Section";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { TrimmedImage } from "../../../../client/components/media/TrimmedImage/TrimmedImage";
import { TabNav } from "../../../../client/components/navs/TabNav/TabNav";
import { Heading } from "../../../../client/components/typographies/Heading/Heading";
import { formatTime } from "../../../../client/utils/DateUtils";
import img2staticImport from "../../../../client/utils/img2staticImport";

import { BettingTicketList } from "./BettingTicket";
import { RaceResultSection } from "./ResultSection";
import style from "./style.module.css";

export default async function RaceCard({
  params,
}: {
  params: { raceId: string };
}) {
  const { raceId } = params;
  const data = (await fetch(
    `https://wsh2022-practice-j5kcv767ma-an.a.run.app/api/races/${raceId}`,
    { cache: "no-store" },
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
    </Container>
  );
}
