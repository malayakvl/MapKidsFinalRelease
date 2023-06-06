import { NextPage } from "next";
import type { ReactElement } from "react";
import MainLayout from "../components/Layout/MainLayout";
import BackendLayout from "../components/Layout/BackendLayout";

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };
export type PageWithAdminLayoutType = NextPage & {
  layout: typeof BackendLayout;
};

export type PageWithLayoutType =
  | PageWithMainLayoutType
  | PageWithAdminLayoutType;

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

export default PageWithLayoutType;
