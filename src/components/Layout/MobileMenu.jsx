import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function MobileMenu() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Закрывает меню при клике
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  function handleLogout() {
    dispatch(logout())
    navigate('/');
  }

	return (
		<>
      <div className={styles.burger_menu} onClick={() => setMenuOpen(!menuOpen)}>
            <div className={styles.burger_line}></div>
            <div className={styles.burger_line}></div>
            <div className={styles.burger_line}></div>
      </div>
      {menuOpen && (
        <div className={styles.mobile__menu}>
          <div className={styles.mobile__menu_header}>
            <img className={styles.mobile__menu_logo} src="src/assets/footerLogo.svg" alt="Логотип" />
            <button className={styles.cross_btn} onClick={handleLinkClick}>
              <img src="src/assets/cross.svg" alt="Логотип" />              
            </button>
          </div>
          <div className={styles.menu__nav}>
            <NavLink
              className={styles.mobile__menu_item}
              to="/"
              onClick={handleLinkClick}
            >
              Главная
            </NavLink>
            <Link
              className={styles.mobile__menu_item}
              to="#"
              onClick={handleLinkClick}
            >
              Тарифы
            </Link>
            <Link
              className={styles.mobile__menu_item}
              to="#"
              onClick={handleLinkClick}
            >
              FAQ
            </Link>
          </div>
          {isAuthenticated ? (
          <div className={styles.mobile__menu_avatar}>
            <img
              src="src\assets\avatar.svg.svg"
              alt="Аватар"
              width={"40px"}
              height={"50px"}
            />
            <div className={styles.mobile__menu_name}>
              <p>Галия Ю.</p>
              <button onClick={handleLogout} className={styles.button__exit}>
                Выйти
              </button>
            </div>
          </div>) : (
            <div className={styles.mobile__nav_button}>
            <Link to="#">
              <button className={styles.mobile__button_registration}>
                Зарегистрироваться
              </button>
            </Link>
            <Link to="/autorization">
              <button className={styles.mobile__button_login}>Войти</button>
            </Link>
          </div>
          )}
      </div>
      )}
		</>
	)
}