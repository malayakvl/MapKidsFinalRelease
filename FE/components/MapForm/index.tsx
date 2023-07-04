import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import {
  countryItemSelector,
  countryMapSelector,
  isFetchSelector,
  layerFillSelector,
  layerOpacitySelector,
  mapLoadedSelector,
} from "../../redux/countries/selectors";
import {
  loadMapAction,
  initMapAction,
  addMarkerAction,
} from "../../redux/countries";
import { markersSelector } from "../../redux/coordinates/selectors";

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
  const coordinatesData = useSelector(markersSelector);

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
      // dispatch(fetchItemsMarkersAction());
      map.on("style.load", () => {
        map.on("click", function (e) {
          const coordinates = e.lngLat;
          const marker = new mapboxgl.Marker();
          marker.setLngLat(coordinates).addTo(map);
          // store marker to db
          dispatch(addMarkerAction(coordinates, countryData.id));
        });
      });
      // map.on("load", function () {
      // });
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
      mapCountry.on("load", function () {
        mapCountry.flyTo({
          center: [countryData.countryCenter[0], countryData.countryCenter[1]],
          speed: 0.5,
        });
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
        mapCountry.setFilter("country-current-layer", [
          "in",
          "iso_3166_1_alpha_3",
          countryData.iso3,
        ]);
        const el = document.createElement("div");
        if (countryData.markers.length > 0) {
          for (const marker of countryData.markers) {
            const geometry = [marker.lng, marker.lat];
            // @ts-ignore
            new mapboxgl.Marker().setLngLat(geometry).addTo(mapCountry);
          }
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
