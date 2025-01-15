import ArticleItemSkeleton from "@/components/loading/sekelatonArticle";
import React from "react";

const ArticleLoading = () => {
  return (
    <div className="container ">
      <div className=" font-semibold text-4xl my-5 h-10 animate-pulse"></div>

      <div className=" rounded-lg p-2 mx-auto w-full  h-10 my-4 outline-none text-black mb-2 bg-gray-300 dark:bg-gray-700  animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ArticleItemSkeleton></ArticleItemSkeleton>
        <ArticleItemSkeleton></ArticleItemSkeleton>
        <ArticleItemSkeleton></ArticleItemSkeleton>
        <ArticleItemSkeleton></ArticleItemSkeleton>
      </div>
    </div>
  );
};

export default ArticleLoading;
