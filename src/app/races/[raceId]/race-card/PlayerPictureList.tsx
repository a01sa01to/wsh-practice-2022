import React from "react";

import { Stack } from "../../../../client/components/layouts/Stack/Stack";
import { TrimmedImage } from "../../../../client/components/media/TrimmedImage/TrimmedImage";
import img2staticImport from "../../../../client/utils/img2staticImport";

import style from "./playerPic.module.css";

interface ItemProps {
  number: number;
  image: string;
  name: string;
}

const Item = ({ image, name, number }: ItemProps) => {
  return (
    <Stack gap={8}>
      <TrimmedImage
        alt={`${name}選手のプロフィール写真`}
        height={100}
        src={img2staticImport(image)}
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
