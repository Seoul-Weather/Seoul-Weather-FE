import { Event } from "@/components/Event";
import { Loader } from "@/components/Loader";
import ServerError from "@/components/ServerError";
import { getCoordinates, getLocation, getSpot } from "@/hooks/api";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export interface IData {
    event: string;
    time: string;
    type: string;
    intro: string;
    page: string;
}

export default function Hot() {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("name")) router.replace("/");
    }, []);

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

    const { data, isLoading, isError } = useQuery<IData[]>({
        queryKey: ["hotSpot"],
        queryFn: () => getSpot(locationData),
        enabled: !!locationData,
    });
    data && console.log(data);

    const queryClient = useQueryClient();

    const resetAndRefetchQuery = async () => {
        await queryClient.resetQueries(["coordinates"]);
        await queryClient.resetQueries(["location"]);
        await queryClient.resetQueries(["hotSpot"]);

        queryClient.refetchQueries(["hotSpot"]);
    };

    return (
        <>
            {isError ? (
                <ServerError />
            ) : (
                <div css={container(isLoading)}>
                    <header css={header}>
                        <Image src="hotTitle.svg" alt="title" width={130} height={40} />
                        <div css={iconList}>
                            <Link href="/home">
                                <Image src="/home.svg" alt="설정" width={25} height={25} />
                            </Link>
                            <button css={resetIcon} onClick={resetAndRefetchQuery}>
                                <Image src="/reset.svg" alt="리셋" width={25} height={25} />
                            </button>
                        </div>
                    </header>
                    {isLoading ? (
                        <>
                            <Image css={loadingImg} src="/loading.svg" fill alt="loading" />
                            <Loader />
                        </>
                    ) : (
                        <section css={spotList}>{data && data.map((value) => <Event key={value.event} props={value} />)}</section>
                    )}
                </div>
            )}
        </>
    );
}

const container = (isLoading: boolean) => css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${isLoading ? "center" : "flex-start"};
    position: relative;
`;

const header = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    background-color: #fff;
    padding: 15px;
`;

const iconList = css`
    width: 40%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    gap: 5px;
`;

const resetIcon = css`
    border: none;
    background-color: transparent;
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
    padding-top: 4vh;

    gap: 2vh;
    margin-top: 50px;
`;
