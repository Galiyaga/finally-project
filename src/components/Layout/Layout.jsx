import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer__container">
          <div className="footer__logo">
            <img src="src/assets/footerLogo.svg" alt="Логотип" />
          </div>
          <div className="footer__info">
            <div className="adress">
              г. Москва, Цветной б-р, 40 +7 495 771 21 11 info@skan.ru
            </div>
            <div className="copyright">Copyright. 2022</div>
          </div>
        </div>
      </footer>
    </>
  );
}
