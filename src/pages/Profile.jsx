import React from "react";
import { useGetUserData } from "../hooks/useGetUserDetails";
import Header from "../common/Header";
import styles from "./Profile.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import useLogout from "../hooks/useLogout";

function Profile() {
  const userDetails = useGetUserData();
  const logout = useLogout();
  return (
    <div style={{ overflowX: "hidden", height: "100vh" }}>
      <Header />
      {userDetails && (
        <div className={styles.userDetailsContainer}>
          <div>
            <div className={styles.userImageContainer}>
              <FaRegUserCircle className={styles.userImage} />
            </div>
            <div>
              <p className={styles.userDetailsHeader}>First name</p>
              <p className={styles.userDetails}>{userDetails.fullName}</p>
            </div>
          </div>
          <div>
            <p className={styles.userDetailsHeader}>Email</p>
            <p className={styles.userDetails}>{userDetails.email}</p>
          </div>
          <div className={styles.logoutContainer}>
            <button onClick={logout} className={styles.logoutButton}>
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
