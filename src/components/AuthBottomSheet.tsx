import { css } from "@emotion/react";
import { BottomSheet } from "@qve-ui/qds";
import { SubmitButton } from "./SubmitButton";
import { theme } from "@/styles/theme";
import { Notification, notiText } from "./Notification";
import { useQuery } from "@tanstack/react-query";
import { getCoordinates, getLocation } from "@/hooks/api";

interface IProps {
    isSheet: boolean;
    setIsSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthBottomSheet = ({ isSheet, setIsSheet }: IProps) => {
    const { data: coordsData, isLoading: coordsLoading } = useQuery<any>({
        queryKey: ["coordinates"],
        queryFn: getCoordinates,
    });

    const { data: locationData, isLoading: locationLoading } = useQuery({
        queryKey: ["location"],
        queryFn: () => getLocation(coordsData),
        enabled: !!coordsData,
    });

    const onClick = () => {
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
                    <Notification />
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
