import { Desktop } from "@/components/Desktop";
import { MediaQuery } from "@/hooks/mediaQuery";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: any) {
    const isMobile = MediaQuery();
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isMobile ? <Component {...pageProps} /> : <Desktop />}
        </>
    );
}
