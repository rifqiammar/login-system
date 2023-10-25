import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  // handle error
  const [msg, setMsg] = useState("");

  // Redirect
  const navigate = useNavigate();

  const RegisterHandler = async (e) => {
    // Agar ketika di submit pagenya tidak reload
    e.preventDefault();

    try {
      await axios.post("http://localhost:3003/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });

      navigate("/");
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
              <form onSubmit={RegisterHandler} className="box" style={{ width: "450px", margin: "auto" }}>
                {/* Error Print */}
                <p className="has-text-centered has-text-danger is-size-5">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="controls">
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="name" />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input required type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="email@mail" />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="***" />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Conirm Password</label>
                  <div className="controls">
                    <input required type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="input" placeholder="***" />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <button type="submit" className="button is-success is-fullwidth">
                      Register
                    </button>
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

export default Register;
