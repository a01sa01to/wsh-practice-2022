import React from "react";

import style from "./style.module.css";

export const Container = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>;
};
