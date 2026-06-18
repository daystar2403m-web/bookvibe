"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { MOCK_BOOKS } from "@/lib/mockBooks";
import { Search, User, Star, ChevronRight } from "lucide-react";

export default function Home() {
const [continueBooks, setContinueBooks] = useState<{ bookId: string; chapter: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const list: { bookId: string; chapter: number }[] = [];
    for (const book of MOCK_BOOKS) {
      const saved = localStorage.getItem(`progress-${book.id}`);
      if (saved !== null)
        list.push({ bookId: book.id, chapter: Number(saved) });
    }
    setContinueBooks(list);
  }, []);

  const featuredBook = MOCK_BOOKS[0];

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "#F8F9FA", fontFamily: "Montserrat, sans-serif" }}
    >
      {/* ── TOP BAR ── */}
      <div
        className="flex items-center gap-2 px-4 pt-5 pb-3 sticky top-0 z-30"
        style={{ background: "#F8F9FA" }}
      >
        {/* Logo */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#feb0c1" }}
        >
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>N</span>
        </div>

        {/* Search bar */}
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: "#E7EBEE" }}
        >
          <Search size={14} color="#ADB5BD" strokeWidth={2} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap, yazar veya etiket ara"
            className="flex-1 bg-transparent text-xs focus:outline-none"
            style={{
              color: "#ADB5BD",
              fontFamily: "Montserrat",
              fontWeight: 400,
            }}
          />
        </div>

        {/* Profile */}
        <Link href="/profile">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(254,176,193,0.5)" }}
          >
            <User size={16} color="#feb0c1" strokeWidth={2} />
          </div>
        </Link>
      </div>

      {/* ── FEATURED BANNER ── */}
      <div className="px-4 mb-5">
        <FeaturedBanner book={featuredBook} />
      </div>

      {/* ── CONTINUE READING ── */}
      <div className="mb-5">
        <div className="flex items-center gap-1 px-4 mb-3">
          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 14,
              color: "#1a1a2e",
            }}
          >
            Kaldığın Yerden Devam Et
          </span>
          <ChevronRight size={14} color="#1a1a2e" strokeWidth={2.5} />
        </div>
        <div
          className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide"
        >
          {MOCK_BOOKS.map((book, i) => (
            <ContinueCard
              key={book.id}
              book={book}
              badge={i % 2 === 0 ? "Devam Et" : `${i + 1} yeni bölüm`}
              chapter={`${i + 6}. Bölüm`}
            />
          ))}
        </div>
      </div>

      {/* ── SEVDİĞİN YAZARLARDAN ── */}
      <div className="mb-5">
        <div className="px-4 mb-3">
          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 14,
              color: "#1a1a2e",
            }}
          >
            Sevdiğin Yazarlardan
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
          {/* Big card */}
          <div className="flex gap-3 flex-shrink-0">
            <Link href={`/book/${MOCK_BOOKS[0].id}`}>
              <div
                className="rounded-xl overflow-hidden flex-shrink-0"
                style={{ width: 90, height: 130 }}
              >
                <img
                  src={MOCK_BOOKS[0].coverUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            {/* 2x2 grid */}
            <div className="grid grid-cols-2 gap-2 flex-shrink-0">
              {[...MOCK_BOOKS].slice(0, 4).map((book, i) => (
                <Link key={book.id + i} href={`/book/${book.id}`}>
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ width: 61, height: 61 }}
                  >
                    <img
                      src={book.coverUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Extra cards */}
          {[...MOCK_BOOKS].slice(1).map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div
                className="rounded-xl overflow-hidden flex-shrink-0"
                style={{ width: 90, height: 130 }}
              >
                <img
                  src={book.coverUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── SENİN İÇİN ── */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 14,
              color: "#1a1a2e",
            }}
          >
            Senin için ✨
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_BOOKS.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={book.coverUrl}
                  className="w-full object-cover"
                  style={{ height: 150, borderRadius: "12px 12px 0 0" }}
                />
                <div className="px-2.5 py-2">
                  <p
                    className="text-xs font-bold line-clamp-2 leading-snug"
                    style={{
                      color: "#1a1a2e",
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                    }}
                  >
                    {book.title}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "#6c757d", fontFamily: "Montserrat" }}
                  >
                    {book.author}
                  </p>
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

/* ── FEATURED BANNER ── */
function FeaturedBanner({ book }: { book: any }) {
  const tags = ["Fantastik", "Romantik", "Macera"];

  // Kitap kapağı rengini simüle et (gerçekte dominant color extraction gerekir)
  // Şimdilik her kitap için farklı bir gradient
  const gradients = [
    "linear-gradient(135deg, #ff7a59 0%, #ff4d6d 60%, #c9184a 100%)",
    "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
    "linear-gradient(135deg, #f77f00 0%, #d62828 100%)",
  ];
  const gradient = gradients[0];

  return (
    <Link href={`/book/${book.id}`}>
      <div
        className="relative rounded-3xl overflow-hidden flex gap-3 p-4"
        style={{ background: gradient, minHeight: 160 }}
      >
        {/* Rozet */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.92)" }}
        >
          <Star size={10} fill="#fff" color="#fff" strokeWidth={0} />
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#c9184a",
              fontFamily: "Montserrat",
              letterSpacing: 0.5,
            }}
          >
            GÜNÜN ÖNERİSİ
          </span>
        </div>

        {/* Kapak */}
        <div className="flex-shrink-0 mt-7">
          <img
            src={book.coverUrl}
            className="object-cover rounded-xl shadow-lg"
            style={{
              width: 80,
              height: 115,
              border: "2.5px solid rgba(255,255,255,0.3)",
            }}
          />
        </div>

        {/* Bilgi */}
        <div className="flex-1 flex flex-col justify-center mt-6 min-w-0">
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              fontSize: 17,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {book.title}
          </p>
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 12,
              color: "rgba(255,255,255,0.85)",
              marginTop: 3,
            }}
          >
            {book.author}
          </p>
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: 11,
              color: "rgba(255,255,255,0.88)",
              marginTop: 7,
              fontStyle: "italic",
              lineHeight: 1.4,
            }}
          >
            "İnsan bir kutu kibrite benzer. Varolur, yanar ve söner."
          </p>
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.22)",
                  color: "#fff",
                  fontFamily: "Montserrat",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── CONTINUE CARD ── */
function ContinueCard({
  book,
  badge,
  chapter,
}: {
  book: any;
  badge: string;
  chapter: string;
}) {
  const isNew = badge.includes("yeni");
  return (
    <Link href={`/book/${book.id}`}>
      <div className="flex-shrink-0" style={{ width: 82 }}>
        <div
          className="rounded-xl overflow-hidden"
          style={{ width: 82, height: 115 }}
        >
          <img
            src={book.coverUrl}
            className="w-full h-full object-cover"
          />
        </div>
        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: 10,
            color: isNew ? "#c9184a" : "#1a1a2e",
            marginTop: 5,
          }}
        >
          {badge}
        </p>
        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: 9,
            color: "#6c757d",
            marginTop: 2,
          }}
        >
          {chapter}
        </p>
      </div>
    </Link>
  );
}