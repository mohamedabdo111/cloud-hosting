"use client";
import Link from "next/link";
import React from "react";

type Iprops = {
  error: Error;
  reset: () => void;
};
const ErrorPage = ({ reset }: Iprops) => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-semibold">Something went wrong</h1>
      <div className=" text-center">
        <button
          className="text-2xl block mx-auto my-4 bg-blue-400 p-2 rounded-md"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
      <Link href={"/"} className="text-blue-500 border-b-2 text-2xl">
        Go to home page
      </Link>
    </div>
  );
};

export default ErrorPage;
