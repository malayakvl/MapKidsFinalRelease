import React, { useState } from "react";

function Phone() {
  return (
    <>
      <div className="phone-block">
        <img src="https://www.interfax.ru/ftproot/textphotos/2014/09/25/ind700.jpg" className="phone-head" alt="" />
        <h1>Some Title</h1>
        <div className="country-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </div>
        <div className="video">
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
