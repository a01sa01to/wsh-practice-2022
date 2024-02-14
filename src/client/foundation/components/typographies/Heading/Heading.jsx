import React from "react";

import style from "./style.module.css";

/**
 * @typedef Props
 * @property {'h1' | 'h2' | 'h3'} as
 */

/** @type {React.FC<Props>} */
export const Heading = ({ as, children }) => {
  if (as === "h1") return <h1 className={style.h1}>{children}</h1>;
  if (as === "h2") return <h2 className={style.h2}>{children}</h2>;
  if (as === "h3") return <h3 className={style.h3}>{children}</h3>;
  throw new Error("Invalid heading type");
};
