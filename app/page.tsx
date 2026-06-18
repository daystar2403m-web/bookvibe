"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MOCK_BOOKS } from "@/lib/mockBooks";

export default function Home() {
  const [continueBooks, setContinueBooks] = useState<{ bookId: string; chapter: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const list: { bookId: string; chapter: number }[] = [];
    for (const book of MOCK_BOOKS) {
      const saved = localStorage.getItem(`progress-${book.id}`);
      if (saved !== null) {
        list.push({ bookId: book.id, chapter: Number(saved) });
      }
    }
    setContinueBooks(list);
  }, []);

  const featuredBook = MOCK_BOOKS[0];

  return (
    <div className="min-h-screen pb-28" style={{ background: "#f8f9fa" }}>
      {/* TOP BAR */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        {/* Logo */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "#feb0c1" }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>B</span>
        </div>

        {/* Search bar */}
        <div
          className="flex-1 flex items-center gap-2 rounded-2xl px-4 py-2.5"
          style={{ background: "#e7ebee" }}
        >
          <span style={{ color: "#adb5bd", fontSize: 16 }}>🔍</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap, yazar veya etiket ara"
            className="flex-1 bg-transparent text-sm focus:outline-none"
            style={{ color: "#1a1a2e", fontFamily: "Montserrat" }}
          />
        </div>

        {/* Profile */}
        <Link href="/profile">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#feb0c1" }}
          >
            <span style={{ fontSize: 16 }}>👤</span>
          </div>
        </Link>
      </div>

      {/* FEATURED BANNER */}
      <div className="px-4 mb-6">
        <FeaturedBanner book={featuredBook} />
      </div>

      {/* CONTINUE READING */}
      <Section title="Kaldığın Yerden Devam Et" showArrow>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {(continueBooks.length > 0
            ? continueBooks.map((c) => MOCK_BOOKS.find((b) => b.id === c.bookId)!).filter(Boolean)
            : MOCK_BOOKS
          ).map((book, i) => (
            <ContinueCard
              key={book.id + i}
              book={book}
              chapterLabel={
                continueBooks[i]
                  ? `${continueBooks[i].chapter + 1}. Bölüm`
                  : "6. Bölüm"
              }
              badge={i % 2 === 0 ? "Devam Et" : "2 yeni bölüm"}
            />
          ))}
        </div>
      </Section>

      {/* FAVORITE AUTHORS */}
      <Section title="Sevdiğin Yazarlardan">
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {/* Big featured card */}
          <BookCard book={MOCK_BOOKS[0]} width={120} height={170} />
          {/* Grid of small cards */}
          <div className="grid grid-cols-2 gap-2" style={{ width: 170 }}>
            {[...MOCK_BOOKS, ...MOCK_BOOKS].slice(0, 4).map((book, i) => (
              <BookCard key={book.id + i} book={book} width={80} height={80} compact />
            ))}
          </div>
        </div>
      </Section>

      {/* FOR YOU */}
      <Section title="Senin için ✨">
        <div className="grid grid-cols-2 gap-3 px-4">
          {MOCK_BOOKS.map((book) => (
            <RecommendCard key={book.id} book={book} />
          ))}
        </div>
      </Section>

      <BottomNav />
    </div>
  );
}

/* ---------- Components ---------- */

function Section({
  title,
  showArrow,
  children,
}: {
  title: string;
  showArrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-1 px-4 mb-3">
        <h2 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 16, color: "#1a1a2e" }}>
          {title}
        </h2>
        {showArrow && <span style={{ color: "#1a1a2e" }}>›</span>}
      </div>
      {children}
    </div>
  );
}

function FeaturedBanner({ book }: { book: any }) {
  const tags = ["Fantastik", "Romantik", "Macera"];
  return (
    <Link href={`/book/${book.id}`}>
      <div
        className="relative rounded-3xl overflow-hidden p-4 flex gap-4"
        style={{
          background: "linear-gradient(135deg, #ff7a59 0%, #ff4d6d 50%, #c9184a 100%)",
          minHeight: 200,
        }}
      >
        {/* Badge */}
        <div
          className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.95)" }}
        >
          <span style={{ fontSize: 11 }}>⭐</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#c9184a" }}>GÜNÜN ÖNERİSİ</span>
        </div>

        {/* Cover */}
        <div className="flex-shrink-0 mt-6">
          <img
            src={book.coverUrl}
            className="object-cover rounded-xl shadow-lg"
            style={{ width: 90, height: 130, border: "3px solid rgba(255,255,255,0.3)" }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-center mt-4 min-w-0">
          <h3
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              fontSize: 19,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {book.title}
          </h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: 600 }}>
            {book.author}
          </p>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.9)",
              marginTop: 8,
              fontStyle: "italic",
              lineHeight: 1.4,
            }}
          >
            "İnsan bir kutu kibrite benzer. Varolur, yanar ve söner."
          </p>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.25)", color: "#fff" }}
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

function ContinueCard({ book, chapterLabel, badge }: { book: any; chapterLabel: string; badge: string }) {
  return (
    <Link href={`/book/${book.id}`}>
      <div className="flex-shrink-0" style={{ width: 100 }}>
        <div className="relative rounded-xl overflow-hidden shadow-sm" style={{ height: 140 }}>
          <img src={book.coverUrl} className="w-full h-full object-cover" />
        </div>
        <p
          className="text-[11px] font-semibold mt-1.5"
          style={{ color: badge === "Devam Et" ? "#1a1a2e" : "#c9184a" }}
        >
          {badge}
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: "#6c757d" }}>{chapterLabel}</p>
      </div>
    </Link>
  );
}

function BookCard({
  book,
  width,
  height,
  compact,
}: {
  book: any;
  width: number;
  height: number;
  compact?: boolean;
}) {
  return (
    <Link href={`/book/${book.id}`}>
      <div
        className="rounded-xl overflow-hidden shadow-sm flex-shrink-0"
        style={{ width, height }}
      >
        <img src={book.coverUrl} className="w-full h-full object-cover" />
      </div>
    </Link>
  );
}

function RecommendCard({ book }: { book: any }) {
  return (
    <Link href={`/book/${book.id}`}>
      <div
        className="rounded-2xl overflow-hidden p-2.5"
        style={{ background: "#ffffff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
      >
        <img
          src={book.coverUrl}
          className="w-full object-cover rounded-xl mb-2"
          style={{ height: 150 }}
        />
        <p
          className="text-xs font-bold line-clamp-2"
          style={{ color: "#1a1a2e", fontFamily: "Montserrat" }}
        >
          {book.title}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "#6c757d" }}>{book.author}</p>
      </div>
    </Link>
  );
}