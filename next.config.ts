import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    AWS_REGION: process.env.AWS_REGION,
    LAMBDA_FUNCTION_ARN: process.env.LAMBDA_FUNCTION_ARN,

  },
};

export default nextConfig;
