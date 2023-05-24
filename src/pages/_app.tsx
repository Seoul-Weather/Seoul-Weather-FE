import { Desktop } from "@/components/Desktop";
import { MediaQuery } from "@/hooks/mediaQuery";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

export default function App({ Component, pageProps }: any) {
    const isMobile = MediaQuery();
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <QueryClientProvider client={queryClient}>{isMobile ? <Component {...pageProps} /> : <Desktop />}</QueryClientProvider>
        </>
    );
}
