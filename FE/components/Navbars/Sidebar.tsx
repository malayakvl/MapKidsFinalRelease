import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { setActivePageAction } from "../../redux/layouts";
import { useDispatch } from "react-redux";

// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.tsx";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const dispatch = useDispatch();

  console.log(router.pathname);

  return (
    <nav className="pr-5 pb-16 overflow-x-hidden hidden md:block w-[85px] xl:w-[230px]">
      <Link href={`/`} legacyBehavior>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          aria-current="page"
          className="router-link-active router-link-exact-active flex items-center pt-4 pl-5 intro-x"
        >
          <div>
            <img
              alt=""
              className="h-[45px] float-left"
              src="../../images/logo/4437813.png"
            />
            <span className="hidden ml-3 text-lg text-white xl:inline-block uppercase md:inline-block mt-[10px]">
              Map Kids
            </span>
          </div>
        </a>
      </Link>
      <div className="w-full h-px bg-white/[0.08] z-10 relative dark:bg-white/[0.07] my-6" />
      <ul className="sidebar">
        <li className={router.pathname == "/dashboard" ? "active" : ""}>
          <div
            className={`item-menu cursor-pointer ${
              router.pathname == "/dashboard" ? "" : "unactive-left-menu"
            }`}
          >
            <Link href={"/dashboard"} className="flex">
              <div className="icon-block">
                <span className="left-icons dash-white" />
              </div>
              <div className={`text-menu text-white`}>
                Dashboard
                <span className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block" />
              </div>
            </Link>
          </div>
        </li>

        <li className={router.pathname == "/countries" ? "active" : ""}>
          <div
            className={`item-menu cursor-pointer ${
              router.pathname == "/countries" ? "" : "unactive-left-menu"
            }`}
          >
            <Link href={"/countries"} className="flex">
              <div className="icon-block">
                <span
                  className={`left-icons location-${
                    router.pathname == "/countries" ? "purple" : "white"
                  }`}
                />
              </div>
              <div className={`text-menu text-${router.pathname == "/countries" ? "purple" : "white"}`}>
                Countries
                <span className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block" />
              </div>
            </Link>
          </div>
        </li>


        <li className={router.pathname == "/images" ? "active" : ""}>
          <div
              className={`item-menu cursor-pointer ${
                  router.pathname == "/images" ? "" : "unactive-left-menu"
              }`}
          >
            <Link href={"/images"} className="flex">
              <div className="icon-block">
                <span className="left-icons gallery-purple" />
              </div>
              <div className={`text-menu`}>
                Image Gallery
                <span className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block" />
              </div>
            </Link>
          </div>
        </li>

        {router.pathname === "/dashboard" ? (
          <li className="active">
            <div className="item-menu cursor-pointer">
              <Link href={"/dashboard"} className="flex">
                <div className="icon-block">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <img src="../../images/backend/dashboard/home.svg" width='24px' height="24px" />
                </div>
                <div className="hidden xl:flex items-center w-full ml-3 text-slate-800 font-medium dark:text-slate-300">
                  Dashboard
                  <span className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block" />
                </div>
              </Link>
            </div>
          </li>
        ) : (
          <li>
            <div className="item-menu cursor-pointer unactive-left-menu">
              <div className="icon-block">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src="../../images/backend/dashboard/icon1.svg" width='24px' height="24px" />
              </div>
              <div className="hidden xl:flex items-center w-full ml-3 font-medium text-white">
                <Link href={`/countries`}>
                  Countries
                  <span className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block" />
                </Link>
              </div>
            </div>
          </li>
        )}
        <li className="active">
          <div className="item-menu cursor-pointer">
            <Link href={"/dashboard"} className="flex">
              <div className="icon-block">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src="../../images/backend/dashboard/home.svg" />
              </div>
              <div className="hidden xl:flex items-center w-full ml-3 text-slate-800 font-medium dark:text-slate-300">
                Dashboard
                <div className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block"></div>
              </div>
            </Link>
          </div>
        </li>
        <li>
          <div className="item-menu cursor-pointer h-[50px] flex items-center pl-5 text-white mb-1 relative rounded-full z-10 before:content-[''] before:w-[30px] before:h-[30px] before:-mt-[30px] before:rotate-90 before:scale-[1.04] before:bg-[length:100%] before:absolute before:top-0 before:right-0 before:-mr-5 after:content-[''] after:w-[30px] after:h-[30px] after:mt-[50px] after:scale-[1.04] after:bg-[length:100%] after:absolute after:top-0 after:right-0 after:-mr-5 md:flex">
            <div className="text-primary before:content-[''] before:z-[-1] before:absolute before:top-0 before:right-0 before:-mr-5 before:w-12 before:h-full ">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                src="../../images/backend/dashboard/icon1.svg"
                width={24}
                height={24}
              />
            </div>
            <div className="hidden xl:flex items-center w-full ml-3 font-medium text-white">
              <Link href={`/countries`}>
                Countries
                <span className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block"></span>
              </Link>
            </div>
          </div>
        </li>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li className={`active`}>
          <div className="item-menu cursor-pointer h-[50px] flex items-center pl-5 text-white mb-1 relative rounded-full z-10 before:content-[''] before:w-[30px] before:h-[30px] before:-mt-[30px] before:rotate-90 before:scale-[1.04] before:bg-[length:100%] before:absolute before:top-0 before:right-0 before:-mr-5 after:content-[''] after:w-[30px] after:h-[30px] after:mt-[50px] after:scale-[1.04] after:bg-[length:100%] after:absolute after:top-0 after:right-0 after:-mr-5 md:flex">
            <div className="text-primary before:content-[''] before:z-[-1] before:absolute before:top-0 before:right-0 before:-mr-5 before:w-12 before:h-full ">
              <img
                src="../../images/backend/dashboard/icon1.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
            <div className="hidden xl:flex items-center w-full ml-3 text-slate-800 font-medium text-white">
              <Link href={`/images`}>
                Images
                <div className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block"></div>
              </Link>
            </div>
          </div>
        </li>
        <li>
          <div className="item-menu cursor-pointer h-[50px] flex items-center pl-5 text-white mb-1 relative rounded-full z-10 before:content-[''] before:w-[30px] before:h-[30px] before:-mt-[30px] before:rotate-90 before:scale-[1.04] before:bg-[length:100%] before:absolute before:top-0 before:right-0 before:-mr-5 after:content-[''] after:w-[30px] after:h-[30px] after:mt-[50px] after:scale-[1.04] after:bg-[length:100%] after:absolute after:top-0 after:right-0 after:-mr-5 md:flex">
            <div className="text-primary before:content-[''] before:z-[-1] before:absolute before:top-0 before:right-0 before:-mr-5 before:w-12 before:h-full ">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                src="../../images/backend/dashboard/youtube.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
            <div className="hidden xl:flex items-center w-full ml-3 font-medium text-white">
              <Link href={`/images`}>
                Videos
                <div className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block"></div>
              </Link>
            </div>
          </div>
        </li>
        <li>
          <div className="item-menu cursor-pointer h-[50px] flex items-center pl-5 text-white mb-1 relative rounded-full z-10 before:content-[''] before:w-[30px] before:h-[30px] before:-mt-[30px] before:rotate-90 before:scale-[1.04] before:bg-[length:100%] before:absolute before:top-0 before:right-0 before:-mr-5 after:content-[''] after:w-[30px] after:h-[30px] after:mt-[50px] after:scale-[1.04] after:bg-[length:100%] after:absolute after:top-0 after:right-0 after:-mr-5 md:flex">
            <div className="text-primary before:content-[''] before:z-[-1] before:absolute before:top-0 before:right-0 before:-mr-5 before:w-12 before:h-full ">
              <img
                src="../../images/backend/dashboard/icon1.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
            <div className="hidden xl:flex items-center w-full ml-3 text-slate-800 font-medium text-white">
              <Link href={`/articles`}>
                Articles
                <div className="transition ease-in duration-100 ml-auto mr-5 hidden xl:block"></div>
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
