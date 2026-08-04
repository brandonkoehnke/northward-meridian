import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf8",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "4px solid #a14f2a",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a14f2a",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          N
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}