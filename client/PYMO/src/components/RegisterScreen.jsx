import React, { useEffect, useState } from "react";
import world from "../assets/world.jpg";
import pymo from "../assets/pymo.png";
import { TextField } from "@mui/material";
import CustomButton1 from "./Custom/CustomButton";
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";

const RegisterScreen = () => {
  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState({});
  const [hospitalRegistered, setHospitalRegistered] = useState({});
  const [error, setError] = useState(false);

  const getAllHospitals = async () => {
    await axios.get(`http://localhost:3001/hospital`).then((res) => {
      setHospitals(res.data);
    });
  };

  const handleNewHospital = async (e) => {
    e.preventDefault();
    setNewHospital({
      ...newHospital,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const registerNewHospital = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post(`http://localhost:3001/hospital/register`, newHospital)
        .then((res) => {
          setHospitalRegistered(res.data);
        });
      getAllHospitals();
    } catch (error) {
      setError({ status: error.response.status, msg: error.response.data.error });
    }
  };

  useEffect(() => {
    getAllHospitals();
  }, []);

  console.log("Se registro con exito: ", hospitalRegistered);
  console.log("Todos los hospitales ", hospitals);
  console.log("Hay error", error);

  return (
    <div className="flex flex-col-reverse md:flex-row-reverse w-full h-full bg-bg3 bg-cover">
      <div className="flex flex-col justify-center items-center w-full md:w-[50%] p-12 gap-20">
        <div className="w-full flex flex-col">
          <h1 className="font-filson text-[28px]">Registra un Hospital</h1>
          <div className="flex flex-col gap-3">
            <TextField
              value={newHospital?.hospitalName}
              name="hospitalName"
              onChange={handleNewHospital}
              label="Nombre de la Institucion"
              variant="standard"
              sx={{
                width: "100%",
              }}
            />
            <TextField
              value={newHospital?.casePerMonth}
              name="casePerMonth"
              onChange={handleNewHospital}
              label="Casos de COVID al mes"
              type="number"
              variant="standard"
              sx={{
                width: "100%",
              }}
            />
            <TextField
              value={newHospital?.streetNumber}
              name="streetNumber"
              onChange={handleNewHospital}
              label="Calle y Numero"
              variant="standard"
              sx={{
                width: "100%",
              }}
            />
            <div className="pt-6">
              <CustomButton1 label="Registrar" onClick={registerNewHospital} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <h1 className="font-filson text-[28px]">Ya estas registrado?</h1>
          <TextField
            label="Buscar Institucion"
            variant="standard"
            sx={{
              width: "100%",
            }}
          />
          <div className="pt-6">
            <CustomButton1
              label="Buscar"
              onClick={() => console.log("Hola papure")}
            />
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
          <div className="flex flex-col w-full h-full justify-center items-center p-10 lg:p-20 bg-white bg-opacity-5">
            <img src={pymo} alt="pymo" className="h-[120px]" />

            <h1 className="font-filson text-[35px] sm:text-[35px] xl:text-[56px]">
              Ayudemos en la Lucha contra el COVID-19
            </h1>
            <span className="font-agora text-[18px] lg:text-[25px] font-medium">
              ¡Únete con fuerza a la lucha contra el COVID-19! Sé un pilar de
              nuestro programa y asegura que tu institución cuente con
              suministros esenciales como KN95, caretas y cubrebocas, entregados
              directamente a tu puerta. Protege a tu equipo y comunidad con
              determinación.
            </span>
            <div className="w-full flex flex-row pt-20 gap-10 ">
              <FaFacebookSquare size={50} />
              <FaXTwitter size={50} />
              <FaLinkedin size={50} />
              <FaInstagram size={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
