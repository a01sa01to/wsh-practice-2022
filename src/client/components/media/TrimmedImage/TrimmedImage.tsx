import React from "react";

import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface Props {
  src: StaticImport;
  width: number;
  height: number;
}

export const TrimmedImage = ({ height, src, width }: Props) => {
  return (
    <Image
      loading="lazy"
      src={src}
      alt=""
      style={{ objectFit: "cover" }}
      width={width}
      height={height}
    />
  );
};
