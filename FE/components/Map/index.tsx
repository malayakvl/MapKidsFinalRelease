import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Phone from "../PhoneMap";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsAction } from "../../redux/coordinates";
import { activeCountriesSelector } from "../../redux/countries/selectors";
import { markersSelector } from "../../redux/coordinates/selectors";

const Map = () => {
  const mapContainer = useRef<any>(null);
  // let hoveredPolygonId = null;
  const dispatch = useDispatch();
  const countries = useSelector(activeCountriesSelector);
  const markers = useSelector(markersSelector);
  const [showPhone, setShowPhone] = useState(false);
  const coordinates = useSelector(markersSelector);

  // console.log(countries);
  const markes = [
    { lat: 32.81214034615138, lng: 100.88461259845167 },
    { lat: 28.889822287201895, lng: 110.20101884845201 },
    { lat: 37.89820044158398, lng: 86.99789384845178 },
    { lat: 43.53183358525649, lng: -108.67027934765451 },
    { lat: 36.26111708502141, lng: -89.1585605976545 },
  ];

  useEffect(() => {
    dispatch(fetchItemsAction());
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
    map.on("click", function (e) {
      // alert(1);
    });
    map.on("style.load", () => {
      countries.forEach((country: any) => {
        map.addLayer(
          {
            id: `country-boundaries-${country.iso3}`,
            source: {
              type: "vector",
              url: "mapbox://mapbox.country-boundaries-v1",
            },
            "source-layer": "country_boundaries",
            type: "fill",
            paint: {
              "fill-color": country.fill_color,
              "fill-opacity": 0.4,
            },
          },
          "country-label"
        );

        map.setFilter(`country-boundaries-${country.iso3}`, [
          "in",
          "iso_3166_1_alpha_3",
          country.iso3,
        ]);
      });
      for (const marker of markes) {
        const geometry = [marker.lng, marker.lat];
        // @ts-ignore
        const pointer = new mapboxgl.Marker().setLngLat(geometry).addTo(map);
        pointer.getElement().addEventListener("click", () => {
          setShowPhone(true);
        });
      }

      // map.addLayer(
      //   {
      //     id: "country-boundaries-LAO",
      //     source: {
      //       type: "vector",
      //       url: "mapbox://mapbox.country-boundaries-v1",
      //     },
      //     "source-layer": "country_boundaries",
      //     type: "fill",
      //     paint: {
      //       "fill-color": "#511c60",
      //       "fill-opacity": 0.4,
      //     },
      //   },
      //   "country-label"
      // );
      //
      // map.setFilter("country-boundaries-LAO", [
      //   "in",
      //   "iso_3166_1_alpha_3",
      //   "LAO",
      // ]);
      //
      // map.addLayer(
      //   {
      //     id: "country-boundaries-CHN",
      //     source: {
      //       type: "vector",
      //       url: "mapbox://mapbox.country-boundaries-v1",
      //     },
      //     "source-layer": "country_boundaries",
      //     type: "fill",
      //     paint: {
      //       "fill-color": "#dc7ca4",
      //       "fill-opacity": 0.4,
      //     },
      //   },
      //   "country-label"
      // );
      //
      // map.setFilter("country-boundaries-CHN", [
      //   "in",
      //   "iso_3166_1_alpha_3",
      //   "CHN",
      // ]);
      //
      // map.addLayer(
      //   {
      //     id: "country-boundaries-USA",
      //     source: {
      //       type: "vector",
      //       url: "mapbox://mapbox.country-boundaries-v1",
      //     },
      //     "source-layer": "country_boundaries",
      //     type: "fill",
      //     paint: {
      //       "fill-color": "#68e7d0",
      //       "fill-opacity": 0.4,
      //     },
      //   },
      //   "country-label"
      // );
      // map.setFilter("country-boundaries-USA", [
      //   "in",
      //   "iso_3166_1_alpha_3",
      //   "USA",
      // ]);
      //
      // map.addLayer(
      //   {
      //     id: "country-boundaries-VNM",
      //     source: {
      //       type: "vector",
      //       url: "mapbox://mapbox.country-boundaries-v1",
      //     },
      //     "source-layer": "country_boundaries",
      //     type: "fill",
      //     paint: {
      //       "fill-color": "#5788e3",
      //       "fill-opacity": 0.4,
      //     },
      //   },
      //   "country-label"
      // );
      // map.setFilter("country-boundaries-VNM", [
      //   "in",
      //   "iso_3166_1_alpha_3",
      //   "VNM",
      // ]);
      //
      // map.addLayer(
      //   {
      //     id: "country-boundaries-UMI",
      //     source: {
      //       type: "vector",
      //       url: "mapbox://mapbox.country-boundaries-v1",
      //     },
      //     "source-layer": "country_boundaries",
      //     type: "fill",
      //     paint: {
      //       "fill-color": "#cbac12",
      //       "fill-opacity": 0.4,
      //     },
      //   },
      //   "country-label"
      // );
      // map.setFilter("country-boundaries-UMI", [
      //   "in",
      //   "iso_3166_1_alpha_3",
      //   "UMI",
      // ]);
    });
  });

  return (
    <main>
      <div className="map-container" id="map-container" ref={mapContainer} />
      {showPhone && <Phone />}
      {/*<Phone />*/}
    </main>
  );
};
export default Map;
