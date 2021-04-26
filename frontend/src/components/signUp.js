import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../components/context/auth-context";
import ErrorModal from "./ShowError/ErrorModal";

const SignUp = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState();

  const history = useHistory();

  const formHandler = async (e) => {
    e.preventDefault();

    const post = { name, email, password, password2 };
    console.log(post);

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
      }
      auth.login(responseData.userId);
      if (response.ok) {
        history.push("/login");
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
                <i className="fas fa-user-plus"></i>SignUp
              </h1>
              <form onSubmit={formHandler}>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-control"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="password2">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    required
                    class="form-control"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
              <p className="lead mt-4">
                Have An Account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
