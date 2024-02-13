import React, { useCallback } from "react";
import { Link } from "react-router-dom"

import { useAuth, useRegister } from "../../../contexts/AuthContext";
import { BaseButton } from "../../buttons/BaseButton";

import style from "./style.module.css"

/** @type {React.VFC} */
export const Header = () => {
  const { loggedIn } = useAuth();
  const register = useRegister();

  const handleClickLoginButton = useCallback(() => {
    register();
  }, [register]);

  return (
    <div className={style.wrapper}>
      <h1 className={style.nametext}>
        <Link className={style.nametextlink} to="/">CyberTicket</Link>
      </h1>

      {loggedIn ? (
        <div>ログイン中です</div>
      ) : (
        <BaseButton className={style.loginbutton} onClick={handleClickLoginButton}>ログイン</BaseButton>
      )}
    </div>
  );
};
