import Head from "next/head";
import React from "react";
import BackendLayout from "../../components/Layout/BackendLayout";

export default function Locations() {
  return (
    <>
      <Head>
        <title>Mapkids - Locations</title>
      </Head>
      <>
        <h1 className="mt-10 text-lg font-medium intro-y">
          Available Locations
        </h1>
      </>
    </>
  );
}

Locations.Layout = BackendLayout;

export async function getServerSideProps() {
  const locale = "en";

  return {
    props: {
      locale,
    },
  };
}
