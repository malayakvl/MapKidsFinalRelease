import React, { useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Formik } from "formik";
import { InputText, InputSwitcher } from "../_form";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { crudAction } from "../../redux/articles";
import Map from "../Map";

const MySunEditor = dynamic(() => import("./Editor"), {
  ssr: false,
});

function CountryForm({ countryData }: { countryData: any }) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const SubmitSchema = Yup.object().shape({
    title: Yup.string()
      .max(140, t("Must be less characters", { charNumber: 140 }))
      .required(t("Required field")),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={countryData}
      validationSchema={SubmitSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        dispatch(crudAction(formData, values.id));
      }}
    >
      {(props) => {
        const { handleChange } = props;
        // @ts-ignore
        return (
          <div className="flex">
            <div className="w-2/3">
              <Map />
            </div>
            <div className="w-1/3">
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
                  <button
                    type="submit"
                    className="btn bg-purple-800 inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer text-white shadow-md mr-[10px]"
                  >
                    {props.values.id ? t("Update Article") : t("Add Article")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default CountryForm;
