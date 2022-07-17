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
      if (response) {
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="m-10 text-5xl font-bold text-center text-white">Login</h1>
      <form className="px-8 pt-6 pb-8 mb-4 space-y-5 bg-white rounded shadow-md">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-500"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
