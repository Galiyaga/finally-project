import React from "react";
import styles from "./Header.module.css";
import { useSelector, useDispatch} from "react-redux";
import { logout, setUsedCompanyCount, setCompanyLimit} from "../context/authSlice";

export default function ProfileWithLogin() {
  const {usedCompanyCount, companyLimit, accessToken} = useSelector((state) => state.auth)

  async function fetchAccInfo() {
    try {
      const response = await axios.get("https://gateway.scan-interfax.ru/api/v1/account/info",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setUsedCompanyCount(response.data.eventFiltersInfo.usedCompanyCount)
      setCompanyLimit(response.data.eventFiltersInfo.companyLimit)
    } catch (error) {
      console.error(error)
    }
  }


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
              {usedCompanyCount}
            </span>{" "}
            <br />
            Лимит компаний{" "}
            <span className={styles.limit__company}>
              {companyLimit}
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
