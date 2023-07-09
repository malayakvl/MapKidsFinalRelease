import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markersDataSelector } from "../../redux/coordinates/selectors";
import { baseApiUrl } from "../../constants";
import { showImageGalleryAction } from "../../redux/layouts";

function ImagesGallery() {
  const markerData = useSelector(markersDataSelector);
  const [bigImg, setBigImg] = useState(
    `${baseApiUrl}/uploads/photos/${markerData.imageGallery[0].name}`
  );
  const dispatch = useDispatch();

  return (
    <div className="gallery-content">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="close-gallery"
        onClick={() => dispatch(showImageGalleryAction(false))}
      />
      <div className="big-frame-gotic mx-auto">
        <img src={bigImg} alt="" className="gray-border-frame" />
      </div>
      <div className="gallery-thumbs">
        <div className="gallery-line row-1">
          {markerData.imageGallery.map((item: any) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              className="image-content cursor-pointer"
              key={item.id}
              onClick={() => {
                // console.log(item.name)
                setBigImg(`${baseApiUrl}/uploads/photos/${item.name}`);
              }}
            >
              <div className="gotic-frame-gallery"></div>
              <div className="img-container-radius">
                <div
                  className="image-gallery-bg 1-styles"
                  style={{
                    backgroundImage: `url(${baseApiUrl}/uploads/photos/${item.name})`,
                  }}
                ></div>
              </div>
              {/*<img*/}
              {/*  src={`${baseApiUrl}/uploads/photos/${item.name}`}*/}
              {/*  alt=""*/}
              {/*  className="gray-border-frame"*/}
              {/*/>*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImagesGallery;
