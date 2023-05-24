export const getLocation = () => {
    console.log("execute");
    const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(position: { coords: { latitude: number; longitude: number } }) {
        console.log("success");
        //좌표를 알아낼 수 있는데, 여기서 알아낸 좌표를 kakaoAPI url에 사용할 것이다.
        console.log("위도 : " + position.coords.latitude);
        console.log("경도: " + position.coords.longitude);
    }

    function error(err: { code: number; message: string }) {
        console.warn("ERROR(" + err.code + "): " + err.message);
        console.log("error");
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
};
