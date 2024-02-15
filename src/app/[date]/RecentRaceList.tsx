"use server";

import type { CSSProperties } from "react";
import React from "react";

import { LinkButton } from "../../client/components/buttons/LinkButton/LinkButton";
import { Spacer } from "../../client/components/layouts/Spacer/Spacer";
import { Stack } from "../../client/components/layouts/Stack/Stack";
import { TrimmedImage } from "../../client/components/media/TrimmedImage/TrimmedImage";
import img2staticImport from "../../client/utils/img2staticImport";

import CloseAtRealtime from "./closeAtRealtime";
import style from "./RecentRaceList.module.css";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={16}>
      {children}
    </Stack>
  );
};

interface ItemProps {
  race: Model.Race;
  style: CSSProperties;
}

const Item = ({ race, style: propStyle }: ItemProps) => {
  return (
    <li className={style.itemwrapper} style={propStyle}>
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={8}>
          <h2 className={style.racetitle}>{race.name}</h2>
          <CloseAtRealtime closeAt={race.closeAt} />
        </Stack>

        <Spacer mr2 />

        <Stack.Item>
          <Stack horizontal alignItems="center" gap={16}>
            <TrimmedImage
              height={100}
              src={img2staticImport(race.image)}
              width={100}
              loadWidth={200}
            />
            <LinkButton
              className={style.racebtn}
              href={`/races/${race.id}/race-card`}
            >
              投票
            </LinkButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </li>
  );
};
RecentRaceList.Item = Item;
