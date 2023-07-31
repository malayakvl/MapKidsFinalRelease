import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Phone from "../PhoneMap";
import { useDispatch, useSelector } from "react-redux";
import { baseApiUrl } from "../../constants";
import {
  fetchItemMarkerAction,
  fetchItemsMarkersAction,
} from "../../redux/coordinates";
import { activeCountriesSelector } from "../../redux/countries/selectors";
import {
  markersDataSelector,
  markersSelector,
} from "../../redux/coordinates/selectors";
import { showPhoneAction, initMapAction } from "../../redux/layouts";
import {
  frontCountrySelector,
  mapMainSelector,
  showPhoneSelector,
} from "../../redux/layouts/selectors";

const Map = () => {
  const mapContainer = useRef<any>(null);
  // let hoveredPolygonId = null;
  const dispatch = useDispatch();
  const countries = useSelector(activeCountriesSelector);
  const selectedCountry = useSelector(frontCountrySelector);
  // const markers = useSelector(markersSelector);
  const [styleLoading, setStyleLoading] = useState(false);
  const coordinates = useSelector(markersSelector);
  const showPhone = useSelector(showPhoneSelector);
  // const mapRef = useRef(null);
  const mapMain = useSelector(mapMainSelector);
  const coordinatesInfo = useSelector(markersDataSelector);
  // const selectedMarkerId = useSelector(selectedMarkerIdSelector);
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";

  useEffect(() => {
    if (mapContainer) {
      // const element = mapContainer.current;
      mapboxgl.accessToken =
        "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
      const map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11",
        // center: [90.51351884845116, 38.51974209746709],
        center: [7.223010832344329, 35.85742466168547],
        zoom: 2.049633575520722,
      });
      map.on("style.load", () => {
        setStyleLoading(true);
        // map.on("click", function (e) {
        //   const coordinates = e.lngLat;
        //   const zoom = map.getZoom();
        //   console.log("COORDINATES", coordinates);
        //   console.log("ZOOM", zoom);
        // });
        dispatch(initMapAction(map));
      });
    }
  }, [mapContainer]);

  useEffect(() => {
    if (mapMain && selectedCountry) {
      mapMain.flyTo({
        center: [
          selectedCountry.countryCenter[0],
          selectedCountry.countryCenter[1],
        ],
        speed: 0.3,
        zoom: 5,
      });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (mapMain) {
      countries.forEach((country: any) => {
        if (!mapMain.getLayer(`country-boundaries-${country.iso3}`)) {
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
        }

        mapMain.setFilter(`country-boundaries-${country.iso3}`, [
          "in",
          "iso_3166_1_alpha_3",
          country.iso3,
        ]);
      });

      // const el = document.createElement("div");
      for (const marker of coordinates) {
        const el = document.createElement("div");
        el.className = marker.is_main ? "marker" : "marker-add";
        const flagImage = `../../images/flags/1x1/${marker.flag_name}`;
        el.innerHTML = marker.is_main
          ? `<span style="background-image: url(${flagImage})">&nbsp;</span>`
          : marker.icon
          ? `<span style="background-image: url(${
              baseApiUrl + marker.icon
            })">&nbsp;</span>`
          : "";
        el.style.width = `${marker.is_main ? 50 : 50}px`;
        el.style.height = `75px`;
        el.style.backgroundSize = "100%";
        const geometry = [marker.lng, marker.lat];
        // const pointer = new mapboxgl.Marker().setLngLat(geometry).addTo(map);
        // @ts-ignore
        const pointer = new mapboxgl.Marker(el)
          .setLngLat([marker.lng, marker.lat])
          .addTo(mapMain);
        pointer.getElement().addEventListener("click", (ev) => {
          dispatch(fetchItemMarkerAction(marker.id));
          // if (selectedMarkerId != marker.id) {
          //   dispatch(showLoaderAction(true));
          //   dispatch(fetchItemMarkerAction(marker.id));
          //   dispatch(setMarkerIdAction(marker.id));
          // } else {
          //   dispatch(setMarkerIdAction(null));
          //   dispatch(showPhoneAction(false));
          // }
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

  return (
    <main className="main-layout">
      <div className="big-logo" />
      <div className="map-container" id="map-container" ref={mapContainer} />
      {/*<div className="phone-container">*/}
      {/*  {showPhone && <Phone showBlock={showPhone} />}*/}
      {/*</div>*/}
      {<Phone showBlock={showPhone} />}
    </main>
  );
};
export default Map;
