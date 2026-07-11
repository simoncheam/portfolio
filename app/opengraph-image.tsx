import { ImageResponse } from "next/og";

export const alt = "Simon Cheam - Full Stack Engineer | Building Agentic AI Systems";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(224, 71%, 4%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "hsl(15, 70%, 65%)",
            opacity: 0.12,
            filter: "blur(120px)",
            top: -200,
            right: -100,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 96,
              color: "hsl(210, 20%, 98%)",
              letterSpacing: -3,
            }}
          >
            Simon Cheam
          </div>
          <div
            style={{
              fontSize: 40,
              color: "hsl(15, 70%, 65%)",
              letterSpacing: 1,
            }}
          >
            Full Stack Engineer | Agentic AI Systems
          </div>
          <div
            style={{
              fontSize: 28,
              color: "hsl(215, 20%, 65%)",
              marginTop: 24,
            }}
          >
            simoncheam.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
