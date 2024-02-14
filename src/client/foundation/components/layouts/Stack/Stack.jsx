import React from "react";

import style from "./style.module.css";

/**
 * @typedef Props
 * @property {(string | React.ComponentType<any>)=} as
 * @property {boolean=} horizontal
 * @property {number} gap
 * @property {import('csstype').Property.AlignItems=} alignItems
 * @property {import('csstype').Property.JustifyContent=} justifyContent
 * @property {import('csstype').Property.FlexWrap=} wrap
 */

export const Stack = (
  /** @type {React.PropsWithChildren<Props>} */
  { alignItems, as, children, gap, horizontal, justifyContent, wrap },
) => {
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

/** @type {React.FC} */
const Item = ({ children }) => {
  return <div className={style.item}>{children}</div>;
};
Stack.Item = Item;
