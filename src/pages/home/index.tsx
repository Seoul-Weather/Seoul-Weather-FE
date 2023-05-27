import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCoordinates, getLocation, getTemp, getWeather } from "@/hooks/api";
import { theme } from "@/styles/theme";
import { Chart } from "@/components/Chart";
import ApexChart from "react-apexcharts";
import { Detail } from "@/components/Detail";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "@/utils/atom";
// import { useEffect, useState } from "react";

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

export default function Home() {
    const [gu, setGu] = useRecoilState(locationState);

    const { data: coordsData, isLoading: coordsLoading } = useQuery<any>({
        queryKey: ["coordinates"],
        queryFn: getCoordinates,
    });

    const { data: locationData, isLoading: locationLoading } = useQuery({
        queryKey: ["location"],
        queryFn: () => getLocation(coordsData),
        enabled: !!coordsData,
        select: (location) => location.documents[0].region_2depth_name,
        staleTime: Infinity,
    });

    const { isLoading: weatherLoading, data: weatherData } = useQuery<WeatherData>({
        queryKey: ["weather"],
        queryFn: () => getWeather(locationData),
        enabled: !!locationData,
    });

    const { isLoading: tempLoading, data: tempData } = useQuery({
        queryKey: ["temperature"],
        queryFn: () => getTemp(locationData),
        enabled: !!locationData,
    });

    useEffect(() => {
        setGu("마포구");
    }, []);

    // locationData && console.log(locationData);
    // weatherData && console.log(weatherData);
    // tempData && console.log(tempData);
    return (
        <div css={wrapper}>
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
                        <Image src="/reset.svg" alt="설정" width={25} height={25} />
                    </button>
                    <Link href="/setting">
                        <Image css={settingIcon} src="/setting.svg" alt="설정" width={25} height={25} />
                    </Link>
                </div>
                {weatherLoading ? (
                    <>
                        <div>불러오는 중..</div>
                    </>
                ) : (
                    <article css={weatherInfo}>
                        <span css={location}>{`서울특별시 ${locationData}`}</span>
                        <h1 css={temperature}>
                            {weatherData && parseInt(weatherData.temp)}
                            <sup css={unit}>&deg;C</sup>
                        </h1>
                        <article css={itemList}>
                            {/* {weatherData.items.map((itemName: string) => (
                                <Image key={itemName} css={item} src={`/${itemName}.svg`} alt="item" height={49} width={73} />
                            ))} */}
                        </article>
                    </article>
                )}
                <Image css={character} src="/man.svg" alt="설정" width={282} height={211} />
            </section>
            <section css={detailContainer}>
                {weatherLoading ? (
                    <div>loading..</div>
                ) : (
                    weatherData && (
                        <article css={detailInfoBox}>
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
                    )
                )}

                <div>
                    {/* <Chart location={{ tempLoading, tempData }} /> */}
                    <div>
                        {/* {tempLoading ? (
                            "Loading chart..."
                        ) : (

                            <ApexChart
                                type="bar"
                                series={[
                                    {
                                        name: "sales",
                                        data: [
                                            {
                                                x: "2019/01/01",
                                                y: 400,
                                            },
                                            {
                                                x: "2019/04/01",
                                                y: 430,
                                            },
                                            {
                                                x: "2019/07/01",
                                                y: 448,
                                            },
                                            {
                                                x: "2019/10/01",
                                                y: 470,
                                            },
                                            {
                                                x: "2020/01/01",
                                                y: 540,
                                            },
                                            {
                                                x: "2020/04/01",
                                                y: 580,
                                            },
                                            {
                                                x: "2020/07/01",
                                                y: 690,
                                            },
                                            {
                                                x: "2020/10/01",
                                                y: 690,
                                            },
                                        ],
                                    },
                                ]}
                                options={{
                                    chart: {
                                        type: "bar",
                                        height: 380,
                                    },
                                    xaxis: {
                                        type: "category",
                                        // labels: {
                                        //     formatter: function (val) {
                                        //         return "Q" + dayjs(val).quarter();
                                        //     },
                                        // },
                                        group: {
                                            style: {
                                                fontSize: "10px",
                                                fontWeight: 700,
                                            },
                                            groups: [
                                                { title: "2019", cols: 4 },
                                                { title: "2020", cols: 4 },
                                            ],
                                        },
                                    },
                                    title: {
                                        text: "Grouped Labels on the X-axis",
                                    },
                                    // tooltip: {
                                    //     x: {
                                    //         formatter: function (val) {
                                    //             return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY");
                                    //         },
                                    //     },
                                    // },
                                }}
                            />
                        )} */}
                    </div>
                </div>
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

const hLine = css`
    height: 0px;
    width: 90%;
    border: none;
    border-bottom: 0.5px solid ${theme.color.grey_light};
`;

const detailInfoSmallBox = css`
    width: 93%;
    height: 33%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
