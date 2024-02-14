import React from "react";

import style from "./style.module.css";

/**
 * @typedef Props
 * @property {number[]} numbers
 */

/** @type {React.VFC<Props>} */
export const EntryCombination = ({ numbers }) => {
  return (
    <div className={style.wrapper}>
      {numbers.map((key, j) => (
        <div key={j}>{key}</div>
      ))}
    </div>
  );
};
