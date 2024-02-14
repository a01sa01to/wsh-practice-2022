import clsx from "clsx";
import React from "react";

import style from "./style.module.css";

/** @type {React.FC<{ mt2?:boolean,mt4?:boolean,mr2?:boolean }>} */
export const Spacer = ({ children, mr2, mt2, mt4, ...rest }) => {
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
