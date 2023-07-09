import React, { useRef, useEffect } from "react";
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
import { showLoaderAction, showPhoneAction } from "../../redux/layouts/actions";
import { showPhoneSelector } from "../../redux/layouts/selectors";

const Map = () => {
  const mapContainer = useRef<any>(null);
  // let hoveredPolygonId = null;
  const dispatch = useDispatch();
  const countries = useSelector(activeCountriesSelector);
  // const markers = useSelector(markersSelector);
  // const [showPhone, setShowPhone] = useState(false);
  const coordinates = useSelector(markersSelector);
  const showPhone = useSelector(showPhoneSelector);
  const coordinatesInfo = useSelector(markersDataSelector);

  useEffect(() => {
    dispatch(fetchItemsMarkersAction());
  }, [countries]);

  useEffect(() => {
    console.log("MARKER INFO", coordinatesInfo);
    if (coordinatesInfo) {
      dispatch(showPhoneAction(true));
    }
  }, [coordinatesInfo]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [90.51351884845116, 38.51974209746709],
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
      // console.log("coordinates", coordinates);
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
      for (const marker of coordinates) {
        const geometry = [marker.lng, marker.lat];
        // @ts-ignore
        const pointer = new mapboxgl.Marker().setLngLat(geometry).addTo(map);
        pointer.getElement().addEventListener("click", () => {
          dispatch(showLoaderAction(true));
          dispatch(fetchItemMarkerAction(marker.id));
        });
      }
    });
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
