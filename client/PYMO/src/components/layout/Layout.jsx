import React from "react";
import logo from "../../assets/logo_nav.png";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-full">
      <header className="w-full h-32 bg-bg1">
        <div className="flex h-full items-center ">
          <img src={logo} alt="logo" className="h-full object-contain px-4" />
        </div>
      </header>
      {children}
      <footer className="w-full h-46 bg-red-800">
        <h1>Adios</h1>
      </footer>
    </div>
  );
};

export default Layout;
