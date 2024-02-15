import type { PropsWithChildren, PropsWithRef, SyntheticEvent } from "react";
import React, { forwardRef } from "react";

import style from "./style.module.css";

interface Props {
  // eslint-disable-next-line no-unused-vars
  onClose: (event: SyntheticEvent<HTMLDialogElement, Event>) => void;
}

export const Dialog = forwardRef<
  HTMLDialogElement,
  PropsWithRef<PropsWithChildren<Props>>
>(({ children, onClose }, ref) => {
  return (
    <dialog ref={ref} className={style.dialog} onClose={onClose}>
      {children}
    </dialog>
  );
});

Dialog.displayName = "Dialog";
