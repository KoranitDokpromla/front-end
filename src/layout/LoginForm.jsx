import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post("http://localhost:8000/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 border w-1/3 min-w-[300px] mx-auto rounded-[8px] mt-8 bg-white shadow-md">
      <form className="bg-white flex flex-col gap-4 items-center" onSubmit={hdlSubmit}>
        <label className="w-full max-w-xs bg-white">
          <span className="text-black">Email</span>
          <input
            type="text"
            className="mt-1 block h-8 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="username"
            placeholder="Email"
            value={input.username}
            onChange={hdlChange}
          />
        </label>

        <label className="w-full max-w-xs bg-white">
          <span className="text-black bg-white">Password</span>
          <input
            type="password"
            className="mt-1 block h-8 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>

        <button
          type="submit"
          className="mt-5 w-80 font-bold text-sm bg-black text-white py-2 px-4 hover:bg-stone-500 transition duration-300"
        >
          Login
        </button>
        <div className="w-80 bg-white">
        <button
            type="button"
            className="mt-3 border-t-2 border-b-2 border-l-2 border-r-2 border-solid border-black flex items-center justify-center w-full bg-white font-bold text-sm py-2 px-4 hover:bg-stone-500 "
          >
            <FaFacebook className="mr-2" /> Continue with Facebook
          </button>
          <button
            type="button"
            className="mt-5 border-t-2 border-b-2 border-l-2 border-r-2 border-solid border-black flex items-center justify-center w-full bg-white font-bold text-sm py-2 px-4 hover:bg-stone-500 "
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
          
        </div>
      </form>
    </div>
  );
}
