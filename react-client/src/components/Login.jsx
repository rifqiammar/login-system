import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle error
  const [msg, setMsg] = useState("");

  // Redirect
  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    // Agar ketika di submit pagenya tidak reload
    e.preventDefault();

    try {
      await axios.post("http://localhost:3003/users/login", {
        email: email,
        password: password,
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response) setMsg(error.response.data.message);
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="coloumns is-centered">
            <div className="coloumn is-4-desktop">
              <form className="box" onSubmit={LoginHandler} style={{ width: "450px", margin: "auto", height: "360px" }}>
                <p className="has-text-centered has-text-danger is-size-5">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Email or Username</label>
                  <div className="controls">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="email" required />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="***" required />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <button className="button is-success is-fullwidth">Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
