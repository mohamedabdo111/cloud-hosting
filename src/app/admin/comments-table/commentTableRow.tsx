"use client";
import { DeleteCommentApi } from "@/app/apiCalls/commentApis";
import DeleteComment from "@/components/modals/deleteComment";
import { Comment } from "@prisma/client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CommentTableRow = ({ comment }: { comment: Comment }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const deleteArticle = async () => {
    try {
      setLoading(true);
      await DeleteCommentApi(comment.id);
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
          {comment.comment}
        </th>
        <td className="px-6 py-4">
          {new Date(comment.createdAt).toDateString()}
        </td>
        <td className="px-6 py-4 flex gap-3">
          <button
            className="bg-red-700 p-2 hover:bg-red-800 text-white rounded-md block "
            onClick={() => setOpen(true)}
          >
            Delete
          </button>
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

export default CommentTableRow;
