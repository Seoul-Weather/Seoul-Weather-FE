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

module.exports = {
    ...nextConfig,
    env: {
        NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    },
};
