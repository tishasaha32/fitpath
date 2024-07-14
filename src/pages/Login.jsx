import React, { useState } from "react";
import styles from "./Login.module.css";
import { LuUserCheck2 } from "react-icons/lu";
import { MdLockOpen } from "react-icons/md";
import useHandleLogin from "../hooks/useHandleLogin";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, message, icon } = useHandleLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/fitpath-c3d76.appspot.com/o/logo%2FfitPath.png?alt=media&token=7328d726-54ee-4d5f-8dce-57a06eb08758"
          alt="logo"
          className={styles.logo}
        />
        <h3 className={styles.heading}>Login to your Account!</h3>
        <div className={styles.inputContainer}>
          <LuUserCheck2 className={styles.icon} />
          <input
            type="text"
            placeholder="Enter your Email"
            className={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <MdLockOpen className={styles.icon} />
          <input
            type="password"
            placeholder="Enter your Password"
            className={styles.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.loginButton}> LOGIN </button>

        <div
          className={
            message === "Login Successful"
              ? styles.messageSuccessContainer
              : styles.messageErrorContainer
          }
        >
          {icon && <p className={styles.error}>{icon}</p>}
          {message && <p className={styles.me}>{message}</p>}
        </div>
      </form>
      <p>
        {" "}
        Don't have an account?{" "}
        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
