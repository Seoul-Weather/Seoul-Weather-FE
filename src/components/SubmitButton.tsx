import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

export const SubmitButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button css={submitBtn} type="submit" onClick={onClick}>
            확인
        </button>
    );
};

const submitBtn = css`
    width: 100%;
    height: 54px;
    margin-bottom: 27px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: ${theme.color.primary};
    font-size: ${theme.fontSize.regular};
`;
