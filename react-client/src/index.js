import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bulma/css/bulma.css";
import axios from "axios";

// agar tidak perlu mengirimkan credential setiap kali kita melakukan request ke server
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
