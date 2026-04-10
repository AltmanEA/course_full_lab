/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Разрешить кросс-оригин запросы от lab_next в development-режиме
  allowedDevOrigins: process.env.NODE_ENV === 'development' ? ['http://lab_next:3000', 'http://localhost:3000'] : [],
};

export default config;
