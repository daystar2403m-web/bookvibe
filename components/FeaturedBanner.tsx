"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useCoverPalette } from "@/hooks/useCoverPalette";

export default function FeaturedBanner({ book }: { book: any }) {
  const palette = useCoverPalette(book.coverUrl);
  const tags = ["Fantastik", "Romantik", "Macera"];

  const backgroundGradient = `linear-gradient(135deg, ${palette.dark} 0%, ${palette.base} 55%, ${palette.dark} 100%)`;

  return (
    <Link href={`/book/${book.id}`}>
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          minHeight: 140,
          isolation: "isolate",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${book.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "blur(18px) saturate(135%)",
            transform: "scale(1.25)",
            transition: "opacity 0.5s ease",
            opacity: palette.ready ? 1 : 0,
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: backgroundGradient,
            opacity: palette.ready ? 0.78 : 1,
            mixBlendMode: palette.ready ? "multiply" : "normal",
            transition: "opacity 0.5s ease",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.55) 100%)`,
          }}
        />

        <div style={{ position: "relative", display: "flex", gap: 12, padding: "16px 13px 14px" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(255,255,255,0.95)",
              borderRadius: 999,
              padding: "3px 9px",
            }}
          >
            <Star size={9} fill={palette.accent} color={palette.accent} strokeWidth={0} />
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: palette.accent,
                fontFamily: "Montserrat",
                letterSpacing: 0.4,
              }}
            >
              GÜNÜN ÖNERİSİ
            </span>
          </div>

          <div style={{ flexShrink: 0, marginTop: 22 }}>
            <img
              src={book.coverUrl}
              style={{
                width: 70,
                height: 104,
                objectFit: "cover",
                borderRadius: 9,
                border: `2px solid ${palette.accent}55`,
                boxShadow: `0 8px 20px -4px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)`,
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 22,
              minWidth: 0,
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 16,
                color: "#fff",
                lineHeight: 1.2,
                margin: 0,
                textShadow: "0 1px 6px rgba(0,0,0,0.35)",
              }}
            >
              {book.title}
            </p>
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 11,
                color: palette.textOnDark,
                marginTop: 3,
              }}
            >
              {book.author}
            </p>

            <div style={{ display: "flex", gap: 5, marginTop: 9, flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 8,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: `${palette.accent}26`,
                    border: `1px solid ${palette.accent}55`,
                    color: palette.textOnDark,
                    fontFamily: "Montserrat",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}