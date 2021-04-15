import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../components/context/auth-context";
import ErrorModal from './ShowError/ErrorModal';

const LogIn = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const post = { email, password };
    console.log(post);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
      }
      auth.login(responseData.userId, responseData.token);
      if (response.ok) {
        history.push("/");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3">
                <i className="fas fa-sign-in-alt"></i> Login
              </h1>

              <form onSubmit={HandleSubmit}>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              <p className="lead mt-4">
                No Account? <Link to="/signup">SignUp</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LogIn;
