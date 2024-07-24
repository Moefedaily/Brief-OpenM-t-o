import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const configPath = path.join(process.cwd(), "config.json");
  const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));

  const { city, latitude, longitude } = configData;

  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
  );
  const data = await getWeatherData.json();
  console.log(" the Data are ", JSON.stringify(data, null, 2));
  data.city = city;
  res.status(200).json(data);
}
