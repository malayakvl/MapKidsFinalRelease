import * as Yup from "yup";
import { InputText, InputPassword } from "../../components/_form";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import BackendLayout from "../../components/Layout/BackendLayout";
import { Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import "../../styles/global-backend.scss";
import { useEffect } from "react";

function Signin() {
  const { query } = useRouter();

  const SubmitSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Required field"),
    password: Yup.string().required("Required field"),
  });

  useEffect(() => {
    console.log("error login", query);
  }, [query]);

  return (
    <div className="relative w-full h-full py-40 min-h-screen">
      <Head>
        <title>Above and Beyond Children’s Museum” - Backend Area</title>
      </Head>
      <div
        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={{
          backgroundImage: "url('/images/auth/75886.jpg')",
        }}
      ></div>

      <div className="flex justify-center">
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                <div
                  className="flex-auto px-4 lg:px-10 pt-10 py-5"
                  style={{ background: "#f5f5f5", borderRadius: "10px" }}
                >
                  <div className="text-center mb-4">
                    <Image
                      src="/images/backend/kids.jpeg"
                      alt="Map Kids"
                      style={{ height: "100px", margin: "0px auto" }}
                      width={100}
                      height={100}
                    />
                    <b>Above and Beyond Children’s Museum”</b>
                  </div>
                  {query.authError && (
                    <div className="error-el" style={{ right: "40px" }}>
                      <span className="text-sm">{query.authError}</span>
                    </div>
                  )}
                  <Formik
                    enableReinitialize
                    initialValues={{ email: "1@1.com", password: "123" }}
                    validationSchema={SubmitSchema}
                    onSubmit={(values) => {
                      signIn("credentials_login", {
                        email: (values as any).email,
                        password: (values as any).password,
                        callbackUrl: `/countries`,
                      });
                    }}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit} className="mb-4 ">
                        <div className="relative w-full mb-5 input-email">
                          <label
                            className="block uppercase text-blueGray-600
                                       font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <InputText
                            style={"input-email"}
                            icon={"f-email"}
                            label={null}
                            name={"email"}
                            placeholder={"Email"}
                            props={props}
                            tips={null}
                            onChange={(event) => {
                              event.target.value = event.target.value.trim();
                              props.handleChange(event);
                            }}
                          />
                        </div>
                        <div className="relative w-full mb-4 input-email">
                          <label
                            className="block uppercase text-blueGray-600
                                font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <InputPassword
                            style={null}
                            icon={"f-password"}
                            label={null}
                            name={"password"}
                            placeholder={"Password"}
                            props={props}
                          />
                        </div>
                        <div className="mb-6 mt-6">
                          <button
                            type="submit"
                            className="bg-blueGray-800 text-white active:bg-blueGray-600
                                text-sm font-bold uppercase px-6 py-3
                                rounded shadow hover:shadow-lg
                                outline-none focus:outline-none mr-1 mb-1
                                w-full ease-linear transition-all duration-150"
                          >
                            Sign In
                          </button>
                        </div>
                        <div>
                          <Link href={"/auth/restore"} legacyBehavior>
                            <a className="ml-auto text-sm text-orange-450">
                              Forgot password?
                            </a>
                          </Link>
                        </div>
                      </form>
                    )}
                  </Formik>
                  <form>
                    {/*<div className="relative w-full mb-3">*/}
                    {/*    <label*/}
                    {/*        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                    {/*        htmlFor="grid-password"*/}
                    {/*    >*/}
                    {/*        Password*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        type="password"*/}
                    {/*        className="border-1 px-3 py-3 border-blueGray-200 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                    {/*        placeholder="Password"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="text-center mt-6">*/}
                    {/*    <button*/}
                    {/*        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"*/}
                    {/*        type="button"*/}
                    {/*    >*/}
                    {/*        Sign In*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*<div className="mt-10 rounded-lg bg-white w-96 p-10 pb-24">*/}
        {/*    <div className="mb-2 font-sm">Welcome back!</div>*/}
        {/*    <div className="mb-8 font-bold text-3xl line-height-105percent">*/}
        {/*        Please sign into backend area*/}
        {/*    </div>*/}

        {/*    {query.message && (*/}
        {/*        <div className="error-el mb-4">*/}
        {/*            <span className="text-sm">{query.message}</span>*/}
        {/*        </div>*/}
        {/*    )}*/}
        {/*    <Formik*/}
        {/*        enableReinitialize*/}
        {/*        initialValues={{}}*/}
        {/*        validationSchema={SubmitSchema}*/}
        {/*        onSubmit={(values) => {*/}
        {/*            signIn('credentials_login', {*/}
        {/*                email: (values as any).email,*/}
        {/*                password: (values as any).password,*/}
        {/*                callbackUrl: `${window.location.origin}/dashboard`*/}
        {/*            });*/}
        {/*        }}>*/}
        {/*        {(props) => (*/}
        {/*            <form onSubmit={props.handleSubmit} className="mb-4">*/}
        {/*                <InputText*/}
        {/*                    style={null}*/}
        {/*                    icon={'f-email'}*/}
        {/*                    label={null}*/}
        {/*                    name={'email'}*/}
        {/*                    placeholder={'Email'}*/}
        {/*                    props={props}*/}
        {/*                    tips={null}*/}
        {/*                    onChange={(event) => {*/}
        {/*                        event.target.value = event.target.value.trim();*/}
        {/*                        props.handleChange(event);*/}
        {/*                    }}*/}
        {/*                />*/}

        {/*                <InputPassword*/}
        {/*                    style={null}*/}
        {/*                    icon={'f-password'}*/}
        {/*                    label={null}*/}
        {/*                    name={'password'}*/}
        {/*                    placeholder={'Password'}*/}
        {/*                    props={props}*/}
        {/*                />*/}

        {/*                <div className="mb-6">*/}
        {/*                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">*/}
        {/*                        Login*/}
        {/*                    </button>*/}
        {/*                </div>*/}
        {/*            </form>*/}
        {/*        )}*/}
        {/*    </Formik>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
Signin.Layout = BackendLayout;

export default Signin;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: { destination: `/dashboard` },
    };
  }

  return {
    props: {
      session,
    },
  };
}
