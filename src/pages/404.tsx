import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
    return (
        <div css={container}>
            <Image css={img} src="/notFound.svg" alt="404" fill />
            <Link href="/">
                <div css={home}>홈으로 돌아가기</div>
            </Link>
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

const home = css`
    width: 100vw;
    color: ${theme.color.white};
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 20%;
`;
