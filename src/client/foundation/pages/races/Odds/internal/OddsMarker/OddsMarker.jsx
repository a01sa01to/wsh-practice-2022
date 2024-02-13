import React from "react";

import style from "./style.module.css";

/**
 * @typedef Props
 * @property {number} odds
 */

/** @type {React.FC<Props>} */
export const OddsMarker = ({ as, odds }) => {
  if (as === "div") {
    return <div className={style.wrapper} style={{ background: `rgba(74, 222, 128, ${Math.min(5 / odds, 1.0)})` }}> {odds.toFixed(1)}</div>;
  }

  return <span className={style.wrapper} style={{ background: `rgba(74, 222, 128, ${Math.min(5 / odds, 1.0)})` }}> {odds.toFixed(1)}</span>;
};
