import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  restorePasswordAction,
  setValidEmailStatusAction,
} from "../../redux/profile";
import { InputText } from "../../components/_form";
import { useDispatch, useSelector } from "react-redux";
import { validEmailSelector } from "../../redux/profile/selectors";
import { useEffect } from "react";
import BackendLayout from "../../components/Layout/BackendLayout";
import Head from "next/head";
import Image from "next/image";
import {
  setSuccessToastAction,
  setErrorToastAction,
} from "../../redux/layouts";

function Restore({ locale }: { locale: string }) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const validEmail = useSelector(validEmailSelector);

  useEffect(() => {
    if (validEmail === "yes") {
      dispatch(setSuccessToastAction(t(`Check your email`)));
      // alertService.success(t(`Check your email`), { keepAfterRouteChange: true });
    } else if (validEmail && validEmail !== "yes") {
      dispatch(setErrorToastAction(t(`No registered email`)));
      // alertService.error(t(`No registered email`), { keepAfterRouteChange: true });
    }
    dispatch(setValidEmailStatusAction(null));
  }, [dispatch, locale, validEmail, t]);

  const SubmitSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Must be a valid email"))
      .required(t("Required field")),
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
      <div className="flex justify-center bg-white z-50">
        <div className="rounded-lg border shadow-xl mt-10 bg-white w-96 p-10 pb-16 z-50">
          <div className="flex">
            <div className="font-bold text-3xl line-height-105percent mb-2">
              Forgot your Password?
            </div>
            <Image
              className=""
              width={64}
              height={64}
              src="/images/keys.svg"
              alt=""
            />
          </div>

          <div className="text-sm mb-10">
            No problem! just write your associated email and we will send you a
            recovery link.
          </div>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={SubmitSchema}
            onSubmit={(values) => {
              console.log("Restore password");
              dispatch(restorePasswordAction(values, locale));
            }}
          >
            {(props) =>
              validEmail === "yes" ? (
                <div className="mb-4 font-bold text-2xl line-height-105percent w-72 text-green-500">
                  We send you recovery link, please check your mailbox
                </div>
              ) : (
                <form onSubmit={props.handleSubmit}>
                  <InputText
                    style={null}
                    icon={null}
                    label={null}
                    name={"email"}
                    placeholder={"Email"}
                    props={props}
                    tips={null}
                  />

                  <button
                    type="submit"
                    disabled={props.isSubmitting}
                    className="mt-4 bg-blueGray-800 text-white active:bg-blueGray-600
                              text-sm font-bold uppercase px-6 py-3
                              rounded shadow hover:shadow-lg
                              outline-none focus:outline-none mr-1 mb-1
                              w-full ease-linear transition-all duration-150"
                  >
                    Send me a Recovery Link
                  </button>
                </form>
              )
            }
          </Formik>
        </div>
      </div>
    </>
  );
}
Restore.Layout = BackendLayout;

export default Restore;

export async function getServerSideProps(context: any) {
  const { req, locale } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: { destination: `/${locale === "fr" ? "" : locale}` },
    };
  }
  return {
    props: {
      locale,
      // messages: {
      //     ...require(`../../messages/${locale}.json`)
      // }
    },
  };
}
