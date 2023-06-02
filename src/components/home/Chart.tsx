import { TempData } from "@/hooks/queries/useForecastQuery";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";

export const Chart = ({ value, high, low }: { value: TempData; high?: number; low?: number }) => {
    const { FCST_DT: time, SKY_STTS: stts, TEMP: temp } = value;
    const [h, l, t] = [Number(high), Number(low), Number(temp)];
    const top = (200 / (h - l)) * (h - t);

    return (
        <article css={bar}>
            <div css={info}>
                <span css={timeText}>{`${time.slice(8, 10)}시`}</span>
                <Image src={`/${stts}.svg`} alt="sttr" width={25} height={25} />
            </div>
            <div css={graph}>
                <div css={degree(top)}>
                    <span css={tempText}>
                        {temp}
                        &deg;
                    </span>
                    <span css={line}></span>
                </div>
            </div>
        </article>
    );
};

const bar = css`
    width: 45px;
    height: 350px;
    margin: 0 3px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: black; */
`;

const info = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const timeText = css`
    font-size: ${theme.fontSize.small};
    color: ${theme.color.grey};
`;

const graph = css`
    width: 100%;
    height: 200px;
    position: relative;
    margin-bottom: 100px;
`;

const degree = (top: number) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin: 10px 0;
    top: ${top}px;
`;

const tempText = css``;

const line = css`
    height: 1px;
    width: 60%;
    border-bottom: 2px solid blue;
`;
