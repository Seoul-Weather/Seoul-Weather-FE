import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoordinates, getLocation, getTemp, getWeather } from "@/hooks/api";
import { theme } from "@/styles/theme";
import { Chart } from "@/components/home/Chart";
import { Detail } from "@/components/home/Detail";
import { Loader } from "@/components/layout/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ServerError from "@/components/layout/ServerError";

interface WeatherData {
    gu: string;
    temp: string;
    sky_stts: string;
    max_tmp: string;
    min_tmp: string;
    rain_pre: string;
    pm10: string;
    pm25: string;
    wind: string;
    sunset: string;
    sunrise: string;
    uv: string;
    humiditiy: string;
    item: string[];
}

export interface TempData {
    FCST_DT: string;
    PRECIPITATION: string;
    PRECPT_TYPE: string;
    RAIN_CHANCE: string;
    SKY_STTS: string;
    TEMP: string;
}

export default function Home() {
    const queryClient = useQueryClient();

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

    const {
        isLoading: weatherLoading,
        data: weatherData,
        isError,
    } = useQuery<WeatherData>({
        queryKey: ["weather"],
        queryFn: () => getWeather(locationData),
        enabled: !!locationData,
    });

    const { isLoading: tempLoading, data: tempData } = useQuery<TempData[]>({
        queryKey: ["temperature"],
        queryFn: () => getTemp(locationData),
        enabled: !!locationData,
    });

    const resetAndRefetchQuery = async () => {
        await queryClient.resetQueries(["coordinates"]);
        await queryClient.resetQueries(["location"]);
        await queryClient.resetQueries(["weather"]);
        await queryClient.resetQueries(["temperature"]);

        queryClient.refetchQueries(["weather", "temperature"]);
    };
    const username = localStorage.getItem("name");
    const items =
        weatherData &&
        weatherData.item.map((value) => {
            if (value === "sunglass") return "선글라스";
            if (value === "suncream") return "썬크림";
            if (value === "umbrella") return "우산";
            if (value === "mask") return "마스크";
        });

    const comment = weatherData && weatherData.item.length ? `${username}님, 외출할 때 ${items?.join(",")} 꼭 챙기세요!` : `${username}님, 오늘은 준비물이 없어요. 좋은하루 보내세요!`;

    // locationData && console.log(locationData);
    // weatherData && console.log(weatherData);
    // tempData && console.log(tempData);
    return (
        <>
            {isError ? (
                <ServerError />
            ) : (
                <div css={wrapper}>
                    <Link css={hotIcon} href="/hot">
                        <Image src="/hotIcon.svg" width={60} height={60} alt="HotSpot" />
                    </Link>
                    <section css={mainContainer}>
                        <Image css={bgImage} quality={100} src={"/background.svg"} alt="background" fill />
                        {weatherLoading ? (
                            <Image css={weatherIcon(true)} quality={100} src={"/맑음.svg"} alt="sun" width={90} height={90} />
                        ) : weatherData?.rain_pre === "-" ? (
                            <Image
                                css={weatherIcon(weatherData?.sky_stts === "맑음" || weatherData?.sky_stts === "구름많음")}
                                quality={100}
                                src={`/${weatherData?.sky_stts}.svg`}
                                alt="sun"
                                width={90}
                                height={90}
                            />
                        ) : (
                            <Image css={weatherIcon(false)} src={"/rain.svg"} alt="etc" width={90} height={90} />
                        )}
                        <div css={iconList}>
                            <button css={resetIcon} onClick={resetAndRefetchQuery}>
                                <Image src="/reset.svg" alt="리셋" width={25} height={25} />
                            </button>
                            <Link href="/setting">
                                <Image css={settingIcon} src="/setting.svg" alt="설정" width={25} height={25} />
                            </Link>
                        </div>
                        <article css={weatherInfo}>
                            {weatherLoading ? (
                                <Loader />
                            ) : (
                                weatherData && (
                                    <>
                                        <span css={location}>{`서울특별시 ${locationData}`}</span>
                                        <h1 css={temperature}>
                                            {parseInt(weatherData.temp)}
                                            <sup css={unit}>&deg;C</sup>
                                        </h1>
                                        {weatherData.item.length ? (
                                            <article css={itemList}>
                                                {weatherData.item.map((itemName: string) => (
                                                    <Image key={itemName} css={item} src={`/${itemName}.svg`} alt="item" height={49} width={73} />
                                                ))}
                                            </article>
                                        ) : null}
                                    </>
                                )
                            )}
                        </article>
                        <div css={character}>
                            <div css={ballon}>{comment}</div>
                            <Image quality={100} src="/man.svg" alt="설정" width={282} height={211} />
                        </div>
                    </section>
                    <section css={detailContainer}>
                        {weatherLoading ? (
                            <Loader />
                        ) : (
                            weatherData && (
                                <>
                                    <article css={detailInfoBox}>
                                        <div css={detailInfoName}>상세 날씨</div>
                                        <article css={detailInfoSmallBox}>
                                            <Detail img="highTemp" title="최고온도" value={weatherData.max_tmp} unit="℃" />
                                            <Detail img="lowTemp" title="최저온도" value={weatherData.min_tmp} unit="℃" />
                                            <Detail img="humanTemp" title="체감온도" value={weatherData.temp} unit="℃" />
                                            <Detail img="uv" title="자외선지수" value={weatherData.uv} unit="" />
                                        </article>
                                        <hr css={hLine} />
                                        <article css={detailInfoSmallBox}>
                                            <Detail img="sunUp" title="일출" value={weatherData.sunrise} unit="" />
                                            <Detail img="sunDown" title="일몰" value={weatherData.sunset} unit="" />
                                            <Detail img="rainAmount" title="강수량" value={weatherData.rain_pre === "-" ? "0" : weatherData.rain_pre} unit="mm" />
                                            <Detail img="humidity" title="습도" value={weatherData.humiditiy} unit="%" />
                                        </article>
                                        <hr css={hLine} />
                                        <article css={detailInfoSmallBox}>
                                            <Detail img="pm" title="미세먼지" value={weatherData.pm10} unit="ppm" />
                                            <Detail img="pm" title="초미세먼지" value={weatherData.pm25} unit="ppm" />
                                            <Detail img="sand" title="황사지수" value="좋음" unit="" />
                                            <Detail img="wind" title="풍속" value={weatherData.wind} unit="m/s" />
                                        </article>
                                    </article>
                                    <article css={chartWrapper}>
                                        <div css={chartName}>시간대별 일기예보</div>
                                        <div css={chartBox}>
                                            <section css={chart}>
                                                {tempData && tempData.map((value) => <Chart key={value.FCST_DT} value={value} high={weatherData.max_tmp} low={weatherData.min_tmp} />)}
                                            </section>
                                        </div>
                                    </article>
                                </>
                            )
                        )}
                    </section>
                </div>
            )}
        </>
    );
}
const wrapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const hotIcon = css`
    position: fixed;
    bottom: 5%;
    right: 5%;
    z-index: 3;
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

const weatherIcon = (isSun: boolean) => css`
    position: absolute;
    top: 70px;
    left: 5%;
    border-radius: ${isSun ? "50%" : 0};
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

const ballon = css`
    /* display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: flex-end;
  
    margin-bottom: 5%;
    color: black;
    border-radius: 5px;
   
    z-index: 21; */
    width: 230px;
    height: 70px;
    background: ${theme.color.white};
    opacity: 0.9;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 0 12.8px;
    z-index: 21;
    left: -20px;
    top: -80px;
    position: absolute;

    border-radius: 15px;
    border: 1px solid #cfd7dd;

    &:after {
        /* content: "";
        border-top: 10px solid ${theme.color.white};
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 0px solid transparent;



        margin-top: 10px; */
        content: "";
        position: absolute;
        bottom: 0;
        right: 58px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top: 10px solid ${theme.color.white};
        border-bottom: 0;
        margin-left: -10px;
        margin-bottom: -10px;
    }
`;

const projectList = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 170px;
    z-index: 21;
    height: 240px;
    right: 70px;
    top: 55px;
    position: absolute;

    border-radius: 0.4em;
    border: 1px solid #cfd7dd;

    &:after {
    }
`;

const character = css`
    margin-bottom: 20%;
    position: relative;
`;

const detailContainer = css`
    width: 100vw;
    background-color: ${theme.color.white};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const detailInfoBox = css`
    width: 90%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px;
    background-color: white;
    margin: 7% 0;
`;

const detailInfoName = css`
    margin-top: 12px;
    margin-left: 10%;
    width: 100%;
    color: ${theme.color.grey_dark};
`;

const hLine = css`
    height: 0px;
    width: 90%;
    border: none;
    border-bottom: 0.5px solid ${theme.color.grey_light};
`;

const detailInfoSmallBox = css`
    width: 93%;
    height: 31%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const chartWrapper = css`
    width: 90%;
    height: 400px;
    background-color: white;
    border: none;
    border-radius: 10px;
    margin-bottom: 100px;
`;
const chartName = css`
    margin-top: 12px;
    margin-left: 4%;
    width: 100%;
    color: ${theme.color.grey_dark};
    position: sticky;
    left: 14px;
`;

const chartBox = css`
    width: 100%;
    height: 350px;
    overflow: auto;
    white-space: nowrap;

    position: relative;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const chart = css`
    width: fit-content;
    height: 350px;
    display: flex;
    align-items: center;
    gap: 5px;
`;
