"use client";

import { useCallback, useRef, useState } from "react";

import clsx from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { Heading } from "../../../../client/components/typographies/Heading/Heading";

import { OddsRankingList } from "./OddsRankingList";
import { OddsTable } from "./OddsTable";
import style from "./style.module.css";
import { TicketVendingModal } from "./TicketVendingModal";

interface Props {
  data: Model.Race;
  raceId: string;
}

export default function OddsClient({ data, raceId }: Props) {
  const [oddsKeyToBuy, setOddsKeyToBuy] = useState<number[] | null>(null);
  const modalRef = useRef(null);
  const isRaceClosed = dayjs(data.closeAt).tz().isBefore(dayjs().tz());

  const handleClickOdds = useCallback((odds: Model.OddsItem) => {
    setOddsKeyToBuy(odds.key);
    modalRef.current?.showModal();
  }, []);

  return (
    <>
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
