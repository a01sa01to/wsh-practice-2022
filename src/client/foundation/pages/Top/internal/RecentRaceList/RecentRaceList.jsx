import React, { useEffect, useState } from "react";

import { LinkButton } from "../../../../components/buttons/LinkButton";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
import { formatCloseAt } from "../../../../utils/DateUtils";

import style from "./style.module.css";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={16}>
      {children}
    </Stack>
  );
};

/**
 * @typedef ItemProps
 * @property {Model.Race} race
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ race }) => {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(race.closeAt));

  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(race.closeAt));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [race.closeAt]);

  return (
    <li className={style.itemwrapper} >
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={8}>
          <h2 className={style.racetitle}>{race.name}</h2>
          <p>{closeAtText}</p>
        </Stack>

        <Spacer mr2 />

        <Stack.Item>
          <Stack horizontal alignItems="center" gap={16}>
            <TrimmedImage height={100} src={race.image.replace(".jpg", "_thumb.webp")} width={100} />
            <LinkButton className={style.racebtn} to={`/races/${race.id}/race-card`}>投票</LinkButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </li>
  );
};
RecentRaceList.Item = Item;
