import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { getCurrentWeather } from "../services/helpers";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [cityInput, setCityInput] = useState("Riga");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityInput }),
      });
      const data = await res.json();
      setWeatherData({ ...data });
      setCurrentWeather(getCurrentWeather(data));
      setCityInput("");
    };
    getData();

    const intervalId = setInterval(getData, 3600000);
    
    return () => clearInterval(intervalId);
  }, [triggerFetch, cityInput]);

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && currentWeather ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country="FR"
        description={currentWeather.weatherCode}
        iconName={currentWeather.weatherCode}
        unitSystem={unitSystem}
        weatherData={weatherData}
        currentWeather={currentWeather}
      />
      <ContentBox>
        <Header>
          <DateAndTime currentWeather={currentWeather} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} currentWeather={currentWeather} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;