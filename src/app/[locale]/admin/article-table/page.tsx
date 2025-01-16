import { verifyUser } from "@/utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import TableRow from "./tableRow";
import {
  getArticles,
  getArticlesCount,
} from "@/app/[locale]/apiCalls/articleApis";
import { ArticleCountInPage } from "@/utils/constants";
import { Article } from "@prisma/client";
import AdminPaginationComponent from "@/components/articles/AdminPagination";
import { ISingeleArticle } from "@/utils/dtos";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const token = cookies().get("authToken")?.value as string;
  if (!token) return redirect("/");
  const payload = verifyUser(token) as JwtPayload;
  if (payload.isAdmin === false) return redirect("/");

  const page = searchParams.page || "1";
  const articles: ISingeleArticle[] = await getArticles(page);
  const count = await getArticlesCount();

  const pageCount = Math.ceil(count / ArticleCountInPage);

  return (
    <div>
      <h1 className="text-3xl ">All Articles</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>

              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
              <th scope="col" className="px-6 py-3">
                Learn more
              </th>
              {/* <th scope="col" className="px-6 py-3 sm:hidden ">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {articles.map((articles: Article) => {
              return <TableRow key={articles.id} article={articles}></TableRow>;
            })}
          </tbody>
        </table>
        <AdminPaginationComponent
          pageCount={pageCount}
        ></AdminPaginationComponent>
      </div>
    </div>
  );
};

export default AdminPage;
