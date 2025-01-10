"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SearchArticleInput = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (search === "") return toast.error("search is required");

    router.push(`/articles/search?search=${search}`);
  };

  return (
    <form onSubmit={onSearch}>
      <input
        className="border rounded-lg p-2 w-96  h-10 my-4 outline-none text-black "
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchArticleInput;
