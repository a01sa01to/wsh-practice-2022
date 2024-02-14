import clsx from "clsx";
import React from "react";

import style from "./style.module.css";

/**
 * @typedef Props
 * @property {boolean} dark
 * @property {boolean} shrink
 */

/** @type {React.FC<Props>} */
export const Section = ({ children, dark, shrink }) => {
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
