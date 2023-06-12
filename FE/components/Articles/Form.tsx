import React, { useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Formik } from "formik";
import { InputText, InputSwitcher } from "../_form";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { crudAction } from "../../redux/articles";

const MySunEditor = dynamic(() => import("./Editor"), {
  ssr: false,
});

function ArticleForm({
  articleData,
  photos,
}: {
  articleData: Articles.ItemData;
  photos: string[];
}) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const SubmitSchema = Yup.object().shape({
    title: Yup.string()
      .max(140, t("Must be less characters", { charNumber: 140 }))
      .required(t("Required field")),
  });
  // useEffect(() => {
  //   console.log("here we are");
  // }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={articleData}
      validationSchema={SubmitSchema}
      onSubmit={(values) => {
        // dispatch(setIdentAction(false));
        const formData = new FormData();
        console.log(values);
        dispatch(crudAction(formData, values.id));
      }}
    >
      {(props) => {
        const { handleChange } = props;
        // @ts-ignore
        return (
          <form onSubmit={props.handleSubmit} className="mt-5">
            <div className="w-full">
              <div className="mb-4 md:w-full">
                <InputSwitcher
                  label={"status"}
                  name={"status"}
                  style={null}
                  props={props}
                  // onChange={onChangeConfigured}
                />
              </div>
              <div className="mb-4 md:w-full">
                <InputText
                  icon={null}
                  label={"Title"}
                  name={"title"}
                  placeholder={"Title"}
                  style={null}
                  props={props}
                  tips={t("count_characters", { charNumber: 140 })}
                  onChange={(event) => {
                    event.target.value = event.target.value.trimStart();
                    props.handleChange(event);
                  }}
                />
              </div>
              <div className="mb-4 editor-content">
                <MySunEditor />
              </div>
            </div>
            <button
              type="submit"
              className="btn bg-purple-800 inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer text-white shadow-md mr-[10px]"
            >
              {props.values.id ? t("Update Article") : t("Add Article")}
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

export default ArticleForm;
