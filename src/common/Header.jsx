import React from "react";
import styles from "./Header.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        {pathname !== "/" && (
          <IoMdArrowRoundBack onClick={() => window.history.go(-1)} />
        )}
        <p className={styles.name}> FitPath</p>
      </div>
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <FaRegUserCircle className={styles.userIcon} />
      </Link>
    </div>
  );
}

export default Header;
