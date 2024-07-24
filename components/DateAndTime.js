import { getWeekDay, getTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ currentWeather, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(currentWeather.time)}, ${getTime(
          unitSystem,
          currentWeather.time
        )}`}
      </h2>
    </div>
  );
};