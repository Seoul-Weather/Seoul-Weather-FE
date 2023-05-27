import { getCoordinates, getLocation, getSpot } from "@/hooks/api";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface IData {
    title: string;
    address: string;
    due: string;
}

export default function Hot() {
    const { data: coordsData, isLoading: coordsLoading } = useQuery<any>({
        queryKey: ["coordinates"],
        queryFn: getCoordinates,
        staleTime: Infinity,
    });

    const { data: locationData, isLoading: locationLoading } = useQuery({
        queryKey: ["location"],
        queryFn: () => getLocation(coordsData),
        enabled: !!coordsData,
        select: (location) => location.documents[0].region_2depth_name,
        staleTime: Infinity,
    });

    const { data, isLoading } = useQuery<any>({
        queryKey: ["hotSpot"],
        queryFn: () => getSpot(locationData),
        enabled: !!locationData,
    });

    return (
        <div css={container}>
            {isLoading ? (
                "loading..."
            ) : (
                <section css={spotList}>
                    {data &&
                        data.map((value: any) => (
                            <article css={spot} key={value.title}>
                                <Image css={thumbnail} src="" alt="thumbnail" />
                                <section css={caption}>
                                    <h4 css={title}>{value.title}</h4>
                                    <span css={context}>{value.address}</span>
                                    <span css={context}>{value.due}</span>
                                </section>
                            </article>
                        ))}
                </section>
            )}
        </div>
    );
}

const container = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
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

const spot = css`
    width: 100%;
    height: 31vh;
    /* border: none; */
    border: 1px solid brown;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

const thumbnail = css`
    width: 100%;
    height: 64%;
`;

const caption = css`
    width: 100%;
    height: 36%;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 0.8rem;
    border-top: 1px solid brown; //test
`;

const title = css``;

const context = css`
    color: ${theme.color.grey_dark};
    font-size: ${theme.fontSize.small};
`;
