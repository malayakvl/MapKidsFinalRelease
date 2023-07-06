import React, { useEffect } from "react";
import "./../../styles/global-backend.scss";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  isDataLoadingSelector,
  toastsSelector,
} from "../../redux/layouts/selectors";
import { fetchUserAction, setUserAction } from "../../redux/user";
import { userSelector } from "../../redux/user/selectors";
import Sidebar from "../Navbars/Sidebar";
// import AdminNavbar from "../Navbars/TopNavbar";
import { toast } from "react-toastify";
import { deleteToastAction } from "../../redux/layouts";
// import { ConfirmationModal } from "../_common";

export default function BackendLayout({ children }: { children: any }) {
  const showLoader = useSelector(isDataLoadingSelector);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const toastSelector = useSelector(toastsSelector);
  // const modalSelector = useSelector(showPreviewPopupSelector);
  useEffect(
    function () {
      if (session?.user?.email && !window.localStorage.getItem("user")) {
        dispatch(setUserAction(session.user));
      } else {
        const localUser = JSON.parse(
          window.localStorage.getItem("user") || "{}"
        );
        if (session?.user?.email !== localUser.email) {
          window.localStorage.setItem("user", JSON.stringify({}));
          dispatch(fetchUserAction(session?.user?.email));
        } else {
          dispatch(
            setUserAction(
              JSON.parse(window.localStorage.getItem("user") || "{}")
            )
          );
        }
      }
    },
    [dispatch, session?.user, session?.user?.email]
  );

  useEffect(
    function () {
      if (user && Object.keys(user).length) {
        const storeUser = window.localStorage.getItem("user")
          ? JSON.parse(window.localStorage.getItem("user") || "")
          : {};
        if (storeUser.id !== user.id || storeUser.status !== user.status) {
          window.localStorage.setItem("user", JSON.stringify(user));
        }
      } else {
        dispatch(setUserAction(session?.user));
      }
    },
    [dispatch, user, session?.user]
  );

  useEffect(() => {
    if (toastSelector.length > 0) {
      // @ts-ignore
      const message: string =
        toastSelector[0].message || "Data has been updated";
      if (toastSelector[0].type === "success") {
        // @ts-ignore
        toast.success(message);
        setTimeout(() => dispatch(deleteToastAction()), 9000);
      }
    }
  }, [toastSelector, toastSelector.length, session?.user, dispatch]);

  return (
    <>
      {showLoader && (
        <div className="loader">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      {session?.user?.email ? (
        <div className="py-2 l-backend">
          <div className="flex mt-[4.7rem] md:mt-0">
            <Sidebar />
            <div className="rounded-[30px] min-w-0 min-h-screen flex-1 pb-10 bg-slate-100 dark:bg-darkmode-700 px-4 md:px-[22px] max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
              <div className="h-[67px] z-[51] flex items-center relative border-b border-slate-200">
                <nav className="hidden mr-auto -intro-x sm:flex">
                  <ol className="flex items-center text-primary dark:text-slate-300">
                    <li className="">Above and Beyond Children’s Museum”</li>
                  </ol>
                </nav>
                <div className="relative mr-auto intro-x sm:mr-6"></div>
                <div className="relative z-50 hidden">
                  <div
                    className="cursor-pointer block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x"
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      src="/images/backend/dashboard/profile.webp"
                    />
                  </div>
                </div>
              </div>

              <div>{children}</div>
            </div>

            {/*РАЗОБРАТЬСЯ С ОТОБРАЖЕНИЕ МОДАЛКИ КОНФИРМАЦИИ БЛОКИРУЕТ КОНТЕНТ*/}
            {/*<ConfirmationModal />*/}
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
