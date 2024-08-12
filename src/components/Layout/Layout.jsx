import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import styles from './Layout.module.css'

export default function Layout() {
    return <div>
        <>
            <header className={styles.header}> 
                <div className={styles.nav__bar}>
                    <NavLink className={styles.nav__bar_item} to="/">Главная</NavLink>
                    <Link className={styles.nav__bar_item} to="#">Тарифы</Link>
                    <Link className={styles.nav__bar_item} to="#">FAQ</Link>
                </div>
                <div className={styles.nav__button}>
                    <Link to="#">
                        <button className={styles.button__registration}>Зарегистрироваться</button>
                    </Link>
                    <Link to="/autorization">
                        <button className={styles.button__login}>Войти</button>
                    </Link>
                </div>
            </header>
            <Outlet />
            <footer>2024</footer>
        </>
    </div>
}