import { Event } from "@/components/Event";
import { Loader } from "@/components/Loader";
import { getCoordinates, getLocation, getSpot } from "@/hooks/api";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export interface IData {
    event: string;
    time: string;
    type: string;
}

export default function Hot() {
    const { data: coordsData, isLoading: coordsLoading } = useQuery<any>({
        queryKey: ["coordinates"],
        queryFn: getCoordinates,
        staleTime: 600000,
    });

    const { data: locationData, isLoading: locationLoading } = useQuery({
        queryKey: ["location"],
        queryFn: () => getLocation(coordsData),
        enabled: !!coordsData,
        select: (location) => location.documents[0].region_2depth_name,
        staleTime: 600000,
    });

    const { data, isLoading } = useQuery<IData[]>({
        queryKey: ["hotSpot"],
        queryFn: () => getSpot(locationData),
        enabled: !!locationData,
    });
    data && console.log(data);

    return (
        <div css={container(isLoading)}>
            {isLoading ? (
                <>
                    <Image css={loadingImg} src="/loading.svg" fill alt="loading" />
                    <Loader />
                </>
            ) : (
                <section css={spotList}>{data && data.map((value) => <Event key={value.event} props={value} />)}</section>
            )}
        </div>
    );
}

const container = (isLoading: boolean) => css`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: ${isLoading ? "center" : "flex-start"};
    position: relative;
`;
const loadingImg = css`
    object-fit: cover;
`;

const spotList = css`
    width: 95%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-top: 2vh;
    gap: 2vh;
`;
