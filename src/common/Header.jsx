import React from "react";
import styles from "./Header.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <IoMdArrowRoundBack onClick={() => window.history.go(-1)} />
        <p className={styles.name}> FitPath</p>
      </div>
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <FaRegUserCircle className={styles.userIcon} />
      </Link>
    </div>
  );
}

export default Header;
