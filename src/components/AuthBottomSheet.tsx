import { css } from "@emotion/react";
import { BottomSheet } from "@qve-ui/qds";
import Image from "next/image";
import spotIcon from "@/assets/spotIcon.svg";
import notiIcon from "@/assets/notiIcon.svg";
import { SubmitButton } from "./SubmitButton";
import { theme } from "@/styles/theme";
import { getGeoLocation } from "@/hooks/getGeoLocation";

interface IProps {
    isSheet: boolean;
    setIsSheet: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPush: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthBottomSheet = ({ isSheet, setIsSheet, setIsPush }: IProps) => {
    const onClick = () => {
        getGeoLocation();
        setIsPush(true);
        setIsSheet(false);
    };
    return (
        <BottomSheet isOpen={isSheet} onClose={() => setIsSheet(false)} xButton={false} ratio={60}>
            <div css={sheet}>
                <section css={notiSection}>
                    <h2 css={header}>
                        서비스 사용을 위해
                        <br />
                        접근 권한을 허용해주세요.
                    </h2>
                    <span css={notiText}>선택 권한</span>
                    <section css={textSection}>
                        <Image src={spotIcon} width={18} height={20} alt="locationIcon" />
                        <span css={notiTopic}>위치</span>
                        <span css={notiText}>현재 위치의 날씨를 알려드릴게요.</span>
                    </section>
                    <section css={textSection}>
                        <Image src={notiIcon} width={18} height={20} alt="alertIcon" />
                        <span css={notiTopic}>알림</span>
                        <span css={notiText}>설정한 시간마다 준비물을 알려드릴게요.</span>
                    </section>
                </section>
                <section>
                    <div css={notiText}>선택 권한의 경우 허용하지 않아도 서비스를 사용할 수 있으나 일부 서비스 이용이 제한될 수 있습니다.</div>
                    <SubmitButton onClick={onClick} />
                </section>
            </div>
        </BottomSheet>
    );
};

const sheet = css`
    width: 100vw;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const notiSection = css`
    margin-top: 10px;
`;

const header = css`
    font-size: ${theme.fontSize.large};
    margin-bottom: 20px;
`;

const textSection = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const notiTopic = css`
    font-size: ${theme.fontSize.regular};
    margin: 5px 8px;
`;

const notiText = css`
    color: ${theme.color.grey};
    font-size: ${theme.fontSize.small};
    padding: 10px 0px;
    text-align: left;
`;
