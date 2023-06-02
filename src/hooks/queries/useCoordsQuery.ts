import { useQuery } from "@tanstack/react-query";
import { getCoordinates } from "../api";

export const useCoordsQuery = () => {
    return useQuery<any>({
        queryKey: ["coordinates"],
        queryFn: getCoordinates,
        staleTime: 600000,
    });
};
