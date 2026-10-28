import { ImageResponse } from "next/og";

export const alt =
  "AdvenSystem – expertise IT, conseil et portage salarial au Luxembourg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(140deg, #0B2349 0%, #003ABD 65%, #00226E 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-140px",
            top: "-140px",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            border: "2px solid rgba(255,255,255,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "-180px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "rgba(255,140,0,0.18)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #FFC200 0%, #FF785E 100%)",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700, letterSpacing: "0.5px" }}>
            AdvenSystem
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: "900px",
            }}
          >
            Expertise IT &amp; portage salarial au Luxembourg
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "26px",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "820px",
            }}
          >
            Management de projet, AMOA, testing et déploiement d’applications.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>advensystem.lu</span>
          <span>Luxembourg</span>
        </div>
      </div>
    ),
    size,
  );
}
