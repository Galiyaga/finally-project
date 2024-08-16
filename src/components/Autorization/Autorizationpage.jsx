import React, { useReducer } from "react";
import styles from './Autorizationpage.module.css'
import { ButtonBig } from "../Button";
import { useNavigate   } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../AutorizationContext";


const initialState = {
  login: "",
  password: "",
};

function formReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {...state, 
                    [action.field]: action.value
                }
        default:
            return state;
    }
}

export default function Autorizationpage() {
    const [formState, dispatch] = useReducer(formReducer, initialState)
    const navigate = useNavigate();
    const {isAuthenticated, login} = useAuth()

    function checkValidation() {
        return (
          formState.login.trim() !== "" && formState.password.trim() !== ""
        );
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        console.log('formState: ', formState)

        try {
            const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', formState)
            localStorage.setItem('accessToken', response.data.accessToken)
            login()
            navigate("/");
        } catch {
            console.error(error)
        }
    }

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
                value={formState.login}
                required
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "login",
                    value: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.input__group}>
              <label>Пароль:</label>
              <input
                type="password"
                value={formState.password}
                required
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "password",
                    value: e.target.value,
                  })
                }
              />
            </div>
            <ButtonBig type="submit" isActive={checkValidation()}>
              Войти
            </ButtonBig>
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