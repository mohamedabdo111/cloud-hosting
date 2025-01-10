import { getSingleArticle } from "@/app/apiCalls/articleApis";
import { verifyUser } from "@/utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import { useParams } from "next/navigation";
import React from "react";
import EditArticleForm from "./editArticleForm";

const EditArticle = async ({ params }: { params: { id: string } }) => {
  // if i use client component , i use useParams instead of id not searchParams from props
  //   const { id } = useParams();
  const { id } = params;
  const token = cookies().get("authToken")?.value as string;
  if (!token) return redirect("/");

  const payload = verifyUser(token) as JwtPayload;

  if (payload.isAdmin === false) return redirect("/");

  const EditArticle = await getSingleArticle(id);

  return (
    <section>
      <h1 className="text-3xl my-4"> Edit Article</h1>
      <EditArticleForm EditArticle={EditArticle}></EditArticleForm>
    </section>
  );
};

export default EditArticle;
