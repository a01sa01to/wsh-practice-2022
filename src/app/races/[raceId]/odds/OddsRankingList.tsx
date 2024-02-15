import React from "react";

import { BaseButton } from "../../../../client/components/buttons/BaseButton/BaseButton";
import { EntryCombination } from "../../../../client/components/displays/EntryCombination/EntryCombination";
import { Stack } from "../../../../client/components/layouts/Stack/Stack";

import { OddsMarker } from "./OddsMarker";
import style from "./rankList.module.css";

interface Props {
  odds: Model.OddsItem[];
  isRaceClosed: boolean;
  // eslint-disable-next-line no-unused-vars
  onClickOdds: (odds: Model.OddsItem) => void;
}

export const OddsRankingList = ({ isRaceClosed, odds, onClickOdds }: Props) => {
  const sortedOdds = odds.sort((a, b) => a.odds - b.odds).slice(0, 50);
  return (
    <ol className={style.wrapper}>
      {sortedOdds.map((item, i) => (
        <li key={item.id} className={style.list}>
          {isRaceClosed ? (
            <div className={style.inactivebuybutton}>
              <Stack horizontal alignItems="center" gap={16}>
                <div className={style.rankno}>{i + 1}.</div>
                <EntryCombination numbers={item.key} />
                <OddsMarker as="div" odds={item.odds} />
              </Stack>
            </div>
          ) : (
            <BaseButton
              className={style.buybutton}
              onClick={() => onClickOdds(item)}
            >
              <Stack horizontal alignItems="center" gap={16}>
                <div className={style.rankno}>{i + 1}.</div>
                <EntryCombination numbers={item.key} />
                <OddsMarker as="div" odds={item.odds} />
              </Stack>
            </BaseButton>
          )}
        </li>
      ))}
    </ol>
  );
};
