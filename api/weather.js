import axios from 'axios';
import {apikey} from '../constants';

const BASE_URL = 'http://api.weatherapi.com/v1';
const forecastEndpoint = params =>
  `${BASE_URL}/forecast.json?key=${apikey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndpoint = params =>
  `${BASE_URL}/search.json?key=${apikey}&q=${params.cityName}`;

const apiCall = async endpoint => {
  const option = {
    method: 'GET',
    url: endpoint,
  };
  try {
    const response = await axios.request(option);
    return response.data;
  } catch (err) {
    console.log('error', err);
    return null;
  }
};

export const fetchWeatherForecast = params => {
  return apiCall(forecastEndpoint(params));
};
export const fetchLocations = params => {
  return apiCall(locationsEndpoint(params));
};
