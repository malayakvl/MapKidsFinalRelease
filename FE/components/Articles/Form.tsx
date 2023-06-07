import React, { Fragment, useCallback, useRef, useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Formik } from "formik";
import { InputText, InputTextarea } from "../_form";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
// import MySunEditor from "./Editor";

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
  // const editorOptions = {
  //   height: 400,
  //   buttonList: [
  //     ["undo", "redo"],
  //     ["removeFormat"],
  //     ["bold", "underline", "italic", "fontSize"],
  //     ["fontColor", "hiliteColor"],
  //     ["align", "horizontalRule", "list"],
  //     ["table", "link", "image", "imageGallery"],
  //     ["showBlocks", "codeView"],
  //     ["math"],
  //   ],
  //   katex: katex,
  //   imageRotation: false,
  //   fontSize: [12, 14, 16, 18, 20],
  //   colorList: [
  //     [
  //       "#828282",
  //       "#FF5400",
  //       "#676464",
  //       "#F1F2F4",
  //       "#FF9B00",
  //       "#F00",
  //       "#fa6e30",
  //       "#000",
  //       "rgba(255, 153, 0, 0.1)",
  //       "#FF6600",
  //       "#0099FF",
  //       "#74CC6D",
  //       "#FF9900",
  //       "#CCCCCC",
  //     ],
  //   ],
  //   imageUploadUrl: "http://localhost:8080/chazki-gateway/orders/upload",
  //   imageGalleryUrl: "http://localhost:8080/chazki-gateway/orders/gallery",
  // };
  const t = useTranslations();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    // if (editorRef?.current) {
    //   console.log(editorRef?.current?.editor);
    // }
  }, []);

  const SubmitSchema = Yup.object().shape({
    title: Yup.string()
      .max(140, t("Must be less characters", { charNumber: 140 }))
      .required(t("Required field")),
    // description: Yup.string().required(t('Required field')),
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
        // if (uploadedFiles.length) {
        //   uploadedFiles.forEach((file: any) => {
        //     formData.append("photos[]", file);
        //   });
        // }
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
