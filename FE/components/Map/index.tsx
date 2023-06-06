import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Map = () => {
  const mapContainer = useRef<any>(null);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-100.486052, 37.830348],
      zoom: 2,
    });
    const start = {
      center: [80, 36],
      zoom: 1,
      pitch: 0,
      bearing: 0,
    };
    const end = {
      center: [8.11862, 46.58842],
      zoom: 12.5,
      bearing: 130,
      pitch: 75,
    };
    map.on("style.load", () => {
      console.log("style load");
    });
  });

  return (
    <main>
      <div className="map-container" id="map-container" ref={mapContainer} />
      {/*<div className="map" id="map"  />*/}
    </main>
  );
};
export default Map;
