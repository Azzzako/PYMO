import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import CustomButton1 from "../Custom/CustomButton";
import AdminModal from "../Custom/AdminModal";

const Cards = ({
  name,
  petitions,
  cases,
  id,
  getHospitals,
  screen,
  supplies,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let allPetitions;
  if (screen === "cards") {
    allPetitions = petitions;
  }

  if (screen === "filled") {
    allPetitions = petitions.filter((ele) => ele.filled === true);
  }

  if (screen === "notFilled") {
    allPetitions = petitions.filter((ele) => ele.filled === false);
  }

  const pet = allPetitions?.map((ele) => {
    const createdAtDate = new Date(ele.createdAt);
    const updatedAtDate = new Date(ele.updatedAt);
    const formattedDate = createdAtDate.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const updatedDate = updatedAtDate.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const petitionIdToState = () => {
      setResponse({
        open: true,
        hospitalId: ele.petitionId,
        petitionId: id,
      });
    };

    return (
      <div className={`w-full text-center`}>
        <AdminModal
          response={response}
          setResponse={setResponse}
          getHospitals={getHospitals}
        />
        <Accordion
          key={ele.id}
          expanded={expanded === ele.petitionId}
          onChange={handleChange(ele.petitionId)}
          sx={
            ele.filled
              ? { backgroundColor: "green" }
              : { backgroundColor: "red" }
          }
        >
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <h1 className="text-center w-full text-white">{formattedDate}</h1>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-2 text-white">
            <h1>KN95: {ele.KN95}</h1>
            <h1>Cubrebocas: {ele.faceMask}</h1>
            <h1>Caretas: {ele.faces}</h1>
            {ele.filled ? (
              "Se surtio el " + updatedDate
            ) : (
              <CustomButton1 label="Surtir" onClick={petitionIdToState} />
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });

  return (
    <div className="w-full flex flex-col justify-center items-center p-8 gap-4 bg-bg2 bg-cover text-center">
      <h1 className="font-filson text-white">{name}</h1>
      <h1 className="font-filson text-white">
        Casos registrados por mes: {cases}
        <h1>
          Se tienen
          <br />{" "}
        </h1>
        <h1>KN95: {supplies.KN95}</h1>
        <h1>Cubrebocas: {supplies.faceMask}</h1>
        <h1>Caretas: {supplies.faces} </h1>
      </h1>

      {pet}
    </div>
  );
};

export default Cards;
