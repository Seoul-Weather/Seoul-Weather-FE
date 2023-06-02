import { useQuery } from "@tanstack/react-query";
import { getSpot } from "../api";

export interface IData {
    event: string;
    time: string;
    type: string;
    intro: string;
    page: string;
}

export const useEventQuery = (locationData: string) => {
    return useQuery<IData[]>({
        queryKey: ["event", locationData],
        queryFn: () => getSpot(locationData),
        enabled: !!locationData,
    });
};
