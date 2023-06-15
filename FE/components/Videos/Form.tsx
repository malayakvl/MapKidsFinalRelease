import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { InputTextarea } from "../_form";
import { Formik } from "formik";
import { submitFormAction } from "../../redux/videos";

const VideoForm: React.FC<any> = () => {
  const dispatch = useDispatch();
  const SubmitSchema = Yup.object().shape({
    // imageUrl: Yup.string()
    //   .trim("Cannot include leading and trailing spaces")
    //   .min(3, "Must be at least 3 characters")
    //   .strict(true)
    //   .required("You must enter image url"),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ url: "", code: "" }}
        validationSchema={SubmitSchema}
        onSubmit={(values) => {
          dispatch(submitFormAction(values));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="mt-5 w-full">
            {/*<div className="mb-3">*/}
            {/*  <InputText*/}
            {/*    icon={null}*/}
            {/*    label={"Video Url"}*/}
            {/*    name={"url"}*/}
            {/*    placeholder={"Video Name"}*/}
            {/*    style=""*/}
            {/*    props={props}*/}
            {/*    tips={null}*/}
            {/*  />*/}
            {/*</div>*/}
            <div className="mb-3">
              <InputTextarea
                icon={null}
                label={"Embed Code"}
                name={"code"}
                maxLength={2000}
                placeholder={"Embed Video Code"}
                style=""
                props={props}
                tips={null}
                rows={10}
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

export default VideoForm;
