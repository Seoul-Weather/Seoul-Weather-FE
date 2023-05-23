import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function MediaQuery() {
    const [isMobile, setIsMobile] = useState(false);
    const mobile = useMediaQuery({ query: "(max-width:480px)" });

    useEffect(() => {
        setIsMobile(mobile);
    }, [mobile]);

    return isMobile;
}
