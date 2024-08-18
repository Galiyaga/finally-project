import React, { useEffect } from "react";
import styles from "./Autorizationpage.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormValues,
  setAccessToken,
  loginSuccess, 
} from "../context/authSlice";

export default function Autorizationpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, password, accessToken } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormValues({ [name]: value || "" }));
  };

  function checkValidation() {
    return login && login.trim() !== "" && password && password.trim() !== "";
  }

  console.log("login:", login, "password:", password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/account/login",
        { login, password }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch(loginSuccess());
      dispatch(setAccessToken(response.data.accessToken));
      console.log("accessToken:", accessToken);
      navigate("/");
    } catch {
      console.error("Ошибка");
    }
  };

  return (
    <>
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
              value={login}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
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
