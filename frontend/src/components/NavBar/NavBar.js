import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import image from "../../img/wahed.png";

const NavBar = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/">
          <img src={image} alt="wahed" />
        </Link>
        <div className="profile">
        <Link to="/">
            <button className="btn btn-outline-secondary ">Home</button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-secondary">About</button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-secondary">Contact Us</button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-secondary">Profile</button>
          </Link>
        </div>
        <div className="links">
          <Link to="/signup">
            <button className="btn btn-secondary">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary">Log in</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
