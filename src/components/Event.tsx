import { IData } from "@/pages/hot";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";

export const Event = ({ props }: { props: IData }) => {
    const { event, time, type } = props;
    let photo = "공연";
    if (type.includes("축제")) photo = "축제";
    if (type.includes("전시")) photo = "전시";
    if (type.includes("체험")) photo = "교육";
    if (type.includes("영화")) photo = "영화";

    return (
        <article css={spot}>
            <div css={thumbnailWrapper}>
                <Image css={thumbnail} src={`/${photo}.svg`} alt="thumbnail" fill />
            </div>
            <section css={caption}>
                <h4 css={title}>{event}</h4>
                {/* <span css={context}>{address}</span> */}
                <span css={context}>{time}</span>
            </section>
        </article>
    );
};

const spot = css`
    width: 100%;
    height: 31vh;
    border: none;
    /* border: 1px solid brown; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
`;

const thumbnailWrapper = css`
    width: 100%;
    height: 64%;
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
    height: 36%;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 0.8rem;
    border-top: 1px solid brown; //test
`;

const title = css``;

const context = css`
    color: ${theme.color.grey_dark};
    font-size: ${theme.fontSize.small};
`;
