import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function ProfileNotLogin() {
  return (
    <>
      <div className={styles.nav__button}>
        <Link to="#">
          <button className={styles.button__registration}>
            Зарегистрироваться
          </button>
        </Link>
        <Link to="/autorization">
          <button className={styles.button__login}>Войти</button>
        </Link>
      </div>
    </>
  );
}