import React, { useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SelectedContext from "./SelectedContext";

export default function Login() {
  const { selected, setSelected } = useContext(SelectedContext);

  // const [login, setLogin] = useState([]);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate(null);

  // useLayoutEffect(() => {
  //   const fetchLoginData = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3100/users");
  //       setLogin(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchLoginData();
  // });

  const handleChange = (e) => {
    setUserInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const { userName, password } = userInput;

    try {
      const response = await axios.post("http://localhost:3100/users", {
        username: userName,
        password: password,
      });
      console.log(response);
      const { role, redirectUrl } = response.data;

      // Perform redirection based on the user's role
      if (role === "taxfraud") {
        navigate("/ReportList");
        setSelected("taxfraud");
      } else if (role === "taxevasion") {
        navigate("/ReportList");
        setSelected("taxevasion");
      } else if (role === "cashregister") {
        navigate("/ReportList");
        setSelected("cashregister");
      } else {
        console.log("Invalid role");
      }
    } catch (error) {
      // Handle login error
      console.log(error.response.data.message);
      setLoginError(true);
    }
  };

  return (
    <div className="bg-blue-200 h-screen flex justify-center items-center">
      <div className="bg-gray-400 p-10 pt-16 opacity-80 rounded-lg w-80 h-80">
        <div>
          <label className="mr-5 text-black">User name:</label>
          <input
            className="rounded-md focus:ring-4 ring-teal-300 text-black p-2"
            name="userName"
            type="text"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="mt-2">
          <label className="mr-5 text-black">Password:</label>
          <input
            className="rounded-md text-black p-2"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <br />
        <button
          className="bg-green-400 p-2 rounded-md hover:bg-green-500 mt-5 mb-7"
          onClick={handleLogin}
        >
          Login
        </button>
        {loginError && (
          <p className="text-red-500">Invalid username or password.</p>
        )}
      </div>
    </div>
  );
}
