import React from "react";

import { Stack } from "../../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../../components/media/TrimmedImage";

import style from "./style.module.css"

/**
 * @typedef ItemProps
 * @property {number} number
 * @property {string} image
 * @property {string} name
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ image, name, number }) => {
  return (
    <Stack gap={8}>
      <TrimmedImage
        alt={`${name}選手のプロフィール写真`}
        height={100}
        src={image}
        width={100}
      />

      <Stack horizontal alignItems="center" gap={4} wrap="wrap">
        <span className={style.playerno}>{number}</span>
        <span className={style.playername}>{name}</span>
      </Stack>
    </Stack>
  );
};

export const PlayerPictureList = ({ children }) => {
  return (
    <Stack horizontal gap={16} wrap="wrap">
      {children}
    </Stack>
  );
};
PlayerPictureList.Item = Item;
