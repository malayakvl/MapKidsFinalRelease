import React, { useEffect } from "react";
import { markersDataSelector } from "../../redux/coordinates/selectors";
import { useSelector, useDispatch } from "react-redux";
import { baseApiUrl } from "../../constants";
import {
  initFrameTypeAction,
  setFrameTypeAction,
  setMarkerIdAction,
  showImageGalleryAction,
  showPhoneAction,
  showVideoGalleryAction,
} from "../../redux/layouts";
import { mapMainSelector } from "../../redux/layouts/selectors";
// import {fetchItemsMarkersAction} from "../../redux/coordinates";

function Phone() {
  const coordinatesInfo = useSelector(markersDataSelector);
  const dispatch = useDispatch();
  const mapMain = useSelector(mapMainSelector);

  useEffect(() => {
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
  }, [coordinatesInfo]);

  return (
    <div className="phone-content">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="close-phone cursor-pointer"
        onClick={() => {
          dispatch(showPhoneAction(false));
          dispatch(setMarkerIdAction(null));
        }}
      ></div>
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
                dispatch(showImageGalleryAction(true));
              }}
            >
              <div className="relative">
                <div className="photo-content">
                  <div className="gotic-frame"></div>
                  <img
                    src={
                      /(http(s?)):\/\//i.test(coordinatesInfo.image)
                        ? coordinatesInfo.image
                        : `${baseApiUrl}/uploads/photos/${coordinatesInfo.image}`
                    }
                    alt=""
                    className="gray-border-frame"
                  />
                </div>
                {/*<img src={imgSlide} alt="" className="gray-border-frame" />*/}
              </div>
              <div className="clearfix" />
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span
                className="view-gallery cursor-pointer"
                onClick={() => showImageGalleryAction(true)}
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
            className="play-video cursor-pointer"
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
    </div>
  );
}

export default Phone;
