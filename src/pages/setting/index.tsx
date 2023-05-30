import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Setting() {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("name")) router.replace("/");
    }, []);

    const reset = () => {
        localStorage.removeItem("name");
        router.push("/intro");
    };
    return (
        <div css={container}>
            <h1 css={header}>설정</h1>

            <section css={section}>
                <strong css={sectionHeader}>앱 설정</strong>
                <Link css={link} href="/join">
                    알림 시간 변경
                </Link>
                <Link css={link} href="">
                    캐릭터 설정 (추후 업데이트 예정)
                </Link>
                <Link css={link} href="">
                    배경 설정 (추후 업데이트 예정)
                </Link>
            </section>
            <section css={section}>
                <strong css={sectionHeader}>계정</strong>
                <Link css={link} href="/join">
                    닉네임 변경
                </Link>
                <div css={link} onClick={reset}>
                    초기화
                </div>
            </section>
            <section css={section}>
                <strong css={sectionHeader}>이용안내</strong>
                <div css={versionWrapper}>
                    <span css={version}>버전 정보</span>
                    <span css={versionInfo}>v1.0.0</span>
                </div>
                <Link css={link} href="setting/qna">
                    문의하기
                </Link>
                <Link css={link} href="">
                    Instagram
                </Link>
                <Link css={link} href="https://github.com/Seoul-Weather">
                    Github
                </Link>
                <Link css={link} href="">
                    오픈소스 라이선스
                </Link>
            </section>
        </div>
    );
}

const container = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 35px;
`;

const header = css`
    font-size: ${theme.fontSize.h2};
    margin-top: 25px;
    margin-left: 10px;
    text-align: left;
    width: 90%;
`;
const section = css`
    width: 90%;
    border: 1px solid ${theme.color.grey_light};
    border-radius: 6px;
    padding: 15px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 8px;
`;
const sectionHeader = css`
    font-size: ${theme.fontSize.regular};
    font-weight: 600;
    margin-bottom: 2px;
`;
const link = css`
    font-size: ${theme.fontSize.small};
`;
const versionWrapper = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: ${theme.fontSize.small};
`;
const version = css``;
const versionInfo = css`
    color: ${theme.color.grey_light};
`;
