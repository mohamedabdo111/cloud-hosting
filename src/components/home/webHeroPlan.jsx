import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const plan = [
  {
    id: 1,
    title: "free",
    price: "0$",
    off: "10%",
    feature: "100 website",
  },
  {
    id: 2,
    title: "Premium",
    price: "4$",
    off: "10%",
    feature: "100 website",
  },
  {
    id: 3,
    title: "Premium",
    price: "5$",
    off: "10%",
    feature: "100 website",
  },
];
const WebHeroPlan = () => {
  return (
    <div>
      <h1 className="text-5xl font-semibold text-center my-4">
        Choose your web hosting plan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10">
        {plan.map((plan) => (
          <div
            key={plan.id}
            className="card text-center col-span-1 capitalize bg-cyan-950 p-3 flex flex-col gap-5 justify-center rounded-xl"
          >
            <h1 className="text-4xl text-blue-500 font-semibold">
              {plan.title}
            </h1>
            <p className="text-2xl font-semibold">{plan.price} per month</p>
            <p className="bg-red-200 py-2 px-4 rounded-2xl w-fit mx-auto text-red-700 ">
              {plan.off} off
            </p>
            <h3 className="text-3xl text-blue-500 ">Top Feature</h3>
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
            <p className="flex items-center  justify-center gap-2 text-xl  text-gray-400 mb-2">
              {" "}
              <IoMdCheckmark /> <span>{plan.feature}</span>
            </p>
            <button className=" border px-4 py-2 rounded-xl hover:bg-white hover:text-black duration-300 font-semibold ">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebHeroPlan;
