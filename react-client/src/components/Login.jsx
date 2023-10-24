import React from "react";

const Login = () => {
  return (
    <section className="hero has-background-grey-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="coloumns is-centered">
            <div className="coloumn is-4-desktop">
              <form className="box" style={{ width: "450px", margin: "auto", height: "360px" }}>
                <div className="field mt-5">
                  <label className="label">Email or Username</label>
                  <div className="controls">
                    <input type="text" className="input" placeholder="username" />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input type="password" className="input" placeholder="***" />
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
