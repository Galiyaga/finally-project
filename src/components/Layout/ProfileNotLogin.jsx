import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function ProfileNotLogin() {
  return (
    <>
      <div className={styles.nav__button}>
        <Link to="#">
          <button className={styles.button__registration}>
            Зарегистрироваться
          </button>
        </Link>
        {/* <svg width="50" height="30" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="25"
            y1="30"
            x2="25"
            y2="-30"
            stroke="rgba(2, 148, 145, 1)"
            stroke-width="2"
          />
        </svg> */}
        <Link to="/autorization">
          <button className={styles.button__login}>Войти</button>
        </Link>
      </div>
    </>
  );
}


function ProfileNotLoginMobile({ onLogin }) {
  return (
    <div className={styles.nav__button}>
      <Link to="#">
        <button
          className={styles.button__registration}
          onClick={onLogin}
        >
          Зарегистрироваться
        </button>
      </Link>
      <Link to="/autorization">
        <button className={styles.button__login} onClick={onLogin}>
          Войти
        </button>
      </Link>
    </div>
  );
}

export {ProfileNotLogin, ProfileNotLoginMobile}