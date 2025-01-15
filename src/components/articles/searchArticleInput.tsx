"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchArticleInput = ({ locale }: { locale: string }) => {
  const time = 1000;
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (search === "") return;
    const data = setTimeout(() => {
      router.push(`/${locale}/articles/search?search=${search}`);
      console.log("search", search);
    }, time);

    return () => clearTimeout(data);
  }, [search, router, locale]);

  const t = useTranslations("Articles");

  return (
    <div>
      <input
        className="border rounded-lg p-2 w-full  h-10 my-4 outline-none text-black "
        type="text"
        placeholder={t("search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchArticleInput;
