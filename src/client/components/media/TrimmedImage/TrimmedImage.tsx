import React from "react";

import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface Props {
  src: StaticImport;
  width: number;
  height: number;
  alt?: string;
  loading?: "eager" | "lazy";
  loadWidth?: number;
  priority?: boolean;
  quality?: number;
}

export const TrimmedImage = ({
  height,
  src,
  width,
  alt,
  loading,
  loadWidth,
  priority,
  quality,
}: Props) => {
  return (
    <Image
      loading={loading ?? "lazy"}
      src={src}
      alt={alt ?? ""}
      style={{
        objectFit: "cover",
        aspectRatio: `${width}/${height}`,
        width: "100%",
        maxWidth: width,
        height: "auto",
      }}
      width={loadWidth ?? width}
      height={height}
      priority={priority}
      quality={quality}
    />
  );
};
