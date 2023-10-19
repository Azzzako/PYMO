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
} from "@mui/material";


const Admin = () => {
  const [hospitals, setHospitals] = useState([]);
  const [screen, setScreen] = useState("notFilled");
  const getHospitals = async () => {
    await axios.get(`http://localhost:3001/hospital`).then((res) => {
      setHospitals(res.data);
    });
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
      />
    );
  });

  return (
    <div className="flex flex-col w-full p-2 gap-10">
      <div className="w-full">
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
      <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 md:place-items-center w-full gap-10 md:p-10">
        {cards}
      </div>
    </div>
  );
};

export default Admin;
