import React, { useState } from "react";
import { markersDataSelector } from "../../redux/coordinates/selectors";
import { useSelector } from "react-redux";
import { baseApiUrl } from "../../constants";

function Phone() {
  const coordinatesInfo = useSelector(markersDataSelector);
  console.log("Marker Data", coordinatesInfo);
  let imgSlide;
  if (coordinatesInfo.title == "USA") {
    imgSlide =
      "http://212.111.202.6:1400/uploads/photos/1688631848112-Americans_with_Hmong_Ancestry_by_state.svg.png";
  } else {
    imgSlide =
      "http://212.111.202.6:1400/uploads/photos/1688637207774-water-buffalo.jpg";
  }

  return (
    <div className="phone-content">
      <div className="close-phone"></div>
      <div className="phone-map-block">
        <div className="phone-head-green">
          <div className="title-head">{coordinatesInfo.title}</div>
        </div>
        {/*<div className="phone-content">*/}
        {/*  */}
        {/*</div>*/}
        <div className="phone-descr">
          <div>
            <div className="photo-frame">
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
            </div>
          </div>
          <div
            className="country-text"
            dangerouslySetInnerHTML={{
              __html: coordinatesInfo.description,
            }}
          />
          <div className="clearfix" />
          <div className="play-video"></div>
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
