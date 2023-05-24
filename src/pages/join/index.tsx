import { AuthBottomSheet } from "@/components/AuthBottomSheet";
import { getLocation } from "@/hooks/getLocation";
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
            getLocation();
        }
    };

    useEffect(() => {
        if (isPush) {
            nameInput.current && nameInput.current.setAttribute("disabled", "");
        } else {
            nameInput.current && nameInput.current.removeAttribute("disabled");
        }
    }, [isPush]);

    return (
        <div css={container}>
            <form css={nameForm} onSubmit={onSubmit}>
                <h2 css={formText}>
                    이름을 <br />
                    입력해주세요
                </h2>
                <label htmlFor="nickname">이름</label>
                <input ref={nameInput} type="text" name="nickname" onChange={onChange} value={nickname} placeholder="김상민" required disabled />
                {isPush ? (
                    <div>
                        {" "}
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
                        <label htmlFor="hour">시간</label>
                        <input type="number" name="hour" onChange={onChange} placeholder="8" value={hour} maxLength={2} max="23" min="0" />
                        <input type="number" name="minute" onChange={onChange} placeholder="0" value={minute} max="59" min="0" />
                    </div>
                ) : null}
                <button type="submit">확인</button>
            </form>
            <AuthBottomSheet isSheet={isSheet} setIsSheet={setIsSheet} setIsPush={setIsPush} />
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

const formText = css`
    width: 100%;
`;
