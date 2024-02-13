import React, { forwardRef } from "react";

import style from "./style.module.css";

/**
 * @typedef Props
 * @type {object}
 * @property {Function} onClose
 */

/** @type {React.ForwardRefExoticComponent<{Props>} */
export const Dialog = forwardRef(({ children, onClose }, ref) => {
  return (
    <dialog ref={ref} className={style.dialog} onClose={onClose}>
      {children}
    </dialog>
  );
});

Dialog.displayName = "Dialog";
