import Head from "next/head";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatsAction } from "../../redux/userRequests";

import BackendLayout from "../../components/Layout/BackendLayout";
import CardLineChart from "../../components/Cards/CardLineChart";
import { statisticDataSelector } from "../../redux/userRequests/selectors";
import { useEffect } from "react";

export default function Dashboard({ session }: { session: any }) {
  if (!session) return <></>;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatsAction());
  }, [statisticDataSelector, session?.user, dispatch]);


  return (
    <>
      <Head>
        <title>Strategy Kiln - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        {/*<div className="w-full xl:w-4/12 px-4">*/}
        {/*    <CardBarChart />*/}
        {/*</div>*/}
      </div>
    </>
  );
}
Dashboard.Layout = BackendLayout;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: `/auth/signin` },
    };
  }

  return {
    props: {
      session,
    },
  };
}