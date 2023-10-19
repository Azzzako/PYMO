import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ForceStock from "./Screens/ForceStock";
import Admin from "./Screens/Admin";
import pymo from "../assets/pymo.png";
import world from "../assets/world.jpg";

const Dashboard = () => {
  const [stock, setStock] = useState({});
  const getStock = async () => {
    await axios.get(`http://localhost:3001/hospital/fill/stock`).then((res) => {
      setStock(res.data);
    });
  };
 
  useEffect(() => {
    getStock();
  }, []);

  return (
    <div className="flex flex-col bg-bg1 w-full">
        <h1 className="text-center p-4 font-filson text-3xl">Bienvenido al Dashboard de administracion</h1>
      <div className="w-full">
        {stock === null ? <div><ForceStock/></div> : <div><Admin/></div>}
      </div>

      
    </div>
  );
};

export default Dashboard;
