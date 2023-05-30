import { SubmitButton } from "@/components/SubmitButton";
import { css } from "@emotion/react";
import Link from "next/link";

export default function Qna() {
    return (
        <div css={container}>
            <header css={header}>
                <Link href="/setting"></Link>
                <h3 css={title}>문의하기</h3>
                <div></div>
            </header>
            <form css={form}>
                <label css={label} htmlFor="name">
                    이름
                </label>
                <input css={input} />
                <label css={label} htmlFor="name">
                    이메일
                </label>
                <input css={input} />
                <label css={label} htmlFor="name">
                    내용
                </label>
                <input />
            </form>
            <SubmitButton />
        </div>
    );
}

const container = css`
    width: 100vw;
    height: 100vh;
`;
const header = css``;
const back = css``;
const title = css``;
const form = css``;
const input = css``;
const label = css``;
