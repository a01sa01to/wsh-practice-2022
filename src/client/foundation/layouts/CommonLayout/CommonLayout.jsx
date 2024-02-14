import React from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "../../components/navs/Footer";
import { Header } from "../../components/navs/Header/Header";

import style from "./style.module.css"

export const CommonLayout = () => {
  return (
    <div className={style.root}>
      <Header />
      <main className={style.main}><Outlet /></main>
      <Footer />
    </div>
  );
};
