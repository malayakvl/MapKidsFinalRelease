import React, { useEffect } from "react";
import { markersDataSelector } from "../../redux/coordinates/selectors";
import { useSelector, useDispatch } from "react-redux";
import { baseApiUrl } from "../../constants";
import {
  initFrameTypeAction,
  setFrameTypeAction,
  setImgIndexAction,
  setMarkerIdAction,
  setVideoIndexAction,
  showImageGalleryAction,
  showPhoneAction,
  showVideoGalleryAction,
} from "../../redux/layouts";
import { mapMainSelector } from "../../redux/layouts/selectors";
import { ur } from "suneditor/src/lang";
// import {fetchItemsMarkersAction} from "../../redux/coordinates";

function Phone({ showBlock }: { showBlock: boolean | null }) {
  const coordinatesInfo = useSelector(markersDataSelector);
  const dispatch = useDispatch();
  const mapMain = useSelector(mapMainSelector);

  useEffect(() => {
    if (coordinatesInfo) {
      const descrDiv = document.getElementById("country-text-val");
      (descrDiv as any).scrollTop = 0;
      if (coordinatesInfo?.id) {
        dispatch(
          initFrameTypeAction(
            coordinatesInfo.imgWidth > coordinatesInfo.imgHeight
              ? "horizontalTypeFrame"
              : "verticalTypeFrame"
          )
        );
        dispatch(
          setFrameTypeAction(
            coordinatesInfo.imgWidth > coordinatesInfo.imgHeight
              ? "horizontalTypeFrame"
              : "verticalTypeFrame"
          )
        );
      }
      mapMain.flyTo({
        center: [coordinatesInfo.lng, coordinatesInfo.lat],
        speed: 0.5,
        zoom: 5,
      });
    }
  }, [coordinatesInfo]);

  return (
    <div
      className={`phone-content ${showBlock ? "phone-content-displayed" : ""}`}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="close-phone cursor-pointer"
        onClick={() => {
          dispatch(showPhoneAction(false));
          dispatch(setMarkerIdAction(null));
        }}
      ></div>
      {coordinatesInfo && (
        <>
          <div className="phone-map-block">
            <div className="phone-head-green">
              <div className="title-head">{coordinatesInfo.title}</div>
            </div>
            <div className="phone-descr">
              <div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                  className="photo-frame cursor-pointer"
                  onClick={() => {
                    dispatch(setImgIndexAction(0));
                    dispatch(showImageGalleryAction(true));
                  }}
                >
                  <div className="relative">
                    <div className="photo-content">
                      <div className="new-gotic">
                        <div className="gotic-frame-gallery-top" />
                        <div className="gotic-frame-gallery-left" />
                        <div className="gotic-frame-gallery-right" />
                        <div className="gotic-frame-gallery-bottom" />
                        <div
                          className="img-content"
                          style={{
                            backgroundImage: `url(${
                              /(http(s?)):\/\//i.test(coordinatesInfo.mainImage)
                                ? coordinatesInfo.mainImage
                                : `${baseApiUrl}/uploads/photos/${coordinatesInfo.mainImage}`
                            })`,
                          }}
                        ></div>
                      </div>
                      {/*<div className="gotic-frame phone-frame"></div>*/}
                      {/*<div id="octagon"></div>*/}
                      {/*<div*/}
                      {/*  className="main-phone-image"*/}
                      {/*  style={{*/}
                      {/*    backgroundImage: `url(${*/}
                      {/*      /(http(s?)):\/\//i.test(coordinatesInfo.mainImage)*/}
                      {/*        ? coordinatesInfo.mainImage*/}
                      {/*        : `${baseApiUrl}/uploads/photos/${coordinatesInfo.mainImage}`*/}
                      {/*    })`,*/}
                      {/*  }}*/}
                      {/*/>*/}

                      {/*<img*/}
                      {/*    src={*/}
                      {/*      /(http(s?)):\/\//i.test(coordinatesInfo.mainImage)*/}
                      {/*          ? coordinatesInfo.mainImage*/}
                      {/*          : `${baseApiUrl}/uploads/photos/${coordinatesInfo.mainImage}`*/}
                      {/*    }*/}
                      {/*    alt=""*/}
                      {/*    className="gray-border-frame"*/}
                      {/*/>*/}
                    </div>
                    {/*<img src={imgSlide} alt="" className="gray-border-frame" />*/}
                  </div>
                  <div className="clearfix" />
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <span
                    className={`view-gallery cursor-pointer`}
                    onClick={() => {
                      dispatch(setVideoIndexAction(0));
                      showImageGalleryAction(true);
                    }}
                  >
                    View Gallery
                  </span>
                </div>
              </div>
              <div className="clearfix" />
              <div
                className="country-text"
                id="country-text-val"
                dangerouslySetInnerHTML={{
                  __html: coordinatesInfo.description,
                }}
              />
              <div className="clearfix" />
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div
                className={`play-video cursor-pointer ${
                  coordinatesInfo.videos.length > 0 ? "" : "hide"
                }`}
                onClick={() => dispatch(showVideoGalleryAction(true))}
              ></div>
              <div className="video-frame hidden">
                <div
                  className="country-text"
                  dangerouslySetInnerHTML={{
                    __html: coordinatesInfo?.videoCode,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Phone;
