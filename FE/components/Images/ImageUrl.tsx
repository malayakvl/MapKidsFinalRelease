import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { InputText } from "../_form";
import { Formik } from "formik";
import {
  changePasswordAction,
  setExistEmailAction,
} from "../../redux/profile/actions";

const ImageUrl: React.FC<any> = () => {
  const dispatch = useDispatch();
  const SubmitSchema = Yup.object().shape({
    imageUrl: Yup.string()
      .trim("Cannot include leading and trailing spaces")
      .min(3, "Must be at least 3 characters")
      .strict(true)
      .required("You must enter image url"),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name: "" }}
        validationSchema={SubmitSchema}
        onSubmit={(values) => {
          dispatch(setExistEmailAction(null));
          dispatch(changePasswordAction(values));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="mt-5 w-full">
            <div className="mb-3">
              <InputText
                icon={null}
                label={"Image URL"}
                name={"name"}
                placeholder={"Image URL"}
                style=""
                props={props}
                tips={null}
              />
            </div>
            <div className="mt-10 mb-7 block border border-gray-180 border-b-0" />
            <button type="submit" className="btn bg-purple-900 text-white">
              Save
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ImageUrl;
