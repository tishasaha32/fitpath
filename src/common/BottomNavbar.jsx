import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./BottomNavbar.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { TbToolsKitchen } from "react-icons/tb";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsJournalRichtext } from "react-icons/bs";

function BottomNavbar() {
  const location = useLocation();

  return (
    <div className={styles.bottomNavbar}>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <IoHomeOutline
          className={
            location.pathname === "/" ? styles.activeIcon : styles.homeIcon
          }
        />
      </Link>
      <Link to="/recipes" style={{ textDecoration: "none", color: "black" }}>
        <TbToolsKitchen
          className={
            location.pathname === "/recipes"
              ? styles.activeIcon
              : styles.kitchenIcon
          }
        />
      </Link>
      <Link to="/journal" style={{ textDecoration: "none", color: "black" }}>
        <BsJournalRichtext
          className={
            location.pathname === "/journal"
              ? styles.activeIcon
              : styles.journalIcon
          }
        />
      </Link>
      <Link to="/reels" style={{ textDecoration: "none", color: "black" }}>
        <MdOutlineOndemandVideo
          className={
            location.pathname === "/reels"
              ? styles.activeIcon
              : styles.videoIcon
          }
        />
      </Link>
    </div>
  );
}

export default BottomNavbar;
