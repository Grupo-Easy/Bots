import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
