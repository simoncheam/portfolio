import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Next 16 only honors qualities listed here; unlisted values silently fall back to 75.
    // 90 is used by the priority hero avatar in components/hero.tsx.
    qualities: [75, 90],
  },
  env: {
    AWS_REGION: process.env.AWS_REGION,
    LAMBDA_FUNCTION_ARN: process.env.LAMBDA_FUNCTION_ARN,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

  },
};

export default nextConfig;
