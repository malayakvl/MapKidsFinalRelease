// import { useTranslations } from 'next-intl';
import React, {useEffect, useState} from "react";
import Map from "../Map/index";
import { useDispatch } from "react-redux";
import { activeItemAction } from "../../redux/countries";

function Main() {
  // const t = useTranslations();
  const [activeNumber, setActiveNumber] = useState(0);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(activeItemAction());
  // }, []);

  return (
    <>
      <Map />;
    </>
  );
}

export default Main;
