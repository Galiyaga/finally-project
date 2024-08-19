import React, { useEffect } from "react";
import styles from "./Header.module.css";
import styles2 from "../Loading.module.css";
import { useSelector, useDispatch} from "react-redux";
import { logout } from "../context/authSlice";
import { fetchLimit} from "../context/actionCreators"


export default function ProfileWithLogin() {
  const dispatch = useDispatch()
  const {usedCompanyCount, companyLimit, isLoading} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchLimit());
  }, []);

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.limit}>
          {isLoading ? (<div style={{position: 'relative'}} className={styles2.loading}>Loading&#8230;</div>) : (
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
          )}
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
