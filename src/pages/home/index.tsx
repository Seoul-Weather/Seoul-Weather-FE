import { css } from "@emotion/react";
import Link from "next/link";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCoordinates, getLocation, getWeather } from "@/hooks/api";
import { useRecoilValue } from "recoil";
import { locationState } from "@/utils/atom";
import { theme } from "@/styles/theme";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const { data: coordsData, isLoading: coordsLoading } = useQuery<any>({
        queryKey: ["coordinates"],
        queryFn: getCoordinates,
    });

    const { data: locationData, isLoading: locationLoading } = useQuery({
        queryKey: ["location"],
        queryFn: () => getLocation(coordsData),
        enabled: !!coordsData,
    });

    const { isLoading: weatherLoading, data: weatherData } = useQuery(["weather"], getWeather);

    // weatherData && console.log(weatherData, weatherData.items);

    return (
        <div css={wrapper}>
            <section css={mainContainer}>
                <Image css={bgImage} src={"/background.svg"} alt="background" fill />
                <Image css={weatherIcon} src={"/sun.svg"} alt="sun" width={90} height={90} />
                <div css={iconList}>
                    <button css={resetIcon}>
                        <Image src="/reset.svg" alt="설정" width={25} height={25} />
                    </button>
                    <Link href="/setting">
                        <Image css={settingIcon} src="/setting.svg" alt="설정" width={25} height={25} />
                    </Link>
                </div>
                {locationLoading ? (
                    <div>불러오는 중..</div>
                ) : (
                    <article css={weatherInfo}>
                        <span css={location}>{`서울특별시 ${locationData.documents[0].region_2depth_name}`}</span>
                        <h1 css={temperature}>
                            {Math.round(weatherData.temp)}
                            <sup css={unit}>&deg;C</sup>
                        </h1>
                        <article css={itemList}>
                            {weatherData.items.map((itemName: string) => (
                                <Image key={itemName} css={item} src={`/${itemName}.svg`} alt="item" height={49} width={73} />
                            ))}
                        </article>
                    </article>
                )}
                <Image css={character} src="/man.svg" alt="설정" width={282} height={211} />
            </section>
            <section css={detailContainer}>
                <article css={detailInfo}></article>
                <article css={detailInfo}></article>
                <article css={detailInfo}></article>
            </section>
        </div>
    );
}
const wrapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const mainContainer = css`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const bgImage = css`
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
`;

const weatherIcon = css`
    position: absolute;
    top: 70px;
    left: 5%;
`;

const iconList = css`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
    position: absolute;
    top: 0;
    gap: 5px;
`;

const resetIcon = css`
    border: none;
    background-color: transparent;
`;

const settingIcon = css``;

const weatherInfo = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 55px;
`;

const location = css`
    font-size: ${theme.fontSize.regular};
`;

const temperature = css`
    font-size: ${theme.fontSize.temp};
    font-weight: 500;
`;

const unit = css`
    font-size: ${theme.fontSize.regular};
    font-weight: 400;
`;

const itemList = css`
    min-width: 173px;
    width: fit-content;
    height: 70px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

const item = css``;

const character = css`
    margin-bottom: 20%;
`;

const detailContainer = css`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.color.white};
`;

const detailInfo = css``;
