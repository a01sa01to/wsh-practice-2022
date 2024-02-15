import React from "react";

import style from "./oddsMarker.module.css";

interface Props {
  as?: "div";
  odds: number;
}

export const OddsMarker = ({ as, odds }: Props) => {
  if (as === "div") {
    return (
      <div
        className={style.wrapper}
        style={{ background: `rgba(74, 222, 128, ${Math.min(5 / odds, 1.0)})` }}
      >
        {" "}
        {odds.toFixed(1)}
      </div>
    );
  }

  return (
    <span
      className={style.wrapper}
      style={{ background: `rgba(74, 222, 128, ${Math.min(5 / odds, 1.0)})` }}
    >
      {" "}
      {odds.toFixed(1)}
    </span>
  );
};
