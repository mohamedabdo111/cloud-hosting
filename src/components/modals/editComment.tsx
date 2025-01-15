import { EditCommentApi } from "@/app/[locale]/apiCalls/commentApis";
import { ICommens } from "@/utils/dtos";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Iprops {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  comment: ICommens;
}

const EditComment = ({ openEdit, setOpenEdit, comment }: Iprops) => {
  const [value, setValue] = useState(comment.comment || "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const onEditComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "") return toast.error("Comment is empty");

    try {
      setLoading(true);
      await EditCommentApi(comment.id, value);
      setLoading(false);
      setOpenEdit(false);
      toast.success("Your comment has been updated");
      router.refresh();

      // setOpenEdit(false);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className={`${
        openEdit
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      } transition-all duration-300 ease-in-out fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full m-auto transform transition-all duration-300 ease-in-out">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <IoIosCloseCircleOutline
            className="absolute top-3 end-2.5 cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setOpenEdit(false)}
          />

          <form onSubmit={onEditComment} className="p-4 md:p-5 text-center">
            <input
              type="text"
              placeholder="Edit Comment"
              className="w-full border border-gray-300 my-7 rounded-md text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              data-modal-hide="popup-modal"
              type="submit"
              className="text-white bg-green-800 hover:bg-green-900
               focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              // onClick={deleteComment}
            >
              {loading ? "loading..." : "Edit"}
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={() => setOpenEdit(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
