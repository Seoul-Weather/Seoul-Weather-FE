import { css } from "@emotion/react";
import Image from "next/image";

export const Desktop = () => {
    return (
        <div css={container}>
            <Image css={img} src="/desktop.svg" fill alt="desktop" />
        </div>
    );
};

const container = css`
    width: 100vw;
    height: 100vh;
    position: relative;
`;

const img = css`
    object-fit: cover;
`;
