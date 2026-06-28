"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_BOOKS } from "@/lib/mockBooks";
import BottomNav from "@/components/BottomNav";
import { useCoverPalette } from "@/lib/hooks/useCoverPalette";
import {
  ChevronLeft,
  MoreHorizontal,
  Star,
  Heart,
  Bookmark,
  BookOpen,
  ChevronRight,
  Plus,
  Eye,
  ThumbsUp,
  X,
} from "lucide-react";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeBoard, setActiveBoard] = useState<any>(null);
  const [creatingBoard, setCreatingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [boards, setBoards] = useState<any[]>([]);

  useEffect(() => {
    const found = MOCK_BOOKS.find((b) => b.id === id);
    setBook(found || MOCK_BOOKS[0]);
  }, [id]);

  const palette = useCoverPalette(book?.coverUrl || "");

  if (!book) return null;

  const tags = ["Fantastik", "Romantik", "Macera"];

  const chapters = [
    { title: "Gece Yarısı Kütüphanesi", progress: 100, likes: "14.2K" },
    { title: "Seçimler ve Pişmanlıklar", progress: 60, likes: "9.8K" },
    { title: "Farklı Hayatlar", progress: 20, likes: "6.1K" },
    { title: "Gerçekle Yüzleşme", progress: 0, likes: "3.4K" },
    { title: "En İyi Hayat", progress: 0, likes: "2.7K" },
  ];

  const boardImages = [
    "https://picsum.photos/seed/board1/400/400",
    "https://picsum.photos/seed/board2/400/400",
    "https://picsum.photos/seed/board3/400/400",
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
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
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

          {/* Yazar profili - kullanıcı adı + foto, siyah */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#1a1a2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>
                {book.author?.[0] ?? "Y"}
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>
              @{book.author?.toLowerCase().replace(/\s+/g, "") ?? "yazar"}
            </span>
          </div>

          {/* İstatistikler */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={14} fill="#feb0c1" color="#feb0c1" />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1a1a2e" }}>4.6</span>
            </div>
            <Dot />
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Eye size={13} color="#6c757d" />
              <span style={{ fontSize: 12, color: "#6c757d" }}>96B okunma</span>
            </div>
            <Dot />
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <BookOpen size={13} color="#6c757d" />
              <span style={{ fontSize: 12, color: "#6c757d" }}>{chapters.length} bölüm</span>
            </div>
          </div>
        </div>
      </div>

      {/* TAGS - kapak rengine uyumlu */}
      <div style={{ display: "flex", gap: 8, padding: "16px 16px 0", flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "7px 16px",
              borderRadius: 999,
              background: `${palette.accent}22`,
              color: palette.dark,
              border: `1px solid ${palette.accent}55`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ACTION ROW */}
      <div style={{ display: "flex", gap: 10, padding: "20px 16px 0" }}>
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
          onClick={() => setSaved(!saved)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: saved ? "#1a1a2e" : "#fef0f2",
            border: "none",
            borderRadius: 16,
            padding: "13px 0",
            color: saved ? "#fff" : "#1a1a2e",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={16} />
          Kütüphaneye Ekle
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
      </div>

      {/* BÖLÜMLER */}
      <div style={{ padding: "26px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Bölümler</h3>
          <ChevronRight size={16} color="#adb5bd" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {chapters.map((ch, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#1a1a2e", fontWeight: 500 }}>
                  {i + 1}. {ch.title}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <ThumbsUp size={11} color="#adb5bd" />
                  <span style={{ fontSize: 11, color: "#6c757d", fontWeight: 600 }}>{ch.likes}</span>
                </div>
              </div>
              <div style={{ height: 4, background: "#f1f3f5", borderRadius: 999, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${ch.progress}%`,
                    background: palette.accent,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KİTAP PANOSU */}
      <div style={{ padding: "26px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Kitap Panosu</h3>
          <button
            onClick={() => setCreatingBoard(true)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
          >
            <Plus size={14} color="#1a1a2e" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>Yeni Pano</span>
          </button>
        </div>

        <button
          onClick={() => setGalleryOpen(true)}
          style={{
            position: "relative",
            width: "100%",
            height: 110,
            borderRadius: 16,
            overflow: "hidden",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
          }}
        >
          {boardImages.map((img, i) => (
            <div key={i} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.15)",
            }}
          />
        </button>

        {/* Kullanıcı tarafından oluşturulan panolar */}
        {boards.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {boards.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBoard(b)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#fafafa",
                  border: "1px solid #f1f3f5",
                  borderRadius: 14,
                  padding: 10,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", width: 60, height: 44, flexShrink: 0 }}>
                  {b.images.slice(0, 2).map((img: string, i: number) => (
                    <img key={i} src={img} style={{ width: "50%", height: "100%", objectFit: "cover" }} />
                  ))}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{b.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* GALLERY OVERLAY */}
      {galleryOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px 16px" }}>
            <button
              onClick={() => setGalleryOpen(false)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} color="#fff" />
            </button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 0 20px" }}>
            {boardImages.map((img, i) => (
              <div key={i} style={{ flex: 1, overflow: "hidden" }}>
                <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PANO DETAY OVERLAY */}
      {activeBoard && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            zIndex: 100,
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 16px" }}>
            <button onClick={() => setActiveBoard(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <ChevronLeft size={24} color="#1a1a2e" />
            </button>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{activeBoard.name}</p>
            <div style={{ width: 24 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 16px 30px" }}>
            {activeBoard.images.map((img: string, i: number) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: i === 0 ? "1/1.2" : "1/1" }}>
                <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* YENİ PANO OLUŞTURMA OVERLAY */}
      {creatingBoard && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={() => setCreatingBoard(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              background: "#fff",
              borderRadius: "24px 24px 0 0",
              padding: "20px 16px 32px",
            }}
          >
            <div style={{ width: 36, height: 4, background: "#dee2e6", borderRadius: 999, margin: "0 auto 18px" }} />
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 14 }}>Yeni Pano Oluştur</h3>
            <input
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Pano adı (örn: Atmosfer, Karakterler...)"
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 14,
                border: "1px solid #e9ecef",
                fontSize: 13,
                fontFamily: "Montserrat",
                outline: "none",
                marginBottom: 14,
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => {
                if (!newBoardName.trim()) return;
                setBoards([
                  ...boards,
                  {
                    id: Date.now().toString(),
                    name: newBoardName.trim(),
                    images: [
                      "https://picsum.photos/seed/new1/400/500",
                      "https://picsum.photos/seed/new2/300/300",
                      "https://picsum.photos/seed/new3/300/300",
                    ],
                  },
                ]);
                setNewBoardName("");
                setCreatingBoard(false);
              }}
              style={{
                width: "100%",
                padding: "14px 0",
                background: "#feb0c1",
                border: "none",
                borderRadius: 14,
                color: "#1a1a2e",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Panoyu Oluştur
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function Dot() {
  return <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#dee2e6" }} />;
}