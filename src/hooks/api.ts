export const getLocation = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    return fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
        headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_REST_API_KEY}`,
        },
    }).then((response) => response.json());
};
