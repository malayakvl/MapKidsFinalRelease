import React, { useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { Formik } from "formik";
import { InputText, InputSwitcher } from "../_form";
import { useDispatch, useSelector } from "react-redux";
import { crudAction } from "../../redux/articles";
import { toastsSelector } from "../../redux/layouts/selectors";

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
  const toasts = useSelector(toastsSelector);
  const SubmitSchema = Yup.object().shape({
    title: Yup.string()
      .max(140, t("Must be less characters", { charNumber: 140 }))
      .required(t("Required field")),
  });
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  console.log(articleData);
  // useEffect(() => {
  //   // dispatch(setEmptyFormAction());
  //   // if (Object.keys(articleItemSelector).length > 0) {
  //   //   setDataFetched(true);
  //   // }
  // }, [dispatch, articleData]);

  return (
    <Formik
      enableReinitialize
      initialValues={articleData}
      validationSchema={SubmitSchema}
      onSubmit={(values) => {
        // dispatch(setIdentAction(false));
        // const formData = new FormData();
        dispatch(crudAction(values, values.id));
      }}
    >
      {(props) => {
        const { handleChange } = props;
        // @ts-ignore
        // @ts-ignore
        return (
          <form onSubmit={props.handleSubmit} className="mt-5">
            {toasts.length > 0 && (
              <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-[20px]">
                <div className="flex">
                  <div className="py-1">
                    <img
                      src="/images/alerts/info.svg"
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      alt="Success"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Item has been updated</p>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="mb-4 md:w-full hidden">
                <InputSwitcher
                  label={"status"}
                  name={"status"}
                  style={null}
                  props={props}
                  // onChange={onChangeConfigured}
                />
              </div>
              {/*<div className="mb-4">*/}
              {/*  /!* eslint-disable-next-line jsx-a11y/label-has-associated-control *!/*/}
              {/*  <label className="control-label">Country</label>*/}
              {/*  <div className="relative">*/}
              {/*    <em className="input-tips">Select one</em>*/}
              {/*    <Select*/}
              {/*      value={null}*/}
              {/*      onChange={() => console.log(123)}*/}
              {/*      options={options}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}
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
