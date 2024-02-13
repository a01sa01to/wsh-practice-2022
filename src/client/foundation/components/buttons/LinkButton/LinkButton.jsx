import clsx from "clsx";
import React from "react"
import { Link } from "react-router-dom";

import style from "./linkButton.module.css";

export const LinkButton = (props) => {
  return <Link {...props} className={clsx(props.className, style.link)} />;
}