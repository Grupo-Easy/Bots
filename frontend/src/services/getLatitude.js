import axios from 'axios';

const api = axios.create({
  baseURL: `http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST_TOKEN}&location=`,
});

export default api;
