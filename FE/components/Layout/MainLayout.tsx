import React, { useEffect } from "react";
import Map from "../Map";
import { activeItemAction } from "../../redux/countries";
import { useDispatch } from "react-redux";

export default function MainLayout() {
  console.log("here we are");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeItemAction());
  }, []);

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-black bg-gray-50">
      <Map />
    </div>
  );
}
