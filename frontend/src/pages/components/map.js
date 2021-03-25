import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const BaseMap = () => {
  mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

  useEffect(() => {
    new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
  }, []);

  return (
    <div
      id="mapContainer"
      className="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};

export default BaseMap;
