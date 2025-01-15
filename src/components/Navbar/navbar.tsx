"use client";
// import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { FaListUl } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IUserData } from "@/utils/dtos";
import { LogoutApi } from "@/app/[locale]/apiCalls/auth/loginApi";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import BtnLocale from "@/components/btnLocal/btn";
import { BsFillCloudArrowDownFill } from "react-icons/bs";
const Navbar = ({
  UserData,
  locale,
}: {
  locale: string;
  UserData: IUserData | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("NavBar");
  const pathName = usePathname();

  const logout = async () => {
    try {
      await LogoutApi();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 relative w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl !container  flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <BsFillCloudArrowDownFill size={45} />
            </span>
          </Link>

          {!UserData ? (
            <div className="flex md:order-2 gap-3 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <Link
                href={`/${locale}/login`}
                className={`text-white mx-2 ${
                  pathName === "ar/login" ? "bg-blue-700" : ""
                } bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 `}
              >
                {t("login_btn")}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="text-white hidden md:block bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
              >
                {t("register_btn")}
              </Link>
              <BtnLocale></BtnLocale>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <p>{UserData?.username}</p>

              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={logout}
              >
                {/* {loading ? "loading..." : "Logout"} */}
                {t("logout_btn")}
              </button>
              <BtnLocale></BtnLocale>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <IoMdCloseCircleOutline size={30} />
            ) : (
              <FaListUl size={30} />
            )}
          </button>
          <div
            className={`items-center justify-between ${
              isOpen ? `${styles.listStyle}` : `${styles.hideListStyle}`
            }  w-full md:!flex md:!relative
             md:!w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-transparent">
              <li>
                <Link
                  href="/"
                  className={` block py-2 px-3 ${
                    pathName === `/${locale}` && "text-blue-700"
                  } hover:bg-blue-950 rounded md:bg-transparent `}
                  aria-current="page"
                >
                  {`${t("home")}`}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className={` block py-2 px-3 ${
                    pathName === `/${locale}/articles` && "text-blue-700"
                  } hover:bg-blue-950 rounded md:bg-transparent `}
                >
                  {`${t("article")}`}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className={` block py-2 px-3 ${
                    pathName === `/${locale}/about` && "text-blue-700"
                  } hover:bg-blue-950 rounded md:bg-transparent `}
                >
                  {`${t("about")}`}
                </Link>
              </li>
              {UserData?.isAdmin && (
                <li>
                  <Link
                    href={`/${locale}/admin`}
                    className={` block py-2 px-3 ${
                      pathName === `${locale}/admin` ? "bg-blue-700" : ""
                    } hover:bg-blue-950 rounded md:bg-transparent `}
                  >
                    {`${t("Admin_dashboard")}`}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
