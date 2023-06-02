import { css } from "@emotion/react";
import Image from "next/image";
import { theme } from "@/styles/theme";

export const Notification = () => {
    return (
        <>
            <section css={textSection}>
                <Image src={"/spotIcon.svg"} width={18} height={20} alt="locationIcon" />
                <span css={notiTopic}>위치</span>
                <span css={notiText}>현재 위치의 날씨를 알려드릴게요.</span>
            </section>
            <section css={textSection}>
                <Image src={"/notiIcon.svg"} width={18} height={20} alt="alertIcon" />
                <span css={notiTopic}>알림</span>
                <span css={notiText}>설정한 시간마다 준비물을 알려드릴게요.</span>
            </section>
        </>
    );
};

export const textSection = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const notiTopic = css`
    font-size: ${theme.fontSize.regular};
    margin: 5px 8px;
`;

export const notiText = css`
    color: ${theme.color.grey};
    font-size: ${theme.fontSize.small};
    padding: 10px 0px;
    text-align: left;
`;
