import React from "react";
import styles from "./Header.module.css";
import { useAuth } from "../context/AutorizationContext";
import { useLimitInfo } from "../context/LimitInfoContext";

export default function ProfileWithLogin() {
  const { logout } = useAuth();
  const {limitInfo} = useLimitInfo()

  function handleLogout() {
    localStorage.removeItem("accessToken");
    logout();
  }
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.limit}>
          <p>
            Использовано компаний{" "}
            <span className={styles.limit__use}>
              {limitInfo.usedCompanyCount}
            </span>{" "}
            <br />
            Лимит компаний{" "}
            <span className={styles.limit__company}>
              {limitInfo.companyLimit}
            </span>
          </p>
        </div>
        <div className={styles.avatar}>
          <div className={styles.name}>
            <p>Галия Ю.</p>
            <button onClick={handleLogout} className={styles.button__exit}>
              Выйти
            </button>
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
