import clsx from "clsx";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalMessage } from "../../components/GlobalMessage/GlobalMessage";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export function Auth() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    retype_password: "",
    fName: "",
    lName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    retype_password: "",
    fName: "",
    lName: "",
  });

  const [globalMessage, setGlobalMessage] = useState({
    message: "",
    type: "error",
  });

  const { login, token } = useAuthContext();
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  function isFormValid() {
    let isValid = true;
    const newErrors = { ...errors };

    if (!values.email.trim()) {
      isValid = false;
      newErrors.email = "Please enter a valid email address to continue.";
    }

    if (!values.password.trim()) {
      isValid = false;
      newErrors.password = "Please enter a valid password address to continue.";
    }

    if (!isLogin) {
      if (values.retype_password !== values.password) {
        isValid = false;
        newErrors.retype_password =
          "We are sorry, the passwords you entered do not match. Please try again.";
      }

      if (!values.fName.trim()) {
        isValid = false;
        newErrors.fName = "Please enter your first name to continue.";
      }

      if (!values.lName.trim()) {
        isValid = false;
        newErrors.lName = "Please enter your last name to continue.";
      }
    }

    setErrors(newErrors);

    return isValid;
  }

  function handleInputChange(e) {
    const inputName = e.target.name;
    const newValues = { ...values };
    newValues[inputName] = e.target.value;
    setValues(newValues);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    let userObj;
    if (isLogin) {
      userObj = {
        email: values.email,
        password: values.password,
      };
    } else {
      userObj = { ...values };
      delete userObj.retype_password;
    }

    const res = await fetch(
      `http://localhost:3000/${isLogin ? "login" : "register"}`,
      {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (res.ok === false) {
      const errorMessage = await res.json();
      setGlobalMessage({ message: errorMessage, type: "error" });
      return;
    }

    setGlobalMessage({
      message: isLogin
        ? "Welcome back! You have successfully logged in."
        : "Congratulations, your account has been created successfully!",
      type: "success",
    });

    const data = await res.json();
    login(data.accessToken, data.user);
    navigate("/");
  }

  return (
    <div className={styles["loginregister-container"]}>
      <GlobalMessage
        type={globalMessage.type}
        onMessageClosed={() => setGlobalMessage({ message: "", type: "error" })}
      >
        {globalMessage.message}
      </GlobalMessage>
      <form
        className={`${styles["form"]} ${styles["zebra-background"]}`}
        onSubmit={handleSubmit}
      >
        <p className={clsx({ [styles["has-error"]]: errors.email })}>
          <label htmlFor="email">Email</label>
          <input
            className={styles["input"]}
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </p>
        {errors.email && (
          <p className={styles["error-message"]}>{errors.email}</p>
        )}
        <p className={clsx({ [styles["has-error"]]: errors.password })}>
          <label htmlFor="password">Password</label>
          <input
            className={styles["input"]}
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        </p>
        {errors.password && (
          <p className={styles["error-message"]}>{errors.password}</p>
        )}

        {!isLogin && (
          <>
            <p
              className={clsx({
                [styles["has-error"]]: errors.retype_password,
              })}
            >
              <label htmlFor="retype_password">Retype Password</label>
              <input
                className={styles["input"]}
                type="password"
                id="retype_password"
                name="retype_password"
                value={values.retype_password}
                onChange={handleInputChange}
              />
            </p>
            {errors.retype_password && (
              <p className={styles["error-message"]}>
                {errors.retype_password}
              </p>
            )}
            <p className={clsx({ [styles["has-error"]]: errors.fName })}>
              <label htmlFor="fName">First Name</label>
              <input
                className={styles["input"]}
                type="text"
                id="fName"
                name="fName"
                value={values.fName}
                onChange={handleInputChange}
              />
            </p>
            {errors.fName && <p>{errors.fName}</p>}
            <p className={clsx({ [styles["has-error"]]: errors.lName })}>
              <label htmlFor="lName">Last Name</label>
              <input
                className={styles["input"]}
                type="text"
                id="lName"
                name="lName"
                value={values.lName}
                onChange={handleInputChange}
              />
            </p>
            {errors.lName && (
              <p className={styles["error-message"]}>{errors.lName}</p>
            )}
          </>
        )}
        <p>
          <button className={styles["button"]} type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </p>

        {!isLogin ? (
          <p>
            If you have an existing account,{" "}
            <Link className={styles["link"]} to="/login">
              Sign in here.
            </Link>
          </p>
        ) : (
          <p>
            {" "}
            You don't have an account?
            <Link className={styles["link"]} to="/register">
              {" "}
              Create one here.
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
