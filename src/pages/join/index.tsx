import { AuthBottomSheet } from "@/components/AuthBottomSheet";
import { Notification, notiText } from "@/components/Notification";
import { SubmitButton } from "@/components/SubmitButton";

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Join() {
    const [nickname, setNickname] = useState("");
    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);

    const [isSheet, setIsSheet] = useState(false);
    const [isPush, setIsPush] = useState(false);
    const nameInput = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value }: { name: string; value: string | number } = event.target;
        if (name === "nickname") {
            setNickname(value);
        } else if (name === "hour") {
            if (value.toString().length > 1 && value[0] === "0") {
                value = Number(value.toString().slice(1));
            }

            if (value.toString().length > 2) {
                value = Number(value.toString().slice(0, 2));
            }

            if (+value > 23) {
                value = 23;
            }
            setHour(value === "" ? 0 : parseFloat(value.toString()));
            // Number(value.toString().replace(/(^0+)/, ""))
        } else if (name === "minute") {
            if (value.toString().length > 1 && value[0] === "0") {
                value = Number(value.toString().slice(1));
            }

            if (value.toString().length > 2) {
                value = Number(value.toString().slice(0, 2));
            }

            if (+value > 59) {
                value = 59;
            }
            setMinute(+value);
        }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isPush) {
            router.push("/");
            window.localStorage.setItem("hour", hour + "");
            window.localStorage.setItem("minute", minute + "");
        } else {
            window.localStorage.setItem("name", nickname);
            setIsSheet(true);
            setIsPush(true);
        }
    };
    return (
        <div css={container}>
            <form css={nameForm} onSubmit={onSubmit}>
                {isPush ? (
                    <div css={inputWrapper}>
                        <label css={pushNameLabel} htmlFor="nickname">
                            이름
                        </label>
                        <input css={nicknameInput} ref={nameInput} type="text" name="nickname" onChange={onChange} value={nickname} placeholder="김상민" required disabled />
                        <section>
                            <Notification />
                        </section>
                        <div css={notiText}>알림 시간 설정</div>
                        <div css={timeWrapper}>
                            <div>
                                <input css={timeInput} type="number" name="hour" onChange={onChange} placeholder="8" value={hour} maxLength={2} max="23" min="0" />
                                <span>시</span>
                            </div>
                            <div>
                                <input css={timeInput} type="number" name="minute" onChange={onChange} placeholder="0" value={minute} max="59" min="0" />
                                <span>분</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div css={inputWrapper}>
                        <h2 css={formText}>
                            이름을 <br />
                            입력해주세요
                        </h2>
                        <label css={nameLabel} htmlFor="nickname">
                            이름
                        </label>
                        <input css={nicknameInput} ref={nameInput} type="text" name="nickname" onChange={onChange} value={nickname} placeholder="김상민" required />
                    </div>
                )}

                <SubmitButton />
            </form>
            {isPush ? <AuthBottomSheet isSheet={isSheet} setIsSheet={setIsSheet} /> : null}
        </div>
    );
}

const container = css`
    max-width: 480px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const nameForm = css`
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const pushForm = css`
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 5%;
`;

const inputWrapper = css`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const formText = css`
    width: 100%;
    margin: 40px 0;
    font-size: ${theme.fontSize.h3};
    font-weight: 500;
`;

const nameLabel = css`
    font-size: ${theme.fontSize.small};
    color: ${theme.color.grey};
`;

const pushNameLabel = css`
    font-size: ${theme.fontSize.small};
    color: ${theme.color.grey};
    margin-top: 10%;
`;

const nicknameInput = css`
    height: 48px;
    border: none;
    border-bottom: 2px solid ${theme.color.primary};
    font-size: 20px;
    &:focus {
        border-bottom: 2px solid ${theme.color.primary_dark};
    }
    background-color: transparent;
`;

const timeWrapper = css`
    height: fit-content;
    width: 100%;
    border-bottom: 2px solid ${theme.color.primary_dark};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.fontSize.medium};
    padding: 3px 0;
    gap: 25%;
`;

const timeInput = css`
    border: none;
    color: ${theme.color.grey};
    &:focus {
        color: black;
    }
`;
