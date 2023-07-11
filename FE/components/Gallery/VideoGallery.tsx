import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markersDataSelector } from "../../redux/coordinates/selectors";
import { showVideoGalleryAction } from "../../redux/layouts";

function VideoGallery() {
  const markerData = useSelector(markersDataSelector);
  const [bigVideo, setBigVideo] = useState(markerData.videosGallery[0]);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="loader-content" />
      <div className="gallery-content">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="close-gallery"
          onClick={() => dispatch(showVideoGalleryAction(false))}
        />
        <div className="">
          <div
            className="big-big-frame-gotic mx-auto"
            style={{ left: "calc(50% - 430px)", position: "relative" }}
          >
            <div>
              <div className="relative">
                <div className="gotic-big-frame-video-top" />
                <div className="gotic-big-frame-video-left" />
                <div className="gotic-big-frame-video-right" />
                <div className="gotic-big-frame-video-bottom" />
                <div
                  dangerouslySetInnerHTML={{
                    __html: bigVideo.code
                      .replace('height="209"', 'height="485"')
                      .replace('width="100%"', 'width="863"'),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="gallery-thumbs">
          <div className="gallery-line row-1">
            {markerData.videosGallery.length > 1 && (
              <>
                {markerData.videosGallery.map((item: any) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                  <div
                    className="image-content cursor-pointer0"
                    key={item.id}
                    onClick={() => {
                      // console.log(item.name)
                      setBigVideo(item);
                    }}
                  >
                    <div className="gotic-frame-gallery-1"></div>
                    <div className="relative">
                      <div className="gotic-frame-video-top" />
                      <div className="gotic-frame-video-left" />
                      <div className="gotic-frame-video-right" />
                      <div className="gotic-frame-video-bottom" />
                      <div className="absolute w-[190px] h-[140px] opacity-0 z-50"></div>
                      <div className="w-">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.code
                              .replace('height="209"', 'height="140"')
                              .replace('width="100%"', 'width="190"'),
                          }}
                          className=""
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGallery;