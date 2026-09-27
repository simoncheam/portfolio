import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Next 16 only honors qualities listed here; unlisted values silently fall back to 75.
    // 90 is used by the priority hero avatar in components/hero.tsx.
    qualities: [75, 90],
  },
  // Non-secret values the server action needs. AWS credentials come from the
  // Amplify compute role at runtime and must never be listed here: this block
  // is inlined into the build output.
  env: {
    AWS_REGION: process.env.AWS_REGION,
    LAMBDA_FUNCTION_ARN: process.env.LAMBDA_FUNCTION_ARN,
  },
};

export default nextConfig;
