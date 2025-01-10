"use client";

import { EditArticleApi } from "@/app/apiCalls/articleApis";
import { Article } from "@prisma/client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const EditArticleForm = ({ EditArticle }: { EditArticle: Article }) => {
  const [title, setTitle] = useState(EditArticle.title || "");
  const [discription, setDiscription] = useState(EditArticle.discription || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const editArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (title === "" || discription === "")
        return toast.error("title and discription is required");
      await EditArticleApi(EditArticle.id, {
        title,
        discription,
      });
      setLoading(false);

      router.refresh();
      toast.success("Article edited successfully , please wait");
      setTimeout(() => {
        router.back();
      }, 800);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
    }
  };

  return (
    <form onSubmit={editArticle}>
      <input
        type="text"
        placeholder="title"
        className="border rounded-lg w-full p-2 my-2 outline-none text-black "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Description"
        className="border rounded-lg w-full p-2 my-2 outline-none text-black "
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
      ></input>
      <button className="bg-blue-500 p-2 rounded-md w-full my-2 hover:bg-blue-600 duration-300">
        {loading ? "Editing..." : "Edit Article"}
      </button>
    </form>
  );
};

export default EditArticleForm;
