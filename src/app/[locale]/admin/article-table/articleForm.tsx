"use client";
import { AddArticleApi } from "@/app/[locale]/apiCalls/articleApis";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "" || discription === "") {
      return toast.error("title and discription is required");
    }

    try {
      setLoading(true);
      await AddArticleApi({ title, discription });
      toast.success("article added successfully");
      setTitle("");
      setDiscription("");
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        return toast.error(error?.response?.data.message);
      } else {
        return toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="title"
        className="border rounded-lg w-full p-2 my-2 outline-none text-black text-lg"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border rounded-lg w-full p-2 my-2 outline-none text-black text-lg"
        placeholder="discription"
        rows={5}
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
      />

      <button
        type="submit"
        className={`w-full bg-blue-500 text-white p-2 rounded-lg my-2 ${
          loading && "opacity-50 cursor-not-allowed"
        } `}
        disabled={loading}
      >
        {loading ? "loading..." : "add article"}
      </button>
      <Toaster />
    </form>
  );
};

export default ArticleForm;
