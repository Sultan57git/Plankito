import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared share-card layout so every page previews consistently on social and chat apps. */
export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafaf9",
          color: "#0c0c0b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 600 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              border: "3px solid #0c0c0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1f5f4e",
              fontSize: 20,
            }}
          >
            P
          </div>
          Plankito
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#8f8e89" }}>{eyebrow}</div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, marginTop: 18, lineHeight: 1.02 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#5f5e5a", marginTop: 22, maxWidth: 960, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 120, background: "#1f5f4e", borderRadius: 3 }} />
      </div>
    ),
    ogSize,
  );
}
