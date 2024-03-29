import type { ComponentPropsWithRef } from "react";
import React from "react";

import Link from "next/link";

import { Stack } from "../../layouts/Stack/Stack";

import style from "./style.module.css";

interface Props extends ComponentPropsWithRef<"a"> {
  "aria-current"?: boolean;
  to: string;
}

const Item = ({
  "aria-current": ariaCurrent,
  children,
  to,
  ...rest
}: Props) => {
  return (
    <li>
      {ariaCurrent ? (
        <a aria-current className={style.link} {...rest}>
          {children}
        </a>
      ) : (
        <Link
          aria-current={ariaCurrent}
          className={style.link}
          href={to}
          {...rest}
        >
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
