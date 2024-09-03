import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";
import ProfileWithLogin from "./ProfileWithLogin";
import {ProfileNotLogin, ProfileNotLoginMobile} from "./ProfileNotLogin";
import { useSelector } from "react-redux";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  // Закрыть меню при клике на ссылку
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  function handleLogout() {
    dispatch(logout())
    navigate('/');
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <img src="src/assets/logoSCAN.svg" alt="Логотип" />
        </div>
        <nav className={styles.nav__bar}>
          <NavLink className={styles.nav__bar_item} to="/">
            Главная
          </NavLink>
          <Link className={styles.nav__bar_item} to="#">
            Тарифы
          </Link>
          <Link className={styles.nav__bar_item} to="#">
            FAQ
          </Link>
        </nav>
        {isAuthenticated ? <ProfileWithLogin /> : <ProfileNotLogin />}
        <div className={styles.burger_menu} onClick={() => setMenuOpen(!menuOpen)}>
          <div className={styles.burger_line}></div>
          <div className={styles.burger_line}></div>
          <div className={styles.burger_line}></div>
        </div>
        {menuOpen && (
          <div className={styles.mobile_menu}>
            <div className={styles.mobile_menu_header}>
              <img className={styles.mobile_menu_logo} src="src/assets/footerLogo.svg" alt="Логотип" />
              <button className={styles.cross_btn} onClick={handleLinkClick}>
                <img src="src/assets/cross.svg" alt="Логотип" />              
              </button>
            </div>
            <div className={styles.menu_nav}>
              <NavLink
                className={styles.mobile_menu_item}
                to="/"
                onClick={handleLinkClick}
              >
                Главная
              </NavLink>
              <Link
                className={styles.mobile_menu_item}
                to="#"
                onClick={handleLinkClick}
              >
                Тарифы
              </Link>
              <Link
                className={styles.mobile_menu_item}
                to="#"
                onClick={handleLinkClick}
              >
                FAQ
              </Link>
            </div>
              {isAuthenticated ? (
              <div className={styles.avatar}>
                <img
                  src="src\assets\avatar.svg.svg"
                  alt="Аватар"
                  width={"40px"}
                  height={"50px"}
                />
                <div className={styles.name}>
                  <p>Галия Ю.</p>
                  <button onClick={handleLogout} className={styles.button__exit}>
                    Выйти
                  </button>
                </div>
              </div>) : <ProfileNotLogin />}
          </div>
        )}
      </header>
    </>
  );
}
