import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header autorizatin={false} />    
      <main>
        <Outlet />
      </main>
      <footer>2024</footer>
    </>
  );
}
