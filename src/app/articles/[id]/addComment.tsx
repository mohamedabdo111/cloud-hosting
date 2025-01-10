"use client";
import { AddCommentApi } from "@/app/apiCalls/commentApis";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
const AddComment = ({
  articleId,
  userId,
}: {
  articleId: number;
  userId: number;
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const Addcomment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await AddCommentApi({
        comment,
        articleId: articleId,
        userId: userId,
      });
      setComment("");
      setLoading(false);
      toast.success("comment added successfully");
      router.refresh();
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message ||
          error?.response?.data ||
          "An error occurred";
        toast.error(errorMessage);
      }
    }
  };
  return (
    <form onSubmit={Addcomment}>
      <input
        className="border border-gray-600 rounded-lg w-full p-2 my-2 outline-none text-black "
        type="text"
        placeholder="add comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className={`bg-blue-500 p-2 rounded-md my-2 hover:bg-blue-600 duration-300S mb-4 ${
          comment === "" ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "loading ..." : "Add Comment"}
      </button>
    </form>
  );
};

export default AddComment;
