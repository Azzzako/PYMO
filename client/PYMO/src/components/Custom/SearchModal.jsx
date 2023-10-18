import React from "react";
import { Modal, Box, Fade } from "@mui/material";
import CustomButton1 from "./CustomButton";
import { Link } from "react-router-dom";

const SearchModal = ({ response, setResponse }) => {
  const handleClose = () => {
    setResponse({ open: false, find: false, openError: false });
  };

  const { searchResult, find } = response;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };

  console.log(response);

  return (
    <div>
      <Modal
        open={response?.openSuccess}
        onClose={handleClose}
        disableEscapeKeyDown={true}
        hideBackdrop={true}
      >
        <Fade in={response?.openSuccess}>
          <Box sx={style}>
            {find ? (
              <div className="flex flex-col justify-center items-center text-center font-filson gap-4">
                <h2>Genial, ya tenemos los datos del Hospital</h2>
                <h2>{searchResult?.hospitalName}</h2>
                <h1>con direccion en {searchResult?.streetNumber}</h1>
                <div className="flex flex-col gap-4">
                  <Link
                    to={`/petitions?id=${searchResult?.id}&name=${searchResult?.hospitalName}`}
                  >
                    <CustomButton1
                      variant="outlined"
                      color="primary"
                      onClick={handleClose}
                      label="Realizar una Peticion de Insumos"
                    />
                  </Link>
                  <CustomButton1
                    variant="outlined"
                    color="primary"
                    onClick={handleClose}
                    label="Cerrar"
                  />
                </div>
              </div>
            ) : (
              <div
                className={`${
                  response?.openError ? "block" : "hidden"
                } flex flex-col justify-center items-center gap-7 text-center font-filson`}
              >
                <h2>
                  El nombre de la institucion no esta registrada en nuestra base
                  de datos, prueba con REGISTRAR UN HOSPITAL
                </h2>
                <CustomButton1
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                  label="Registrar Hospital"
                />
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SearchModal;
