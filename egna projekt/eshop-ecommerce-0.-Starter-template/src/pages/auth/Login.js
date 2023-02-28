import React from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="" width="400px" />
      </div>

      <div className={styles.form}>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="--btn --btn-primary --btn-block">Login</button>
          <div className={styles.links}>
            <Link to={"/reset"}>Reset Password</Link>
          </div>
          <p>-- or --</p>
        </form>
        <button className="--btn --btn-danger --btn-block">
          <BsGoogle color="white" />
          Login With Google
        </button>
        <span className={styles.register}>
          <p> dont have an account?</p> <Link to={"/register"}>Register</Link>
        </span>
      </div>
    </section>
  );
};

export default Login;
