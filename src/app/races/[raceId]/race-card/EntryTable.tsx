import React from "react";

import clsx from "clsx";

import style from "./entrytable.module.css";
/**
 * @typedef Props
 * @property {Model.RaceEntry[]} entries
 */

/** @type {React.VFC<Props>} */
export const EntryTable = ({ entries }) => {
  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.th} rowSpan={2} width="48px">
              番号
            </th>
            <th className={clsx(style.th, style.left)} rowSpan={2}>
              選手名
            </th>
            <th className={style.th} rowSpan={2} width="48px">
              予想
            </th>
            <th className={style.th} colSpan={3}>
              決まり手
            </th>

            <th className={style.th} rowSpan={2} width="24px">
              1位
            </th>
            <th className={style.th} rowSpan={2} width="24px">
              2位
            </th>
            <th className={style.th} rowSpan={2} width="24px">
              3位
            </th>
            <th className={style.th} rowSpan={2} width="24px">
              着外
            </th>

            <th className={style.th} rowSpan={2} width="80px">
              勝率
            </th>
            <th className={style.th} rowSpan={2} width="80px">
              3位内率
            </th>

            <th
              className={clsx(style.th, style.left)}
              rowSpan={2}
              width="250px"
            >
              コメント
            </th>
          </tr>
          <tr>
            <th className={style.th} width="64px">
              グー
            </th>
            <th className={style.th} width="64px">
              チョキ
            </th>
            <th className={style.th} width="64px">
              パー
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className={style.td}>{entry.number}</td>
              <td className={clsx(style.td, style.bold, style.left)}>
                {entry.player.name}
              </td>
              <td className={style.td}>{entry.predictionMark}</td>

              <td className={style.td}>{entry.rockWin}</td>
              <td className={style.td}>{entry.scissorsWin}</td>
              <td className={style.td}>{entry.paperWin}</td>

              <td className={style.td}>{entry.first}</td>
              <td className={style.td}>{entry.second}</td>
              <td className={style.td}>{entry.third}</td>
              <td className={style.td}>{entry.others}</td>

              <td className={style.td}>{entry.firstRate.toFixed(1)}</td>
              <td className={style.td}>{entry.thirdRate.toFixed(1)}</td>

              <td className={clsx(style.td, style.left)}>{entry.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
