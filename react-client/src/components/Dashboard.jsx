import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3003/users/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        // Jika belum login / tidak memiliki token maka akan di tendang ke login
        navigate("/");
      }
    }
  };

  // melakukan pengecekan sebelum request Api | Axios interceptor
  // setiap request yang membutuhkan token maka dapat melakukan Axios JWT ini
  const axiosJWT = axios.create();

  // Jika Access Token Expire
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getDate()) {
        const response = await axios.get("http://localhost:3003/users/token");
        config.headers.Authorization = response.data.accessToken;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:3003/users", {
      headers: {
        Authorization: token,
      },
    });
    setUsers(response.data);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Assalamu'alaikum, Di Dasboard: {name} </h1>
        <button className="button is-info mt-2" onClick={getUsers}>
          Get Users
        </button>
        <table className="table is-striped is-fullwidth mt-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
