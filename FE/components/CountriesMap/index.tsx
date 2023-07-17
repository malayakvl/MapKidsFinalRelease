import React, { useEffect } from "react";
// import { markersDataSelector } from "../../redux/coordinates/selectors";
import { useSelector, useDispatch } from "react-redux";
// import { baseApiUrl } from "../../constants";
import { setFrontSelectedCountryAction } from "../../redux/layouts";
import { activeCountriesSelector } from "../../redux/countries/selectors";
// import {fetchItemsMarkersAction} from "../../redux/coordinates";

function CountriesMap() {
  // const coordinatesInfo = useSelector(markersDataSelector);
  const dispatch = useDispatch();
  const countries = useSelector(activeCountriesSelector);

  useEffect(() => {
    // console.log("LOADED COUNTRIES", countries);
    countries.forEach((country: any) => {
      console.log(country);
    });
  }, [countries]);

  // const drawDropdown = () => {
  //   return (
  //     <>
  //       <ul className="menu-dropdown">
  //         {countries.forEach((country: any) => {
  //           <li>${country.name}</li>;
  //         })}
  //       </ul>
  //     </>
  //   );
  // };

  return (
    <div className="country-list-map">
      <ul className="hList">
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="javascript:;" className="menu">
            <h2 className="menu-title menu-title_4th">Countries</h2>
            <ul className="menu-dropdown">
              {countries.map((value: any, idx: number) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={idx}
                  className="text-black cursor-pointer"
                  onClick={() => dispatch(setFrontSelectedCountryAction(value))}
                >
                  {value.name}
                </li>
              ))}
            </ul>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default CountriesMap;
