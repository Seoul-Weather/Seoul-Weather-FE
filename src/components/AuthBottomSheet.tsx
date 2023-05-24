import { getLocation } from "@/hooks/getLocation";
import { css } from "@emotion/react";
import { BottomSheet } from "@qve-ui/qds";
import Image from "next/image";
import { useState } from "react";

interface IProps {
    isSheet: boolean;
    setIsSheet: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPush: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthBottomSheet = ({ isSheet, setIsSheet, setIsPush }: IProps) => {
    const onClick = () => {
        setIsPush(true);
        setIsSheet(false);
    };
    return (
        <BottomSheet isOpen={isSheet} onClose={() => setIsSheet(false)} xButton={false} ratio={60}>
            <div css={sheet}>
                <h2>
                    서비스 사용을 위해
                    <br />
                    접근 권한을 허용해주세요.
                </h2>
                <section>
                    <span>선택 권한</span>
                    <section>
                        <div>
                            <Image src="" alt="locationIcon" />
                            <span>위치</span>
                            <span>현재 위치의 날씨를 알려드릴게요.</span>
                        </div>
                        <div>
                            <Image src="" alt="alertIcon" />
                            <span>알림</span>
                            <span>설정한 시간마다 준비물을 알려드릴게요.</span>
                        </div>
                    </section>
                </section>
                <span>선택 권한의 경우 허용하지 않아도 서비스를 사용할 수 있으나 일부 서비스 이용이 제한될 수 있습니다.</span>
                <button type="button" onClick={onClick}>
                    확인
                </button>
            </div>
        </BottomSheet>
    );
};

const sheet = css`
    width: 100vw;

    background-color: #fff;
`;
