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
        <div className="logo">
          <img src="" alt="" />
        </div>
        <div className="adress">
          
        </div>
      </footer>
    </>
  );
}
