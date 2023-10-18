import React from "react";
import { Modal, Box, Fade } from "@mui/material";
import CustomButton1 from "./CustomButton";
import { Link } from "react-router-dom";

const ModalError = ({ response, setResponse }) => {
  const handleClose = () => {
    setResponse({ error: false});
  };

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

  console.log(response?.response?.id);
  return (
    <div>
      <Modal
        open={response?.open}
        onClose={handleClose}
        disableEscapeKeyDown={true}
        hideBackdrop={true}
      >
        <Fade in={response?.open}>
          <Box sx={style}>
            {response?.error ? (
              <div className="flex flex-col justify-center items-center gap-7 text-center">
                <h2>Status Error: {response?.status}</h2>
                <h2>
                  {response?.status === 500
                    ? "Error Interno del Servidor, prueba llenando todos los campos nuevamente"
                    : response?.msg}
                </h2>
                <CustomButton1
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                  label="Cerrar"
                >
                  Cerrar Modal
                </CustomButton1>{" "}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-7 text-center">
                <h2>Hospital {response?.response?.hospitalName} Registrado</h2>
                <h2>
                  Recibiras tus insumos en la siguiente direccion:{" "}
                  {response?.response?.streetNumber}
                </h2>
                <Link
                  to={`/petitions?id=${response?.response?.id}&name=${response?.response?.hospitalName}`}
                >
                  <CustomButton1
                    variant="outlined"
                    color="primary"
                    onClick={handleClose}
                    label="Realizar Peticion"
                  />
                </Link>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalError;
