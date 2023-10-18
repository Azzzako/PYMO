import React from "react";
import { Modal, Box, Fade } from "@mui/material";
import CustomButton1 from "./CustomButton";
import { Link } from "react-router-dom";

const SolitudeModal = ({ response, setResponse }) => {
  const handleClose = () => {
    setResponse({ error: false, open: false });
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

  console.log(response);
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
                <h2>Status Error: {response?.error?.response?.status}</h2>
                <h2>
                  {response?.error?.response?.status === 500
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
              <div className={`${response?.success ? "block" : "hidden"} flex flex-col justify-center items-center gap-7 text-center`}>
                <h2>Hemos registrado con exito tu Solicitud</h2>
                <h2>
                  Te pedimos conserves bien el numero de solicitud que se te ha
                  asignado y seria enviado a tu correo electronico.
                  Te avisaremos cuando hayamos atendido y enviado tu solicitud.
                  Sigamos trabajando para prevenir contagios de COVID-19
                </h2>
                <Link
                  to="/"
                >
                  <CustomButton1
                    variant="outlined"
                    color="primary"
                    onClick={handleClose}
                    label="Salir"
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

export default SolitudeModal;
