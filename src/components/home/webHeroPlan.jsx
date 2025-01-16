import { useTranslations } from "next-intl";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const WebHeroPlan = () => {
  const t = useTranslations("HomePage");
  const plan = [
    {
      id: 1,
      title: t("section_three"),
      price: t("section_three_title"),
      off: t("section_three_descount"),
      feature: t("section_three_feature"),
    },
    {
      id: 2,
      title: t("section_two"),
      price: t("section_two_title"),
      off: t("section_two_descount"),
      feature: t("section_two_feature"),
    },
    {
      id: 3,
      title: t("section_one"),
      price: t("section_one_title"),
      off: t("section_one_descount"),
      feature: t("section_one_feature"),
    },
  ];
  return (
    <div>
      <h1 className=" md:text-3xl text-2xl font-semibold text-center my-4 text-[#111827cc] dark:text-white">
        {t("sec_header")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-9">
        {plan.map((plan) => (
          <div
            key={plan.id}
            className="card text-center col-span-1 capitalize bg-gray-300 dark:bg-cyan-950 p-3 flex flex-col gap-5 justify-center rounded-xl"
          >
            <h1 className="text-4xl  font-semibold  text-[#111827cc] dark:text-blue-500">
              {plan.title}
            </h1>
            <p className="text-2xl font-semibold">{plan.price} </p>
            <p className="bg-red-200 py-2 px-4 rounded-2xl w-fit mx-auto text-red-700 ">
              {plan.off}
            </p>
            <h3 className="text-3xl text-blue-500 ">{t("Top_Feature")}</h3>
            <p className="flex items-center  justify-center gap-2 text-xl  text-gray-500 mb-2">
              {" "}
              <IoMdCheckmark /> <span>{plan.feature}</span>
            </p>
            <p className="flex items-center  justify-center gap-2 text-xl  text-gray-400 mb-2">
              {" "}
              <IoMdCheckmark /> <span>{plan.feature}</span>
            </p>
            <p className="flex items-center  justify-center gap-2 text-xl  text-gray-400 mb-2">
              {" "}
              <IoMdCheckmark /> <span>{plan.feature}</span>
            </p>
            <p className="flex items-center  justify-center gap-2 text-xl  text-gray-400 mb-2">
              {" "}
              <IoMdCheckmark /> <span>{plan.feature}</span>
            </p>
            <button className=" border px-4 py-2 rounded-xl hover:bg-white hover:text-black duration-300 font-semibold text-[#111827cc] border-[#111827cc] dark:text-white dark:border-white ">
              {t("buy_now")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebHeroPlan;
