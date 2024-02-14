"use client";

import React, { useCallback } from "react";
import Link from "next/link";

import { useAuth, useRegister } from "../../../context/AuthContext";
import { BaseButton } from "../../buttons/BaseButton/BaseButton";

import style from "./style.module.css";

export const Header = () => {
  const { loggedIn } = useAuth();
  const register = useRegister();

  const handleClickLoginButton = useCallback(() => {
    register();
  }, [register]);

  return (
    <div className={style.wrapper}>
      <h1 className={style.nametext}>
        <Link className={style.nametextlink} href="/">
          CyberTicket
        </Link>
      </h1>

      {loggedIn ? (
        <div>ログイン中です</div>
      ) : (
        <BaseButton
          className={style.loginbutton}
          onClick={handleClickLoginButton}
        >
          ログイン
        </BaseButton>
      )}
    </div>
  );
};
