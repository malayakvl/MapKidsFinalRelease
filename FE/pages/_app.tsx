import "bootstrap/dist/css/bootstrap.css";
import "../styles/bootstrap/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/global.scss";
import { NextIntlProvider } from "next-intl";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
// import { Toasts, ConfirmationModal } from '../components/_common';

// import { Toasts } from '../components/_common';
import "react-toastify/dist/ReactToastify.css";
import store from "../app/store";

import MainLayout from "../components/Layout/MainLayout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// const ConnectedMap = connect(mapStateToProps)(MapboxMap);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || MainLayout;

  // const mapContainer = useRef<any>(null);

  return (
    <ReduxProvider store={store}>
      <SessionProvider session={pageProps.session}>
        <NextIntlProvider
          // To achieve consistent date, time and number formatting
          // across the app, you can define a set of global formats.
          formats={{
            dateTime: {
              short: {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            },
          }}
          messages={pageProps.messages}
          // Providing an explicit value for `now` ensures consistent formatting of
          // relative values regardless of the server or client environment.
          now={new Date(pageProps.now)}
          // Also an explicit time zone is helpful to ensure dates render the
          // same way on the client as on the server, which might be located
          // in a different time zone.
          timeZone="Europe/Vienna"
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Mapkids Application</title>
            <link rel="icon" href="globe.png" />
            <link
              href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
              rel="stylesheet"
            />
            {/*<link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />*/}
            {/*<script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js" />*/}
            {/*<link*/}
            {/*  rel="preconnect"*/}
            {/*  href="https://fonts.gstatic.com"*/}
            {/*  crossOrigin="anonymous"*/}
            {/*/>*/}
            {/*<link rel="preconnect" href="https://fonts.googleapis.com" />*/}
            {/*<link*/}
            {/*  href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap"*/}
            {/*  rel="stylesheet"*/}
            {/*/>*/}
          </Head>
          <Layout>
            {/*<Toasts />*/}
            <Component {...pageProps} />
          </Layout>
        </NextIntlProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}
