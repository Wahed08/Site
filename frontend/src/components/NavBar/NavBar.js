import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import image from "../../img/wahed.png";
import { AuthContext } from '../context/auth-context';

const NavBar = () => {

  const auth = useContext(AuthContext);

  return (
      <div className="clr">
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
            <button className="btn btn-outline-secondary">Company</button>
          </Link>
        </div>
        <div className="links">
         {!auth.isLoggedIn && (<Link to="/signup">
            <button className="btn btn-secondary">Sign up</button>
          </Link>)}
          {!auth.isLoggedIn && (<Link to="/login">
            <button className="btn btn-secondary">Log in</button>
          </Link>)}
          {auth.isLoggedIn && (<Link to="/">
            <button onClick={auth.logout} className="btn btn-secondary">Log out</button>
          </Link>)}
        </div>
      </nav>
    </div>
    </div>
  );
};

export default NavBar;
