import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import {
  countryItemSelector,
  countryMapSelector,
  isFetchSelector,
  layerFillSelector,
  layerOpacitySelector,
} from "../../redux/countries/selectors";
import {
  loadMapAction,
  initMapAction,
  addMarkerAction,
} from "../../redux/countries";
import { setModalConfirmationMetaAction } from "../../redux/layouts";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
const MapForm = ({ isLoad }: { isLoad: boolean }) => {
  const mapContainer = useRef<any>(null);
  const isFetched = useSelector(isFetchSelector);
  const dispatch = useDispatch();
  const layerColor = useSelector(layerFillSelector);
  const layerOpacity = useSelector(layerOpacitySelector);
  const mapCountry = useSelector(countryMapSelector);
  const countryData = useSelector(countryItemSelector);

  // console.log("MAP CONTAINER", countryData);

  useEffect(() => {
    if (isFetched) {
      if (document.getElementById("map-container-form")) {
        // @ts-ignore
        document.getElementById("map-container-form").innerHTML = "";
      }
      dispatch(loadMapAction(true));
      const map = new mapboxgl.Map({
        container: "map-container-form",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [110.20101884845053, 36.001941656383096],
        zoom: 2,
      });
      dispatch(initMapAction(map));
      map.on("style.load", () => {
        // map.on("click", function (e) {
        //   const coordinates = e.lngLat;
        //   console.log(coordinates);
        // });
      });
    }
  }, [isFetched, mapContainer.current]);

  useEffect(() => {
    // console.log("Selected Color", layerColor);
    if (layerColor && mapCountry) {
      mapCountry.setPaintProperty(
        "country-current-layer",
        "fill-color",
        layerColor
      );
    }
  }, [layerColor]);

  const addRequest = () => {
    console.log("adding marker");
  };

  useEffect(() => {
    if (layerColor && mapCountry) {
      mapCountry.setPaintProperty(
        "country-current-layer",
        "fill-opacity",
        layerOpacity / 100
      );
    }
  }, [layerOpacity]);

  useEffect(() => {
    if (countryData && mapCountry) {
      mapCountry.on("click", function (e: any) {
        const coordinates = e.lngLat;
        dispatch(
          setModalConfirmationMetaAction({
            onConfirm: async () =>
              dispatch(addMarkerAction(coordinates, countryData.id)).then(
                console.log("hahah")
              ),
          })
        );
      });

      mapCountry.on("load", function () {
        if (countryData.countryCenter) {
          mapCountry.flyTo({
            center: [
              countryData.countryCenter[0],
              countryData.countryCenter[1],
            ],
            speed: 0.5,
          });
        }

        // if (!mapCountry.getLayer("country-current-layer")) {
        mapCountry.addLayer(
          {
            id: "country-current-layer",
            source: {
              type: "vector",
              url: "mapbox://mapbox.country-boundaries-v1",
            },
            "source-layer": "country_boundaries",
            type: "fill",
            paint: {
              "fill-color": countryData.fill_color
                ? countryData.fill_color
                : "#9eb2a3",
              "fill-opacity": countryData.fill_opacity
                ? countryData.fill_opacity / 100
                : 0.9,
            },
          },
          "country-label"
        );
        // }
        // ADD MARKER
        if (countryData.countryCenter) {
          mapCountry.setFilter("country-current-layer", [
            "in",
            "iso_3166_1_alpha_3",
            countryData.iso3,
          ]);
          const el = document.createElement("div");
          const width = 30;
          const height = 30;
          el.className = "marker";
          el.innerHTML = `<span>${countryData.flag}</span>`;
          el.style.width = `${width}px`;
          el.style.height = `${height}px`;
          new mapboxgl.Marker(el)
            .setLngLat([
              countryData.countryCenter[0],
              countryData.countryCenter[1],
            ])
            .addTo(mapCountry);
        }
      });
    }
  }, [countryData, mapCountry]);

  return (
    <div className="relative">
      <div className="map-form-block relative">
        <div
          className="map-container-form"
          id="map-container-form"
          ref={mapContainer}
        />
      </div>
    </div>
  );
};
export default MapForm;
