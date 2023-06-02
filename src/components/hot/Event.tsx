import { IData } from "@/hooks/queries/useEventQuery";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

export const Event = ({ props }: { props: IData }) => {
    const { event, time, type, intro, page } = props;
    let photo = "공연";
    if (type.includes("축제")) photo = "축제";
    if (type.includes("전시")) photo = "전시";
    if (type.includes("체험")) photo = "교육";
    if (type.includes("영화")) photo = "영화";

    return (
        <Link href={page} css={spot}>
            <div css={thumbnailWrapper}>
                <Image css={thumbnail} src={`/${photo}.svg`} alt="thumbnail" fill />
            </div>
            <section css={caption}>
                <h4 css={title}>{event}</h4>
                <span css={context}>{intro}</span>
                <span css={context}>{time}</span>
            </section>
        </Link>
    );
};

const spot = css`
    width: 100%;
    height: 300px;
    border: none;
    /* border: 1px solid brown; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
`;

const thumbnailWrapper = css`
    width: 100%;
    height: 60%;
    position: relative;
`;

const thumbnail = css`
    object-fit: cover;
    z-index: -1;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

const caption = css`
    width: 100%;
    height: 40%;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.8rem;
`;

const title = css``;

const context = css`
    color: ${theme.color.grey_dark};
    font-size: ${theme.fontSize.small};
`;
