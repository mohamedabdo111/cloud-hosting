// i make this pagination because i can't use another pagi i made bacaues the other one is client side  , so i made this one to use it in admin page
"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";

const AdminPaginationComponent = ({ pageCount }: { pageCount: number }) => {
  const locale = useLocale();
  const router = useRouter();
  const handlePageChange = (data: { selected: number }) => {
    router.push(`/${locale}/admin/article-table?page=${data.selected + 1}`);
  };

  return (
    <ReactPaginate
      previousLabel="<<"
      nextLabel=">>"
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName="flex gap-2 list-none p-0 justify-center mt-4" // Flex container for pagination
      pageClassName="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 hover:text-blue-500 text-[#111827cc] dark:text-white duration-300 cursor-pointer" // Style for each page item
      pageLinkClassName="w-full h-full flex items-center justify-center" // Style for page link
      previousClassName="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 hover:text-blue-500 duration-300 cursor-pointer text-[#111827cc] dark:text-white" // Style for "Prev" button
      previousLinkClassName="w-full h-full flex items-center justify-center" // Style for "Prev" link
      nextClassName="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 hover:text-blue-500 duration-300 cursor-pointer text-[#111827cc] dark:text-white" // Style for "Next" button
      nextLinkClassName="w-full h-full flex items-center justify-center" // Style for "Next" link
      activeClassName="bg-blue-500 text-white border-blue-500" // Style for the active page
      breakLabel="..."
      breakClassName="flex items-center justify-center w-8 h-8"
      breakLinkClassName="w-full h-full flex items-center justify-center"
    />
  );
};

export default AdminPaginationComponent;
