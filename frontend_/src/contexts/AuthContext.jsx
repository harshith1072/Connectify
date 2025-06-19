import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
 import server from "../environment";


export const AuthContext = createContext({});

const client = axios.create({
//  baseURL: "http://localhost:8000/api/v1/users"
 baseURL: `${server}/api/v1/users`  


});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // ✅ fixed

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });

      if (response.status === httpStatus.CREATED) {
        const { token, message, user } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          setUserData(user || { name, username });
          navigate("/home"); // ✅ navigate not router
        }

        return message || "User registered successfully.";
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Register failed";
      console.error("Register error:", msg);
      throw new Error(msg);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      if (response.status === httpStatus.OK) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setUserData(user);
        navigate("/home");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      console.error("Login error:", msg);
      throw new Error(msg);
    }
  };

  const getHistoryOfUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await client.get("/get_all_activity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      throw new Error(msg || "Fetching history failed");
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      const token = localStorage.getItem("token");

      const response = await client.post(
        "/add_to_activity",
        { meeting_code: meetingCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      throw new Error(msg || "Adding to history failed");
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
