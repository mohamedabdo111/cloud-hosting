"use client";
import { deleteArticleApi } from "@/app/[locale]/apiCalls/articleApis";
import DeleteComment from "@/components/modals/deleteComment";
import { Article } from "@prisma/client";
import { AxiosError } from "axios";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TableRow = ({ article }: { article: Article }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const deleteArticle = async () => {
    try {
      setLoading(true);
      await deleteArticleApi(article.id);
      setLoading(false);
      toast.success("Article deleted successfully");
      router.refresh();
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError)
        toast.error(error?.response?.data.message);
    }
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {article.title}
        </th>
        <td className="px-6 py-4">{article.discription}</td>
        <td className="px-6 py-4 flex gap-3">
          <button
            className="bg-red-700 p-2 rounded-md block "
            onClick={() => setOpen(true)}
          >
            Delete
          </button>
          <Link
            href={`/admin/article-table/edit/${article.id}`}
            className="bg-green-700 p-2 text-white rounded-md block  "
          >
            Edit
          </Link>
        </td>
        <td className="px-6 py-4 ">
          <Link
            href={`/${locale}/articles/${article.id}`}
            className="font-medium block text-blue-600  dark:text-blue-500 hover:underline"
          >
            Learn more
          </Link>
        </td>
      </tr>
      <div>
        <DeleteComment
          deleteComment={deleteArticle}
          open={open}
          setOpen={setOpen}
          loading={loading}
        />
      </div>
    </>
  );
};

export default TableRow;
