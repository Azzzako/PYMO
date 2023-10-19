import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
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
  getStock
}) => {

  const [response, setResponse] = useState({});

 

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
      <TableBody>
        <AdminModal
          response={response}
          setResponse={setResponse}
          getHospitals={getHospitals}
          getStock={getStock}
        />
        <TableRow
          key={ele.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="right" component="th" scope="row">
            {name}
          </TableCell>
          <TableCell align="right">{cases}</TableCell>
          <TableCell align="right">{formattedDate}</TableCell>
          <TableCell align="right">{ele.petitionId}</TableCell>
          <TableCell align="right">{ele.KN95}</TableCell>
          <TableCell align="right">{ele.faceMask}</TableCell>
          <TableCell align="right">{ele.faces}</TableCell>
          <TableCell align="right">
            {ele.filled ? (
              `Orden Surtida ${updatedDate}`
            ) : (
              <CustomButton1 label="Surtir" onClick={petitionIdToState} />
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ minWidth: "full" }}>
        <TableRow>
          <TableCell align="right">Institucion</TableCell>
          <TableCell align="right">Casos por Mes</TableCell>
          <TableCell align="right">Fecha de Solicitud</TableCell>
          <TableCell align="right">Numero de Orden</TableCell>
          <TableCell align="right">KN95</TableCell>
          <TableCell align="right">Cubrebocas</TableCell>
          <TableCell align="right">Mascarillas</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
        {pet}
      </Table>
    </TableContainer>
  );
};

export default Cards;
