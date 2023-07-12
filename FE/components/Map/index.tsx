import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Phone from "../PhoneMap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemMarkerAction,
  fetchItemsMarkersAction,
} from "../../redux/coordinates";
import { activeCountriesSelector } from "../../redux/countries/selectors";
import {
  markersDataSelector,
  markersSelector,
} from "../../redux/coordinates/selectors";
import {
  showLoaderAction,
  showPhoneAction,
  initMapAction,
} from "../../redux/layouts/actions";
import {
  mapMainSelector,
  showPhoneSelector,
} from "../../redux/layouts/selectors";

const Map = () => {
  const mapContainer = useRef<any>(null);
  // let hoveredPolygonId = null;
  const dispatch = useDispatch();
  const countries = useSelector(activeCountriesSelector);
  // const markers = useSelector(markersSelector);
  const [styleLoading, setStyleLoading] = useState(false);
  const coordinates = useSelector(markersSelector);
  const showPhone = useSelector(showPhoneSelector);
  const mapRef = useRef(null);
  const mapMain = useSelector(mapMainSelector);
  const coordinatesInfo = useSelector(markersDataSelector);
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";

  useEffect(() => {
    if (mapContainer) {
      const element = mapContainer.current;
      mapboxgl.accessToken =
        "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
      const map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [90.51351884845116, 38.51974209746709],
        zoom: 3,
      });
      map.on("style.load", () => {
        setStyleLoading(true);
        dispatch(initMapAction(map));
      });
    }
  }, [mapContainer]);

  useEffect(() => {
    if (mapMain) {
      countries.forEach((country: any) => {
        mapMain.addLayer(
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

        mapMain.setFilter(`country-boundaries-${country.iso3}`, [
          "in",
          "iso_3166_1_alpha_3",
          country.iso3,
        ]);
      });

      const el = document.createElement("div");
      for (const marker of coordinates) {
        const el = document.createElement("div");
        el.className = "marker";
        const flagImage = `../../images/flags/1x1/${marker.flag_name}`;
        el.innerHTML = `<span style="background-image: url(${flagImage})">&nbsp;</span>`;
        el.style.width = `50px`;
        el.style.height = `75px`;
        el.style.backgroundSize = "100%";
        const geometry = [marker.lng, marker.lat];
        // const pointer = new mapboxgl.Marker().setLngLat(geometry).addTo(map);
        // @ts-ignore
        const pointer = new mapboxgl.Marker(el)
          .setLngLat([marker.lng, marker.lat])
          .addTo(mapMain);
        pointer.getElement().addEventListener("click", (ev) => {
          dispatch(showLoaderAction(true));
          dispatch(fetchItemMarkerAction(marker.id));
          // mapMain.setCenter([marker.lng, marker.lat]);
        });
      }
    }
  }, [coordinates, mapMain]);

  useEffect(() => {
    dispatch(fetchItemsMarkersAction());
  }, [countries]);

  useEffect(() => {
    if (coordinatesInfo) {
      dispatch(showPhoneAction(true));
    }
  }, [coordinatesInfo]);

  useEffect(() => {
    // mapboxgl.accessToken =
    //   "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
    // const map = new mapboxgl.Map({
    //   container: "map-container",
    //   style: "mapbox://styles/mapbox/streets-v11",
    //   center: [90.51351884845116, 38.51974209746709],
    //   zoom: 3,
    // });
    // map.on("style.load", () => {
    //   countries.forEach((country: any) => {
    //     map.addLayer(
    //       {
    //         id: `country-boundaries-${country.iso3}`,
    //         source: {
    //           type: "vector",
    //           url: "mapbox://mapbox.country-boundaries-v1",
    //         },
    //         "source-layer": "country_boundaries",
    //         type: "fill",
    //         paint: {
    //           "fill-color": country.fill_color,
    //           "fill-opacity": 0.4,
    //         },
    //       },
    //       "country-label"
    //     );
    //
    //     map.setFilter(`country-boundaries-${country.iso3}`, [
    //       "in",
    //       "iso_3166_1_alpha_3",
    //       country.iso3,
    //     ]);
    //   });
    //   // const el = document.createElement("div");
    //
    //   for (const marker of coordinates) {
    //     const el = document.createElement("div");
    //     el.className = "marker";
    //     const flagImage = `../../images/flags/1x1/${marker.flag_name}`;
    //     el.innerHTML = `<span style="background-image: url(${flagImage})">&nbsp;</span>`;
    //     el.style.width = `50px`;
    //     el.style.height = `75px`;
    //     el.style.backgroundSize = "100%";
    //     const geometry = [marker.lng, marker.lat];
    //     // @ts-ignore
    //     // const pointer = new mapboxgl.Marker().setLngLat(geometry).addTo(map);
    //     const pointer = new mapboxgl.Marker(el).setLngLat(geometry).addTo(map);
    //     pointer.getElement().addEventListener("click", (ev) => {
    //       dispatch(showLoaderAction(true));
    //       dispatch(fetchItemMarkerAction(marker.id));
    //       console.log("here we are");
    //       map.setCenter([marker.lng, marker.lat]);
    //     });
    //   }
    // });
  });

  return (
    <main className="main-layout">
      <div className="big-logo" />
      <div className="map-container" id="map-container" ref={mapContainer} />
      {showPhone && <Phone />}
    </main>
  );
};
export default Map;
