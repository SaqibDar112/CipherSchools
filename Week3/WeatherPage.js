import getWeather from '../api/weatherApi';
import WeatherRow from '../components/WeatherRow';
import WeatherSummary from '../components/WeatherSummary';
import { useCallback, useEffect, useState } from "react";


const fetchCoordinates = (callback) => {
    navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
            callback(latitude, longitude)
        },
        (err) => console.error(err)
    );
};
const WeatherPage = () => {
    const [todayWeather, setTodayWeather] = useState({});
    const [weekWeather, setWeekWeather] = useState({});
    const [isCelsius, setIsCelsius] = useState(true);
    const isDay = todayWeather.isDay ?? true;

    useEffect(() => {
        fetchCoordinates(async (latitude, longitude) => {
            const weatherInfo = await getWeather({ latitude, longitude });
            convertToStateVariable(weatherInfo)
        })
    }, []);

    const convertToStateVariable = (tempWeekWeather) => {
        if (!tempWeekWeather || !tempWeekWeather.daily) {
            console.error("Invalid weather data:", tempWeekWeather);
            return;
        }

        let fetchedWeatherInfo = [];
        const { daily, current_weather } = tempWeekWeather;

        // Ensure that daily.time, daily.temperature_2m_max, and other fields exist and are arrays
        if (daily.time && daily.time.length > 0 &&
            daily.temperature_2m_max && daily.temperature_2m_min && daily.weatherCode) {

            for (let i = 0; i < daily.time.length; i++) {
                fetchedWeatherInfo.push({
                    date: new Date(daily.time[i]),
                    maxTemperature: daily.temperature_2m_max[i],
                    minTemperature: daily.temperature_2m_min[i],
                    weatherCode: daily.weatherCode[i],
                });
            }
        } else {
            console.error("Incomplete weather data:", daily);
        }

        setWeekWeather(fetchedWeatherInfo);

        if (current_weather) {
            let currentWeather = current_weather;
            currentWeather.time = new Date(currentWeather.time);
            currentWeather.isDay = currentWeather.is_day === 1;
            delete currentWeather.weathercode;
            setTodayWeather(currentWeather);
        } else {
            console.error("Current weather data is missing:", current_weather);
        }
    };


    return (
        <div className={isDay ? "app" : "app dark"}>
            <h1 className="my-heading">Weather</h1>
            <button className="ui icon btn" onClick={() => {
                console.log("Temperature button was clicked");
            }}
                style={{ float: "right" }}
            >
                &deg;F
            </button>
            <div>
                <WeatherSummary />
                <table className={`ui very basic table${!isDay ? " dark" : ""}`}>
                    <thead className={`table-custom${!isDay ? " dark" : ""}`}>
                        <tr>
                            <th>Date</th>
                            <th>Temperature</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody className="table-custom">
                        <WeatherRow />
                        <WeatherRow />
                        <WeatherRow />
                        <WeatherRow />
                        <WeatherRow />
                        <WeatherRow />
                        <WeatherRow />
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default WeatherPage;