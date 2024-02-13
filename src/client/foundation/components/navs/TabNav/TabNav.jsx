import React from "react";
import { Link } from "react-router-dom";

import { Stack } from "../../layouts/Stack";

import style from "./style.module.css";

/** @type {React.FC<ItemProps & React.AnchorHTMLAttributes>} */
const Item = ({ "aria-current": ariaCurrent, children, to, ...rest }) => {
  return (
    <li>
      {ariaCurrent ? (
        <a aria-current className={style.link} {...rest}>
          {children}
        </a>
      ) : (
        <Link aria-current={ariaCurrent} className={style.link} to={to} {...rest}>
          {children}
        </Link>
      )}
    </li>
  );
};

export const TabNav = ({ children }) => {
  return (
    <nav>
      <Stack horizontal as="ul" gap={16}>
        {children}
      </Stack>
    </nav>
  );
};
TabNav.Item = Item;
