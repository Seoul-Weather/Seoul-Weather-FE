export interface CoordsData {
    longitude: number;
    latitude: number;
}

export const getLocation = async (coordsData: CoordsData) => {
    const { longitude, latitude } = coordsData;
    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
        headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_REST_API_KEY}`,
        },
    });
    return await response.json();
};

export const getCoordinates = () => {
    const options = {
        enableHighAccuracy: false,
        maximumAge: 0,
    };

    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                },
                options
            );
        } else {
            reject(new Error("Geolocation is not supported"));
        }
    });
};

export const getWeather = async (gu: string) => {
    const response = await fetch(`http://43.201.11.125:5001/user/${gu}`);
    return await response.json();
};

export const getSpot = async (gu: string) => {
    const response = await fetch(`http://43.201.11.125:5001/user/event/${gu}`);
    return await response.json();
};

export const getTemp = async () => {
    const response = await fetch("http://43.201.11.125:5001/user/event/동작구");
    return await response.json();
};
