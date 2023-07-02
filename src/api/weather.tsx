import axios from 'axios';
import { apiKey } from '../constants';
// const forecastEndpoint = (params: any) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const forecastEndpoint = (params: any) =>
    `https://api.weatherapi.com/v1/forecast.json?key=6771dbfe92854aaf9e910305230207&q=${params.cityName}&days=7&aqi=no&alerts=no`;
// const locationEndpoint = (params: any) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;
const locationEndpoint = (params: any) =>
    `https://api.weatherapi.com/v1/search.json?key=6771dbfe92854aaf9e910305230207&q=${params.cityName}`;

const apiCall = async (endpoint: string) => {
    const request = {
        method: 'GET',
        url: endpoint,
    };

    try {
        const response = await axios.request(request);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchWeatherForecast = (params: any) => {
    return apiCall(forecastEndpoint(params));
};

export const fetchLocations = (params: any) => {
    console.log(params);
    return apiCall(locationEndpoint(params));
};
