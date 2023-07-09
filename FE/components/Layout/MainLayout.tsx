import React, { useEffect } from "react";
import Map from "../Map";
import { ImagesGallery, VideoGallery } from "../Gallery";
import { activeItemAction } from "../../redux/countries";
import { useDispatch, useSelector } from "react-redux";
import {
  showImageGallerySelector,
  showVideoGallerySelector,
} from "../../redux/layouts/selectors";

export default function MainLayout() {
  const dispatch = useDispatch();
  const showImageGallery = useSelector(showImageGallerySelector);
  const showVideoGallery = useSelector(showVideoGallerySelector);

  useEffect(() => {
    dispatch(activeItemAction());
  }, []);

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-black bg-gray-50">
      <Map />
      {showImageGallery && <ImagesGallery />}
      {showVideoGallery && <VideoGallery />}
    </div>
  );
}
