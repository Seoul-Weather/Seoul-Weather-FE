import { Desktop } from "@/components/layout/Desktop";
import { MediaQuery } from "@/hooks/mediaQuery";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: any) {
    const isMobile = MediaQuery();
    const [queryClient] = useState(() => new QueryClient());
    // useEffect(() => {
    //     if ("serviceWorker" in navigator) {
    //         navigator.serviceWorker
    //             .register("/sw.js")
    //             .then((registration) => {
    //                 console.log("Service Worker registered with scope:", registration.scope);
    //             })
    //             .catch((error) => {
    //                 console.error("Service Worker registration failed:", error);
    //             });
    //     }
    // }, []);

    return (
        <>
            <Head>
                <title>날씨가 어떻든</title>
                <meta name="description" content="서울시의 날씨정보와 함께 날씨에 따른 행사정보를 제공합니다" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/maskable_icon_x192.png" />
            </Head>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    {isMobile ? <Component {...pageProps} /> : <Desktop />}
                    <ReactQueryDevtools initialIsOpen={true} />
                </QueryClientProvider>
            </RecoilRoot>
        </>
    );
}
