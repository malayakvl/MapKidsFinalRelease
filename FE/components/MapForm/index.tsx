import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import {
  countryItemSelector,
  countryMapSelector,
  countryMarkersSelector,
  countryRebuildMapSelector,
  isFetchSelector,
  layerFillSelector,
  layerOpacitySelector,
  rebuildMapSelector,
  reloadMapSelector,
} from "../../redux/countries/selectors";
import {
  loadMapAction,
  initMapAction,
  addMarkerAction,
  reloadMapAction,
  mapRebuildedAction,
  initRebuildMapAction,
} from "../../redux/countries";
// import { markersSelector } from "../../redux/coordinates/selectors";
// import coordinates from "../../redux/coordinates";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsYXlha3ZsIiwiYSI6ImNsY3Jxb3FhdzBiY3Qzd3BjMDRzYjVvZmEifQ.asLancy_a5ZTUNZHVRCSaA";
const MapForm = ({ isLoad }: { isLoad: boolean }) => {
  const mapContainer = useRef<any>(null);
  const isFetched = useSelector(isFetchSelector);
  const dispatch = useDispatch();
  const layerColor = useSelector(layerFillSelector);
  const layerOpacity = useSelector(layerOpacitySelector);
  const mapCountry = useSelector(countryMapSelector);
  const mapCountryRebuild = useSelector(countryRebuildMapSelector);
  const countryData = useSelector(countryItemSelector);
  // const coordinatesData = useSelector(markersSelector);
  const currentMarkers: any[] = [];
  const reloadMap = useSelector(reloadMapSelector);
  const rebuildMap = useSelector(rebuildMapSelector);
  const updatedMarkers = useSelector(countryMarkersSelector);

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
          const oneMarker = marker.setLngLat(coordinates).addTo(map);
          currentMarkers.push(oneMarker);
          // store marker to db
          dispatch(addMarkerAction(coordinates, countryData.id));
        });
      });
    }
  }, [isFetched, mapContainer.current]);

  // useEffect(() => {
  //   if (reloadMap) {
  //     console.log("COORDINATES UPDATED", updatedMarkers.length);
  //     if (document.getElementById("map-container-form")) {
  //       // @ts-ignore
  //       document.getElementById("map-container-form").innerHTML = "";
  //     }
  //     dispatch(loadMapAction(true));
  //     const map = new mapboxgl.Map({
  //       container: "map-container-form",
  //       style: "mapbox://styles/mapbox/streets-v11",
  //       center: [110.20101884845053, 36.001941656383096],
  //       zoom: 2,
  //     });
  //     dispatch(initMapAction(map));
  //     // dispatch(fetchItemsMarkersAction());
  //     map.on("style.load", () => {
  //       map.on("click", function (e) {
  //         const coordinates = e.lngLat;
  //         const marker = new mapboxgl.Marker();
  //         const oneMarker = marker.setLngLat(coordinates).addTo(map);
  //         currentMarkers.push(oneMarker);
  //         // store marker to db
  //         dispatch(addMarkerAction(coordinates, countryData.id));
  //       });
  //       if (updatedMarkers.length > 0) {
  //         for (const marker of updatedMarkers) {
  //           // Create a DOM element for each marker.
  //           console.log("parsing markers", marker);
  //           const el = document.createElement("div");
  //           el.className = "marker";
  //           el.innerHTML = `<span>${countryData.flag}</span>`;
  //           el.style.width = `50px`;
  //           el.style.height = `75px`;
  //           el.style.backgroundSize = "100%";
  //           const geometry: [number, number] = [marker.lng, marker.lat];
  //           // @ts-ignore
  //           new mapboxgl.Marker().setLngLat(geometry).addTo(mapCountry);
  //         }
  //       }
  //     });
  //   }
  // }, [reloadMap]);

  useEffect(() => {
    if (layerColor && mapCountry) {
      mapCountry.setPaintProperty(
        "country-current-layer",
        "fill-color",
        layerColor
      );
    }
    if (layerColor && mapCountryRebuild) {
      mapCountryRebuild.setPaintProperty(
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
    if (layerColor && mapCountryRebuild) {
      mapCountryRebuild.setPaintProperty(
        "country-current-layer",
        "fill-opacity",
        layerOpacity / 100
      );
    }
  }, [layerOpacity]);

  useEffect(() => {
    if (countryData && mapCountry && !rebuildMap) {
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
        // const el = document.createElement("div");
        if (countryData.markers.length > 0) {
          for (const marker of countryData.markers) {
            // Create a DOM element for each marker.
            const el = document.createElement("div");
            el.className = "marker";
            el.innerHTML = `<span>${countryData.flag}</span>`;
            el.style.width = `50px`;
            el.style.height = `75px`;
            el.style.backgroundSize = "100%";
            const geometry: [number, number] = [marker.lng, marker.lat];
            // @ts-ignore
            const oneMarker = new mapboxgl.Marker()
              .setLngLat(geometry)
              .addTo(mapCountry);
            currentMarkers.push(oneMarker);
          }
        }
      });
    }
  }, [countryData, mapCountry]);

  useEffect(() => {
    if (reloadMap) {
      dispatch(mapRebuildedAction(true));
      // console.log("NEW MARKERS LIST", mapCountry);
      const map = new mapboxgl.Map({
        container: "map-container-form",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [110.20101884845053, 36.001941656383096],
        zoom: 2,
      });
      // dispatch(initMapAction(map));
      map.on("style.load", () => {
        map.flyTo({
          center: [countryData.countryCenter[0], countryData.countryCenter[1]],
          speed: 0.5,
        });
        map.addLayer(
          {
            id: "country-current-layer",
            source: {
              type: "vector",
              url: "mapbox://mapbox.country-boundaries-v1",
            },
            "source-layer": "country_boundaries",
            type: "fill",
            paint: {
              "fill-color": layerColor ? layerColor : "#9eb2a3",
              "fill-opacity": layerOpacity ? layerOpacity / 100 : 0.9,
            },
          },
          "country-label"
        );
        map.setFilter("country-current-layer", [
          "in",
          "iso_3166_1_alpha_3",
          countryData.iso3,
        ]);
        dispatch(initRebuildMapAction(map));
      });
      // map.setFilter("country-current-layer", [
      //   "in",
      //   "iso_3166_1_alpha_3",
      //   countryData.iso3,
      // ]);
      map.on("click", function (e) {
        const coordinates = e.lngLat;
        const marker = new mapboxgl.Marker();
        const oneMarker = marker.setLngLat(coordinates).addTo(map);
        currentMarkers.push(oneMarker);
        // store marker to db
        dispatch(addMarkerAction(coordinates, countryData.id));
      });

      // const el = document.createElement("div");
      if (updatedMarkers.length > 0) {
        for (const marker of updatedMarkers) {
          // Create a DOM element for each marker.
          const el = document.createElement("div");
          el.className = "marker";
          el.innerHTML = `<span>${countryData.flag}</span>`;
          el.style.width = `50px`;
          el.style.height = `75px`;
          el.style.backgroundSize = "100%";
          const geometry: [number, number] = [marker.lng, marker.lat];
          // @ts-ignore
          const oneMarker = new mapboxgl.Marker()
            .setLngLat(geometry)
            .addTo(map);
          // currentMarkers.push(oneMarker);
        }
      }

      // if (!mapCountry.getLayer("country-current-layer")) {
      // mapCountry.addLayer(
      //     {
      //       id: "country-current-layer",
      //       source: {
      //         type: "vector",
      //         url: "mapbox://mapbox.country-boundaries-v1",
      //       },
      //       "source-layer": "country_boundaries",
      //       type: "fill",
      //       paint: {
      //         "fill-color": "#0fb694",
      //         "fill-opacity": countryData.fill_opacity
      //             ? countryData.fill_opacity / 100
      //             : 0.9,
      //       },
      //     },
      //     "country-label"
      // );

      // mapCountry.on("load", function () {
      //   console.log("LOAD MAP");
      //   // mapCountry.flyTo({
      //   //   center: [countryData.countryCenter[0], countryData.countryCenter[1]],
      //   //   speed: 0.5,
      //   // });
      //   // // if (!mapCountry.getLayer("country-current-layer")) {
      //   // mapCountry.addLayer(
      //   //   {
      //   //     id: "country-current-layer",
      //   //     source: {
      //   //       type: "vector",
      //   //       url: "mapbox://mapbox.country-boundaries-v1",
      //   //     },
      //   //     "source-layer": "country_boundaries",
      //   //     type: "fill",
      //   //     paint: {
      //   //       "fill-color": "#0fb694",
      //   //       "fill-opacity": countryData.fill_opacity
      //   //         ? countryData.fill_opacity / 100
      //   //         : 0.9,
      //   //     },
      //   //   },
      //   //   "country-label"
      //   // );
      //   // }
      //   // ADD MARKER
      //   // mapCountry.setFilter("country-current-layer", [
      //   //   "in",
      //   //   "iso_3166_1_alpha_3",
      //   //   countryData.iso3,
      //   // ]);
      //   // const el = document.createElement("div");
      //   // if (countryData.markers.length > 0) {
      //   //   for (const marker of countryData.markers) {
      //   //     // Create a DOM element for each marker.
      //   //     const el = document.createElement("div");
      //   //     el.className = "marker";
      //   //     el.innerHTML = `<span>${countryData.flag}</span>`;
      //   //     el.style.width = `50px`;
      //   //     el.style.height = `75px`;
      //   //     el.style.backgroundSize = "100%";
      //   //     const geometry: [number, number] = [marker.lng, marker.lat];
      //   //     // @ts-ignore
      //   //     // const oneMarker = new mapboxgl.Marker()
      //   //     //   .setLngLat(geometry)
      //   //     //   .addTo(mapCountry);
      //   //     currentMarkers.push(oneMarker);
      //   //   }
      //   // }
      // });
    }
  }, [reloadMap, mapCountry]);

  return (
    <div className="relative">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={() => dispatch(reloadMapAction(true))}>Remove Markers</div>
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
