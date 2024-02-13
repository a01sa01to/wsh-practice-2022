import React from "react";
import { Link } from "react-router-dom";

import style from "./style.module.css";

/** @type {React.VFC} */
export const Footer = () => {
  return (
    <div className={style.wrapper}>
      <ul className={style.list}>
        <li className={style.listitem}>ヘルプ</li>
        <li className={style.listitem}>お問い合わせ</li>
        <li className={style.listitem}>広告ガイドライン</li>
        <li className={style.listitem}>運営会社</li>
        <li className={style.listitem}>利用規約</li>
        <li className={style.listitem}>特定商取引法</li>
        <li className={style.listitem}>プライバシーポリシー</li>
      </ul>

      <h1 className={style.nametext}>
        <Link className={style.nametextlink} to="/">CyberTicket</Link>
      </h1>

      <p className={style.warningtext}>
        じゃんけんはどこの国の商標でもなく、中国から九州に伝来した虫拳に由来する日本の遊戯です。拳券の購入は20歳になってから。じゃんけんは適度に楽しみましょう。
      </p>
    </div>
  );
};
