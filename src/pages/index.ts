import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RootRouter() {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("name")) {
            router.push("/home");
        } else {
            router.push("/intro");
        }
    }, []);
}
