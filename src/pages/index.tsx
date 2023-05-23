import { css } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <div css={wrapper}>
            <Link href="/join">가입</Link>
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
