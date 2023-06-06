import React from "react";
import Map from "../Map";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-black bg-gray-50">
      <Map />
    </div>
  );
}
