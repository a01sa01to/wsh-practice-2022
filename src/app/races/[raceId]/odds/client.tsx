"use client";

import { useCallback, useRef, useState } from "react";

import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { Heading } from "../../../../client/components/typographies/Heading/Heading";

import { OddsRankingList } from "./OddsRankingList";
import { OddsTable } from "./OddsTable";
import { TicketVendingModal } from "./TicketVendingModal";

interface Props {
  data: Model.Race;
  isRaceClosed: boolean;
  raceId: string;
}

export default function OddsClient({ data, isRaceClosed, raceId }: Props) {
  const [oddsKeyToBuy, setOddsKeyToBuy] = useState<number[] | null>(null);
  const modalRef = useRef(null);

  const handleClickOdds = useCallback((odds: Model.OddsItem) => {
    setOddsKeyToBuy(odds.key);
    modalRef.current?.showModal();
  }, []);

  return (
    <>
      <Spacer mt2 />
      <OddsTable
        entries={data.entries}
        isRaceClosed={isRaceClosed}
        odds={data.trifectaOdds}
        onClickOdds={handleClickOdds}
      />

      <Spacer mt4 />
      <Heading as="h2">人気順</Heading>

      <Spacer mt2 />
      <OddsRankingList
        isRaceClosed={isRaceClosed}
        odds={data.trifectaOdds}
        onClickOdds={handleClickOdds}
      />

      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </>
  );
}
