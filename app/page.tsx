"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MOCK_BOOKS } from "@/lib/mockBooks";
import { Search, User, Star, ChevronRight } from "lucide-react";

export default function Home() {
  const [continueBooks, setContinueBooks] = useState<{ bookId: string; chapter: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const list: { bookId: string; chapter: number }[] = [];
    for (const book of MOCK_BOOKS) {
      const saved = localStorage.getItem(`progress-${book.id}`);
      if (saved !== null) list.push({ bookId: book.id, chapter: Number(saved) });
    }
    setContinueBooks(list);
  }, []);

  const featuredBook = MOCK_BOOKS[0];

  return (
    <div style={{ background: "#F8F9FA", fontFamily: "Montserrat, sans-serif", minHeight: "100vh", paddingBottom: 80 }}>

      {/* TOP BAR */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 13px 10px 13px", background: "#F8F9FA", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: "#feb0c1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "Montserrat" }}>N</span>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, background: "#E7EBEE", borderRadius: 20, padding: "8px 12px" }}>
          <Search size={13} color="#ADB5BD" strokeWidth={2} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap, yazar veya etiket ara"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 12, color: "#ADB5BD", fontFamily: "Montserrat", fontWeight: 400 }}
          />
        </div>

        <Link href="/profile">
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(254,176,193,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <User size={15} color="#feb0c1" strokeWidth={2} />
          </div>
        </Link>
      </div>

      {/* BANNER */}
      <div style={{ padding: "0 13px", marginBottom: 18 }}>
        <FeaturedBanner book={featuredBook} />
      </div>

      {/* DEVAM ET */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "0 13px", marginBottom: 10 }}>
          <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>Kaldığın Yerden Devam Et</span>
          <ChevronRight size={13} color="#1a1a2e" strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 13px 4px", scrollbarWidth: "none" }}>
          {MOCK_BOOKS.map((book, i) => (
            <ContinueCard key={book.id} book={book} badge={i % 2 === 0 ? "Devam Et" : `${i + 1} yeni bölüm`} chapter={`${i + 6}. Bölüm`} />
          ))}
        </div>
      </div>

      {/* SEVDİĞİN YAZARLARDAN */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ padding: "0 13px", marginBottom: 10 }}>
          <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>Sevdiğin Yazarlardan</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 13px 4px", scrollbarWidth: "none" }}>
          {/* Büyük kart + 2x2 grid */}
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <Link href={`/book/${MOCK_BOOKS[0].id}`}>
              <div style={{ width: 61, height: 91, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                <img src={MOCK_BOOKS[0].coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Link>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {MOCK_BOOKS.slice(0, 4).map((book, i) => (
                <Link key={i} href={`/book/${book.id}`}>
                  <div style={{ width: 29, height: 43, borderRadius: 6, overflow: "hidden" }}>
                    <img src={book.coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Devam eden kartlar */}
          {MOCK_BOOKS.slice(1).map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div style={{ width: 61, height: 91, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                <img src={book.coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SENİN İÇİN */}
      <div style={{ padding: "0 13px" }}>
        <div style={{ marginBottom: 10 }}>
          <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>Senin için ✨</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {MOCK_BOOKS.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <img src={book.coverUrl} style={{ width: "100%", height: 130, objectFit: "cover" }} />
                <div style={{ padding: "8px 10px 10px" }}>
                  <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 11, color: "#1a1a2e", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{book.title}</p>
                  <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 10, color: "#6c757d", marginTop: 3 }}>{book.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function FeaturedBanner({ book }: { book: any }) {
  const tags = ["Fantastik", "Romantik", "Macera"];
  return (
    <Link href={`/book/${book.id}`}>
      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #ff7a59 0%, #ff4d6d 60%, #c9184a 100%)", minHeight: 126, display: "flex", gap: 10, padding: "14px 12px 12px" }}>
        {/* Rozet */}
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.92)", borderRadius: 999, padding: "3px 9px" }}>
          <Star size={9} fill="#fff" color="#fff" strokeWidth={0} />
          <span style={{ fontSize: 8, fontWeight: 700, color: "#c9184a", fontFamily: "Montserrat", letterSpacing: 0.4 }}>GÜNÜN ÖNERİSİ</span>
        </div>

        {/* Kapak */}
        <div style={{ flexShrink: 0, marginTop: 18 }}>
          <img src={book.coverUrl} style={{ width: 67, height: 99, objectFit: "cover", borderRadius: 8, border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }} />
        </div>

        {/* Bilgi */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 18, minWidth: 0 }}>
          <p style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 16, color: "#fff", lineHeight: 1.2, margin: 0 }}>{book.title}</p>
          <p style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>{book.author}</p>
          <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 10, color: "rgba(255,255,255,0.88)", marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>
            "İnsan bir kutu kibrite benzer. Varolur, yanar ve söner."
          </p>
          <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span key={tag} style={{ fontSize: 8, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(255,255,255,0.22)", color: "#fff", fontFamily: "Montserrat" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ContinueCard({ book, badge, chapter }: { book: any; badge: string; chapter: string }) {
  const isNew = badge.includes("yeni");
  return (
    <Link href={`/book/${book.id}`}>
      <div style={{ flexShrink: 0, width: 52 }}>
        <div style={{ width: 52, height: 79, borderRadius: 6, overflow: "hidden" }}>
          <img src={book.coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <p style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 9, color: isNew ? "#c9184a" : "#1a1a2e", marginTop: 4, lineHeight: 1.2 }}>{badge}</p>
        <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 8, color: "#6c757d", marginTop: 2 }}>{chapter}</p>
      </div>
    </Link>
  );
}