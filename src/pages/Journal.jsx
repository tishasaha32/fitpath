import React from "react";
import BottomNavbar from "../common/BottomNavbar";
import Header from "../common/Header";
import styles from "./Journal.module.css";

function Journal() {
  return (
    <div>
      <Header />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/fitpath-c3d76.appspot.com/o/journal%2FJOURNAL%20(1).png?alt=media&token=8cde7008-bbd7-49c0-a4e9-712b213a3788"
        alt="journal"
        className={styles.journal}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Add New Journal</button>
        <button className={styles.button}>View My Journal</button>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Journal;
