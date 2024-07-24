import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  unitSystem,
  weatherData,
  currentWeather,
}) => {
  function getWeatherDescription(weathercode) {
    const descriptionMap = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    return descriptionMap[weathercode] || "Unknown";
  }

  function getWeatherIcon(weathercode, isDay) {
    const iconMap = {
      0: isDay ? "01d.svg" : "01n.svg",
      1: isDay ? "02d.svg" : "02n.svg",
      2: isDay ? "03d.svg" : "03n.svg",
      3: isDay ? "04d.svg" : "04n.svg",
      45: isDay ? "50d.svg" : "50n.svg",
      48: isDay ? "50d.svg" : "50n.svg",
      51: isDay ? "09d.svg" : "09n.svg",
      53: isDay ? "09d.svg" : "09n.svg",
      55: isDay ? "09d.svg" : "09n.svg",
      56: isDay ? "09d.svg" : "09n.svg",
      57: isDay ? "09d.svg" : "09n.svg",
      61: isDay ? "10d.svg" : "10n.svg",
      63: isDay ? "10d.svg" : "10n.svg",
      65: isDay ? "10d.svg" : "10n.svg",
      66: isDay ? "10d.svg" : "10n.svg",
      67: isDay ? "10d.svg" : "10n.svg",
      71: isDay ? "13d.svg" : "13n.svg",
      73: isDay ? "13d.svg" : "13n.svg",
      75: isDay ? "13d.svg" : "13n.svg",
      77: isDay ? "13d.svg" : "13n.svg",
      80: isDay ? "09d.svg" : "09n.svg",
      81: isDay ? "09d.svg" : "09n.svg",
      82: isDay ? "09d.svg" : "09n.svg",
      85: isDay ? "13d.svg" : "13n.svg",
      86: isDay ? "13d.svg" : "13n.svg",
      95: isDay ? "11d.svg" : "11n.svg",
      96: isDay ? "11d.svg" : "11n.svg",
      99: isDay ? "11d.svg" : "11n.svg",
    };

    return iconMap[weathercode] || (isDay ? "01d.svg" : "01n.svg");
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>
        {getWeatherDescription(currentWeather.weatherCode)}
      </p>
      <Image
        width={300}
        height={300}
        src={`/icons/${getWeatherIcon(
          currentWeather.weatherCode,
          currentWeather.isDay
        )}`}
        alt="Weather Icon"
      />
      <h1 className={styles.temperature}>
        {unitSystem == "metric"
          ? Math.round(currentWeather.temperature)
          : Math.round(ctoF(currentWeather.temperature))}
        °{unitSystem == "metric" ? "C" : "F"}
      </h1>
    </div>
  );
};
