import { Event } from "@/components/hot/Event";
import { Loader } from "@/components/layout/Loader";
import ServerError from "@/components/layout/ServerError";
import { useCoordsQuery } from "@/hooks/queries/useCoordsQuery";
import { useEventQuery } from "@/hooks/queries/useEventQuery";
import { useLocationQuery } from "@/hooks/queries/useLocationQuery";

import { css } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Hot() {
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!localStorage.getItem("name")) router.replace("/");
    }, []);

    const { data: coordsData } = useCoordsQuery();
    const { data: locationData } = useLocationQuery(coordsData);
    const { data: eventData, isLoading: eventLoading, isError: eventError } = useEventQuery(locationData);
    const useRefetch = async () => {
        await queryClient.resetQueries(["coordinates"]);
        await queryClient.resetQueries(["location"]);
        await queryClient.resetQueries(["hotSpot"]);

        queryClient.refetchQueries(["hotSpot"]);
    };

    return (
        <>
            {eventError ? (
                <ServerError />
            ) : (
                <div css={container(eventLoading)}>
                    <header css={header}>
                        <Image src="hotTitle.svg" alt="title" width={130} height={40} />
                        <div css={iconList}>
                            <Link href="/home">
                                <Image src="/home.svg" alt="설정" width={25} height={25} />
                            </Link>
                            <button css={resetIcon} onClick={useRefetch}>
                                <Image src="/reset.svg" alt="리셋" width={25} height={25} />
                            </button>
                        </div>
                    </header>
                    {eventLoading ? (
                        <>
                            <Image css={loadingImg} src="/loading.svg" fill alt="loading" />
                            <Loader />
                        </>
                    ) : (
                        <section css={spotList}>{eventData && eventData.map((value) => <Event key={value.event} props={value} />)}</section>
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
    z-index: 2;
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
    z-index: 3;
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
