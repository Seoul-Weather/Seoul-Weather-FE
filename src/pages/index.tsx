import { css } from "@emotion/react";
import Link from "next/link";

import Image from "next/image";

export default function Home() {
    return (
        <div css={wrapper}>
            <Image css={bgImage} src={"/assets/background.svg"} alt="background" fill />
            <Link href="/setting">설정</Link>
        </div>
    );
}
const wrapper = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const bgImage = css`
    width: 100vw;
    height: 100vh;
    position: relative;
    object-fit: cover;
`;

const character = css``;
