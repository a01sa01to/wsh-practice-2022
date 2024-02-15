import React, { useCallback, useState } from "react";

import { BaseButton } from "../../../../client/components/buttons/BaseButton/BaseButton";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { Stack } from "../../../../client/components/layouts/Stack/Stack";

import { OddsMarker } from "./OddsMarker";
import style from "./oddstable.module.css";

const mapKey = (second: number, third: number) => `${second}.${third}`;

interface Props {
  odds: Model.OddsItem[];
  entries: Model.RaceEntry[];
  isRaceClosed: boolean;
  onClickOdds: (odds: Model.OddsItem) => void;
}

export const OddsTable = ({
  entries,
  isRaceClosed,
  odds,
  onClickOdds,
}: Props) => {
  const [firstKey, setFirstKey] = useState(1);

  const handleChange = useCallback((e) => {
    setFirstKey(parseInt(e.currentTarget.value, 10));
  }, []);

  const headNumbers = Array(entries.length)
    .fill(0)
    .map((val, idx) => idx + 1)
    .filter((val) => val != firstKey);
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
                <th className={style.th} width="64px">
                  2位
                </th>
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
                  {i === 0 && (
                    <th className={style.th} rowSpan={headNumbers.length}>
                      3位
                    </th>
                  )}

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
                            <BaseButton
                              className={style.buybutton}
                              onClick={() => onClickOdds(item)}
                            >
                              <OddsMarker odds={item.odds} />
                            </BaseButton>
                          )
                        ) : (
                          <BaseButton disabled className={style.buybutton}>
                            -
                          </BaseButton>
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
