import React from "react";
import LoginForm from "./loginForm";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

const Login = ({ params }: { params: { locale: string } }) => {
  const locale = params.locale;

  const t = useTranslations("login");
  const token = cookies().get("authToken")?.value as string;
  if (token) redirect("/");
  return (
    <div className="p-5 max-w-[500px] mx-auto">
      <h1 className="text-3xl font-semibold my-2">{t("title")}</h1>
      <LoginForm />
      <Link
        href={`/${locale}/register`}
        className="text-blue-500 text-center block w-fit border-b-2 border-blue-500 m-auto"
      >
        {t("createNewAccount")}
      </Link>
    </div>
  );
};

export default Login;
