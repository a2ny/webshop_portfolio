import React, { useRef, useEffect, useState } from "react";
import "./loginpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const containerRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.classList.add("sign-in");
    }
  }, []);

  const toggle = () => {
    const container = containerRef.current;
    if (container) {
      container.classList.toggle("sign-in");
      container.classList.toggle("sign-up");
    }
  };

  //   start of database query
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSignUp(e) {
    if (
      username !== "" &&
      password !== "" &&
      email !== "" &&
      password === confirmPassword
    ) {
      e.preventDefault();
      try {
        const res = await axios.post(
          "https://webshop-portfolio-api.vercel.app/signup",
          {
            username,
            password,
            email,
          }
        );

        const resData = res.data;

        if (resData.message === "User already exists") {
          alert("User already exists");
        } else if (resData.message === "Registration Success") {
          alert("Registration Success");
          toggle();
        } else {
          alert("Wrong details");
        }
      } catch (error) {
        alert(error, "An error occurred while processing your request.");
      }
    } else if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      email === ""
    ) {
      alert("Please fill all fields");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
  }

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://webshop-portfolio-api.vercel.app/login",
        {
          username,
          password,
        }
      );
      if (res.data.message === "exist") {
        const token = res.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);
        navigate("/marketplace");
      } else {
        alert("Incorrect username or password");
        console.log(res.data);
      }
    } catch (error) {
      alert(error, "Error in login");
    }
  }

  return (
    <div ref={containerRef} className="container">
      {/* SIGNUP form */}
      <div className="row">
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button onClick={handleSignUp}>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* SIGN In Form */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper"></div>
        </div>
      </div>

      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>

        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Shop with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
