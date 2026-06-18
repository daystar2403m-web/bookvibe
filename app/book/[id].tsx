"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_BOOKS } from "@/lib/mockBooks";
import BottomNav from "@/components/BottomNav";
import { ChevronLeft, Bookmark, Share2, MoreHorizontal, Star, BookOpen, List, Lock, CheckCircle, Play, Plus, ChevronDown, ChevronRight, Calendar, RefreshCw, Hash, Type, Globe } from "lucide-react";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"chapters" | "gallery">("chapters");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  const [progress] = useState(35);
  const currentChapter = 3;

  useEffect(() => {
    const found = MOCK_BOOKS.find((b) => b.id === id);
    setBook(found || MOCK_BOOKS[0]);
  }, [id]);

  if (!book) return null;

  const tags = ["Fantastik", "Romantik", "Savaş", "Macera"];
  const chapters = book.chapters || [
    { id: 1, title: "Küller Arasındaki Taç", date: "14 Şub 2024", status: "read" },
    { id: 2, title: "Sessizliğin Fısıltısı", date: "17 Şub 2024", status: "read" },
    { id: 3, title: "Gölgenin Yükselişi", date: "19 Şub 2024", status: "current" },
    { id: 4, title: "Kayıp Miras", date: "21 Şub 2024", status: "locked" },
    { id: 5, title: "Kan ve İhanet", date: "24 Şub 2024", status: "locked" },
    { id: 37, title: "Son Kehanet", date: "--", status: "locked" },
  ];

  const galleryImages = [
    "https://picsum.photos/seed/g1/200/160",
    "https://picsum.photos/seed/g2/200/160",
    "https://picsum.photos/seed/g3/200/160",
    "https://picsum.photos/seed/g4/200/160",
    "https://picsum.photos/seed/g5/200/160",
    "https://picsum.photos/seed/g6/200/160",
  ];

  const desc = `Tahtın varisi olmak için doğduğunu sanıyordu. Gerçek ise küllerin içinden doğacaktı.\n\nİmparatorluk, yıllardır süren savaşların ardından yıkımın eşiğinde. Karanlık güçler uyanıyor ve eski kehanetler yeniden yazılıyor. Alevler yükselirken dostlar düşmana dönüşüyor, sırlar açığa çıkıyor.`;

  const shortDesc = desc.split("\n\n")[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d18",
        fontFamily: "Montserrat, sans-serif",
        color: "#fff",
        paddingBottom: 80,
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "52px 16px 12px",
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(13,13,24,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={18} color="#fff" />
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {[Bookmark, Share2, MoreHorizontal].map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Icon size={16} color="#fff" />
            </button>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%)",
        }}
      >
        {/* Blur background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${book.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.3)",
            transform: "scale(1.1)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, padding: "16px 16px 20px" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {/* Cover */}
            <div style={{ flexShrink: 0 }}>
              <img
                src={book.coverUrl}
                style={{
                  width: 140,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 12,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              />
              <button
                style={{
                  marginTop: 10,
                  width: 140,
                  padding: "8px 0",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <BookOpen size={13} />
                Önizleme Oku
              </button>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Editör rozeti */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(139,92,246,0.25)",
                  border: "1px solid rgba(139,92,246,0.5)",
                  borderRadius: 999,
                  padding: "3px 10px",
                  marginBottom: 8,
                }}
              >
                <Star size={10} fill="#a78bfa" color="#a78bfa" />
                <span style={{ fontSize: 10, fontWeight: 600, color: "#a78bfa" }}>Editörün Seçimi</span>
              </div>

              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>
                {book.title}
              </h1>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.5, marginBottom: 12 }}>
                Karanlığın içinden doğacak olan, küllerin içinden yükselecek.
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                <StatItem icon={<Star size={12} fill="#f59e0b" color="#f59e0b" />} value="4.8" sub="(12.6B)" />
                <StatItem icon={<BookOpen size={12} color="rgba(255,255,255,0.6)" />} value="324B" sub="Okunma" />
                <StatItem icon={<List size={12} color="rgba(255,255,255,0.6)" />} value="37" sub="Bölüm" />
                <StatItem icon={<Globe size={12} color="rgba(255,255,255,0.6)" />} value="Aa" sub="Türkçe" />
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  +
                </span>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => router.push(`/book/${book.id}?mode=read&chapter=${currentChapter - 1}`)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    border: "none",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 13,
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <BookOpen size={14} />
                  Devam Et
                </button>
                <button
                  onClick={() => setInLibrary(!inLibrary)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: inLibrary ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.08)",
                    border: `1px solid ${inLibrary ? "#7c3aed" : "rgba(255,255,255,0.2)"}`,
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <Plus size={13} />
                  {inLibrary ? "Kütüphanede" : "Kütüphaneye Ekle"}
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                Bölüm {currentChapter}: Gölgenin Yükselişi
              </span>
              <span style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600 }}>%{progress}</span>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "0 14px" }}>

        {/* AÇIKLAMA + BİLGİ */}
        <div style={{ display: "flex", gap: 14, marginTop: 16, marginBottom: 20 }}>
          {/* Açıklama */}
          <div
            style={{
              flex: 1,
              background: "#13131f",
              borderRadius: 14,
              padding: "14px 14px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Açıklama</h3>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {showFullDesc ? desc : shortDesc}
            </p>
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              style={{
                marginTop: 8,
                background: "none",
                border: "none",
                color: "#a78bfa",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: 0,
                fontFamily: "Montserrat",
              }}
            >
              {showFullDesc ? "Daha az" : "Daha fazlası"}
              <ChevronDown size={12} style={{ transform: showFullDesc ? "rotate(180deg)" : "none" }} />
            </button>
          </div>

          {/* Bilgi */}
          <div
            style={{
              width: 160,
              flexShrink: 0,
              background: "#13131f",
              borderRadius: 14,
              padding: "14px 12px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              { Icon: Calendar, label: "Yayınlanma", value: "14 Şubat 2024" },
              { Icon: RefreshCw, label: "Güncellenme", value: "2 gün önce" },
              { Icon: List, label: "Bölümler", value: "37" },
              { Icon: Hash, label: "Kelime Sayısı", value: "412K" },
              { Icon: Globe, label: "Dil", value: "Türkçe" },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
                <Icon size={13} color="rgba(255,255,255,0.4)" style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", margin: 0 }}>{label}</p>
                  <p style={{ fontSize: 11, color: "#fff", fontWeight: 600, margin: "2px 0 0" }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BÖLÜMLER + KİTAPTAN GÖRSELLER */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          {/* Bölümler */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Bölümler</h3>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 2, fontFamily: "Montserrat" }}>
                Tümünü Gör <ChevronRight size={12} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {chapters.map((ch: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    background: ch.status === "current" ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.02)",
                    borderRadius: 10,
                    border: ch.status === "current" ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                    <List size={13} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: ch.status === "current" ? 700 : 500, color: ch.status === "locked" ? "rgba(255,255,255,0.3)" : "#fff", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {i + 1 === 37 ? "37" : i + 1}. {ch.title || `Bölüm ${i + 1}`}
                    </p>
                  </div>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>{ch.date || "--"}</span>
                  <div style={{ flexShrink: 0 }}>
                    {ch.status === "read" && <CheckCircle size={14} color="rgba(255,255,255,0.4)" />}
                    {ch.status === "current" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600 }}>Devam et</span>
                        <Play size={13} color="#a78bfa" fill="#a78bfa" />
                      </div>
                    )}
                    {ch.status === "locked" && <Lock size={13} color="rgba(255,255,255,0.25)" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kitaptan Görseller */}
          <div style={{ width: 160, flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Kitaptan Görseller</h3>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "Montserrat" }}>
                Tümünü Gör <ChevronRight size={11} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {galleryImages.map((img, i) => (
                <div key={i} style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "1" }}>
                  <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* YAZAR */}
        <div
          style={{
            background: "#13131f",
            borderRadius: 14,
            padding: "14px",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 10, fontWeight: 500 }}>Yazarı</p>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <img
              src="https://picsum.photos/seed/author/80/80"
              style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid #7c3aed", flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>L. E. Aydın</span>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 8, color: "#fff", fontWeight: 800 }}>✓</span>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "#a78bfa", marginBottom: 6 }}>@leaydin</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginBottom: 10 }}>
                Hayallerini kelimelere, kelimelerini dünyalara dönüştüren bir hikaye sevdalısı.
              </p>
              <button
                style={{
                  width: "100%",
                  padding: "9px 0",
                  background: "transparent",
                  border: "1px solid #7c3aed",
                  borderRadius: 10,
                  color: "#a78bfa",
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Takip Et
              </button>
              <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                {[["12", "Eser"], ["284B", "Takipçi"], ["3.2M", "Okunma"]].map(([val, label]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>{val}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OKUYUCU YORUMLARI */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Okuyucu Yorumları</h3>
            <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 2, fontFamily: "Montserrat" }}>
              Tümünü Gör <ChevronRight size={12} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {/* Rating */}
            <div
              style={{
                flexShrink: 0,
                background: "#13131f",
                borderRadius: 14,
                padding: "14px",
                border: "1px solid rgba(255,255,255,0.06)",
                width: 120,
              }}
            >
              <p style={{ fontSize: 36, fontWeight: 800, color: "#fff", margin: 0 }}>4.8</p>
              <div style={{ display: "flex", gap: 2, margin: "4px 0 8px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>12.6B değerlendirme</p>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 3 }}>
                {[[5, 78], [4, 15], [3, 5], [2, 1], [1, 1]].map(([star, pct]) => (
                  <div key={star} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", width: 8 }}>{star}</span>
                    <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "#7c3aed", borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", width: 24 }}>%{pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div
              style={{
                flex: 1,
                background: "#13131f",
                borderRadius: 14,
                padding: "14px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <img src="https://picsum.photos/seed/reviewer/40/40" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: 0 }}>Melisa A.</p>
                  <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} fill="#f59e0b" color="#f59e0b" />)}
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginLeft: 4 }}>2 gün önce</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                Uzun zamandır böyle sürükleyici bir hikaye okumamıştım. Karakterler, dünya, olay örgüsü... Her şey mükemmel!
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function StatItem({ icon, value, sub }: { icon: React.ReactNode; value: string; sub: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        {icon}
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{value}</span>
      </div>
      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)" }}>{sub}</span>
    </div>
  );
}