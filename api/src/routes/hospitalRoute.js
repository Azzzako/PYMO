const express = require("express");
const hospitalRoute = express.Router();
const Hospital = require("../models/hospital");
const Supplies = require("../models/supplies");
const Petition = require("../models/petitions");

//Registrar Hospital en la base de Datos
hospitalRoute.post("/", async (req, res) => {
  try {
    const { hospitalName, casePerMonth, faceMask, KN95, faces } = req.body;
    const hospital = await Hospital.create({
      hospitalName,
      casePerMonth,
    });

    await Supplies.create({
      hospitalId: hospital.id,
      KN95,
      faceMask,
      faces,
    });

    res.status(200).json({ msg: "Registered" });
    console.log(`Hospital ${hospitalName} Registrado`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Todos los hospitales, junto con su Stock y las peticiones a la fundacion
hospitalRoute.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.findAll({
      include: [{ model: Supplies }, { model: Petition }],
    });
    console.log("Mostrando todos los hospitales");
    res.status(200).json(hospitals);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Hospital por ID
hospitalRoute.get("/:hospitalId", async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const hospital = await Hospital.findOne({
      include: [{ model: Supplies }, { model: Petition }],
      where: { id: hospitalId },
    });
    res.status(200).json(hospital);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Registrar Peticion en un hospital por hospitalID
hospitalRoute.post("/:hospitalId/petition", async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const { faceMask, KN95, faces } = req.body;
    const hospital = await Hospital.findOne({
      where: { id: hospitalId },
    });

    const newPetition = await Petition.create({
      KN95,
      faceMask,
      faces,
    });

    await hospital.addPetition(newPetition);

    res.status(200).json({ msg: "Peticion realizada con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Cambiar el estado de la peticion
hospitalRoute.put("/petition/:petitionId", async (req, res)  => {
  try {
    const { petitionId } = req.params;
    const petition = await Petition.findByPk(petitionId)
    petition.fullFilled = !petition.fullFilled
    petition.save()
    res.status(200).json(petition)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = hospitalRoute;
