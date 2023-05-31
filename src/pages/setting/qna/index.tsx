import { SubmitButton } from "@/components/SubmitButton";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

export default function Qna() {
    return (
        <div css={container}>
            <header css={header}>
                <Link href="/setting">
                    <Image src="/back.svg" width={40} height={40} alt="back" />
                </Link>
                <h3 css={title}>문의하기</h3>
                <div
                    css={css`
                        width: 40px;
                        height: 40px;
                    `}
                ></div>
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
                <input css={content} />
            </form>
            <SubmitButton />
        </div>
    );
}

const container = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;
const header = css`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const back = css``;
const title = css``;
const form = css`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
`;
const input = css`
    border: 1px solid ${theme.color.grey};
    border-radius: 10px;
    height: 40px;
`;
const label = css`
    font-size: ${theme.fontSize.regular};
    margin-top: 15px;
`;

const content = css`
    border: 1px solid ${theme.color.grey};
    border-radius: 10px;
    height: 200px;
    display: flex;
    align-items: flex-start;
`;
