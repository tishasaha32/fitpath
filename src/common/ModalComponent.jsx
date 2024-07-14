import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function ModalComponent({
  children,
  showModal,
  setShowModal,
  height,
}) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(!showModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: height ? height : "80vh",
            bgcolor: "white",
            boxShadow: 24,
            border: "none",
            outline: "none",
            p: 2,
            overflow: "scroll",
          }}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
}
