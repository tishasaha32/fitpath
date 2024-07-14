import React from "react";
import styles from "./Header.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <IoMdArrowRoundBack onClick={() => window.history.go(-1)} />
        <p className={styles.name}> FitPath</p>
      </div>
      <FaRegUserCircle className={styles.userIcon} />
    </div>
  );
}

export default Header;
