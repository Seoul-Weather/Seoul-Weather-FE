import { css } from "@emotion/react";
import Image from "next/image";

interface IProps {
    img: string;
    title: string;
    value: string;
    unit: string;
}

export const Detail = ({ img, title, value, unit }: IProps) => {
    return (
        <div css={detailInfo}>
            <Image src={`/${img}.svg`} alt="detail" width={40} height={40} />
            <div css={detailCaption}>
                <span css={captionTitle}>{title}</span>
                <span css={captionText}>{value}</span>
            </div>
        </div>
    );
};

const detailInfo = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const detailInfoIcon = css``;

const detailCaption = css`
    display: flex;
    flex-direction: column;
`;

const captionTitle = css``;

const captionText = css``;
