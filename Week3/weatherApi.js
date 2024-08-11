import Axios from "axios";

const convertDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
};

const WeatherApiUrl = "https://api.open-meteo.com/v1/forecast";

const getWeather = async ({ latitude, longitude }) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    const { data: weatherInfo } = await Axios.get(WeatherApiUrl, {
        params: {
            latitude,
            longitude,
            current_weather: true,
            timezone: "IST",
            daily: ["temperature_2m_max", "temperature_2m_min", "weathercode"],
            start_date: convertDate(startDate),
            end_date: convertDate(endDate),
        },
    });

    return weatherInfo;
};

export default getWeather;
