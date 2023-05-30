import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/logo.svg" />
                <meta name="theme-color" content="#5e4036" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
