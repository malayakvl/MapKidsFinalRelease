// import { useTranslations } from 'next-intl';
import React, { useState } from "react";
import Map from "../Map/index";
import { useDispatch } from "react-redux";

function Main() {
  // const t = useTranslations();
  const [activeNumber, setActiveNumber] = useState(0);
  const dispatch = useDispatch();
  return <Map />;
}

export default Main;
