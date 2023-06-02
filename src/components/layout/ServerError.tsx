import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";

export default function ServerError() {
    return (
        <div css={container}>
            <Image css={img} src="/notFound.svg" alt="404" fill />
            <div css={home}>
                서버가 불안정 합니다.
                <br /> 문제가 지속되면 djfqks22@naver.com으로 문의 주세요
            </div>
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
