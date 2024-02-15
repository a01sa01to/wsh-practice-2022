import React from "react";

import style from "./style.module.css";

interface Props {
  numbers: number[];
}

export const EntryCombination = ({ numbers }: Props) => {
  return (
    <div className={style.wrapper}>
      {numbers.map((key, j) => (
        <div key={j}>{key}</div>
      ))}
    </div>
  );
};
