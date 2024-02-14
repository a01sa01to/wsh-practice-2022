import clsx from "clsx";
import React from "react";

import style from "./button.module.css";

/**
 * @typedef Props
 * @property {string=} className
 */

/** @type {React.FC<Props & React.ButtonHTMLAttributes>} */
export const BaseButton = (props) => {
  return <button {...props} className={clsx(props.className, style.btn)} />;
};
