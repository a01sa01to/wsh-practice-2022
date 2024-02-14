import type { CSSProperties, PropsWithChildren } from "react";
import React from "react";

import style from "./style.module.css";

interface Props {
  as?: string | React.ComponentType<unknown>;
  horizontal?: boolean;
  gap?: number;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  wrap?: CSSProperties["flexWrap"];
}

export const Stack = ({
  alignItems,
  as,
  children,
  gap,
  horizontal,
  justifyContent,
  wrap,
}: PropsWithChildren<Props>) => {
  if (as === "ul") {
    return (
      <ul
        style={{
          alignItems,
          display: "flex",
          flexDirection: horizontal ? "row" : "column",
          flexWrap: wrap,
          gap: gap ? `${gap}px` : undefined,
          justifyContent,
        }}
      >
        {children}
      </ul>
    );
  }

  return (
    <div
      style={{
        alignItems,
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        flexWrap: wrap,
        gap: gap ? `${gap}px` : undefined,
        justifyContent,
      }}
    >
      {children}
    </div>
  );
};

const Item = ({ children }) => {
  return <div className={style.item}>{children}</div>;
};
Stack.Item = Item;
