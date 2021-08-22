import React from "react";
import "./Header.css";

const Header = () => {
  let url = "";
  
  return (
    <div className="header">
      <div class="container">
        <nav class="main-nav">
          <a href={url}>
            <h2>CRUD App</h2>
          </a>
          <ul class="right-menu">
            <li>
              <a href={url}>About</a>
            </li>
            <li>
              <a href={url}>Services</a>
            </li>
            <li>
              <a href="http://wahed08.github.io">Portfolio</a>
            </li>
            <li>
              <a href={url}>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
