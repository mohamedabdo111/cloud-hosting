import Link from "next/link";
// import { useRouter } from "next/router";
import React from "react";
import { FaRegComments } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";

const AdminSideBar = () => {
  //   const router = useRouter();
  return (
    <div>
      <div className="my-3">
        <Link
          href={"/admin"}
          className="flex overflow-hidden items-center gap-3 border-b-2 "
        >
          <div>
            <RxDashboard size={31} />{" "}
          </div>
          <h2 className="text-xl hover:text-gray-400 duration-300 ">
            Dashboard
          </h2>
        </Link>
      </div>
      <div className="mt-8 my-3">
        <Link
          href={"/admin/article-table?page=1"}
          className="flex overflow-hidden items-center gap-3"
        >
          <div>
            <GrArticle size={31} />
          </div>
          <h2 className="text-xl hover:text-gray-400 duration-300 ">
            Articles
          </h2>
        </Link>
      </div>
      <div className="my-3">
        <Link
          href={"/admin/comments-table"}
          className="flex overflow-hidden items-center gap-3"
        >
          <div>
            <FaRegComments size={31} />
          </div>
          <h2 className="text-xl hover:text-gray-400 duration-300 ">
            Comments
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
