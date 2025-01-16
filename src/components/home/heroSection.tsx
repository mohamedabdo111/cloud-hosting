import React from "react";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";
import cloudImage from "../../../public/cloud-hosting.png";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  const HeroSectionTitle = [
    { title: t("des_one") },
    {
      title: t("des_two"),
    },
    {
      title: t("des_three"),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-9 ">
      <div className=" col-span-2 md:col-span-1 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-semibold text-[#111827cc] dark:text-white">
          {t("header")}
        </h1>
        <h5 className="text-2xl mb-4">{t("sub_header")}</h5>

        {HeroSectionTitle.map((title, index) => (
          <p
            className="flex items-center gap-2 text-2xl font-semibold text-gray-400 mb-2"
            key={index}
          >
            <IoMdCheckmark /> <span>{title.title}</span>
          </p>
        ))}
      </div>

      <div className=" col-span-2 md:col-span-1 mx-auto">
        <Image
          width={400}
          height={400}
          src={cloudImage}
          alt="heroImage"
          className="rounded-md"
          priority={true}
          quality={100}
        ></Image>
      </div>
    </div>
  );
};

export default HeroSection;
