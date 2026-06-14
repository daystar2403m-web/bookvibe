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
          last = {
            bookId: book.id,
            chapter,
          };
        }
      }
    }

    setContinueData(last);
  }, []);

  const book = MOCK_BOOKS.find(
    (b) => b.id === continueData?.bookId
  );

  return (
    <div className="min-h-screen bg-white pb-24">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="w-full text-center text-2xl font-bold">
          BookVibe
        </h1>

        <div className="absolute right-4 h-10 w-10 rounded-full bg-gray-300" />
      </div>

      {/* ================= CATEGORY BAR (EN ÜSTTE) ================= */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-3 text-sm">
        {[
          "Trendler",
          "Romantik",
          "Fantastik",
          "Bilim Kurgu",
          "Genç Yetişkin",
          "Polisiye",
          "Düşmandan Aşka",
          "Mafya",
          "Anlaşmalı Evlilik",
        ].map((cat) => (
          <div
            key={cat}
            className="whitespace-nowrap rounded-full bg-pink-100 px-4 py-2"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* ================= CONTINUE READING ================= */}
      <div className="px-4 mt-4">
        <h2 className="font-semibold mb-3">Continue Reading</h2>

        {continueData && book ? (
          <Link
            href={`/book/${book.id}?mode=read&chapter=${continueData.chapter}`}
          >
            <div className="flex gap-4 p-3 border rounded-xl mb-6 items-center hover:bg-gray-50">

              <img
                src={book.coverUrl}
                className="w-14 h-20 object-cover rounded"
              />

              <div>
                <p className="font-semibold">{book.title}</p>
                <p className="text-sm text-gray-500">
                  Continue: {book.chapters?.[continueData.chapter]?.title}
                </p>
              </div>

            </div>
          </Link>
        ) : (
          <p className="text-gray-500 mb-6">
            No reading progress yet
          </p>
        )}
      </div>

      {/* ================= FOR YOU ================= */}
      <div className="px-4">
        <h2 className="font-semibold mb-3">For You</h2>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {MOCK_BOOKS.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div className="min-w-[120px]">
                <img
                  src={book.coverUrl}
                  className="w-[120px] h-[170px] object-cover rounded-xl"
                />
                <p className="text-sm font-medium mt-2">
                  {book.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= ALL BOOKS ================= */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold mb-3">All Books</h2>

        <div className="space-y-2">
          {MOCK_BOOKS.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div className="p-3 border rounded hover:bg-gray-50">
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-500">
                  {book.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM NAV ================= */}
     
<BottomNav />
</div> 
); 
}