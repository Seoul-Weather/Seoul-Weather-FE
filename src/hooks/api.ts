interface Coordinates {
    longitude: number;
    latitude: number;
}

export const getLocation = async ({ longitude, latitude }: Coordinates) => {
    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
        headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_REST_API_KEY}`,
        },
    });
    return await response.json();
};

export const getCoordinates = () => {
    console.log("execute");
    const options = {
        enableHighAccuracy: false,
        maximumAge: 0,
    };
    // const success = (position: { coords: { latitude: number; longitude: number } }) =>  {
    //     //좌표를 알아낼 수 있는데, 여기서 알아낸 좌표를 kakaoAPI url에 사용할 것이다.
    //     // console.log("위도 : " + position.coords.latitude);
    //     // console.log("경도: " + position.coords.longitude);
    //     let { latitude, longitude } = position.coords;
    //     // if (latitude && longitude) {
    //     //     fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
    //     //         headers: {
    //     //             Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_REST_API_KEY}`,
    //     //         },
    //     //     })
    //     //         .then((response) => response.json())
    //     //         .then((data) => console.log(data.documents[0].region_2depth_name));
    //     // }
    // }

    // function error(err: { code: number; message: string }) {
    //     console.warn("ERROR(" + err.code + "): " + err.message);
    //     console.log("error");
    // }

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
