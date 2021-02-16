import { URL, APIKEY } from '../config/config'

const Weather = async (city) => {
    try {
      const response = await fetch(`${URL}${city},co&appid=${APIKEY}`);
      const data = await response.json();
      const weatherForecast = data.weather[0];
      return weatherForecast;
    } catch(error) {
      return error;
    }
};

export default Weather;