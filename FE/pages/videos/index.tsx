import Head from "next/head";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItems, VideoForm } from "../../components/Videos";
import { activeTabSelectorFactory } from "../../redux/layouts/selectors";
import {
  setSwitchHeaderAction,
  setActivePageAction,
} from "../../redux/layouts/actions";
import BackendLayout from "../../components/Layout/BackendLayout";

export default function Index({
  session,
  locale,
}: {
  session: any;
  locale: string;
}) {
  if (!session) return <></>;
  // const count = useSelector(itemCountSelector);
  const dispatch = useDispatch();
  const activeTabLayout = useSelector(activeTabSelectorFactory("videos"));
  // const hiddenFileInput = useRef(null);
  const activeLayout = activeTabLayout;

  useEffect(() => {
    dispatch(setSwitchHeaderAction(null));
  }, []);

  const changeLayout = (type: string) => {
    dispatch(
      setActivePageAction({
        type: "videos",
        modifier: type,
      })
    );
  };

  return (
    <>
      <Head>
        <title>MapKids - Videos</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <h2 className="mt-10 text-lg font-medium intro-y">
        {activeLayout.tab !== "list" && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <span
            onClick={() =>
              dispatch(
                setActivePageAction({
                  type: "videos",
                  modifier: "list",
                })
              )
            }
            className="cursor-pointer inline-block pl-[30px] text-[12px] mr-[10px] back-arrow"
          />
        )}
        Video List
      </h2>
      {activeLayout.tab === "list" && (
        <>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
              <button
                onClick={() => changeLayout("form")}
                className="btn bg-purple-800 inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer text-white shadow-md mr-[10px]"
              >
                Add New Video
              </button>
            </div>
          </div>
          <ListItems locale={locale} />
        </>
      )}
      {activeLayout.tab === "form" && <VideoForm />}
    </>
  );
}
Index.Layout = BackendLayout;

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: `/auth/signin` },
    };
  }

  return {
    props: {
      session,
      locale,
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
}