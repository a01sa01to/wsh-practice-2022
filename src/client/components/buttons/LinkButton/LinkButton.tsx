import React from "react";

import Link from "next/link";

import clsx from "clsx";

import style from "./linkbutton.module.css";

export const LinkButton = (props) => {
  return <Link {...props} className={clsx(props.className, style.link)} />;
};
