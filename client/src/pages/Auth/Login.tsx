import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LogIn: React.FC = () => {
  const domain = import.meta.env.VITE_SERVER_URL as string;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [myerror, setError] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${domain}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "/";
      }
    } catch (error) {
      setError(1);
      console.error("ERROR: ", error);
    }
  };

  return (
    <div className="min-w-[90%] flex justify-center items-center min-h-[80vh] bg-cover bg-center text-white">
      <div className="w-[420px] p-8 rounded-lg bg-zinc-900 shadow-white-soft">
        <h1 className="text-center text-3xl font-extrabold">Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative w-full h-[50px] my-6">
            <input
              type="text"
              name="username"
              placeholder="Email"
              className="w-full h-full p-5 rounded-full bg-transparent text-white border-2 border-gray-400 placeholder-gray-400 focus:border-white"
              id="usernameInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full h-[50px] my-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full h-full p-5 rounded-full bg-transparent text-white border-2 border-gray-400 placeholder-gray-400 focus:border-white"
              id="userpassInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm my-[-15px] mb-4">
            <label htmlFor="rememberMe" className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 accent-green-600 scale-125"
              />
              Remember me
            </label>
            <Link to="/forgot_password" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-[45px] rounded-full bg-green-600 text-black text-lg font-semibold shadow-md hover:bg-green-700"
          >
            Login
          </button>

          <div className="text-center text-sm mt-5">
            Don't have an account?{" "}
            <Link to="/auth/sign_up" className="font-medium text-green-600 hover:underline">
              Register
            </Link>
          </div>
          {myerror ? (
            <div className="text-center text-red-500 font-bold mt-2">
              ! Invalid Credentials !
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default LogIn;

