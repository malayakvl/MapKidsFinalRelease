import React from "react";

// import mapboxgl from 'mapbox-gl';
// import './Map.css';

// mapboxgl.accessToken =
//   'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default function Home() {
  return <></>;
}

export async function getServerSideProps() {
  const locale = "en";

  return {
    props: {
      locale,
    },
  };
}
