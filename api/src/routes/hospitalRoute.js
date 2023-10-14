const express = require("express");
const hospitalRoute = express.Router();
const Hospital = require("../models/hospitalModel");

hospitalRoute.post("/", async (req, res) => {
  try {
    const { name, casePerMonth, faceMask, KN95, faces } = req.body;
    const newPetition = await Hospital.create({
      name: name,
      casePerMonth: casePerMonth,
      faceMask: faceMask,
      KN95: KN95,
      faces: faces,
    });
    res.status(200).json(newPetition);
    console.log(`Hospital ${name} Registrado`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msj: "Internal Server Error" });
  }
});

hospitalRoute.get("/", async (req, res) => {
  try {
    const allHospitals = await Hospital.findAllHospitals();
    res.status(200).json(allHospitals);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = hospitalRoute;
