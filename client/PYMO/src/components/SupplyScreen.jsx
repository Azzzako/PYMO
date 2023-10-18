import React, { useState } from "react";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CustomButton1 from "./Custom/CustomButton";
import { TextField } from "@mui/material";
import SearchModal from "./Custom/SearchModal";
import ModalError from "./Custom/ModalError";
import world from "../assets/world1.jpg";
import pymo from "../assets/pymo.png";
import axios from "axios";
import SolitudeModal from "./Custom/SolitudeModal";

const SupplyScreen = () => {
  const [solitude, setSolitude] = useState({});
  const [response, setResponse] = useState({});

  let id, name;
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get("id");
    name = urlParams.get("name");
  }

  const hanldeChangeSolitude = (e) => {
    e.preventDefault();
    setSolitude({
      ...solitude,
      [e.target.name]: e.target.value,
    });
  };

  const postSolitude = async () => {
    try {
      await axios
        .post(`http://localhost:3001/hospital/${id}/petition`, solitude)
        .then((res) => {
          setResponse({
            data: res.data,
            success: true,
            error: false,
            open: true,
          });
        });
    } catch (error) {
      setResponse({
        error: error,
        success: false,
        open: true,
      });
    }
  };

  console.log(response);

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-full bg-bg2 bg-cover bg-left-bottom">
      <SolitudeModal response={response} setResponse={setResponse}/>
      <div className="flex flex-col justify-center items-center w-full md:w-[50%] p-12 gap-20">
        <h1 className="font-filson text-5xl text-center">{name}</h1>
        <div className="w-full flex flex-col">
          <h1 className="font-filson text-[28px]">Registra tu solicitud</h1>
          <h1 className="font-agora text-[18px]">
            Anotanos en cantidad cuanto necesitas de estos insumos
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
              onChange={hanldeChangeSolitude}
            />
            <TextField
              name="faces"
              label="Caretas"
              type="number"
              variant="standard"
              sx={{
                width: "100%",
              }}
              onChange={hanldeChangeSolitude}
            />
            <TextField
              name="faceMask"
              label="Cubrebocas"
              variant="standard"
              sx={{
                width: "100%",
              }}
              onChange={hanldeChangeSolitude}
            />
          </div>
          <div className="pt-6 flex items-center justify-center">
            <CustomButton1 label="Registrar" onClick={postSolitude} />
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
              Realiza tu Solicitud
              <br />
              <br />
            </h1>
            <span className="font-agora text-[19.5px] lg:text-[25px] font-medium">
              Ten en cuenta que tu solicitud será procesada y evaluada para
              determinar la cantidad de insumos que recibirás. Debido a la alta
              demanda, es posible que haya otros hospitales en la fila de
              espera. <br />
              <br />
              Cada solicitud se revisa cuidadosamente y se atiende según las
              necesidades del hospital y el stock disponible. Te recomendamos
              que no hagas más de una solicitud al mes, ya que así ayudamos a
              distribuir de manera equitativa los recursos y a satisfacer las
              necesidades de todos los hospitales de manera más eficiente.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyScreen;
