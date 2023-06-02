import { useQuery } from "@tanstack/react-query";
import { getTemp } from "../api";

export interface TempData {
    FCST_DT: string;
    PRECIPITATION: string;
    PRECPT_TYPE: string;
    RAIN_CHANCE: string;
    SKY_STTS: string;
    TEMP: string;
}

export const useForecastQuery = (locationData: string) => {
    return useQuery<TempData[]>({
        queryKey: ["temperature", locationData],
        queryFn: () => getTemp(locationData),
        enabled: !!locationData,
    });
};
