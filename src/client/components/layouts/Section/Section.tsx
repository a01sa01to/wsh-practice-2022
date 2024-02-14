import type { PropsWithChildren } from "react";
import React from "react";

import clsx from "clsx";

import style from "./style.module.css";

interface Props {
  dark?: boolean;
  shrink?: boolean;
}

export const Section = ({
  children,
  dark,
  shrink,
}: PropsWithChildren<Props>) => {
  return (
    <section
      className={clsx(
        style.wrapper,
        dark && style.dark,
        shrink && style.shrink,
      )}
    >
      {children}
    </section>
  );
};
