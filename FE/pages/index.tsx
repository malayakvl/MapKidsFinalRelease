import Head from "next/head";
import { getSession } from "next-auth/react";
import MainLayout from "../components/Layout/MainLayout";
import Main from "../components/main/index";

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>MapKids</title>
        <meta name="description" content="Mapkids portal" />
      </Head>

      <div>
        <Main />
      </div>
    </div>
  );
}
Home.Layout = MainLayout;

export async function getServerSideProps(context: any) {
  const { req, locale } = context;
  const session = await getSession({ req });
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
