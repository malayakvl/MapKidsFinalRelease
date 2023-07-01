import React, { useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Formik } from "formik";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { InputSwitcher, InputColor, InputTextarea } from "../_form";
// import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  crudAction,
  setOpacityAction,
  fetchMarkersAction,
} from "../../redux/countries";
import ImageList from "./ImagesList";
import {
  checkedImageIdsSelector,
  checkedVideoIdsSelector,
  countryItemSelector,
  layerFillSelector,
  layerOpacitySelector,
} from "../../redux/countries/selectors";
import MapForm from "../MapForm";
import VideoList from "./VideosList";

function CountryForm({ countryData }: { countryData: any }) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("description");
  const SubmitSchema = Yup.object().shape({});
  const countrySelectorData = useSelector(countryItemSelector);
  const checkedImageIds = useSelector(checkedImageIdsSelector);
  const checkedVideoIds = useSelector(checkedVideoIdsSelector);
  const [opacityRange, setOpacityRange] = useState<any[]>([0, 100]);

  const layerColor = useSelector(layerFillSelector);
  const layerOpacity = useSelector(layerOpacitySelector);
  // const countryMap = useSelector(countryMapSelector);

  // console.log("Country Data:", countrySelectorData);
  const onSliderOpacityChange = (_value: any) => {
    setOpacityRange(_value);
    dispatch(setOpacityAction(_value ? 100 - _value : 100 / 100));
  };

  const changeOpacityDone = () => {
    // console.log("opacityDone", opacityRange);
  };

  const onSliderAfterChange = () => {
    changeOpacityDone();
  };

  return (
    <>
      {countrySelectorData && (
        <Formik
          enableReinitialize
          initialValues={countrySelectorData}
          validationSchema={SubmitSchema}
          onSubmit={(values) => {
            const formData = {
              images: JSON.stringify(checkedImageIds),
              videos: JSON.stringify(checkedVideoIds),
              fillColor: layerColor,
              fillOpacity: layerOpacity,
              description: values["description"],
              id: countryData.id,
            };
            dispatch(crudAction(formData, values.id));
          }}
        >
          {(props) => {
            const { handleChange } = props;
            // @ts-ignore
            return (
              <div className="flex mt-[30px] relative z-50">
                <div className="w-1/3">
                  <MapForm isLoad={false} />
                </div>
                <div className="w-2/3 ml-[30px]">
                  <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-2xl">
                    {countrySelectorData?.flag}
                    <span className="ml-[10px] text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-sky-400">
                      {countrySelectorData?.name}
                    </span>
                  </h1>
                  <form onSubmit={props.handleSubmit} className="mt-5">
                    <div className="mb-4 md:w-full">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="control-label">Active Country</label>
                      <InputSwitcher
                        label={"Active"}
                        name={"active"}
                        style={null}
                        props={props}
                        // onChange={onChangeConfigured}
                      />
                    </div>
                    <div className="mb-4 md:w-1/2">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="control-label">Opacity</label>
                      <Range
                        allowCross={false}
                        step={1}
                        min={0}
                        max={100}
                        onChange={onSliderOpacityChange}
                        onAfterChange={onSliderAfterChange}
                        value={opacityRange}
                      />
                    </div>
                    <div className="mb-4 md:w-1/3">
                      <InputColor
                        defaultColor={`#ED5829`}
                        style={`mb-4`}
                        icon={null}
                        name={"strengths_color"}
                        label={"Fill Layer Color"}
                        placeholder={null}
                        tips={null}
                      />
                    </div>
                    <div className="clearfix" />
                    <div className="w-full mt-10">
                      <nav aria-label="Tabs">
                        <ul className="flex border-b border-gray-200 text-center">
                          <li className="flex-1">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                              onClick={() => setActiveTab("description")}
                              className={`tab ${
                                activeTab == "description" ? "active" : ""
                              }`}
                              href="javascript:;"
                            >
                              Description
                            </a>
                          </li>
                          <li className="flex-1">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                              onClick={() => setActiveTab("images")}
                              className={`tab ${
                                activeTab == "images" ? "active" : ""
                              }`}
                              href="javascript:;"
                            >
                              <span className="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
                              Images
                            </a>
                          </li>
                          <li className="flex-1">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                              onClick={() => setActiveTab("videos")}
                              className={`tab ${
                                activeTab == "videos" ? "active" : ""
                              }`}
                              href="javascript:;"
                            >
                              Videos
                            </a>
                          </li>
                        </ul>
                      </nav>
                      <div className="tab-content pt-[20px] mb-[20px] bg-white border-gray-200 border border-t-0 p-[20px]">
                        {activeTab === "description" && (
                          <InputTextarea
                            icon={null}
                            style={""}
                            label={""}
                            name={`description`}
                            placeholder={t("Add Description Here")}
                            props={props}
                            tips={t("Add Description Here")}
                            maxLength={1000}
                          />
                        )}
                        {activeTab === "images" && <ImageList />}
                        {activeTab === "videos" && <VideoList />}
                      </div>
                      <button
                        type="submit"
                        className="btn bg-purple-800 inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer text-white shadow-md mr-[10px]"
                      >
                        {t("Update Country")}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="clear-both" />
              </div>
            );
          }}
        </Formik>
      )}
    </>
  );
}

export default CountryForm;
