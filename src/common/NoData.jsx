import React from "react";
import styles from "./NoData.module.css";
// Asset import
import DataImg from "../assets/data.svg";

function NoData() {
  return (
    <div className={styles.noData}>
      <img
        src={DataImg}
        className={styles.nodataimg}
        alt="search_to_see_data"
      />
      <div className={styles.nodatatext}>
        Select a date <br />
        To have a glance at your past acitvities
      </div>
    </div>
  );
}

export default NoData;
