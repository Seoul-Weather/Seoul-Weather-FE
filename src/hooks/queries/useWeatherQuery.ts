import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api";

export interface WeatherData {
    gu: string;
    temp: string;
    sky_stts: string;
    max_tmp: string;
    min_tmp: string;
    rain_pre: string;
    pm10: string;
    pm25: string;
    wind: string;
    sunset: string;
    sunrise: string;
    uv: string;
    humiditiy: string;
    item: string[];
}

export const useWeatherQuery = (locationData: string) => {
    return useQuery<WeatherData>({
        queryKey: ["weather", locationData],
        queryFn: () => getWeather(locationData),
        enabled: !!locationData,
    });
};
