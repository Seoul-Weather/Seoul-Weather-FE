import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
    return (
        <div css={container}>
            <Image css={img} src="/intro.svg" alt="intro" fill />
            <Link css={button} href="/join">
                <Image src="/close.svg" alt="close" width={50} height={50} />
            </Link>
        </div>
    );
}

const container = css`
    position: relative;
    width: 100vw;
    height: 709vw;
`;

const img = css`
    object-fit: cover;
    z-index: -1;
`;

const button = css`
    position: fixed;
    right: 15px;
    top: 15px;
`;
