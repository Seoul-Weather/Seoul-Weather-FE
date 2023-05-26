import { useQuery } from "@tanstack/react-query";
import { getCoordinates, getLocation } from "@/hooks/api";

export const useSetLocation = () => {
    const {
        data: coordsData,
        isLoading: coordsLoading,
        isError: coordsError,
    } = useQuery<any>({
        queryKey: ["coordinates"],
        queryFn: getCoordinates,
    });

    const {
        data: locationData,
        isLoading: locationLoading,
        isError: locationError,
    } = useQuery({
        queryKey: ["location"],
        queryFn: () => getLocation(coordsData),
        enabled: !!coordsData,
    });
};
