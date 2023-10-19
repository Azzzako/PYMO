import React, { useState } from "react";
import CustomButton1 from "../Custom/CustomButton";
import { TextField } from "@mui/material";
import pymo from "../../assets/pymo.png";
import world from "../../assets/stock.jpg";
import axios from "axios";

const ForceStock = ({ getStock }) => {
  const [initialStock, setInitialStock] = useState({});

  const setStock = (e) => {
    e.preventDefault();
    setInitialStock({
        ...initialStock,
      [e.target.name]: e.target.value,
    });
  };

  const pushStock =async (e) => {
    e.preventDefault()
   await axios.post('http://localhost:3001/hospital/stock', initialStock)
    await getStock()
  }

  console.log(initialStock);
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-full bg-bg3 bg-cover bg-left-bottom">
      <div className="flex flex-col justify-center items-center w-full md:w-[50%] p-12 gap-20">
        <h1 className="font-filson text-5xl text-center">{name}</h1>
        <div className="w-full flex flex-col">
          <h1 className="font-filson text-[28px]">
            Porfavor Indica la cantidad de Stock inicial disponible
          </h1>
          <div className="grid grid-cols-2 gap-3 pt-10 md:pt-20">
            <TextField
              name="KN95"
              label="KN95"
              variant="standard"
              type="number"
              sx={{
                width: "100%",
              }}
              onChange={setStock}
            />
            <TextField
              name="faces"
              label="Caretas"
              type="number"
              variant="standard"
              sx={{
                width: "100%",
              }}
              onChange={setStock}
            />
            <TextField
              name="faceMask"
              label="Cubrebocas"
              variant="standard"
              sx={{
                width: "100%",
              }}
              onChange={setStock}
            />
          </div>
          <div className="pt-6 flex items-center justify-center">
            <CustomButton1 label="Registrar" onClick={pushStock}/>
          </div>
        </div>
      </div>

      <div className="flex h-[70%] md:h-full md:w-[50%] relative">
        <img
          src={world}
          alt="world"
          className="w-full h-[50em] md:h-[50em] object-cover opacity-80"
        />
        <div className="flex flex-col justify-center absolute w-full h-full">
          <div className="flex flex-col w-full h-full justify-center items-center p-10 lg:p-20 bg-white bg-opacity-30">
            <img src={pymo} alt="pymo" className="h-[80px]" />

            <h1 className="font-filson text-[30px] sm:text-[35px] xl:text-[56px]">
              Inciando el Sistema
              <br />
              <br />
            </h1>
            <span className="font-agora text-[19.5px] lg:text-[25px] font-medium">
              Para iniciar el sistema es necesario que indiques cuanta cantidad
              tienes de casa INSUMO <br />
              <br />
              Si lo deseas puedes actualizar esta cantidad mas adelante, pero
              por ahora, para acceder a las funciones de administrador,
              necesitas surtir tu STOCK!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForceStock;
