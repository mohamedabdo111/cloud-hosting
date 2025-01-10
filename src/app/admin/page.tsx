import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyUser } from "@/utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import ArticleForm from "./article-table/articleForm";

const ArticleAdmin = () => {
  const token = cookies().get("authToken")?.value as string;
  if (!token) return redirect("/");
  const payload = verifyUser(token) as JwtPayload;
  console.log(payload);
  if (payload.isAdmin === false) return redirect("/");
  return (
    <div className="p-5 w-[500px] mx-auto">
      <h1 className="text-3xl font-semibold my-2">Add new article</h1>
      <ArticleForm />
    </div>
  );
};

export default ArticleAdmin;
