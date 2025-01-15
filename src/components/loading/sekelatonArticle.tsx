import React from "react";

const ArticleItemSkeleton = () => {
  return (
    <div className="col-span-1 mx-auto my-3 w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {/* Title Skeleton */}
      <div className="mb-2 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>

      {/* Description Skeleton */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>

      {/* Button Skeleton */}
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mt-3"></div>
    </div>
  );
};

export default ArticleItemSkeleton;
