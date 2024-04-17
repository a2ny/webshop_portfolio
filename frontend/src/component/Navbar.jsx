import React from "react";
import "./navbar.css";

const Navbar = ({ toggleSidewindow, toggleAddWindow, toggleAccountWindow }) => {
  const username = localStorage.getItem("username");
  return (
    <div className="navbar-main-container">
      <h5>Welcome "{username}"</h5>

      <p>SHOPPPING HOME</p>

      <div className="nav-links">
        <button
          className="btn btn-outline-success"
          onClick={toggleAccountWindow}
        >
          My Account
        </button>

        <button className="btn btn-outline-success" onClick={toggleSidewindow}>
          Cart
        </button>
        <button className="btn btn-outline-success" onClick={toggleAddWindow}>
          Add Product
        </button>
        <button className="btn btn-outline-success">Marketplace</button>
      </div>
    </div>
  );
};

export default Navbar;
