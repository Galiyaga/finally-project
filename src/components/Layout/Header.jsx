import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";
import ProfileWithLogin from "./ProfileWithLogin";
import ProfileNotLogin from "./ProfileNotLogin";

export default function Header({ autorizatin }) {
  return (
    <>
      <header className={styles.header}>
        <div className="logo">
          <img src="src\assets\logoSCAN.svg" alt="Логотип" />
        </div>
        <nav className={styles.nav__bar}>
          <NavLink className={styles.nav__bar_item} to="/">
            Главная
          </NavLink>
          <Link className={styles.nav__bar_item} to="#">
            Тарифы
          </Link>
          <Link className={styles.nav__bar_item} to="#">
            FAQ
          </Link>
        </nav>
        {autorizatin && <ProfileWithLogin />}
        {!autorizatin && <ProfileNotLogin />}
      </header>
    </>
  );
}