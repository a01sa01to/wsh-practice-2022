import React from "react";

import { BaseButton } from "../../../../../components/buttons/BaseButton";
import { EntryCombination } from "../../../../../components/displays/EntryCombination";
import { Stack } from "../../../../../components/layouts/Stack";
import { OddsMarker } from "../OddsMarker";

import style from "./style.module.css";

/**
 * @typedef Props
 * @property {Model.OddsItem[]} odds
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */
export const OddsRankingList = ({ isRaceClosed, odds, onClickOdds }) => {
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
