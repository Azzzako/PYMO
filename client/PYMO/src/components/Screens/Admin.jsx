import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomButton1 from "../Custom/CustomButton";

const Admin = ({ getStock, stock }) => {
  const [hospitals, setHospitals] = useState([]);
  const [screen, setScreen] = useState("cards");
  const [newStock, setNewStock] = useState({});
  const [forceStock, setForceStock] = useState({});

  const handleStock = (e) => {
    e.preventDefault();
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const handleForceStock = (e) => {
    e.preventDefault();
    setForceStock({ ...forceStock, [e.target.name]: e.target.value });
  };

  const getHospitals = async () => {
    await axios.get(`http://localhost:3001/hospital`).then((res) => {
      setHospitals(res.data);
    });
  };

  const updateStock = async () => {
    if (!newStock?.KN95 || !newStock?.faceMask || !newStock?.faces) {
      alert("Completa todos los campos");
    } else {
      await axios.put(`http://localhost:3001/hospital/stock/update`, newStock);
      await getStock();
      setNewStock({
        KN95: "",
        faceMask: "",
        faces: "",
      });
    }
  };

  const forceNewStock = async () => {
    if (!forceStock?.KN95 || !forceStock?.faceMask || !forceStock?.faces) {
      alert("Completa todos los campos");
    } else {
      await axios.put(
        `http://localhost:3001/hospital/stock/stock-force`,
        forceStock
      );
      await getStock();
      setForceStock({
        KN95: "",
        faceMask: "",
        faces: "",
      });
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  console.log(hospitals);
  const cards = hospitals.map((hos) => {
    return (
      <Cards
        key={hos.id}
        id={hos.id}
        name={hos.hospitalName}
        petitions={hos.petitions}
        cases={hos.casePerMonth}
        getHospitals={getHospitals}
        screen={screen}
        setScreen={setScreen}
        supplies={hos.Supply}
        getStock={getStock}
      />
    );
  });

  return (
    <div className="flex flex-col w-full p-2 gap-10">
      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-10 p-4 bg-white">
          <div className="flex flex-col justify-center gap-5">
            <h1>Actualmente este es tu Stock</h1>
            <h1>KN95: {stock?.KN95}</h1>
            <h1>Cubrebocas: {stock?.faceMask}</h1>
            <h1>Caretas: {stock?.faces}</h1>
          </div>
          <div className="flex flex-col w-52 gap-2">
            <h1>Actualiza tu Stock!</h1>
            <TextField
              name="KN95"
              label="KN95"
              variant="standard"
              type="number"
              value={newStock?.KN95}
              sx={{
                width: "100%",
              }}
              onChange={handleStock}
            />
            <TextField
              name="faceMask"
              label="Cubrebocas"
              variant="standard"
              type="number"
              value={newStock?.faceMask}
              sx={{
                width: "100%",
              }}
              onChange={handleStock}
            />
            <TextField
              name="faces"
              label="Caretas"
              variant="standard"
              type="number"
              value={newStock?.faces}
              sx={{
                width: "100%",
              }}
              onChange={handleStock}
            />
            <CustomButton1 label="Actualizar" onClick={updateStock} />
          </div>
          <div className="flex flex-col w-52 gap-2">
            <h1>Registra un nuevo Stock</h1>
            <TextField
              name="KN95"
              label="KN95"
              variant="standard"
              type="number"
              value={forceStock?.KN95}
              sx={{
                width: "100%",
              }}
              onChange={handleForceStock}
            />
            <TextField
              name="faceMask"
              label="Cubrebocas"
              variant="standard"
              type="number"
              value={forceStock?.faceMask}
              sx={{
                width: "100%",
              }}
              onChange={handleForceStock}
            />
            <TextField
              name="faces"
              label="Caretas"
              variant="standard"
              type="number"
              value={forceStock?.faces}
              sx={{
                width: "100%",
              }}
              onChange={handleForceStock}
            />
            <CustomButton1 label="Nuevo Stock" onClick={forceNewStock} />
          </div>
        </div>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filters</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={screen}
            label="Filters"
            onChange={(e) => setScreen(e.target.value)}
          >
            <MenuItem value={"cards"}>Todos los Hospitales</MenuItem>
            <MenuItem value={"filled"}>Ordenes Completadas</MenuItem>
            <MenuItem value={"notFilled"}>Ordenes Pendientes</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-col gap-10">{cards}</div>
    </div>
  );
};

export default Admin;
