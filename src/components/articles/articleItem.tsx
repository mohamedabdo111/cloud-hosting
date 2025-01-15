import React from "react";
import Link from "next/link";
import { Article } from "@prisma/client";
import { useTranslations } from "next-intl";

const ArticleItem = ({ article }: { article: Article }) => {
  const t = useTranslations("Articles");
  return (
    <div className=" col-span-1 w-full mx-auto cursor-pointer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold line-clamp-1 tracking-tight text-gray-900 dark:text-white">
        {article.title}
      </h5>
      <p className="font-normal line-clamp-1 text-gray-700 dark:text-gray-400">
        {article.discription}
      </p>
      <Link
        href={`articles/${article.id}`}
        className=" bg-blue-500 p-2 rounded-md block mt-3 w-full"
      >
        {t("learn_more")}
      </Link>
    </div>
  );
};

export default ArticleItem;
