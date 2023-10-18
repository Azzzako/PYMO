const express = require("express");
const hospitalRoute = express.Router();
const Hospital = require("../models/hospital");
const Supplies = require("../models/supplies");
const Petition = require("../models/petitions");
const Stock = require("../models/stock");

//Registrar Hospital en la base de Datos
hospitalRoute.post("/register", async (req, res) => {
  try {
    const { hospitalName, casePerMonth, faceMask, KN95, faces, streetNumber } =
      req.body;

    const hospitalRegisterTrue = await Hospital.findOne({
      where: { hospitalName: hospitalName },
    });

    if (hospitalRegisterTrue) {
      return res
        .status(302)
        .json({ error: `El hospital ${hospitalName} ya ha sido registrado` });
    }

    const hospital = await Hospital.create({
      hospitalName,
      casePerMonth,
      streetNumber,
    });

    await Supplies.create({
      hospitalId: hospital.id,
      KN95,
      faceMask,
      faces,
    });

    const hospitalWithSupplies = await Hospital.findByPk(hospital.id, {
      include: Supplies,
    });

    res.status(200).json(hospitalWithSupplies);
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

//Todo el stock

hospitalRoute.get("/fill/stock", async (req, res) => {
  const stock = await Stock.findOne();
  res.status(200).json(stock);
});

//Todo el stock con hospitales
hospitalRoute.get('/all/hospital', async (req,res) => {
  const all = await Stock.findOne({
    include: {model: Hospital, as: 'hospitals'},
    where: {id: 1}
  })
  res.status(200).json(all)
})

//Iniciar Stock
hospitalRoute.post("/stock", async (req, res) => {
  const { KN95, faceMask, faces } = req.body;
  const newStock = await Stock.create({
    KN95,
    faceMask,
    faces,
  });
  res.status(200).json(newStock);
});

//Update Stock
hospitalRoute.put("/stock/update", async (req, res) => {
  try {
    const { KN95, faceMask, faces } = req.body;
    const stock = await Stock.findByPk(1);
    stock.update({
      KN95: KN95,
      faceMask: faceMask,
      faces: faces,
    });
    res.status(200).json(stock)
  } catch (error) {
    res.status(500).json(error)
  }
});

//Actualizar Stock y fillear solicitud

hospitalRoute.post(
  "/fill-solitude/:petitionId/:hospitalId",
  async (req, res) => {
    try {
      const { petitionId } = req.params;
      const { hospitalId } = req.params;
      const petition = await Petition.findByPk(petitionId);
      const hospital = await Supplies.findOne({
        where: { hospitalId: hospitalId },
      });
      const stock = await Stock.findOne();

      if (!petition) {
        return res.status(404).json({ error: "La solicitud no existe." });
      }

      if (petition.fullFilled) {
        return res
          .status(400)
          .json({ error: "La solicitud ya ha sido surtida." });
      }

      await stock.update({
        KN95: stock.KN95 - petition.KN95,
        faceMask: stock.faceMask - petition.faceMask,
        faces: stock.faces - petition.faces,
      });

      await hospital.update({
        KN95: petition.KN95,
        faceMask: petition.faceMask,
        faces: petition.faces,
      });

      await petition.update({ filled: true });
      res.status(200).json(stock);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

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
hospitalRoute.put("/petition/:petitionId", async (req, res) => {
  try {
    const { petitionId } = req.params;
    const petition = await Petition.findByPk(petitionId);
    petition.fullFilled = !petition.fullFilled;
    await petition.save();
    res.status(200).json(petition);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

hospitalRoute.post("/fill-solitude/:petitionId", async (req, res) => {
  const { petitionId } = req.params;
  try {
    const petition = await Petition.findByPk(petitionId);
    if (!petition) {
      return res.status(400).json({ msg: "La solicitud no existe" });
    }

    if (petition.fullFilled) {
      return res.status(400).json({ error: "La solicitud ya ha sido surtida" });
    }

    petition.update({ fullFilled: true });

    res.status(200).json(petition);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
});

module.exports = hospitalRoute;
