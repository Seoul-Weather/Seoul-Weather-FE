import { css } from "@emotion/react";
import Image from "next/image";

export default function Custom404() {
    return (
        <div css={container}>
            <Image css={img} src="/notFound.svg" alt="404" fill />
        </div>
    );
}

const container = css`
    width: 100vw;
    height: 100vh;
    position: relative;
`;

const img = css`
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
`;
