/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    customWorkerDir: "worker",
    runtimeCaching,
});

const nextConfig = withPWA({
    reactStrictMode: false,
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    ...nextConfig,
    env: {
        NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    },
    compress: true,
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === "production";
        const plugins = [...config.plugins];
        return {
            ...config,
            mode: prod ? "production" : "development",
            devtool: prod ? "hidden-source-map" : "eval",
            plugins,
        };
    },
});
