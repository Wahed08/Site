import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const HandleSubmit = async (e) => {
    e.prevenrDefault();

    const post = { email, password };
    console.log(post);

    try {
      await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
        .then(() => {
          history.push('/');
        })
        .then((res) => {
          if(!res.ok){
              throw new Error("This is not happening, Why?");
          }
        })
    } catch (err) {}
  };

  return (
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
  );
};

export default LogIn;
