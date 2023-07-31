import React, { Fragment, useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Formik } from "formik";
import Range from "rc-slider";
import Select, { components } from "react-select";
import "rc-slider/assets/index.css";
import { InputSwitcher, InputColor, InputTextarea, InputText } from "../_form";
import { useDispatch, useSelector } from "react-redux";
import {
  crudAction,
  initMapAction,
  reloadMapAction,
  setOpacityAction,
  updateMarkerListAction,
  setMainMarkerAction,
} from "../../redux/countries";
import ImageList from "./ImagesList";
import VideoList from "./VideosList";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export const baseApiUrl = publicRuntimeConfig.apiUrl;

import {
  countryItemSelector,
  layerFillSelector,
  layerOpacitySelector,
  countryMarkersSelector,
  countryMapSelector,
} from "../../redux/countries/selectors";
import {
  checkedImageIdsSelector,
  checkedVideoIdsSelector,
} from "../../redux/countries/selectors";
import MapForm from "../MapForm";
import {
  fetchItemMarkerAction,
  fetchItemDataMarkerAction,
  updateImageIdsAction,
  updateTitleAction,
  updateVideoIdsAction,
  updateIconAction,
} from "../../redux/coordinates";
import {
  imageCheckedIdsSelector,
  markersDataSelector,
  markersSelector,
  videoCheckedIdsSelector,
  countryItemBackSelector,
  mainTitleIdSelector,
} from "../../redux/coordinates/selectors";
import {
  updateColorAction,
  updateOpacityAction,
  removeMarkerAction,
} from "../../redux/countries/actions";
import { dropdownIconItemsSelector } from "../../redux/icons/selectors";
import { fetchDropdownItemsAction } from "../../redux/icons";
// import { fetchItemDataMarkerAction } from "../../redux/coordinates/actions";

function CountryForm({ countryData }: { countryData: any }) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("description");
  const SubmitSchema = Yup.object().shape({});
  const countrySelectorData = useSelector(countryItemSelector);
  const checkedImageIds = useSelector(checkedImageIdsSelector);
  const checkedVideoIds = useSelector(checkedVideoIdsSelector);
  const [opacityRange, setOpacityRange] = useState<any[]>([0, 100]);
  const [displayTabs, setDisplayTabs] = useState(false);
  const markerData = useSelector(countryItemBackSelector);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainMarker, setMainMarker] = useState(false);
  const [markerId, setMarkerId] = useState(null);
  const [markerImages, setMarkerImages] = useState([]);
  const iconsData = useSelector(dropdownIconItemsSelector);
  const [countries, setCountries] = useState<any[]>([]);

  const Option = (props: any) => (
    <components.Option {...props} className="inline-block">
      <div className="inline-block">
        <img
          src={props.data.icon}
          alt="logo"
          className="country-logo float-left"
        />
        {props.data.label}
      </div>
    </components.Option>
  );

  // NEW WORKED SELECTORS
  const newImageIds = useSelector(imageCheckedIdsSelector);
  const newVideoIds = useSelector(videoCheckedIdsSelector);
  const countryMap = useSelector(countryMapSelector);
  const markersCountry = useSelector(markersSelector);
  const titleImageId = useSelector(mainTitleIdSelector);

  const layerColor = useSelector(layerFillSelector);
  const layerOpacity = useSelector(layerOpacitySelector);
  const markersList = useSelector(countryMarkersSelector);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedIcon, setSelectedIcon] = useState(countries[0]);

  const onSliderOpacityChange = (_value: any) => {
    setOpacityRange(_value);
    dispatch(setOpacityAction(_value ? 100 - _value : 100 / 100));
    dispatch(
      updateOpacityAction(
        _value ? 100 - _value : 100 / 100,
        countrySelectorData?.id
      )
    );
  };

  const changeOpacityDone = () => {
    // console.log("opacityDone", opacityRange);
  };

  const onSliderAfterChange = () => {
    changeOpacityDone();
  };

  useEffect(() => {
    if (iconsData) {
      const iconsDropIcons: any[] = [];
      iconsData.forEach((icon: any) => {
        iconsDropIcons.push({
          value: icon.id,
          label: `Icon ${icon.id}`,
          icon: `${baseApiUrl}/uploads/photos/${icon.name}`,
        });
      });
      setCountries(iconsDropIcons);
    }
  }, [iconsData]);

  useEffect(() => {
    if (countrySelectorData) {
      dispatch(updateMarkerListAction(countrySelectorData.markers));
      dispatch(fetchDropdownItemsAction());
      onSliderOpacityChange(countrySelectorData.fill_opacity);
    }
  }, [countrySelectorData]);

  useEffect(() => {
    if (markerData?.id) {
      setDisplayTabs(true);
      // console.log("DISPLAY");
      dispatch(updateTitleAction(markerData.title));
      dispatch(updateImageIdsAction(markerData.images));
      dispatch(updateVideoIdsAction(markerData.videos));
    }
  }, [markerData]);

  useEffect(() => {
    if (layerColor) {
      dispatch(updateColorAction(layerColor));
    }
  }, [layerColor]);

  const showTabs = () => {
    setDisplayTabs(true);
  };

  const editMarkerAction = (id: number) => {
    dispatch(fetchItemDataMarkerAction(id));
    // setDisplayTabs(true);
    // @ts-ignore
    setMarkerId(id);
  };

  const deleteMarkerAction = (id: number) => {
    dispatch(reloadMapAction(false));
    dispatch(removeMarkerAction(id, countrySelectorData?.id, countryMap));
    dispatch(initMapAction(null));
    dispatch(reloadMapAction(false));
  };

  // const rebuildMarkersTableAction = () => {};

  const updateLocation = () => {
    const dataForUpdate = {
      locationTitle: title,
      description: description,
      locationIcon: selectedIcon,
    };
  };

  // @ts-ignore
  const SingleValue = ({ children, ...props }) => (
    // @ts-ignore
    <components.SingleValue {...props}>
      <div className="inline-block">
        <img src={selectedIcon.icon} alt="s-logo" className="selected-logo" />
        {children}
      </div>
    </components.SingleValue>
  );

  const handleChangeIcon = (value: any) => {
    setSelectedIcon(value);
    dispatch(updateIconAction(value.icon));
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
              newImages: JSON.stringify(newImageIds),
              newVideos: JSON.stringify(newVideoIds),
              fillColor: layerColor,
              fillOpacity: layerOpacity,
              title: values["title"],
              description: values["description"],
              id: countryData.id,
              locationId: markerId,
              icon: selectedIcon,
              titleImageId: titleImageId,
            };
            dispatch(crudAction(formData, values.id));
            setDisplayTabs(false);
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
                        defaultValue={[0, 45]}
                        onChange={onSliderOpacityChange}
                        onAfterChange={onSliderAfterChange}
                        value={opacityRange}
                      />
                    </div>
                    <div className="mb-4 md:w-1/3">
                      <InputColor
                        defaultColor={
                          layerColor
                            ? layerColor
                            : countrySelectorData.fill_color
                        }
                        style={`mb-4`}
                        icon={null}
                        name={"strengths_color"}
                        label={"Fill Layer Color"}
                        placeholder={null}
                        tips={null}
                      />
                    </div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="control-label">Markers List</label>
                    <table className="full-content" id="markersTable">
                      {markersList?.map((item: any) => (
                        <Fragment key={item.id}>
                          <tr className="border">
                            <td className="border-blueGray-100 p-1">
                              {item.title}
                            </td>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                            <td
                              className="p-1 text-blue-400 cursor-pointer text-right"
                              onClick={() => editMarkerAction(item.id)}
                            >
                              {item.is_main ? (
                                "Main"
                              ) : (
                                <>
                                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      dispatch(setMainMarkerAction(item.id));
                                      // dispatch(
                                      //   fetchItemAction(countrySelectorData.id)
                                      // );
                                    }}
                                  >
                                    Set Main
                                  </a>
                                </>
                              )}
                            </td>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                            <td
                              className="p-1 text-blue-400 cursor-pointer text-right"
                              onClick={() => editMarkerAction(item.id)}
                            >
                              Edit
                            </td>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                            <td
                              className="p-1 text-blue-400 cursor-pointer text-right"
                              onClick={() => deleteMarkerAction(item.id)}
                            >
                              Delete
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </table>
                    <div></div>
                    <div className="clearfix" />
                    {markerData && (
                      <>
                        <div className={`w-full mt-10 `}>
                          <nav aria-label="Tabs" className="mt-10">
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
                              <>
                                <div className="mb-4 md:w-full">
                                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                  <label className="control-label">
                                    Main Marker
                                  </label>
                                  <InputSwitcher
                                    label={"Active"}
                                    name={"is_main"}
                                    style={null}
                                    props={props}
                                    extValue={(markerData as any).is_main}
                                    onChange={(event) => {
                                      setMainMarker(event.target.checked);
                                    }}
                                  />
                                </div>
                                <div className="mb-4 md:w-full">
                                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                  <label className="control-label">
                                    Marker Icon
                                  </label>
                                  <Select
                                    value={selectedIcon}
                                    options={countries}
                                    onChange={handleChangeIcon}
                                    styles={{
                                      singleValue: (base) => ({
                                        ...base,
                                        display: "float-left",
                                        alignItems: "center",
                                      }),
                                    }}
                                    components={{
                                      Option,
                                      SingleValue,
                                    }}
                                  />
                                </div>
                                <InputText
                                  icon={null}
                                  label={"Title"}
                                  name={"title"}
                                  placeholder={"Title"}
                                  style={"mb-5"}
                                  props={props}
                                  extValue={markerData?.title}
                                  tips={null}
                                  onChange={(event) => {
                                    event.target.value =
                                      event.target.value.trimStart();
                                    setTitle(event.target.value.trimStart());
                                    dispatch(
                                      updateTitleAction(
                                        event.target.value.trimStart()
                                      )
                                    );
                                    props.handleChange(event);
                                  }}
                                />
                                <InputTextarea
                                  icon={null}
                                  style={""}
                                  label={""}
                                  name={`description`}
                                  placeholder={t("Add Description Here")}
                                  props={props}
                                  tips={t("Add Description Here")}
                                  maxLength={10000}
                                  extValue={markerData?.description}
                                />
                              </>
                            )}
                            {activeTab === "images" && (
                              <>
                                <div
                                  className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                                  role="alert"
                                >
                                  <div className="flex">
                                    <div className="py-1">
                                      <svg
                                        className="fill-current h-6 w-6 text-teal-500 mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="font-bold">Please note</p>
                                      <p className="text-sm">
                                        Please note that for the correct display
                                        the Title image in the Pop-up window,
                                        you you should use Vertical images
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <ImageList markerData={markerData} />
                              </>
                            )}
                            {activeTab === "videos" && (
                              <VideoList markerData={markerData} />
                            )}
                          </div>
                          <button
                            type="submit"
                            onClick={() => updateLocation()}
                            className="btn bg-purple-800 inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer text-white shadow-md mr-[10px]"
                          >
                            {t("Update Location")}
                          </button>
                        </div>
                      </>
                    )}
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
