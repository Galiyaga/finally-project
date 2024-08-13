import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function ProfileWithLogin() {
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
              <Link to="#">
                <button className={styles.button__exit}>Выйти</button>
              </Link>
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
