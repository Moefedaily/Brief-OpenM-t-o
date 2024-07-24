import { degToCompass } from "../services/converters";
import { getWindSpeed, getTime } from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, currentWeather, unitSystem }) => {
  const sunriseTime = weatherData.daily.sunrise
    ? getTime(unitSystem, weatherData.daily.sunrise[0])
    : "N/A";
  const sunsetTime = weatherData.daily.sunset
    ? getTime(unitSystem, weatherData.daily.sunset[0])
    : "N/A";

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title="Humidity"
        iconSrc="/icons/humidity.png"
        metric={currentWeather.humidity}
        unit="%"
      />
      <MetricsCard
        title="Wind Speed"
        iconSrc="/icons/wind.png"
        metric={getWindSpeed(unitSystem, currentWeather.windSpeed)}
        unit={unitSystem === "imperial" ? "mph" : "km/h"}
      />
      <MetricsCard
        title="Wind Direction"
        iconSrc="/icons/compass.png"
        metric={degToCompass(currentWeather.windDirection)}
      />
      <MetricsCard
        title="Sunrise"
        iconSrc="/icons/sunrise.png"
        metric={sunriseTime}
      />
      <MetricsCard
        title="Sunset"
        iconSrc="/icons/sunset.png"
        metric={sunsetTime}
      />
    </div>
  );
};
