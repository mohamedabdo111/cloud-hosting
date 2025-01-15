"use client"; // Ensure this is a Client Component
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const BtnLocale = () => {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();

  const removeLocalePrefix = (path, locale) => {
    return path.startsWith(`/${locale}`) ? path.slice(locale.length + 1) : path;
  };

  const handleChangeLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const pathWithoutLocale = removeLocalePrefix(pathName, locale);
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <button
      className="py-1 px-2 border rounded-md"
      onClick={handleChangeLanguage}
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
};

export default BtnLocale;
