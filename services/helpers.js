import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  isoToLocalTime,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, isoString) => {
  return isoToLocalTime(isoString, unitSystem);
};
export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (isoString) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(isoString);
  return weekday[date.getDay()];
};
export const getCurrentWeather = (weatherData) => {
  const currentTime = new Date();
  const hourlyData = weatherData.hourly;
  const currentIndex =
    hourlyData.time.findIndex((time) => {
      const hourTime = new Date(time);
      return hourTime > currentTime;
    }) - 1;

  return {
    temperature: hourlyData.temperature_2m[currentIndex],
    humidity: hourlyData.relativehumidity_2m[currentIndex],
    windSpeed: hourlyData.windspeed_10m[currentIndex],
    windDirection: hourlyData.winddirection_10m[currentIndex],
    weatherCode: hourlyData.weathercode[currentIndex],
    time: new Date(hourlyData.time[currentIndex]),
    isDay: currentTime.getHours() >= 6 && currentTime.getHours() < 20,
  };
};
