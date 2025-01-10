"use client";
import { RegisterApi } from "@/app/apiCalls/auth/loginApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onsubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || username === "")
      return toast.error("email and password is required");
    try {
      setLoading(true);
      await RegisterApi({ email, password, username });
      setLoading(false);
      router.push("/login");
      router.refresh();
      toast.success("register successfully");
    } catch (error) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onsubmit}>
      <input
        type="text"
        placeholder="username"
        className="border rounded-lg w-full p-2 my-2 outline-none text-black "
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border rounded-lg w-full p-2 my-2 outline-none text-black "
        name="email"
        onChange={(e) => setEmial(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="border rounded-lg w-full p-2 my-2 outline-none  text-black "
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 p-2 rounded-md w-full my-2 hover:bg-blue-600 duration-300"
      >
        {loading ? "loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
