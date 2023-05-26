import { useQuery } from "@tanstack/react-query";
import { getCoordinates, getLocation } from "@/hooks/api";
import { useSetRecoilState } from "recoil";
import { locationState } from "@/utils/atom";

export const useSetLocation = () => {
    const setLocation = useSetRecoilState(locationState);
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

    if (locationLoading) {
        locationData && setLocation(locationData);
    }
};
