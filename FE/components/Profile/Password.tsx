import * as Yup from "yup";
import React, { useRef, useState } from "react";
import { InputText, TogglePassword } from "../_form";
import { Formik } from "formik";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction, updateProfileAction } from "../../redux/profile";
import { userSelector } from "../../redux/user/selectors";
import { changePasswordAction } from "../../redux/profile";
import {
  existEmailSelector,
  profileSelector,
} from "../../redux/profile/selectors";
import { setExistEmailAction } from "../../redux/profile/actions";

export default function Password() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const profileData = useSelector(profileSelector);
  const emailError = useSelector(existEmailSelector);

  const filePickerRef = useRef<HTMLInputElement>(null);
  const [imagePost, setImagePost] = useState<File>();
  const [isNewPhoto, setIsNewPhoto] = useState(false);

  useEffect(() => {
    if (user.email) {
      dispatch(fetchProfileAction());
    }
  }, [user?.email]);

  useEffect(() => {
    if (emailError) {
      console.log("Email Error Comes here");
    }
  }, [emailError]);

  // const addImageToPost = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (!filePickerRef.current?.files?.length) return;
  //   setImagePost(filePickerRef.current.files[0]);
  //   setIsNewPhoto(true);
  // };

  const SubmitSchema = Yup.object().shape({
    email: Yup.string()
      .trim("Cannot include leading and trailing spaces")
      .min(3, "Must be at least 3 characters")
      .email("Must be a valid email")
      .strict(true)
      .required("You must enter your email"),
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
    <Formik
      enableReinitialize
      initialValues={profileData}
      validationSchema={SubmitSchema}
      onSubmit={(values) => {
        dispatch(setExistEmailAction(null));
        dispatch(changePasswordAction(values));
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="mt-5 w-full">
          {emailError && <div className="error-block">{emailError}</div>}

          <div className="mb-3">
            <InputText
              icon={null}
              label={"Email"}
              name={"email"}
              placeholder={"Email Address"}
              style=""
              props={props}
              tips={null}
            />
          </div>

          <TogglePassword
            label={"Password"}
            icon={null}
            name={"password"}
            placeholder={"New Password"}
            style=""
            props={props}
          />

          <TogglePassword
            label={"Confirm Password"}
            icon={null}
            name={"password_confirmation"}
            placeholder={"Confirm Password"}
            style=""
            props={props}
          />
          <div className="mt-10 mb-7 block border border-gray-180 border-b-0" />
          <button type="submit" className="gray-medium-button">
            Save
          </button>
        </form>
      )}
    </Formik>
  );
}

export async function getServerSideProps(context: any) {
  const { req, locale } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        redirect: { destination: `/auth/signin` },
      },
    };
  }
}
