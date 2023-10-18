import React from "react";
import logo from "../../assets/logo_nav.png";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header className="w-full h-28">
        <div className="flex w-full h-full items-center ">
          <img src={logo} alt="logo" className="h-full object-contain px-4" />
        </div>
      </header>

      {children}

      <footer className="w-full h-28">
        <h1>Adios</h1>
      </footer>
    </>
  );
};

export default Layout;
