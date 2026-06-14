"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MOCK_BOOKS } from "@/lib/mockBooks";

const CATEGORIES = [
  "Trendler", "Romantik", "Fantastik", "Bilim Kurgu",
  "Genç Yetişkin", "Polisiye", "Düşmandan Aşka", "Mafya", "Anlaşmalı Evlilik",
];

export default function Home() {
  const [continueData, setContinueData] = useState<{ bookId: string; chapter: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState("Trendler");
  const [lang, setLang] = useState<"tr" | "en">("tr");

  useEffect(() => {
    let last: { bookId: string; chapter: number } | null = null;
    for (const book of MOCK_BOOKS) {
      const saved = localStorage.getItem(`progress-${book.id}`);
      if (saved !== null) {
        const chapter = Number(saved);
        if (!last || chapter >= last.chapter) last = { bookId: book.id, chapter };
      }
    }
    setContinueData(last);
  }, []);

  const continueBook = MOCK_BOOKS.find((b) => b.id === continueData?.bookId);

  const t = {
    tr: {
      continueReading: "Okumaya Devam Et",
      forYou: "Sana Özel",
      recommended: "Önerilen Kitaplar",
      trending: "Trend Kitaplar",
      noProgress: "Henüz okuma geçmişin yok",
      seeAll: "Tümünü Gör",
      chapter: "Bölüm",
    },
    en: {
      continueReading: "Continue Reading",
      forYou: "For You",
      recommended: "Recommended",
      trending: "Trending",
      noProgress: "No reading progress yet",
      seeAll: "See All",
      chapter: "Chapter",
    },
  }[lang];

  return (
    <div
      className="min-h-screen pb-28"
      style={{ background: "linear-gradient(170deg, #1e2a35 0%, #2D3A47 50%, #1e2a35 100%)" }}
    >
      {/* Glow */}
      <div
        className="fixed top-0 left-0 right-0 h-96 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at top, rgba(236,196,195,0.06), transparent)" }}
      />

      {/* TOP BAR */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(30,42,53,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(169,183,198,0.08)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#ECC4C3",
            letterSpacing: "-0.3px",
          }}
        >
          BookVibe
        </h1>

        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === "tr" ? "en" : "tr")}
            className="text-xs px-2.5 py-1 rounded-full font-medium transition-all"
            style={{
              background: "rgba(146,142,94,0.2)",
              color: "#928E5E",
              border: "1px solid rgba(146,142,94,0.3)",
            }}
          >
            {lang === "tr" ? "EN" : "TR"}
          </button>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(236,196,195,0.12)", border: "1px solid rgba(236,196,195,0.2)" }}
          >
            <span style={{ fontSize: 15 }}>👤</span>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto px-4 pt-4 pb-3 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="whitespace-nowrap rounded-xl px-4 py-2 text-xs font-medium transition-all"
              style={
                activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, #ECC4C3, #B97D7B)",
                      color: "#1e2a35",
                      fontWeight: 600,
                      boxShadow: "0 4px 15px rgba(236,196,195,0.3)",
                    }
                  : {
                      background: "rgba(61,79,94,0.5)",
                      color: "#A9B7C6",
                      border: "1px solid rgba(169,183,198,0.1)",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CONTINUE READING */}
        <div className="px-4 mt-2">
          <SectionTitle title={t.continueReading} />

          {continueData && continueBook ? (
            <Link href={`/book/${continueBook.id}?mode=read&chapter=${continueData.chapter}`}>
              <div
                className="flex gap-4 p-4 rounded-2xl items-center transition-all active:scale-98"
                style={{
                  background: "rgba(61,79,94,0.45)",
                  border: "1px solid rgba(169,183,198,0.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={continueBook.coverUrl}
                  className="w-16 h-22 object-cover shadow-lg"
                  style={{ borderRadius: 12, height: 88 }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm truncate"
                    style={{ color: "#DDD3C9", fontFamily: "'Playfair Display', serif" }}
                  >
                    {continueBook.title}
                  </p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "#A9B7C6" }}>
                    {continueBook.chapters?.[continueData.chapter]?.title}
                  </p>
                  {/* Progress bar */}
                  <div
                    className="mt-2 h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(169,183,198,0.15)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round((continueData.chapter / Math.max(continueBook.chapters?.length - 1, 1)) * 100)}%`,
                        background: "linear-gradient(90deg, #ECC4C3, #B97D7B)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(236,196,195,0.15)" }}
                >
                  <span style={{ color: "#ECC4C3", fontSize: 14 }}>›</span>
                </div>
              </div>
            </Link>
          ) : (
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(61,79,94,0.25)",
                border: "1px dashed rgba(169,183,198,0.15)",
              }}
            >
              <span className="text-xl">📖</span>
              <p className="text-sm" style={{ color: "#A9B7C6" }}>{t.noProgress}</p>
            </div>
          )}
        </div>

        {/* FOR YOU — horizontal scroll */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <SectionTitle title={t.forYou} />
            <SmallLink label={t.seeAll} />
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide">
            {MOCK_BOOKS.map((book) => (
              <BookCard key={book.id} book={book} size="md" />
            ))}
          </div>
        </div>

        {/* TRENDING — horizontal scroll */}
        <div className="mt-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <SectionTitle title={t.trending} />
            <SmallLink label={t.seeAll} />
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide">
            {[...MOCK_BOOKS].reverse().map((book) => (
              <BookCard key={book.id} book={book} size="md" />
            ))}
          </div>
        </div>

        {/* RECOMMENDED — 2 column grid */}
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <SectionTitle title={t.recommended} />
            <SmallLink label={t.seeAll} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {MOCK_BOOKS.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`}>
                <div
                  className="p-3 rounded-2xl transition-all active:scale-95"
                  style={{
                    background: "rgba(61,79,94,0.4)",
                    border: "1px solid rgba(169,183,198,0.08)",
                  }}
                >
                  <div className="relative mb-2">
                    <img
                      src={book.coverUrl}
                      className="w-full object-cover"
                      style={{ height: 160, borderRadius: 10 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        borderRadius: 10,
                        background: "linear-gradient(to top, rgba(30,42,53,0.7) 0%, transparent 50%)",
                      }}
                    />
                  </div>
                  <p
                    className="text-xs font-semibold leading-snug line-clamp-2"
                    style={{ color: "#DDD3C9", fontFamily: "'Playfair Display', serif" }}
                  >
                    {book.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#928E5E" }}>{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2
      className="text-base font-semibold"
      style={{
        fontFamily: "'Playfair Display', serif",
        color: "#DDD3C9",
      }}
    >
      {title}
    </h2>
  );
}

function SmallLink({ label }: { label: string }) {
  return (
    <button className="text-xs font-medium" style={{ color: "#928E5E" }}>
      {label} →
    </button>
  );
}

function BookCard({ book, size = "md" }: { book: any; size?: "sm" | "md" | "lg" }) {
  const w = size === "lg" ? 150 : size === "md" ? 120 : 90;
  const h = size === "lg" ? 210 : size === "md" ? 170 : 130;

  return (
    <Link href={`/book/${book.id}`}>
      <div style={{ width: w }} className="flex-shrink-0">
        <div className="relative" style={{ borderRadius: 12, overflow: "hidden" }}>
          <img
            src={book.coverUrl}
            className="object-cover"
            style={{ width: w, height: h }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(30,42,53,0.65) 0%, transparent 55%)",
            }}
          />
        </div>
        <p
          className="text-xs font-medium mt-1.5 leading-snug"
          style={{
            color: "#DDD3C9",
            maxWidth: w,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {book.title}
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: "#928E5E" }}>{book.author}</p>
      </div>
    </Link>
  );
}