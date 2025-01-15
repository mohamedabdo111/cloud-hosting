import React from "react";
import RegisterForm from "./RegisterForm";
import { useTranslations } from "next-intl";

const Register = () => {
  const t = useTranslations("register");
  return (
    <div className="p-5 max-w-[500px] mx-auto">
      <h1 className="text-3xl font-semibold my-2">{t("title")}</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
