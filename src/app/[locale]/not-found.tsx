import Link from "next/link";
import React from "react";

const NotFount = () => {
  return (
    <div className="text-center p-20">
      <h1 className="text-5xl ">404</h1>
      <p className=" text-3xl">Page not found</p>
      <Link href={"/"} className="text-blue-500 border-b-2 text-2xl">
        Go to home page
      </Link>
    </div>
  );
};

export default NotFount;
