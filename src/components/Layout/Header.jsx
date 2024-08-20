import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";
import ProfileWithLogin from "./ProfileWithLogin";
import ProfileNotLogin from "./ProfileNotLogin";
import { useSelector } from "react-redux";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <header className={styles.header}>
        <div className="header__logo">
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
        {isAuthenticated ? <ProfileWithLogin /> : <ProfileNotLogin />}
      </header>
    </>
  );
}
