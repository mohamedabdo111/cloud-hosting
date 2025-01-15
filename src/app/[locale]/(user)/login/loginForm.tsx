"use client";
import { LoginApi } from "@/app/[locale]/apiCalls/auth/loginApi";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const t = useTranslations("login");
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "")
      return toast.error("email and password is required");

    try {
      setLoading(true);
      await LoginApi({ email, password });
      router.push("/");
      router.refresh();
      setLoading(false);
      toast.success("login successfully");
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data.message || "An error occurred";

        return toast.error(errorMessage);
      }
    }
  };
  return (
    <form onSubmit={onsubmit}>
      <input
        type="email"
        placeholder={t("email")}
        className="border rounded-lg w-full p-2 my-2 outline-none text-black "
        name="email"
        onChange={(e) => setEmial(e.target.value)}
      />
      <input
        type="password"
        placeholder={t("password")}
        className="border rounded-lg w-full p-2 my-2 outline-none  text-black "
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 p-2 rounded-md w-full my-2 hover:bg-blue-600 duration-300 ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {loading ? "loading..." : `${t("submit")}`}
      </button>
    </form>
  );
};

export default LoginForm;
