"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_BOOKS } from "@/lib/mockBooks";
import BottomNav from "@/components/BottomNav";
import {
  ChevronLeft,
  MoreHorizontal,
  Star,
  Heart,
  Bookmark,
  BookOpen,
  ChevronRight,
  Play,
} from "lucide-react";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const found = MOCK_BOOKS.find((b) => b.id === id);
    setBook(found || MOCK_BOOKS[0]);
  }, [id]);

  if (!book) return null;

  const tags = ["Fantastik", "Romantik", "Macera"];

  const chapters = [
    { title: "Gece Yarısı Kütüphanesi", progress: 100 },
    { title: "Seçimler ve Pişmanlıklar", progress: 60 },
    { title: "Farklı Hayatlar", progress: 20 },
    { title: "Gerçekle Yüzleşme", progress: 0 },
    { title: "En İyi Hayat", progress: 0 },
  ];

  const media = [
    { type: "video", label: "Tanıtım Videosu", sub: "1:32", img: "https://picsum.photos/seed/m1/200/140" },
    { type: "video", label: "Yazar Röportajı", sub: "4:18", img: "https://picsum.photos/seed/m2/200/140" },
    { type: "image", label: "Kitaptan Alıntılar", sub: "12 görsel", img: "https://picsum.photos/seed/m3/200/140" },
    { type: "image", label: "Okuyucu Fotoğrafları", sub: "23 fotoğraf", img: "https://picsum.photos/seed/m4/200/140" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "Montserrat, sans-serif",
        paddingBottom: 90,
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 16px 0",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
        >
          <ChevronLeft size={24} color="#1a1a2e" strokeWidth={2.2} />
        </button>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
          <MoreHorizontal size={22} color="#1a1a2e" />
        </button>
      </div>

      {/* HERO: COVER + INFO */}
      <div style={{ display: "flex", gap: 18, padding: "12px 16px 0" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={book.coverUrl}
            style={{
              width: 150,
              height: 215,
              objectFit: "cover",
              borderRadius: 8,
              boxShadow: "0 12px 30px -8px rgba(0,0,0,0.25)",
            }}
          />
          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: -18,
              left: -18,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#f6e9d8",
              border: "2px solid #e8d4b8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 6.5, fontWeight: 700, color: "#8a6d3b", lineHeight: 1.3 }}>
              GOODREADS<br />EN İYİ<br />KURGU<br />2021
            </span>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0, paddingTop: 6 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.2, margin: 0 }}>
            {book.title}
          </h1>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#feb0c1", marginTop: 4 }}>
            {book.author}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <Star size={15} fill="#feb0c1" color="#feb0c1" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>4.6</span>
            <span style={{ fontSize: 12, color: "#adb5bd" }}>|</span>
            <span style={{ fontSize: 12, color: "#6c757d" }}>96B değerlendirme</span>
          </div>
        </div>
      </div>

      {/* TAGS */}
      <div style={{ display: "flex", gap: 8, padding: "16px 16px 0", flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "7px 16px",
              borderRadius: 999,
              background: "#feeaee",
              color: "#1a1a2e",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* QUOTE */}
      <p
        style={{
          fontSize: 15,
          fontStyle: "italic",
          color: "#1a1a2e",
          lineHeight: 1.5,
          padding: "16px 16px 0",
          margin: 0,
          fontWeight: 500,
        }}
      >
        "İnsan bir kutu kibrite benzer.<br />Varolur, yanar ve söner."
      </p>

      {/* ACTION ROW */}
      <div style={{ display: "flex", gap: 10, padding: "18px 16px 0" }}>
        <button
          onClick={() => router.push(`/book/${book.id}?mode=read&chapter=0`)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#feb0c1",
            border: "none",
            borderRadius: 16,
            padding: "13px 0",
            color: "#1a1a2e",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <BookOpen size={16} />
          Okumaya Başla
        </button>
        <button
          onClick={() => setLiked(!liked)}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#fef0f2",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Heart size={18} color="#1a1a2e" fill={liked ? "#1a1a2e" : "none"} />
        </button>
        <button
          onClick={() => setSaved(!saved)}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#fef0f2",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Bookmark size={18} color="#1a1a2e" fill={saved ? "#1a1a2e" : "none"} />
        </button>
      </div>

      {/* AUTHOR CARD */}
      <div style={{ padding: "22px 16px 0" }}>
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#f8f9fa",
            borderRadius: 16,
            padding: 14,
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <img
            src="https://picsum.photos/seed/matthaig/80/80"
            style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{book.author}</p>
            <p style={{ fontSize: 11.5, color: "#6c757d", lineHeight: 1.5, margin: "4px 0 0" }}>
              {book.author}, İngiliz yazar ve gazetecidir. Romanları, denemeleri ve çocuk kitaplarıyla tanınır. {book.title}, onun en çok okunan eserlerinden biridir.
            </p>
          </div>
          <ChevronRight size={18} color="#adb5bd" style={{ flexShrink: 0 }} />
        </button>
      </div>

      {/* ABOUT + CHAPTERS */}
      <div style={{ display: "flex", gap: 16, padding: "22px 16px 0", alignItems: "flex-start" }}>
        {/* About */}
        <div style={{ flex: 1.1, minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", marginBottom: 10 }}>
            Kitap Hakkında
          </h3>
          <p style={{ fontSize: 12, color: "#495057", lineHeight: 1.7 }}>
            Nora Seed, hayatının en karanlık anında kendini gece yarısı kütüphanesinde bulur. Bu kütüphane, pişmanlık duyduğu hayat seçimlerinin farklı olasılıklarını keşfetmesine olanak tanır.
          </p>
          <p style={{ fontSize: 12, color: "#495057", lineHeight: 1.7, fontStyle: "italic", marginTop: 10 }}>
            Her kitap, başka bir yaşamdır. Peki ya en iyi hayat, aslında yaşadığımız hayat ise?
          </p>
        </div>

        {/* Chapters */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Bölümler</h3>
            <ChevronRight size={16} color="#adb5bd" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {chapters.map((ch, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: "#1a1a2e", fontWeight: 500 }}>
                    {i + 1}. {ch.title}
                  </span>
                  <span style={{ fontSize: 11, color: "#6c757d", fontWeight: 600 }}>%{ch.progress}</span>
                </div>
                <div style={{ height: 4, background: "#f1f3f5", borderRadius: 999, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${ch.progress}%`,
                      background: "#feb0c1",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MEDIA & GALLERY */}
      <div style={{ padding: "26px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Medya ve Görseller</h3>
          <ChevronRight size={16} color="#adb5bd" />
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {media.map((m, i) => (
            <div key={i} style={{ flexShrink: 0, width: 130 }}>
              <div
                style={{
                  position: "relative",
                  width: 130,
                  height: 92,
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#1a1a2e",
                }}
              >
                <img
                  src={m.img}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                />
                {m.type === "video" && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Play size={14} color="#1a1a2e" fill="#1a1a2e" />
                    </div>
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "16px 8px 6px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  }}
                >
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: "#fff", margin: 0 }}>{m.label}</p>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", margin: "1px 0 0" }}>{m.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}