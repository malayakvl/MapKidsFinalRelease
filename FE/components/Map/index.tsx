import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Phone from "../PhoneMap";
import { useDispatch, useSelector } from "react-redux";
import { activeItemAction } from "../../redux/countries";
import { activeCountriesSelector } from "../../redux/countries/selectors";

const Map = () => {
  const mapContainer = useRef<any>(null);
  // let hoveredPolygonId = null;
  const dispatch = useDispatch();
  const countries = useSelector(activeCountriesSelector);

  useEffect(() => {
    console.log("Items Countries", countries);
  }, [countries]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
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
    map.on("click", function(e){
      alert(1);
    });
    map.on("style.load", () => {
      // map.addLayer(
      //   {
      //     id: "country-boundaries-it",
      //     source: {
      //       type: "vector",
      //       url: "mapbox://mapbox.country-boundaries-v1",
      //     },
      //     "source-layer": "country_boundaries",
      //     type: "fill",
      //     paint: {
      //       "fill-color": "#d2361e",
      //       "fill-opacity": 0.4,
      //     },
      //   },
      //   "country-label"
      // );
      //
      // map.setFilter("country-boundaries-it", [
      //   "in",
      //   "iso_3166_1_alpha_3",
      //   "ITA",
      // ]);
    });
  });

  return (
    <main>
      <div className="map-container" id="map-container" ref={mapContainer} />
      <Phone />
    </main>
  );
};
export default Map;
