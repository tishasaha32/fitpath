import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { LuUserCheck2 } from "react-icons/lu";
import { MdLockOpen } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import useHandleRegister from "../hooks/useHandleRegister";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const { handleRegister, message, icon } = useHandleRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    handleRegister(fullName, email, password, phoneNumber).catch((err) => {
      setError(err.message);
    });
  };

  return (
    <form className={styles.registerContainer} onSubmit={handleSubmit}>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/fitpath-c3d76.appspot.com/o/logo%2FfitPath.png?alt=media&token=7328d726-54ee-4d5f-8dce-57a06eb08758"
        alt="logo"
        className={styles.logo}
      />
      <h3 className={styles.heading}>Create your Account!</h3>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputContainer}>
        <LuUserCheck2 className={styles.icon} />
        <input
          type="text"
          placeholder="Enter your Full Name"
          className={styles.input}
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <IoMailOpenOutline className={styles.icon} />
        <input
          type="text"
          placeholder="Enter your Email"
          className={styles.input}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <IoIosPhonePortrait className={styles.icon} />
        <input
          type="number"
          placeholder="Enter your Phone Number"
          className={styles.input}
          required
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button className={styles.registerButton}>REGISTER</button>
      <div
        className={
          message === "Registration successful"
            ? styles.messageSuccessContainer
            : styles.messageErrorContainer
        }
      >
        {icon && <p className={styles.error}>{icon}</p>}
        {message && <p className={styles.me}>{message}</p>}
      </div>
      <p className={styles.loginContainer}>
        Already have an account?{" "}
        <Link to="/login" className={styles.login}>
          Login
        </Link>
      </p>
    </form>
  );
}

export default Register;
