import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "api/users/login",
        data: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setCookie("token", response.data.token, { path: "/" });
      window.location.reload();
      if (response) {
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="h-screen bg-gray-800 space-y-10
    "
    >
      <h1 className="text-white text-center text-5xl font-bold m-10">Login</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-500"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
