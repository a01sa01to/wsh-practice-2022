import clsx from "clsx";
import React from "react";

import { EntryCombination } from "../../../../../components/displays/EntryCombination";

import style from "./style.module.css";

/**
 * @typedef ItemProps
 * @property {Model.BettingTicket} ticket
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ ticket: { key } }) => {
  return (
    <tr className={style.itemwrapper}>
      <td className={style.cell}>-</td>
      <td className={style.cell}>
        <EntryCombination numbers={key} />
      </td>
      <td className={clsx(style.cell, style.right)}>100pt</td>
    </tr>
  );
};

export const BettingTicketList = ({ children }) => {
  if (React.Children.count(children) === 0) {
    return (
      <div className={style.placeholder}>
        <svg
          aria-hidden="true"
          className={style.fa}
          focusable="false"
          role="img"
          viewBox="0 0 576 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z"
            fill="currentColor"
          ></path>
        </svg>
        <div>購入した拳券はありません</div>
      </div>
    );
  }

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th className={clsx(style.cell, style.th)}>的中</th>
          <th className={clsx(style.cell, style.th)}>買い目</th>
          <th className={clsx(style.cell, style.th, style.right)} width="96px">
            数量
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
BettingTicketList.Item = Item;
