import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCoordinates, getLocation, getTemp, getWeather } from "@/hooks/api";
import { theme } from "@/styles/theme";
import { Chart } from "@/components/Chart";
import ApexChart from "react-apexcharts";
import { Detail } from "@/components/Detail";
import ReactApexChart from "react-apexcharts";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";

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

    const { isLoading: weatherLoading, data: weatherData } = useQuery<WeatherData>({
        queryKey: ["weather"],
        queryFn: () => getWeather(locationData),
        enabled: !!locationData,
    });

    const { isLoading: tempLoading, data: tempData } = useQuery<TempData[]>({
        queryKey: ["temperature"],
        queryFn: () => getTemp(locationData),
        enabled: !!locationData,
    });

    // const [midTemp, setMidTemp] = useState(18);

    // useEffect(() => {
    //     weatherData && setMidTemp(Math.round((+weatherData?.max_tmp + +weatherData?.min_tmp) / 2));
    // }, [weatherData]);

    // locationData && console.log(locationData);
    // weatherData && console.log(weatherData);
    // tempData && console.log(tempData);
    return (
        <div css={wrapper}>
            <Link css={hotIcon} href="/hot">
                <Image src="/hotIcon.svg" width={60} height={60} alt="HotSpot" />
            </Link>
            <section css={mainContainer}>
                <Image css={bgImage} src={"/background.svg"} alt="background" fill />
                {weatherLoading ? (
                    <Image css={weatherIcon} src={"/맑음.svg"} alt="sun" width={90} height={90} />
                ) : weatherData?.rain_pre === "-" ? (
                    <Image css={weatherIcon} src={`/${weatherData?.sky_stts}.svg`} alt="sun" width={90} height={90} />
                ) : (
                    <Image css={weatherIcon} src={"/rain.svg"} alt="etc" width={90} height={90} />
                )}
                <div css={iconList}>
                    <button css={resetIcon}>
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
                                <article css={itemList}>
                                    {weatherData.item.length ? (
                                        weatherData.item.map((itemName: string) => <Image key={itemName} css={item} src={`/${itemName}.svg`} alt="item" height={49} width={73} />)
                                    ) : (
                                        <div>오늘은 준비물이 없네요!</div>
                                    )}
                                </article>
                            </>
                        )
                    )}
                </article>
                <Image css={character} src="/man.svg" alt="설정" width={282} height={211} />
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
                                    <Detail img="lowTemp" title="최저온도" value={weatherData.max_tmp} unit="℃" />
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
    margin-bottom: 100px;
    position: relative;
`;

const chart = css`
    width: fit-content;
    height: 350px;
    display: flex;
    align-items: center;
    gap: 5px;
`;
