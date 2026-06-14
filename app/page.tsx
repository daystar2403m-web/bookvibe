"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MOCK_BOOKS } from "@/lib/mockBooks";

export default function Home() {
  const [continueData, setContinueData] = useState<{
    bookId: string;
    chapter: number;
  } | null>(null);

  useEffect(() => {
    let last: { bookId: string; chapter: number } | null = null;
    for (const book of MOCK_BOOKS) {
      const saved = localStorage.getItem(`progress-${book.id}`);
      if (saved !== null) {
        const chapter = Number(saved);
        if (!last || chapter >= last.chapter) {
          last = { bookId: book.id, chapter };
        }
      }
    }
    setContinueData(last);
  }, []);

  const book = MOCK_BOOKS.find((b) => b.id === continueData?.bookId);

  const categories = [
    "Trendler", "Romantik", "Fantastik", "Bilim Kurgu",
    "Genç Yetişkin", "Polisiye", "Düşmandan Aşka", "Mafya", "Anlaşmalı Evlilik",
  ];

  return (
    <div
      className="min-h-screen pb-28"
      style={{ background: "linear-gradient(160deg, #1e2a35 0%, #2D3A47 60%, #1e2a35 100%)" }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-0 right-0 h-72 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(236,196,195,0.08), transparent)" }}
      />

      {/* TOP BAR */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-4"
        style={{
          background: "rgba(30, 42, 53, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(169,183,198,0.1)",
        }}
      >
        <div className="w-10" />
        <h1
          className="text-2xl tracking-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#ECC4C3",
            fontWeight: 700,
          }}
        >
          BookVibe
        </h1>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(236,196,195,0.15)", border: "1px solid rgba(236,196,195,0.3)" }}
        >
          <span style={{ color: "#ECC4C3", fontSize: 16 }}>👤</span>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="flex gap-2 overflow-x-auto px-4 py-4 scrollbar-hide">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all"
            style={
              i === 0
                ? {
                    background: "linear-gradient(135deg, #ECC4C3, #B97D7B)",
                    color: "#1e2a35",
                    fontWeight: 600,
                  }
                : {
                    background: "rgba(61,79,94,0.6)",
                    color: "#A9B7C6",
                    border: "1px solid rgba(169,183,198,0.15)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CONTINUE READING */}
      <div className="px-4 mt-2">
        <h2
          className="text-base font-semibold mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: "#DDD3C9" }}
        >
          Continue Reading
        </h2>

        {continueData && book ? (
          <Link href={`/book/${book.id}?mode=read&chapter=${continueData.chapter}`}>
            <div
              className="flex gap-4 p-4 rounded-2xl mb-2 items-center"
              style={{
                background: "rgba(61,79,94,0.5)",
                border: "1px solid rgba(169,183,198,0.1)",
              }}
            >
              <img
                src={book.coverUrl}
                className="w-14 h-20 object-cover rounded-xl shadow-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: "#DDD3C9" }}>{book.title}</p>
                <p className="text-xs mt-1" style={{ color: "#A9B7C6" }}>
                  {book.chapters?.[continueData.chapter]?.title}
                </p>
                <div
                  className="mt-2 text-xs px-3 py-1 rounded-full inline-block font-medium"
                  style={{ background: "rgba(236,196,195,0.15)", color: "#ECC4C3" }}
                >
                  Continue →
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div
            className="flex items-center gap-3 p-4 rounded-2xl mb-2"
            style={{
              background: "rgba(61,79,94,0.3)",
              border: "1px solid rgba(169,183,198,0.08)",
            }}
          >
            <span className="text-2xl">📖</span>
            <p className="text-sm" style={{ color: "#A9B7C6" }}>No reading progress yet</p>
          </div>
        )}
      </div>

      {/* FOR YOU */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "'Playfair Display', serif", color: "#DDD3C9" }}
          >
            For You
          </h2>
          <button className="text-xs" style={{ color: "#928E5E" }}>See all</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {MOCK_BOOKS.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div className="min-w-[110px]">
                <div className="relative">
                  <img
                    src={book.coverUrl}
                    className="w-[110px] h-[160px] object-cover rounded-2xl shadow-lg"
                  />
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: "linear-gradient(to top, rgba(30,42,53,0.6), transparent)" }}
                  />
                </div>
                <p
                  className="text-xs font-medium mt-2 leading-snug"
                  style={{ color: "#DDD3C9", maxWidth: 110 }}
                >
                  {book.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ALL BOOKS */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "'Playfair Display', serif", color: "#DDD3C9" }}
          >
            All Books
          </h2>
        </div>

        <div className="space-y-2">
          {MOCK_BOOKS.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div
                className="flex items-center gap-4 p-3 rounded-2xl transition-all"
                style={{
                  background: "rgba(61,79,94,0.4)",
                  border: "1px solid rgba(169,183,198,0.08)",
                }}
              >
                <img
                  src={book.coverUrl}
                  className="w-12 h-16 object-cover rounded-xl shadow"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#DDD3C9" }}>{book.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#928E5E" }}>{book.author}</p>
                </div>
                <span style={{ color: "#A9B7C6", fontSize: 18 }}>›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}