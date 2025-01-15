import { getComments } from "@/app/[locale]/apiCalls/commentApis";
import { verifyUser } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import CommentTableRow from "./commentTableRow";
import { AllComments } from "@/utils/dtos";

const CommentsTable = async () => {
  const token = cookies().get("authToken")?.value as string;
  if (!token) return redirect("/");
  const payload = verifyUser(token) as JwtPayload;
  if (payload.isAdmin === false) return redirect("/");

  const Comments: AllComments = await getComments(token);

  return (
    <div>
      <h1 className="text-3xl my-4">All comments</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>

              <th scope="col" className="px-6 py-3">
                CreatedAt
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {Comments?.comments?.map((comment: Comment) => {
              return (
                <CommentTableRow
                  key={comment.id}
                  comment={comment}
                ></CommentTableRow>
              );
            })}
          </tbody>
        </table>
        {/* <AdminPaginationComponent
          pageCount={pageCount}
        ></AdminPaginationComponent> */}
      </div>
    </div>
  );
};

export default CommentsTable;
