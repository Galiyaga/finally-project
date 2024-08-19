import React, { useState, useEffect } from "react";
import styles from "./Autorizationpage.module.css";
import styles2 from "../Loading.module.css";
import { Button } from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials} from "../context/authSlice"
import { fetchAuth} from "../context/actionCreators"

export default function Autorizationpage() {
  const { login, password, isLoading } = useSelector((state) => state.auth);
  const [localLogin, setLocalLogin] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function checkValidation() {
    return login.trim() !== "" && password.trim() !== "";
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setCredentials({ login: localLogin, password: localPassword }))
    const resultAction = await dispatch(fetchAuth())

    if(fetchAuth.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }


  return (
    <>
      {isLoading && <div className={styles2.loading}>Loading&#8230;</div>}
      <div className={styles.form__container}>
        <div className={styles.form__tab}>
          <h3 className={styles.tab__active}>Войти</h3>
          <h3>Зарегистрироваться</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input__group}>
            <label>Логин или номер телефона:</label>
            <input
              type="text"
              name="login"
              value={localLogin}
              onChange={(e) => setLocalLogin(e.target.value)}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={localPassword}
              onChange={(e) => setLocalPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className={
              checkValidation()
                ? styles.button__login
                : `${styles.button__login} ${styles.inert}`
            }
            type="submit"
          >
            Войти
          </Button>
          <a href="#" className={styles.restore__link}>
            Восстановить пароль
          </a>
          <div className={styles.login__methods}>
            <label>Войти через:</label>
            <div className={styles.methods__group}>
              <img src="src\assets\google.svg" alt="Google" />
              <img src="src\assets\facebook.svg" alt="Facebook" />
              <img src="src\assets\yandex.svg" alt="yandex" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

