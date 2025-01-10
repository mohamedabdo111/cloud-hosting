"use client";
import { DeleteCommentApi } from "@/app/apiCalls/commentApis";
import { ICommens } from "@/utils/dtos";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import EditComment from "../modals/editComment";
import DeleteComment from "../modals/deleteComment";

const Test = ({ comment, userId }: { comment: ICommens; userId: number }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();
  const deleteComment = async () => {
    try {
      setLoading(true);
      await DeleteCommentApi(comment.id);
      setLoading(true);
      setLoading(false);
      toast.success("comment deleted successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="border-2 bg-slate-800 border-gray-400 p-5 rounded-md mb-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl mb-2 capitalize">
            {comment.user.username}
          </h1>
          <p className="mb-5">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p>{comment.comment}</p>
        <div className="flex gap-5 justify-end">
          {userId && userId === comment?.user?.id && (
            <>
              <div className="cursor-pointer">
                <MdDeleteOutline
                  size={30}
                  color="red"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div className="cursor-pointer">
                <CiEdit
                  size={30}
                  color="green"
                  onClick={() => setOpenEdit(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <EditComment
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        comment={comment}
      />
      <DeleteComment
        deleteComment={deleteComment}
        open={open}
        setOpen={setOpen}
        loading={loading}
      />
    </>
  );
};

export default Test;
