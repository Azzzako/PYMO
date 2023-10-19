import React from "react";
import { Modal, Box, Fade } from "@mui/material";
import CustomButton1 from "./CustomButton";
import axios from "axios";

const AdminModal = ({ response, setResponse, getHospitals }) => {
  const handleClose = () => {
    setResponse({ error: false, open: false });
  };

  const fillPetition = async () => {
    await axios
      .post(
        `http://localhost:3001/hospital/fill-solitude/${response?.hospitalId}/${response?.petitionId}`
      )
      .then(() => {
        setResponse({ error: false, open: false });
      });
    await getHospitals();
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
    <div className="flex justify-center items-center">
      <Modal
        open={response?.open}
        onClose={handleClose}
        disableEscapeKeyDown={true}
        hideBackdrop={true}
      >
        <Fade in={response?.open}>
          <Box sx={style}>
            <h1 className="text-center">
              Porfavor confirma el Fill de esta Orden!
            </h1>
            <div className="flex justify-center items-center gap-10 p-10">
              <CustomButton1 label="Cancelar" onClick={handleClose} />
              <CustomButton1 label="Confirmar" onClick={fillPetition}/>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AdminModal;
