import React, { useCallback, useState } from "react";

import { BaseButton } from "../../../../../components/buttons/BaseButton";
import { Spacer } from "../../../../../components/layouts/Spacer";
import { Stack } from "../../../../../components/layouts/Stack";
import { OddsMarker } from "../OddsMarker";

import style from "./style.module.css"
/**
 * @param {number} second
 * @param {number} third
 * @returns {string}
 */
const mapKey = (second, third) => `${second}.${third}`;

/**
 * @typedef Props
 * @property {Model.OddsItem[]} odds
 * @property {Model.RaceEntry[]} entries
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */
export const OddsTable = ({ entries, isRaceClosed, odds, onClickOdds }) => {
  const [firstKey, setFirstKey] = useState(1);

  const handleChange = useCallback((e) => {
    setFirstKey(parseInt(e.currentTarget.value, 10));
  }, []);

  const headNumbers = Array(entries.length).fill(0).map((val, idx) => idx + 1).filter(val => val != firstKey)
  const filteredOdds = odds.filter((item) => item.key[0] === firstKey);
  const oddsMap = filteredOdds.reduce((acc, cur) => {
    const [, second, third] = cur.key;
    acc[mapKey(second, third)] = cur;
    return acc;
  }, {});

  return (
    <div>
      <Stack horizontal>
        <label className={style.ranklabel}>1位軸</label>
        <select onChange={handleChange} value={firstKey}>
          {entries.map((entry) => (
            <option key={entry.id} value={entry.number}>
              {entry.number}. {entry.player.name}
            </option>
          ))}
        </select>
      </Stack>

      <Spacer mt2 />
      <div className={style.scrollwrapper}>
        <div>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.th} width="64px">2位</th>
                <th className={style.th} width="32px"></th>

                {headNumbers.map((second) => (
                  <th key={second} className={style.th} width="auto">
                    {second}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {headNumbers.map((third, i) => (
                <tr key={third}>
                  {i === 0 && <th className={style.th} rowSpan={headNumbers.length}>3位</th>}

                  <th className={style.th}>{third}</th>

                  {headNumbers.map((second) => {
                    const item = oddsMap[mapKey(second, third)];

                    return (
                      <td key={second} className={style.td} width="auto">
                        {second !== third ? (
                          isRaceClosed ? (
                            <div className={style.inactivebuybutton}>
                              <OddsMarker odds={item.odds} />
                            </div>
                          ) : (
                            <BaseButton className={style.buybutton} onClick={() => onClickOdds(item)}>
                              <OddsMarker odds={item.odds} />
                            </BaseButton>
                          )
                        ) : (
                          <BaseButton disabled className={style.buybutton}>-</BaseButton>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
