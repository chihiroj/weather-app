import { WEATHER_API_KEY } from "@env";


export async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error.message ?? "Unknown error occured.");
  }


  return data;
}
