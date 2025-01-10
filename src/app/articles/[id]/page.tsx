import { getSingleArticle } from "@/app/apiCalls/articleApis";
import Test from "@/components/articles/test";
import { ISingeleArticle } from "@/utils/dtos";
import React from "react";
import AddComment from "./addComment";
import { cookies } from "next/headers";
import { verifyUser } from "@/utils/verifyToken";

interface Verification {
  id: number;
}
const ArtileDetails = async ({ params }: { params: { id: string } }) => {
  const article: ISingeleArticle = await getSingleArticle(params.id);

  const token = cookies().get("authToken")?.value as string;
  const verify = verifyUser(token) as Verification;

  return (
    <div className="p-5 container mx-auto">
      <div className=" border-2 border-gray-400 p-5 rounded-md">
        <h1 className="font-bold text-3xl mb-2 capitalize">{article.title}</h1>
        <p className=" mb-5">{new Date(article.createdAt).toDateString()}</p>
        <div>{article.discription}</div>
      </div>

      {/* comments */}
      <div>
        <h1 className="font-bold text-3xl my-5">Comments</h1>
        {/* <commentItemsss/> */}
        {verify && (
          <AddComment articleId={article.id} userId={verify?.id}></AddComment>
        )}
        {article?.comment?.map((comment) => (
          // <commentItem key={index} comment={comment}></commentItem>
          <Test key={comment.id} comment={comment} userId={verify?.id}></Test>
        ))}
      </div>
    </div>
  );
};

export default ArtileDetails;
