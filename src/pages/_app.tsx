import { Desktop } from "@/components/Desktop";
import { MediaQuery } from "@/hooks/mediaQuery";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: any) {
    const isMobile = MediaQuery();
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <Head>
                <title>날씨가 어떻든</title>
                <meta name="description" content="서울시의 날씨정보와 함께 날씨에 따른 행사정보를 제공합니다" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <QueryClientProvider client={queryClient}>
                <RecoilRoot>{isMobile ? <Component {...pageProps} /> : <Desktop />}</RecoilRoot>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </>
    );
}
