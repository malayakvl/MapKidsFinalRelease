import React, { useState } from "react";
import { markersDataSelector } from "../../redux/coordinates/selectors";
import { useSelector } from "react-redux";

function Phone() {
  const coordinatesInfo = useSelector(markersDataSelector);
  console.log("Marker Data", coordinatesInfo);

  return (
    <>
      <div className="phone-block">
        <img
          src="https://www.interfax.ru/ftproot/textphotos/2014/09/25/ind700.jpg"
          className="phone-head"
          alt=""
        />
        <h1>{coordinatesInfo?.title}</h1>
        <div
          className="country-text"
          dangerouslySetInnerHTML={{
            __html: coordinatesInfo.description,
          }}
        />
        <div className="video">
          <div
            className="country-text"
            dangerouslySetInnerHTML={{
              __html: coordinatesInfo?.videoCode,
            }}
          />
          {coordinatesInfo?.videoCode}
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/l4EF_YuX0qo"
            title="Beautiful cloudy sea with waves and sounds of marine nature to the music"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Phone;
