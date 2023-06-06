// import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import BackendLayout from "../../../components/Layout/BackendLayout";
import { TogglePassword } from "../../../components/_form";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordInvitationAction } from "../../../redux/profile";
import { isPasswordChangedSelector } from "../../../redux/profile/selectors";

export default function Password({
  hash,
  locale,
}: {
  hash: string;
  locale: string;
}) {
  // const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  // const { query } = router.query;
  const hashStr = hash ? hash : router.query.hash;
  // console.log("query params", router.query.hash);
  const isPasswordChanged = useSelector(isPasswordChangedSelector);

  useEffect(() => {
    if (isPasswordChanged) {
      Router.push(`/auth/signin`);
    }
  }, [isPasswordChanged, locale]);

  const SubmitSchema = Yup.object().shape({
    password: Yup.string()
      .strict(true)
      .trim("Cannot include leading and trailing spaces")
      .required("Required field")
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: Yup.string()
      .required("Required field")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <>
      <Head>
        <title>Mapkids - Restore Password</title>
      </Head>
      <div
        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={{
          backgroundImage: "url('/images/auth/75886.jpg')",
        }}
      ></div>
      <div className="flex justify-center">
        <div className="rounded-lg border shadow-xl mt-10 bg-white w-96 p-10 pb-16">
          <div className="flex">
            <div className="font-bold text-3xl line-height-105percent mb-2">
              Restore Password
            </div>
            <Image
              className=""
              width={64}
              height={64}
              src="/images/keys.svg"
              // layout="fixed"
              alt=""
            />
          </div>

          <div className="text-sm mb-10">Please, type new password</div>

          <Formik
            enableReinitialize
            initialValues={{}}
            validationSchema={SubmitSchema}
            onSubmit={(values) =>
              dispatch(changePasswordInvitationAction({ ...values, hashStr }))
            }
          >
            {(props) => (
              <form onSubmit={props.handleSubmit} className="mt-5 w-full">
                <TogglePassword
                  label={null}
                  icon={null}
                  name={"password"}
                  placeholder={"New Password"}
                  style=""
                  props={props}
                />

                <TogglePassword
                  label={null}
                  icon={null}
                  name={"password_confirmation"}
                  placeholder={"Confirm Password"}
                  style=""
                  props={props}
                />
                <div className="mt-10 mb-7 block border border-gray-180 border-b-0" />
                <button
                  type="submit"
                  className="mt-4 bg-blueGray-800 text-white active:bg-blueGray-600
                              text-sm font-bold uppercase px-6 py-3
                              rounded shadow hover:shadow-lg
                              outline-none focus:outline-none mr-1 mb-1
                              w-full ease-linear transition-all duration-150"
                >
                  Save
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

Password.Layout = BackendLayout;

export async function getServerSideProps(context: any) {
  const { req, locale, params } = context;
  console.log("hash:", req.params);
  const hash = req.__NEXT_INIT_QUERY ? req.__NEXT_INIT_QUERY.hash : null;

  return {
    props: {
      locale,
      hash,
    },
  };
}
