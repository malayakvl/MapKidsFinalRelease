import React, { useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Formik } from "formik";
import { InputText } from "../_form";
import dynamic from "next/dynamic";

const MySunEditor = dynamic(() => import("./Editor"), {
  ssr: false,
});

function ArticleForm({
  locale,
  articleData,
  photos,
}: {
  locale: string;
  articleData: Articles.ItemData;
  photos: string[];
}) {
  const t = useTranslations();
  // const dispatch = useDispatch();
  // const [value, setValue] = useState("");

  useEffect(() => {
    // if (editorRef?.current) {
    //   console.log(editorRef?.current?.editor);
    // }
  }, []);

  const SubmitSchema = Yup.object().shape({
    title: Yup.string()
      .max(140, t("Must be less characters", { charNumber: 140 }))
      .required(t("Required field")),
  });
  useEffect(() => {
    console.log("here we are");
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={articleData}
      validationSchema={SubmitSchema}
      onSubmit={(values) => {
        // dispatch(setIdentAction(false));
        const formData = new FormData();
        // dispatch(updateProductAction(formData, values.id));
      }}
    >
      {(props) => {
        const { handleChange } = props;
        // @ts-ignore
        return (
          <form onSubmit={props.handleSubmit} className="mt-5">
            <div className="w-full">
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
            <button type="submit" className="gradient-btn">
              {props.values.id ? t("Update Article") : t("Add Article")}
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

export default ArticleForm;
