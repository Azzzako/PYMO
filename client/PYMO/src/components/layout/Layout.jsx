import React from "react";
import logo from "../../assets/logo_nav.png";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header className=" h-28">
        <div className="flex w-full h-full items-center justify-around">
          <img src={logo} alt="logo" className="h-full object-contain" />
          <div className="flex justify-center items-center h-full">
            <ul className="flex flex-row gap-8 justify-center items-center font-filson">
              <Link to="/">
                <li className=" text-green-600 hover:text-red-600 transition-all">
                  Registro
                </li>
              </Link>
              <Link
                to="/dashboard"
                className=" text-green-600 hover:text-red-600 transition-all"
              >
                <li>Administrador</li>
              </Link>
            </ul>
          </div>
        </div>
      </header>

      {children}

      <footer className="w-full h-28 bg-bg2 bg-cover bg-center">
        <div className="w-full h-full flex justify-center items-center">
          <span className="font-filson text-center">@ 2023 Todos los Derechos Reservados | Github: @Azzzako</span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
