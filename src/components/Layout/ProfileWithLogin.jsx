import React from "react";
import styles from "./Header.module.css";
import { useAuth } from '../AutorizationContext'

export default function ProfileWithLogin() {
  const {logout} = useAuth()

  function handleLogout() {
    localStorage.removeItem('accessToken')
    logout()
  }
    return (
      <>
        <div className={styles.profile}>
          <div className={styles.limit}>
            <p>
              Использовано компаний{" "}
              <span className={styles.limit__use}>{34}</span> <br />
              Лимит компаний{" "}
              <span className={styles.limit__company}>{1000}</span>
            </p>
          </div>
          <div className={styles.avatar}>
            <div className={styles.name}>
              <p>Имя Ф.</p>
                <button onClick={handleLogout}className={styles.button__exit}>Выйти</button>
            </div>
            <img
              src="src\assets\avatar.svg.svg"
              alt="Аватар"
              width={"40px"}
              height={"50px"}
            />
          </div>
        </div>
      </>
    );
}
