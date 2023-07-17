import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markersDataSelector } from "../../redux/coordinates/selectors";
import { baseApiUrl } from "../../constants";
import {
  initFrameTypeAction,
  setFrameTypeAction,
  setImgIndexAction,
  showImageGalleryAction,
} from "../../redux/layouts";
import {
  imgIndexSelector,
  imageFrameTypeSelector,
} from "../../redux/layouts/selectors";

function ImagesGallery() {
  const markerData = useSelector(markersDataSelector);
  const frameTypeData = useSelector(imageFrameTypeSelector);
  const [height, setHeight] = useState(
    markerData.imageGallery[0].imgWidth > markerData.imageGallery[0].imgHeight
      ? "485"
      : "100"
  );
  const [width, setWidth] = useState(
    markerData.imageGallery[0].imgWidth > markerData.imageGallery[0].imgHeight
      ? "650"
      : "100"
  );
  const [frameType, setFrameType] = useState("");
  const refBigImg = useRef(null);
  const [bigImg, setBigImg] = useState(
    `${baseApiUrl}/uploads/photos/${markerData.imageGallery[0].name}`
  );
  const imgIndex = useSelector(imgIndexSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (markerData.id) {
      dispatch(
        initFrameTypeAction(
          markerData.imgWidth > markerData.imgHeight
            ? "horizontalTypeFrame"
            : "verticalTypeFrame"
        )
      );
    }
  }, [markerData]);

  useEffect(() => {
    if (markerData.id) {
      if (
        markerData.imageGallery[imgIndex].imgWidth >
        markerData.imageGallery[imgIndex].imgHeight
      ) {
        dispatch(setFrameTypeAction(setFrameTypeAction("horizontalTypeFrame")));
        setBigImg(
          `${baseApiUrl}/uploads/photos/${markerData.imageGallery[imgIndex].name}`
        );
        setWidth(
          `${
            markerData.imageGallery[imgIndex].imgWidth >
            markerData.imageGallery[imgIndex].imgHeight
              ? "650"
              : "595"
          }`
        );
        setHeight(
          `${
            markerData.imageGallery[imgIndex].imgWidth >
            markerData.imageGallery[imgIndex].imgHeight
              ? "485"
              : "752"
          }`
        );
      } else {
        dispatch(setFrameTypeAction(setFrameTypeAction("horizontalTypeFrame")));
      }
    }
  }, [imgIndex]);

  return (
    <div>
      <div className="loader-content" />
      <div className="gallery-content">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="close-gallery"
          onClick={() => dispatch(showImageGalleryAction(false))}
        />
        <div className="big-frame-gotic mx-auto">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className="arrow-left cursor-pointer"
            onClick={() => {
              const imgIndexSelectedLeftVal =
                imgIndex != 0
                  ? imgIndex - 1
                  : markerData.imageGallery.length - 1;
              const widthFrameSelected =
                markerData.imageGallery[imgIndexSelectedLeftVal].imgWidth >
                markerData.imageGallery[imgIndexSelectedLeftVal].imgHeight
                  ? "650"
                  : "595";
              const heightFrameSelected =
                markerData.imageGallery[imgIndexSelectedLeftVal].imgWidth >
                markerData.imageGallery[imgIndexSelectedLeftVal].imgHeight
                  ? "485"
                  : "486";
              setWidth(widthFrameSelected);
              setHeight(heightFrameSelected);
              setBigImg(
                `${baseApiUrl}/uploads/photos/${markerData.imageGallery[imgIndexSelectedLeftVal].name}`
              );
              dispatch(setImgIndexAction(imgIndexSelectedLeftVal));
              dispatch(
                initFrameTypeAction(
                  markerData.imageGallery[imgIndexSelectedLeftVal].imgWidth >
                    markerData.imageGallery[imgIndexSelectedLeftVal].imgHeight
                    ? "horizontalTypeFrame"
                    : "verticalTypeFrame"
                )
              );
            }}
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className="arrow-right cursor-pointer"
            onClick={() => {
              const imgIndexSelectedLeftVal =
                imgIndex < markerData.imageGallery.length - 1
                  ? imgIndex + 1
                  : 0;
              const widthFrameSelected =
                markerData.imageGallery[imgIndexSelectedLeftVal].imgWidth >
                markerData.imageGallery[imgIndexSelectedLeftVal].imgHeight
                  ? "650"
                  : "595";
              const heightFrameSelected =
                markerData.imageGallery[imgIndexSelectedLeftVal].imgWidth >
                markerData.imageGallery[imgIndexSelectedLeftVal].imgHeight
                  ? "485"
                  : "485";
              setWidth(widthFrameSelected);
              setHeight(heightFrameSelected);
              setBigImg(
                `${baseApiUrl}/uploads/photos/${markerData.imageGallery[imgIndexSelectedLeftVal].name}`
              );
              dispatch(setImgIndexAction(imgIndexSelectedLeftVal));
              dispatch(
                initFrameTypeAction(
                  markerData.imageGallery[imgIndexSelectedLeftVal].imgWidth >
                    markerData.imageGallery[imgIndexSelectedLeftVal].imgHeight
                    ? "horizontalTypeFrame"
                    : "verticalTypeFrame"
                )
              );
            }}
          />
          <div className="big-frame-gotic mx-auto">
            <div className="relative" id="image-big-content" ref={refBigImg}>
              {/*<div className="gotic-big-frame-image-top" />*/}
              {/*<div className="ggotic-big-frame-image-left" />*/}
              {/*<div className="ggotic-big-frame-image-right" />*/}
              {/*<div className="ggotic-big-frame-image-bottom" />*/}

              <img src={bigImg} alt="" className="gray-border-frame" />
            </div>
            <div className="top-frame hidden" />
          </div>
          <div
            className="hidden"
            id="image-big-content"
            ref={refBigImg}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {/*<div className="gotic-big-frame-image-top hide" />*/}
            {/*<div className="ggotic-big-frame-image-left hide" />*/}
            {/*<div className="ggotic-big-frame-image-right hide" />*/}
            {/*<div className="ggotic-big-frame-image-bottom hide" />*/}
            {frameTypeData === "horizontalTypeFrame" && (
              <>
                {/*<div className="gotic-big-frame-video-top" />*/}
                {/*<div className="gotic-big-frame-video-left" />*/}
                {/*<div className="gotic-big-frame-video-right" />*/}
                {/*<div className="gotic-big-frame-video-bottom" />*/}
              </>
            )}
            {frameTypeData === "verticalTypeFrame" && (
              <>
                {/*<div className="gotic-big-frame-vertical-video-top" />*/}
                {/*<div className="gotic-big-frame-vertical-video-left" />*/}
                {/*<div className="gotic-big-frame-vertical-video-right" />*/}
                {/*<div className="gotic-big-frame-vertical-video-bottom" />*/}
              </>
            )}

            <img src={bigImg} alt="" className="gray-border-frame" />
          </div>
          <div className="top-frame hidden" />
        </div>
        <div className="gallery-thumbs">
          <div className="gallery-line row-1">
            {markerData.imageGallery.map((item: any, key: number) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                className="image-content cursor-pointer"
                key={item.id}
                onClick={() => {
                  setBigImg(`${baseApiUrl}/uploads/photos/${item.name}`);
                  setWidth(`${item.imgWidth > item.imgHeight ? "650" : "485"}`);
                  setHeight(
                    `${item.imgWidth > item.imgHeight ? "485" : "752"}`
                  );
                  dispatch(
                    initFrameTypeAction(
                      item.imgWidth > item.imgHeight
                        ? "horizontalTypeFrame"
                        : "verticalTypeFrame"
                    )
                  );
                  dispatch(
                    setFrameTypeAction(
                      item.imgWidth > item.imgHeight
                        ? "horizontalTypeFrame"
                        : "verticalTypeFrame"
                    )
                  );
                  setFrameType(
                    item.imgWidth > item.imgHeight
                      ? "horizontalTypeFrame"
                      : "verticalTypeFrame"
                  );
                  dispatch(setImgIndexAction(key));
                }}
              >
                {/*<div className="gotic-frame-gallery"></div>*/}
                <div className="gotic-frame-gallery-top" />
                <div className="gotic-frame-gallery-left" />
                <div className="gotic-frame-gallery-right" />
                <div className="gotic-frame-gallery-bottom" />
                <div className="img-container-radius">
                  <div
                    className="image-gallery-bg 1-styles"
                    style={{
                      backgroundImage: `url(${baseApiUrl}/uploads/photos/${item.name})`,
                    }}
                  ></div>
                </div>
                <div className="image-title">
                  <em>{item.title}</em>
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
    </div>
  );
}

export default ImagesGallery;
