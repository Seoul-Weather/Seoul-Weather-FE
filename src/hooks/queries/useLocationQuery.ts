import { useQuery } from "@tanstack/react-query";
import { CoordsData, getLocation } from "../api";

export const useLocationQuery = (coordsData: CoordsData) => {
    return useQuery({
        queryKey: ["location", coordsData],
        queryFn: () => getLocation(coordsData),
        enabled: !!coordsData,
        select: (location) => location.documents[0].region_2depth_name,
        staleTime: 600000,
    });
};
