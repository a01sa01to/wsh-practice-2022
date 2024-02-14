import type { PropsWithChildren } from "react";
import React from "react";

import clsx from "clsx";

import style from "./style.module.css";

interface Props {
  mt2?: boolean;
  mt4?: boolean;
  mr2?: boolean;
}

export const Spacer = ({ children, mr2, mt2, mt4, ...rest }: PropsWithChildren<Props>) => {
  if (!mt2 && !mt4 && !mr2) throw new Error("At least one prop must be true");
  return (
    <div
      {...rest}
      className={clsx(mt2 && style.mt2, mt4 && style.mt4, mr2 && style.mr2)}
    >
      {children}
    </div>
  );
};
