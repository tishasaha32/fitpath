import React, { useState } from "react";
import styles from "./Journal.module.css";

import ModalComponent from "../common/ModalComponent";
import AddJournal from "../common/AddJournal";
import PastJournal from "../common/PastJournal";
// MUI component imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
// Library imports
import { useNavigate } from "react-router";
// Asset imports
import journalMobile from "../assets/Journal.jpg";
import journalDesktop from "../assets/Journal-Desktop.jpg";
import tryTomorrow from "../assets/try-tomorrow.png";
import congrats from "../assets/congrats.png";

import BottomNavbar from "../common/BottomNavbar";
import Header from "../common/Header";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Journal() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPastModal, setShowPastModal] = useState(false);
  // State : For congrats and tryagain model
  const [showTryModal, setShowTryModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={styles.journal}>
      <Header />
      <div className={styles.journalContainer}>
        {/* 
        //* ACTON BUTTONS 
        */}
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => setShowAddModal(true)}
            className={styles.button}
          >
            Add New Journal
          </Button>
          <Button
            onClick={() => setShowPastModal(true)}
            className={styles.button}
          >
            View Past Journal
          </Button>
        </div>
        {/* Mobile Journal Background */}
        <img src={journalMobile} alt="journal" className={styles.journalImg} />
        {/* Desktop Journal Background */}
        <img
          src={journalDesktop}
          alt="journal_background"
          className={styles.journalImgDesktop}
        />
        {/* 
        //* FORM FOR ADDING THE JOURNAL 
        */}
        <Dialog fullScreen open={showAddModal} TransitionComponent={Transition}>
          <AddJournal
            setShowAddModal={setShowAddModal}
            setShowCongratsModal={setShowCongratsModal}
            setShowTryModal={setShowTryModal}
          />
        </Dialog>

        {/* 
        // * CHECK PAST JOURNAL AND JOURNAL OF ANY SPECIFIC DATE 
        */}
        <Dialog
          fullScreen
          open={showPastModal}
          TransitionComponent={Transition}
        >
          <PastJournal setShowPastModal={setShowPastModal} />
        </Dialog>
      </div>
      {/* //* Used for showing congratulations message on routine completion */}
      {showCongratsModal && (
        <ModalComponent
          showModal={showCongratsModal}
          setShowModal={setShowCongratsModal}
          height="45vh"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img src={congrats} alt="congrats" />
            <p>That's Great! Hope to see you tomorrow with new thoughts!</p>
          </div>
        </ModalComponent>
      )}
      {/* //! Used for showing message if user try to submit multiple time */}
      {showTryModal && (
        <ModalComponent
          showModal={showTryModal}
          setShowModal={setShowTryModal}
          height="50vh"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img src={tryTomorrow} alt="try-tomorrow" />
            <p>
              You have already submitted the routine for Today. Try again
              tomorrow.
            </p>
          </div>
        </ModalComponent>
      )}
      <BottomNavbar />
    </div>
  );
}

export default Journal;
